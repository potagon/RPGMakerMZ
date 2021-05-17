/*:
@plugindesc
被ダメージ時にTPを回復しない Ver1.2.2(2021/5/17)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_Battle_NoChargeTpDamage.js
@target MZ
@author ポテトドラゴン

・アップデート情報
- ヘルプ修正

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
被ダメージ時にTPを回復しないようになります。

## 使い方
初期設定は必要ありません。  
プラグイン導入だけで動作します。
*/

/**
 * スプライトや行動に関するメソッドを追加したバトラーのクラスです。
 * このクラスは Game_Actor クラスと
 * Game_Enemy クラスのスーパークラスとして使用されます。
 *
 * @class
 */

/**
 * 被ダメージによる TP チャージ
 *
 * @param {} damageRate - 
 */
Game_Battler.prototype.chargeTpByDamage = function(damageRate) {};
