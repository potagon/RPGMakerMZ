/*:
@plugindesc
RPGツクールMZのバグ修正 Ver1.2.0

@base Potadra_Base

@target MZ
@author ポテトドラゴン
@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_System_BugFix.js

@help
RPGツクールMZのバグを修正します。

必要ない修正はパラメータで無効に出来ます。

@param FixBattleEnemyDrawItem
@type boolean
@text 敵キャラウィンドウバグ修正
@desc 敵キャラを選択するウィンドウで制御文字が使えないバグ修正
@on 修正する
@off 修正しない
@default true

@param FixStatusEquipOver
@type boolean
@text 装備タイプバグ修正
@desc 装備タイプが7個以上あるときステータスの
装備に表示しきれないバグ修正(スクロールできるように修正)
@on 修正する
@off 修正しない
@default false
*/

/*
Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

・Ver1.2.0(2021/4/4)
- プラグイン名変更
- インデント変更
*/

// パラメータ定義
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name = Potadra.getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用変数
    const FixBattleEnemyDrawItem = Potadra.convertBool(params.FixBattleEnemyDrawItem);
    const FixStatusEquipOver     = Potadra.convertBool(params.FixStatusEquipOver);

    /**
     * バトル画面で、行動対象の敵キャラを選択するウィンドウです。
     *
     * @class
     */

    /**
     * 項目の描画
     *
     * @param {number} index -
     */
    if (FixBattleEnemyDrawItem) {
        Window_BattleEnemy.prototype.drawItem = function(index) {
            this.resetTextColor();
            const name = this._enemies[index].name();
            const rect = this.itemLineRect(index);
            this.drawTextEx(name, rect.x, rect.y, rect.width);
        };
    }

    /**
     * オブジェクト初期化
     *     info_viewport : 情報表示用ビューポート
     *
     * @param {} rect -
     */
    if (FixStatusEquipOver) {
        const _Window_StatusEquip_initialize = Window_StatusEquip.prototype.initialize;
        Window_StatusEquip.prototype.initialize = function(rect) {
            _Window_StatusEquip_initialize.apply(this, arguments);
            this.refresh();
            this.select(0);
            this.activate();
        };
    }
})();
