/*:
@plugindesc
ランダムアイテム入手 Ver1.3.1(2021/7/2)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Name/RandomItem.js
@base Potadra
@orderAfter Potadra
@target MZ
@author ポテトドラゴン

・アップデート情報
- 必要アイテムをデフォルトで消費するように変更

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
プラグインコマンド指定したアイテムの中からランダムにアイテムを入手します。

## 使い方


@param GoldIconIndex
@type number
@text ゴールド入手アイコン
@desc ゴールド入手時のアイコン
@default 314

@param GoldMessage
@type multiline_string
@text ゴールド入手メッセージ
@desc ゴールド入手時のメッセージ
%1: アイコン番号 %2: 入手ゴールド %3: 通貨
@default \I[%1]%2%3手に入れた！

@command random_item
@text ランダムアイテム取得
@desc リストの中から抽選でアイテムを取得します

@arg items
@type struct<ItemList>[]
@text アイテムリスト

@arg lottery
@type boolean
@text 抽選か素材か
@desc 抽選: 1つのアイテムのみ(ランダム宝箱やガチャなどに利用)
素材: 複数アイテム(採取ポイントなどに利用)
@on 抽選
@off 素材
@default true

@arg uses
@type struct<UseList>[]
@text 必要アイテムリスト

@arg use_message
@parent uses
@type multiline_string
@text 必要アイテム未所持メッセージ
@desc 必要アイテムを未所持のときのメッセージ
空文字の場合、表示しません
@default \I[%1]%2が%3個必要です。

@arg se
@type file
@dir audio/se
@text アイテム入手SE
@desc アイテム入手SE。指定しない場合、再生しません
宝箱を開ける音、ピッケルの音などを指定
@default Item3

@arg volume
@parent se
@type number
@text 音量
@desc 再生するSEの音量
@default 90
@max 100
@min 0

@arg pitch
@parent se
@type number
@text ピッチ
@desc 再生するSEのピッチ
@default 100
@max 150
@min 50

@arg pan
@parent se
@type number
@text 位相
@desc 再生するSEの位相
@default 0
@max 100
@min -100

@arg get_message
@type multiline_string
@text アイテム入手メッセージ
@desc アイテム入手時のメッセージ。空文字の場合、表示しません
%1: アイコン番号 %2: アイテム名 %3: 個数
@default \I[%1]%2を%3個手に入れた！

@command treasure_chest
@text プリセット(抽選): ランダム宝箱
@desc ランダムにアイテムを入手する宝箱のサンプル

@arg items
@type struct<ItemList>[]
@text アイテムリスト

@arg lottery
@type boolean
@text 抽選か素材か
@desc 抽選: 1つのアイテムのみ(ランダム宝箱やガチャなどに利用)
素材: 複数アイテム(採取ポイントなどに利用)
@on 抽選
@off 素材
@default true

@arg uses
@type struct<UseList>[]
@text 必要アイテムリスト

@arg use_message
@parent uses
@type multiline_string
@text 必要アイテム未所持メッセージ
@desc 必要アイテムを未所持のときのメッセージ
空文字の場合、表示しません
@default 宝箱を開けるには\I[%1]%2が%3個必要です。

@arg se
@type file
@dir audio/se
@text アイテム入手SE
@desc アイテム入手SE。指定しない場合、再生しません
宝箱を開ける音、ピッケルの音などを指定
@default Chest1

@arg volume
@parent se
@type number
@text 音量
@desc 再生するSEの音量
@default 90
@max 100
@min 0

@arg pitch
@parent se
@type number
@text ピッチ
@desc 再生するSEのピッチ
@default 100
@max 150
@min 50

@arg pan
@parent se
@type number
@text 位相
@desc 再生するSEの位相
@default 0
@max 100
@min -100

@arg get_message
@type multiline_string
@text アイテム入手メッセージ
@desc アイテム入手時のメッセージ。空文字の場合、表示しません
%1: アイコン番号 %2: アイテム名 %3: 個数
@default \I[%1]%2を%3個手に入れた！

@command felling
@text プリセット(素材): 伐採
@desc 木を切ったときにアイテムを入手するサンプル

@arg items
@type struct<ItemList>[]
@text アイテムリスト

@arg lottery
@type boolean
@text 抽選か素材か
@desc 抽選: 1つのアイテムのみ(ランダム宝箱やガチャなどに利用)
素材: 複数アイテム(採取ポイントなどに利用)
@on 抽選
@off 素材
@default false

@arg uses
@type struct<UseList>[]
@text 必要アイテムリスト

@arg use_message
@parent uses
@type multiline_string
@text 必要アイテム未所持メッセージ
@desc 必要アイテムを未所持のときのメッセージ
空文字の場合、表示しません
@default \I[%1]%2が%3個必要です。
\I[%1]%2は道具屋で買うことが出来ます。

@arg se
@type file
@dir audio/se
@text アイテム入手SE
@desc アイテム入手SE。指定しない場合、再生しません
宝箱を開ける音、ピッケルの音などを指定
@default Slash1

@arg volume
@parent se
@type number
@text 音量
@desc 再生するSEの音量
@default 90
@max 100
@min 0

@arg pitch
@parent se
@type number
@text ピッチ
@desc 再生するSEのピッチ
@default 100
@max 150
@min 50

@arg pan
@parent se
@type number
@text 位相
@desc 再生するSEの位相
@default 0
@max 100
@min -100

@arg get_message
@type multiline_string
@text アイテム入手メッセージ
@desc アイテム入手時のメッセージ。空文字の場合、表示しません
%1: アイコン番号 %2: アイテム名 %3: 個数
@default \I[%1]%2を%3個手に入れた！

@command mining
@text プリセット(素材): 採掘
@desc 採掘したときにアイテムを入手するサンプル

@arg items
@type struct<ItemList>[]
@text アイテムリスト

@arg lottery
@type boolean
@text 抽選か素材か
@desc 抽選: 1つのアイテムのみ(ランダム宝箱やガチャなどに利用)
素材: 複数アイテム(採取ポイントなどに利用)
@on 抽選
@off 素材
@default false

@arg uses
@type struct<UseList>[]
@text 必要アイテムリスト

@arg use_message
@parent uses
@type multiline_string
@text 必要アイテム未所持メッセージ
@desc 必要アイテムを未所持のときのメッセージ
空文字の場合、表示しません
@default \I[%1]%2が%3個必要です。
\I[%1]%2は道具屋で買うことが出来ます。

@arg se
@type file
@dir audio/se
@text アイテム入手SE
@desc アイテム入手SE。指定しない場合、再生しません
宝箱を開ける音、ピッケルの音などを指定
@default Sword2

@arg volume
@parent se
@type number
@text 音量
@desc 再生するSEの音量
@default 90
@max 100
@min 0

@arg pitch
@parent se
@type number
@text ピッチ
@desc 再生するSEのピッチ
@default 100
@max 150
@min 50

@arg pan
@parent se
@type number
@text 位相
@desc 再生するSEの位相
@default 0
@max 100
@min -100

@arg get_message
@type multiline_string
@text アイテム入手メッセージ
@desc アイテム入手時のメッセージ。空文字の場合、表示しません
%1: アイコン番号 %2: アイテム名 %3: 個数
@default \I[%1]%2を%3個手に入れた！

*/

