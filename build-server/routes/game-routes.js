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
exports.isSessionStarted = void 0;

var express_1 = __importDefault(require("express"));

var session_manager_1 = __importDefault(require("../manager/session-manager"));

var status_manager_1 = __importDefault(require("../manager/status-manager"));

var server_1 = require("../server");

var common_utils_1 = __importDefault(require("../utils/common-utils"));

var server_utils_1 = __importDefault(require("../utils/server-utils"));

var constants_1 = require("../utils/constants");

var introspect_manager_1 = __importDefault(require("../manager/introspect-manager"));

var path_1 = __importDefault(require("path"));

var fs_1 = __importDefault(require("fs"));

var game_1 = __importDefault(require("../controller/game"));

exports.isSessionStarted = false;
var GameRoutes = express_1["default"].Router();
/**
 * Routes for handling start-session button from TherapistWebApp
 */

GameRoutes.post("/start-session", function (req, res, next) {
  return __awaiter(this, void 0, void 0, function () {
    var socketIOGameClient, statusMessage, therapistName, patientName, userId, sessionId;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          socketIOGameClient = server_1.socketIO;
          statusMessage = constants_1.MESSAGES.ERROR_CREATING_SESSION;
          therapistName = req.body.therapistName;
          patientName = req.body.patientName;
          userId = patientName + "_" + Math.random();
          session_manager_1["default"].setClinicId(common_utils_1["default"].getStaticClinicId());
          session_manager_1["default"].setUserId(userId);
          session_manager_1["default"].setPatientName(patientName);
          session_manager_1["default"].setTherapistName(therapistName);
          status_manager_1["default"].setStatusMessage(statusMessage);
          return [4
          /*yield*/
          , common_utils_1["default"].getSessionId()];

        case 1:
          sessionId = _a.sent();
          return [4
          /*yield*/
          , common_utils_1["default"].delay(constants_1.SECS_1)];

        case 2:
          _a.sent();

          if (sessionId) {
            socketIOGameClient.emit(constants_1.SOCKET.GAME.START_SESSION, {
              sessionId: sessionId
            });
            exports.isSessionStarted = true;
            statusMessage = constants_1.MESSAGES.SESSION_START_SUCCESS;
            common_utils_1["default"].setElectrodeStatus(constants_1.STATUS.SESSION_STARTED);
            status_manager_1["default"].setStatusMessage(statusMessage);
          }

          return [2
          /*return*/
          , common_utils_1["default"].renderLoginPage(res, server_1.htmlDirectory)];
      }
    });
  });
});
/**
 * Routes for handling stop-session button from TherapistWebApp
 */

GameRoutes.post("/stop-session", function (req, res, next) {
  return __awaiter(this, void 0, void 0, function () {
    var socketIOGameClient, statusMessage, sessionId;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          socketIOGameClient = server_1.socketIO;
          statusMessage = constants_1.MESSAGES.ERROR_STOPPING_SESSION;
          status_manager_1["default"].setStatusMessage(statusMessage);
          return [4
          /*yield*/
          , session_manager_1["default"].getSessionId()];

        case 1:
          sessionId = _a.sent();

          if (sessionId) {
            socketIOGameClient.emit(constants_1.SOCKET.GAME.FORCE_STOP_SESSION, {
              sessionId: sessionId
            });
            exports.isSessionStarted = false;
            statusMessage = constants_1.MESSAGES.SESSION_STOP_SUCCESS;
            status_manager_1["default"].setStatusMessage(statusMessage);
            status_manager_1["default"].setStatus(constants_1.STATUS.FORCE_STOPPED);
            common_utils_1["default"].setElectrodeStatus(constants_1.STATUS.SESSION_ENDED);
          }

          if (!!status_manager_1["default"].statusStack.includes(constants_1.STATUS.FIRST_INDUCTION)) return [3
          /*break*/
          , 3];
          return [4
          /*yield*/
          , game_1["default"].stopSession()];

        case 2:
          _a.sent();

          _a.label = 3;

        case 3:
          // return CommonUtils.renderTherapistAppPage(res, htmlDirectory);
          return [2
          /*return*/
          , common_utils_1["default"].renderLoginPage(res, server_1.htmlDirectory)];
      }
    });
  });
});
GameRoutes.post("/login", function (req, res, next) {
  return __awaiter(this, void 0, void 0, function () {
    var statusMessage, username, password, loginResponse;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          statusMessage = constants_1.MESSAGES.ERROR_LOGIN;
          status_manager_1["default"].setStatusMessage(statusMessage);
          username = req.body.username;
          password = req.body.password;
          if (!(username && password)) return [3
          /*break*/
          , 4];
          return [4
          /*yield*/
          , server_utils_1["default"].login({
            username: username,
            password: password
          })];

        case 1:
          loginResponse = _a.sent();
          if (!loginResponse) return [3
          /*break*/
          , 3];
          statusMessage = constants_1.MESSAGES.SUCCESSFUL_LOGIN;
          status_manager_1["default"].setStatusMessage(statusMessage);
          return [4
          /*yield*/
          , introspect_manager_1["default"].initialize()];

        case 2:
          _a.sent();

          return [2
          /*return*/
          , common_utils_1["default"].renderTherapistAppPage(res, server_1.htmlDirectory)];

        case 3:
          return [2
          /*return*/
          , common_utils_1["default"].renderLoginPage(res, server_1.htmlDirectory)];

        case 4:
          return [2
          /*return*/
          , common_utils_1["default"].renderLoginPage(res, server_1.htmlDirectory)];
      }
    });
  });
});
GameRoutes.post("/restart-session", function (req, res, next) {
  return __awaiter(this, void 0, void 0, function () {
    var statusMessage, socketIOGameClient, htmlDirectory1, file, filePath, fd;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          statusMessage = constants_1.MESSAGES.NEW_LOGIN;
          socketIOGameClient = server_1.socketIO;
          common_utils_1["default"].restartSession();
          status_manager_1["default"].setStatusMessage(statusMessage);
          session_manager_1["default"].setSessionId("");
          htmlDirectory1 = path_1["default"].join(__dirname, "../");
          file = common_utils_1["default"].generateUniqueId();
          socketIOGameClient.emit(constants_1.SOCKET.GAME.RESTART_SESSION, "restart");
          session_manager_1["default"].setFileName(file);
          filePath = "" + constants_1.DIR_PATH + file + ".json";
          return [4
          /*yield*/
          , fs_1["default"].openSync(filePath, "w")];

        case 1:
          fd = _a.sent();
          return [2
          /*return*/
          , common_utils_1["default"].renderLoginPage(res, htmlDirectory1)];
      }
    });
  });
});
exports["default"] = GameRoutes;