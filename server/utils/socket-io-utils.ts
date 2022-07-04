import CommonUtils from "./common-utils";
import {
  MS_100,
  SECS_1,
  SECS_3,
  SET_STATUS,
  SOCKET,
  STATUS
} from "./constants";
import Flow from "./flow";
import GameController from "../controller/game";
import BCIController from "../controller/bci";
import { gameClientSocket, io } from "../server";
import StatusManager from "../manager/status-manager";
import SessionManager from "../manager/session-manager";

/**
 * TODO: Create separate socket rooms for BCI and Game
 */

module.exports = function(socket) {
  /**
   * For BCI App
   */
  socket.on(SOCKET.BCI.START_STREAM, async function(start) {
    await Flow.initialize(SET_STATUS.INCOMING_BCI_APP_START_SESSION);
    while (
      StatusManager.getGameRequestOnStatus() &&
      !StatusManager.statusStack.includes(STATUS.GAME_DATA_RECEIVED)
    ) {
      // Emit data to BCI App
      if (StatusManager.getRAWEEGDataIncomingStatus()) {
        await BCIController.streamAndSaveRawEEG(socket);
      }

      // Compute and Emit connection status to Game
      if (!StatusManager.statusStack.includes(STATUS.SESSION_COMPLETED)) {
        await GameController.checkAndStreamToGame();
        await CommonUtils.delay(SECS_1);
      }
    }
    console.log("--------------Stopped Emitting to Game----------------");
  });

  socket.on(SOCKET.BCI.STOP_STREAM, async function() {
    Flow.initialize(SET_STATUS.INCOMING_BCI_APP_STOP_SESSION);
  });

  /**
   * For Game
   */

  socket.on(SOCKET.GAME.REQUEST_SESSION_START, async function(
    socketClientData
  ) {
    const vrDeviceId = socketClientData
      ? socketClientData.vrDeviceId
      : CommonUtils.getStaticVrDeviceId();
    Flow.initialize(SET_STATUS.INCOMING_GAME_APP_REQUEST_START_SESSION, {
      vrDeviceId
    });
  });

  socket.on(SOCKET.GAME.GET_DEVICE_POSITION_STATUS, async function(
    socketClientData
  ) {
    Flow.initialize(SET_STATUS.INCOMING_GAME_APP_REQUEST_DEVICE_POSITION);
  });

  socket.on(SOCKET.GAME.END_FIRST_INDUCTION, async function() {
    Flow.initialize(SET_STATUS.INCOMING_GAME_APP_FIRST_INDUCTION_END);
  });

  socket.on(SOCKET.GAME.END_LAST_INDUCTION, async function() {
    Flow.initialize(SET_STATUS.INCOMING_GAME_APP_LAST_INDUCTION_END);
  });

  socket.on(SOCKET.GAME.END_GAME, async function(sessionDetails) {
    Flow.initialize(SET_STATUS.INCOMING_GAME_APP_REQUEST_END_GAME);
    sessionDetails = sessionDetails ? JSON.parse(sessionDetails) : null;
    const { sessionID, levelsStorage } = sessionDetails;
    console.log("sessionDetails", sessionDetails);
    await GameController.onEndGameUploadData(sessionID, levelsStorage);
  });

  socket.on(SOCKET.GAME.STOP_SESSION, async function(sessionDetails) {
    console.log("received stop-session");
    console.log("sessionDetails", sessionDetails);

    await Flow.initialize(SET_STATUS.INCOMING_GAME_APP_REQUEST_STOP_SESSION);
    await GameController.stopSession(sessionDetails);
  });
};
