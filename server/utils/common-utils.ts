import {
  USER_ID,
  CLINIC_ID,
  VR_DEVICE_ID,
  DIR_PATH,
  STATUS,
  GAME_STATUS,
  ELECTRODES,
  DIR_PATH_SESSION,
  VR_BUNDLE_PATH,
  COMMANDS,
  SECS_2
} from "./constants";
import ServerUtils from "./server-utils";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { isSessionStarted } from "../routes/game-routes";
import StatusManager from "../manager/status-manager";
import math from "math-standard-deviation";
import SessionManager from "../manager/session-manager";
import zlib from "zlib";
const spawn = require("child_process").spawn;
export let socketConnectionQueuePipe = [];

export default class CommonUtils {
  public static determineAndSetMonitorPipe() {
    const pipeLength = socketConnectionQueuePipe.length;
    const last3SecsValues = this.extractLastNSecValue(
      SessionManager.getQueueLength(),
      3
    );

    if (
      this.isAllValueSame(last3SecsValues) &&
      last3SecsValues[0] === pipeLength
    ) {
      SessionManager.setMonitorPipe(1);
    } else {
      SessionManager.monitorPipe = [];
    }
  }

  public static startBCIApp() {
    process.chdir(VR_BUNDLE_PATH);
    spawn(COMMANDS.START_BCI_APP, {
      shell: true
    });
  }

  public static isAllValueTrue(array) {
    let result = false;
    if (array.length > 0) {
      const checkValue = array[0];
      if (checkValue === 1) {
        result = array.every(function(e) {
          return e === checkValue;
        });
      }
    }
    return result;
  }

  public static isAllValueSame(array) {
    let result = false;
    if (array.length > 0) {
      const checkValue = array[0];
      // if (checkValue === 1) {
      result = array.every(function(e) {
        return e === checkValue;
      });
      // }
    }
    return result;
  }

  public static computeChannelValue(ch1, ch2) {
    return ch2.map(function(el, i) {
      return Math.abs(el - ch1[i]);
    });
  }

  /**
   * Compress rawEEGFile to .gz
   * Delete the compressed file
   * Delete the sessionData file
   * @param sessionId
   * @returns none
   */

  public static async compressSaveAndDeleteRawEEG(sessionId) {
    console.log("Trying to compress");
    const rawEEGfile = `${DIR_PATH}${sessionId}`;
    const zip = zlib.createGzip();
    const read = await fs.createReadStream(`${rawEEGfile}.json`);
    const write = await fs.createWriteStream(`${rawEEGfile}.json.gz`);

    read.pipe(zip).pipe(write);
    console.log("Zipped Successfully");

    const s3UploadStatus = await ServerUtils.uploadToS3(
      `${rawEEGfile}.json`,
      "RawEEGData"
    );

    // console.log("s3UploadStatus for rawEEGData", s3UploadStatus);

    // close the file
    if (s3UploadStatus) {
      const fileDescriptor = await fs.openSync(`${rawEEGfile}.json`, "r");
      await fs.close(fileDescriptor, err => {
        if (err) {
          console.error("Failed to close file", err);
        } else {
          console.log("\n> File Closed successfully");
        }
      });

      await fs.unlinkSync(`${rawEEGfile}.json`);
      await fs.unlinkSync(`${rawEEGfile}.json.gz`);
    }
  }

  /**
   * Split by \n
   * Split by ,
   * Assign it to each electrode
   * Return the chunk and add it to array
   * @param rawEEGData
   * @returns formattedData
   * [
   *  {
   *   timestamp: <string>
   *   AF7: [int],
   *   AF8: [int],
   *   TP9: [int],
   *   TP10: [int]
   *  },
   * ]
   */

  public static async formatRAWEEGData(rawEEGData) {
    rawEEGData = rawEEGData ? rawEEGData.trim() : "";
    rawEEGData = rawEEGData.substring(0, rawEEGData.lastIndexOf("\n") + 1);
    const electrodeData = {
      timestamp: new Date().getTime(),
      TP9: [],
      AF7: [],
      AF8: [],
      TP10: []
    };
    const splittedDataBySpace = rawEEGData.split("\n");
    for (const databySpace of splittedDataBySpace) {
      // each row data
      const splittedDataByComma = databySpace.split(",");
      for (const i in splittedDataByComma) {
        if (splittedDataByComma[i]) {
          const data = splittedDataByComma[i];
          const key = ELECTRODES[i];
          electrodeData[key].push(data);
        }
      }
    }
    return electrodeData;
  }

  /**
   *
   * Remove empty spaces
   * Remove null values
   * Read JSON file in utf8 format and push eegData to it
   * @param rawEEGData
   * @returns
   */

