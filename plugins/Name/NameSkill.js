/*:
@plugindesc
スキル名前保存 Ver0.6.1(2021/6/27)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Name/NameSkill.js
@base Potadra
@orderAfter Potadra
@orderBefore MultiSkill
@target MZ
@author ポテトドラゴン

・アップデート情報
- @orderBefore MultiSkill に修正

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
スキルをidではなく、名前で保存するようにします。

## 使い方


### プラグインの競合対策
this._skills を表示として使用している部分は、競合することがあるので、  
this.skillIds() と置き換えてください。
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
