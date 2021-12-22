import { isEmailValid } from "../utils/helpers";

export class EmailSendService {
  private email: string;

  constructor(email: string) {
    this.email = email;
  }

  /**
   * Function that send an email to the user when he has only 2 todos left on his account
   *
   * @returns boolean
   */
  sendReminderEmail = (): boolean => {
    if (isEmailValid(this.email)) {
      console.log(
        `Hey ${this.email}! You already have 8 todos! Only 2 remaining!`
      );
      return true;
    } else {
      console.log("The email could not be sent!");
      return false;
    }
  };
}
