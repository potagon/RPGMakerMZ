/*:
@plugindesc
戦闘スキル・アイテム選択MV風 Ver0.5.1(2021/5/4)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_Battle_SkillAndItem_MV.js
@base Potadra_Base
@target MZ
@author ポテトドラゴン

・アップデート情報
- アノテーションの整理

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
戦闘中のスキルとアイテム選択をMV風に変更します。

@param CancelButtonPosition
@type boolean
@text キャンセルボタン位置
@desc キャンセルボタンの位置
@on 左揃え
@off 右揃え
@default false

@param CommandAndStatusShow
@type boolean
@text コマンド・ステータス表示可否
@desc コマンド・ステータスの表示可否
@on 表示する
@off 表示しない
@default true
*/
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name = Potadra.getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用定数
    const CancelButtonPosition = Potadra.convertBool(params.CancelButtonPosition);
    const CommandAndStatusShow = Potadra.convertBool(params.CommandAndStatusShow);

    /**
     * スキルウィンドウのサイズ指定(アイテムウィンドウもデフォルトはこちらで設定)
     *
     * @returns {} 
     */
    Scene_Battle.prototype.skillWindowRect = function() {
        const ww = Graphics.boxWidth;
        let wh = Graphics.boxHeight - this.helpAreaTop() - this.helpAreaHeight();

        // コマンド・ステータスを表示する場合、その分だけスキルウィンドウのサイズを小さくする。
        if (CommandAndStatusShow) {
            wh -= Math.max(this._statusWindow.height, this._actorCommandWindow.height);
        }

        const wx = 0;
        const wy = this.helpAreaTop() + this.helpAreaHeight();
        return new Rectangle(wx, wy, ww, wh);
    };

    /**
     * ヘルプ位置
     *
     * @returns {} 
     */
    Scene_Battle.prototype.helpAreaTop = function() {
        return 50;
    };

    /**
     * キャンセルボタン作成
     */
    Scene_Battle.prototype.createCancelButton = function() {
        this._cancelButton = new Sprite_Button("cancel");
        if (CancelButtonPosition) {
            this._cancelButton.x = 4;
        } else {
            this._cancelButton.x = Graphics.boxWidth - this._cancelButton.width - 4;
        }
        this._cancelButton.y = 0;
        this.addWindow(this._cancelButton);
    };

    /**
     * コマンド［スキル］
     */
    Scene_Battle.prototype.commandSkill = function() {
        this._skillWindow.setActor(BattleManager.actor());
        this._skillWindow.setStypeId(this._actorCommandWindow.currentExt());
        this._skillWindow.refresh();
        this._skillWindow.show();
        this._skillWindow.activate();
        if (!CommandAndStatusShow) {
            this._statusWindow.hide();
            this._actorCommandWindow.hide();
        }
    };

    /**
     * コマンド［アイテム］
     */
    Scene_Battle.prototype.commandItem = function() {
        this._itemWindow.refresh();
        this._itemWindow.show();
        this._itemWindow.activate();
        if (!CommandAndStatusShow) {
            this._statusWindow.hide();
            this._actorCommandWindow.hide();
        }
    };
})();
