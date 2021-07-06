/*:
@plugindesc
トグルスイッチ Ver1.2.1(2021/7/7)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Command/ToggleSwitch.js
@base Potadra
@orderAfter Potadra
@target MZ
@author ポテトドラゴン

・アップデート情報
- ヘルプ記載
- TODO追記

・TODO
- セルフスイッチ対応

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
指定したスイッチのON・OFFを交互に切り替える  
プラグインコマンドを提供します。

## 使い方
1. プラグインコマンドを呼び出します
2. プラグインコマンドからON・OFFを交互に切り替えたいスイッチを指定します。
3. プラグインコマンドを指定したイベントが呼び出されると、指定したスイッチのON・OFFが切り替わります。

@command toggle_switch
@text トグルスイッチ
@desc 指定したスイッチのON・OFFを交互に切り替えます

@arg ToggleSwitch
@type switch
@text トグルスイッチ
@desc ON・OFFを交互に切り替えるスイッチ
*/
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name = Potadra.getPluginName();

    // プラグインコマンド(トグルスイッチ)
    PluginManager.registerCommand(plugin_name, "toggle_switch", args => {
        const ToggleSwitch = Number(args.ToggleSwitch);
        $gameSwitches.setValue(ToggleSwitch, !$gameSwitches.value(ToggleSwitch));
    });
})();
