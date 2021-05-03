/*:
@plugindesc
敵グループランダム決定 Ver1.2.1

@target MZ
@author ポテトドラゴン
@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_Battle_RandomTroop.js

@help
任意の敵グループにて、ランダムに敵キャラを決定できる機能を追加します。

■ 使い方

1. 任意の敵グループを選択します。

2. ランダム出現させたい敵キャラを追加します。
   同じ敵キャラを追加した場合は、出現率が上がります。

3. 敵グループ名にタグを記載します。
   タグの記載方法は、下記手順を参考にしてください。

4. マップやイベントの設定で敵グループを呼び出すと、
   ランダムに敵キャラが出現します。

■ タグ

敵グループ名に下記タグを指定することで、
敵グループをランダムに決定します。

タグを指定しない場合は、 通常の敵グループとして扱われます。

・<MIN:1>
敵キャラの最低出現数を1～8で指定します。

・<MAX:1>
敵キャラの最大出現数を1～8で指定します。

・<FIX:1>
固定する敵キャラを1～8で指定します。
1～8の順番は敵グループに追加した順番です。
最初に追加したものが、1番になります。
*/

/*
Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

・Ver1.2.1(2021/5/3)
- 説明修正

・Ver1.2.0(2021/4/4)
- プラグイン名変更
- インデント変更
*/

// パラメータ定義
(() => {
    'use strict';

    /**
     * セットアップ
     *
     * @param {} troopId - 
     */
    const _Game_Troop_setup = Game_Troop.prototype.setup;
    Game_Troop.prototype.setup = function(troopId) {
        this.clear();
        this._troopId = troopId;
        this._enemies = [];

        const max_pattern = /<max:\s*(\d+)>/i;
        const min_pattern = /<min:\s*(\d+)>/i;
        const fix_pattern = /<fix:(\s*.+?)>/i;
        const name        = this.troop().name;

        let max_match = name.match(max_pattern);
        let min_match = name.match(min_pattern);
        let fix_match = name.match(fix_pattern);

        if (max_match || min_match) {
            const members = this.troop().members;
            let max = members.length;
            let min = 1;
            if (max_match) {
                max = max_match[1];
            }
            if (min_match) {
                min = min_match[1];
            }

            // 敵キャラの出現数を算出
            max = Math.randomInt(max) + 1;
            if (max < min) {
                max = min;
            }

            // 抽選する敵キャラのIDを配列に格納
            let ary = [];
            for (const member of members) {
                if ($dataEnemies[member.enemyId]) {
                    ary.push(member.enemyId);
                }
            }

            // 固定敵キャラの設定
            let fix = [];
            if (fix_match) {
                fix = fix_match[1].split(',');
            }

            // 敵キャラを抽選
            for (let i = 0; i < max; i++) {
                let enemyId = null;
                let index = fix[i];
                if (index) {
                    index -= 1;
                    enemyId = ary[index];
                } else {
                    enemyId = ary[Math.floor(Math.random() * ary.length)];
                }
                const enemy = new Game_Enemy(enemyId, 0, 0);
                this._enemies.push(enemy);
            }

            // ● 同名の敵キャラに ABC などの文字を付加
            this.makeUniqueNames();
        } else {
            // タグがない場合は、通常処理を呼び出す。
            _Game_Troop_setup.apply(this, arguments);
        }
    };
})();
