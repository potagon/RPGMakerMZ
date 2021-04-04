/*:
@plugindesc
レベルアップ時全回復 Ver1.3.0

@target MZ
@author ポテトドラゴン
@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_System_LevelUpRecover.js

@help
レベルアップ時に全回復します。

ステート等も解除されますが、TPは回復しません。
*/

/*
Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

・Ver1.3.0(2021/4/4)
- プラグイン名変更
- インデント変更
*/

// パラメータ定義
(() => {
    'use strict';

    /**
     * アクターを扱うクラスです。
     * このクラスは Game_Actors クラス（$gameActors）の内部で使用され、
     * Game_Party クラス（$gameParty）からも参照されます。
     *
     * @class
     */

    /**
     * 経験値の変更
     *
     * @param {number} exp - 経験値
     * @param {boolean} show - レベルアップ表示をするか
     */
    const _Game_Actor_changeExp = Game_Actor.prototype.changeExp;
    Game_Actor.prototype.changeExp = function(exp, show) {
        const lastLevel = this._level;
        _Game_Actor_changeExp.apply(this, arguments);

        // レベルアップした場合のみ回復
        if (this._level > lastLevel) {
            this.recoverAll();
        }
    };
})();
