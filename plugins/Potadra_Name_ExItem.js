/*:
@plugindesc
アイテム名参照制御文字 Ver1.1.0

@base Potadra_Base

@target MZ
@author ポテトドラゴン
@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_Name_ExItem.js

@help
アイテム名を参照する制御文字 \II を追加します。
*/

/*
Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

・Ver1.1.0(2021/4/4)
- プラグイン名変更
*/

// パラメータ定義
(() => {
    'use strict';

    /**
     * 制御文字の事前変換
     *    実際の描画を始める前に、原則として文字列に変わるものだけを置き換える。
     *    文字「\」はエスケープ文字（\e）に変換。
     *
     * @param {} text - 
     * @returns {} 
     */
    const _Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
    Window_Base.prototype.convertEscapeCharacters = function(text) {
        let tmp_text = _Window_Base_convertEscapeCharacters.apply(this, arguments);
        tmp_text = tmp_text.replace(/\x1bII\[(.+?)\](.*)/gi, (_, p1, p2) =>
            "\x1bI[" + Potadra.itemSearch(p1, 'iconIndex') + "]" + p1 + p2
        );
        return tmp_text;
    };
})();