/*~struct~ItemList:
@param name
@text アイテム名
@desc 抽選するアイテム名

@param rate
@type number
@text 抽選確率
@desc 抽選: 排出率
素材: 100 で必ずアイテムを入手
@default 100

@param count
@type number
@text 素材入手回数
@desc 抽選確率 が 100の場合は、アイテムの入手数になる
抽選ではこのパラメータは無効
@default 1

@param min
@type number
@text 最低入手数
@desc 素材の入手結果がこの値より下の場合は、この数のアイテムを入手
抽選ではこのパラメータは無効
@default 0
*/

/*~struct~UseList:
@param use_name
@text 必要アイテム名
@desc 必要なアイテムを名前で指定。空文字なら無条件でアイテム入手
鍵やピッケルなどに利用

@param use_count
@parent use_name
@type number
@text 必要アイテム個数
@desc 必要なアイテムの個数
@default 1

@param use_break
@parent use_name
@type number
@text 消費確率
@desc 必要アイテムを消費する確率
100: 消費する 50: 50%の確率で消費 0: 消費しない
@max 100
@min 0
@decimals 2
@default 100
*/
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name = Potadra.getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用変数
    const GoldIconIndex  = Number(params.GoldIconIndex || 314);
    const GoldMessage    = String(params.GoldMessage) || '\I[%1]%2%3手に入れた！';

    // 他プラグイン連携(プラグインの導入有無)
    const GetInformation = Potadra.isPlugin('GetInformation');

    // プラグインコマンド(ランダムアイテム取得)
    PluginManager.registerCommand(plugin_name, "random_item", function(args) {
        gacha(args);
    });

    // プラグインコマンド(プリセット(抽選): ランダム宝箱)
    PluginManager.registerCommand(plugin_name, "treasure_chest", function(args) {
        gacha(args);
    });

    // プラグインコマンド(プリセット(素材): 伐採)
    PluginManager.registerCommand(plugin_name, "felling", function(args) {
        gacha(args);
    });

    // プラグインコマンド(プリセット(素材): 採掘)
    PluginManager.registerCommand(plugin_name, "mining", function(args) {
        gacha(args);
    });

    // 実際の処理
    function gacha(args) {
        if (GetInformation) {
            CommonPopupManager._popEnable = CommonPopupManager.popEnable();
        }

        let item_lists = null;

        //
        if (args.items) {
            item_lists = JSON.parse(args.items);
        }

        const lottery     = Potadra.convertBool(args.lottery);
        const use_message = String(args.use_message);
        const se          = String(args.se);
        const volume      = Number(args.volume || 90);
        const pitch       = Number(args.pitch || 100);
        const pan         = Number(args.pan || 0);
        const get_message = String(args.get_message);
        let get_item_count = 0;
        let use_item    = false;
        let first_item  = null;
        let first_name  = null;
        let first_count = null;
        let use_lists   = null;
        let uses        = args.uses;
        if (uses) {
            use_lists = JSON.parse(uses);
        }

        // 必要アイテムがある場合その処理
        if (use_lists) {
            for (let i = 0; i < use_lists.length; i++) {
                let use_info  = JSON.parse(use_lists[i]);
                let use_name  = use_info.use_name;
                let use_count = Number(use_info.use_count || 1);
                let use_break = Number(use_info.use_break || 0);
                let item      = Potadra.itemSearch(use_name);
                let count     = $gameParty.numItems(item);

                if (i === 0) {
                    first_item  = item;
                    first_name  = use_name;
                    first_count = use_count;
                }

                // 所持数(装備品を含めない) >= 必要数
                if (count >= use_count) {
                    // 消費処理
                    if (use_break > 0) {
                        if (Potadra.random(use_break)) {
                            $gameParty.gainItem(item, -1 * use_count, false);
                        }
                    }
                    use_item = true;
                    break;
                }
            }
        }

        if (!use_item && first_item) {
            // 必要アイテムが足りないときの処理
            if (use_message) {
                $gameMessage.add(use_message.format(first_item.iconIndex, first_name, first_count));
            }
            // イベント処理の中断
            $gameMap._interpreter.command115();
            return false;
        }

        //
        if (!item_lists) {
            // イベント処理の中断
            $gameMap._interpreter.command115();
            return false;
        }

        // 抽選・素材
        if (lottery) {
            let rates = [];
            let items = [];

            // ガチャ情報作成
            let sum = 0;
            let min = 0;
            for (let i = 0; i < item_lists.length; i++) {
                let item_info = JSON.parse(item_lists[i]);
                let rate      = Number(item_info.rate || 100);
                let name      = item_info.name;
                let item      = null;
                if (isNaN(name)) {
                    item = Potadra.itemSearch(name);
                } else { // ゴールド用
                    item = Number(name);
                    if (Number(item_info.min) > 0) {
                        min = Number(item_info.min);
                    }
                }
                sum += rate;
                rates.push(rate);
                items.push(item);
            }

            // ガチャをまわす
            const index = Potadra.gacha(sum, rates);

            // アイテム入手
            const item = items[index];
            if (item) {
                if (isNaN(item)) {
                    $gameParty.gainItem(item, 1);
                    if (!GetInformation && get_message) {
                        $gameMessage.add(get_message.format(item.iconIndex, item.name, 1));
                    }
                } else { // ゴールド用
                    let gold = Math.randomInt(item) + 1;
                    if (gold < min) {
                        gold = min;
                    }
                    $gameParty.gainGold(gold);
                    if (!GetInformation && get_message) {
                        $gameMessage.add(GoldMessage.format(GoldIconIndex, gold, $dataSystem.currencyUnit));
                    }
                }
                get_item_count = 1;
            }
        } else {
            for (let i = 0; i < item_lists.length; i++) {
                let item_info = JSON.parse(item_lists[i]);
                let rate      = Number(item_info.rate || 100);
                let count     = Number(item_info.count || 1);
                let min       = Number(item_info.min || 0);
                let name      = item_info.name;
                let item      = null;
                if (isNaN(name)) {
                    item = Potadra.itemSearch(name);
                } else { // ゴールド用
                    item = Number(name);
                }

                if (item) {
                    if (isNaN(item)) {
                        let item_count = 0;
                        for (let j = 0; j < count; j++) {
                            if (Potadra.random(rate)) {
                                item_count += 1;
                            }
                        }
                        if (item_count < min) {
                            item_count = min;
                        }

                        // アイテム入手
                        if (item_count > 0) {
                            $gameParty.gainItem(item, item_count);
                            if (!GetInformation && get_message && item_count > 0) {
                                $gameMessage.add(get_message.format(item.iconIndex, item.name, item_count));
                            }
                            get_item_count += 1;
                        }
                    } else { // ゴールド用
                        let gold = 0;
                        for (let j = 0; j < count; j++) {
                            if (Potadra.random(rate)) {
                                gold += Math.randomInt(item) + 1;
                            }
                        }
                        if (gold < min) {
                            gold = min;
                        }
                        // ゴールド入手
                        if (gold > 0) {
                            $gameParty.gainGold(gold);
                            if (!GetInformation && get_message) {
                                $gameMessage.add(GoldMessage.format(GoldIconIndex, gold, $dataSystem.currencyUnit));
                            }
                            get_item_count += 1;
                        }
                    }
                }
            }
        }

        // アイテム入手SE
        if (se && get_item_count > 0) {
            AudioManager.playSe({"name": se, "volume": volume, "pitch": pitch, "pan": pan});
        }

        if (GetInformation) {
            CommonPopupManager._popEnable = false;
        }
    }
})();
