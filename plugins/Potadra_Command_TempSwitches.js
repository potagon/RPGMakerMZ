/*:
@plugindesc
一時スイッチ Ver0.5.1(2021/5/4)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_Command_TempSwitches.js
@base Potadra_Base
@target MZ
@author ポテトドラゴン

・アップデート情報
- アノテーションの整理

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
セーブデータとして保持しない一時スイッチを
操作するプラグインコマンドを追加します。

■ 使い方

一時スイッチは条件分岐のスクリプトに以下の条件を入れることで参照できます。
$gameTemp._TempSwitches[一時スイッチ番号]

例: 一時スイッチ番号1を指定する場合
$gameTemp._TempSwitches[1]

@command temp_switch_on
@text 一時スイッチON
@desc 指定した一時スイッチをONにします。

@arg temp_switch
@type number
@text 一時スイッチ番号
@desc 操作する一時スイッチ番号を指定します。
@default 1
@min 0

@command temp_switch_off
@text 一時スイッチOFF
@desc 指定した一時スイッチをOFFにします。

@arg temp_switch
@type number
@text 一時スイッチ番号
@desc 操作する一時スイッチ番号を指定します。
@default 1
@min 0

@command temp_switch_toggle
@text 一時スイッチトグル
@desc 指定したスイッチのON・OFFを交互に切り替えます

@arg temp_switch
@type number
@text 一時スイッチ番号
@desc 操作する一時スイッチ番号を指定します。
@default 1
@min 0
*/
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name = Potadra.getPluginName();

    const _Game_Temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function() {
        _Game_Temp_initialize.apply(this, arguments);
        this._TempSwitches = [];
    };

    // プラグインコマンド(一時スイッチON)
    PluginManager.registerCommand(plugin_name, "temp_switch_on", args => {
        const temp_switch = Number(args.temp_switch);
        $gameTemp._TempSwitches[temp_switch] = true;
    });

    // プラグインコマンド(一時スイッチOFF)
    PluginManager.registerCommand(plugin_name, "temp_switch_off", args => {
        const temp_switch = Number(args.temp_switch);
        $gameTemp._TempSwitches[temp_switch] = false;
    });

    // プラグインコマンド(一時スイッチトグル)
    PluginManager.registerCommand(plugin_name, "temp_switch_toggle", args => {
        const temp_switch = Number(args.temp_switch);
        $gameTemp._TempSwitches[temp_switch] = !$gameTemp._TempSwitches[temp_switch];
    });
})();
