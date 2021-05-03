/*:
@plugindesc
属性値平均計算 Ver1.2.1

@base Potadra_Base

@target MZ
@author ポテトドラゴン
@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_Battle_ElementAverage.js

@help
属性値を最大値ではなく、平均値で算出します。

炎の剣などの属性を含む装備で
ダメージが軽減されるようになります。

以下は導入時と導入前の属性の倍率です。
下記の例でも設定してませんが、
属性有効度は設定しない場合、100% になります。

・炎の剣(武器)
攻撃時属性: 物理
攻撃時属性: 炎

・サラマンダー(敵キャラ)
属性有効度: 炎 * 0%

■ 導入前

属性の倍率: 100%(属性によるダメージに変動なし)

■ 導入後

属性の倍率: 50%(属性によるダメージが 1/2 になる)

@param Min
@type boolean
@text 最小値で算出
@desc 最小値で算出するオプションです
@on 最小値で算出
@off 平均値で算出
@default false
*/

/*
Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

・Ver1.2.1(2021/5/3)
- 正しく動かないバグ修正

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
    const Min = Potadra.convertBool(params.Min);

    /**
     * 戦闘行動を扱うクラスです。
     * このクラスは Game_Battler クラスの内部で使用されます。
     *
     * @class
     */

    /**
     * 属性の平均値の取得
     *
     * @param {} target -
     * @param {array} elements - 属性 ID の配列
     * @returns {} 与えられた属性の中の平均値を返す
     */
    Game_Action.prototype.elementsMaxRate = function(target, elements) {
        if (elements.length > 0) {
            if (Min) {
                const rates = elements.map(elementId => target.elementRate(elementId));
                return Math.min(...rates);
            } else {
                // 平均値計算
                const rates = elements.map(elementId => target.elementRate(elementId));
                const sum = rates.reduce((r, rate) => r + rate, 0);
                return Math.max(1, sum / Math.max(1, rates.length));
            }
        }
        return 1;
    };
})();
