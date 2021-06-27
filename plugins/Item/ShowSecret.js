/*:
@plugindesc
隠しアイテム表示 Ver0.6.0(2021/6/25)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Item/ShowSecret.js
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
メニュー画面のアイテムに隠しアイテムを表示します。

## 使い方
初期設定は必要ありません。  
プラグイン導入だけで動作します。

@param PlayTest
@type boolean
@text テスト時有効
@desc テスト時のみ有効にするか
@on 有効にする
@off 有効にしない
@default true

@param SecretItemA
@type string
@text 隠しアイテムＡ表示名
@desc 隠しアイテムＡの表示名
@default 隠しアイテムＡ

@param SecretItemB
@type string
@text 隠しアイテムＢ表示名
@desc 隠しアイテムＢの表示名
@default 隠しアイテムＢ
*/
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name = Potadra.getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用定数
    const PlayTest    = Potadra.convertBool(params.PlayTest);
    const SecretItemA = String(params.SecretItemA);
    const SecretItemB = String(params.SecretItemB);

    if (!PlayTest || Utils.isOptionValid("test")) {
        /**
         * アイテム画面で、所持アイテムの一覧を表示するウィンドウです。
         *
         * @class
         */

        /**
         * アイテムをリストに含めるかどうか
         *
         * @param {} item - 
         * @returns {} 
         */
        Window_ItemList.prototype.includes = function(item) {
            switch (this._category) {
                case "item":
                    return DataManager.isItem(item) && item.itypeId === 1;
                case "weapon":
                    return DataManager.isWeapon(item);
                case "armor":
                    return DataManager.isArmor(item);
                case "keyItem":
                    return DataManager.isItem(item) && item.itypeId === 2;
                case 'SecretItemA':
                    return DataManager.isItem(item) && item.itypeId === 3;
                case 'SecretItemB':
                    return DataManager.isItem(item) && item.itypeId === 4;
                default:
                    return false;
            }
        };


        /**
         * アイテム画面またはショップ画面で、
         * 通常アイテムや装備品の分類を選択するウィンドウです。
         *
         * @class
         */

        /**
         * 桁数の取得
         *
         * @returns {} 
         */
        Window_ItemCategory.prototype.maxCols = function() {
            return 6;
        };

        /**
         * コマンドリストの作成
         */
        Window_ItemCategory.prototype.makeCommandList = function() {
            this.addCommand(TextManager.item,    'item');
            this.addCommand(TextManager.weapon,  'weapon');
            this.addCommand(TextManager.armor,   'armor');
            this.addCommand(TextManager.keyItem, 'keyItem');
            this.addCommand(SecretItemA, 'SecretItemA');
            this.addCommand(SecretItemB, 'SecretItemB');
        };
    }
})();
