import ServerUtils from "../utils/server-utils";
import SessionManager from "./session-manager";

export default class IntrospectManager {

  public static async fetchUsers() {
    const patients = [];
    const therapists = [];

    let users: any = await ServerUtils.getUsers();
    users = users.data.data;

    users.map(user => {
      if (user.roles.includes("user")) {
        patients.push(user.firstName);
      }
      if (user.roles.includes("therapist")) {
        therapists.push(user.firstName);
      }
    });

    SessionManager.setTherapists(therapists);
    SessionManager.setPatients(patients);
  }

  public static async initialize() {
    await this.fetchUsers();
  }
  constructor() {
    // Do nothing
  }
}
