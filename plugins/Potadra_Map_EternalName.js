/*:
@plugindesc
常時マップ名表示 Ver1.3.1(2021/5/4)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Potadra_Map_EternalName.js
@base Potadra_Base
@target MZ
@author ポテトドラゴン

・アップデート情報
- アノテーションの整理

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
マップ名を常に表示します。

@param DisableMapNameSwitch
@type switch
@text 非表示スイッチ
@desc ONのときマップ名を非表示にするスイッチ
@default 0

@param EnableMapName
@type boolean
@text マップ名前表示
@desc 表示名がないとき、マップの名前を表示するか
@default false
@on 表示する
@off 表示しない

@param FloorVariable
@type variable
@text 階層変数
@desc 階層を管理する変数
@default 0

@param PrefixUnderground
@text 地下名称
@desc 地下表示の文字
@default B

@param SuffixFloor
@text 階層名称
@desc 階層の後ろに表記する文字
@default F
*/
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name = Potadra.getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用変数
    const DisableMapNameSwitch = Number(params.DisableMapNameSwitch || 0);
    const EnableMapName        = Potadra.convertBool(params.EnableMapName);
    const FloorVariable        = Number(params.FloorVariable || 0);
    const PrefixUnderground    = String(params.PrefixUnderground) || 'B';
    const SuffixFloor          = String(params.SuffixFloor) || 'F';

    /**
     * マップ名を表示するウィンドウです。
     *
     * @class
     */

    /**
     * オブジェクト初期化
     *
     * @param {} rect -
     */
    Window_MapName.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this.opacity = 0;
        this.contentsOpacity = 0;

        // 削除
        // this._showCount = 0;

        this.refresh();
    };

    /**
     * フレーム更新
     */
    Window_MapName.prototype.update = function() {
        Window_Base.prototype.update.call(this);

        // 変更
        // if (this._showCount > 0 && $gameMap.isNameDisplayEnabled()) {
        if ($gameMap.isNameDisplayEnabled()) {
            this.updateFadeIn();

            // 削除
            // this._showCount--;
        } else {
            this.updateFadeOut();
        }
    };

    /**
     * ウィンドウを開く
     */
    Window_MapName.prototype.open = function() {
        this.refresh();

        // 削除
        // this._showCount = 150;
    };

    /**
     * ウィンドウを閉じる
     */
    Window_MapName.prototype.close = function() {
        // 削除
        // this._showCount = 0;
    };

    /**
     * リフレッシュ
     *
     * @returns {}
     */
    Window_MapName.prototype.refresh = function() {
        const MapInfo = $dataMapInfos[$gameMap._mapId];
        this.contents.clear();
        if (!MapInfo) {
            return false;
        }

        // 表示名を格納
        let MapName = $gameMap.displayName();

        // 表示名がなく、名前表示が有効のとき名前を格納
        if (EnableMapName && !MapName) {
            MapName = String(MapInfo.name);
        }

        if (MapName && (DisableMapNameSwitch === 0 || $gameSwitches.value(DisableMapNameSwitch) === false)) {
            const width = this.contentsWidth();
            this.drawBackground(0, 0, width, this.lineHeight());
            if (FloorVariable !== 0 && $gameVariables.value(FloorVariable) >= 1) {
                this.drawText(MapName + $gameVariables.value(FloorVariable) + SuffixFloor, 0, 0, width, 'center');
            } else if (FloorVariable !== 0 && $gameVariables.value(FloorVariable) <= -1) {
                this.drawText(MapName + PrefixUnderground + -$gameVariables.value(FloorVariable) + SuffixFloor, 0, 0, width, 'center');
            } else {
                this.drawText(MapName, 0, 0, width, 'center');
            }
        }
    };
})();
