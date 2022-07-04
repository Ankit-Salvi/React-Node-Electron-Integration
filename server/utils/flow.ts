import ElectrodeManager from "../manager/electrode-manager";
import SessionManager from "../manager/session-manager";
import StatusManager from "../manager/status-manager";
import CommonUtils from "./common-utils";
import { GAME_STATUS, SET_STATUS, STATUS } from "./constants";

export default class Flow {
  public static async initialize(status, extraData?) {
    switch (status) {
      case SET_STATUS.INCOMING_EEG_DATA_CONNECTED:
        // This is for logging purpose. Can be removed later
        if (!StatusManager.getRAWEEGDataIncomingStatus()) {
          console.log("EEG is connected", new Date());
        }
        StatusManager.setRAWEEGDataIncomingStatus(true);
        ElectrodeManager.setRAWMuseDataForBCI(
          extraData.extractedData.rawMuseDataForBCI
        );
        ElectrodeManager.setRAWEEGData(extraData.extractedData.rawEEGData);
        SessionManager.setEEGDeviceId(extraData.extractedData.eegDeviceId);
        await CommonUtils.writeRawEEGToFile(extraData.extractedData);
        break;

      case SET_STATUS.INCOMING_EEG_DATA_DISCONNECTED:
        // StatusManager.setRAWEEGDataIncomingStatus(false);
        break;

      case SET_STATUS.INCOMING_BCI_APP_START_SESSION:
        StatusManager.setStreamRunningStatus(true);
        StatusManager.setIsGameStarted(true);
        break;

      case SET_STATUS.INCOMING_BCI_APP_STOP_SESSION:
        StatusManager.setStreamRunningStatus(false);
        StatusManager.setIsGameStarted(false);
        break;

      case SET_STATUS.INCOMING_GAME_APP_REQUEST_START_SESSION:
        SessionManager.setVRDeviceId(extraData.vrDeviceId);
        CommonUtils.setElectrodeStatus(STATUS.VR_GAME_OPENED);
        break;

      case SET_STATUS.INCOMING_GAME_APP_REQUEST_DEVICE_POSITION:
        StatusManager.setGameRequestOnStatus(true);
        break;

      case SET_STATUS.INCOMING_GAME_APP_REQUEST_STOP_SESSION:
        StatusManager.setStreamRunningStatus(false);
        StatusManager.setGameRequestOnStatus(false);
        StatusManager.setIsGameStarted(false);
        break;

      case SET_STATUS.SESSION_STARTED:
        CommonUtils.setElectrodeStatus(STATUS.SESSION_STARTED);
        break;

      case SET_STATUS.INCOMING_GAME_APP_FIRST_INDUCTION_END:
        StatusManager.setStatus(STATUS.FIRST_INDUCTION);
        break;

      case SET_STATUS.INCOMING_GAME_APP_LAST_INDUCTION_END:
        StatusManager.setStatus(STATUS.LAST_INDUCTION);
        StatusManager.setStatus(STATUS.SESSION_ENDED);
        break;

      case SET_STATUS.INCOMING_GAME_APP_REQUEST_END_GAME:
        StatusManager.setStatus(GAME_STATUS.GAME_ENDED);
        CommonUtils.setElectrodeStatus(STATUS.GAME_DATA_RECEIVED);
        break;

      default:
        console.log("Does not match any status");
        break;
    }
  }
}
