import GameController from "../controller/game";
import StatusManager from "../manager/status-manager";
import ElectrodeManager from "../manager/electrode-manager";
import { gameClientSocket } from "../server";
import CommonUtils from "./common-utils";
import { DIR_PATH, SECS_1, SECS_3, SET_STATUS, STATUS } from "./constants";
import Flow from "./flow";
import SessionManager from "../manager/session-manager";
import fs from "fs";

/**
 * Runs in PORT 1111
 * Connects with muse client - cpp app
 * Performs analysis on live EEG data and emits impedence check to game client
 */

export default class TCPSocketUtils {
  public static async createServer(net) {
    net
      .createServer(socket => {
        socket.on("data", async data => {
          CommonUtils.pushToQueue(1);
          const extractedData: any = CommonUtils.extractEEGDataFromSocket(data);
          // do not write to file if session is ended
          if (!StatusManager.statusStack.includes(STATUS.SESSION_ENDED)) {
            await Flow.initialize(SET_STATUS.INCOMING_EEG_DATA_CONNECTED, {
              extractedData
            });

            /**
             * Keep streaming device-position status to game if game if opened before BCI App
             */

            if (
              !StatusManager.getIGameStarted() &&
              StatusManager.getGameRequestOnStatus()
            ) {
              await GameController.checkAndStreamToGame();
              await CommonUtils.delay(SECS_1);
            } else {
              const rawEEGData = ElectrodeManager.getRAWEEGData();
              if (rawEEGData && !StatusManager.getIGameStarted()) {
                await GameController.generateDevicePositionStatus({
                  rawEEGData
                });
              }
            }
          }
        });

        socket.on("end", () => {
          CommonUtils.pushToQueue(0);
          Flow.initialize(SET_STATUS.INCOMING_EEG_DATA_DISCONNECTED);
        });
      })
      .listen(1111, () => {
        console.log("Socket server for text started on port 1111");
      });
  }
}
