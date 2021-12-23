import { EmailSendService } from "../models/EmailSenderService";

test("Testing the email server service", () => {
  const essValid = new EmailSendService("jdoe@gmail.com");
  const essInvalid = new EmailSendService("jdoe@gmail");
  expect(essValid.sendReminderEmail()).toBe(true);
  expect(essInvalid.sendReminderEmail()).toBe(false);
});

test("Testing reminder email on non-existing user", () => {
  const essInvalidUserNotExist = new EmailSendService("user@doesnt.exit");
  jest
    .spyOn(essInvalidUserNotExist, "sendReminderEmail")
    .mockImplementation(() => {
      return "user_not_found";
    });
  expect(essInvalidUserNotExist.sendReminderEmail()).toBe("user_not_found");
});
