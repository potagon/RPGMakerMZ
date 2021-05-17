/*:
@plugindesc
合成屋 Ver0.7.2(2021/5/17)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_Name_CreateShop.js
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
合成屋を作成出来るようにします。

## 使い方


@param MenuName
@text メニュー表示名
@desc メニューの表示名
空文字でメニューに表示しません
@default アイテム合成

@param MenuGoods
@parent MenuName
@type struct<GoodsList>[]
@text メニュー合成リスト
@desc メニュー画面で開いたときの合成リスト
設定しない場合、メニューに表示しません

@param BuyOnly
@parent MenuName
@type boolean
@text 合成のみ
@desc 合成するのみにするか
@on 合成のみ
@off 合成と分解
@default false

@param BuyName
@parent MenuName
@text 合成屋購入コマンド名
@desc 合成屋の購入コマンド名
@default 合成する

@param SellName
@parent MenuName
@text 合成屋売却コマンド名
@desc 合成屋の売却コマンド名
@default 分解する

@param CancelName
@parent MenuName
@text 合成屋キャンセルコマンド名
@desc 合成屋のキャンセルコマンド名
@default やめる

@param MaterialName
@parent MenuName
@text 必要素材名
@desc 必要素材の表示名
@default 必要素材

@param MiniWindow
@type boolean
@text ミニウィンドウ対応
@desc ミニウィンドウ表示可否
@on ミニウィンドウ表示
@off ミニウィンドウ非表示
@default false

@param SubCommand
@type boolean
@text サブコマンド対応
@desc サブコマンド対応可否
@on 対応する
@off 対応しない
@default false

@command create_shop
@text 合成屋
@desc 合成屋を呼び出します

@arg goods
@type struct<GoodsList>[]
@text 商品リスト
@desc ショップの商品リスト

@arg buyOnly
@type boolean
@text 合成のみ
@desc 合成するのみにするか
@on 合成のみ
@off 合成と分解
@default false

@arg BuyName
@text 合成屋購入コマンド名
@desc 合成屋の購入コマンド名
@default 合成する

@arg SellName
@text 合成屋売却コマンド名
@desc 合成屋の売却コマンド名
@default 分解する

@arg CancelName
@text 合成屋キャンセルコマンド名
@desc 合成屋のキャンセルコマンド名
@default やめる

@arg MaterialName
@text 必要素材名
@desc 必要素材の表示名
@default 必要素材
*/

/*~struct~GoodsList:
@param name
@type string
@text 商品名
@desc 商品名(アイテム)を名前で指定

@param price
@type number
@text 価格
@desc 価格を指定。0: お金は不要
@default 0

@param materials
@type struct<MaterialsList>[]
@text 必要素材リスト
@desc 必要素材のリスト
*/

