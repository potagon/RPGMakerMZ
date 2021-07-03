/*:
@plugindesc
オプションボリューム切り替え範囲 Ver1.0.0(2021/7/3)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Option/VolumeOffset.js
@target MZ
@author ポテトドラゴン

・アップデート情報
- プラグイン名変更

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
オプションのボリューム切り替え範囲を変更します。

## 使い方


@param volumeOffset
@type number
@text ボリューム切替範囲
@desc ボリュームの切り替え範囲
@default 20
@min 1
@max 100
*/
(() => {
    'use strict';

    // パラメータ用定数
    const plugin_name = Potadra.getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用定数
    const volumeOffset = Number(params.volumeOffset || 0);

    /**
     * ボリュームの切り替え範囲
     *
     * @returns {} 
     */
    Window_Options.prototype.volumeOffset = function() {
        return volumeOffset;
    };
})();
