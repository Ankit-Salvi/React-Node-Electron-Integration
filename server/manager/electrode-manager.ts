import CommonUtils from "../utils/common-utils";
import {
  E1_POSITION,
  E2_POSITION,
  E3_POSITION,
  E4_POSITION,
  FOUR_ROWS,
  GAME_STATUS,
  STACK_RANGE,
  STATUS
} from "../utils/constants";
import { IElectrodeManagerStack } from "../utils/interfaces";
import StatusManager from "./status-manager";

/**
 * Handles all electrode related caculations and data
 */

export default class ElectrodeManager {
  /**
   * All variables under the class are public for now
   * TODO: To discuss and see if any of them needs to be set private
   */

  public static rawEEGData;
  public static rawMuseDataForBCI;
  public static electrode1Data = [];
  public static electrode2Data = [];
  public static electrode3Data = [];
  public static electrode4Data = [];
  public static previousDevicePositionStatus = [];
  public static noiseStatus = 0;
  public static connectionStatus = 0;
  public static noiseStatusStack = [];

  /**
   * Fetches formatted rawEEGData from Muse Device
   * @returns rawEEGData
   */

  public static getRAWEEGData() {
    return this.rawEEGData;
  }

  /**
   * Fetches unformatted data from Muse Device
   * @returns rawMuseDataForBCI
   */

  public static getRAWMuseDataForBCI() {
    return this.rawMuseDataForBCI;
  }

  /**
   * Sets unformatted data from Muse Device
   */

  public static setRAWMuseDataForBCI(rawEEGData) {
    this.rawMuseDataForBCI = rawEEGData;
  }

  /**
   * Sets formatted data from Muse Device as rawEEGData
   */

  public static setRAWEEGData(rawEEGData) {
    this.rawEEGData = rawEEGData;
  }

  /**
   * Returns stacked up position of electrode1
   * @returns electrode1Data (Array)
   */

  public static getElectrode1Position(): number[] {
    return this.electrode1Data;
  }

  /**
   * Returns stacked up position of electrode2
   * @returns electrode2Data (Array)
   */

  public static getElectrode2Position(): number[] {
    return this.electrode2Data;
  }

  /**
   * Returns stacked up position of electrode3
   * @returns electrode3Data (Array)
   */

  public static getElectrode3Position(): number[] {
    return this.electrode3Data;
  }

  /**
   * Returns stacked up position of electrode4
   * @returns electrode4Data (Array)
   */

  public static getElectrode4Position(): number[] {
    return this.electrode4Data;
  }

  /**
   * Add to stack for electrode1
   */

  public static addToElectrode1(data): void {
    this.electrode1Data.push(data);
  }

  /**
   * Add to stack for electrode2
   */
  public static addToElectrode2(data): void {
    this.electrode2Data.push(data);
  }

  /**
   * Add to stack for electrode3
   */

  public static addToElectrode3(data): void {
    this.electrode3Data.push(data);
  }

  /**
   * Add to stack for electrode4
   */
  public static addToElectrode4(data): void {
    this.electrode4Data.push(data);
  }

  /**
   * Fetches previousDevicePositionStatus i.e., minus 1 sec data
   * @returns previousDevicePositionStatus
   */

  public static getPreviousDevicePositionStatus() {
    return this.previousDevicePositionStatus;
  }

  /**
   * Sets previousDevicePositionStatus to whatever is the current data
   */

  public static setPreviousDevicePositionStatus(devicePositionStatus) {
    this.previousDevicePositionStatus = devicePositionStatus;
  }

  /**
   * Stacks respective positions of each electrode from the readings
   * @param readings
   * @returns IElectrodeManagerStack - electrode1Data, electrode2Data, electrode3Data, electrode4Data
   */

  public static async pushRawEEGDataToRespectiveElectrodes(
    readings
  ): Promise<IElectrodeManagerStack> {
    for (let e = 0; e <= FOUR_ROWS; e++) {
      const eegData = readings[e];
      if (E1_POSITION.includes(e)) {
        this.addToElectrode1(eegData);
      }
      if (E2_POSITION.includes(e)) {
        this.addToElectrode2(eegData);
      }
      if (E3_POSITION.includes(e)) {
        this.addToElectrode3(eegData);
      }
      if (E4_POSITION.includes(e)) {
        this.addToElectrode4(eegData);
      }
    }

    return {
      electrode1Data: this.electrode1Data,
      electrode2Data: this.electrode2Data,
      electrode3Data: this.electrode3Data,
      electrode4Data: this.electrode4Data,
      previousDevicePositionStatus: this.previousDevicePositionStatus
    };
  }

  /**
   * Empties the electrodeStack
   */

  public static emptyStack(): void {
    this.electrode1Data = CommonUtils.clearArray(this.electrode1Data);
    this.electrode2Data = CommonUtils.clearArray(this.electrode2Data);
    this.electrode3Data = CommonUtils.clearArray(this.electrode3Data);
    this.electrode4Data = CommonUtils.clearArray(this.electrode4Data);
  }

  /**
   * Marks one cycle as complete by
   * - Setting previousDevicePositionStatus
   * - Emptying stack
   */

  public static completeCycle(devicePositionStatus): void {
    if (StatusManager.statusStack.includes(STATUS.SESSION_STARTED)) {
      if (devicePositionStatus) {
        CommonUtils.updateGameStatus(GAME_STATUS.GAME_IN_PROGRESS);
      } else {
        CommonUtils.updateGameStatus(GAME_STATUS.GAME_PAUSED);
      }
    }
  }

  /**
   * Checks if the electrodeStack is full to further process. The stackrange here is a constant
   * @returns true or false
   */

  public static isStackFull(): boolean {
    if (
      this.electrode1Data.length > STACK_RANGE &&
      this.electrode2Data.length > STACK_RANGE &&
      this.electrode3Data.length > STACK_RANGE &&
      this.electrode4Data.length > STACK_RANGE
    ) {
      return true;
    }
    return false;
  }

  public static setNoiseStatus(noiseStatus) {
    this.noiseStatus = noiseStatus;
    if (this.noiseStatusStack.length > 7) {
      this.noiseStatusStack = [];
    }
    this.noiseStatusStack.push(noiseStatus);
  }

  public static getNoiseStatuses() {
    return this.noiseStatusStack;
  }

  public static getNoiseStatus() {
    return this.noiseStatus;
  }

  public static setConnectionStatus(connectionStatus) {
    this.connectionStatus = connectionStatus;
  }

  public static getConnectionStatus() {
    return this.connectionStatus;
  }
}
