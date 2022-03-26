import { db } from "../db";
import { is30minBetween } from "../utils/helpers";
import { Todo } from "../utils/interfaces";
import { EmailSendService } from "./EmailSenderService";

export class ToDoList {
  public todos: Todo[];
  public userId: number;

  /**
   *
   * @param {number} userId Identifiant de l'utilisateur
   */
  constructor(userId: number, todos?: Todo[]) {
    this.userId = userId;
    todos ? (this.todos = todos) : (this.todos = []);
  }

  /**
   * Function that return the todo list of the user
   *
   * @returns {Todo[]}
   */
  getTodoList = async (): Promise<Todo[]> => {
    const todos: Todo[] = await db.queryParams(
      "SELECT item.id, item.name, item.content, item.created_at from todoList tdl left join item on tdl.fk_item = item.id where fk_user = ?",
      [this.userId]
    );
    this.todos = todos;
    return this.todos;
  };

  /**
   * Function that add a todo to the list
   *
   * @param {string} name Name of the todo
   * @param {string} content Content of the todo
   *
   * @returns {true | "too_early" | "max_reached" | "over_1000_chars" | "already_exist"}
   */

  addTodo = async (
    name: string,
    content: string
  ): Promise<
    true | "too_early" | "max_reached" | "over_1000_chars" | "already_exist"
  > => {
    // Checking if the content is over 1000 characters
    if (content.length > 1000) {
      return "over_1000_chars";
    }

    // Getting the todo from the database if the `todos` field isn't already filled
    if (this.todos.length === 0) {
      try {
        const todos: Todo[] = await db.queryParams(
          "SELECT item.id, item.name, item.content, item.created_at from todoList tdl left join item on tdl.fk_item = item.id where fk_user = ?",
          [this.userId]
        );
        this.todos = todos;
      } catch (error) {
        console.log("DATABASE ERROR: ", error);
      }
    }

    // Checking if the user has todos, if not, insert the todo
    if (this.todos.length === 0) {
      const insertedTodo = await db.queryParams(
        "INSERT INTO item (name, content) VALUES (?, ?)",
        [name, content]
      );
      const insertedBindingTable = await db.queryParams(
        "INSERT INTO todoList (fk_user, fk_item) VALUES (?, ?)",
        [this.userId, insertedTodo.insertId]
      );

      return true;
    } else {
      // Checking if the user has reached the max todos
      if (this.todos.length >= 10) {
        return "max_reached";
      }

      // Checking if the user has todos in the last 30 minutes
      const currentDate = new Date();
      const lastTodoDate = this.todos[this.todos.length - 1].created_at;

      if (!is30minBetween(new Date(lastTodoDate), currentDate)) {
        return "too_early";
      }

      // Checking if the todo already exist
      const todoAlreadyExist = this.todos.find((todo) => todo.name === name);
      if (todoAlreadyExist) {
        return "already_exist";
      }

      // Checking if the user has 8 todos. If so, send an email to the user
      if (this.todos.length === 8) {
        const user = await db.queryParams(
          "SELECT email from user where id = ?",
          [this.userId]
        );
        const emailSendService = new EmailSendService(user[0].email);
        emailSendService.sendReminderEmail();
      }

      try {
        // Inserting the todo
        const insertedTodo = await db.queryParams(
          "INSERT INTO item (name, content) VALUES (?, ?)",
          [name, content]
        );
        const insertedBindingTable = await db.queryParams(
          "INSERT INTO todoList (fk_user, fk_item) VALUES (?, ?)",
          [this.userId, insertedTodo.insertId]
        );
      } catch (error) {
        console.log("DATABASE ERROR => ", error);
      }

      return true;
    }
  };
}
