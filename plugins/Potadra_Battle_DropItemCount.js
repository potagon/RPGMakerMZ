/*:
@plugindesc
ドロップアイテム個数表示 Ver1.2.3(2021/5/27)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_Battle_DropItemCount.js
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
ドロップアイテムの個数をまとめて表示します。

同じアイテムを複数落としたときの表示が簡易化されます。  
細かい表示内容はパラメータで変更することも出来ます。

## 使い方
初期設定は必要ありません。  
プラグイン導入だけで動作します。

### 導入前
ポーションを手に入れた！
ポーションを手に入れた！

### 導入後
ポーションを2個手に入れた！
※ アイテム名の前にアイコンも表示されます。

@param ObtainItemMessage
@type multiline_string
@text アイテム入手メッセージ
@desc アイテム入手時のメッセージ。空文字の場合、表示しません
%1: アイコン番号 %2: アイテム名 %3: 個数
@default \I[%1]%2を%3個手に入れた！
*/
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name = Potadra.getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用変数
    const ObtainItemMessage = String(params.ObtainItemMessage);

    /**
     * 戦闘の進行を管理する静的クラスです。
     *
     * @namespace
     */

    /**
     * ドロップアイテムの表示
     */
    BattleManager.displayDropItems = function() {
        // ドロップアイテムを配列で取得
        const items = this._rewards.items;

        // ドロップアイテムがない場合は、終了
        if (items.length > 0) {
            // ドロップアイテムの個数を調べる
            const item_counts = {};
            items.forEach(function(item) {
                if (item) {
                    if (item_counts[item.name]) {
                        item_counts[item.name] += 1;
                    } else {
                        item_counts[item.name] = 1;
                    }
                }
            });

            // ドロップアイテムの表示
            const gain_items = [];
            $gameMessage.newPage();
            items.forEach(function(item) {
                if (item) {
                    // 同じアイテムを重複して表示しないようにする
                    if (gain_items.indexOf(item) == -1) {
                        if (ObtainItemMessage) {
                            $gameMessage.add(ObtainItemMessage.format(item.iconIndex, item.name, item_counts[item.name]));
                        }
                        gain_items.push(item);
                    }
                }
            });
        }
    };
})();
