/*:
@plugindesc
ゲーム開始時実行 Ver0.5.0(2021/5/29)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_NewGame.js
@base Potadra_Base
@orderAfter Potadra_Base
@target MZ
@author ポテトドラゴン

・アップデート情報
- 開発版

・TODO
- ゲーム開始時のプレイヤー位置の変更機能追加

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
ゲーム開始時に実行されるプラグインです。

## 使い方
使用したい機能のパラメータを設定してください

@param SetGold
@type boolean
@text 所持金設定
@desc ゲーム開始時の所持金を設定するか
@on 設定する
@off 設定しない
@default false

@param StartGold
@parent SetGold
@type number
@text ゲーム開始所持金
@desc ゲーム開始時の所持金
@default 1000
@min 0

@param StepAnime
@type boolean
@text 初期足踏みアニメ
@desc ニューゲームで開始したときにアクターが
足踏みをするようになります
@on 足踏みする
@off 足踏みしない
@default false
*/
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name = Potadra.getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用変数
    const SetGold   = Potadra.convertBool(params.SetGold);
    const StartGold = Number(params.StartGold);
    const StepAnime = Potadra.convertBool(params.StepAnime);

    // 所持金設定
    if (SetGold) {
        /**
         * パーティを扱うクラスです。所持金やアイテムなどの情報が含まれます。
         * このクラスのインスタンスは $gameParty で参照されます。
         *
         * @class
         */

        /**
         * オブジェクト初期化
         */
        const _Game_Party_initialize = Game_Party.prototype.initialize;
        Game_Party.prototype.initialize = function() {
            _Game_Party_initialize.apply(this, arguments);
            this._gold = StartGold; // 所持金
        };

        /**
         * 所持金の設定
         *
         * @param {} amount -
         */
        Game_Party.prototype.setGold = function(amount) {
            this._gold = amount;
        };
    }

    // 初期足踏みアニメ
    if (StepAnime) {
        /**
         * キャラクターを扱う基本のクラスです。
         * 全てのキャラクターに共通する、
         * 座標やグラフィックなどの基本的な情報を保持します。
         *
         * @class
         */

        /**
         * オブジェクト初期化
         */
        const _Game_CharacterBase_initialize = Game_CharacterBase.prototype.initialize;
        Game_CharacterBase.prototype.initialize = function() {
            _Game_CharacterBase_initialize.apply(this, arguments);
            this._stepAnime = true;
        };
    }

    /**
     * ゲーム開始時のプレイヤー位置
     */
    /*Game_Player.prototype.setupForNewGame = function() {
        const mapId = $dataSystem.startMapId;
        const x = $dataSystem.startX;
        const y = $dataSystem.startY;
        this.reserveTransfer(mapId, x, y, 2, 0); // 下を向く
    };*/
})();
