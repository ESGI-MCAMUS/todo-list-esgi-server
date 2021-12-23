import { ToDoList } from "../models/ToDoList";
import { is30minBetween } from "../utils/helpers";
import { Todo } from "../utils/interfaces";

const oneHundredTwentyFourCharsString =
  "k7SVYUMwjcLzipYePno2UhyvndbY6nKbZHQwjLBDxVk8DSmGKYLIA4wD1vr4Uy3KDv8TxhXfHQrnRk3mGAZonURDb9hL6gX2Cq3kC0RFaASqBB632vEHCOKwgJvhLjPownsYlycc4n1o6EPWasg5vNhjR5aMVgmxtvgsLpoC0ccKNDrf2bywDFcm4bncLiwESSS3M3r1XjQL8I8Q2LbXSAbbWjc3GHaJR9s17yQT22ivOBb3utRLDVFpJET63zzDB2PzYYmjxaWwF2uhp6qIteuKDHHUyMENoknShE6v29DklkHeMWMUW9q3tzOmaLb7ITe6D1ygXbbgD8jna5m0rK6Lzo9pczKBiRzcRei2idZzsk7TvyiYunwxSaVViORuPkaP1QgUwXu1QTdOjoTykaBwySnEnJfv41JnsjeRZMS8lWjrEV3LV4xmnLG7v7qE4eafoAxiyVGkR0ViIDM9JsUiSWxDiPEk9Cf9BLg6ANkkC52u8OmwVxXXsGjtPNMrxoUPRwEuJNNpU18jEGDg1fq9h5spUCJJnptgLYioRx5q3N8u65UncmYpIxdFvN4fjvk8lOUCOcDRBYmxkDuTwfobygqKX7snJEMVpQNmPUyFRR6FKrNTIrurNAweta7xKMWlXKskVmkh77Hhns6JQ2VsVgnWi2JpYC8Zwgl6eaGq1Eg2prSSVStKuUFuLjrLi403BkfSx80hI0rhwmEn2TbP3S1eiJJZ7v3IzfUiitlim9vMYZTRnPEdZQq29wWge8Z8lPQJiYly6fwaofUE9Ch8FO6ORjiPJV2T7UsrnVFVrhE5PuKl6FUsZ7u8YSs7k27SyvWkuhEBvD6NCoDmVSnb90sHyhlWheNJj7graU4gDxnEKmjhDzJYZwYvihK2NfcnuHffN9T5FJXaXNOnxhqpMPsplqEXyGWkSZgwm4GCWtcocsxX7oLcl6e9mP6fJSqHA8WzHScpBvicdPmop1puq9eGKyOkSligPZjGnTzGJjBTSUjmSLvROzLCjcpb";
const noTodos: Todo[] = [];
const oneTodoNow: Todo[] = [
  {
    id: 1,
    name: "todo1",
    content: "todo1 content",
    created_at: new Date(),
  },
];
const oneTodo35min: Todo[] = [
  {
    id: 1,
    name: "todo1",
    content: "todo1 content",
    created_at: new Date(new Date().getTime() - 35 * 60 * 1000),
  },
];

const tenTodos = [
  {
    id: 1,
    name: "todo1",
    content: "todo1 content",
    created_at: new Date(new Date().getTime() - 0 * 60 * 1000),
  },
  {
    id: 2,
    name: "todo2",
    content: "todo2 content",
    created_at: new Date(new Date().getTime() - 30 * 60 * 1000),
  },
  {
    id: 3,
    name: "todo3",
    content: "todo3 content",
    created_at: new Date(new Date().getTime() - 60 * 60 * 1000),
  },
  {
    id: 4,
    name: "todo4",
    content: "todo4 content",
    created_at: new Date(new Date().getTime() - 90 * 60 * 1000),
  },
  {
    id: 5,
    name: "todo5",
    content: "todo5 content",
    created_at: new Date(new Date().getTime() - 120 * 60 * 1000),
  },
  {
    id: 6,
    name: "todo6",
    content: "todo6 content",
    created_at: new Date(new Date().getTime() - 150 * 60 * 1000),
  },
  {
    id: 7,
    name: "todo7",
    content: "todo7 content",
    created_at: new Date(new Date().getTime() - 180 * 60 * 1000),
  },
  {
    id: 8,
    name: "todo8",
    content: "todo8 content",
    created_at: new Date(new Date().getTime() - 210 * 60 * 1000),
  },
  {
    id: 9,
    name: "todo9",
    content: "todo9 content",
    created_at: new Date(new Date().getTime() - 240 * 60 * 1000),
  },
  {
    id: 10,
    name: "todo10",
    content: "todo10 content",
    created_at: new Date(new Date().getTime() - 270 * 60 * 1000),
  },
];

test("Test adding a todo", async () => {
  const oneTodo = new ToDoList(1, oneTodo35min);
  const result = await oneTodo.addTodo("todo2", "todo2 content");
  expect(result).toBe(true);
});

test("Adding todo that is more than 1000 chars", async () => {
  const oneTodo = new ToDoList(1, oneTodo35min);
  const result = await oneTodo.addTodo(
    "todo2",
    oneHundredTwentyFourCharsString
  );
  expect(result).toBe("over_1000_chars");
});

test("Adding a todo with the same name", async () => {
  const oneTodo = new ToDoList(1, oneTodo35min);
  const result = await oneTodo.addTodo("todo1", "Todos having the same title");
  expect(result).toBe("already_exist");
});

test("Adding todo before the 30min delay", async () => {
  const oneTodoTooEarly = new ToDoList(1, oneTodoNow);
  const result = await oneTodoTooEarly.addTodo("todo2", "todo2 content");
  expect(result).toBe("too_early");
});

test("Adding the 11th todo", async () => {
  const tenTodosObject = new ToDoList(1, tenTodos);
  const result = await tenTodosObject.addTodo(
    "todo11",
    "Oops I think this todo shouldn't be added, let's see"
  );
  expect(result).toBe("max_reached");
});
