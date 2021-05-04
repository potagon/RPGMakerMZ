/*:
@plugindesc
戦闘コマンド非表示 Ver1.3.2(2021/5/4)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_Battle_HideCommand.js
@base Potadra_Base
@target MZ
@author ポテトドラゴン

・アップデート情報
- アノテーションの整理

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
戦闘コマンドの中で不要なものを非表示に出来ます。
パラメータで非表示設定が出来るので、不要なものを非表示にしてください。

@param HideAttackCommand
@type boolean
@text 攻撃コマンド非表示
@desc 攻撃コマンド非表示設定
@on 表示しない
@off 表示する
@default false

@param HideCannotAttack
@type boolean
@text 攻撃コマンド封印時非表示
@desc 攻撃コマンド(スキル１番)が封印されている場合非表示にする設定
@on 表示しない
@off 表示する
@default false

@param HideSkillCommand
@type boolean
@text スキルコマンド非表示
@desc スキルコマンド非表示設定
@on 表示しない
@off 表示する
@default false

@param HideGuardCommand
@type boolean
@text 防御コマンド非表示
@desc 防御コマンド非表示設定
@on 表示しない
@off 表示する
@default false

@param HideItemCommand
@type boolean
@text アイテムコマンド非表示
@desc アイテムコマンド非表示設定
@on 表示しない
@off 表示する
@default false
*/
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name = Potadra.getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用変数
    const HideAttackCommand = Potadra.convertBool(params.HideAttackCommand);
    const HideCannotAttack  = Potadra.convertBool(params.HideCannotAttack);
    const HideSkillCommand  = Potadra.convertBool(params.HideSkillCommand);
    const HideGuardCommand  = Potadra.convertBool(params.HideGuardCommand);
    const HideItemCommand   = Potadra.convertBool(params.HideItemCommand);

    /**
     * バトル画面で、アクターの行動を選択するウィンドウです。
     *
     * @class
     */

    /**
     * コマンドリストの作成
     */
    Window_ActorCommand.prototype.makeCommandList = function() {
        if (this._actor) {
            if (!HideAttackCommand) {
                if (!HideCannotAttack || HideCannotAttack && this._actor.canAttack()) {
                    this.addAttackCommand();
                }
            }
            if (!HideSkillCommand) {
                this.addSkillCommands();
            }
            if (!HideGuardCommand) {
                this.addGuardCommand();
            }
            if (!HideItemCommand) {
                this.addItemCommand();
            }
        }
    };
})();
