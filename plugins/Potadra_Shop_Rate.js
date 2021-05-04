/*:
@plugindesc
ショップレート Ver1.2.2(2021/5/4)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_Shop_Rate.js
@base Potadra_Base
@target MZ
@author ポテトドラゴン

・アップデート情報
- アノテーションの整理

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
ショップの購入時と売却時のレートを設定します。

@param BuyRate
@type number
@text 購入レート
@desc 購入倍率
@min 0
@decimals 2
@default 1.00

@param SellRate
@type number
@text 売却レート
@desc 売却倍率
@min 0
@decimals 2
@default 0.50
*/
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name = Potadra.getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用変数
    const BuyRate  = Number(params.BuyRate || 1);
    const SellRate = Number(params.SellRate || 0.5);

    /**
     * ショップ画面の処理を行うクラスです。
     *
     * @class
     */

    /**
     * 売値の取得
     *
     * @returns {}
     */
    Scene_Shop.prototype.sellingPrice = function() {
        return Math.floor(this._item.price * SellRate);
    };

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
                this._price.push(goods[2] === 0 ? item.price * BuyRate : goods[3]);
            }
        }
    };
})();