  public static async formatData(rawEEGData, sessionId) {
    try {
      const data = await fs.readFileSync(
        `${DIR_PATH}${sessionId}.json`,
        "utf8"
      );
      if (data !== undefined && data !== null) {
        let json = data ? JSON.parse(data.toString()) : null;

        rawEEGData = await this.formatRAWEEGData(rawEEGData);

        const dataToWrite = rawEEGData;

        if (json === {} || json === null || json === undefined || json === "") {
          json = [dataToWrite];
        } else {
          json.push(dataToWrite);
        }
        return json;
      }
      return false;
    } catch (err) {
      // Do nothing
      console.log("caught error", err);
      return false;
    }
  }

  /**
   *
   * @param arr
   * @returns standard deviation of an array
   */

  public static standardDeviation = arr => {
    // Find Mean
    const standardDeviationResult = math.standardDeviation(arr);
    return standardDeviationResult;
  };

  /**
   * Returns ms of delay
   * @param ms
   * @returns
   */

  public static delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  /**
   * Generates uniqueId
   * @returns uuid4
   */

  public static generateUniqueId() {
    const uuid4 = uuidv4();
    return uuid4;
  }
  /**
   * Takes input of an array and extracts last n sec value
   * @param arr
   * @param n
   * @returns
   */

  public static extractLastNSecValue(arr, n) {
    return arr.slice(Math.max(arr.length - n, 0));
  }

  /**
   * Extracts EEGData from socket
   * @param rawEEGData
   * @returns
   */

  public static extractEEGDataFromSocket(data) {
    let rawEEGData =
      data !== null ? (data !== undefined ? data.toString() : null) : null;
    const rawMuseDataForBCI = rawEEGData;
    let eegDeviceId;

    const eegDeviceIdRow = rawEEGData.split(":end");
    const extractedDeviceId = eegDeviceIdRow[0].split("muse-deviceId:");

    if (extractedDeviceId[1]) {
      if (extractedDeviceId[1].indexOf("\x00") === -1) {
        eegDeviceId = extractedDeviceId[1];
      }
    }

    rawEEGData = eegDeviceIdRow[1];

    if (eegDeviceId && rawEEGData) {
      eegDeviceId = eegDeviceId;
      this.setElectrodeStatus(STATUS.EEG_DEVICE_CONNECTED);
    }

    return {
      rawMuseDataForBCI,
      eegDeviceId,
      rawEEGData
    };
  }

  public static pushAndRemoveSpecificElementsInArray(
    elementToInclude,
    elementsToRemove,
    array
  ) {
    const forDeletion = elementsToRemove;
    array = array.filter(item => !forDeletion.includes(item));
    if (elementToInclude && elementToInclude !== "") {
      array.push(elementToInclude);
    }
    return array;
  }

  /**
   * Returns static data
   * @returns const string
   */

  public static getStaticUserId() {
    return USER_ID;
  }

  public static getStaticClinicId() {
    return CLINIC_ID;
  }

  public static getStaticVrDeviceId() {
    return VR_DEVICE_ID;
  }

  /**
   * Get SessionId
   * Check if sessionId is already present, if not generate
   * @param param0
   * @returns sessionId
   */

  public static async getSessionId() {
    try {
      let sessionId = SessionManager.getSessionId();
      const file = SessionManager.getFileName();
      const filePath = `${DIR_PATH}${file}.json`;

      if (fs.existsSync(filePath) && (!sessionId || sessionId !== "")) {
        const vrDeviceId = SessionManager.getVRDeviceId();
        const eegDeviceId = SessionManager.getEEGDeviceId();
        const userId = SessionManager.getUserId();
        const clinicId = CommonUtils.getStaticClinicId();
        const patientId = SessionManager.getPatientName();
        const therapistId = SessionManager.getTherapistName();

        // file exists
        if (userId && eegDeviceId) {
          sessionId = await ServerUtils.generateSessionId({
            userId,
            clinicId,
            eegDeviceId,
            vrDeviceId,
            therapistId,
            patientId
          });
          const newFilePath = `${DIR_PATH}${sessionId}.json`;
          await fs.rename(filePath, newFilePath, async function(err) {
            if (err) {
              throw err;
            }
            await fs.openSync(newFilePath, "w");
            return sessionId;
          });
        }
      }
      // TODO: Handle and throw error if sessionID is not generated properly
      return sessionId;
    } catch (err) {
      // do nothing
      console.error(err);
    }
  }

  public static updateGameStatus(statusUpdate) {
    // Update game status only when its not terminated
    if (!StatusManager.getStatus().includes(GAME_STATUS.GAME_ENDED)) {
      const statusToUpdate = Object.values(GAME_STATUS).find(
        status => status === statusUpdate
      );
      const statuses = CommonUtils.pushAndRemoveSpecificElementsInArray(
        statusToUpdate,
        Object.values(GAME_STATUS),
        StatusManager.getStatus()
      );
      StatusManager.statusStack = statuses;
    }
  }

