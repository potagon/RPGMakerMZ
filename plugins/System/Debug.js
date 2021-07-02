/*:
@plugindesc
デバッグ用のプラグイン Ver1.3.1(2021/7/2)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/System/Debug.js
@base Potadra
@orderAfter Potadra
@target MZ
@author ポテトドラゴン

・アップデート情報
- 幾つか機能追加
- Font.js の機能を統合

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
開発中に便利な機能を追加します。

## 使い方
以下の機能を提供します。
使いたい機能のパラメータを変更してください。

1. プラグインロードエラースキップ
2. プラグインで画面サイズ(解像度)変更
3. プラグインでフォント変更
4. ヘルプ上部表示モード
5. ボタン下部表示モード

@param SkipPluginLoadError
@type boolean
@text プラグインロードエラースキップ
@desc プラグインのロードエラーをスキップするか
ONのプラグインがない状態で、ゲームを起動可能になります
@on スキップする
@off スキップしない
@default true

@param EnableResolution
@type boolean
@text 画面サイズ(解像度)変更
@desc プラグインで画面サイズ(解像度)変更するか
@on 変更する
@off 変更しない
@default false

@param ResolutionWidth
@parent EnableResolution
@type number
@text 画面サイズ(解像度)の幅
@desc 画面の横の長さ
@default 816
@min 0
@max 2000

@param ResolutionHeight
@parent EnableResolution
@type number
@text 画面サイズ(解像度)の高さ
@desc 画面の縦の長さ
@default 624
@min 0
@max 2000

@param EnableFont
@type boolean
@text プラグインでフォント変更
@desc フォントをプラグインで切り替えるように変更します
@default false

@param mainFontFilename
@parent EnableFont
@type string
@text メインフォント
@desc メインフォントのファイル名
@default mplus-1m-regular.woff

@param numberFontFilename
@parent EnableFont
@type string
@text 数字フォント
@desc 数字フォントのファイル名
@default mplus-2p-bold-sub.woff

@param isTopHelpMode
@type boolean
@text ヘルプ上部表示モード
@desc ヘルプを上部に表示するように変更します
@default false

@param isBottomButtonMode
@type boolean
@text ボタン下部表示モード
@desc ボタンを下部に表示するように変更します
@default false
*/
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name = Potadra.getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用変数
    const SkipPluginLoadError = Potadra.convertBool(params.SkipPluginLoadError);
    const EnableResolution    = Potadra.convertBool(params.EnableResolution);
    const ResolutionWidth     = Number(params.ResolutionWidth || 816);
    const ResolutionHeight    = Number(params.ResolutionHeight || 624);
    const EnableFont          = Potadra.convertBool(params.EnableFont);
    const mainFontFilename    = String(params.mainFontFilename) || 'mplus-1m-regular.woff';
    const numberFontFilename  = String(params.numberFontFilename) || 'mplus-2p-bold-sub.woff';
    const isTopHelpMode       = Potadra.convertBool(params.isTopHelpMode);
    const isBottomButtonMode  = Potadra.convertBool(params.isBottomButtonMode);

    /**
     * プラグインロードエラースキップ
     */
    if (SkipPluginLoadError) {
        PluginManager.checkErrors = function() {};
    }

    /**
     * フォントの読み込み
     */
    if (EnableFont) {
        Scene_Boot.prototype.loadGameFonts = function() {
            FontManager.load("rmmz-mainfont", mainFontFilename);
            FontManager.load("rmmz-numberfont", numberFontFilename);
        };
    }

    /**
     * 画面サイズ(解像度)の変更
     */
    if (EnableResolution) {
        /**
         * 画面の幅・高さ
         */
        Scene_Boot.prototype.resizeScreen = function() {
            const screenWidth = ResolutionWidth;
            const screenHeight = ResolutionHeight;
            Graphics.resize(screenWidth, screenHeight);
            this.adjustBoxSize();
            this.adjustWindow();
        };

        /**
         * UIエリアの幅・高さ
         */
        Scene_Boot.prototype.adjustBoxSize = function() {
            const uiAreaWidth = ResolutionWidth;
            const uiAreaHeight = ResolutionHeight;
            const boxMargin = 4;
            Graphics.boxWidth = uiAreaWidth - boxMargin * 2;
            Graphics.boxHeight = uiAreaHeight - boxMargin * 2;
        };
    }

    /**
     * ヘルプ下部表示モード
     *
     * @returns {} 
     */
    if (isTopHelpMode) {
        Scene_Base.prototype.isBottomHelpMode = function() {
            return false;
        };
    }

    /**
     * ボタン下部表示モード
     *
     * @returns {} 
     */
    if (isBottomButtonMode) {
        Scene_Base.prototype.isBottomButtonMode = function() {
            return true;
        };
    }
})();
