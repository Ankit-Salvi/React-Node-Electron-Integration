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
exports.socketConnectionQueuePipe = void 0;

var constants_1 = require("./constants");

var server_utils_1 = __importDefault(require("./server-utils"));

var uuid_1 = require("uuid");

var fs_1 = __importDefault(require("fs"));

var game_routes_1 = require("../routes/game-routes");

var status_manager_1 = __importDefault(require("../manager/status-manager"));

var math_standard_deviation_1 = __importDefault(require("math-standard-deviation"));

var session_manager_1 = __importDefault(require("../manager/session-manager"));

var zlib_1 = __importDefault(require("zlib"));

var spawn = require("child_process").spawn;

exports.socketConnectionQueuePipe = [];

var CommonUtils =
/** @class */
function () {
  function CommonUtils() {}

  CommonUtils.determineAndSetMonitorPipe = function () {
    var pipeLength = exports.socketConnectionQueuePipe.length;
    var last3SecsValues = this.extractLastNSecValue(session_manager_1["default"].getQueueLength(), 3);

    if (this.isAllValueSame(last3SecsValues) && last3SecsValues[0] === pipeLength) {
      session_manager_1["default"].setMonitorPipe(1);
    } else {
      session_manager_1["default"].monitorPipe = [];
    }
  };

  CommonUtils.startBCIApp = function () {
    process.chdir(constants_1.VR_BUNDLE_PATH);
    spawn(constants_1.COMMANDS.START_BCI_APP, {
      shell: true
    });
  };

  CommonUtils.isAllValueTrue = function (array) {
    var result = false;

    if (array.length > 0) {
      var checkValue_1 = array[0];

      if (checkValue_1 === 1) {
        result = array.every(function (e) {
          return e === checkValue_1;
        });
      }
    }

    return result;
  };

  CommonUtils.isAllValueSame = function (array) {
    var result = false;

    if (array.length > 0) {
      var checkValue_2 = array[0]; // if (checkValue === 1) {

      result = array.every(function (e) {
        return e === checkValue_2;
      }); // }
    }

    return result;
  };

  CommonUtils.computeChannelValue = function (ch1, ch2) {
    return ch2.map(function (el, i) {
      return Math.abs(el - ch1[i]);
    });
  };
  /**
   * Compress rawEEGFile to .gz
   * Delete the compressed file
   * Delete the sessionData file
   * @param sessionId
   * @returns none
   */


  CommonUtils.compressSaveAndDeleteRawEEG = function (sessionId) {
    return __awaiter(this, void 0, void 0, function () {
      var rawEEGfile, zip, read, write, s3UploadStatus, fileDescriptor;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            console.log("Trying to compress");
            rawEEGfile = "" + constants_1.DIR_PATH + sessionId;
            zip = zlib_1["default"].createGzip();
            return [4
            /*yield*/
            , fs_1["default"].createReadStream(rawEEGfile + ".json")];

          case 1:
            read = _a.sent();
            return [4
            /*yield*/
            , fs_1["default"].createWriteStream(rawEEGfile + ".json.gz")];

          case 2:
            write = _a.sent();
            read.pipe(zip).pipe(write);
            console.log("Zipped Successfully");
            return [4
            /*yield*/
            , server_utils_1["default"].uploadToS3(rawEEGfile + ".json", "RawEEGData")];

          case 3:
            s3UploadStatus = _a.sent();
            if (!s3UploadStatus) return [3
            /*break*/
            , 8];
            return [4
            /*yield*/
            , fs_1["default"].openSync(rawEEGfile + ".json", "r")];

          case 4:
            fileDescriptor = _a.sent();
            return [4
            /*yield*/
            , fs_1["default"].close(fileDescriptor, function (err) {
              if (err) {
                console.error("Failed to close file", err);
              } else {
                console.log("\n> File Closed successfully");
              }
            })];

          case 5:
            _a.sent();

            return [4
            /*yield*/
            , fs_1["default"].unlinkSync(rawEEGfile + ".json")];

          case 6:
            _a.sent();

            return [4
            /*yield*/
            , fs_1["default"].unlinkSync(rawEEGfile + ".json.gz")];

          case 7:
            _a.sent();

            _a.label = 8;

          case 8:
            return [2
            /*return*/
            ];
        }
      });
    });
  };
  /**
   * Split by \n
   * Split by ,
   * Assign it to each electrode
   * Return the chunk and add it to array
   * @param rawEEGData
   * @returns formattedData
   * [
   *  {
   *   timestamp: <string>
   *   AF7: [int],
   *   AF8: [int],
   *   TP9: [int],
   *   TP10: [int]
   *  },
   * ]
   */


  CommonUtils.formatRAWEEGData = function (rawEEGData) {
    return __awaiter(this, void 0, void 0, function () {
      var electrodeData, splittedDataBySpace, _i, splittedDataBySpace_1, databySpace, splittedDataByComma, i, data, key;

      return __generator(this, function (_a) {
        rawEEGData = rawEEGData ? rawEEGData.trim() : "";
        rawEEGData = rawEEGData.substring(0, rawEEGData.lastIndexOf("\n") + 1);
        electrodeData = {
          timestamp: new Date().getTime(),
          TP9: [],
          AF7: [],
          AF8: [],
          TP10: []
        };
        splittedDataBySpace = rawEEGData.split("\n");

        for (_i = 0, splittedDataBySpace_1 = splittedDataBySpace; _i < splittedDataBySpace_1.length; _i++) {
          databySpace = splittedDataBySpace_1[_i];
          splittedDataByComma = databySpace.split(",");

          for (i in splittedDataByComma) {
            if (splittedDataByComma[i]) {
              data = splittedDataByComma[i];
              key = constants_1.ELECTRODES[i];
              electrodeData[key].push(data);
            }
          }
        }

        return [2
        /*return*/
        , electrodeData];
      });
    });
  };
  /**
   *
   * Remove empty spaces
   * Remove null values
   * Read JSON file in utf8 format and push eegData to it
   * @param rawEEGData
   * @returns
   */


  CommonUtils.formatData = function (rawEEGData, sessionId) {
    return __awaiter(this, void 0, void 0, function () {
      var data, json, dataToWrite, err_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 4,, 5]);

            return [4
            /*yield*/
            , fs_1["default"].readFileSync("" + constants_1.DIR_PATH + sessionId + ".json", "utf8")];

          case 1:
            data = _a.sent();
            if (!(data !== undefined && data !== null)) return [3
            /*break*/
            , 3];
            json = data ? JSON.parse(data.toString()) : null;
            return [4
            /*yield*/
            , this.formatRAWEEGData(rawEEGData)];

          case 2:
            rawEEGData = _a.sent();
            dataToWrite = rawEEGData;

            if (json === {} || json === null || json === undefined || json === "") {
              json = [dataToWrite];
            } else {
              json.push(dataToWrite);
            }

            return [2
            /*return*/
            , json];

          case 3:
            return [2
            /*return*/
            , false];

          case 4:
            err_1 = _a.sent(); // Do nothing

            console.log("caught error", err_1);
            return [2
            /*return*/
            , false];

          case 5:
            return [2
            /*return*/
            ];
        }
      });
    });
  };
  /**
   * Generates uniqueId
   * @returns uuid4
   */


  CommonUtils.generateUniqueId = function () {
    var uuid4 = uuid_1.v4();
    return uuid4;
  };
  /**
   * Takes input of an array and extracts last n sec value
   * @param arr
   * @param n
   * @returns
   */


  CommonUtils.extractLastNSecValue = function (arr, n) {
    return arr.slice(Math.max(arr.length - n, 0));
  };
  /**
   * Extracts EEGData from socket
   * @param rawEEGData
   * @returns
   */


  CommonUtils.extractEEGDataFromSocket = function (data) {
    var rawEEGData = data !== null ? data !== undefined ? data.toString() : null : null;
    var rawMuseDataForBCI = rawEEGData;
    var eegDeviceId;
    var eegDeviceIdRow = rawEEGData.split(":end");
    var extractedDeviceId = eegDeviceIdRow[0].split("muse-deviceId:");

    if (extractedDeviceId[1]) {
      if (extractedDeviceId[1].indexOf("\x00") === -1) {
        eegDeviceId = extractedDeviceId[1];
      }
    }

    rawEEGData = eegDeviceIdRow[1];

    if (eegDeviceId && rawEEGData) {
      eegDeviceId = eegDeviceId;
      this.setElectrodeStatus(constants_1.STATUS.EEG_DEVICE_CONNECTED);
    }

    return {
      rawMuseDataForBCI: rawMuseDataForBCI,
      eegDeviceId: eegDeviceId,
      rawEEGData: rawEEGData
    };
  };

  CommonUtils.pushAndRemoveSpecificElementsInArray = function (elementToInclude, elementsToRemove, array) {
    var forDeletion = elementsToRemove;
    array = array.filter(function (item) {
      return !forDeletion.includes(item);
    });

    if (elementToInclude && elementToInclude !== "") {
      array.push(elementToInclude);
    }

    return array;
  };
  /**
   * Returns static data
   * @returns const string
   */


  CommonUtils.getStaticUserId = function () {
    return constants_1.USER_ID;
  };

  CommonUtils.getStaticClinicId = function () {
    return constants_1.CLINIC_ID;
  };

  CommonUtils.getStaticVrDeviceId = function () {
    return constants_1.VR_DEVICE_ID;
  };
  /**
   * Get SessionId
   * Check if sessionId is already present, if not generate
   * @param param0
   * @returns sessionId
   */


  CommonUtils.getSessionId = function () {
    return __awaiter(this, void 0, void 0, function () {
      var sessionId_1, file, filePath, vrDeviceId, eegDeviceId, userId, clinicId, patientId, therapistId, newFilePath_1, err_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 4,, 5]);

            sessionId_1 = session_manager_1["default"].getSessionId();
            file = session_manager_1["default"].getFileName();
            filePath = "" + constants_1.DIR_PATH + file + ".json";
            if (!(fs_1["default"].existsSync(filePath) && (!sessionId_1 || sessionId_1 !== ""))) return [3
            /*break*/
            , 3];
            vrDeviceId = session_manager_1["default"].getVRDeviceId();
            eegDeviceId = session_manager_1["default"].getEEGDeviceId();
            userId = session_manager_1["default"].getUserId();
            clinicId = CommonUtils.getStaticClinicId();
            patientId = session_manager_1["default"].getPatientName();
            therapistId = session_manager_1["default"].getTherapistName();
            if (!(userId && eegDeviceId)) return [3
            /*break*/
            , 3];
            return [4
            /*yield*/
            , server_utils_1["default"].generateSessionId({
              userId: userId,
              clinicId: clinicId,
              eegDeviceId: eegDeviceId,
              vrDeviceId: vrDeviceId,
              therapistId: therapistId,
              patientId: patientId
            })];

          case 1:
            sessionId_1 = _a.sent();
            newFilePath_1 = "" + constants_1.DIR_PATH + sessionId_1 + ".json";
            return [4
            /*yield*/
            , fs_1["default"].rename(filePath, newFilePath_1, function (err) {
              return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      if (err) {
                        throw err;
                      }

                      return [4
                      /*yield*/
                      , fs_1["default"].openSync(newFilePath_1, "w")];

                    case 1:
                      _a.sent();

                      return [2
                      /*return*/
                      , sessionId_1];
                  }
                });
              });
            })];

          case 2:
            _a.sent();

            _a.label = 3;

          case 3:
            // TODO: Handle and throw error if sessionID is not generated properly
            return [2
            /*return*/
            , sessionId_1];

          case 4:
            err_2 = _a.sent(); // do nothing

            console.error(err_2);
            return [3
            /*break*/
            , 5];

          case 5:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  CommonUtils.updateGameStatus = function (statusUpdate) {
    // Update game status only when its not terminated
    if (!status_manager_1["default"].getStatus().includes(constants_1.GAME_STATUS.GAME_ENDED)) {
      var statusToUpdate = Object.values(constants_1.GAME_STATUS).find(function (status) {
        return status === statusUpdate;
      });
      var statuses = CommonUtils.pushAndRemoveSpecificElementsInArray(statusToUpdate, Object.values(constants_1.GAME_STATUS), status_manager_1["default"].getStatus());
      status_manager_1["default"].statusStack = statuses;
    }
  };

  CommonUtils.checkIfDataWithinRange = function (data, _a) {
    var min = _a.min,
        max = _a.max;
    return data.every(function (e) {
      return e >= min && e <= max;
    });
  };

  CommonUtils.allEqual = function (array) {
    return array.every(function (v) {
      return v === array[0];
    });
  };

  CommonUtils.clearArray = function (array) {
    while (array.length) {
      array.pop();
    }

    return array;
  };

  CommonUtils.setElectrodeStatus = function (status) {
    status_manager_1["default"].setStatus(status);
  };

  CommonUtils.pushToQueue = function (status) {
    exports.socketConnectionQueuePipe.push(status);

    if (exports.socketConnectionQueuePipe.length > 100) {
      exports.socketConnectionQueuePipe.length = 0;
    }
  };

  CommonUtils.writeRawEEGToFile = function (extractedData) {
    return __awaiter(this, void 0, void 0, function () {
      var getSessionStatus, sessionId, data;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , status_manager_1["default"].getStatus()];

          case 1:
            getSessionStatus = _a.sent();
            if (!(game_routes_1.isSessionStarted && !getSessionStatus.includes(constants_1.STATUS.SESSION_ENDED) && !getSessionStatus.includes(constants_1.STATUS.SESSION_COMPLETED))) return [3
            /*break*/
            , 5];
            session_manager_1["default"].setEEGDeviceId(extractedData.eegDeviceId);
            return [4
            /*yield*/
            , CommonUtils.getSessionId()];

          case 2:
            sessionId = _a.sent();
            return [4
            /*yield*/
            , this.formatData(extractedData.rawEEGData, sessionId)];

          case 3:
            data = _a.sent();
            if (!data) return [3
            /*break*/
            , 5];
            return [4
            /*yield*/
            , fs_1["default"].writeFileSync("" + constants_1.DIR_PATH + sessionId + ".json", JSON.stringify(data))];

          case 4:
            _a.sent();

            _a.label = 5;

          case 5:
            return [2
            /*return*/
            ];
        }
      });
    });
  };
  /**
   * Retrieves last 7 rows from EEGData
   * @param readings
   * @returns
   */


  CommonUtils.addToStackIfNotPresent = function (array, newItem) {
    if (array.indexOf(newItem) === -1) {
      array.push(newItem);
    }

    return array;
  };

  CommonUtils.restartSession = function () {
    var statues = [];
    Object.values(constants_1.STATUS).forEach(function (item) {
      if (item === constants_1.STATUS.ALL_APPLICATION_STARTED) {
        statues.push(item);
      }
    });
    console.log("statues to restart", statues);
    status_manager_1["default"].statusStack = statues;
    return statues;
  };

  CommonUtils.getValues = function () {
    return {
      eegDeviceId: session_manager_1["default"].getEEGDeviceId(),
      vrDeviceId: session_manager_1["default"].getVRDeviceId(),
      therapistName: session_manager_1["default"].getTherapistName(),
      therapists: session_manager_1["default"].getTherapists(),
      patients: session_manager_1["default"].getPatients(),
      patientName: session_manager_1["default"].getPatientName(),
      statusMessage: status_manager_1["default"].getStatusMessage(),
      statusStack: status_manager_1["default"].getStatus(),
      connectionStatus: status_manager_1["default"].getConnectionStatus()
    };
  };

  CommonUtils.renderLoginPage = function (res, htmlDirectory) {
    return res.render(htmlDirectory + "/index.html", this.getValues());
  };

  CommonUtils.renderTherapistAppPage = function (res, htmlDirectory) {
    return res.render(htmlDirectory + "/views/therapist-app.ejs", this.getValues());
  };
  /**
   * Compares if two object are equal
   * @param value
   * @param other
   * @returns boolean
   */


  CommonUtils.isEqual = function (value, other) {
    // Get the value type
    var type = Object.prototype.toString.call(value); // If the two objects are not the same type, return false

    if (type !== Object.prototype.toString.call(other)) {
      return false;
    } // If items are not an object or array, return false


    if (["[object Array]", "[object Object]"].indexOf(type) < 0) {
      return false;
    } // Compare the length of the length of the two items


    var valueLen = type === "[object Array]" ? value.length : Object.keys(value).length;
    var otherLen = type === "[object Array]" ? other.length : Object.keys(other).length;

    if (valueLen !== otherLen) {
      return false;
    } // Compare two items


    var compare = function compare(item1, item2) {
      // Get the object type
      var itemType = Object.prototype.toString.call(item1); // If an object or array, compare recursively

      if (["[object Array]", "[object Object]"].indexOf(itemType) >= 0) {
        if (!this.isEqual(item1, item2)) {
          return false;
        }
      } // Otherwise, do a simple comparison
      else {
        // If the two items are not the same type, return false
        if (itemType !== Object.prototype.toString.call(item2)) {
          return false;
        } // Else if it's a function, convert to a string and compare
        // Otherwise, just compare


        if (itemType === "[object Function]") {
          if (item1.toString() !== item2.toString()) {
            return false;
          }
        } else {
          if (item1 !== item2) {
            return false;
          }
        }
      }
    }; // Compare properties


    if (type === "[object Array]") {
      for (var i = 0; i < valueLen; i++) {
        if (compare(value[i], other[i]) === false) {
          return false;
        }
      }
    } else {
      for (var key in value) {
        if (value.hasOwnProperty(key)) {
          if (compare(value[key], other[key]) === false) {
            return false;
          }
        }
      }
    } // If nothing failed, return true


    return true;
  };
  /**
   *
   * @param arr
   * @returns standard deviation of an array
   */


  CommonUtils.standardDeviation = function (arr) {
    // Find Mean
    var standardDeviationResult = math_standard_deviation_1["default"].standardDeviation(arr);
    return standardDeviationResult;
  };
  /**
   * Returns ms of delay
   * @param ms
   * @returns
   */


  CommonUtils.delay = function (ms) {
    return new Promise(function (resolve) {
      return setTimeout(resolve, ms);
    });
  };

  return CommonUtils;
}();

exports["default"] = CommonUtils;