/*:
@plugindesc
価格の最大値変更 Ver1.1.0(2021/6/25)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Max/MaxPrice.js
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
価格が 999999 を超えるアイテム・武器・防具のメモ設定を追加します。

## 使い方


@param PriceMetaName
@text 価格タグ
@desc メモ欄のタグ名
空文字の場合は、 "価格" になります
@default 価格
*/
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name = Potadra.getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用変数
    const PriceMetaName = String(params.PriceMetaName) || "価格";

    /**
     * 価格タグの取得
     */
    function MetaPrice(item, price) {
        const meta_price = Potadra.meta(item.meta, PriceMetaName);
        if (meta_price) {
            return Number(meta_price);
        } else {
            return price;
        }
    }

    /**
     * アイテムリストの作成
     */
    Window_ShopBuy.prototype.makeItemList = function() {
        this._data = [];
        this._price = [];
        for (const goods of this._shopGoods) {
            const item = this.goodsToItem(goods);
            if (item) {
                this._data.push(item);
                this._price.push(goods[2] === 0 ? MetaPrice(item, item.price) : goods[3]);
            }
        }
    };

    /**
     * アイテムを許可状態で表示するかどうか
     *
     * @param {} item - 
     * @returns {} 
     */
    Window_ShopSell.prototype.isEnabled = function(item) {
        return item && MetaPrice(item, item.price) > 0;
    };

    /**
     * 売値の取得
     *
     * @returns {} 
     */
    Scene_Shop.prototype.sellingPrice = function() {
        const item = this._item;
        return Math.floor(MetaPrice(item, item.price) / 2);
    };
})();
