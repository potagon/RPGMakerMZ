/*:
@plugindesc
武器不一致スキル非表示 Ver1.3.0(2021/6/25)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Battle/ShowWeaponTypeSkill.js
@target MZ
@author ポテトドラゴン

・アップデート情報
- プラグイン名変更

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
アクターが装備している武器タイプと  
スキルの武器タイプが一致しない場合、スキルを非表示にします。  
※ 戦闘時のみ非表示になります。

例えば、剣を装備している場合、  
斧のスキルを覚えていても戦闘時は表示しないようになります。

## 使い方
初期設定は必要ありません。  
プラグイン導入だけで動作します。
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
