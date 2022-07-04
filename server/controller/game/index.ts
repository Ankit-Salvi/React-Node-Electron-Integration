import GameUtils from "../../utils/game-utils";
import CommonUtils from "../../utils/common-utils";
import fs from "fs";
import {
  DIR_PATH_SESSION,
  MESSAGES,
  SECS_2,
  SECS_5,
  SET_STATUS,
  SOCKET,
  STATUS
} from "../../utils/constants";
import ServerUtils from "../../utils/server-utils";
import StatusManager from "../../manager/status-manager";
import { gameClientSocket, socketIO } from "../../server";
import ElectrodeManager from "../../manager/electrode-manager";
import SessionManager from "../../manager/session-manager";
import Flow from "../../utils/flow";

export default class GameController {
  /**
   *
   * @param socketClient
   * @param streamRunning
   * @param { eegDeviceId, rawEEGData }
   */

  public static async checkAndStreamToGame() {
    if (
      StatusManager.getStreamRunningStatus() &&
      StatusManager.getRAWEEGDataIncomingStatus()
    ) {
      StatusManager.setStatus(STATUS.ALL_APPLICATION_STARTED);
    }

    // check and generate sessionId
    if (socketIO) {
      const sessionId = await SessionManager.getSessionId();
      const rawEEGData = await ElectrodeManager.getRAWEEGData();
      // if (sessionId) {
      await GameController.generateDevicePositionStatus({
        sessionId,
        rawEEGData
      });
      // }
      // TODO: Handle and throw error if sessionID is not generated properly
    }
  }

  /**
   *
   * @param socket
   * @param data
   */

  public static async generateDevicePositionStatus(data) {
    const { rawEEGData } = data;
    let readings = rawEEGData;
    let emitToGame = [0, 0];
    readings = await CommonUtils.formatRAWEEGData(readings);
    const {
      noiseStatus,
      connectionStatus
    } = await GameUtils.computeDevicePositionStatus(readings);
    const combinedConnectionStatus = [connectionStatus, noiseStatus];
    StatusManager.setConnectionStatus(combinedConnectionStatus);
    if (StatusManager.getGameRequestOnStatus()) {
      emitToGame = combinedConnectionStatus;
    }
    if (!StatusManager.getRAWEEGDataIncomingStatus()) {
      // send 0,0 to game if eeg is disconnected
      emitToGame = [0, 0];
    }
    socketIO.emit(SOCKET.GAME.DEVICE_POSITION_STATUS, emitToGame);
  }

  /**
   * Reads sessionData from game and saves it in local
   * Upload to AWS S3 by invoking save-session API
   * @param gameData
   */

  public static async onEndGameUploadData(gameSessionId, gameData) {
    const sessionId = await SessionManager.getSessionId();
    if (sessionId === gameSessionId) {
      if (!fs.existsSync(DIR_PATH_SESSION)) {
        fs.mkdirSync(DIR_PATH_SESSION, { recursive: true });
      }
      const file = `${DIR_PATH_SESSION}_${sessionId}_gameData.json`;
      await fs.openSync(file, "w");
      await fs.appendFile(file, JSON.stringify(gameData), function(err) {
        // if (err) throw err;
      });

      const s3UploadStatus = await ServerUtils.uploadToS3(file, "GameData");
      console.log("s3UploadStatus", s3UploadStatus);
      // const sessionDataFile = `${DIR_PATH_SESSION}${sessionId}_gameData.json`;
      // await fs.unlink(`${sessionDataFile}`, function() {
      //   // file deleted
      //   console.log("session data file is deleted");
      // });
      StatusManager.setStatus(STATUS.CLOUD_SYNC_COMPLETED);

      if (StatusManager.statusStack.includes(STATUS.FORCE_STOPPED)) {
        await Flow.initialize(
          SET_STATUS.INCOMING_GAME_APP_REQUEST_STOP_SESSION
        );
        await GameController.stopSession();
      }
    }
  }
  /**
   * Reads sessionData from game and saves it in local
   * Upload to AWS S3 by invoking save-session API
   * TODO: Purge the local data
   * TODO: Compress the rawEEGData thats saved
   * @param gameData
   */

  public static async stopSession(sessionDetails?) {
    // Compress the RAWEEG file
    const sessionId = await SessionManager.getSessionId();
    if (sessionId) {
      await StatusManager.setStatus(STATUS.SESSION_ENDED);
      await CommonUtils.delay(SECS_5);
      await CommonUtils.compressSaveAndDeleteRawEEG(sessionId);
    }

    // call saveSession with data
    if (sessionDetails) {
      sessionDetails = sessionDetails ? JSON.parse(sessionDetails) : null;
      const { sessionID, levelsStorage } = sessionDetails;
      await GameController.onEndGameUploadData(sessionID, levelsStorage);
    }

    gameClientSocket.emit(SOCKET.GAME.STOP_SESSION_STATUS, "success");
    StatusManager.setStatus(STATUS.SESSION_COMPLETED);
    StatusManager.setStatusMessage(MESSAGES.SESSION_STOP_SUCCESS);

    // TODO: Handle and throw error if sessionID is not generated properly
  }
}
