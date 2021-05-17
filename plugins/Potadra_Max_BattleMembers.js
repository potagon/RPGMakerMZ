/*:
@plugindesc
バトルメンバーの最大数変更 Ver1.2.2(2021/5/17)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_Max_BattleMembers.js
@base Potadra_Base
@target MZ
@author ポテトドラゴン

・アップデート情報
- ヘルプ修正

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
バトルメンバーの最大数を変更します。

## 使い方


@param MaxBattleMembers
@type number
@text バトルメンバー最大数
@desc バトルメンバーの最大数
@default 5
@max 999999999999999
@min 0

@param FiveParty
@type boolean
@text 5人用メニュー
@desc メニューの表示を5人用に変更する
@default false
*/
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name = Potadra.getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用変数
    const MaxBattleMembers = Number(params.MaxBattleMembers || 5);
    const FiveParty        = Potadra.convertBool(params.FiveParty);

    /**
     * パーティを扱うクラスです。所持金やアイテムなどの情報が含まれます。
     * このクラスのインスタンスは $gameParty で参照されます。
     *
     * @class
     */

    /**
     * バトルメンバーの最大数を取得
     *
     * @returns {}
     */
    Game_Party.prototype.maxBattleMembers = function() {
        return MaxBattleMembers;
    };

    // 5人用パーティー表示
    if (FiveParty) {
        /**
         *
         *
         * @returns {number}
         */
        Window_MenuStatus.prototype.numVisibleRows = function() {
            return MaxBattleMembers;
        };

        /**
         * 顔グラフィックの描画
         */
        Window_MenuStatus.prototype.drawFace = function(
            faceName, faceIndex, x, y, width, height
        ) {
            width = width || ImageManager.faceWidth;
            height = height || ImageManager.faceHeight;
            const bitmap = ImageManager.loadFace(faceName);
            const pw = ImageManager.faceWidth;
            const ph = ImageManager.faceHeight;
            const sw = Math.min(width, pw);
            const sh = Math.min(height, ph);
            const dx = Math.floor(x + Math.max(width - pw, 0) / 4); // ここ変更
            const dy = Math.floor(y + Math.max(height - ph, 0) / 4); // ここ変更
            const sx = (faceIndex % 4) * pw + (pw - sw) / 2;
            const sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
            this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
        };

        /**
         *
         *
         * @param {} actor -
         * @param {number} x - X座標
         * @param {number} y - Y座標
         */
        Window_MenuStatus.prototype.drawActorSimpleStatus = function(actor, x, y) {
            const lineHeight = this.lineHeight() - 6;
            const x2 = x + 140;
            this.contents.fontSize = 20;
            this.drawActorName(actor, x, y);
            this.drawActorLevel(actor, x, y + lineHeight * 1);
            this.drawActorIcons(actor, x, y + lineHeight * 2);
            this.drawActorClass(actor, x2, y);
            this.placeBasicGauges(actor, x2, y + lineHeight);
            this.resetFontSettings();
        };

        /**
         * 
         *
         * @returns {number} 
         */
        Window_BattleStatus.prototype.maxCols = function() {
            return MaxBattleMembers;
        };

        /**
         * 
         *
         * @param {} actor - 
         * @param {} x - 
         * @param {} y - 
         * @param {} width - 
         */
        Window_BattleStatus.prototype.drawActorName = function(actor, x, y, width) {
            width = 64;
            this.changeTextColor(ColorManager.hpColor(actor));
            //this.drawText(actor.name(), x, y, width);
        };

        /**
         * 
         *
         * @returns {} 
         */
        Sprite_Name.prototype.bitmapWidth = function() {
            return 128 - (32 * (MaxBattleMembers- 4));
        };

        /**
         * 
         *
         * @returns {number} 
         */
        Sprite_Gauge.prototype.bitmapWidth = function() {
            return 128 - (32 * (MaxBattleMembers- 4));
        };
    }
})();
