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

var electrode_manager_1 = __importDefault(require("../manager/electrode-manager"));

var common_utils_1 = __importDefault(require("./common-utils"));

var constants_1 = require("./constants");

var GameUtils =
/** @class */
function () {
  function GameUtils() {}

  GameUtils.getStandardDeviationForChannels = function (ch1, ch2) {
    var standardDeviationResultofCh1 = common_utils_1["default"].standardDeviation(ch1);
    var channel1StandardDeviation = standardDeviationResultofCh1;
    var standardDeviationResultofCh2 = common_utils_1["default"].standardDeviation(ch2);
    var channel2StandardDeviation = standardDeviationResultofCh2;
    return {
      channel1StandardDeviation: channel1StandardDeviation,
      channel2StandardDeviation: channel2StandardDeviation
    };
  };
  /**
   * Derives noise status from EEG Device based on standardDeviation
   * @param channel1StandardDeviation
   * @param channel2StandardDeviation
   * @param currentNoiseStatus
   * @param currentConnectionStatus
   * @returns
   */


  GameUtils.determineAndSetNoiseStatus = function (channel1StandardDeviation, channel2StandardDeviation, currentNoiseStatus, currentConnectionStatus) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (currentConnectionStatus) {
          case 0:
            currentNoiseStatus = channel1StandardDeviation <= constants_1.STANDARD_DEVIATION_RANGE && channel2StandardDeviation <= constants_1.STANDARD_DEVIATION_RANGE ? 1 : 0;
            break;

          case 1:
            currentNoiseStatus = channel1StandardDeviation <= constants_1.STANDARD_DEVIATION_RANGE && channel2StandardDeviation <= constants_1.STANDARD_DEVIATION_RANGE ? 1 : 0;
            break;

          default:
            break;
        }

        electrode_manager_1["default"].setNoiseStatus(currentNoiseStatus);
        return [2
        /*return*/
        , currentNoiseStatus];
      });
    });
  };

  GameUtils.deriveChannelValues = function (readings) {
    var AF7 = readings.AF7,
        AF8 = readings.AF8,
        TP9 = readings.TP9,
        TP10 = readings.TP10;
    var ch1 = common_utils_1["default"].computeChannelValue(AF7, TP9);
    var ch2 = common_utils_1["default"].computeChannelValue(AF8, TP10);
    return {
      ch1: ch1,
      ch2: ch2
    };
  };

  GameUtils.computeDevicePositionStatus = function (readings) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, ch1, ch2, _b, channel1StandardDeviation, channel2StandardDeviation, connectionStatus, noiseStatus, noiseStatues, extractedLast5NoiseValues;

      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _a = this.deriveChannelValues(readings), ch1 = _a.ch1, ch2 = _a.ch2;
            return [4
            /*yield*/
            , this.getStandardDeviationForChannels(ch1, ch2)];

          case 1:
            _b = _c.sent(), channel1StandardDeviation = _b.channel1StandardDeviation, channel2StandardDeviation = _b.channel2StandardDeviation;
            connectionStatus = electrode_manager_1["default"].getConnectionStatus();
            noiseStatus = electrode_manager_1["default"].getNoiseStatus();
            noiseStatues = electrode_manager_1["default"].getNoiseStatuses();
            return [4
            /*yield*/
            , this.determineAndSetNoiseStatus(channel1StandardDeviation, channel2StandardDeviation, noiseStatus, connectionStatus)];

          case 2:
            // Determine Noise status
            noiseStatus = _c.sent();
            extractedLast5NoiseValues = common_utils_1["default"].extractLastNSecValue(noiseStatues, 5);

            if (common_utils_1["default"].isAllValueTrue(extractedLast5NoiseValues)) {
              electrode_manager_1["default"].setConnectionStatus(1);
            } else {
              electrode_manager_1["default"].setConnectionStatus(0);
            }

            return [4
            /*yield*/
            , electrode_manager_1["default"].completeCycle(electrode_manager_1["default"].getConnectionStatus())];

          case 3:
            _c.sent();

            return [2
            /*return*/
            , {
              noiseStatus: electrode_manager_1["default"].getNoiseStatus(),
              connectionStatus: electrode_manager_1["default"].getConnectionStatus()
            }];
        }
      });
    });
  };

  return GameUtils;
}();

exports["default"] = GameUtils;