/*:
@plugindesc
アイテム名前保存 Ver0.7.1(2021/6/27)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Name/NameItem.js
@base Potadra
@orderAfter Potadra
@target MZ
@author ポテトドラゴン

・アップデート情報
- MaxItemプラグインとの連携が出来ていないバグ修正

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
アイテムをidではなく、名前で保存するようにします。

## 使い方

*/
(() => {
    'use strict';

    // 他プラグイン連携(プラグインの導入有無)
    const MaxItem = Potadra.isPlugin('MaxItem');

    /**
     * アイテムの所持数取得
     *
     * @param {} item - 
     * @returns {} 
     */
    Game_Party.prototype.numItems = function(item) {
        const container = this.itemContainer(item);
        return container ? container[item.name] || 0 : 0;
    };

    /**
     * アイテムオブジェクトの配列取得 
     *
     * @returns {} 
     */
    Game_Party.prototype.items = function() {
        return Object.keys(this._items).map(name => Potadra.nameSearch($dataItems, name, false));
    };

    /**
     * 武器オブジェクトの配列取得
     *
     * @returns {} 
     */
    Game_Party.prototype.weapons = function() {
        return Object.keys(this._weapons).map(name => Potadra.nameSearch($dataWeapons, name, false));
    };

    /**
     * 防具オブジェクトの配列取得
     *
     * @returns {} 
     */
    Game_Party.prototype.armors = function() {
        return Object.keys(this._armors).map(name => Potadra.nameSearch($dataArmors, name, false));
    };

    // アイテムの最大所持数変更が有効なときは自動売却があるので、こちらの設定は無効
    if (!MaxItem) {
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
                const lastNumber = this.numItems(item);
                const newNumber = lastNumber + amount;
                container[item.name] = newNumber.clamp(0, this.maxItems(item));
                if (container[item.name] === 0) {
                    delete container[item.name];
                }
                if (includeEquip && newNumber < 0) {
                    this.discardMembersEquip(item, -newNumber);
                }
                $gameMap.requestRefresh();
             }
        };
    }
})();
