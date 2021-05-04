/*:
@plugindesc
被ダメージ時にTPを回復しない Ver1.2.1(2021/5/4)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_Battle_NoChargeTpDamage.js
@target MZ
@author ポテトドラゴン

・アップデート情報
- アノテーションの整理

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
被ダメージ時にTPを回復しないようになります。
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
