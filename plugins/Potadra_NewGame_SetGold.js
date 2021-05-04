/*:
@plugindesc
所持金設定 Ver1.2.1(2021/5/4)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_NewGame_SetGold.js
@base Potadra_Base
@target MZ
@author ポテトドラゴン

・アップデート情報
- アノテーションの整理

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
ゲーム開始時の所持金を設定します。

@param StartGold
@type number
@text ゲーム開始所持金
@desc ゲーム開始時の所持金
@default 1000
@min 0
*/
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name = Potadra.getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用変数
    const StartGold = Number(params.StartGold);

    /**
     * パーティを扱うクラスです。所持金やアイテムなどの情報が含まれます。
     * このクラスのインスタンスは $gameParty で参照されます。
     *
     * @class
     */

    /**
     * オブジェクト初期化
     */
    const _Game_Party_initialize = Game_Party.prototype.initialize;
    Game_Party.prototype.initialize = function() {
        _Game_Party_initialize.apply(this, arguments);
        this._gold = StartGold; // 所持金
    };

    /**
     * 所持金の設定
     *
     * @param {} amount -
     */
    Game_Party.prototype.setGold = function(amount) {
        this._gold = amount;
    };
})();