/*~struct~MaterialsList:
@param name
@type string
@text 必要素材名
@desc 必要素材名(アイテム)を名前で指定

@param count
@type number
@text 個数
@desc 個数を指定
@default 1
@min 1
*/
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name = Potadra.getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用変数
    const MenuName   = String(params.MenuName);
    let MenuGoods    = null;
    if (params.MenuGoods) {
        MenuGoods = JSON.parse(params.MenuGoods);
    }
    const BuyOnly    = Potadra.convertBool(params.BuyOnly);
    let BuyName      = String(params.BuyName)      || "合成する";
    let SellName     = String(params.SellName)     || "分解する";
    let CancelName   = String(params.CancelName)   || "やめる";
    let MaterialName = String(params.MaterialName);
    let materials    = {};
    let MaxSize      = 4;
    if (MaterialName) {
        MaxSize = 3;
    }
    const MiniWindow = Potadra.convertBool(params.MiniWindow);
    const SubCommand = Potadra.convertBool(params.SubCommand);

    // プラグインコマンド(プラグインコマンド名)
    PluginManager.registerCommand(plugin_name, "create_shop", args => {
        const good_lists = JSON.parse(args.goods);
        const buy_only   = Potadra.convertBool(args.buyOnly);
        BuyName          = String(args.BuyName)      || "合成する";
        SellName         = String(args.SellName)     || "分解する";
        CancelName       = String(args.CancelName)   || "やめる";
        MaterialName     = String(args.MaterialName);
        MaxSize          = 4;
        if (MaterialName) {
            MaxSize = 3;
        }
        create_shop(good_lists, buy_only);
    });

    // 実際の処理
    function create_shop(good_lists, buy_only) {
        let goods = [];
        let type, val;

        for (let i = 0; i < good_lists.length; i++) {
            let good_data      = JSON.parse(good_lists[i]);
            let name           = good_data.name;
            let price          = good_data.price;
            let material_lists = JSON.parse(good_data.materials);
            materials[i] = [];
            for (let j = 0; j < material_lists.length; j++) {
                let material = JSON.parse(material_lists[j]);
                let item  = Potadra.itemSearch(material.name);
                let count = Number(material.count);
                materials[i].push({"item": item, "count": count});
            }

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
                goods.push([type, val, 1, price]);
            }
        }

        SceneManager.push(Scene_CreateShop);
        SceneManager.prepareNextScene(goods, buy_only);
    }

    // メニューでの合成
    if (MenuName && MenuGoods) {
        /**
         * メニュー画面で表示するコマンドウィンドウです。
         *
         * @class
         */

        /**
         * 独自コマンドの追加用
         */
        const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
        Window_MenuCommand.prototype.addOriginalCommands = function() {
            _Window_MenuCommand_addOriginalCommands.apply(this, arguments);
            this.addCommand(MenuName, "create_shop");
        };


        /**
         * メニュー画面の処理を行うクラスです。
         *
         * @class
         */

        /**
         * コマンドウィンドウの作成
         */
        const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
        Scene_Menu.prototype.createCommandWindow = function() {
            _Scene_Menu_createCommandWindow.apply(this, arguments);
            this._commandWindow.setHandler("create_shop", this.create_shop.bind(this));
        };
    }

    if (MenuName || SubCommand) {
        /**
         * コマンド［合成］
         */
        Scene_Menu.prototype.create_shop = function() {
            create_shop(MenuGoods, BuyOnly);
        };
    }


    /**
     * 合成屋画面で、購入／売却を選択するウィンドウです。
     *
     * @class
     */
    function Window_CreateShopCommand() {
        this.initialize(...arguments);
    }

    Window_CreateShopCommand.prototype = Object.create(Window_ShopCommand.prototype);
    Window_CreateShopCommand.prototype.constructor = Window_CreateShopCommand;

    /**
     * オブジェクト初期化
     *
     * @param {} rect -
     */
    Window_CreateShopCommand.prototype.initialize = function(rect) {
        Window_ShopCommand.prototype.initialize.apply(this, arguments);
    };

    /**
     * 桁数の取得
     *
     * @returns {number} 桁数
     */
    Window_CreateShopCommand.prototype.maxCols = function() {
        return 2;
    };

    /**
     * コマンドリストの作成
     */
    Window_CreateShopCommand.prototype.makeCommandList = function() {
        this.addCommand(BuyName, "buy");
        // this.addCommand(SellName, "sell", !this._purchaseOnly);
        this.addCommand(CancelName, "cancel");
    };

    /**
     * 合成屋画面で、購入できる商品の一覧を表示するウィンドウです。
     *
     * @class
     */
    function Window_CreateShopBuy() {
        this.initialize(...arguments);
    }

    Window_CreateShopBuy.prototype = Object.create(Window_ShopBuy.prototype);
    Window_CreateShopBuy.prototype.constructor = Window_CreateShopBuy;

    /**
     * オブジェクト初期化
     *
     * @param {} rect -
     */
    Window_CreateShopBuy.prototype.initialize = function(rect) {
        Window_ShopBuy.prototype.initialize.apply(this, arguments);
    };

    /**
     * 必要素材ウィンドウの設定
     *
     * @param {} materialWindow -
     */
    Window_CreateShopBuy.prototype.setMaterialWindow = function(materialWindow) {
        this._materialWindow = materialWindow;
    };

    /**
     * ヘルプテキスト更新
     */
    Window_CreateShopBuy.prototype.updateHelp = function() {
        Window_ShopBuy.prototype.updateHelp.apply(this, arguments);
        this._materialWindow.setIndex(this.index());
    };

    /**
     * 選択項目の有効状態を取得
     *
     * @returns {}
     */
    Window_CreateShopBuy.prototype.isCurrentItemEnabled = function() {
        return this.isEnabled(this._data[this.index()], this.index());
    };

    /**
     * アイテムを許可状態で表示するかどうか
     *
     * @param {} item -
     * @param {} index -
     * @returns {}
     */
    Window_CreateShopBuy.prototype.isEnabled = function(item, index) {
        let enable = Window_ShopBuy.prototype.isEnabled.apply(this, arguments);
        if (enable) {
            if (materials[index]) {
                for (let i = 0; i < materials[index].length; i++) {
                    if (materials[index][i]) {
                        let item       = materials[index][i].item;
                        let count      = materials[index][i].count;
                        let possession = $gameParty.numItems(item); // 所持数
                        if (possession < count) {
                            enable = false;
                            break;
                        }
                    }
                }
            }
        }
        return enable;
    };

    /**
     * 項目の描画
     *
     * @param {} index -
     */
    Window_CreateShopBuy.prototype.drawItem = function(index) {
        const item = this.itemAt(index);
        const price = this.price(item);
        const rect = this.itemLineRect(index);
        const priceWidth = this.priceWidth();
        const priceX = rect.x + rect.width - priceWidth;
        const nameWidth = rect.width - priceWidth;
        this.changePaintOpacity(this.isEnabled(item, index));
        this.drawItemName(item, rect.x, rect.y, nameWidth);
        this.drawText(price, priceX, rect.y, priceWidth, "right");
        this.changePaintOpacity(true);
    };


    /**
     * 合成屋画面で、売却のために所持アイテムの一覧を表示するウィンドウです。
     *
     * @class
     */
    function Window_CreateShopSell() {
        this.initialize(...arguments);
    }

    Window_CreateShopSell.prototype = Object.create(Window_ShopSell.prototype);
    Window_CreateShopSell.prototype.constructor = Window_CreateShopSell;

    /**
     * オブジェクト初期化
     *
     * @param {} rect -
     */
    Window_CreateShopSell.prototype.initialize = function(rect) {
        Window_ShopSell.prototype.initialize.apply(this, arguments);
    };


    /**
     * 合成屋画面で、購入または売却するアイテムの個数を入力するウィンドウです。
     *
     * @class
     */
    function Window_CreateShopNumber() {
        this.initialize(...arguments);
    }

    Window_CreateShopNumber.prototype = Object.create(Window_ShopNumber.prototype);
    Window_CreateShopNumber.prototype.constructor = Window_CreateShopNumber;

    /**
     * オブジェクト初期化
     *
     * @param {} rect -
     */
    Window_CreateShopNumber.prototype.initialize = function(rect) {
        Window_ShopNumber.prototype.initialize.apply(this, arguments);
    };

    /**
     * アイテム名表示行の Y 座標
     *
     * @returns {number} アイテム名表示行の Y 座標
     */
    Window_CreateShopNumber.prototype.itemNameY = function() {
        return 34;
    };

    /**
     * タッチ操作用ボタンの Y 座標
     *
     * @returns {number} タッチ操作用ボタンの Y 座標
     */
    Window_CreateShopNumber.prototype.buttonY = function() {
        return Math.floor(this.totalPriceY() + this.lineHeight() * 1.5);
    };

    /**
     * 個数の変更
     *
     * @param {} amount -
     */
    Window_CreateShopNumber.prototype.changeNumber = function(amount) {
        Window_ShopNumber.prototype.changeNumber.apply(this, arguments);
        this.updateMaterialWindowNumber();
    };

    /**
     * 必要素材ウィンドウの設定
     *
     * @param {} materialWindow -
     */
    Window_CreateShopNumber.prototype.setMaterialWindow = function(materialWindow) {
        this._materialWindow = materialWindow;
    };

    /**
     * 必要素材個数の更新
     */
    Window_CreateShopNumber.prototype.updateMaterialWindowNumber = function() {
        if (this._materialWindow) {
            this._materialWindow.setNumber(this._number);
        }
    };


    /**
     * 合成屋画面で、アイテムの所持数やアクターの装備を表示するウィンドウです。
     *
     * @class
     */
    function Window_CreateShopStatus() {
        this.initialize(...arguments);
    }

    Window_CreateShopStatus.prototype = Object.create(Window_ShopStatus.prototype);
    Window_CreateShopStatus.prototype.constructor = Window_CreateShopStatus;

    /**
     * オブジェクト初期化
     *
     * @param {} rect -
     */
    Window_CreateShopStatus.prototype.initialize = function(rect) {
        Window_ShopStatus.prototype.initialize.apply(this, arguments);
    };


    /**
     * 合成屋画面で、必要素材を表示するウィンドウです。
     *
     * @class
     */
    function Window_Material() {
        this.initialize(...arguments);
    }

    Window_Material.prototype = Object.create(Window_Selectable.prototype);
    Window_Material.prototype.constructor = Window_Material;

    /**
     * オブジェクト初期化
     *
     * @param {} rect -
     */
    Window_Material.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.apply(this, arguments);
        this._item = null;
        this._index = 0;
        this._number = 1;
        this._pageIndex = 0;
        this.refresh();
    };

    /**
     * インデックスの設定
     *
     * @param {numner} index - インデックス
     */
    Window_Material.prototype.setIndex= function(index) {
        this._index = index;
        this.refresh();
    };

    /**
     * 個数の設定
     *
     * @param {number} number - 個数
     */
    Window_Material.prototype.setNumber = function(number) {
        this._number = number;
        this.refresh();
    };

    /**
     * リフレッシュ
     */
    Window_Material.prototype.refresh = function() {
        Window_Selectable.prototype.refresh.apply(this, arguments);
        this.drawMaterial();
    };

    /**
     * 必要素材の描画
     */
    Window_Material.prototype.drawMaterial = function() {
        let pos = 0;
        this.changeTextColor(ColorManager.systemColor());
        if (MaterialName) {
            pos = 1;
            let max_page = this.maxPages();
            if (max_page > 1) {
                this.drawText(MaterialName + '(' + (this._pageIndex + 1) + '/' + max_page + ')', 0, 0, 420);
            } else {
                this.drawText(MaterialName, 0, 0, 420);
            }
        }
        this.resetTextColor();
        if (materials[this._index]) {
            let start = this._pageIndex * MaxSize;
            let end   = start + MaxSize;
            for (let i = start; i < end; i++) {
                if (materials[this._index][i]) {
                    let position   = (i % MaxSize + pos);
                    let item       = materials[this._index][i].item;
                    let count      = materials[this._index][i].count;
                    let need       = count * this._number; // 必要数
                    let possession = $gameParty.numItems(item); // 所持数
                    this.changePaintOpacity(possession >= need);
                    this.drawItemName(item, 0, 34 * position, 390 - this.textWidth("0000000"));
                    this.drawText(need + " / " + possession, 420 - this.textWidth("0000000"), 34 * position, 84, "right");
                }
            }
        }
    };

    /**
     * 個数の設定
     *
     * @returns {}
     */
    Window_Material.prototype.number = function() {
        return this._number;
    };

    /**
     * フレーム更新
     */
    Window_Material.prototype.update = function() {
        Window_Selectable.prototype.update.apply(this, arguments);
        this.updatePage();
    };

    /**
     * ページの更新
     */
    Window_Material.prototype.updatePage = function() {
        if (this.isPageChangeEnabled() && this.isPageChangeRequested()) {
            this.changePage();
        }
    };

    /**
     * 最大ページ数の取得
     */
    Window_Material.prototype.maxPages = function() {
        let material = materials[this._index];
        if (material) {
            return Math.floor(material.length / MaxSize + 1);
        } else {
            return 1;
        }
    };

    /**
     * ページ更新判定
     *
     * @returns {boolean} ページ更新可否
     */
    Window_Material.prototype.isPageChangeEnabled = function() {
        return this.visible && this.maxPages() >= 2;
    };

    /**
     * ページ更新操作(Shiftキーもしくはタッチされた場合)
     *
     * @returns {boolean} ページ更新可否
     */
    Window_Material.prototype.isPageChangeRequested = function() {
        if (Input.isTriggered("shift")) {
            return true;
        }
        if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
            return true;
        }
        return false;
    };

    /**
     * ページ変更
     */
    Window_Material.prototype.changePage = function() {
        this._pageIndex = (this._pageIndex + 1) % this.maxPages();
        this.refresh();
        this.playCursorSound();
    };


    /**
     * 合成屋画面の処理を行うクラスです。
     *
     * @class
     */
    function Scene_CreateShop() {
        this.initialize(...arguments);
    }

    Scene_CreateShop.prototype = Object.create(Scene_Shop.prototype);
    Scene_CreateShop.prototype.constructor = Scene_CreateShop;

    /**
     * オブジェクト初期化
     */
    Scene_CreateShop.prototype.initialize = function() {
        Scene_Shop.prototype.initialize.apply(this, arguments);
    };

    /**
     * オブジェクト作成
     */
    Scene_CreateShop.prototype.create = function() {
        Scene_MenuBase.prototype.create.apply(this, arguments);
        this.createHelpWindow();
        this.createGoldWindow();
        this.createCommandWindow();
        this.createDummyWindow();
        this.createMaterialWindow(); // ここを追加
        this.createNumberWindow();
        this.createStatusWindow();
        this.createBuyWindow();
        this.createCategoryWindow();
        this.createSellWindow();
    };

    /**
     * 必要素材ウィンドウの作成
     */
    Scene_CreateShop.prototype.createMaterialWindow = function() {
        const rect = this.materialWindowRect();
        this._materialWindow = new Window_Material(rect);
        this._materialWindow.hide();
        this.addWindow(this._materialWindow);
    };

    /**
     * 必要素材ウィンドウのサイズ指定
     *
     * @returns {}
     */
    Scene_CreateShop.prototype.materialWindowRect = function() {
        const wx = 0;
        const wy = 120 + 200 + 42;
        const ww = Graphics.boxWidth - this.statusWidth();
        const wh =
            this.mainAreaHeight() -
            this._commandWindow.height -
            200 - 42;
        return new Rectangle(wx, wy, ww, wh);
    };

    /**
     * コマンドウィンドウの作成
     */
    Scene_CreateShop.prototype.createCommandWindow = function() {
        const rect = this.commandWindowRect();
        this._commandWindow = new Window_CreateShopCommand(rect); // ここを変えた
        this._commandWindow.setPurchaseOnly(this._purchaseOnly);
        this._commandWindow.y = this.mainAreaTop();
        this._commandWindow.setHandler("buy", this.commandBuy.bind(this));
        // this._commandWindow.setHandler("sell", this.commandSell.bind(this)); // ここを変えた
        this._commandWindow.setHandler("cancel", this.popScene.bind(this));
        this.addWindow(this._commandWindow);
    };

    /**
     * 個数入力ウィンドウの作成
     */
    Scene_CreateShop.prototype.createNumberWindow = function() {
        const rect = this.numberWindowRect();
        this._numberWindow = new Window_CreateShopNumber(rect); // ここを変えた
        this._numberWindow.hide();
        this._numberWindow.setHandler("ok", this.onNumberOk.bind(this));
        this._numberWindow.setHandler("cancel", this.onNumberCancel.bind(this));
        this._numberWindow.setMaterialWindow(this._materialWindow); // ここを追加
        this.addWindow(this._numberWindow);
    };

    /**
     * 個数入力ウィンドウのサイズ指定
     *
     * @returns {}
     */
    Scene_CreateShop.prototype.numberWindowRect = function() {
        const wx = 0;
        const wy = this._dummyWindow.y;
        const ww = Graphics.boxWidth - this.statusWidth();
        const wh = this.calcWindowHeight(5, true);
        return new Rectangle(wx, wy, ww, wh);
    };

    /**
     * 購入ウィンドウの作成
     */
    Scene_CreateShop.prototype.createBuyWindow = function() {
        const rect = this.buyWindowRect();
        this._buyWindow = new Window_CreateShopBuy(rect); // ここを変えた
        this._buyWindow.setupGoods(this._goods);
        this._buyWindow.setHelpWindow(this._helpWindow);
        this._buyWindow.setStatusWindow(this._statusWindow);
        this._buyWindow.hide();
        this._buyWindow.setHandler("ok", this.onBuyOk.bind(this));
        this._buyWindow.setHandler("cancel", this.onBuyCancel.bind(this));
        this._buyWindow.setMaterialWindow(this._materialWindow); // ここを追加
        this.addWindow(this._buyWindow);
    };

    /**
     * 購入ウィンドウのサイズ指定
     *
     * @returns {}
     */
    Scene_CreateShop.prototype.buyWindowRect = function() {
        const wx = 0;
        const wy = this._dummyWindow.y;
        const ww = Graphics.boxWidth - this.statusWidth();
        const wh = this.calcWindowHeight(5, true);
        return new Rectangle(wx, wy, ww, wh);
    };

    /**
     * 購入ウィンドウのアクティブ化
     */
    Scene_CreateShop.prototype.activateBuyWindow = function() {
        Scene_Shop.prototype.activateBuyWindow.apply(this, arguments);
        this._materialWindow.show();
    };

    /**
     * 売却ウィンドウのアクティブ化
     */
    Scene_CreateShop.prototype.activateSellWindow = function() {
        Scene_Shop.prototype.activateSellWindow.apply(this, arguments);
        this._materialWindow.hide();
    };

    /**
     * 購入［決定］
     */
    Scene_CreateShop.prototype.onBuyOk = function() {
        Scene_Shop.prototype.onBuyOk.apply(this, arguments);
        this._materialWindow.setIndex(this._buyWindow.index());
    };

    /**
     * 購入［キャンセル］
     */
    Scene_CreateShop.prototype.onBuyCancel = function() {
        Scene_Shop.prototype.onBuyCancel.apply(this, arguments);
        this._materialWindow.setIndex(0);
        this._materialWindow.hide();
    };

    /**
     * 個数入力［決定］
     */
    Scene_CreateShop.prototype.onNumberOk = function() {
        Scene_Shop.prototype.onNumberOk.apply(this, arguments);
        this._materialWindow.setNumber(1);
    };

    /**
     * 個数入力［キャンセル］
     */
    Scene_CreateShop.prototype.onNumberCancel = function() {
        Scene_Shop.prototype.onNumberCancel.apply(this, arguments);
        this._materialWindow.setNumber(1);
    };

    /**
     * 最大購入可能個数の取得
     *
     * @returns {}
     */
    Scene_CreateShop.prototype.maxBuy = function() {
        let max = Scene_Shop.prototype.maxBuy.apply(this, arguments);
        let index = this._buyWindow.index();
        if (materials[index]) {
            for (let i = 0; i < materials[index].length; i++) {
                if (materials[index][i]) {
                    let item  = materials[index][i].item;
                    let count = materials[index][i].count;
                    let m = $gameParty.numItems(item) / count; // 所持数
                    if (max > m) {
                        max = m;
                    }
                }
            }
        }

        return max;
    };

    /**
     * 購入の実行
     *
     * @param {} number -
     */
    Scene_CreateShop.prototype.doBuy = function(number) {
        $gameParty.loseGold(number * this.buyingPrice());
        $gameParty.gainItem(this._item, number);
        let index = this._buyWindow.index();
        if (materials[index]) {
            for (let i = 0; i < materials[index].length; i++) {
                if (materials[index][i]) {
                    let item  = materials[index][i].item;
                    let count = materials[index][i].count;
                    $gameParty.loseItem(item, number * count);
                }
            }
        }
    };

    // ミニウィンドウ表示対応
    if (MiniWindow) {
        var __SCreateShop_create = Scene_CreateShop.prototype.create;
        Scene_CreateShop.prototype.create = function() {
            __SCreateShop_create.call(this);
            this.createMiniWindow();
        };
    }
})();
