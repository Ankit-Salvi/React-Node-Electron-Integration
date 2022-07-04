"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var express_1 = __importDefault(require("express"));

var game_routes_1 = __importDefault(require("./game-routes"));

var router = express_1["default"].Router();
router.use(game_routes_1["default"]);
exports["default"] = router;