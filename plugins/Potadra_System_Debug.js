/*:
@plugindesc
デバッグ用のプラグイン Ver1.2.0

@base Potadra_Base

@target MZ
@author ポテトドラゴン
@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_System_Debug.js

@help
開発中に便利な機能を追加します。

@param SkipPluginLoadError
@type boolean
@text プラグインロードエラースキップ
@desc ONのプラグインが存在しなくても、ゲームを起動出来るようになります
@default false
*/

/*
Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

・Ver1.2.0(2021/4/4)
- プラグイン名変更
- インデント変更
*/

// パラメータ定義
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
