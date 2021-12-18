import { db } from "../db";
import { ToDoList } from "../models/ToDoList";
import { ItemAdd } from "../utils/interfaces";
import { Res, returnCode, todoFailPayload } from "../utils/returnCodes";
const env = require("dotenv").config();

const list = (app: any) => {
  app.get("/list/:id", async function (req: any, res: Res) {
    const id = req.params.id;
    const todoList = new ToDoList(id);
    res.status(200).json(await todoList.getTodoList());
  });

  app.post("/list/:id/ajout/", async function (req: any, res: Res) {
    const body: ItemAdd = req.body;
    if (!body.nom || !body.content) {
      res
        .status(returnCode.missingParameters.code)
        .json(returnCode.missingParameters.payload);
    } else {
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
    }
  });
};
export default list;
