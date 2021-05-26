/*:
@plugindesc
レベルアップ時全回復 Ver1.3.3(2021/5/27)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_System_LevelUpRecover.js
@target MZ
@author ポテトドラゴン

・アップデート情報
- ベースプラグイン(Potadra_Base.js)の順序で問題を発生するように修正

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
レベルアップ時に全回復します。  
ステート等も解除されますが、TPは回復しません。

## 使い方
初期設定は必要ありません。  
プラグイン導入だけで動作します。
*/
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
