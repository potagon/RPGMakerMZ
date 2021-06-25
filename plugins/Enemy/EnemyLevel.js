/*:
@plugindesc
敵キャラレベル追加 Ver0.12.0(2021/6/25)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Enemy/EnemyLevel.js
@base Potadra
@orderAfter Potadra
@target MZ
@author ポテトドラゴン

・アップデート情報
- プラグイン名変更

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
敵キャラにレベルを追加します。

## 使い方


@param ExpMetaName
@text 経験値タグ
@desc 経験値に使うメモ欄タグの名称
デフォルトは 経験値
@default 経験値

@param GoldMetaName
@text 所持金タグ
@desc 所持金に使うメモ欄タグの名称
デフォルトは 所持金
@default 所持金

@param EnemyLevelVariables
@type variable[]
@text 敵キャラレベル変数
@desc 敵キャラのレベルを管理する変数
@default ["53", "54", "55", "56", "57", "58", "59", "60"]
*/
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name = Potadra.getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用変数
    const EnemyLevelVariables = Potadra.numberArray(params.EnemyLevelVariables);
    const ExpMetaName         = String(params.ExpMetaName)  || '経験値';
    const GoldMetaName        = String(params.GoldMetaName) || '所持金';

    /**
     * 敵キャラを扱うクラスです。
     * このクラスは Game_Troop クラス（$gameTroop）の内部で使用されます。
     *
     * @class
     */

    /**
     * レベルごとの値を設定
     *
     * @param {number} level - 現在のレベル
     * @param {} meta - メタデータ
     * @param {number} base_val - 基礎値
     * @param {number} val - レベルごとの上昇値
     * @returns {}
     */
    function setVal(level, meta, base_val, val) {
        const meta_data = Potadra.metaData(meta);
        if (meta_data) {
            let data = null;
            let before_level = 0;

            for (let i = 0; i < meta_data.length; i++) {
                if (meta_data[i]) {
                    data = meta_data[i].split(',');
                    let lv = Number(data[0]);
                    let va = Number(data[1]);
                    if (lv === level) { // レベルが一致したらその値を返す
                        return [va, 0];
                    } else if (lv === 0) { // 0 は上昇値として使用
                        val = va;
                    } else if (lv < level && lv > before_level) { // 現在のレベルより低い設定があった場合
                        before_level = lv;
                        base_val = va;
                    }
                }
            }
        }

        return [base_val, val];
    }

    /**
     * 通常能力値の基本値取得
     *
     * @param {} paramId -
     * @returns {}
     */
    Game_Enemy.prototype.paramBase = function(paramId) {
        const level    = this.level();
        const enemy    = this.enemy();
        let base_param = enemy.params[paramId];

        if (level >= 1) {
            let param = null;

            if (paramId == 0 || paramId == 1) {
                param = 10;
            } else {
                param = 1;
            }
            const params = setVal(level, enemy.meta[TextManager.param(paramId)], base_param, param);
            return params[0] + (params[1] * (level - 1));
        } else {
            return base_param;
        }
    };

    /**
     * レベルの取得
     *
     * @returns {number} レベル
     */
    Game_Enemy.prototype.level = function() {
        return $gameVariables.value(EnemyLevelVariables[this.index()]);
    };

    /**
     * 経験値の取得
     *
     * @returns {number} 経験値
     */
    Game_Enemy.prototype.exp = function() {
        const enemy = this.enemy();
        const level = this.level();
        let base_exp = enemy.exp;
        if (level >= 1) {
            let exp    = Math.floor(enemy.exp / 10);
            const exps = setVal(level, enemy.meta[ExpMetaName], base_exp, exp);
            return exps[0] + (exps[1] * (level - 1));
        } else {
            return base_exp;
        }
    };

    /**
     * 所持金の取得
     *
     * @returns {number} 所持金
     */
    Game_Enemy.prototype.gold = function() {
        const enemy = this.enemy();
        const level = this.level();
        let base_gold = enemy.gold;
        if (level >= 1) {
            let gold    = Math.floor(enemy.gold / 10);
            const golds = setVal(level, enemy.meta[GoldMetaName], base_gold, gold);
            return golds[0] + (golds[1] * (level - 1));
        } else {
            return base_gold;
        }
    };

    /**
     * ドロップアイテムの配列作成
     *
     * @example <ドロップ:0,薬草,10,50,0
     *                    1,ポーション,50,50,0>
     * @returns {}
     */
    Game_Enemy.prototype.makeDropItems = function() {
        const rate = this.dropItemRate();
        let drop_items = this.enemy().dropItems.reduce((r, di) => {
            if (Potadra.random(di.denominator, rate)) {
                return r.concat(this.itemObject(di.kind, di.dataId));
            } else {
                return r;
            }
        }, []);

        const data = Potadra.metaData(this.enemy().meta['ドロップ']);

        if (data) {
            let drops = null;
            let item  = null;

            for (let i = 0; i < data.length; i++) {
                if (data[i]) {
                    drops = data[i].split(',');
                    let level = this.level();

                    // 設定されているレベル以上なら該当アイテム判定
                    if ( level >= Number(drops[0]) ) {
                        let percent       = Number(drops[3]);
                        let level_percent = (Number(drops[4]) * level);
                        if (Math.random() <= (percent + (level_percent * level)) / 100 * rate) {
                            item = Potadra.itemSearch(drops[1].trim());
                            for (let j = 0; j < Number(drops[2]); j++) {
                                drop_items.push(item);
                            }
                        }
                    }
                }
            }
        }

        return drop_items;
    };

    /**
     * 表示名の取得
     *
     * @returns {}
     */
    Game_Enemy.prototype.name = function() {
        let name = this.originalName() + (this._plural ? this._letter : "");
        const level = this.level();
        if (level > 0) {
            name = name + 'Lv.' + level;
        }
        return name;
    };

    /**
     * 行動条件合致判定
     *     action : RPG::Enemy::Action
     *
     * @param {} action - 
     * @returns {} 
     */
    function meetsCondition(conditionType) {
        switch (conditionType) {
            case 'ターン':
                return 1;
            case 'HP':
                return 2;
            case 'MP':
                return 3;
            case 'ステート':
                return 4;
            case 'パーティーLV':
                return 5;
            case 'スイッチ':
                return 6;
            default:
                return 0;
        }
    }

    /**
     * 戦闘行動の作成
     *
     * @example <行動:0,0,攻撃
     *                1,10,ファイア>
     */
    Game_Enemy.prototype.makeActions = function() {
        Game_Battler.prototype.makeActions.call(this);
        if (this.numActions() > 0) {
            // 割り込み
            const data = Potadra.metaData(this.enemy().meta['行動']);

            let actions = [];
            if (data) {
                let action = null;
    
                for (let i = 0; i < data.length; i++) {
                    if (data[i]) {
                        action = data[i].split(',');
                        let level = this.level();

                        // 設定されているレベル範囲内なら該当行動パターン判定(上限はレベル0なら無視される)
                        if ( Number(action[0]) <= level && (level === 0 || level <= Number(action[1])) ) {
                            actions.push(
                                {
                                    skillId: Potadra.nameSearch($dataSkills, action[2].trim()),
                                    rating: Number(action[3] || 5),
                                    conditionType: meetsCondition(action[4]),
                                    conditionParam1: Number(action[5] || 0),
                                    conditionParam2: Number(action[6] || 0)
                                }
                            );
                        }
                    }
                }
            }

            let actionList = this.enemy().actions.concat(actions).filter(a =>
                this.isActionValid(a)
            );
            if (actionList.length > 0) {
                this.selectAllActions(actionList);
            }
        }
        this.setActionState("waiting");
    };


    /**
     * 敵グループおよび戦闘に関するデータを扱うクラスです。
     * バトルイベントの処理も行います。
     * このクラスのインスタンスは $gameTroop で参照されます。
     *
     * @class
     */

    /**
     * 敵キャラ名の配列取得
     *    戦闘開始時の表示用。重複は除去する。
     *
     * @returns {}
     */
    Game_Troop.prototype.enemyNames = function() {
        const names = [];
        let name  = null;
        let level = null;
        for (const enemy of this.members()) {
            name = enemy.originalName();
            level = enemy.level();
            if (level > 0) {
                name = name + 'Lv.' + level;
            }
            if (enemy.isAlive() && !names.includes(name)) {
                names.push(name);
            }
        }
        return names;
    };

    /**
     * セットアップ
     *
     * @param {} troopId -
     */
    const _Game_Troop_setup = Game_Troop.prototype.setup;
    Game_Troop.prototype.setup = function(troopId) {
        _Game_Troop_setup.apply(this, arguments);

        // 能力値の参照が使うときだけなので、ターン0 のとき全回復
        if (this._turnCount === 0) {
            this.members().forEach(function(enemy){
            enemy.recoverAll();
            });
        }
    };
})();
