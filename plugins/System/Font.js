/*:
@plugindesc
フォント Ver0.5.0(2021/6/27)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/System/Font.js
@base Potadra
@orderAfter Potadra
@target MZ
@author ポテトドラゴン

・アップデート情報
- 開発版

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
フォントをプラグインで切り替えるように変更します。

## 使い方
1. fonts フォルダに使いたいフォントを配置します。
2. パラメータでフォント名を指定します。

@param mainFontFilename
@type string
@text メインフォント
@desc メインフォントのファイル名
@default mplus-1m-regular.woff

@param numberFontFilename
@type string
@text 数字フォント
@desc 数字フォントのファイル名
@default mplus-2p-bold-sub.woff
*/
(() => {
    'use strict';

    // パラメータ用定数
    const plugin_name = Potadra.getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用定数
    const mainFontFilename   = String(params.mainFontFilename) || 'mplus-1m-regular.woff';
    const numberFontFilename = String(params.numberFontFilename) || 'mplus-2p-bold-sub.woff';

    /**
     * フォントの読み込み
     */
    Scene_Boot.prototype.loadGameFonts = function() {
        FontManager.load("rmmz-mainfont", mainFontFilename);
        FontManager.load("rmmz-numberfont", numberFontFilename);
    };
})();
