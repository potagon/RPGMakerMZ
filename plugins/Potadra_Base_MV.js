/*:
@plugindesc
MVベースプラグイン Ver0.5.0

@target MZ
@author ポテトドラゴン
@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_Base_MV.js

@help
MVベースプラグインです。
ある程度MVのプラグインをそのまま動かせるようになります。

RPGツクールMZのコアスクリプトを変更・機能追加しているため、
競合が起きる可能性が高めです。
*/

/*
Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

・Ver0.5.0(2021/4/4)
- 開発版を公開
*/

/**
 * RPGツクールMZのコアスクリプトに変更を加えます。
 *
 * @class
 */
(() => {
    'use strict';

    // 色

    /**
     * 文字色の取得
     *
     * @returns {}
     */
    Window_Base.prototype.outlineColor = function() {
        return ColorManager.outlineColor();
    };

    /**
     * 文字色取得
     *
     * @param {number} n - 文字色番号（0..31）
     * @returns {}
     */
    Window_Base.prototype.textColor = function(n) {
        return ColorManager.textColor(n);
    };

    /**
     * 通常文字色の取得
     *
     * @returns {}
     */
    Window_Base.prototype.normalColor = function() {
        return ColorManager.normalColor();
    };

    /**
     * システム文字色の取得
     *
     * @returns {}
     */
    Window_Base.prototype.systemColor = function() {
        return ColorManager.systemColor();
    };

    /**
     * ピンチ文字色の取得
     *
     * @returns {}
     */
    Window_Base.prototype.crisisColor = function() {
        return ColorManager.crisisColor();
    };

    /**
     * 戦闘不能文字色の取得
     *
     * @returns {}
     */
    Window_Base.prototype.deathColor = function() {
        return ColorManager.deathColor();
    };

    /**
     * ゲージ背景色の取得
     *
     * @returns {}
     */
    Window_Base.prototype.gaugeBackColor = function() {
        return ColorManager.gaugeBackColor();
    };

    /**
     * HP ゲージ 1色の取得
     *
     * @returns {}
     */
    Window_Base.prototype.hpGaugeColor1 = function() {
        return ColorManager.hpGaugeColor1();
    };

    /**
     * HP ゲージ 2色の取得
     *
     * @returns {}
     */
    Window_Base.prototype.hpGaugeColor2 = function() {
        return ColorManager.hpGaugeColor2();
    };

    /**
     * MP ゲージ 1色の取得
     *
     * @returns {}
     */
    Window_Base.prototype.mpGaugeColor1 = function() {
        return ColorManager.mpGaugeColor1();
    };

    /**
     * MP ゲージ 2色の取得
     *
     * @returns {}
     */
    Window_Base.prototype.mpGaugeColor2 = function() {
        return ColorManager.mpGaugeColor2();
    };

    /**
     * 消費 MP文字色の取得
     *
     * @returns {}
     */
    Window_Base.prototype.mpCostColor = function() {
        return ColorManager.mpCostColor();
    };

    /**
     * 装備 パワーアップ文字色の取得
     *
     * @returns {}
     */
    Window_Base.prototype.powerUpColor = function() {
        return ColorManager.powerUpColor();
    };

    /**
     * 装備 パワーダウン文字色の取得
     *
     * @returns {}
     */
    Window_Base.prototype.powerDownColor = function() {
        return ColorManager.powerDownColor();
    };

    /**
     * TP ゲージ 1色の取得
     *
     * @returns {}
     */
    Window_Base.prototype.tpGaugeColor1 = function() {
        return ColorManager.tpGaugeColor1();
    };

    /**
     * TP ゲージ 2色の取得
     *
     * @returns {}
     */
    Window_Base.prototype.tpGaugeColor2 = function() {
        return ColorManager.tpGaugeColor2();
    };

    /**
     * 消費 TP文字色の取得
     *
     * @returns {}
     */
    Window_Base.prototype.tpCostColor = function() {
        return ColorManager.tpCostColor();
    };

    /**
     * 保留項目の背景色を取得
     */
    Window_Base.prototype.pendingColor = function() {
        return ColorManager.pendingColor();
    };

    /**
     * HP の文字色を取得
     */
    Window_Base.prototype.hpColor = function(actor) {
        return ColorManager.hpColor(actor);
    };

    /**
     * MP の文字色を取得
     */
    Window_Base.prototype.mpColor = function(actor) {
        return ColorManager.mpColor();
    };

    /**
     * TP の文字色を取得
     */
    Window_Base.prototype.tpColor = function(actor) {
        return ColorManager.tpColor();
    };


    /**
     *
     *
     * @returns {number}
     */
    Window_Base.prototype.standardFontSize = function() {
        return 28;
    };
    /*Game_System.prototype.mainFontSize = function() {
        return $dataSystem.advanced.fontSize; // 26
    };*/

    /**
     * 標準パディングサイズの取得
     *
     * @returns {number} 標準パディングサイズ
     */
    Window_Base.prototype.standardPadding = function() {
        return 18;
    };

    Window_Base.prototype.textPadding = function() {
        return 6;
    };


    /**
     * ゲージの描画
     *
     * @param {number} x -
     * @param {number} y -
     * @param {number} width -
     * @param {} rate - 割合（1.0 で満タン）
     * @param {} color1 - グラデーション 左端
     * @param {} color2 - グラデーション 右端
     */
    Window_Base.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
        var fillW = Math.floor(width * rate);
        var gaugeY = y + this.lineHeight() - 8;
        this.contents.fillRect(x, gaugeY, width, 6, this.gaugeBackColor());
        this.contents.gradientFillRect(x, gaugeY, fillW, 6, color1, color2);
    };

    /**
     * 現在値／最大値を分数形式で描画
     *
     * @param {} current - 現在値
     * @param {} max     - 最大値
     * @param {number} x -
     * @param {number} y -
     * @param {number} width -
     * @param {} color1  - 現在値の色
     * @param {} color2  - 最大値の色
     */
    Window_Base.prototype.drawCurrentAndMax = function(current, max, x, y,
                                                    width, color1, color2) {
        var labelWidth = this.textWidth('HP');
        var valueWidth = this.textWidth('0000');
        var slashWidth = this.textWidth('/');
        var x1 = x + width - valueWidth;
        var x2 = x1 - slashWidth;
        var x3 = x2 - valueWidth;
        if (x3 >= x + labelWidth) {
            this.changeTextColor(color1);
            this.drawText(current, x3, y, valueWidth, 'right');
            this.changeTextColor(color2);
            this.drawText('/', x2, y, slashWidth, 'right');
            this.drawText(max, x1, y, valueWidth, 'right');
        } else {
            this.changeTextColor(color1);
            this.drawText(current, x1, y, valueWidth, 'right');
        }
    };

    /**
     * HP の描画
     */
    Window_Base.prototype.drawActorHp = function(actor, x, y, width) {
        width = width || 186;
        var color1 = this.hpGaugeColor1();
        var color2 = this.hpGaugeColor2();
        this.drawGauge(x, y, width, actor.hpRate(), color1, color2);
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.hpA, x, y, 44);
        this.drawCurrentAndMax(actor.hp, actor.mhp, x, y, width,
                            this.hpColor(actor), this.normalColor());
    };

    /**
     * MP の描画
     */
    Window_Base.prototype.drawActorMp = function(actor, x, y, width) {
        width = width || 186;
        var color1 = this.mpGaugeColor1();
        var color2 = this.mpGaugeColor2();
        this.drawGauge(x, y, width, actor.mpRate(), color1, color2);
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.mpA, x, y, 44);
        this.drawCurrentAndMax(actor.mp, actor.mmp, x, y, width,
                            this.mpColor(actor), this.normalColor());
    };

    /**
     * TP の描画
     */
    Window_Base.prototype.drawActorTp = function(actor, x, y, width) {
        width = width || 96;
        var color1 = this.tpGaugeColor1();
        var color2 = this.tpGaugeColor2();
        this.drawGauge(x, y, width, actor.tpRate(), color1, color2);
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.tpA, x, y, 44);
        this.changeTextColor(this.tpColor(actor));
        this.drawText(actor.tp, x + width - 64, y, 64, 'right');
    };


    /**
     * 項目を描画する矩形の取得（テキスト用）
     */
    Window_Selectable.prototype.itemRectForText = function(index) {
        const rect = this.itemRect(index);
        rect.x += this.textPadding();
        rect.width -= this.textPadding() * 2;
        return rect;
    };

    Window_Selectable.prototype.resetScroll = function() {
        this.setTopRow(0);
    };


    /**
     * コマンド入力中のアクターをクリア
     */
    BattleManager.clearActor = function() {
        this.changeActor(-1, '');
    };

    BattleManager.changeActor = function(newActorIndex, lastActorActionState) {
        var lastActor = this.actor();
        this._actorIndex = newActorIndex;
        var newActor = this.actor();
        if (lastActor) {
            lastActor.setActionState(lastActorActionState);
        }
        if (newActor) {
            newActor.setActionState('inputting');
        }
    };


    /**
     *
     *
     * @param {} savefileId -
     * @returns {boolean}
     */
    DataManager.isThisGameFile = function(savefileId) {
        return this.savefileExists(savefileId);
    };

    /**
     *
     *
     * @param {} savefileId -
     * @returns {}
     */
    DataManager.loadSavefileInfo = function(savefileId) {
        return this.savefileInfo(savefileId);
    };


    Sprite_StateIcon._iconWidth  = 32;
    Sprite_StateIcon._iconHeight = 32;


    /**
     * Sets the x, y, width, and height all at once.
     *
     * @method move
     * @param {Number} x The x coordinate of the window layer
     * @param {Number} y The y coordinate of the window layer
     * @param {Number} width The width of the window layer
     * @param {Number} height The height of the window layer
     */
    WindowLayer.prototype.move = function(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    };

})();

