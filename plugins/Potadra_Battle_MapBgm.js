/*:
@plugindesc
マップ戦闘BGM Ver1.1.3(2021/5/27)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_Battle_MapBgm.js
@base Potadra_Base
@orderAfter Potadra_Base
@target MZ
@author ポテトドラゴン

・アップデート情報
- ベースプラグイン(Potadra_Base.js)の順序で問題を発生するように修正

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
戦闘になったとき、マップのBGMをそのまま使用します。

## 使い方
初期設定は必要ありません。  
プラグイン導入だけで動作します。

@param MapBgmSwitch
@type switch
@text マップBGMスイッチ
@desc このスイッチがON のときにマップBGMを戦闘BGMにします
0(なし)の場合は、常にマップBGMとなります。
@default 0

@param StopVictoryMe
@type boolean
@text 戦闘終了ME停止
@desc 戦闘終了MEを止めるか
止めない場合、BGMを中断して戦闘終了ME が流れます
@on 止める
@off 止めない
@default true
*/
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name = Potadra.getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用定数
    const MapBgmSwitch  = Number(params.MapBgmSwitch || 0);
    const StopVictoryMe = Potadra.convertBool(params.StopVictoryMe);

    /**
     * 戦闘 BGM の演奏
     */
    const _BattleManager_playBattleBgm = BattleManager.playBattleBgm;
    BattleManager.playBattleBgm = function() {
        if (Potadra.checkSwitch(MapBgmSwitch)) {
            // 何もしない
        } else {
            _BattleManager_playBattleBgm.apply(this, arguments);
        }
    };

    /**
     * 戦闘終了 ME の演奏
     */
    const _BattleManager_playVictoryMe = BattleManager.playVictoryMe;
    BattleManager.playVictoryMe = function() {
        if (Potadra.checkSwitch(MapBgmSwitch)) {
            if (StopVictoryMe) {
                AudioManager.playMe($gameSystem.victoryMe());
            }
        } else {
            _BattleManager_playVictoryMe.apply(this, arguments);
        }
    };

    /**
     * 戦闘開始前、マップBGM停止
     */
    const _Scene_Map_stopAudioOnBattleStart = Scene_Map.prototype.stopAudioOnBattleStart;
    Scene_Map.prototype.stopAudioOnBattleStart = function() {
        if (Potadra.checkSwitch(MapBgmSwitch)) {
            // 何もしない
        } else {
            _Scene_Map_stopAudioOnBattleStart.apply(this, arguments);
        }
    };
})();
