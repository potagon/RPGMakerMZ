/*:
@plugindesc
TP初期化0 Ver1.2.3(2021/5/27)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_Battle_InitTp.js
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
戦闘開始時のTPを0にします。  
TP持ち越しの特徴がある場合は 0 ではなく、戦闘開始前のTPになります。

## 使い方
初期設定は必要ありません。  
プラグイン導入だけで動作します。

@param InitTp
@type number
@text 戦闘開始TP初期値
@desc 戦闘開始時のTP初期値
@default 0
*/
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name = Potadra.getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用変数
    const InitTp = Number(params.InitTp || 0);

    /**
     * TP の初期化
     */
    Game_Battler.prototype.initTp = function() {
        this.setTp(InitTp);
    };
})();
