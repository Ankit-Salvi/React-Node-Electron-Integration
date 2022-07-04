require("dotenv");

import ejs from "ejs";
import express from "express";
import { DIR_PATH, PORT, STATUS } from "./utils/constants";
import fs from "fs";
import path from "path";
import router from "./routes";
import CommonUtils, { socketConnectionQueuePipe } from "./utils/common-utils";
import bodyParser from "body-parser";
import StatusManager from "./manager/status-manager";
import TCPSocketUtils from "./utils/tcp-socket-utils";
import net from "net";
import SessionManager from "./manager/session-manager";
import ServerUtils from "./utils/server-utils";

/**
 * Global exports
 * TODO: Make them save in class
 */

/**
 * Required variables for running socketIO
 */

export const htmlDirectory = path.join(__dirname, "../build");
const fileName = CommonUtils.generateUniqueId();
SessionManager.setFileName(fileName);
console.log("uniqueID Generated", fileName);
export const app = express();
export const serverIO = express()
  .use(app)
  .listen(PORT, () => {
    console.log(`Listening server on ${PORT}`);
  });
export const http = require("http").createServer(app);
export const io = require("socket.io")(http, {
  cors: { origin: "*" }
});
export let gameClientSocket;
export const socketIO = io.listen(serverIO);

(async () => {
  const file = SessionManager.getFileName();
  const filePath = `${DIR_PATH}${file}.json`;
  const fd = await fs.openSync(filePath, "w");
})();

// CommonUtils.startBCIApp();

app.use(require("cors")());
app.use(function(req, res, next) {
  res.io = io;
  next();
});

/**
 * Listen to TCP Socket
 */

(async () => TCPSocketUtils.createServer(net))();

/**
 * Run cron job every 1 sec
 */

ServerUtils.runCron();

/**
 * Establishes socketIO connection with Game and BCI App
 */

socketIO.on("connection", function(socketClient) {
  console.log(`${socketClient.id} is connected successfully`);
  gameClientSocket = socketClient;
  StatusManager.connectCounter++;

  require("./utils/socket-io-utils")(socketClient);

  socketClient.on("forceDisconnect", async function(socketClientData) {
    socketClient.destroy();
  });
});

/**
 * Appends the eegDeviceId dynamically as the value is set
 */
app.set("view engine", "html");
app.engine("html", ejs.renderFile);
app.set("view cache", false);
app.set("views", __dirname);
app.use(express.static(`${htmlDirectory}/static`));

app.get("/", (req, res) => {
  CommonUtils.renderLoginPage(res, htmlDirectory);
});

app.get("/login", (req, res) => {
  CommonUtils.renderTherapistAppPage(res, htmlDirectory);
});

app.get("/start-session", (req, res) => {
  // CommonUtils.renderTherapistAppPage(res, htmlDirectory);
  CommonUtils.renderLoginPage(res, htmlDirectory);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", router);
