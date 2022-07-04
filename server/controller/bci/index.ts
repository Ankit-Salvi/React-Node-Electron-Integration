import ElectrodeManager from "../../manager/electrode-manager";
import StatusManager from "../../manager/status-manager";
import { SOCKET } from "../../utils/constants";

export default class BCIController {
  public static async streamAndSaveRawEEG(socket) {
    const rawMuseDataForBCI = ElectrodeManager.getRAWMuseDataForBCI();
    if (StatusManager.getGameRequestOnStatus()) {
      socket.emit(SOCKET.BCI.DATA, rawMuseDataForBCI);
    }
  }
}
