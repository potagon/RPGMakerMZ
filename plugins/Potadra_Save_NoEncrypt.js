/*:
@plugindesc
セーブ暗号化解除 Ver1.1.3(2021/5/17)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_Save_NoEncrypt.js
@base Potadra_Base
@target MZ
@author ポテトドラゴン

・アップデート情報
- ヘルプ修正

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
セーブ内容の暗号化と圧縮をしないように変更します。

## 使い方
初期設定は必要ありません。  
プラグイン導入だけで動作します。

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

@param JsonFormat
@type boolean
@text JSON整形
@desc セーブしたときのJSONを整形するか
@on 整形する
@off 整形しない
@default true
*/
(() => {
    'use strict';

    // パラメータ用定数
    const plugin_name = Potadra.getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用定数
    const PlayTest   = Potadra.convertBool(params.PlayTest);
    const JsonFormat = Potadra.convertBool(params.JsonFormat);

    if (!PlayTest || Utils.isOptionValid("test")) {
        if (JsonFormat) {
            /**
             * 
             *
             * @param {} object - 
             */
            StorageManager.objectToJson = function(object) {
                return new Promise((resolve, reject) => {
                    try {
                        const json = JSON.stringify(JsonEx._encode(object, 0), null, 4);
                        resolve(json);
                    } catch (e) {
                        reject(e);
                    }
                });
            };
        }

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
