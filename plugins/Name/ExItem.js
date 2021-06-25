/*:
@plugindesc
アイテム名参照制御文字 Ver1.2.0(2021/6/25)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Name/ExItem.js
@target MZ
@author ポテトドラゴン

・アップデート情報
- プラグイン名変更

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
アイテム名を参照する制御文字 \II を追加します。

## 使い方

*/
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
