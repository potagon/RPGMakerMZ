/*:
@plugindesc
BGMランダム再生 Ver1.3.3(2021/5/27)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_Command_RandomBgm.js
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
プラグインコマンド指定したBGMの中からランダムにBGMを再生します。

## 使い方


@param TitleRandom
@type boolean
@text タイトルランダム再生
@desc タイトルでランダム再生をするか
@on ランダム再生する
@off ランダム再生しない
@default false

@param title_bgms
@parent TitleRandom
@text タイトルBGM一覧
@type struct<BgmList>[]
@desc タイトルでランダム再生するBGMの一覧

@param BattleRandom
@type boolean
@text 戦闘ランダム再生
@desc 戦闘でランダム再生をするか
@on ランダム再生する
@off ランダム再生しない
@default false

@param battle_bgms
@parent BattleRandom
@text 戦闘BGM一覧
@type struct<BgmList>[]
@desc 戦闘中にランダム再生するBGMの一覧

@command random_bgm
@text BGMランダム再生
@desc 指定したBGMの中からランダムにBGMを再生します。

@arg bgms
@text BGM一覧
@type struct<BgmList>[]
@desc ランダムに再生するBGMの一覧
*/

/*~struct~BgmList:
@param bgm
@type file
@dir audio/bgm
@text BGM
@desc 再生するBGM

@param volume
@type number
@text 音量
@desc 再生するBGMの音量
@default 90
@max 100
@min 0

@param pitch
@type number
@text ピッチ
@desc 再生するBGMのピッチ
@default 100
@max 150
@min 50

@param pan
@type number
@text 位相
@desc 再生するBGMの位相
@default 0
@max 100
@min -100
*/
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name  = Potadra.getPluginName();
    const params       = PluginManager.parameters(plugin_name);
    const TitleRandom  = Potadra.convertBool(params.TitleRandom);
    const BattleRandom = Potadra.convertBool(params.BattleRandom);

    /**
     * BGM の存在判定
     */
    function BgmIsExist(bgm) {
        return Potadra.isExist('audio/bgm/' + bgm + '.ogg');
    }

    function PlayRandomBgm(bgm_lists) {
        const i        = Math.randomInt(bgm_lists.length);
        const bgm_info = JSON.parse(bgm_lists[i]);
        const bgm      = String(bgm_info.bgm);
        const volume   = Number(bgm_info.volume || 90);
        const pitch    = Number(bgm_info.pitch || 100);
        const pan      = Number(bgm_info.pan || 0);

        // bgmが存在するか判定
        if (BgmIsExist(bgm)) {
            // 存在する場合、BGM判定
            AudioManager.playBgm({"name": bgm, "volume": volume, "pitch": pitch, "pan": pan});
        } else {
            // 存在しない場合、再判定
            let exist_bgm_lists = [];

            for (let i = 0; i < bgm_lists.length; i++) {
                let bgm_info = JSON.parse(bgm_lists[i]);
                let bgm      = String(bgm_info.bgm);
                if (BgmIsExist(bgm)) {
                    exist_bgm_lists.push(bgm_info);
                }
            }

            // 一つも再生可能なBGMがない場合は、BGMを再生しない。
            if (exist_bgm_lists.length > 0) {
                const i        = Math.randomInt(exist_bgm_lists.length);
                const bgm_info = exist_bgm_lists[i];
                const bgm      = String(bgm_info.bgm);
                const volume   = Number(bgm_info.volume || 90);
                const pitch    = Number(bgm_info.pitch || 100);
                const pan      = Number(bgm_info.pan || 0);
                AudioManager.playBgm({"name": bgm, "volume": volume, "pitch": pitch, "pan": pan});
            }
        }
    }

    // プラグインコマンド(BGMランダム再生)
    PluginManager.registerCommand(plugin_name, "random_bgm", args => {
        const bgm_lists = JSON.parse(args.bgms);
        PlayRandomBgm(bgm_lists);
    });

    /**
     * タイトル画面の処理を行うクラスです。
     *
     * @class
     */

    /**
     * タイトル画面の音楽演奏
     */
    const _Scene_Title_playTitleMusic = Scene_Title.prototype.playTitleMusic;
    Scene_Title.prototype.playTitleMusic = function() {
        if (TitleRandom && params.title_bgms) {
            const title_bgm_lists = JSON.parse(params.title_bgms);
            PlayRandomBgm(title_bgm_lists);
            AudioManager.stopBgs();
            AudioManager.stopMe();
        } else {
            _Scene_Title_playTitleMusic.apply(this, arguments);
        }
    };


    /**
     * 戦闘の進行を管理する静的クラスです。
     *
     * @namespace
     */

    /**
     * 戦闘 BGM の演奏
     */
    const _BattleManager_playBattleBgm = BattleManager.playBattleBgm;
    BattleManager.playBattleBgm = function() {
        if (BattleRandom && params.battle_bgms) {
            const battle_bgm_lists = JSON.parse(params.battle_bgms);
            PlayRandomBgm(battle_bgm_lists);
            AudioManager.stopBgs();
        } else {
            _BattleManager_playBattleBgm.apply(this, arguments);
        }
    };
})();
