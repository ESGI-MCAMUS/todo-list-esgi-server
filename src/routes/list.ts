import { db } from "../db";
import { auth } from "../middleware/auth";
import { ToDoList } from "../models/ToDoList";
import { ItemAdd } from "../utils/interfaces";
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

  app.post("/list/:id/ajout/", auth, async function (req: any, res: Res) {
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
};
export default list;
