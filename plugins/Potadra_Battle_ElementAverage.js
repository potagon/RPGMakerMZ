/*:
@plugindesc
属性平均計算 Ver1.2.4(2021/5/27)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_Battle_ElementAverage.js
@base Potadra_Base
@orderAfter Potadra_Base
@target MZ
@author ポテトドラゴン

・アップデート情報
- ベースプラグイン(Potadra_Base.js)の順序で問題を発生するように修正

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
属性有効度を最大値ではなく、平均値で算出します。

炎の剣などの属性を含む装備で  
ダメージが軽減されるようになります。

## 使い方
初期設定は必要ありません。  
プラグイン導入だけで動作します。

### 例: 炎の剣でサラマンダーを攻撃する場合

#### 設定内容
・炎の剣(武器)  
攻撃時属性: 物理  
攻撃時属性: 炎

・サラマンダー(敵キャラ)  
属性有効度: 炎 * 0%  
※ 属性有効度は設定しない場合 100% になるので、  
   この場合、物理の属性有効度は 100% となります。

#### 導入前(最大値で算出)
全ての属性の中で % が1番高いものが属性有効度となる  
[物理(100%), 炎(0%)] => 属性有効度: 100%(属性によるダメージに変動なし)

#### 導入後(平均値で算出)
全ての属性の平均値が属性有効度となる  
[物理(100%), 炎(0%)] => 属性有効度: 50%(属性によるダメージが 1/2 になる)

#### パラメータ有効時(最小値で算出)
全ての属性の中で % が1番低いものが属性有効度となる  
[物理(100%), 炎(0%)] => 属性有効度: 0%(ダメージ0)

@param Min
@type boolean
@text 最小値で算出
@desc 最小値で算出するオプションです
@on 最小値で算出
@off 平均値で算出
@default false
*/
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
