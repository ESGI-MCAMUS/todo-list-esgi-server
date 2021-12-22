import {
  is30minBetween,
  isEmailValid,
  isOldEnough,
  isPasswordValid,
} from "../utils/helpers";

test("Testing the email validator function", () => {
  expect(isEmailValid("invalid@email")).toBe(false);
  expect(isEmailValid("valid@email.com")).toBe(true);
});

test("Testing the age validator function", () => {
  const oldEnough = new Date(new Date().getFullYear() - 20, 1, 1);
  const notOldEnough = new Date(new Date().getFullYear() - 10, 1, 1);
  expect(isOldEnough(oldEnough)).toBe(true);
  expect(isOldEnough(notOldEnough)).toBe(false);
});

test("Testing the password checker function", () => {
  const longEnough = "ABCDE12345abcde";
  const tooShort = "AB12ab";
  const tooLong =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz";
  expect(isPasswordValid(tooShort)).toBe(false);
  expect(isPasswordValid(longEnough)).toBe(true);
  expect(isPasswordValid(tooLong)).toBe(false);
});

test("Testing the function that check if there's more than 30min between two dates", () => {
  const currentDate = new Date();
  const lessThan30min = new Date(new Date().getTime() - 1000 * 60 * 25);
  const moreThan30min = new Date(new Date().getTime() - 1000 * 60 * 35);
  expect(is30minBetween(lessThan30min, currentDate)).toBe(false);
  expect(is30minBetween(moreThan30min, currentDate)).toBe(true);
});
