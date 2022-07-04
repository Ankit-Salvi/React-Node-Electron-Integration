"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SOCKET = exports.MESSAGES = exports.SET_STATUS = exports.FOUR_ROWS = exports.ELECTRODE = exports.STATUS = exports.GAME_STATUS = exports.STACK_RANGE = exports.ELECTRODES = exports.DISCONNECTED = exports.CONNECTED = exports.STANDARD_DEVIATION_RANGE = exports.ELECTRODE_VOLT_MAX_RANGE = exports.ELECTRODE_VOLT_MIN_RANGE = exports.E4_POSITION = exports.E3_POSITION = exports.E2_POSITION = exports.E1_POSITION = exports.COMMANDS = exports.VR_BUNDLE_PATH = exports.DIR_PATH_SESSION = exports.DIR_PATH = exports.INTROSPECT_USERS = exports.INTROSPECT_LOGIN = exports.INTROSPECT = exports.SAVE_SESSION = exports.CREATE_SESSION = exports.SERVER_MANAGEMENT_DOMAIN = exports.PATH = exports.BASE_DIR = exports.VR_DEVICE_ID = exports.CLINIC_ID = exports.USER_ID = exports.MS_100 = exports.SECS_8 = exports.SECS_1 = exports.SECS_2 = exports.SECS_5 = exports.SECS_3 = exports.PORT = void 0;
exports.PORT = 3001;
exports.SECS_3 = 3000;
exports.SECS_5 = 5000;
exports.SECS_2 = 2000;
exports.SECS_1 = 1000;
exports.SECS_8 = 8000;
exports.MS_100 = exports.SECS_1 / 10; // Harcoded deviceId

exports.USER_ID = "USER-12345";
exports.CLINIC_ID = "CLINIC-12345";
exports.VR_DEVICE_ID = "VR-12345"; // Directories

exports.BASE_DIR = "/Users/Shared/Psyber";
exports.PATH = {
  SESSION: exports.BASE_DIR + "SessionData/",
  RAWEEGDATA: exports.BASE_DIR + "RawEEGData/",
  LOGS: exports.BASE_DIR + "Logs/"
};
exports.SERVER_MANAGEMENT_DOMAIN = process.env.APP_ENV === "prod" ? "https://avance-care-api.nevrmind.io/api/v1/" : "https://avance-care-api.nevrmind.io/api/v1/";
exports.CREATE_SESSION = "create-session";
exports.SAVE_SESSION = "save-session";
exports.INTROSPECT = "https://api.stage.redpathstudy.com/";
exports.INTROSPECT_LOGIN = "auth/login";
exports.INTROSPECT_USERS = "admin/users";
exports.DIR_PATH = "/Users/Shared/Psyber/RawEEGData/";
exports.DIR_PATH_SESSION = "/Users/Shared/Psyber/SessionData";
exports.VR_BUNDLE_PATH = "C:\\Psyber\\VR_Meditation_Bundle"; // Commands

exports.COMMANDS = {
  START_BCI_APP: "start BCI_App.exe"
}; // Electrode stack

exports.E1_POSITION = [0, 4, 8, 12, 16];
exports.E2_POSITION = [1, 5, 9, 13, 17];
exports.E3_POSITION = [2, 6, 10, 14, 18];
exports.E4_POSITION = [3, 4, 11, 15, 19];
exports.ELECTRODE_VOLT_MIN_RANGE = 650;
exports.ELECTRODE_VOLT_MAX_RANGE = 1300;
exports.STANDARD_DEVIATION_RANGE = 150;
exports.CONNECTED = 1;
exports.DISCONNECTED = 0;
exports.ELECTRODES = ["AF7", "AF8", "TP9", "TP10"];
exports.STACK_RANGE = 10;
exports.GAME_STATUS = {
  GAME_ENDED: "GAME_ENDED",
  GAME_IN_PROGRESS: "GAME_IN_PROGRESS",
  GAME_PAUSED: "GAME_PAUSED"
};
exports.STATUS = {
  NO_DEVICE_CONNECTED: "No device connected",
  ALL_APPLICATION_STARTED: "All application started",
  EEG_DEVICE_CONNECTED: "EEG device connected",
  VR_GAME_OPENED: "VR game opened",
  SESSION_STARTED: "Session started",
  FIRST_INDUCTION: "First Induction ended",
  SESSION_ENDED: "Session ended",
  LAST_INDUCTION: "Last Induction ended",
  GAME_DATA_RECEIVED: "Game data received",
  CLOUD_SYNC_COMPLETED: "Cloud sync completed",
  SESSION_COMPLETED: "Session completed",
  FORCE_STOPPED: "Force stopped"
};
exports.ELECTRODE = {
  E1: "e1",
  E2: "e2",
  E3: "e3",
  E4: "e4"
};
exports.FOUR_ROWS = 20;
exports.SET_STATUS = {
  INCOMING_EEG_DATA_CONNECTED: "INCOMING_EEG_DATA_CONNECTED",
  INCOMING_EEG_DATA_DISCONNECTED: "INCOMING_EEG_DATA_DISCONNECTED",
  INCOMING_BCI_APP_START_SESSION: "INCOMING_BCI_APP_START_SESSION",
  INCOMING_BCI_APP_STOP_SESSION: "INCOMING_BCI_APP_STOP_SESSION",
  INCOMING_GAME_APP_REQUEST_START_SESSION: "INCOMING_GAME_APP_REQUEST_START_SESSION",
  INCOMING_GAME_APP_FIRST_INDUCTION_END: "INCOMING_GAME_APP_FIRST_INDUCTION_END",
  INCOMING_GAME_APP_LAST_INDUCTION_END: "INCOMING_GAME_APP_LAST_INDUCTION_END",
  INCOMING_GAME_APP_REQUEST_DEVICE_POSITION: "INCOMING_GAME_APP_REQUEST_DEVICE_POSITION",
  INCOMING_GAME_APP_REQUEST_END_GAME: "INCOMING_GAME_APP_REQUEST_END_GAME",
  INCOMING_GAME_APP_REQUEST_STOP_SESSION: "INCOMING_GAME_APP_REQUEST_STOP_SESSION",
  SESSION_STARTED: "SESSION_STARTED"
};
/**
 * TODO: Move it to en file
 */

exports.MESSAGES = {
  ERROR_CREATING_SESSION: "Error creating session. Make sure all values are set",
  SESSION_START_SUCCESS: "Session started successfully",
  ERROR_STOPPING_SESSION: "Error stopping session. Either session is not successfully started or the session is already stopped",
  SESSION_STOP_SUCCESS: "Session stopped successfully",
  ERROR_LOGIN: "Invalid login. Please verify username and password",
  SUCCESSFUL_LOGIN: "",
  NEW_LOGIN: ""
};
/** Socket names */

exports.SOCKET = {
  BCI: {
    START_STREAM: "start_stream",
    STOP_STREAM: "stop_stream",
    DATA: "data"
  },
  GAME: {
    REQUEST_SESSION_START: "request-session-start",
    START_SESSION: "start-session",
    GET_DEVICE_POSITION_STATUS: "get-device-position-status",
    DEVICE_POSITION_STATUS: "device-position-status",
    STOP_SESSION: "stop-session",
    STOP_SESSION_STATUS: "stop-session-status",
    FORCE_STOP_SESSION: "force-stop-session",
    END_FIRST_INDUCTION: "end-first-induction",
    END_LAST_INDUCTION: "end-last-induction",
    END_GAME: "end-game",
    RESTART_SESSION: "restart-session"
  }
};