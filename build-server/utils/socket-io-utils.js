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

var common_utils_1 = __importDefault(require("./common-utils"));

var constants_1 = require("./constants");

var flow_1 = __importDefault(require("./flow"));

var game_1 = __importDefault(require("../controller/game"));

var bci_1 = __importDefault(require("../controller/bci"));

var status_manager_1 = __importDefault(require("../manager/status-manager"));
/**
 * TODO: Create separate socket rooms for BCI and Game
 */


module.exports = function (socket) {
  /**
   * For BCI App
   */
  socket.on(constants_1.SOCKET.BCI.START_STREAM, function (start) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , flow_1["default"].initialize(constants_1.SET_STATUS.INCOMING_BCI_APP_START_SESSION)];

          case 1:
            _a.sent();

            _a.label = 2;

          case 2:
            if (!(status_manager_1["default"].getGameRequestOnStatus() && !status_manager_1["default"].statusStack.includes(constants_1.STATUS.GAME_DATA_RECEIVED))) return [3
            /*break*/
            , 8];
            if (!status_manager_1["default"].getRAWEEGDataIncomingStatus()) return [3
            /*break*/
            , 4];
            return [4
            /*yield*/
            , bci_1["default"].streamAndSaveRawEEG(socket)];

          case 3:
            _a.sent();

            _a.label = 4;

          case 4:
            if (!!status_manager_1["default"].statusStack.includes(constants_1.STATUS.SESSION_COMPLETED)) return [3
            /*break*/
            , 7];
            return [4
            /*yield*/
            , game_1["default"].checkAndStreamToGame()];

          case 5:
            _a.sent();

            return [4
            /*yield*/
            , common_utils_1["default"].delay(constants_1.SECS_1)];

          case 6:
            _a.sent();

            _a.label = 7;

          case 7:
            return [3
            /*break*/
            , 2];

          case 8:
            console.log("--------------Stopped Emitting to Game----------------");
            return [2
            /*return*/
            ];
        }
      });
    });
  });
  socket.on(constants_1.SOCKET.BCI.STOP_STREAM, function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        flow_1["default"].initialize(constants_1.SET_STATUS.INCOMING_BCI_APP_STOP_SESSION);
        return [2
        /*return*/
        ];
      });
    });
  });
  /**
   * For Game
   */

  socket.on(constants_1.SOCKET.GAME.REQUEST_SESSION_START, function (socketClientData) {
    return __awaiter(this, void 0, void 0, function () {
      var vrDeviceId;
      return __generator(this, function (_a) {
        vrDeviceId = socketClientData ? socketClientData.vrDeviceId : common_utils_1["default"].getStaticVrDeviceId();
        flow_1["default"].initialize(constants_1.SET_STATUS.INCOMING_GAME_APP_REQUEST_START_SESSION, {
          vrDeviceId: vrDeviceId
        });
        return [2
        /*return*/
        ];
      });
    });
  });
  socket.on(constants_1.SOCKET.GAME.GET_DEVICE_POSITION_STATUS, function (socketClientData) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        flow_1["default"].initialize(constants_1.SET_STATUS.INCOMING_GAME_APP_REQUEST_DEVICE_POSITION);
        return [2
        /*return*/
        ];
      });
    });
  });
  socket.on(constants_1.SOCKET.GAME.END_FIRST_INDUCTION, function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        flow_1["default"].initialize(constants_1.SET_STATUS.INCOMING_GAME_APP_FIRST_INDUCTION_END);
        return [2
        /*return*/
        ];
      });
    });
  });
  socket.on(constants_1.SOCKET.GAME.END_LAST_INDUCTION, function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        flow_1["default"].initialize(constants_1.SET_STATUS.INCOMING_GAME_APP_LAST_INDUCTION_END);
        return [2
        /*return*/
        ];
      });
    });
  });
  socket.on(constants_1.SOCKET.GAME.END_GAME, function (sessionDetails) {
    return __awaiter(this, void 0, void 0, function () {
      var sessionID, levelsStorage;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            flow_1["default"].initialize(constants_1.SET_STATUS.INCOMING_GAME_APP_REQUEST_END_GAME);
            sessionDetails = sessionDetails ? JSON.parse(sessionDetails) : null;
            sessionID = sessionDetails.sessionID, levelsStorage = sessionDetails.levelsStorage;
            console.log("sessionDetails", sessionDetails);
            return [4
            /*yield*/
            , game_1["default"].onEndGameUploadData(sessionID, levelsStorage)];

          case 1:
            _a.sent();

            return [2
            /*return*/
            ];
        }
      });
    });
  });
  socket.on(constants_1.SOCKET.GAME.STOP_SESSION, function (sessionDetails) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            console.log("received stop-session");
            console.log("sessionDetails", sessionDetails);
            return [4
            /*yield*/
            , flow_1["default"].initialize(constants_1.SET_STATUS.INCOMING_GAME_APP_REQUEST_STOP_SESSION)];

          case 1:
            _a.sent();

            return [4
            /*yield*/
            , game_1["default"].stopSession(sessionDetails)];

          case 2:
            _a.sent();

            return [2
            /*return*/
            ];
        }
      });
    });
  });
};