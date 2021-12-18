/**
 * Function that verify if email is valid
 *
 * @param {string} email
 *
 * @returns {boolean}
 */
export const isEmailValid = (email: string): boolean => {
  const regEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regEx.test(email);
};

/**
 * Function that check if user is oldser than 13 years old
 *
 * @param {Date} birthday
 *
 * @returns {boolean}
 */
export const isOldEnough = (birthday: Date): boolean => {
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthday.getFullYear();
  return age >= 13;
};

/**
 * Check if password is between 8 and 40 characters
 *
 * @param {string} password
 *
 * @returns {boolean}
 */
export const isPasswordValid = (password: string): boolean => {
  return password.length >= 8 && password.length <= 40;
};

/**
 * Function that check if there is more than 30min between two dates
 *
 * @param {Date} date1 Date of the last note
 * @param {Date} date2 Date of the future note
 *
 * @returns {boolean}
 */
export const is30minBetween = (date1: Date, date2: Date): boolean => {
  const diff = Math.abs(date1.getTime() - date2.getTime());
  const diffMinutes = Math.ceil(diff / (1000 * 60));

  return diffMinutes > 30;
};
