import { db } from "../db";
import { ItemAdd } from "../utils/interfaces";
import { Res, returnCode } from "../utils/returnCodes";
const env = require("dotenv").config();

export const list = (app: any) => {
  app.get("/list/:id", async function (req: any, res: Res) {
    const list = await db.queryParams(
      "SELECT item.id, item.name, item.content, item.created_at from todoList tdl left join item on tdl.fk_item = item.id where fk_user = ?",
      [req.params.id]
    );
    res.status(200).json(list);
  });

  app.post("/list/:id/ajout/", async function (req: any, res: Res) {
    const body: ItemAdd = req.body;
    if (!body.nom || !body.content) {
      res
        .status(returnCode.missingParameters.code)
        .json(returnCode.missingParameters.payload);
    } else {
      res.status(200).json({ status: "ok" });
    }
  });
};
