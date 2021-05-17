/*:
@plugindesc
転生アイテム Ver1.0.2(2021/5/17)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_Max_ReincarnationItem.js
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
メモ欄のタグで指定したレベルで使用可能になる転生アイテムを追加します。

## 使い方


@param ReincarnationMetaName
@text 転生タグ
@desc メモ欄のタグ名
空文字の場合は、 "転生" になります
@default 転生

@param MHP
@type number
@text 転生後最大HP
@desc 転生後に加算される最大HP
転生後、アクターの最大HP × このパラメータ が加算されます
@decimals 2
@default 0.1
@min 0

@param MMP
@type number
@text 転生後最大MP
@desc 転生後に加算される最大MP
転生後、アクターの最大MP × このパラメータ が加算されます
@decimals 2
@default 0.1
@min 0

@param ATK
@type number
@text 転生後攻撃力
@desc 転生後に加算される攻撃力
転生後、アクターの攻撃力 × このパラメータ が加算されます
@decimals 2
@default 0.1
@min 0

@param DEF
@type number
@text 転生後防御力
@desc 転生後に加算される防御力
転生後、アクターの防御力 × このパラメータ が加算されます
@decimals 2
@default 0.1
@min 0

@param MAT
@type number
@text 転生後魔法力
@desc 転生後に加算される魔法力
転生後、アクターの魔法力 × このパラメータ が加算されます
@decimals 2
@default 0.1
@min 0

@param MDF
@type number
@text 転生後魔法防御
@desc 転生後に加算される魔法防御
転生後、アクターの魔法防御 × このパラメータ が加算されます
@decimals 2
@default 0.1
@min 0

@param AGI
@type number
@text 転生後敏捷性
@desc 転生後に加算される敏捷性
転生後、アクターの敏捷性 × このパラメータ が加算されます
@decimals 2
@default 0.1
@min 0

@param LUK
@type number
@text 転生後運
@desc 転生後に加算される運
転生後、アクターの運 × このパラメータ が加算されます
@decimals 2
@default 0.1
@min 0
*/
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name = Potadra.getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用変数
    const ReincarnationMetaName = String(params.ReincarnationMetaName) || "転生";
    const MHP                   = Number(params.MHP) || 0.1;
    const MMP                   = Number(params.MMP) || 0.1;
    const ATK                   = Number(params.ATK) || 0.1;
    const DEF                   = Number(params.DEF) || 0.1;
    const MAT                   = Number(params.MAT) || 0.1;
    const MDF                   = Number(params.MDF) || 0.1;
    const AGI                   = Number(params.AGI) || 0.1;
    const LUK                   = Number(params.LUK) || 0.1;

    /**
     * 
     *
     * @param {} target - 
     */
    const _Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        _Game_Action_apply.apply(this, arguments);
        this.applyReincarnation(target);
    };

    /**
     * 転生 
     *
     * @param {} item - 
     * @param {} target - 
     */
    Game_Action.prototype.applyReincarnation = function(target) {
        if (this.testApplyReincarnation(target)) {
            target.addParam(0, Math.floor(target.mhp * MHP));
            target.addParam(1, Math.floor(target.mmp * MMP));
            target.addParam(2, Math.floor(target.atk * ATK));
            target.addParam(3, Math.floor(target.def * DEF));
            target.addParam(4, Math.floor(target.mat * MAT));
            target.addParam(5, Math.floor(target.mdf * MDF));
            target.addParam(6, Math.floor(target.agi * AGI));
            target.addParam(7, Math.floor(target.luk * LUK));
            target.changeLevel(1, false);
        }
        this.makeSuccess(target);
    };

    /**
     * アイテム使用可能判定
     *
     * @param {} target - 
     */
    const _Game_Action_testApply = Game_Action.prototype.testApply;
    Game_Action.prototype.testApply = function(target) {
        const test_apply = _Game_Action_testApply.apply(this, arguments);
        return test_apply || this.testApplyReincarnation(target);
    };

    /**
     * 転生アイテム使用可能判定
     * アクターのレベル >= 転生アイテムのレベル で使用可能
     *
     * @param {} target - 
     */
    Game_Action.prototype.testApplyReincarnation = function(target) {
        const item = this.item();
        const reincarnation_level = Potadra.meta(item.meta, ReincarnationMetaName);
        if (reincarnation_level) {
            return target.level >= Number(reincarnation_level);
        } else {
            return false;
        }
    };
})();
