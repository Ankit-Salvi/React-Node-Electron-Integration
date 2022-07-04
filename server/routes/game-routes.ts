import express from "express";
import SessionManager from "../manager/session-manager";
import StatusManager from "../manager/status-manager";
import { htmlDirectory, socketIO } from "../server";
import CommonUtils from "../utils/common-utils";
import ServerUtils from "../utils/server-utils";
import { DIR_PATH, MESSAGES, SECS_1, SOCKET, STATUS } from "../utils/constants";
import IntrospectManager from "../manager/introspect-manager";
import path from "path";
import fs from "fs";
import GameController from "../controller/game";

export let isSessionStarted = false;
const GameRoutes = express.Router();

/**
 * Routes for handling start-session button from TherapistWebApp
 */

GameRoutes.post("/start-session", async function(req, res, next) {
  const socketIOGameClient = socketIO;
  let statusMessage = MESSAGES.ERROR_CREATING_SESSION;
  const therapistName = req.body.therapistName;
  const patientName = req.body.patientName;
  const userId = patientName + "_" + Math.random();

  SessionManager.setClinicId(CommonUtils.getStaticClinicId());
  SessionManager.setUserId(userId);
  SessionManager.setPatientName(patientName);
  SessionManager.setTherapistName(therapistName);
  StatusManager.setStatusMessage(statusMessage);

  const sessionId = await CommonUtils.getSessionId();
  await CommonUtils.delay(SECS_1);

  if (sessionId) {
    socketIOGameClient.emit(SOCKET.GAME.START_SESSION, { sessionId });
    isSessionStarted = true;
    statusMessage = MESSAGES.SESSION_START_SUCCESS;
    CommonUtils.setElectrodeStatus(STATUS.SESSION_STARTED);
    StatusManager.setStatusMessage(statusMessage);
  }
  return CommonUtils.renderLoginPage(res, htmlDirectory);
});

/**
 * Routes for handling stop-session button from TherapistWebApp
 */

GameRoutes.post("/stop-session", async function(req, res, next) {
  const socketIOGameClient = socketIO;

  let statusMessage = MESSAGES.ERROR_STOPPING_SESSION;

  StatusManager.setStatusMessage(statusMessage);
  const sessionId = await SessionManager.getSessionId();

  if (sessionId) {
    socketIOGameClient.emit(SOCKET.GAME.FORCE_STOP_SESSION, { sessionId });
    isSessionStarted = false;
    statusMessage = MESSAGES.SESSION_STOP_SUCCESS;
    StatusManager.setStatusMessage(statusMessage);
    StatusManager.setStatus(STATUS.FORCE_STOPPED);
    CommonUtils.setElectrodeStatus(STATUS.SESSION_ENDED);
  }

  if (!StatusManager.statusStack.includes(STATUS.FIRST_INDUCTION)) {
    await GameController.stopSession();
  }

  // return CommonUtils.renderTherapistAppPage(res, htmlDirectory);
  return CommonUtils.renderLoginPage(res, htmlDirectory);
});

GameRoutes.post("/login", async function(req, res, next) {
  let statusMessage = MESSAGES.ERROR_LOGIN;
  StatusManager.setStatusMessage(statusMessage);

  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    const loginResponse = await ServerUtils.login({ username, password });
    if (loginResponse) {
      statusMessage = MESSAGES.SUCCESSFUL_LOGIN;
      StatusManager.setStatusMessage(statusMessage);
      await IntrospectManager.initialize();
      return CommonUtils.renderTherapistAppPage(res, htmlDirectory);
    }
    return CommonUtils.renderLoginPage(res, htmlDirectory);
  }
  return CommonUtils.renderLoginPage(res, htmlDirectory);
});

GameRoutes.post("/restart-session", async function(req, res, next) {
  const statusMessage = MESSAGES.NEW_LOGIN;
  const socketIOGameClient = socketIO;

  CommonUtils.restartSession();
  StatusManager.setStatusMessage(statusMessage);
  SessionManager.setSessionId("");

  const htmlDirectory1 = path.join(__dirname, "../");

  const file = CommonUtils.generateUniqueId();
  socketIOGameClient.emit(SOCKET.GAME.RESTART_SESSION, "restart");
  SessionManager.setFileName(file);
  const filePath = `${DIR_PATH}${file}.json`;
  const fd = await fs.openSync(filePath, "w");

  return CommonUtils.renderLoginPage(res, htmlDirectory1);
});

export default GameRoutes;
