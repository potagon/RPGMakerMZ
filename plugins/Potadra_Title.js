/*:
@plugindesc
タイトル処理 Ver1.2.1(2021/5/4)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_Title.js
@base Potadra_Base
@target MZ
@author ポテトドラゴン

・アップデート情報
- アノテーションの整理

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
タイトルの表示を色々変更します。

@param SelectOnlyNewGame
@type boolean
@text 常にニューゲーム
@desc 常にニューゲーム選択するかの設定
@on 選択する
@off 選択しない
@default false

@param FixedTitle
@type boolean
@text タイトル固定表示
@desc タイトルの固定表示を使用するかの設定
@on 表示する
@off 表示しない
@default false

@param FixedTitleName
@parent FixedTitle
@text 固定タイトル
@desc 固定タイトルの表示内容

@param SubTitle
@type boolean
@text サブタイトル表示
@desc サブタイトルを表示するかの設定
@on 表示する
@off 表示しない
@default false

@param SubTitleName
@parent SubTitle
@text サブタイトル
@desc サブタイトルの表示内容

@param Version
@type boolean
@text バージョン表示
@desc バージョンを表示するかの設定
@on 表示する
@off 表示しない
@default true

@param VersionName
@parent Version
@text バージョン名
@desc この文字列以降のタイトルをバージョンとして扱います
@default ver

@param VersionPos
@parent Version
@type number
@text バージョン分割位置
@desc バージョン名で分割したタイトルの
どこをバージョンとして使うかの設定
@default 1

@param VersionId
@parent Version
@type boolean
@text バージョンID表示
@desc $dataSystem["versionId"]を表示するかの設定
@on 表示する
@off 表示しない
@default true

@param VersionIdName
@parent Version
@text バージョンID区切り文字
@desc バージョンIDの区切りとして使う文字
@default .
*/
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name = Potadra.getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用変数
    const SelectOnlyNewGame = Potadra.convertBool(params.SelectOnlyNewGame);
    const FixedTitle        = Potadra.convertBool(params.FixedTitle);
    const FixedTitleName    = String(params.FixedTitleName) || '';
    const SubTitle          = Potadra.convertBool(params.SubTitle);
    const SubTitleName      = String(params.SubTitleName) || '';
    const Version           = Potadra.convertBool(params.Version);
    const VersionName       = String(params.VersionName) || 'ver';
    const VersionPos        = Number(params.VersionPos || 1);
    const VersionId         = Potadra.convertBool(params.VersionId);
    const VersionIdName     = String(params.VersionIdName);

    /**
     * タイトル画面で、ニューゲーム／コンティニューを選択するウィンドウです。
     *
     * @class
     */
    if(SelectOnlyNewGame) {
        Window_TitleCommand.prototype.selectLast = function() {
            this.selectSymbol('newGame');
        };
    }


    /**
     * タイトル画面の処理を行うクラスです。
     *
     * @class
     */
    if(FixedTitle) {
        /**
         * ゲームタイトルの描画
         */
        Scene_Title.prototype.drawGameTitle = function() {
            const x = 20;
            const y = Graphics.height / 4;
            const maxWidth = Graphics.width - x * 2;
            const text = FixedTitleName;
            const bitmap = this._gameTitleSprite.bitmap;
            bitmap.fontFace = $gameSystem.mainFontFace();
            bitmap.outlineColor = "black";
            bitmap.outlineWidth = 8;
            bitmap.fontSize = 72;
            bitmap.drawText(text, x, y, maxWidth, 48, "center");
        };
    }

    /**
     * 前景の作成
     */
    const _Scene_Title_createForeground = Scene_Title.prototype.createForeground;
    Scene_Title.prototype.createForeground = function() {
        _Scene_Title_createForeground.apply(this, arguments);
        if (SubTitle) {
            this.drawSubTitle();
        }
        if (Version) {
            this.drawVersion();
        }
    };

    /**
     * サブタイトルの描画
     */
    Scene_Title.prototype.drawSubTitle = function() {
        const x = 20;
        const y = Graphics.height / 4 + 70;
        const maxWidth = Graphics.width - x * 2;
        const text = SubTitleName;
        const bitmap = this._gameTitleSprite.bitmap;
        bitmap.outlineColor = 'black';
        bitmap.outlineWidth = 8;
        bitmap.fontSize = 36;
        bitmap.drawText(text, x, y, maxWidth, 48, 'center');
    };

    /**
     * バージョンの描画
     */
    Scene_Title.prototype.drawVersion = function() {
        const x = 12;
        const y = Graphics.height - 48;
        const maxWidth = Graphics.width - x * 2;
        let text = VersionName;

        if($dataSystem.gameTitle.includes(VersionName)) {
        text += $dataSystem.gameTitle.split(VersionName)[VersionPos];
        if (VersionId) {
            text += VersionIdName + $dataSystem.versionId;
        }
        } else {
        text += VersionIdName + $dataSystem.versionId;
        }
        const bitmap = this._gameTitleSprite.bitmap;
        bitmap.outlineColor = 'black';
        bitmap.outlineWidth = 8;
        bitmap.fontSize = 24;
        bitmap.drawText(text, x, y, maxWidth, 48);
    };
})();
