"use strict";

var __createBinding = void 0 && (void 0).__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = void 0 && (void 0).__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = void 0 && (void 0).__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

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

var axios_1 = __importDefault(require("axios"));

var session_manager_1 = __importDefault(require("../manager/session-manager"));

var constants_1 = require("./constants");

var fs = require("fs");

var FormData = require("form-data");

var concat = require("concat-stream");

var node_cron_1 = __importDefault(require("node-cron"));

var common_utils_1 = __importStar(require("./common-utils"));

var status_manager_1 = __importDefault(require("../manager/status-manager"));

var ServerUtils =
/** @class */
function () {
  function ServerUtils() {}

  ServerUtils.getUsers = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        , axios_1["default"].get(constants_1.INTROSPECT + constants_1.INTROSPECT_USERS, {
          params: {
            page: 1,
            limit: 20
          },
          headers: {
            Authorization: "Bearer " + process.env.ACCESS_TOKEN
          }
        }).then(function (response) {
          return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
              return [2
              /*return*/
              , response];
            });
          });
        })];
      });
    });
  };

  ServerUtils.login = function (_a) {
    var username = _a.username,
        password = _a.password;
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_b) {
        return [2
        /*return*/
        , axios_1["default"].post(constants_1.INTROSPECT + constants_1.INTROSPECT_LOGIN, {
          username: username,
          password: password
        }).then(function (response) {
          return __awaiter(this, void 0, void 0, function () {
            var accessToken;
            return __generator(this, function (_a) {
              if (response) {
                accessToken = response.data ? response.data.access_token : null;

                if (accessToken) {
                  process.env.ACCESS_TOKEN = accessToken;
                } else {
                  return [2
                  /*return*/
                  , false];
                }

                return [2
                /*return*/
                , true];
              }

              return [2
              /*return*/
              , false];
            });
          });
        })["catch"](function (error) {
          console.log(error);
          return false;
        })];
      });
    });
  };

  ServerUtils.generateSessionId = function (sessionDataRequest) {
    return __awaiter(this, void 0, void 0, function () {
      var userId, eegDeviceId, vrDeviceId, clinicId, patientId, therapistId;
      return __generator(this, function (_a) {
        userId = sessionDataRequest.userId, eegDeviceId = sessionDataRequest.eegDeviceId, vrDeviceId = sessionDataRequest.vrDeviceId, clinicId = sessionDataRequest.clinicId, patientId = sessionDataRequest.patientId, therapistId = sessionDataRequest.therapistId;
        return [2
        /*return*/
        , axios_1["default"].post(constants_1.SERVER_MANAGEMENT_DOMAIN + constants_1.CREATE_SESSION, {
          userId: userId,
          eegDeviceId: eegDeviceId,
          vrDeviceId: vrDeviceId,
          clinicId: clinicId,
          patientId: patientId,
          therapistId: therapistId
        }).then(function (response) {
          return __awaiter(this, void 0, void 0, function () {
            var sessionId;
            return __generator(this, function (_a) {
              console.log(response);
              sessionId = response.data ? response.data.sessionId : null;

              if (sessionId) {
                console.log("generated sessionId--------", sessionId);

                if (sessionId !== null && sessionId !== undefined) {
                  session_manager_1["default"].setSessionId(sessionId);
                }

                return [2
                /*return*/
                , sessionId];
              }

              return [2
              /*return*/
              , false];
            });
          });
        })["catch"](function (error) {
          console.log(error);
        })];
      });
    });
  };

  ServerUtils.determineEEGDisconnect = function () {
    if (status_manager_1["default"].getRAWEEGDataIncomingStatus()) {
      console.log("eeg disconnected", new Date());
      session_manager_1["default"].setEEGDeviceId("");
      var states = common_utils_1["default"].pushAndRemoveSpecificElementsInArray("", [constants_1.STATUS.EEG_DEVICE_CONNECTED], status_manager_1["default"].statusStack);
      status_manager_1["default"].setConnectionStatus([0, 0]);
      status_manager_1["default"].setRAWEEGDataIncomingStatus(false);
      status_manager_1["default"].statusStack = states;
    }
  };

  ServerUtils.determineIfAllApplicationsAreStarted = function () {
    if (!status_manager_1["default"].getRAWEEGDataIncomingStatus()) {
      if (status_manager_1["default"].statusStack.includes(constants_1.STATUS.ALL_APPLICATION_STARTED)) {
        var states = common_utils_1["default"].pushAndRemoveSpecificElementsInArray("", [constants_1.STATUS.ALL_APPLICATION_STARTED], status_manager_1["default"].getStatus());
        status_manager_1["default"].statusStack = states;
      }
    }

    if (status_manager_1["default"].connectCounter > 1 && status_manager_1["default"].getRAWEEGDataIncomingStatus()) {
      status_manager_1["default"].setStatus(constants_1.STATUS.ALL_APPLICATION_STARTED);
    }

    session_manager_1["default"].setQueueLength(common_utils_1.socketConnectionQueuePipe.length);
  };

  ServerUtils.runCron = function () {
    return __awaiter(this, void 0, void 0, function () {
      var _this = this;

      return __generator(this, function (_a) {
        node_cron_1["default"].schedule("*/1 * * * * *", function () {
          common_utils_1["default"].determineAndSetMonitorPipe();

          _this.determineIfAllApplicationsAreStarted();

          if (session_manager_1["default"].monitorPipe.length > 3) {
            _this.determineEEGDisconnect();
          }
        });
        return [2
        /*return*/
        ];
      });
    });
  };

  ServerUtils.uploadToS3 = function (path, folderName) {
    return __awaiter(this, void 0, void 0, function () {
      var formData, _a, _b, _c;

      var _this = this;

      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            formData = new FormData();
            _b = (_a = formData).append;
            _c = ["session-data"];
            return [4
            /*yield*/
            , fs.createReadStream(path)];

          case 1:
            _b.apply(_a, _c.concat([_d.sent()]));

            formData.append("folderName", folderName);

            try {
              return [2
              /*return*/
              , formData.pipe(concat(function (data) {
                return __awaiter(_this, void 0, void 0, function () {
                  return __generator(this, function (_a) {
                    return [2
                    /*return*/
                    , axios_1["default"].request({
                      method: "POST",
                      url: constants_1.SERVER_MANAGEMENT_DOMAIN + constants_1.SAVE_SESSION,
                      data: data,
                      maxContentLength: Infinity,
                      maxBodyLength: Infinity,
                      headers: formData.getHeaders() // headers: {'Content-Type': 'multipart/form-data;boundary=' + formData.getBoundary()}

                    }).then(function (response) {
                      return __awaiter(this, void 0, void 0, function () {
                        var Location;
                        return __generator(this, function (_a) {
                          Location = response.data ? response.data.savedSession ? response.data.savedSession.Location : null : null;
                          console.log("response.data", response.data);

                          if (Location) {
                            return [2
                            /*return*/
                            , {
                              Location: Location
                            }];
                          }

                          return [2
                          /*return*/
                          , Location];
                        });
                      });
                    })["catch"](function (error) {
                      console.log("error is--->", error, error.stack);
                      return error;
                    })];
                  });
                });
              }))];
            } catch (err) {
              console.log("error executing the play", err);
            }

            return [2
            /*return*/
            ];
        }
      });
    });
  };

  return ServerUtils;
}();

exports["default"] = ServerUtils;