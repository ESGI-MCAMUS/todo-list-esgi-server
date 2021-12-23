import { User } from "../models/User";

const validUser = new User(
  "John",
  "Doe",
  "jdoe@email.com",
  "ABCDE12345abcde",
  new Date(2000, 1, 1)
);

const userInvalidEmail = new User(
  "John",
  "Doe",
  "jdoe@email",
  "ABCDE12345abcde",
  new Date(2000, 1, 1)
);

const userTooYoung = new User(
  "John",
  "Doe",
  "jdoe@email.com ",
  "ABCDE12345abcde",
  new Date(new Date().getFullYear() - 10, 1, 1)
);

const userInvalidPassword = new User(
  "John",
  "Doe",
  "jdoe@email.com",
  "AB12ab",
  new Date(2000, 1, 1)
);

test("Testing the integrity of `isValid` function for a given user", () => {
  expect(validUser.isValid()).toBe(true);
  expect(userInvalidEmail.isValid()).toBe(false);
  expect(userTooYoung.isValid()).toBe(false);
  expect(userInvalidPassword.isValid()).toBe(false);
});
