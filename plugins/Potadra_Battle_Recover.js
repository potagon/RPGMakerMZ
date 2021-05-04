/*:
@plugindesc
戦闘前後に全回復 Ver1.3.1(2021/5/4)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_Battle_Recover.js
@base Potadra_Base
@target MZ
@author ポテトドラゴン

・アップデート情報
- アノテーションの整理

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
戦闘の開始と終了時に全回復します。

回復する対象は(HP・MP・TP・ステート)です。
これらは、設定で変更することができます。
また、スイッチで全回復するかを任意に変更することもできます。

TPは、TP持ち越しの特徴がある場合のみ回復します。
※ TP持ち越しがない場合は、回復はしていますがリセットされます。

@param BattleStartRecover
@type boolean
@text 全回復(戦闘開始)
@desc 戦闘開始時に全回復するか
@on 回復する
@off 回復しない
@default true

@param StartRecoverSwitch
@parent BattleStartRecover
@type switch
@text 全回復(戦闘開始)有効スイッチ
@desc このスイッチがON のときに全回復（戦闘開始）を有効にします
0(なし)の場合は、スイッチは使用しません
@default 0

@param StartHpRecover
@parent BattleStartRecover
@type boolean
@text HP全回復
@desc HPを全回復するか
@on 回復する
@off 回復しない
@default true

@param StartMpRecover
@parent BattleStartRecover
@type boolean
@text MP全回復
@desc MPを全回復するか
@on 回復する
@off 回復しない
@default true

@param StartTpRecover
@parent BattleStartRecover
@type boolean
@text TP全回復
@desc TPを全回復するか
TP持ち越しの特徴がある場合のみ有効
@on 回復する
@off 回復しない
@default true

@param StartClearStates
@parent BattleStartRecover
@type boolean
@text ステート解除可否
@desc ステートを解除するかの設定
@on 解除する
@off 解除しない
@default true

@param BattleEndRecover
@type boolean
@text 全回復(戦闘終了)
@desc 戦闘終了時に全回復するか
@on 回復する
@off 回復しない
@default true

@param EndRecoverSwitch
@parent BattleEndRecover
@type switch
@text 全回復(戦闘終了)有効スイッチ
@desc このスイッチがON のときに全回復(戦闘終了)を有効にします
0(なし)の場合は、スイッチは使用しません
@default 0

@param EndHpRecover
@parent BattleEndRecover
@type boolean
@text HP全回復
@desc HPを全回復するか
@on 回復する
@off 回復しない
@default true

@param EndMpRecover
@parent BattleEndRecover
@type boolean
@text MP全回復
@desc MPを全回復するか
@on 回復する
@off 回復しない
@default true

@param EndTpRecover
@parent BattleEndRecover
@type boolean
@text TP全回復
@desc TPを全回復するか
TP持ち越しの特徴がある場合のみ有効
@on 回復する
@off 回復しない
@default true

@param EndClearStates
@parent BattleEndRecover
@type boolean
@text ステート解除可否
@desc ステートを解除するかの設定
@on 解除する
@off 解除しない
@default true
*/
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name = Potadra.getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用変数
    const BattleStartRecover = Potadra.convertBool(params.BattleStartRecover);
    const BattleEndRecover   = Potadra.convertBool(params.BattleEndRecover);
    const StartRecoverSwitch = Number(params.StartRecoverSwitch || 0);
    const StartHpRecover     = Potadra.convertBool(params.StartHpRecover);
    const StartMpRecover     = Potadra.convertBool(params.StartMpRecover);
    const StartTpRecover     = Potadra.convertBool(params.StartTpRecover);
    const StartClearStates   = Potadra.convertBool(params.StartClearStates);
    const EndHpRecover       = Potadra.convertBool(params.EndHpRecover);
    const EndMpRecover       = Potadra.convertBool(params.EndMpRecover);
    const EndTpRecover       = Potadra.convertBool(params.EndTpRecover);
    const EndClearStates     = Potadra.convertBool(params.EndClearStates);
    const EndRecoverSwitch   = Number(params.EndRecoverSwitch || 0);

    /**
     * 戦闘の進行を管理する静的クラスです。
     *
     * @namespace
     */

    /**
     * 戦闘開始
     */
    if(BattleStartRecover) {
        if(StartRecoverSwitch === 0 || $gameSwitches.value(StartRecoverSwitch) === true) {
            const _BattleManager_startBattle = BattleManager.startBattle;
            BattleManager.startBattle = function() {
                $gameParty.battleMembers().forEach(function(actor) {
                    actor.startRecover();
                }, this);
                _BattleManager_startBattle.apply(this, arguments);
            };
        }
    }

    /**
     * 戦闘終了
     *
     * @param {} result - 結果（0:勝利 1:逃走 2:敗北）
     */
    if(BattleEndRecover) {
        if(EndRecoverSwitch === 0 || $gameSwitches.value(EndRecoverSwitch) === true) {
            const _BattleManager_endBattle = BattleManager.endBattle;
            BattleManager.endBattle = function(result) {
                $gameParty.battleMembers().forEach(function(actor) {
                    actor.endRecover();
                }, this);
                _BattleManager_endBattle.apply(this, arguments);
            };
        }
    }


    /**
     * バトラーを扱う基本のクラスです。
     * 主に能力値計算のメソッドを含んでいます。
     * このクラスは Game_Battler クラスのスーパークラスとして使用されます。
     *
     * @class
     */

    /**
     * 戦闘開始時全回復
     */
    Game_BattlerBase.prototype.startRecover = function() {
        if (StartHpRecover) {
            this._hp = this.mhp;
        }
        if (StartMpRecover) {
            this._mp = this.mmp;
        }
        if (StartTpRecover) {
            this._tp = this.maxTp();
        }
        if (StartClearStates) {
            this.clearStates();
        }
    };

    /**
     * 戦闘終了時全回復
     */
    Game_BattlerBase.prototype.endRecover = function() {
        if (EndHpRecover) {
            this._hp = this.mhp;
        }
        if (EndMpRecover) {
            this._mp = this.mmp;
        }
        if (EndTpRecover) {
            this._tp = this.maxTp();
        }
        if (EndClearStates) {
            this.clearStates();
        }
    };
})();
