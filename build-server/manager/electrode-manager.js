"use strict";

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var common_utils_1 = __importDefault(require("../utils/common-utils"));

var constants_1 = require("../utils/constants");

var status_manager_1 = __importDefault(require("./status-manager"));
/**
 * Handles all electrode related caculations and data
 */


var ElectrodeManager =
/** @class */
function () {
  function ElectrodeManager() {}
  /**
   * Fetches formatted rawEEGData from Muse Device
   * @returns rawEEGData
   */


  ElectrodeManager.getRAWEEGData = function () {
    return this.rawEEGData;
  };
  /**
   * Fetches unformatted data from Muse Device
   * @returns rawMuseDataForBCI
   */


  ElectrodeManager.getRAWMuseDataForBCI = function () {
    return this.rawMuseDataForBCI;
  };
  /**
   * Sets unformatted data from Muse Device
   */


  ElectrodeManager.setRAWMuseDataForBCI = function (rawEEGData) {
    this.rawMuseDataForBCI = rawEEGData;
  };
  /**
   * Sets formatted data from Muse Device as rawEEGData
   */


  ElectrodeManager.setRAWEEGData = function (rawEEGData) {
    this.rawEEGData = rawEEGData;
  };
  /**
   * Returns stacked up position of electrode1
   * @returns electrode1Data (Array)
   */


  ElectrodeManager.getElectrode1Position = function () {
    return this.electrode1Data;
  };
  /**
   * Returns stacked up position of electrode2
   * @returns electrode2Data (Array)
   */


  ElectrodeManager.getElectrode2Position = function () {
    return this.electrode2Data;
  };
  /**
   * Returns stacked up position of electrode3
   * @returns electrode3Data (Array)
   */


  ElectrodeManager.getElectrode3Position = function () {
    return this.electrode3Data;
  };
  /**
   * Returns stacked up position of electrode4
   * @returns electrode4Data (Array)
   */


  ElectrodeManager.getElectrode4Position = function () {
    return this.electrode4Data;
  };
  /**
   * Add to stack for electrode1
   */


  ElectrodeManager.addToElectrode1 = function (data) {
    this.electrode1Data.push(data);
  };
  /**
   * Add to stack for electrode2
   */


  ElectrodeManager.addToElectrode2 = function (data) {
    this.electrode2Data.push(data);
  };
  /**
   * Add to stack for electrode3
   */


  ElectrodeManager.addToElectrode3 = function (data) {
    this.electrode3Data.push(data);
  };
  /**
   * Add to stack for electrode4
   */


  ElectrodeManager.addToElectrode4 = function (data) {
    this.electrode4Data.push(data);
  };
  /**
   * Fetches previousDevicePositionStatus i.e., minus 1 sec data
   * @returns previousDevicePositionStatus
   */


  ElectrodeManager.getPreviousDevicePositionStatus = function () {
    return this.previousDevicePositionStatus;
  };
  /**
   * Sets previousDevicePositionStatus to whatever is the current data
   */


  ElectrodeManager.setPreviousDevicePositionStatus = function (devicePositionStatus) {
    this.previousDevicePositionStatus = devicePositionStatus;
  };
  /**
   * Stacks respective positions of each electrode from the readings
   * @param readings
   * @returns IElectrodeManagerStack - electrode1Data, electrode2Data, electrode3Data, electrode4Data
   */


  ElectrodeManager.pushRawEEGDataToRespectiveElectrodes = function (readings) {
    return __awaiter(this, void 0, void 0, function () {
      var e, eegData;
      return __generator(this, function (_a) {
        for (e = 0; e <= constants_1.FOUR_ROWS; e++) {
          eegData = readings[e];

          if (constants_1.E1_POSITION.includes(e)) {
            this.addToElectrode1(eegData);
          }

          if (constants_1.E2_POSITION.includes(e)) {
            this.addToElectrode2(eegData);
          }

          if (constants_1.E3_POSITION.includes(e)) {
            this.addToElectrode3(eegData);
          }

          if (constants_1.E4_POSITION.includes(e)) {
            this.addToElectrode4(eegData);
          }
        }

        return [2
        /*return*/
        , {
          electrode1Data: this.electrode1Data,
          electrode2Data: this.electrode2Data,
          electrode3Data: this.electrode3Data,
          electrode4Data: this.electrode4Data,
          previousDevicePositionStatus: this.previousDevicePositionStatus
        }];
      });
    });
  };
  /**
   * Empties the electrodeStack
   */


  ElectrodeManager.emptyStack = function () {
    this.electrode1Data = common_utils_1["default"].clearArray(this.electrode1Data);
    this.electrode2Data = common_utils_1["default"].clearArray(this.electrode2Data);
    this.electrode3Data = common_utils_1["default"].clearArray(this.electrode3Data);
    this.electrode4Data = common_utils_1["default"].clearArray(this.electrode4Data);
  };
  /**
   * Marks one cycle as complete by
   * - Setting previousDevicePositionStatus
   * - Emptying stack
   */


  ElectrodeManager.completeCycle = function (devicePositionStatus) {
    if (status_manager_1["default"].statusStack.includes(constants_1.STATUS.SESSION_STARTED)) {
      if (devicePositionStatus) {
        common_utils_1["default"].updateGameStatus(constants_1.GAME_STATUS.GAME_IN_PROGRESS);
      } else {
        common_utils_1["default"].updateGameStatus(constants_1.GAME_STATUS.GAME_PAUSED);
      }
    }
  };
  /**
   * Checks if the electrodeStack is full to further process. The stackrange here is a constant
   * @returns true or false
   */


  ElectrodeManager.isStackFull = function () {
    if (this.electrode1Data.length > constants_1.STACK_RANGE && this.electrode2Data.length > constants_1.STACK_RANGE && this.electrode3Data.length > constants_1.STACK_RANGE && this.electrode4Data.length > constants_1.STACK_RANGE) {
      return true;
    }

    return false;
  };

  ElectrodeManager.setNoiseStatus = function (noiseStatus) {
    this.noiseStatus = noiseStatus;

    if (this.noiseStatusStack.length > 7) {
      this.noiseStatusStack = [];
    }

    this.noiseStatusStack.push(noiseStatus);
  };

  ElectrodeManager.getNoiseStatuses = function () {
    return this.noiseStatusStack;
  };

  ElectrodeManager.getNoiseStatus = function () {
    return this.noiseStatus;
  };

  ElectrodeManager.setConnectionStatus = function (connectionStatus) {
    this.connectionStatus = connectionStatus;
  };

  ElectrodeManager.getConnectionStatus = function () {
    return this.connectionStatus;
  };

  ElectrodeManager.electrode1Data = [];
  ElectrodeManager.electrode2Data = [];
  ElectrodeManager.electrode3Data = [];
  ElectrodeManager.electrode4Data = [];
  ElectrodeManager.previousDevicePositionStatus = [];
  ElectrodeManager.noiseStatus = 0;
  ElectrodeManager.connectionStatus = 0;
  ElectrodeManager.noiseStatusStack = [];
  return ElectrodeManager;
}();

exports["default"] = ElectrodeManager;