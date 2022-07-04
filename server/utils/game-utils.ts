import ElectrodeManager from "../manager/electrode-manager";
import CommonUtils from "./common-utils";
import { STANDARD_DEVIATION_RANGE } from "./constants";

export default class GameUtils {
  public static getStandardDeviationForChannels(ch1, ch2) {
    const standardDeviationResultofCh1 = CommonUtils.standardDeviation(ch1);
    const channel1StandardDeviation = standardDeviationResultofCh1;

    const standardDeviationResultofCh2 = CommonUtils.standardDeviation(ch2);
    const channel2StandardDeviation = standardDeviationResultofCh2;
    return {
      channel1StandardDeviation,
      channel2StandardDeviation
    };
  }

  /**
   * Derives noise status from EEG Device based on standardDeviation
   * @param channel1StandardDeviation
   * @param channel2StandardDeviation
   * @param currentNoiseStatus
   * @param currentConnectionStatus
   * @returns
   */

  public static async determineAndSetNoiseStatus(
    channel1StandardDeviation,
    channel2StandardDeviation,
    currentNoiseStatus,
    currentConnectionStatus
  ) {
    switch (currentConnectionStatus) {
      case 0:
        currentNoiseStatus =
          channel1StandardDeviation <= STANDARD_DEVIATION_RANGE &&
          channel2StandardDeviation <= STANDARD_DEVIATION_RANGE
            ? 1
            : 0;
        break;
      case 1:
        currentNoiseStatus =
          channel1StandardDeviation <= STANDARD_DEVIATION_RANGE &&
          channel2StandardDeviation <= STANDARD_DEVIATION_RANGE
            ? 1
            : 0;
        break;
      default:
        break;
    }

    ElectrodeManager.setNoiseStatus(currentNoiseStatus);
    return currentNoiseStatus;
  }

  public static deriveChannelValues(readings) {
    const { AF7, AF8, TP9, TP10 } = readings;
    const ch1 = CommonUtils.computeChannelValue(AF7, TP9);
    const ch2 = CommonUtils.computeChannelValue(AF8, TP10);
    return {
      ch1,
      ch2
    };
  }

  public static async computeDevicePositionStatus(readings) {
    const { ch1, ch2 } = this.deriveChannelValues(readings);

    const {
      channel1StandardDeviation,
      channel2StandardDeviation
    } = await this.getStandardDeviationForChannels(ch1, ch2);

    // Fetch status from electrode manager
    const connectionStatus = ElectrodeManager.getConnectionStatus();
    let noiseStatus = ElectrodeManager.getNoiseStatus();
    const noiseStatues = ElectrodeManager.getNoiseStatuses();

    // Determine Noise status
    noiseStatus = await this.determineAndSetNoiseStatus(
      channel1StandardDeviation,
      channel2StandardDeviation,
      noiseStatus,
      connectionStatus
    );

    // Read last 5 Noise status
    const extractedLast5NoiseValues = CommonUtils.extractLastNSecValue(
      noiseStatues,
      5
    );

    if (CommonUtils.isAllValueTrue(extractedLast5NoiseValues)) {
      ElectrodeManager.setConnectionStatus(1);
    } else {
      ElectrodeManager.setConnectionStatus(0);
    }

    await ElectrodeManager.completeCycle(
      ElectrodeManager.getConnectionStatus()
    );

    return {
      noiseStatus: ElectrodeManager.getNoiseStatus(),
      connectionStatus: ElectrodeManager.getConnectionStatus()
    };
  }
}
