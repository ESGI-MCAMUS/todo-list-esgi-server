import { UserInfo } from "os";
import { db } from "../db";
import { isEmailValid, isOldEnough, isPasswordValid } from "../utils/helpers";
import { InsertResponse } from "../utils/interfaces";
const bcrypt = require("bcrypt");

export class User {
  //private id: number;
  public firstname: string;
  public lastname: string;
  public email: string;
  public password: string;
  public birthdate: Date;

  /**
   *
   * Create a User object
   *
   * @param {string} firstname Prénom de l'utilisateur
   * @param {string} lastname  Nom de l'utilisateur
   * @param {string} email Email de l'utilisateur
   * @param {string} password Mot de passe de l'utilisateur
   * @param {Date} birthdate Date de naissance de l'utilisateur
   */
  constructor(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    birthdate: Date
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.birthdate = birthdate;
  }

  /**
   * Returns true if user is valid, otherwise false
   *
   * @returns {boolean}
   */
  isValid = (): boolean => {
    return (
      this.firstname.length > 0 &&
      this.lastname.length !== 0 &&
      isEmailValid(this.email) &&
      isPasswordValid(this.password) &&
      isOldEnough(this.birthdate)
    );
  };

  /**
   * @returns {boolean}
   */
  login = async (): Promise<boolean | User> => {
    const users: User[] | [] = await db.queryParams(
      "SELECT * FROM users WHERE email = ?",
      [this.email]
    );

    const hashedPassword = users.length === 0 ? "" : users[0].password;
    const isPasswordValid = await bcrypt.compare(this.password, hashedPassword);
    return users.length === 0 ? false : isPasswordValid ? users[0] : false;
  };

  /**
   * @returns {Promise<boolean>}
   */
  register = async (): Promise<boolean | InsertResponse> => {
    const alreadyExist: User[] | [] = await db.queryParams(
      "SELECT * FROM users WHERE email = ?",
      [this.email]
    );

    if (alreadyExist.length === 0) {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      const result: boolean = await db
        .queryParams(
          "INSERT INTO users (firstname, lastname, email, password, birthdate, token) VALUES (?, ?, ?, ?, ?, '')",
          [
            this.firstname,
            this.lastname,
            this.email,
            hashedPassword,
            this.birthdate,
          ]
        )
        .catch(() => {
          return false;
        });
      return result;
    } else {
      return false;
    }
  };

  /**
   * GETTERS
   */
  getFirstname = (): string => {
    return this.firstname;
  };
  getLastname = (): string => {
    return this.lastname;
  };
  getEmail = (): string => {
    return this.email;
  };
  getBirthdate = (): Date => {
    return this.birthdate;
  };
}
