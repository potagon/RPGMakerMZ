/*:
@plugindesc
初期足踏みアニメ Ver1.2.1(2021/5/4)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_NewGame_StepAnime.js
@target MZ
@author ポテトドラゴン

・アップデート情報
- アノテーションの整理

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
ニューゲームで開始したときにアクターが足踏みをするようになります。
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
