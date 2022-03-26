import { db } from "../db";
import { auth } from "../middleware/auth";
import { ToDoList } from "../models/ToDoList";
import { InsertResponse, ItemAdd, ItemRemove } from "../utils/interfaces";
import { Res, returnCode, todoFailPayload } from "../utils/returnCodes";
const env = require("dotenv").config();

const list = (app: any) => {
  app.get("/list/:id", auth, async function (req: any, res: Res) {
    const { id } = req.user;
    const idRequest = req.params.id;

    if (id == idRequest) {
      const todoList = new ToDoList(idRequest);
      res.status(200).json(await todoList.getTodoList());
    } else {
      res
        .status(returnCode.unauthorized.code)
        .json(returnCode.unauthorized.payload);
    }
  });

  app.post("/list/:id", auth, async function (req: any, res: Res) {
    const { id } = req.user;
    const body: ItemAdd = req.body;
    if (!body.nom || !body.content) {
      res
        .status(returnCode.missingParameters.code)
        .json(returnCode.missingParameters.payload);
    } else if (id == req.params.id) {
      const todo = new ToDoList(req.params.id);
      const addedTodo = await todo.addTodo(body.nom, body.content);
      if (addedTodo === true) {
        res
          .status(returnCode.todo_created.code)
          .json(returnCode.todo_created.payload);
      } else {
        res
          .status(400)
          .json({ title: addedTodo, message: todoFailPayload(addedTodo) });
      }
    } else {
      res
        .status(returnCode.unauthorized.code)
        .json(returnCode.unauthorized.payload);
    }
  });

  app.delete("/list/:id", auth, async function (req: any, res: Res) {
    const { id } = req.user;
    const body: ItemRemove = req.body;
    if (!body.id) {
      res
        .status(returnCode.missingParameters.code)
        .json(returnCode.missingParameters.payload);
    } else if (id == req.params.id) {
      const queryDenpendency: InsertResponse = await db.queryParams(
        "DELETE FROM todoList WHERE fk_item = ?",
        [body.id]
      );
      const query: InsertResponse = await db.queryParams(
        "DELETE FROM item WHERE id = ?",
        [body.id]
      );
      console.log({
        query: query,
        queryDenpendency: queryDenpendency,
        boolean: query.affectedRows > 0 && queryDenpendency.affectedRows > 0,
      });

      if (query.affectedRows == 1 && queryDenpendency.affectedRows == 1) {
        res
          .status(returnCode.todo_removed.code)
          .json(returnCode.todo_removed.payload);
      } else {
        res
          .status(returnCode.todo_not_found.code)
          .json(returnCode.todo_not_found.payload);
      }
    } else {
      res
        .status(returnCode.unauthorized.code)
        .json(returnCode.unauthorized.payload);
    }
  });
};
export default list;
