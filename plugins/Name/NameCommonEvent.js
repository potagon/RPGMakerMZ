/*:
@plugindesc
名前コモンイベント呼び出し Ver1.0.0(2021/7/3)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Name/NameCommonEvent.js
@base Potadra
@orderAfter Potadra
@target MZ
@author ポテトドラゴン

・アップデート情報
- 公開

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
名前でコモンイベントを呼び出します。

## 使い方


@command common_event
@text コモンイベント呼び出し
@desc 名前からコモンイベントを呼び出します

@arg name
@type string
@text 名前
@desc コモンイベントの呼び出しに使う名称
*/
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name = Potadra.getPluginName();

    // プラグインコマンド(コモンイベント呼び出し)
    PluginManager.registerCommand(plugin_name, "common_event", args => {
        const name = String(args.name);
        const id   = Potadra.nameSearch($dataCommonEvents, name);
        if (id) {
            $gameTemp.reserveCommonEvent(id);
        }
    });
})();
