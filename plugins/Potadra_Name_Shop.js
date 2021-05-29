/*:
@plugindesc
名前ショップ Ver1.2.4(2021/5/29)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_Name_Shop.js
@base Potadra_Base
@orderAfter Potadra_Base
@target MZ
@author ポテトドラゴン

・アップデート情報
- コメント修正

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
名前を指定してショップの処理を呼び出します。

## 使い方


@command name_shop_item
@text 名前ショップ
@desc 名前を指定してショップの処理を呼び出す

@arg goods
@type struct<GoodsList>[]
@text 商品リスト
@desc ショップの商品リスト

@arg buyOnly
@type boolean
@text 購入のみ
@desc 購入するのみにするか
@on 購入のみ
@off 購入と売却
@default false
*/

/*~struct~GoodsList:
@param name
@type string
@text 商品名
@desc 商品名(アイテム)を名前で指定

@param price
@type number
@text 価格
@desc 価格を指定。0: データベースの価格を適用
@default 0
*/
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name = Potadra.getPluginName();

    // プラグインコマンド(名前ショップ)
    PluginManager.registerCommand(plugin_name, "name_shop_item", args => {
        let goods = [];
        const buy_only = Potadra.convertBool(args.buyOnly);
        if (args.goods) {
            const good_lists = JSON.parse(args.goods);
            let type, val;

            for (let i = 0; i < good_lists.length; i++) {
                let set = 0;
                let good_data = JSON.parse(good_lists[i]);
                let name = good_data.name;
                let price = good_data.price;

                // アイテム
                type = 0;
                val  = Potadra.nameSearch($dataItems, name);

                if (!val) {
                    // 武器
                    type = 1;
                    val  = Potadra.nameSearch($dataWeapons, name);
                    if (!val) {
                        // 防具
                        type = 2;
                        val  = Potadra.nameSearch($dataArmors, name);
                    }
                }

                if (val) {
                    if (price > 0) {
                        set = 1;
                    }
                    goods.push([type, val, set, price]);
                }
            }
        }

        SceneManager.push(Scene_Shop);
        SceneManager.prepareNextScene(goods, buy_only);
    });
})();
