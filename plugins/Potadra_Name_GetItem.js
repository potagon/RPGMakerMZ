/*:
@plugindesc
アイテム取得 Ver1.3.3(2021/5/17)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_Name_GetItem.js
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
名前からアイテムを取得する  
プラグインコマンドを提供します。

## 使い方


@command get_item
@text アイテム取得
@desc 名前からアイテムを取得します

@arg name
@type string
@text 名前
@desc 取得したいアイテムの名称

@arg count
@type number
@text 個数
@desc 取得したいアイテムの個数
@default 1
@min -99999

@arg message
@type multiline_string
@text アイテム入手メッセージ
@desc アイテム獲得時のメッセージ。空文字の場合、表示しません
%1: アイコン番号 %2: アイテム名 %3: 個数
@default \I[%1]%2を%3個手に入れた！

@arg se
@type file
@dir audio/se
@text アイテム入手SE
@desc アイテム入手時に再生するSE
指定しない場合、再生しません
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
*/
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name = Potadra.getPluginName();

    // プラグインの導入有無
    const GetInformation = Potadra.isPlugin('GetInformation');

    // プラグインコマンド(アイテム取得)
    PluginManager.registerCommand(plugin_name, "get_item", args => {
        const name    = String(args.name);
        const count   = Number(args.count || 1);
        const message = String(args.message);
        const se      = String(args.se);
        const volume  = Number(args.volume || 90);
        const pitch   = Number(args.pitch || 100);
        const pan     = Number(args.pan || 0);
        const item    = Potadra.itemSearch(name);
        if (GetInformation) {
            CommonPopupManager._popEnable = CommonPopupManager.popEnable();
        }
        $gameParty.gainItem(item, count);
        if (GetInformation) {
            CommonPopupManager._popEnable = false;
        }
        if (se) {
            AudioManager.playSe({"name": se, "volume": volume, "pitch": pitch, "pan": pan});
        }
        if (!GetInformation && message) {
            $gameMessage.add(message.format(item.iconIndex, item.name, count));
        }
    });
})();
