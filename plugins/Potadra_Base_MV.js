/*:
@plugindesc
MVベース Ver0.7.0(2021/5/29)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_Base_MV.js
@target MZ
@author ポテトドラゴン

・アップデート情報
- Sprite_Base 復活

・TODO
- Argument must be a Rectangle を解決するオプション
- Window のずれを解決するオプション

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
MVベースプラグインです。  
ある程度MVのプラグインをそのまま動かせるようになります。  
※ コアスクリプトを変更・機能追加しているため、競合が起きる可能性が高めです。

## 使い方
1. 使用したいMVのプラグインより上部に配置してください。

上記以外に設定は必要ありません。  
開発途中のプラグインであるため、動作するMVプラグインは少ないです。

本プラグインは、MZのプラグインへの影響が少なくなるように作られています。  
そのため、プラグインが完成したとしても、  
どうしても動かないMVプラグインが発生する場合があります。
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

    // MZ では、windowWidth が以下以外ないので追加
    // Window_NameBox(名前ウィンドウはMZの追加機能なので、MVにはなし)
    // Window_ChoiceList
    // Window_NumberInput

    /*
     * ウィンドウ幅の取得
     */
    Window_Command.prototype.windowWidth = function() {
        return 240;
    };
    Window_Gold.prototype.windowWidth = function() {
        return 240;
    };
    Window_MenuCommand.prototype.windowWidth = function() {
        return 240;
    };
    Window_MenuStatus.prototype.windowWidth = function() {
        return Graphics.boxWidth - 240;
    };
    Window_ItemCategory.prototype.windowWidth = function() {
        return Graphics.boxWidth;
    };
    Window_SkillType.prototype.windowWidth = function() {
        return 240;
    };
    Window_EquipStatus.prototype.windowWidth = function() {
        return 312;
    };
    Window_EquipCommand.prototype.windowWidth = function() {
        return this._windowWidth;
    };
    Window_Options.prototype.windowWidth = function() {
        return 400;
    };
    Window_ShopCommand.prototype.windowWidth = function() {
        return this._windowWidth;
    };
    Window_ShopBuy.prototype.windowWidth = function() {
        return 456;
    };
    Window_ShopNumber.prototype.windowWidth = function() {
        return 456;
    };
    Window_NameEdit.prototype.windowWidth = function() {
        return 480;
    };
    // MZで定義されているのでコメントアウト(作りはかなり違う)
    // Window_ChoiceList.prototype.windowWidth = function() {
    //     var width = this.maxChoiceWidth() + this.padding * 2;
    //     return Math.min(width, Graphics.boxWidth);
    // };
    // Window_NumberInput.prototype.windowWidth = function() {
    //    return this.maxCols() * this.itemWidth() + this.padding * 2;
    // };
    Window_Message.prototype.windowWidth = function() {
        return Graphics.boxWidth;
    };
    Window_MapName.prototype.windowWidth = function() {
        return 360;
    };
    Window_BattleLog.prototype.windowWidth = function() {
        return Graphics.boxWidth;
    };
    Window_PartyCommand.prototype.windowWidth = function() {
        return 192;
    };
    Window_ActorCommand.prototype.windowWidth = function() {
        return 192;
    };
    Window_BattleStatus.prototype.windowWidth = function() {
        return Graphics.boxWidth - 192;
    };
    Window_BattleEnemy.prototype.windowWidth = function() {
        return Graphics.boxWidth - 192;
    };
    Window_TitleCommand.prototype.windowWidth = function() {
        return 240;
    };
    Window_GameEnd.prototype.windowWidth = function() {
        return 240;
    };
    Window_DebugRange.prototype.windowWidth = function() {
        return 246;
    };

    // MZ では、windowHeight が以下以外ないので追加
    // Window_NameBox(名前ウィンドウはMZの追加機能なので、MVにはなし)
    // Window_ChoiceList(MVには定義なし)
    // Window_NumberInput

    /*
     * ウィンドウ高さの取得
     */
    Window_Command.prototype.windowHeight = function() {
        return this.fittingHeight(this.numVisibleRows());
    };
    Window_Gold.prototype.windowHeight = function() {
        return this.fittingHeight(1);
    };
    Window_MenuStatus.prototype.windowHeight = function() {
        return Graphics.boxHeight;
    };
    Window_EquipStatus.prototype.windowHeight = function() {
        return this.fittingHeight(this.numVisibleRows());
    };
    Window_Options.prototype.windowHeight = function() {
        return this.fittingHeight(Math.min(this.numVisibleRows(), 12));
    };
    Window_NameEdit.prototype.windowHeight = function() {
        return this.fittingHeight(4);
    };
    Window_NameInput.prototype.windowHeight = function() {
        return this.fittingHeight(9);
    };
    Window_MapName.prototype.windowHeight = function() {
        return this.fittingHeight(1);
    };
    // MZで定義されているのでコメントアウト(作りはかなり違う)
    // Window_NumberInput.prototype.windowHeight = function() {
    //     return this.fittingHeight(1);
    // };
    Window_EventItem.prototype.windowHeight = function() {
        return this.fittingHeight(this.numVisibleRows());
    };
    Window_Message.prototype.windowHeight = function() {
        return this.fittingHeight(this.numVisibleRows());
    };
    Window_MapName.prototype.windowHeight = function() {
        return this.fittingHeight(1);
    };
    Window_BattleLog.prototype.windowHeight = function() {
        return this.fittingHeight(this.maxLines());
    };
    Window_BattleStatus.prototype.windowHeight = function() {
        return this.fittingHeight(this.numVisibleRows());
    };
    Window_BattleEnemy.prototype.windowHeight = function() {
        return this.fittingHeight(this.numVisibleRows());
    };
    Window_DebugRange.prototype.windowHeight = function() {
        return Graphics.boxHeight;
    };

    // drawHorzLine
    // Window_ShopNumber(MVには定義なし)
    // MZ では、windowHeight が以下以外ないので追加
    /*
     * 水平線の描画
     */
    Window_Status.prototype.drawHorzLine = function(y) {
        var lineY = y + this.lineHeight() / 2 - 1;
        this.contents.paintOpacity = 48;
        this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.lineColor());
        this.contents.paintOpacity = 255;
    };

    /*
     * 水平線の色を取得
     */
    Window_Status.prototype.lineColor = function() {
        return this.normalColor();
    };
    Window_Status.prototype.maxEquipmentLines = function() {
        return 6;
    };
    
    /*
     * ブロック 4 の描画
     */
    Window_Status.prototype.drawBlock4 = function(y) {
        this.drawProfile(6, y);
    };
    Window_Status.prototype.drawProfile = function(x, y) {
        this.drawTextEx(this._actor.profile(), x, y);
    };

    /*
    * 装備スロットの名前を取得
    */
    Window_EquipSlot.prototype.slotName = function(index) {
        var slots = this._actor.equipSlots();
        return this._actor ? $dataSystem.equipTypes[slots[index]] : '';
    };

    // MZ では、numVisibleRows が以下以外ないので追加
    // Window_MenuStatus(MVと同じ)
    // Window_SavefileList(MVには定義なし)
    // Window_ChoiceList
    /*
     * 表示行数の取得
     */
    Window_Command.prototype.numVisibleRows = function() {
        return Math.ceil(this.maxItems() / this.maxCols());
    };
    Window_HorzCommand.prototype.numVisibleRows = function() {
        return 1;
    };
    Window_MenuCommand.prototype.numVisibleRows = function() {
        return this.maxItems();
    };
    // MZと同じなので定義しない
    // Window_MenuStatus.prototype.numVisibleRows = function() {
    //     return 4;
    // };
    Window_SkillType.prototype.numVisibleRows = function() {
        return 4;
    };
    Window_EquipStatus.prototype.numVisibleRows = function() {
        return 7;
    };
    // MZと全く違うのでコメントアウト
    /* Window_ChoiceList.prototype.numVisibleRows = function() {
        var messageY = this._messageWindow.y;
        var messageHeight = this._messageWindow.height;
        var centerY = Graphics.boxHeight / 2;
        var choices = $gameMessage.choices();
        var numLines = choices.length;
        var maxLines = 8;
        if (messageY < centerY && messageY + messageHeight > centerY) {
            maxLines = 4;
        }
        if (numLines > maxLines) {
            numLines = maxLines;
        }
        return numLines;
    };*/
    Window_EventItem.prototype.numVisibleRows = function() {
        return 4;
    };
    Window_Message.prototype.numVisibleRows = function() {
        return 4;
    };
    Window_PartyCommand.prototype.numVisibleRows = function() {
        return 4;
    };
    Window_ActorCommand.prototype.numVisibleRows = function() {
        return 4;
    };
    Window_BattleStatus.prototype.numVisibleRows = function() {
        return 4;
    };

    /**
     * アクターの歩行グラフィック描画
     *
     * @param {} actor - 
     * @param {} x - 
     * @param {} y - 
     */
    Window_Base.prototype.drawActorCharacter = function(actor, x, y) {
        this.drawCharacter(actor.characterName(), actor.characterIndex(), x, y);
    };

    /**
     * アクターの顔グラフィック描画
     *
     * @param {} actor - 
     * @param {} x - 
     * @param {} y - 
     * @param {} width - 
     * @param {} height - 
     */
    Window_Base.prototype.drawActorFace = function(actor, x, y, width, height) {
        this.drawFace(actor.faceName(), actor.faceIndex(), x, y, width, height);
    };

    /**
     * 名前の描画
     *
     * @param {} actor - 
     * @param {} x - 
     * @param {} y - 
     * @param {} width - 
     */
    Window_Base.prototype.drawActorName = function(actor, x, y, width) {
        width = width || 168;
        this.changeTextColor(this.hpColor(actor));
        this.drawText(actor.name(), x, y, width);
    };

    /**
     * 職業の描画
     *
     * @param {} actor - 
     * @param {} x - 
     * @param {} y - 
     * @param {} width - 
     */
    Window_Base.prototype.drawActorClass = function(actor, x, y, width) {
        width = width || 168;
        this.resetTextColor();
        this.drawText(actor.currentClass().name, x, y, width);
    };

    /**
     * 二つ名の描画
     *
     * @param {} actor - 
     * @param {} x - 
     * @param {} y - 
     * @param {} width - 
     */
    Window_Base.prototype.drawActorNickname = function(actor, x, y, width) {
        width = width || 270;
        this.resetTextColor();
        this.drawText(actor.nickname(), x, y, width);
    };

    /**
     * レベルの描画
     *
     * @param {} actor - 
     * @param {} x - 
     * @param {} y - 
     */
    Window_Base.prototype.drawActorLevel = function(actor, x, y) {
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.levelA, x, y, 48);
        this.resetTextColor();
        this.drawText(actor.level, x + 84, y, 36, 'right');
    };

    /*
     * ステートおよび強化／弱体のアイコンを描画
     */
    Window_Base.prototype.drawActorIcons = function(actor, x, y, width) {
        width = width || 144;
        var icons = actor.allIcons().slice(0, Math.floor(width / Window_Base._iconWidth));
        for (var i = 0; i < icons.length; i++) {
            this.drawIcon(icons[i], x + Window_Base._iconWidth * i, y + 2);
        }
    };

    /**
     * Checks whether the browser can play ogg files.
     *
     * @static
     * @method canPlayOgg
     * @return {Boolean} True if the browser can play ogg files
     */
    WebAudio.canPlayOgg = function() {
        if (!this._initialized) {
            this.initialize();
        }
        return !!this._canPlayOgg;
    };

    /**
     * Checks whether the browser can play m4a files.
     *
     * @static
     * @method canPlayM4a
     * @return {Boolean} True if the browser can play m4a files
     */
    WebAudio.canPlayM4a = function() {
        if (!this._initialized) {
            this.initialize();
        }
        return !!this._canPlayM4a;
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

// Sprite_Base 復活

/**
 * アニメーションの表示処理を追加したスプライトのクラスです。
 *
 * @class
 */
function Sprite_Base() {
    this.initialize.apply(this, arguments);
}

Sprite_Base.prototype = Object.create(Sprite.prototype);
Sprite_Base.prototype.constructor = Sprite_Base;

/**
 * オブジェクト初期化
 */
Sprite_Base.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this._animationSprites = [];
    this._effectTarget = this;
    this._hiding = false;
};

/**
 * フレーム更新
 */
Sprite_Base.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateVisibility();
    this.updateAnimationSprites();
};

Sprite_Base.prototype.hide = function() {
    this._hiding = true;
    this.updateVisibility();
};

Sprite_Base.prototype.show = function() {
    this._hiding = false;
    this.updateVisibility();
};

Sprite_Base.prototype.updateVisibility = function() {
    this.visible = !this._hiding;
};

Sprite_Base.prototype.updateAnimationSprites = function() {
    if (this._animationSprites.length > 0) {
        var sprites = this._animationSprites.clone();
        this._animationSprites = [];
        for (var i = 0; i < sprites.length; i++) {
            var sprite = sprites[i];
            if (sprite.isPlaying()) {
                this._animationSprites.push(sprite);
            } else {
                sprite.remove();
            }
        }
    }
};

/**
 * アニメーションの開始
 */
Sprite_Base.prototype.startAnimation = function(animation, mirror, delay) {
    var sprite = new Sprite_Animation();
    sprite.setup(this._effectTarget, animation, mirror, delay);
    this.parent.addChild(sprite);
    this._animationSprites.push(sprite);
};

Sprite_Base.prototype.isAnimationPlaying = function() {
    return this._animationSprites.length > 0;
};
