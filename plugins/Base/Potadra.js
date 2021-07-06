/*:
@plugindesc
ベース Ver1.8.1(2021/7/7)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Base/Potadra.js
@target MZ
@author ポテトドラゴン

・アップデート情報
- ヘルプ修正
- パラメータの論理名を変更

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
ベースプラグインです。

ほとんどのプラグインで必要になるので、  
必ずダウンロードして他のプラグインの最上部に配置してください。

## 使い方
1. 他のプラグインの最上部に配置する。
2. バグ修正用のパラメータを必要に応じて変更する。

@param FixBattleEnemyDrawItem
@type boolean
@text 敵キャラ選択ウィンドウバグ修正
@desc 敵キャラを選択するウィンドウで制御文字が使えないバグ修正
@on 修正する
@off 修正しない
@default true

@param FixSkillCostSize
@type boolean
@text スキルコストサイズバグ修正
@desc 消費MPが4桁かつ、名前が長いスキルの
表示がおかしくなる問題修正(3桁 => 4桁に修正)
@on 修正する
@off 修正しない
@default true

@param FixStatusEquipOver
@type boolean
@text 装備タイプバグ修正
@desc 装備タイプが7個以上あるときステータスの
装備に表示しきれないバグ修正(スクロールできるように修正)
@on 修正する
@off 修正しない
@default false
*/

/**
 * 共通処理
 *
 * @class
 */
class Potadra {
    /**
     * プラグイン名取得
     *
     * @returns {string} プラグイン名(.js の記載は除く)
     */
    static getPluginName() {
        return document.currentScript.src.replace(/.+\/(.+)\.js/, '$1');
    }

    /**
     * プラグインの導入状態確認
     *
     * @param {string} plugin_name - 導入状態を確認するプラグイン名(.js の記載は除く)
     * @returns {boolean} プラグインの導入有無
     */
    static isPlugin(plugin_name) {
        return PluginManager._scripts.includes(plugin_name);
    }

    /**
     * 他プラグインのパラメータ取得
     *
     * @param {string} plugin_name - パラメータを取得するプラグイン名(.js の記載は除く)
     * @returns {object} プラグインパラメータ
     */
    static getPluginParams(plugin_name) {
        let params = false;
        if (this.isPlugin(plugin_name)) {
            params = PluginManager.parameters(plugin_name);
        }
        return params;
    }

    /**
     * libs 以下にライブラリを追加
     *
     * @param {string} lib_name - 追加するライブラリ名(.js の記載は除く)
     */
    static addLib(lib_name) {
        const url = 'js/libs/' + lib_name + '.js';
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.async = false;
        script.defer = true;
        script.onload = main.onScriptLoad.bind(this);
        script.onerror = main.onScriptError.bind(this);
        script._url = url;
        document.body.appendChild(script);
        main.numScripts = scriptUrls.length + 1;
    }

    /**
     * 真偽値変換
     *
     * @param {string} bool - 真偽値に変換する文字列
     * @returns {boolean} 真偽値に変換した値
     */
    static convertBool(bool) {
        if (bool === "false" || bool === '') {
            return false;
        } else {
            return true;
        }
    }

    /**
     * Audio変換
     *
     * @param {struct} struct_audio - Audio情報
     * @returns {Object} 再生できる状態のAudio情報
     */
    static convertAudio(struct_audio) {
        if (struct_audio) {
            let audio  = JSON.parse(struct_audio);
            let name   = String(audio.name);
            let volume = Number(audio.volume || 90);
            let pitch  = Number(audio.pitch || 100);
            let pan    = Number(audio.pan || 0);
            return {"name": name, "volume": volume, "pitch": pitch, "pan": pan};
        } else {
            return false;
        }
    }

    /**
     * 配列(数値)変換
     *
     * @param {string} data - 配列に変換する文字列
     * @returns {array} 配列に変換した値
     */
    static numberArray(data) {
        let arr = [];
        for (let datum of JSON.parse(data)) {
            arr.push(Number(datum));
        }
        return arr;
    }

