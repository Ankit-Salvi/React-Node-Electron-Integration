import { STATUS } from "../utils/constants";
import CommonUtils from "../utils/common-utils";

export default class StatusManager {
  /**
   * All variables under the class are public for now
   * TODO: To discuss and see if we need to make any of the variables as private
   */

  public static status = STATUS.NO_DEVICE_CONNECTED;
  public static statusStack = [];
  public static streamRunning = false;
  public static isRequestFromGameOn = false;
  public static isRAWEEGDataIncoming = false;
  public static isGameStarted = false;
  public static statusMessage = "";
  public static connectCounter = 0;
  public static connectionStatus = [];

  public static getConnectionStatus() {
    return this.connectionStatus;
  }

  public static setConnectionStatus(connectionStatus) {
    this.connectionStatus = connectionStatus;
  }

  public static getStatusMessage() {
    return this.statusMessage;
  }

  public static setStatusMessage(statusMessage) {
    this.statusMessage = statusMessage;
  }

  public static getIGameStarted() {
    return this.isGameStarted;
  }

  public static setIsGameStarted(status) {
    this.isGameStarted = status;
  }

  public static getStreamRunningStatus() {
    return this.streamRunning;
  }

  public static getGameRequestOnStatus() {
    return this.isRequestFromGameOn;
  }

  public static getRAWEEGDataIncomingStatus() {
    return this.isRAWEEGDataIncoming;
  }

  public static setRAWEEGDataIncomingStatus(status) {
    this.isRAWEEGDataIncoming = status;
  }

  public static setGameRequestOnStatus(status) {
    this.isRequestFromGameOn = status;
  }

  public static setStreamRunningStatus(status) {
    this.streamRunning = status;
  }

  public static getStatus() {
    return this.statusStack;
  }

  public static setStatus(status) {
    this.status = status;
    this.statusStack = CommonUtils.addToStackIfNotPresent(
      this.statusStack,
      status
    );
  }
}
