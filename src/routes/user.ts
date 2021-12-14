import { db } from "../db";
import { User } from "../models/User";
import { UserLogin, UserRegister } from "../utils/interfaces";
import { Res, returnCode } from "../utils/returnCodes";
const env = require("dotenv").config();

export const user = (app: any) => {
  app.post("/user/login", async function (req: any, res: Res) {
    const body: UserLogin = req.body;
    if (!body.email || !body.password) {
      res
        .status(returnCode.missingParameters.code)
        .json(returnCode.missingParameters.payload);
    } else {
      const user = new User("", "", body.email, body.password, new Date());
      const isLoggedIn = await user.login();
      if (!isLoggedIn) {
        res
          .status(returnCode.unknownUser.code)
          .json(returnCode.unknownUser.payload);
      } else if (typeof isLoggedIn !== "boolean") {
        res.status(200).json(isLoggedIn);
      }
    }
  });

  app.post("/user/register", async function (req: any, res: Res) {
    const body: UserRegister = req.body;

    if (
      !body.firstname ||
      !body.lastname ||
      !body.email ||
      !body.password ||
      !body.birthdate
    ) {
      res
        .status(returnCode.missingParameters.code)
        .json(returnCode.missingParameters.payload);
    } else {
      const user = new User(
        body.firstname,
        body.lastname,
        body.email,
        body.password,
        new Date(Date.parse(body.birthdate))
      );
      if (!user.isValid()) {
        res
          .status(returnCode.invalid_user.code)
          .json(returnCode.invalid_user.payload);
      } else {
        const hasRegistered = await user.register();
        if (!hasRegistered) {
          res
            .status(returnCode.user_exist.code)
            .json(returnCode.user_exist.payload);
        } else {
          res
            .status(returnCode.user_created.code)
            .json(returnCode.user_created.payload);
        }
      }
    }
  });
};
