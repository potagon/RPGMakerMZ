/*:
@plugindesc
デバッグ用のプラグイン Ver1.2.4(2021/6/15)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_System_Debug.js
@base Potadra_Base
@orderAfter Potadra_Base
@target MZ
@author ポテトドラゴン

・アップデート情報
- プラグインロードエラースキップのデフォルト値を変更

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
開発中に便利な機能を追加します。

## 使い方


@param SkipPluginLoadError
@type boolean
@text プラグインロードエラースキップ
@desc ONのプラグインが存在しなくても、ゲームを起動出来るようになります
@default true
*/
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name = Potadra.getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用変数
    const SkipPluginLoadError = Potadra.convertBool(params.SkipPluginLoadError);

    /**
     *
     */
    if (SkipPluginLoadError) {
        PluginManager.checkErrors = function() {};
    }
})();
