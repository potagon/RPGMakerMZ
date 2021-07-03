/*:
@plugindesc
ファストトラベル Ver0.7.1(2021/7/3)

@url https://raw.githubusercontent.com/pota-dra/RPGMakerMZ/main/plugins/Map/FastTravel.js
@base Potadra
@orderAfter Potadra
@target MZ
@author ポテトドラゴン

・アップデート情報
- コモンイベント名を指定できる機能追加

Copyright (c) 2021 ポテトドラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
ファストトラベルを簡単に実装します。

## 使い方


@param MenuCommand
@text メニュー表示名
@desc メニューの表示名
空文字でメニューに表示しません
@default ファストトラベル

@param MenuSwitch
@parent MenuCommand
@type switch
@text メニュー表示スイッチ
@desc ONのときメニューにコマンドを表示します
0(なし)の場合、常にメニューへ表示します
@default 0

@param DisableMenuSwitch
@parent MenuCommand
@type switch
@text メニュー禁止スイッチ
@desc ONのときコマンドの使用を禁止します
@default 0

@param maps
@parent MenuCommand
@type struct<MoveMapList>[]
@text 移動先マップ情報

@param cancelSwitch
@type switch
@text キャンセル判定スイッチ
@desc キャンセルをしたときにこのスイッチがONになります
0(なし)の場合、使用しません
@default 0

@command fast_travel
@text ファストトラベル
@desc ファストトラベルを呼び出します

@arg maps
@type struct<MoveMapList>[]
@text 移動先マップ情報
*/

/*~struct~MoveMapList:
@param showSwitch
@type switch
@text 移動先表示スイッチ
@desc このスイッチがONのときに行き先を表示します
0(なし)の場合、常に移動先が表示されます
@default 0

@param move_map_name
@type string
@text マップ移動先名
@desc 移動先のマップ名称を指定します

@param common_event
@type common_event
@text コモンイベントID
@desc 移動処理のコモンイベントID
コモンイベントを指定した場合は、以降の設定は不要です
@default 0
@min 0
@max 2000

@param common_event_name
@type string
@text コモンイベント名
@desc 移動処理のコモンイベント名(名前でコモンイベント検索)
コモンイベントを指定した場合は、以降の設定は不要です

@param mapId
@type number
@text マップID
@desc 移動先のマップID
@default 1
@min 1
@max 999

@param x
@parent mapId
@type number
@text X座標
@desc 移動先のマップX座標
@default 0
@min 0
@max 999

@param y
@parent mapId
@type number
@text Y座標
@desc 移動先のマップY座標
@default 0
@min 0
@max 999

@param direction
@parent mapId
@type select
@text 向き
@desc 移動先のプレイヤーの向き
@default 0
@option そのまま
@value 0
@option 下
@value 2
@option 左
@value 4
@option 右
@value 6
@option 上
@value 8

@param fade_type
@parent mapId
@type select
@text フェード
@desc フェードアウトとフェードインの設定
@default 0
@option 黒
@value 0
@option 白
@value 1
@option なし
@value 2

@param se
@parent mapId
@type struct<SE>
@text 場所移動SE
@desc 場所移動時に再生するSE。指定しない場合、再生しません
@default {"name":"Move1","volume":"90","pitch":"100","pan":"0"}
*/

