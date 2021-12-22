import { EmailSendService } from "../models/EmailSenderService";

test("Testing the email server service", () => {
  const essValid = new EmailSendService("jdoe@gmail.com");
  const essInvalid = new EmailSendService("jdoe@gmail");

  expect(essValid.sendReminderEmail()).toBe(true);
  expect(essInvalid.sendReminderEmail()).toBe(false);
});
