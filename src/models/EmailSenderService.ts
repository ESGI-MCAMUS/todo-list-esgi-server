import { isEmailValid } from "../utils/helpers";

export class EmailSendService {
  private email: string;

  constructor(email: string) {
    this.email = email;
  }

  sendReminderEmail = (): boolean => {
    return isEmailValid(this.email);
  };
}
