/*:
@plugindesc
セーブ暗号化解除 Ver1.1.0

@base Potadra_Base

@target MZ
@author ポテトドラゴン
@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_Save_NoEncrypt.js

@help
セーブ内容を暗号化と圧縮しないようにします。

このプラグイン導入前のセーブは、読み書き不可能になるので、一度削除するか、
セーブを実施し、上書きしてください。

また、圧縮をしないため、ゲームを公開する前にプラグインをOFFもしくは、
削除することをおすすめします。

@param PlayTest
@type boolean
@text テスト時有効
@desc テスト時のみ有効にするか
@on 有効にする
@off 有効にしない
@default true
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

    // パラメータ用定数
    const plugin_name = Potadra.getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用定数
    const PlayTest = Potadra.convertBool(params.PlayTest);

    if (!PlayTest || Utils.isOptionValid("test")) {
        /**
         * 
         *
         * @param {} saveName - 
         * @param {} object - 
         */
        StorageManager.saveObject = function(saveName, object) {
            return this.objectToJson(object)
                .then(zip => this.saveZip(saveName, zip));
        };

        /**
         * 
         *
         * @param {} saveName - 
         */
        StorageManager.loadObject = function(saveName) {
            return this.loadZip(saveName)
                .then(json => this.jsonToObject(json));
        };
    }
})();
