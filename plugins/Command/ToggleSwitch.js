/*:
@plugindesc
トグルスイッチ Ver1.2.0(2021/6/25)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Command/ToggleSwitch.js
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
指定したスイッチのON・OFFを交互に切り替える  
プラグインコマンドを提供します。

## 使い方


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
