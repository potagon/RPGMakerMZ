/*:
@plugindesc
レベル上限突破 Ver0.12.3(2021/5/17)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_Max_Level.js
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
レベルの上限を変更します。

## 使い方


@param MaxLevel
@type number
@text 最大レベル
@desc 0 で無限になるが、MZはループが多いと処理低下や
フリーズするので、9999 以上にすることはおすすめしません
@default 9999
@max 999999999999999
@min 0

@param SmallFishName
@type string
@text ザコ名称
@desc アクターのメモに記載するメタデータ(<ザコ>)の名称
ザコは初期能力が低くなる
@default ザコ

@param MobName
@type string
@text モブ名称
@desc アクターのメモに記載するメタデータ(<モブ>)の名称
モブは初期能力が低くなる
@default モブ

@param LevelUpRecover
@type boolean
@text レベルアップ時全回復
@desc レベルアップ時に全回復するかの設定
@on 回復する
@off 回復しない
@default false

@param MaxLevelMenu
@type boolean
@text レベル上限突破メニュー
@desc レベル上限突破用のメニューに変更します
@on レベル上限突破メニュー
@off 通常メニュー
@default false

@command change_level
@text レベルの変更
@desc イベントコマンドからの値以上のレベル変更を可能にします

@arg actorId
@type actor
@text アクター
@desc レベルを変更するアクター
なしを選択した場合、パーティー全体が対象になります
@default 0

@arg level
@type number
@text レベル
@desc 増減するレベル
マイナス値でレベルを下げることができます
@default 1
@max 999999999999999

@arg show
@type boolean
@text レベルアップ表示
@desc レベルアップを表示するかの設定
@on 表示する
@off 表示しない
@default false
*/
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name = Potadra.getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用変数
    const MaxLevel       = Number(params.MaxLevel || 9999);
    const SmallFishName  = String(params.SmallFishName || 'ザコ');
    const MobName        = String(params.MobName || 'モブ');
    const LevelUpRecover = Potadra.convertBool(params.LevelUpRecover);
    const MaxLevelMenu   = Potadra.convertBool(params.MaxLevelMenu);

    // 他プラグイン連携(プラグインの導入有無)
    const NameDatabase   = Potadra.isPlugin('Potadra_Name_Database');

    // プラグインコマンド(レベルの変更)
    PluginManager.registerCommand(plugin_name, "change_level", args => {
        const actorId = Number(args.actorId || 0);
        const level   = Number(args.level || 1);
        const show    = Potadra.convertBool(args.show);

        if (actorId === 0) {
            $gameParty.members().forEach(actor => {
                actor.changeLevel(actor.level + level, show);
            });
        } else {
            const actor = $gameActors.actor(actorId);
            actor.changeLevel(actor.level + level, show);
        }
    });

    /**
     * アクターを扱うクラスです。
     * このクラスは Game_Actors クラス（$gameActors）の内部で使用され、
     * Game_Party クラス（$gameParty）からも参照されます。
     *
     * @class
     */

    /**
     * 最大レベル
     *
     * @returns {}
     */
    Game_Actor.prototype.maxLevel = function() {
        const max_level_str = this.actor().meta['最大レベル'];
        let max_level = max_level_str ? Number(max_level_str) : MaxLevel;
        if (max_level === 0) {
            max_level = Infinity;
        }
        return max_level;
    };

    /**
     * 通常能力値の基本値取得
     *
     * @param {} paramId -
     * @returns {}
     */
    Game_Actor.prototype.paramBase = function(paramId) {
        const data     = Potadra.metaData(this.actor().meta[TextManager.param(paramId)], ',');
        let init_param = null; // 初期値
        let param      = null; // 増加値

        if (data) {
            init_param = Number(data[0]);
            param      = Number(data[1]);
        } else {
            const small_fish = this.actor().meta[SmallFishName];
            const mob        = this.actor().meta[MobName];
            if (paramId == 0 || paramId == 1) {
                param = 10;
                if (small_fish) {
                    init_param = 10;
                } else if (mob) {
                    init_param = 50;
                } else {
                    init_param = 100;
                }
            } else {
                param = 1;
                if (small_fish) {
                    init_param = 1;
                } else if (mob) {
                    init_param = 5;
                } else {
                    init_param = 10;
                }
            }
        }

        return init_param + (param * (this._level - 1));
    };

    /**
     * レベルの変更
     *
     * @param {number} level - レベル
     * @param {boolean} show - レベルを表示するか
     */
    Game_Actor.prototype.changeLevel = function(level, show) {
        level = level.clamp(1, this.maxLevel());

        const exp = this.expForLevel(level);
        const lastLevel = this._level;
        const lastSkills = this.skills();

        this._exp[this._classId] = Math.max(exp, 0);

        // 処理速度が遅いのでデフォルトの処理を改変
        this._level = level;
        for (const learning of this.currentClass().learnings) {
            if (lastLevel < learning.level && learning.level <= this._level) {
                this.learnSkill(learning.skillId);
            }
        }

        // 名前メモデータベース対応
        if (NameDatabase) {
            const learnings = Potadra.learnings(this);
            for (const learning of learnings) {
                if (lastLevel < learning.level && learning.level <= this._level) {
                    this.learnSkill(learning.skillId);
                }
            }
        }

        while (this.currentExp() < this.currentLevelExp()) {
            this.levelDown();
        }
        if (show && this._level > lastLevel) {
            this.displayLevelUp(this.findNewSkills(lastSkills));
        }
        this.refresh();

        // パラメータ有効かつレベルアップした場合のみ回復
        if (LevelUpRecover && this._level > lastLevel) {
            this.recoverAll();
        }
    };

    // レベル上限突破メニュー
    if (MaxLevelMenu) {
        /**
         *
         *
         * @param {} actor -
         * @param {number} x - X座標
         * @param {number} y - Y座標
         */
        Window_StatusBase.prototype.drawActorSimpleStatus = function(actor, x, y) {
            const lineHeight = this.lineHeight() - 6;
            const x2 = x + 140;
            this.contents.fontSize = 20;
            this.drawActorName(actor, x, y);
            this.drawActorLevel(actor, x, y + lineHeight * 1);
            this.drawActorIcons(actor, x, y + lineHeight * 2);
            this.drawActorClass(actor, x2, y);
            this.placeBasicGauges(actor, x2, y + lineHeight);
            this.resetFontSettings();
        };

        /**
         *
         *
         * @param {} actor -
         * @param {number} x - X座標
         * @param {number} y - Y座標
         */
        Window_StatusBase.prototype.drawActorLevel = function(actor, x, y) {
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(TextManager.levelA, x, y, 48);
            this.resetTextColor();
            this.drawText(actor.level, x + 30, y, 90, "right");
        };

        /**
         *
         *
         * @param {} actor -
         * @param {} type -
         * @param {number} x - X座標
         * @param {number} y - Y座標
         */
        Window_MenuStatus.prototype.placeGauge = function(actor, type, x, y) {
            const key = "actor%1-gauge-%2".format(actor.actorId(), type);
            const sprite = this.createInnerSprite(key, Sprite_StatusGauge);
            sprite.setup(actor, type);
            sprite.move(x, y);
            sprite.show();
        };
        Window_SkillStatus.prototype.placeGauge = function(actor, type, x, y) {
            const key = "actor%1-gauge-%2".format(actor.actorId(), type);
            const sprite = this.createInnerSprite(key, Sprite_StatusGauge);
            sprite.setup(actor, type);
            sprite.move(x, y);
            sprite.show();
        };
        Window_Status.prototype.placeGauge = function(actor, type, x, y) {
            const key = "actor%1-gauge-%2".format(actor.actorId(), type);
            const sprite = this.createInnerSprite(key, Sprite_StatusGauge);
            sprite.setup(actor, type);
            sprite.move(x, y);
            sprite.show();
        };

        class Sprite_StatusGauge extends Sprite_Gauge {
            constructor() {
                super();
            }
            bitmapWidth() {
                return 192;
            }
            labelFontSize() {
                return $gameSystem.mainFontSize() - 8;
            }
            valueFontFace() {
                return $gameSystem.numberFontFace() - 6;
            }
            valueFontSize() {
                return $gameSystem.mainFontSize() - 8;
            }
        }
    }
})();
