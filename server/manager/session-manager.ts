/**
 * Stores session related information
 */

import CommonUtils from "../utils/common-utils";

export default class SessionManager {
  /**
   * All variables under the class are public for now
   * TODO: To discuss and see if we need to make any of the variables as private
   */

  public static eegDeviceId;
  public static vrDeviceId;
  public static clinicId;
  public static userId;
  public static sessionId;
  public static patientName;
  public static therapistName;
  public static therapists = [];
  public static patients = [];
  public static fileName;
  public static monitorPipe: any = [];
  public static queueLength: any = [];

  public static setMonitorPipe(val) {
    this.monitorPipe.push(val);
  }

  public static getMonitorPipe() {
    return this.monitorPipe();
  }

  public static setQueueLength(val) {
    this.queueLength.push(val);
  }

  public static getQueueLength() {
    return this.queueLength;
  }

  public static setFileName(fileName) {
    this.fileName = fileName;
  }

  public static getFileName() {
    return this.fileName;
  }

  public static getTherapists() {
    return this.therapists;
  }

  public static setTherapists(therapists) {
    this.therapists = therapists;
  }

  public static getPatients() {
    return this.patients;
  }

  public static setPatients(patients) {
    this.patients = patients;
  }

  /**
   * Fetches sessionId
   * @returns sessionId
   */

  public static getSessionId() {
    return this.sessionId;
  }

  /**
   * Sets sessionId
   * @param sessionId
   */

  public static setSessionId(sessionId) {
    this.sessionId = sessionId;
  }

  /**
   * Fetches eegDeviceId
   * @returns eegDeviceId
   */

  public static getEEGDeviceId() {
    return this.eegDeviceId;
  }

  /**
   * Fetches vrDeviceId
   * @returns vrDeviceId
   */

  public static getVRDeviceId() {
    return this.vrDeviceId;
  }

  /**
   * Fetches clinicId
   * @returns clinicId
   */

  public static getClinicId() {
    return this.clinicId;
  }

  /**
   * Fetches userId
   * @returns userId
   */

  public static getUserId() {
    return this.userId;
  }

  /**
   * Sets userId
   * @param userId
   */

  public static setUserId(userId) {
    this.userId = userId;
  }

  /**
   * Sets clinicId
   * @param clinicId
   */

  public static setClinicId(clinicId) {
    this.clinicId = clinicId;
  }

  /**
   * Sets vrDeviceId
   * @param vrDeviceId
   */

  public static setVRDeviceId(vrDeviceId) {
    this.vrDeviceId = vrDeviceId;
  }

  /**
   * Sets eegDeviceId
   * @param eegDeviceId
   */

  public static setEEGDeviceId(eegDeviceId) {
    this.eegDeviceId = eegDeviceId;
  }

  /**
   * Returns therapistName
   * @returns patientName
   */

  public static getPatientName() {
    return this.patientName;
  }

  /**
   * Sets therapistName
   * @param patientName
   */

  public static setPatientName(patientName) {
    this.patientName = patientName;
  }

  /**
   * Returns therapistName
   * @returns therapistName
   */

  public static getTherapistName() {
    return this.therapistName;
  }

  /**
   * Sets therapistName
   * @param therapistName
   */

  public static setTherapistName(therapistName) {
    this.therapistName = therapistName;
  }
}
