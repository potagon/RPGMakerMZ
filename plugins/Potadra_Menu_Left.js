/*:
@plugindesc
左メニュー Ver0.5.0

@base Potadra_Base

@target MZ
@author ポテトドラゴン
@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_Menu_Left.js

@help
メニューを左側に表示します。

@param PageButtonPosition
@type boolean
@text ページ切り替えボタン位置
@desc ページ切り替えボタンの位置
@on 左揃え
@off 右揃え
@default true
*/

/*
Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

・Ver0.5.0(2021/5/3)
- 開発版を公開
*/

// パラメータ定義
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name = Potadra.getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用定数
    const PageButtonPosition = Potadra.convertBool(params.PageButtonPosition);

    /**
     * 右手持ちモード
     *
     * @returns {boolean} true: 右にメニューを配置、false: 左にメニューを配置
     */
    Scene_Base.prototype.isRightInputMode = function() {
        return false;
    };

    /**
     * キャンセルボタン作成
     */
    Scene_MenuBase.prototype.createCancelButton = function() {
        this._cancelButton = new Sprite_Button("cancel");
        this._cancelButton.x = 0;
        this._cancelButton.y = this.buttonY();
        this.addWindow(this._cancelButton);
    };

    /**
     * ページ切り替えボタン作成
     */
    Scene_MenuBase.prototype.createPageButtons = function() {
        this._pageupButton = new Sprite_Button("pageup");
        if (PageButtonPosition) {
            this._pageupButton.x = this._cancelButton.width + 4;
        } else {
            this._pageupButton.x = Graphics.boxWidth - this._cancelButton.width - 4;
        }
        this._pageupButton.y = this.buttonY();
        const pageupRight = this._pageupButton.x + this._pageupButton.width;
        this._pagedownButton = new Sprite_Button("pagedown");
        this._pagedownButton.x = pageupRight + 4;
        this._pagedownButton.y = this.buttonY();
        this.addWindow(this._pageupButton);
        this.addWindow(this._pagedownButton);
        this._pageupButton.setClickHandler(this.previousActor.bind(this));
        this._pagedownButton.setClickHandler(this.nextActor.bind(this));
    };
})();