// ImageCache 復活

function ImageCache(){
    this.initialize.apply(this, arguments);
}

ImageCache.limit = 10 * 1000 * 1000;

ImageCache.prototype.initialize = function(){
    this._items = {};
};

ImageCache.prototype.add = function(key, value){
    this._items[key] = {
        bitmap: value,
        touch: Date.now(),
        key: key
    };

    this._truncateCache();
};

ImageCache.prototype.get = function(key){
    if(this._items[key]){
        var item = this._items[key];
        item.touch = Date.now();
        return item.bitmap;
    }

    return null;
};

ImageCache.prototype.reserve = function(key, value, reservationId){
    if(!this._items[key]){
        this._items[key] = {
            bitmap: value,
            touch: Date.now(),
            key: key
        };
    }

    this._items[key].reservationId = reservationId;
};

ImageCache.prototype.releaseReservation = function(reservationId){
    var items = this._items;

    Object.keys(items)
        .map(function(key){return items[key];})
        .forEach(function(item){
            if(item.reservationId === reservationId){
                delete item.reservationId;
            }
        });
};

ImageCache.prototype._truncateCache = function(){
    var items = this._items;
    var sizeLeft = ImageCache.limit;

    Object.keys(items).map(function(key){
        return items[key];
    }).sort(function(a, b){
        return b.touch - a.touch;
    }).forEach(function(item){
        if(sizeLeft > 0 || this._mustBeHeld(item)){
            var bitmap = item.bitmap;
            sizeLeft -= bitmap.width * bitmap.height;
        }else{
            delete items[item.key];
        }
    }.bind(this));
};

ImageCache.prototype._mustBeHeld = function(item){
    // request only is weak so It's purgeable
    if(item.bitmap.isRequestOnly()) return false;
    // reserved item must be held
    if(item.reservationId) return true;
    // not ready bitmap must be held (because of checking isReady())
    if(!item.bitmap.isReady()) return true;
    // then the item may purgeable
    return false;
};

ImageCache.prototype.isReady = function(){
    var items = this._items;
    return !Object.keys(items).some(function(key){
        return !items[key].bitmap.isRequestOnly() && !items[key].bitmap.isReady();
    });
};

ImageCache.prototype.getErrorBitmap = function(){
    var items = this._items;
    var bitmap = null;
    if(Object.keys(items).some(function(key){
            if(items[key].bitmap.isError()){
                bitmap = items[key].bitmap;
                return true;
            }
            return false;
        })) {
        return bitmap;
    }

    return null;
};
