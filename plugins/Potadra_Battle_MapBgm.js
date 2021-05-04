/*:
@plugindesc
マップ戦闘BGM Ver1.1.1(2021/5/4)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_Battle_MapBgm.js
@base Potadra_Base
@target MZ
@author ポテトドラゴン

・アップデート情報
- アノテーションの整理

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
戦闘になったとき、マップのBGMをそのまま使用します。

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
    const StopVictoryMe = Potadra.convertBool(params.StopVictoryMe);

    /**
     * 戦闘 BGM の演奏
     */
    BattleManager.playBattleBgm = function() {
    };

    /**
     * 戦闘終了 ME の演奏
     */
    BattleManager.playVictoryMe = function() {
        if (StopVictoryMe) {
            AudioManager.playMe($gameSystem.victoryMe());
        }
    };

    /**
     * 戦闘開始前、マップBGM停止
     */
    Scene_Map.prototype.stopAudioOnBattleStart = function() {
    };
})();
