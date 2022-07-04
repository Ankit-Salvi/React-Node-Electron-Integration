import axios from "axios";
import SessionManager from "../manager/session-manager";
import {
  CREATE_SESSION,
  DIR_PATH,
  INTROSPECT,
  INTROSPECT_LOGIN,
  INTROSPECT_USERS,
  SAVE_SESSION,
  SERVER_MANAGEMENT_DOMAIN,
  STATUS
} from "./constants";
const fs = require("fs");
const FormData = require("form-data");
const concat = require("concat-stream");
import cron from "node-cron";
import CommonUtils, { socketConnectionQueuePipe } from "./common-utils";
import StatusManager from "../manager/status-manager";

export default class ServerUtils {
  public static async getUsers() {
    return axios
      .get(INTROSPECT + INTROSPECT_USERS, {
        params: {
          page: 1,
          limit: 20
        },
        headers: {
          Authorization: "Bearer " + process.env.ACCESS_TOKEN
        }
      })
      .then(async function(response) {
        return response;
      });
  }

  public static async login({ username, password }) {
    return axios
      .post(INTROSPECT + INTROSPECT_LOGIN, {
        username,
        password
      })
      .then(async function(response) {
        if (response) {
          const accessToken = response.data ? response.data.access_token : null;
          if (accessToken) {
            process.env.ACCESS_TOKEN = accessToken;
          } else {
            return false;
          }
          return true;
        }
        return false;
      })
      .catch(error => {
        console.log(error);
        return false;
      });
  }

  public static async generateSessionId(sessionDataRequest) {
    const {
      userId,
      eegDeviceId,
      vrDeviceId,
      clinicId,
      patientId,
      therapistId
    } = sessionDataRequest;

    return axios
      .post(SERVER_MANAGEMENT_DOMAIN + CREATE_SESSION, {
        userId,
        eegDeviceId,
        vrDeviceId,
        clinicId,
        patientId,
        therapistId
      })
      .then(async function(response) {
        console.log(response);
        const sessionId = response.data ? response.data.sessionId : null;
        if (sessionId) {
          console.log("generated sessionId--------", sessionId);
          if (sessionId !== null && sessionId !== undefined) {
            SessionManager.setSessionId(sessionId);
          }
          return sessionId;
        }
        return false;
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  public static determineEEGDisconnect() {
    if (StatusManager.getRAWEEGDataIncomingStatus()) {
      console.log("eeg disconnected", new Date());
      SessionManager.setEEGDeviceId("");
      const states = CommonUtils.pushAndRemoveSpecificElementsInArray(
        "",
        [STATUS.EEG_DEVICE_CONNECTED],
        StatusManager.statusStack
      );
      StatusManager.setConnectionStatus([0, 0]);
      StatusManager.setRAWEEGDataIncomingStatus(false);
      StatusManager.statusStack = states;
    }
  }

  public static determineIfAllApplicationsAreStarted() {
    if (!StatusManager.getRAWEEGDataIncomingStatus()) {
      if (StatusManager.statusStack.includes(STATUS.ALL_APPLICATION_STARTED)) {
        const states = CommonUtils.pushAndRemoveSpecificElementsInArray(
          "",
          [STATUS.ALL_APPLICATION_STARTED],
          StatusManager.getStatus()
        );
        StatusManager.statusStack = states;
      }
    }
    if (
      StatusManager.connectCounter > 1 &&
      StatusManager.getRAWEEGDataIncomingStatus()
    ) {
      StatusManager.setStatus(STATUS.ALL_APPLICATION_STARTED);
    }
    SessionManager.setQueueLength(socketConnectionQueuePipe.length);
  }

  public static async runCron() {
    cron.schedule("*/1 * * * * *", () => {
      CommonUtils.determineAndSetMonitorPipe();
      this.determineIfAllApplicationsAreStarted();

      if (SessionManager.monitorPipe.length > 3) {
        this.determineEEGDisconnect();
      }
    });
  }

  public static async uploadToS3(path, folderName) {
    const formData = new FormData();
    formData.append("session-data", await fs.createReadStream(path));
    formData.append("folderName", folderName);

    try {
      return formData.pipe(
        concat(async data => {
          return axios
            .request({
              method: "POST",
              url: SERVER_MANAGEMENT_DOMAIN + SAVE_SESSION,
              data,
              maxContentLength: Infinity,
              maxBodyLength: Infinity,
              headers: formData.getHeaders()
              // headers: {'Content-Type': 'multipart/form-data;boundary=' + formData.getBoundary()}
            })
            .then(async function(response) {
              // console.log("session save response", response);
              const Location = response.data
                ? response.data.savedSession
                  ? response.data.savedSession.Location
                  : null
                : null;
              console.log("response.data", response.data);
              if (Location) {
                return { Location };
              }
              return Location;
            })
            .catch(function(error) {
              console.log("error is--->", error, error.stack);
              return error;
            });
        })
      );
    } catch (err) {
      console.log("error executing the play", err);
    }
  }
}
