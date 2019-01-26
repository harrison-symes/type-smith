"use strict";
exports.__esModule = true;
var GAME_TYPES;
(function (GAME_TYPES) {
    GAME_TYPES["READY_GAME"] = "READY_GAME";
    GAME_TYPES["START_GAME"] = "START_GAME";
    GAME_TYPES["RECEIVE_TEAM_INFO"] = "TEAM_INFO";
    GAME_TYPES["WAITING_FOR_OPPONENT"] = "WAITING_FOR_OPPONENT";
    GAME_TYPES["START_SECOND_STACK"] = "START_SECOND_STACK";
    GAME_TYPES["START_VALIDATING"] = "START_VALIDATING";
    GAME_TYPES["TURN_VALIDATED"] = "TURN_VALIDATED";
    GAME_TYPES["SWITCH_CHARACTER_REQUEST"] = "SWITCH_CHARACTER_REQUEST";
})(GAME_TYPES = exports.GAME_TYPES || (exports.GAME_TYPES = {}));
var GameStage;
(function (GameStage) {
    GameStage["PENDING"] = "PENDING";
    GameStage["PRE_GAME"] = "PRE_GAME";
    GameStage["GAME_STARTED"] = "GAME_STARTED";
})(GameStage = exports.GameStage || (exports.GameStage = {}));
var TurnStage;
(function (TurnStage) {
    TurnStage["CHOOSING"] = "CHOOSING";
    TurnStage["WAITING"] = "WAITING";
    TurnStage["WAITING_SECOND"] = "WAITING_SECOND";
    TurnStage["VALIDATING"] = "VALIDATING";
    TurnStage["NEED_TO_SWITCH"] = "NEED_TO_SWITCH";
})(TurnStage = exports.TurnStage || (exports.TurnStage = {}));
