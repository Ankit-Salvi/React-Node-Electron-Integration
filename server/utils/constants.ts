export const PORT = 3001;
export const SECS_3 = 3000;
export const SECS_5 = 5000;
export const SECS_2 = 2000;
export const SECS_1 = 1000;
export const SECS_8 = 8000;
export const MS_100 = SECS_1 / 10;

// Harcoded deviceId
export const USER_ID = "USER-12345";
export const CLINIC_ID = "CLINIC-12345";
export const VR_DEVICE_ID = "VR-12345";

// Directories
export const BASE_DIR = "/Users/Shared/Psyber";

export const PATH = {
  SESSION: BASE_DIR + "SessionData/",
  RAWEEGDATA: BASE_DIR + "RawEEGData/",
  LOGS: BASE_DIR + "Logs/"
};

export const SERVER_MANAGEMENT_DOMAIN =
  process.env.APP_ENV === "prod"
    ? "https://avance-care-api.nevrmind.io/api/v1/"
    : "https://avance-care-api.nevrmind.io/api/v1/";
export const CREATE_SESSION = "create-session";
export const SAVE_SESSION = "save-session";
export const INTROSPECT = "https://api.stage.redpathstudy.com/";
export const INTROSPECT_LOGIN = "auth/login";
export const INTROSPECT_USERS = "admin/users";
export const DIR_PATH = "/Users/Shared/Psyber/RawEEGData/";
export const DIR_PATH_SESSION = "/Users/Shared/Psyber/SessionData";
export const VR_BUNDLE_PATH = "C:\\Psyber\\VR_Meditation_Bundle";

// Commands
export const COMMANDS = {
  START_BCI_APP: "start BCI_App.exe"
};

// Electrode stack
export const E1_POSITION = [0, 4, 8, 12, 16];
export const E2_POSITION = [1, 5, 9, 13, 17];
export const E3_POSITION = [2, 6, 10, 14, 18];
export const E4_POSITION = [3, 4, 11, 15, 19];

export const ELECTRODE_VOLT_MIN_RANGE = 650;
export const ELECTRODE_VOLT_MAX_RANGE = 1300;
export const STANDARD_DEVIATION_RANGE = 150;

export const CONNECTED = 1;
export const DISCONNECTED = 0;

export const ELECTRODES = ["AF7", "AF8", "TP9", "TP10"];

export const STACK_RANGE = 10;

export const GAME_STATUS = {
  GAME_ENDED: "GAME_ENDED",
  GAME_IN_PROGRESS: "GAME_IN_PROGRESS",
  GAME_PAUSED: "GAME_PAUSED"
};

export const STATUS = {
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

export const ELECTRODE = {
  E1: "e1",
  E2: "e2",
  E3: "e3",
  E4: "e4"
};

export const FOUR_ROWS = 20;

export const SET_STATUS = {
  INCOMING_EEG_DATA_CONNECTED: "INCOMING_EEG_DATA_CONNECTED",
  INCOMING_EEG_DATA_DISCONNECTED: "INCOMING_EEG_DATA_DISCONNECTED",
  INCOMING_BCI_APP_START_SESSION: "INCOMING_BCI_APP_START_SESSION",
  INCOMING_BCI_APP_STOP_SESSION: "INCOMING_BCI_APP_STOP_SESSION",
  INCOMING_GAME_APP_REQUEST_START_SESSION:
    "INCOMING_GAME_APP_REQUEST_START_SESSION",
  INCOMING_GAME_APP_FIRST_INDUCTION_END:
    "INCOMING_GAME_APP_FIRST_INDUCTION_END",
  INCOMING_GAME_APP_LAST_INDUCTION_END: "INCOMING_GAME_APP_LAST_INDUCTION_END",
  INCOMING_GAME_APP_REQUEST_DEVICE_POSITION:
    "INCOMING_GAME_APP_REQUEST_DEVICE_POSITION",
  INCOMING_GAME_APP_REQUEST_END_GAME: "INCOMING_GAME_APP_REQUEST_END_GAME",
  INCOMING_GAME_APP_REQUEST_STOP_SESSION:
    "INCOMING_GAME_APP_REQUEST_STOP_SESSION",
  SESSION_STARTED: "SESSION_STARTED"
};

/**
 * TODO: Move it to en file
 */

export const MESSAGES = {
  ERROR_CREATING_SESSION:
    "Error creating session. Make sure all values are set",
  SESSION_START_SUCCESS: "Session started successfully",
  ERROR_STOPPING_SESSION:
    "Error stopping session. Either session is not successfully started or the session is already stopped",
  SESSION_STOP_SUCCESS: "Session stopped successfully",
  ERROR_LOGIN: "Invalid login. Please verify username and password",
  SUCCESSFUL_LOGIN: "",
  NEW_LOGIN: ""
};

/** Socket names */
export const SOCKET = {
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
