"use strict";
/**
 * Stores session related information
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var SessionManager =
/** @class */
function () {
  function SessionManager() {}

  SessionManager.setMonitorPipe = function (val) {
    this.monitorPipe.push(val);
  };

  SessionManager.getMonitorPipe = function () {
    return this.monitorPipe();
  };

  SessionManager.setQueueLength = function (val) {
    this.queueLength.push(val);
  };

  SessionManager.getQueueLength = function () {
    return this.queueLength;
  };

  SessionManager.setFileName = function (fileName) {
    this.fileName = fileName;
  };

  SessionManager.getFileName = function () {
    return this.fileName;
  };

  SessionManager.getTherapists = function () {
    return this.therapists;
  };

  SessionManager.setTherapists = function (therapists) {
    this.therapists = therapists;
  };

  SessionManager.getPatients = function () {
    return this.patients;
  };

  SessionManager.setPatients = function (patients) {
    this.patients = patients;
  };
  /**
   * Fetches sessionId
   * @returns sessionId
   */


  SessionManager.getSessionId = function () {
    return this.sessionId;
  };
  /**
   * Sets sessionId
   * @param sessionId
   */


  SessionManager.setSessionId = function (sessionId) {
    this.sessionId = sessionId;
  };
  /**
   * Fetches eegDeviceId
   * @returns eegDeviceId
   */


  SessionManager.getEEGDeviceId = function () {
    return this.eegDeviceId;
  };
  /**
   * Fetches vrDeviceId
   * @returns vrDeviceId
   */


  SessionManager.getVRDeviceId = function () {
    return this.vrDeviceId;
  };
  /**
   * Fetches clinicId
   * @returns clinicId
   */


  SessionManager.getClinicId = function () {
    return this.clinicId;
  };
  /**
   * Fetches userId
   * @returns userId
   */


  SessionManager.getUserId = function () {
    return this.userId;
  };
  /**
   * Sets userId
   * @param userId
   */


  SessionManager.setUserId = function (userId) {
    this.userId = userId;
  };
  /**
   * Sets clinicId
   * @param clinicId
   */


  SessionManager.setClinicId = function (clinicId) {
    this.clinicId = clinicId;
  };
  /**
   * Sets vrDeviceId
   * @param vrDeviceId
   */


  SessionManager.setVRDeviceId = function (vrDeviceId) {
    this.vrDeviceId = vrDeviceId;
  };
  /**
   * Sets eegDeviceId
   * @param eegDeviceId
   */


  SessionManager.setEEGDeviceId = function (eegDeviceId) {
    this.eegDeviceId = eegDeviceId;
  };
  /**
   * Returns therapistName
   * @returns patientName
   */


  SessionManager.getPatientName = function () {
    return this.patientName;
  };
  /**
   * Sets therapistName
   * @param patientName
   */


  SessionManager.setPatientName = function (patientName) {
    this.patientName = patientName;
  };
  /**
   * Returns therapistName
   * @returns therapistName
   */


  SessionManager.getTherapistName = function () {
    return this.therapistName;
  };
  /**
   * Sets therapistName
   * @param therapistName
   */


  SessionManager.setTherapistName = function (therapistName) {
    this.therapistName = therapistName;
  };

  SessionManager.therapists = [];
  SessionManager.patients = [];
  SessionManager.monitorPipe = [];
  SessionManager.queueLength = [];
  return SessionManager;
}();

exports["default"] = SessionManager;