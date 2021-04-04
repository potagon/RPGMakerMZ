/*:
@plugindesc
武器不一致スキル非表示 Ver1.2.0

@target MZ
@author ポテトドラゴン
@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_Battle_ShowWeaponTypeSkill.js

@help
アクターが装備している武器タイプと
スキルの武器タイプが一致しない場合、スキルを非表示にします。
※ 戦闘時のみ非表示になります。

例えば、剣を装備している場合、
斧のスキルを覚えていても戦闘時は表示しないようになります。
*/

/*
Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

・Ver1.2.0(2021/4/4)
- プラグイン名変更
- インデント変更
*/

(() => {
    'use strict';

    /**
     * スキル画面で、使用できるスキルの一覧を表示するウィンドウです。
     *
     * @class
     */

    /**
     * スキルリストの作成
     *
     * @returns {} 
     */
    const _Window_SkillList_makeItemList = Window_SkillList.prototype.makeItemList;
    Window_SkillList.prototype.makeItemList = function() {
        _Window_SkillList_makeItemList.apply(this, arguments);
        if (this._actor) {
            this._data = this._actor.skills().filter(function(item) {
                if ($gameParty.inBattle() && !this._actor.isSkillWtypeOk(item)) {
                    return false;
                } else {
                    return this.includes(item);
                }
            }, this);
        }
    };
})();