  public static checkIfDataWithinRange(data, { min, max }) {
    return data.every(e => e >= min && e <= max);
  }

  public static allEqual(array) {
    return array.every(v => v === array[0]);
  }

  public static clearArray(array) {
    while (array.length) {
      array.pop();
    }
    return array;
  }

  public static setElectrodeStatus(status) {
    StatusManager.setStatus(status);
  }

  public static pushToQueue(status) {
    socketConnectionQueuePipe.push(status);
    if (socketConnectionQueuePipe.length > 100) {
      socketConnectionQueuePipe.length = 0;
    }
  }

  public static async writeRawEEGToFile(extractedData) {
    const getSessionStatus = await StatusManager.getStatus();
    if (
      isSessionStarted &&
      !getSessionStatus.includes(STATUS.SESSION_ENDED) &&
      !getSessionStatus.includes(STATUS.SESSION_COMPLETED)
    ) {
      SessionManager.setEEGDeviceId(extractedData.eegDeviceId);
      const sessionId = await CommonUtils.getSessionId();
      // TODO: Handle and throw error if sessionID is not generated properly
      const data = await this.formatData(extractedData.rawEEGData, sessionId);
      if (data) {
        await fs.writeFileSync(
          `${DIR_PATH}${sessionId}.json`,
          JSON.stringify(data)
        );
      }
    }
  }

  /**
   * Retrieves last 7 rows from EEGData
   * @param readings
   * @returns
   */

  public static addToStackIfNotPresent(array, newItem) {
    if (array.indexOf(newItem) === -1) {
      array.push(newItem);
    }
    return array;
  }

  public static restartSession() {
    const statues = [];
    Object.values(STATUS).forEach(item => {
      if (item === STATUS.ALL_APPLICATION_STARTED) {
        statues.push(item);
      }
    });
    console.log("statues to restart", statues);
    StatusManager.statusStack = statues;
    return statues;
  }

  public static getValues() {
    return {
      eegDeviceId: SessionManager.getEEGDeviceId(),
      vrDeviceId: SessionManager.getVRDeviceId(),
      therapistName: SessionManager.getTherapistName(),
      therapists: SessionManager.getTherapists(),
      patients: SessionManager.getPatients(),
      patientName: SessionManager.getPatientName(),
      statusMessage: StatusManager.getStatusMessage(),
      statusStack: StatusManager.getStatus(),
      connectionStatus: StatusManager.getConnectionStatus()
    };
  }

  public static renderLoginPage(res, htmlDirectory) {
    return res.render(htmlDirectory + "/index.html", this.getValues());
  }

  public static renderTherapistAppPage(res, htmlDirectory) {
    return res.render(
      htmlDirectory + "/views/therapist-app.ejs",
      this.getValues()
    );
  }

  /**
   * Compares if two object are equal
   * @param value
   * @param other
   * @returns boolean
   */

  public static isEqual(value, other) {
    // Get the value type
    const type = Object.prototype.toString.call(value);

    // If the two objects are not the same type, return false
    if (type !== Object.prototype.toString.call(other)) {
      return false;
    }

    // If items are not an object or array, return false
    if (["[object Array]", "[object Object]"].indexOf(type) < 0) {
      return false;
    }

    // Compare the length of the length of the two items
    const valueLen =
      type === "[object Array]" ? value.length : Object.keys(value).length;
    const otherLen =
      type === "[object Array]" ? other.length : Object.keys(other).length;
    if (valueLen !== otherLen) {
      return false;
    }

    // Compare two items
    const compare = function(item1, item2) {
      // Get the object type
      const itemType = Object.prototype.toString.call(item1);

      // If an object or array, compare recursively
      if (["[object Array]", "[object Object]"].indexOf(itemType) >= 0) {
        if (!this.isEqual(item1, item2)) {
          return false;
        }
      }

      // Otherwise, do a simple comparison
      else {
        // If the two items are not the same type, return false
        if (itemType !== Object.prototype.toString.call(item2)) {
          return false;
        }

        // Else if it's a function, convert to a string and compare
        // Otherwise, just compare
        if (itemType === "[object Function]") {
          if (item1.toString() !== item2.toString()) {
            return false;
          }
        } else {
          if (item1 !== item2) {
            return false;
          }
        }
      }
    };

    // Compare properties
    if (type === "[object Array]") {
      for (let i = 0; i < valueLen; i++) {
        if (compare(value[i], other[i]) === false) {
          return false;
        }
      }
    } else {
      for (const key in value) {
        if (value.hasOwnProperty(key)) {
          if (compare(value[key], other[key]) === false) {
            return false;
          }
        }
      }
    }

    // If nothing failed, return true
    return true;
  }
}
