/*:
@plugindesc
アイテムの最大所持数変更 Ver1.5.1(2021/6/15)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_Max_Item.js
@base Potadra_Base
@orderAfter Potadra_Base
@target MZ
@author ポテトドラゴン

・アップデート情報
- Window_ItemList.prototype.drawItem の余計な定義を削除
- JSDoc 修正
- meta データの取得方法修正

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
アイテムの最大所持数を変更します。

## 使い方
パラメータを変更し、最大所持数を変更してください。  
プラグイン導入時は、9999が最大所持数です。

アイテムのメモ欄に <最大所持数:9999> のように  
指定すると個別に最大所持数を設定できます。

また、<最大桁数:00000>のように設定すると  
アイテム一覧時の桁数の表示範囲を調整できます。

@param MaxItem
@type number
@text アイテム最大所持数
@desc アイテムの最大所持数
@default 9999
@min 0

@param MaxDigits
@type string
@text 個数表示の最大桁数
@desc 個数表示の最大桁数
@default 0000

@param MaxCol
@type number
@text アイテム列
@desc アイテムの列
@default 2
@min 1

@param AutoSell
@type boolean
@text 自動売却
@desc 最大値を超えたときに、アイテムを自動売却するか
@on 自動売却する
@off 自動売却しない
@default false

@param SellRate
@parent AutoSell
@type number
@text 自動売却レート
@desc 自動売却倍率
@min 0
@decimals 2
@default 0.50

@param MaxItemMetaName
@text 最大所持数タグ
@desc 最大所持数に使うメモ欄タグの名称
デフォルトは 最大所持数
@default 最大所持数

@param MaxDigitsMetaName
@text 最大桁数タグ
@desc 最大桁数に使うメモ欄タグの名称
デフォルトは 最大桁数
@default 最大桁数
*/
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name = Potadra.getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用変数
    const MaxItem           = Number(params.MaxItem || 9999);
    const MaxDigits         = String(params.MaxDigits) || '00';
    const MaxCol            = Number(params.MaxCol  || 2);
    const AutoSell          = Potadra.convertBool(params.AutoSell);
    const SellRate          = Number(params.SellRate || 0.5);
    const MaxItemMetaName   = String(params.MaxItemMetaName) || '最大所持数';
    const MaxDigitsMetaName = String(params.MaxDigitsMetaName) || '最大桁数';

    // 他プラグイン連携(プラグインの導入有無)
    const Potadra_Name_Item = Potadra.isPlugin('Potadra_Name_Item');

    /**
     * アイテムの最大所持数
     *
     * @param {Object} item - アイテムのオブジェクト
     * @returns {number} アイテムの最大所持数
     */
    function maxItem(item) {
        if (!item) {
            return MaxItem;
        }
        const max_item_str = Potadra.meta(item.meta, MaxItemMetaName);
        let max_item = max_item_str ? Number(max_item_str) : MaxItem;
        return max_item;
    }

    /**
     * パーティを扱うクラスです。所持金やアイテムなどの情報が含まれます。
     * このクラスのインスタンスは $gameParty で参照されます。
     *
     * @class
     */
    function sellingPrice(item) {
        return Math.floor(item.price * SellRate);
    }

    /**
     * アイテムの最大所持数取得
     *
     * @returns {number} アイテムの最大所持数
     */
    Game_Party.prototype.maxItems = function(item) {
        return maxItem(item);
    };

    /**
     * アイテムの増加（減少）
     *     include_equip : 装備品も含める
     *
     * @param {} item - 
     * @param {} amount - 
     * @param {} includeEquip - 
     */
    Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
        const container = this.itemContainer(item);
        if (container) {
            const lastNumber = this.numItems(item); // 現在のアイテム所持数
            const newNumber  = lastNumber + amount; // 増減後のアイテム所持数
            const maxNumber  = this.maxItems(item); // アイテムの最大数

            // 自動売却
            if (AutoSell) {
                 // アイテムの最大数
                if (newNumber > maxNumber) { // 増減後のアイテム所持数がアイテムの最大数を超えたら
                    const sellNumber = newNumber - maxNumber; // 売却個数
                    $gameParty.gainGold(sellNumber * sellingPrice(item));
                }
            }

            // アイテム名前保存
            if (Potadra_Name_Item) {
                container[item.name] = newNumber.clamp(0, this.maxItems(item));
                if (container[item.name] === 0) {
                    delete container[item.name];
                }
            } else {
                container[item.id] = newNumber.clamp(0, maxNumber);
                if (container[item.id] === 0) {
                    delete container[item.id];
                }
            }

            if (includeEquip && newNumber < 0) {
                this.discardMembersEquip(item, -newNumber);
            }
            $gameMap.requestRefresh();
        }
    };

    /**
     * アイテム画面で、所持アイテムの一覧を表示するウィンドウです。
     *
     * @class
     */

    /**
     * 桁数の取得
     *
     * @returns {number} 桁数
     */
    Window_ItemList.prototype.maxCols = function() {
        return MaxCol;
    };

    /**
     * 項目の描画
     *
     * @param {} index - 
     */
    Window_ItemList.prototype.drawItem = function(index) {
        const item = this.itemAt(index);
        if (item) {
            const numberWidth = this.numberWidth(item);
            const rect = this.itemLineRect(index);
            this.changePaintOpacity(this.isEnabled(item));
            this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
            this.drawItemNumber(item, rect.x, rect.y, rect.width, numberWidth);
            this.changePaintOpacity(1);
        }
    };

    /**
     * 
     *
     * @returns {} 
     */
    Window_ItemList.prototype.numberWidth = function(item) {
        return this.textWidth(Potadra.maxDigits(item, MaxDigits, MaxDigitsMetaName) + '0');
    };

    /**
     * アイテムの個数を描画
     *
     * @param {} item -
     * @param {} x -
     * @param {} y -
     * @param {} width -
     * @param {} numberWidth - 
     */
    Window_ItemList.prototype.drawItemNumber = function(item, x, y, width, numberWidth) {
        if (this.needsNumber()) {
            const maxItemX = x + width - numberWidth;
            this.drawText(":" + $gameParty.numItems(item), maxItemX, y, numberWidth, "right");
        }
    };

    /**
     * 個数表示の最大桁数を取得
     *
     * @returns {number} 個数表示の最大桁数
     */
    Window_ShopNumber.prototype.maxDigits = function() {
        return String(maxItem(this._item)).length;
    };
})();