    /**
     * 配列(文字列)変換
     *
     * @param {string} data - 配列に変換する文字列
     * @returns {array} 配列に変換した値
     */
    static stringArray(data) {
        let arr = [];
        if (data) {
            for (let datum of JSON.parse(data)) {
                arr.push(String(datum));
            }
        }
        return arr;
    }

    /**
     * スイッチ判定
     * 
     * @param {number} switch_no - スイッチ番号
     * @param {boolean} bool - 真偽値
     * @returns {boolean} 
     */
    static checkSwitch(switch_no, bool = true) {
        if (switch_no === 0 || $gameSwitches.value(switch_no) === bool) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 通常検索
     *
     * @param {array} data - 検索対象のデータ
     * @param {any} id - 検索する数値や文字列
     * @param {string} column - 検索して見つかったときに返すカラム(指定しない場合は、全データを返す)
     * @param {string} search_column - 検索対象のカラム(指定しない場合は、カラム を指定せず検索)
     * @param {any} val - 検索しても見つからなかった場合に返すデータ
     * @param {number} initial - 検索対象をどこから検索するか
     * @returns {any} 検索した結果
     */
    static search(data, id, column = "name", search_column = "id", val = "", initial = 1) {
        if (!id) {
            return val;
        }

        for (let i = initial; i < data.length; i++) {
            if (search_column) {
                if (data[i][search_column] == id) {
                    if (column) {
                        val = data[i][column];
                    } else {
                        val = data[i];
                    }
                    break;
                }
            } else if (i == id) {
                val = data[i];
                break;
            }
        }
        return val;
    }

    /**
     * 名前検索
     *
     * @param {array} data - 検索対象のデータ
     * @param {any} id - 検索する数値や文字列
     * @param {string} column - 検索して見つかったときに返すカラム(指定しない場合は、全データを返す)
     * @param {string} search_column - 検索対象のカラム(指定しない場合は、カラム を指定せず検索)
     * @param {any} val - 検索しても見つからなかった場合に返すデータ
     * @param {number} initial - 検索対象をどこから検索するか
     * @returns {any} 検索した結果
     */
    static nameSearch(data, name, column = "id", search_column = "name", val = "", initial = 1) {
        return this.search(data, name, column, search_column, val, initial);
    }

    /**
     * アイテム検索
     *
     * @param {array} data - 検索対象のデータ
     * @param {any} id - 検索する数値や文字列
     * @param {string} column - 検索して見つかったときに返すカラム(指定しない場合は、全データを返す)
     * @param {string} search_column - 検索対象のカラム(指定しない場合は、カラム を指定せず検索)
     * @param {any} val - 検索しても見つからなかった場合に返すデータ
     * @param {number} initial - 検索対象をどこから検索するか
     * @returns {any} 検索した結果
     */
    static itemSearch(name, column = false, search_column = "name", val = false, initial = 1) {
        let item, weapon, armor = null;
        item = this.search($dataItems, name, column, search_column, val, initial);
        if (item) {
            return item;
        }
        weapon = this.search($dataWeapons, name, column, search_column, val, initial);
        if (weapon) {
            return weapon;
        }
        armor = this.search($dataArmors, name, column, search_column, val, initial);
        if (armor) {
            return armor;
        }
        return false;
    }

    /**
     * メタデータ取得
     *
     * @param {array} meta - メモ内のメタデータ
     * @param {string} tag - メタデータのタグ
     * @returns {string|boolean} メタデータの値(メタデータがない場合、false)
     */
    static meta(meta, tag) {
        if (meta) {
            const data = meta[tag];
            if (data) {
                return data.trim();
            }
        }
        return false;
    }

    /**
     * 配列用メタデータ取得
     *
     * @param {array} meta_data - 改行を含むメモ内のメモデータ
     * @param {string} delimiter - 区切り文字
     * @returns {array|boolean} メタデータの配列(メタデータがない場合、false)
     */
    static metaData(meta_data, delimiter = '\n') {
        if (meta_data) {
            const data = meta_data.split(delimiter);
            if (data) {
                return data.map(datum => datum.trim());
            }
        }
        return false;
    }

    /**
     * ランダム処理
     *
     * @param {number} probability - 確率(0～100%)
     * @param {number} rate - 倍率
     */
    static random(probability, rate = 1) {
        return Math.random() <= probability / 100 * rate;
    }

    /**
     * ガチャ処理
     *
     * @param {number} seed - 乱数のシード値(最大値)
     * @param {array} rates - 抽選対象の確率
     * @returns {number} 抽選対象の配列インデックス
     */
    static gacha(seed, rates) {
        let sum = 0;
        const rand = Math.randomInt(seed);

        for (let i = 0; i < rates.length; i++) {
            sum += rates[i];
            if (rand < sum) {
                return i;
            }
        }
        return 0;
    }

    /**
     * 名前メモデータベース用: 習得するスキル
     *
     * @param {Game.Actor} actor - アクター情報
     * @returns {array} 習得するスキル
     */
    static learnings(actor) {
        const data = this.metaData(actor.currentClass().meta['スキル']);
        let learnings = [];
        if (data) {
            let learning_data = null;

            for (let i = 0; i < data.length; i++) {
                if (data[i]) {
                    learning_data = data[i].split(',');
                    learnings.push({
                        level: Number(learning_data[0]),
                        skillId: this.nameSearch($dataSkills, learning_data[1].trim())
                    });
                }
            }
        }
        return learnings;
    }

    /**
     * ファイルの存在判定
     *
     * @param {string} file_path - 存在をチェックするファイルのパス
     */
    static isExist(file_path) {
        if (StorageManager.isLocalMode()) {
            // ローカル実行

            // パス
            const path = require('path');
            const file = path.dirname(process.mainModule.filename) + file_path;

            // Node.jsのファイルオブジェクト作成
            const fs = require('fs');
            return fs.existsSync(file);
        } else {
            // ブラウザ実行
            const xhr = new XMLHttpRequest();
            try {
                xhr.open('GET', file_path, false); // false で同期処理(デフォルトは true で非同期)
                xhr.send();
                return true;
            } catch (e) {
                return false;
            }
        }
    }

    /**
     * 個数表示の最大桁数を取得
     *
     * @param {Object} item - アイテムのオブジェクト
     * @param {string} max_digits - 最大桁数
     * @param {string} meta_name - メモ欄タグ
     * @returns {string} 個数表示の最大桁数
     */
    static maxDigits(item, max_digits, meta_name) {
        if (!item) {
            return max_digits;
        }
        const max_digit_str = item.meta[meta_name];
        let max_digit = max_digit_str ? String(max_digit_str) : max_digits;
        return max_digit;
    }
}

// バグ修正
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name = Potadra.getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用変数
    const FixBattleEnemyDrawItem = Potadra.convertBool(params.FixBattleEnemyDrawItem);
    const FixSkillCostSize       = Potadra.convertBool(params.FixSkillCostSize);
    const FixStatusEquipOver     = Potadra.convertBool(params.FixStatusEquipOver);

    /**
     * バトル画面で、行動対象の敵キャラを選択するウィンドウです。
     *
     * @class
     */

    /**
     * 項目の描画
     *
     * @param {number} index -
     */
    if (FixBattleEnemyDrawItem) {
        Window_BattleEnemy.prototype.drawItem = function(index) {
            this.resetTextColor();
            const name = this._enemies[index].name();
            const rect = this.itemLineRect(index);
            this.drawTextEx(name, rect.x, rect.y, rect.width);
        };
    }

    /**
     * オブジェクト初期化
     *     info_viewport : 情報表示用ビューポート
     *
     * @param {} rect -
     */
    if (FixStatusEquipOver) {
        const _Window_StatusEquip_initialize = Window_StatusEquip.prototype.initialize;
        Window_StatusEquip.prototype.initialize = function(rect) {
            _Window_StatusEquip_initialize.apply(this, arguments);
            this.refresh();
            this.select(0);
            this.activate();
        };
    }

    /**
     * 
     *
     * @returns {} 
     */
    if (FixSkillCostSize) {
        Window_SkillList.prototype.costWidth = function() {
            return this.textWidth("0000");
        };
    }
})();