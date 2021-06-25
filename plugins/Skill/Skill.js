/*:
@plugindesc
スキル拡張 Ver0.6.0(2021/6/25)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Skill/Skill.js
@base Potadra
@orderAfter Potadra
@target MZ
@author ポテトドラゴン

・アップデート情報
- プラグイン名変更

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
様々なスキル拡張機能を追加します

## 使い方
<HP消費: 100>
=> 現在の HP -100

<HP割合消費: 10%>
=> 現在の HP -10%

<MP割合消費: 100%>
=> マダンテ

<MaxHP割合消費: 100%>
=> MHP -100%

<MaxMP割合消費: 10%>
=> MHP -10%

<所持金消費: 10000>
=> 通貨単位は不要

<アイテム消費: アイテムID,消費数>
<武器消費: 武器ID,消費数>
<防具消費: 防具ID,消費数>
<アイテム名消費: アイテム名,消費数>

@param ItemCostName
@text アイテムコスト個数名
@desc アイテムコストの個数名
デフォルトは 個
@default 個

@param HpCostColor
@type number
@text 消費HP文字色
@desc 消費HPの文字色(0 ～ 31)を指定します
@default 21
@min 0
@max 31

@param GoldCostColor
@type number
@text 消費所持金文字色
@desc 消費所持金の文字色(0 ～ 31)を指定します
@default 14
@min 0
@max 31

@param ItemCostColor
@type number
@text 消費アイテム文字色
@desc 消費アイテムの文字色(0 ～ 31)を指定します
@default 0
@min 0
@max 31

@param HpCostMetaName
@text HP消費タグ
@desc HP消費に使うメモ欄タグの名称
デフォルトは HP消費
@default HP消費

@param GoldCostMetaName
@text 所持金消費タグ
@desc 所持金消費に使うメモ欄タグの名称
デフォルトは 所持金消費
@default 所持金消費

@param ItemCostMetaName
@text アイテム消費タグ
@desc アイテム消費に使うメモ欄タグの名称
デフォルトは アイテム消費
@default アイテム消費

@param WeaponCostMetaName
@text 武器消費タグ
@desc 武器消費に使うメモ欄タグの名称
デフォルトは 武器消費
@default 武器消費

@param ArmorCostMetaName
@text 防具消費タグ
@desc 防具消費に使うメモ欄タグの名称
デフォルトは 防具消費
@default 防具消費

@param ItemNameCostMetaName
@text アイテム名消費タグ
@desc アイテム名消費に使うメモ欄タグの名称
デフォルトは アイテム名消費
@default アイテム名消費

@param ItemRateCostMetaName
@text アイテム割合消費タグ
@desc アイテム割合消費に使うメモ欄タグの名称
デフォルトは アイテム割合消費
@default アイテム割合消費

@param WeaponRateCostMetaName
@text 武器割合消費タグ
@desc 武器割合消費に使うメモ欄タグの名称
デフォルトは 武器割合消費
@default 武器割合消費

@param ArmorRateCostMetaName
@text 防具割合消費タグ
@desc 防具割合消費に使うメモ欄タグの名称
デフォルトは 防具割合消費
@default 防具割合消費

@param ItemNameRateCostMetaName
@text アイテム名割合消費タグ
@desc アイテム名割合消費に使うメモ欄タグの名称
デフォルトは アイテム名割合消費
@default アイテム名割合消費

@param HpRateCostMetaName
@text HP割合消費タグ
@desc HP割合消費に使うメモ欄タグの名称
デフォルトは HP割合消費
@default HP割合消費

@param MpRateCostMetaName
@text MP割合消費タグ
@desc MP割合消費に使うメモ欄タグの名称
デフォルトは MP割合消費
@default MP割合消費

@param GoldRateCostMetaName
@text 所持金割合消費タグ
@desc 所持金割合消費に使うメモ欄タグの名称
デフォルトは 所持金割合消費
@default 所持金割合消費

@param MaxHpRateCostMetaName
@text MaxHP割合消費タグ
@desc MaxHP割合消費に使うメモ欄タグの名称
デフォルトは MaxHP割合消費
@default MaxHP割合消費

@param MaxMpRateCostMetaName
@text MaxMP割合消費タグ
@desc MaxMP割合消費に使うメモ欄タグの名称
デフォルトは MaxMP割合消費
@default MaxMP割合消費
*/
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name = Potadra.getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用定数
    const ItemCostName             = String(params.ItemCostName) || '個';
    const HpCostColor              = Number(params.HpCostColor || 21);
    const GoldCostColor            = Number(params.GoldCostColor || 14);
    const ItemCostColor            = Number(params.ItemCostColor || 0);
    const HpCostMetaName           = String(params.HpCostMetaName) || 'HP消費';
    const GoldCostMetaName         = String(params.GoldCostMetaName) || '所持金消費';
    const ItemCostMetaName         = String(params.ItemCostMetaName) || 'アイテム消費';
    const WeaponCostMetaName       = String(params.WeaponCostMetaName) || '武器消費';
    const ArmorCostMetaName        = String(params.ArmorItemCostMetaName) || '防具消費';
    const ItemNameCostMetaName     = String(params.ItemNameCostMetaName) || 'アイテム名消費';
    const HpRateCostMetaName       = String(params.HpRateCostMetaName) || 'HP割合消費';
    const MpRateCostMetaName       = String(params.MpRateCostMetaName) || 'MP割合消費';
    const GoldRateCostMetaName     = String(params.GoldRateCostMetaName) || '所持金割合消費';
    const ItemRateCostMetaName     = String(params.ItemRateCostMetaName) || 'アイテム割合消費';
    const WeaponRateCostMetaName   = String(params.WeaponRateCostMetaName) || '武器割合消費';
    const ArmorRateCostMetaName    = String(params.ArmorItemRateCostMetaName) || '防具割合消費';
    const ItemNameRateCostMetaName = String(params.ItemNameRateCostMetaName) || 'アイテム名割合消費';
    const MaxHpRateCostMetaName    = String(params.MaxHpRateCostMetaName) || 'MaxHP割合消費';
    const MaxMpRateCostMetaName    = String(params.MaxMpRateCostMetaName) || 'MaxMP割合消費';

    /**
     * 消費HP文字色の取得
     *
     * @returns {} 
     */
    ColorManager.hpCostColor = function() {
        return this.textColor(HpCostColor);
    };

    /**
     * 消費所持金文字色の取得
     *
     * @returns {} 
     */
    ColorManager.goldCostColor = function() {
        return this.textColor(GoldCostColor);
    };

    /**
     * 消費アイテム文字色の取得
     *
     * @returns {} 
     */
    ColorManager.itemCostColor = function() {
        return this.textColor(ItemCostColor);
    };


    /**
     * 
     */
    const _Game_BattlerBase_initMembers = Game_BattlerBase.prototype.initMembers;
    Game_BattlerBase.prototype.initMembers = function() {
        _Game_BattlerBase_initMembers.apply(this, arguments);
        this._item = null;
    };

    /**
     * スキルの消費 HP 計算
     *
     * @param {} skill - 
     * @returns {} 
     */
    Game_BattlerBase.prototype.skillHpCost = function(skill) {
        let cost = 0;
        let hp_cost          = Potadra.meta(skill.meta, HpCostMetaName);
        let hp_rate_cost     = Potadra.meta(skill.meta, HpRateCostMetaName);
        let max_hp_rate_cost = Potadra.meta(skill.meta, MaxHpRateCostMetaName);
        if (hp_cost) { // HP消費
            cost += Number(hp_cost || 0);
        }
        if (hp_rate_cost) { // HP割合消費
            cost += this.hp * (parseFloat(hp_rate_cost) / 100);
        }
        if (max_hp_rate_cost) { // MaxHP割合消費
            cost += this.mhp * (parseFloat(max_hp_rate_cost) / 100);
        }
        return Math.floor(cost);
    };

    /**
     * スキルの消費 MP 計算
     *
     * @param {} skill - 
     * @returns {} 
     */
    const _Game_BattlerBase_skillMpCost = Game_BattlerBase.prototype.skillMpCost;
    Game_BattlerBase.prototype.skillMpCost = function(skill) {
        let cost = _Game_BattlerBase_skillMpCost.apply(this, arguments);
        let mp_rate_cost     = Potadra.meta(skill.meta, MpRateCostMetaName);
        let max_mp_rate_cost = Potadra.meta(skill.meta, MaxMpRateCostMetaName);
        if (mp_rate_cost) { // MP割合消費
            cost += this.mp * (parseFloat(mp_rate_cost) / 100);
        }
        if (max_mp_rate_cost) { // MaxMP割合消費
            cost += this.mmp * (parseFloat(max_mp_rate_cost) / 100);
        }
        return Math.floor(cost);
    };

    /**
     * スキルの消費 所持金 計算
     *
     * @param {} skill - 
     * @returns {} 
     */
    Game_BattlerBase.prototype.skillGoldCost = function(skill) {
        let cost = 0;
        let gold_cost = Potadra.meta(skill.meta, GoldCostMetaName);
        let gold_rate_cost = Potadra.meta(skill.meta, GoldRateCostMetaName);
        if (gold_cost) { // 所持金消費
            cost += Number(gold_cost || 0);
        }
        if (gold_rate_cost) { // 所持金割合消費
            cost += $gameParty.gold() * (parseFloat(gold_rate_cost) / 100);
        }
        return Math.floor(cost);
    };

    /**
     * スキルの消費 アイテム 計算
     *
     * @param {} skill - 
     * @returns {} 
     */
    Game_BattlerBase.prototype.skillItemCost = function(skill) {
        let cost = 0;
        let item_cost           = Potadra.metaData(skill.meta[ItemCostMetaName], ',');
        let weapon_cost         = Potadra.metaData(skill.meta[WeaponCostMetaName], ',');
        let armor_cost          = Potadra.metaData(skill.meta[ArmorCostMetaName], ',');
        let item_name_cost      = Potadra.metaData(skill.meta[ItemNameCostMetaName], ',');
        let item_rate_cost      = Potadra.metaData(skill.meta[ItemRateCostMetaName], ',');
        let weapon_rate_cost    = Potadra.metaData(skill.meta[WeaponRateCostMetaName], ',');
        let armor_rate_cost     = Potadra.metaData(skill.meta[ArmorRateCostMetaName], ',');
        let item_name_rate_cost = Potadra.metaData(skill.meta[ItemNameRateCostMetaName], ',');
        if (item_cost) { // アイテム消費
            this._item = $dataItems[Number(item_cost[0])];
            cost += Number(item_cost[1] || 0);
        }
        if (weapon_cost) { // 武器消費
            this._item = $dataWeapons[Number(weapon_cost[0])];
            cost += Number(weapon_cost[1] || 0);
        }
        if (armor_cost) { // 防具消費
            this._item = $dataArmors[Number(armor_cost[0])];
            cost += Number(armor_cost[1] || 0);
        }
        if (item_name_cost) { // アイテム名消費
            this._item = Potadra.itemSearch(item_name_cost[0].trim());
            cost += Number(item_name_cost[1] || 0);
        }
        if (item_rate_cost) { // アイテム割合消費
            this._item = $dataItems[Number(item_rate_cost[0])];
            cost += $gameParty.numItems(this._item) * (parseInt(item_rate_cost[1]) / 100);
        }
        if (weapon_rate_cost) { // 武器割合消費
            this._item = $dataWeapons[Number(weapon_rate_cost[0])];
            cost += $gameParty.numItems(this._item) * (parseInt(weapon_rate_cost[1]) / 100);
        }
        if (armor_rate_cost) { // 防具割合消費
            this._item = $dataArmors[Number(armor_rate_cost[0])];
            cost += $gameParty.numItems(this._item) * (parseInt(armor_rate_cost[1]) / 100);
        }
        if (item_name_rate_cost) { // アイテム名割合消費
            this._item = Potadra.itemSearch(item_name_rate_cost[0].trim());
            cost += $gameParty.numItems(this._item) * (parseInt(item_name_rate_cost[1]) / 100);
        }
        return Math.floor(cost);
    };


    /**
     * 項目の描画
     *
     * @param {} index - 
     */
    Window_SkillList.prototype.drawItem = function(index) {
        const skill = this.itemAt(index);
        if (skill) {
            const costWidth = this.costWidth();
            const rect = this.itemLineRect(index);
            this.changePaintOpacity(this.isEnabled(skill));
            this.drawItemName(skill, rect.x, rect.y, rect.width - costWidth);
            this.drawSkillCost(skill, rect.x, rect.y, rect.width, costWidth);
            this.changePaintOpacity(1);
        }
    };

    /**
     * スキルの使用コストを描画
     *
     * @param {} skill - 
     * @param {} x - 
     * @param {} y - 
     * @param {} width - 
     */
    Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width, costWidth) {
        // const costX = x + width - costWidth;
        const costX = x;
        if (this._actor.skillTpCost(skill) > 0) {
            this.changeTextColor(ColorManager.tpCostColor());
            this.drawText(this._actor.skillTpCost(skill), costX, y, width, "right");
        } else if (this._actor.skillMpCost(skill) > 0) {
            this.changeTextColor(ColorManager.mpCostColor());
            this.drawText(this._actor.skillMpCost(skill), costX, y, width, "right");
        } else if (this._actor.skillHpCost(skill) > 0) {
            this.changeTextColor(ColorManager.hpCostColor());
            this.drawText(this._actor.skillHpCost(skill), costX, y, width, "right");
        } else if (this._actor.skillGoldCost(skill) > 0) {
            this.changeTextColor(ColorManager.goldCostColor());
            this.drawText(this._actor.skillGoldCost(skill) + '/' + $gameParty.gold() + $dataSystem.currencyUnit, costX, y, width, "right");
        } else if (this._actor.skillItemCost(skill) > 0) {
            this.changeTextColor(ColorManager.itemCostColor());
            this.drawText(this._actor.skillItemCost(skill) + '/' + $gameParty.numItems(this._actor._item) + ItemCostName, costX, y, width, "right");
        }
    };


    /**
     * スキル使用コストの支払い
     *
     * @param {} skill - 
     */
    const _Game_BattlerBase_paySkillCost = Game_BattlerBase.prototype.paySkillCost;
    Game_BattlerBase.prototype.paySkillCost = function(skill) {
        _Game_BattlerBase_paySkillCost.apply(this, arguments);
        this._hp -= this.skillHpCost(skill);
        $gameParty.loseGold(this.skillGoldCost(skill));
        if (this._item) {
            $gameParty.loseItem(this._item, this.skillItemCost(skill), false);
        }
    };

    /**
     * スキル使用コストの支払い可能判定
     *
     * @param {} skill - 
     */
    Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
        return (
            this._tp >= this.skillTpCost(skill) &&
            this.canPaySkillCommonCost(skill, this._mp, this.skillMpCost(skill), null, MpRateCostMetaName, MaxMpRateCostMetaName) &&
            this.canPaySkillCommonCost(skill, this._hp, this.skillHpCost(skill), HpCostMetaName, HpRateCostMetaName, MaxHpRateCostMetaName) &&
            this.canPaySkillCommonCost(skill, $gameParty.gold(), this.skillGoldCost(skill), GoldCostMetaName, GoldRateCostMetaName, null) &&
            this.canPaySkillItemCost(skill)
        );
    };

    /**
     * スキル使用共通コストの支払い可能判定
     *
     * @param {} skill - 
     * @param {number} param - 
     * @param {number} cost - 
     * @param {string} meta_name - 
     * @param {string} rate_meta_name - 
     * @param {string} max_meta_name - 
     */
    Game_BattlerBase.prototype.canPaySkillCommonCost = function(skill, param, cost, meta_name, rate_meta_name, max_meta_name) {
        let normal_cost = Potadra.meta(skill.meta, meta_name);
        let rate_cost = Potadra.meta(skill.meta, rate_meta_name);
        let max_cost = Potadra.meta(skill.meta, max_meta_name);
        if (rate_cost) {
            return param > 0 && param >= cost;
        } else if (normal_cost || max_cost) {
            return param >= cost;
        } else {
            return true;
        }
    };

    /**
     * スキル使用アイテムコストの支払い可能判定
     *
     * @param {} skill - 
     */
    Game_BattlerBase.prototype.canPaySkillItemCost = function(skill) {
        let cost                = this.skillItemCost(skill);
        let item_cost           = Potadra.metaData(skill.meta[ItemCostMetaName], ',');
        let weapon_cost         = Potadra.metaData(skill.meta[WeaponCostMetaName], ',');
        let armor_cost          = Potadra.metaData(skill.meta[ArmorCostMetaName], ',');
        let item_name_cost      = Potadra.metaData(skill.meta[ItemNameCostMetaName], ',');
        let item_rate_cost      = Potadra.metaData(skill.meta[ItemRateCostMetaName], ',');
        let weapon_rate_cost    = Potadra.metaData(skill.meta[WeaponRateCostMetaName], ',');
        let armor_rate_cost     = Potadra.metaData(skill.meta[ArmorRateCostMetaName], ',');
        let item_name_rate_cost = Potadra.metaData(skill.meta[ItemNameRateCostMetaName], ',');
        if (item_rate_cost || weapon_rate_cost || armor_rate_cost || item_name_rate_cost) {
            return $gameParty.numItems(this._item) > 0 && $gameParty.numItems(this._item) >= cost;
        } else if (item_cost || weapon_cost || armor_cost || item_name_cost) {
            return $gameParty.numItems(this._item) >= cost;
        } else {
            return true;
        }
    };
})();
