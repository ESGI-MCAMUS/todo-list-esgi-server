import { db } from "../db";
import { User } from "../models/User";
import { UserLogin, UserRegister } from "../utils/interfaces";
import { generateToken } from "../utils/jwt";
import { Res, returnCode } from "../utils/returnCodes";
const env = require("dotenv").config();

const user = (app: any) => {
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
        const token = generateToken({
          // @ts-ignore
          id: isLoggedIn.id,
          firstname: isLoggedIn.firstname,
          lastname: isLoggedIn.lastname,
          email: isLoggedIn.email,
          birthdate: isLoggedIn.birthdate,
        });
        // @ts-ignore
        isLoggedIn.token = token;

        //Update user token
        await db.queryParams("UPDATE users SET token = ? WHERE id = ?", [
          token,
          // @ts-ignore
          isLoggedIn.id,
        ]);
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
        if (typeof hasRegistered === "boolean" && !hasRegistered) {
          res
            .status(returnCode.user_exist.code)
            .json(returnCode.user_exist.payload);
        } else {
          const token = generateToken({
            // @ts-ignore
            id: hasRegistered.insertId,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            birthdate: user.birthdate,
          });

          //Update user token
          await db.queryParams("UPDATE users SET token = ? WHERE id = ?", [
            token,
            // @ts-ignore
            hasRegistered.insertId,
          ]);
          res
            .status(returnCode.user_created.code)
            .json(returnCode.user_created.payload);
        }
      }
    }
  });
};

export default user;
