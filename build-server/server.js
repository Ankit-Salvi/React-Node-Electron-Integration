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
exports.socketIO = exports.gameClientSocket = exports.io = exports.http = exports.serverIO = exports.app = exports.htmlDirectory = void 0;

require("dotenv"); // import ejs from "ejs";


var express_1 = __importDefault(require("express"));

var constants_1 = require("./utils/constants");

var fs_1 = __importDefault(require("fs"));

var path_1 = __importDefault(require("path"));

var routes_1 = __importDefault(require("./routes"));

var common_utils_1 = __importDefault(require("./utils/common-utils"));

var body_parser_1 = __importDefault(require("body-parser"));

var status_manager_1 = __importDefault(require("./manager/status-manager"));

var tcp_socket_utils_1 = __importDefault(require("./utils/tcp-socket-utils"));

var net_1 = __importDefault(require("net"));

var session_manager_1 = __importDefault(require("./manager/session-manager"));

var server_utils_1 = __importDefault(require("./utils/server-utils"));
/**
 * Global exports
 * TODO: Make them save in class
 */

/**
 * Required variables for running socketIO
 */


exports.htmlDirectory = path_1["default"].join(__dirname, "../views/central-app-ui/build");
var fileName = common_utils_1["default"].generateUniqueId();
session_manager_1["default"].setFileName(fileName);
console.log("uniqueID Generated", fileName);
exports.app = express_1["default"]();
exports.serverIO = express_1["default"]().use(exports.app).listen(constants_1.PORT, function () {
  console.log("Listening server on " + constants_1.PORT);
});
exports.http = require("http").createServer(exports.app);
exports.io = require("socket.io")(exports.http, {
  cors: {
    origin: "*"
  }
});
exports.socketIO = exports.io.listen(exports.serverIO);

(function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var file, filePath, fd;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          file = session_manager_1["default"].getFileName();
          filePath = "" + constants_1.DIR_PATH + file + ".json";
          return [4
          /*yield*/
          , fs_1["default"].openSync(filePath, "w")];

        case 1:
          fd = _a.sent();
          return [2
          /*return*/
          ];
      }
    });
  });
})(); // CommonUtils.startBCIApp();


exports.app.use(require("cors")());
exports.app.use(function (req, res, next) {
  res.io = exports.io;
  next();
});
/**
 * Listen to TCP Socket
 */

(function () {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [2
      /*return*/
      , tcp_socket_utils_1["default"].createServer(net_1["default"])];
    });
  });
})();
/**
 * Run cron job every 1 sec
 */


server_utils_1["default"].runCron();
/**
 * Establishes socketIO connection with Game and BCI App
 */

exports.socketIO.on("connection", function (socketClient) {
  console.log(socketClient.id + " is connected successfully");
  exports.gameClientSocket = socketClient;
  status_manager_1["default"].connectCounter++;

  require("./utils/socket-io-utils")(socketClient);

  socketClient.on("forceDisconnect", function (socketClientData) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        socketClient.destroy();
        return [2
        /*return*/
        ];
      });
    });
  });
});
/**
 * Appends the eegDeviceId dynamically as the value is set
 */
// app.engine("html", ejs.renderFile);

exports.app.set("view engine", "html");
exports.app.set("view cache", false);
exports.app.set("views", __dirname);
exports.app.use(express_1["default"]["static"](exports.htmlDirectory + "/static"));
exports.app.get("/", function (req, res) {
  common_utils_1["default"].renderLoginPage(res, exports.htmlDirectory);
});
exports.app.get("/login", function (req, res) {
  common_utils_1["default"].renderTherapistAppPage(res, exports.htmlDirectory);
});
exports.app.get("/start-session", function (req, res) {
  // CommonUtils.renderTherapistAppPage(res, htmlDirectory);
  common_utils_1["default"].renderLoginPage(res, exports.htmlDirectory);
});
exports.app.use(body_parser_1["default"].urlencoded({
  extended: false
}));
exports.app.use(body_parser_1["default"].json());
exports.app.use("/", routes_1["default"]);