"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var constants_1 = require("../utils/constants");

var common_utils_1 = __importDefault(require("../utils/common-utils"));

var StatusManager =
/** @class */
function () {
  function StatusManager() {}

  StatusManager.getConnectionStatus = function () {
    return this.connectionStatus;
  };

  StatusManager.setConnectionStatus = function (connectionStatus) {
    this.connectionStatus = connectionStatus;
  };

  StatusManager.getStatusMessage = function () {
    return this.statusMessage;
  };

  StatusManager.setStatusMessage = function (statusMessage) {
    this.statusMessage = statusMessage;
  };

  StatusManager.getIGameStarted = function () {
    return this.isGameStarted;
  };

  StatusManager.setIsGameStarted = function (status) {
    this.isGameStarted = status;
  };

  StatusManager.getStreamRunningStatus = function () {
    return this.streamRunning;
  };

  StatusManager.getGameRequestOnStatus = function () {
    return this.isRequestFromGameOn;
  };

  StatusManager.getRAWEEGDataIncomingStatus = function () {
    return this.isRAWEEGDataIncoming;
  };

  StatusManager.setRAWEEGDataIncomingStatus = function (status) {
    this.isRAWEEGDataIncoming = status;
  };

  StatusManager.setGameRequestOnStatus = function (status) {
    this.isRequestFromGameOn = status;
  };

  StatusManager.setStreamRunningStatus = function (status) {
    this.streamRunning = status;
  };

  StatusManager.getStatus = function () {
    return this.statusStack;
  };

  StatusManager.setStatus = function (status) {
    this.status = status;
    this.statusStack = common_utils_1["default"].addToStackIfNotPresent(this.statusStack, status);
  };
  /**
   * All variables under the class are public for now
   * TODO: To discuss and see if we need to make any of the variables as private
   */


  StatusManager.status = constants_1.STATUS.NO_DEVICE_CONNECTED;
  StatusManager.statusStack = [];
  StatusManager.streamRunning = false;
  StatusManager.isRequestFromGameOn = false;
  StatusManager.isRAWEEGDataIncoming = false;
  StatusManager.isGameStarted = false;
  StatusManager.statusMessage = "";
  StatusManager.connectCounter = 0;
  StatusManager.connectionStatus = [];
  return StatusManager;
}();

exports["default"] = StatusManager;