/*:
@plugindesc
初期足踏みアニメ Ver1.2.0

@target MZ
@author ポテトドラゴン
@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_NewGame_StepAnime.js

@help
ニューゲームで開始したときにアクターが足踏みをするようになります。
*/

/*
Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

・Ver1.2.0(2021/4/4)
- プラグイン名変更
- インデント変更
*/

(() => {
    'use strict';

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
})();
