/*:
@plugindesc
スキル名前保存 Ver0.5.1(2021/5/27)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_Name_Skill.js
@base Potadra_Base
@orderAfter Potadra_Base
@orderBefore Potadra_Skill_Multi
@target MZ
@author ポテトドラゴン

・アップデート情報
- ベースプラグイン(Potadra_Base.js)の順序で問題を発生するように修正

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
スキルをidではなく、名前で保存するようにします。

## 使い方

*/
(() => {
    'use strict';

    /**
     * スキルを覚える
     *
     * @param {number} skillId - スキルID
     */
    Game_Actor.prototype.learnSkill = function(skillId) {
        if (!this.isLearnedSkill(skillId)) {
            const name = Potadra.search($dataSkills, skillId, 'name');
            this._skills.push(name);
            this._skills.sort((a, b) => a - b);
        }
    };

    /**
     * スキルを忘れる
     *
     * @param {number} skillId - スキルID
     */
    Game_Actor.prototype.forgetSkill = function(skillId) {
        const name = Potadra.search($dataSkills, skillId, 'name');
        this._skills.remove(name);
    };

    /**
     * スキルの習得済み判定
     *
     * @param {number} skillId - スキルID
     * @returns {boolean} 指定スキルを習得しているか
     */
    Game_Actor.prototype.isLearnedSkill = function(skillId) {
        const name = Potadra.search($dataSkills, skillId, 'name');
        return this._skills.includes(name);
    };

    /**
     * スキルオブジェクトの配列取得
     *
     * @returns {array} 取得済みスキル配列
     */
    Game_Actor.prototype.skills = function() {
        const list = [];
        let skills = this._skills.map(name => Potadra.nameSearch($dataSkills, name));

        for (const id of skills.concat(this.addedSkills())) {
            if (!list.includes($dataSkills[id])) {
                list.push($dataSkills[id]);
            }
        }
        return list;
    };

    /**
     * スキルオブジェクトの配列取得
     *
     * @returns {array} 取得済みスキル配列
     */
     Game_Actor.prototype.skillIds = function() {
        const list = [];
        let skills = this._skills.map(name => Potadra.nameSearch($dataSkills, name));

        for (const id of skills) {
            if (!list.includes(id)) {
                list.push(id);
            }
        }
        return list;
    };
})();