/*~struct~SE:
@param name
@type file
@dir audio/se
@text ファイル名
@desc 再生するSEのファイル名
@default Move1

@param volume
@type number
@text 音量
@desc 再生するSEの音量
@default 90
@max 100
@min 0

@param pitch
@type number
@text ピッチ
@desc 再生するSEのピッチ
@default 100
@max 150
@min 50

@param pan
@type number
@text 位相
@desc 再生するSEの位相
@default 0
@max 100
@min -100
*/
(() => {
    'use strict';

    // パラメータ用変数
    const plugin_name = Potadra.getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用変数
    const MenuCommand       = String(params.MenuCommand);
    const MenuSwitch        = Number(params.MenuSwitch || 0);
    const DisableMenuSwitch = Number(params.DisableMenuSwitch || 0);
    const cancelSwitch      = Number(params.cancelSwitch || 0);
    let MoveMapList = null;
    if (MenuCommand && params.maps) {
        MoveMapList = JSON.parse(params.maps);
    }

    // プラグインコマンド(ファストトラベル)
    PluginManager.registerCommand(plugin_name, "fast_travel", args => {
        let move_map_lists = JSON.parse(args.maps);
        SceneManager.push(Scene_FastTravel);
        SceneManager.prepareNextScene(move_map_lists);
    });

    /**
     * ファストトラベル画面の処理を行うクラスです。
     *
     * @class
     */
    class Scene_FastTravel extends Scene_MenuBase {
        /**
         * 準備
         *
         * @param {} move_map_lists - マップ移動先の一覧
         */
        prepare(moveMapLists) {
            this._moveMapLists = moveMapLists;
        }

        /**
         *
         */
        create() {
            super.create();
            // キャンセル判定スイッチ
            if (cancelSwitch !== 0) {
                $gameSwitches.setValue(cancelSwitch, false);
            }
            this.createFastTravelWindow();
        }

        /**
         * 
         */
        createFastTravelWindow() {
            const rect = this.fastTravelWindowRect();
            this._fastTravelWindow = new Window_FastTravel(rect);
            this._fastTravelWindow.setHandler('ok',     this.commandMap.bind(this));
            this._fastTravelWindow.setHandler("cancel", this.onCancel.bind(this));
            this._fastTravelWindow.setupMapLists(this._moveMapLists);
            this.addWindow(this._fastTravelWindow);
        }

        // onPersonalCancel でも良いが、メニュー以外からも呼び出したいのでこの実装
        /**
         *
         */
        onCancel() {
            // キャンセル判定スイッチ
            if (cancelSwitch !== 0) {
                $gameSwitches.setValue(cancelSwitch, true);
            }
            this.popScene();
        }

        /**
         * 
         *
         * @returns {} 
         */
        fastTravelWindowRect() {
            const wx = 0;
            const wy = this.mainAreaTop();
            const ww = Graphics.boxWidth;
            const wh = Graphics.boxHeight - this.buttonAreaHeight();
            return new Rectangle(wx, wy, ww, wh);
        }

        /**
         * コマンド［マップ移動］
         */
        commandMap() {
            let map_data          = JSON.parse(this._moveMapLists[this._fastTravelWindow.index()]);
            let common_event      = Number(map_data.common_event || 0);
            let common_event_name = String(map_data.common_event_name);
            let mapId             = Number(map_data.mapId || 0);
            let x                 = Number(map_data.x || 0);
            let y                 = Number(map_data.y || 0);
            let direction         = Number(map_data.direction || 0);
            let fade_type         = Number(map_data.fade_type || 0);
            let se                = Potadra.convertAudio(map_data.se);
            SceneManager.goto(Scene_Map);

            if (common_event === 0 && common_event_name) {
                common_event = Potadra.nameSearch($dataCommonEvents, common_event_name, 'id', 'name', 0);
            }

            if (common_event === 0) {
                if (se) {
                    AudioManager.playSe(se);
                }
                $gameMap._interpreter.command201([0, mapId, x, y, direction, fade_type]);
            } else {
                $gameTemp.reserveCommonEvent(common_event);
            }
        }
    }


    if (MenuCommand) {
        /**
         * メニュー画面で表示するコマンドウィンドウです。
         *
         * @class
         */

        /**
         * 独自コマンドの追加用
         */
        const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
        Window_MenuCommand.prototype.addOriginalCommands = function() {
            _Window_MenuCommand_addOriginalCommands.apply(this, arguments);
            if (Potadra.checkSwitch(MenuSwitch)) {
                this.addCommand(MenuCommand, "fast_travel_menu", Potadra.checkSwitch(DisableMenuSwitch, false));
            }
        };


        /**
         * メニュー画面の処理を行うクラスです。
         *
         * @class
         */

        /**
         * コマンドウィンドウの作成
         */
        const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
        Scene_Menu.prototype.createCommandWindow = function() {
            _Scene_Menu_createCommandWindow.apply(this, arguments);
            this._commandWindow.setHandler("fast_travel_menu", this.fast_travel_menu.bind(this));
        };

        /**
         * コマンド［ファストトラベル］
         */
        Scene_Menu.prototype.fast_travel_menu = function() {
            SceneManager.push(Scene_FastTravel);
            SceneManager.prepareNextScene(MoveMapList);
        };
    }


    /**
     * ウィンドウの表示を行うウィンドウクラスです。
     *
     * @class
     */
    class Window_FastTravel extends Window_Command {
        /**
         * 桁数の取得
         *
         * @returns {number} 桁数
         */
        maxCols() {
            return 3;
        }

        /**
         * 行き先マップ一覧を設定
         *
         * @param {} moveMapLists - 
         */
        setupMapLists(moveMapLists) {
            this._data = moveMapLists;
            this.refresh();
            this.select(0);
        }

        /*
         * コマンドリストの作成
         */
        makeCommandList() {
            if (this._data) {
                for (let i = 0; i < this._data.length; i++) {
                    let map_data     = JSON.parse(this._data[i]);
                    let showSwitch   = Number(map_data.showSwitch || 0);
                    if (Potadra.checkSwitch(showSwitch)) {
                        let move_map_name = String(map_data.move_map_name);
                        let mapId         = Number(map_data.mapId || 0);
                        let common_event  = Number(map_data.common_event || 0);
                        let common_event_name = String(map_data.common_event_name);
                        let command_name  = move_map_name || $dataMapInfos[mapId].name || mapId;

                        if (common_event === 0 && common_event_name) {
                            common_event = Potadra.nameSearch($dataCommonEvents, common_event_name, 'id', 'name', 0);
                        }

                        if (!move_map_name && common_event !== 0) {
                            command_name = $dataCommonEvents[common_event].name;
                        }
                        this.addCommand(command_name, "map");
                    }
                }
            }
        }
    }
})();
