import express, { Router } from "express";
import type { Response, Request } from "express";
import type { Todo, CreateTodoDTO } from "./types/todo.js";

const router = Router();
let todos: Todo[] = [];
let nextId = 1;

const app = express();
const PORT = process.env.PORT || 3000 || 5000;
app.use(express.json());
app.use("/", router);

//Get all the todos
router.get("/", (req: Request, res: Response<Todo[]>) => {
  //optional filtering
  const { completed } = req.query;
  let filteredTodos = todos;

  if (completed === "true") {
    filteredTodos = todos.filter((todo) => todo.completed);
  } else if (completed === "false") {
    filteredTodos = todos.filter((todo) => !todo.completed);
  }

  res.json(filteredTodos);
});

//POST todos - create a new todo
router.post("/", (req: Request<{}, {}, CreateTodoDTO>, res: Response) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({
      error: "Title is required",
    });
  }
  const newTodo: Todo = {
    id: nextId++,
    title,
    description: description ?? "", //Use empty string or ensure Todo type allows undefined
    completed: false,
    created: new Date(),
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

//GET todos by id :id Get a sigle todo
router.get("/:id", (req: Request<{ id: string }>, res: Response) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({
      error: "Todo not Found !!",
    });
  }

  res.json(todo);
});

//PUT /Todos/:id - Update the todo
router.put("/:id", (req: Request<{ id: string }>, res: Response) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex((t) => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ error: "Todo not Found !!" });
  }

  const updateTodo = {
    ...todos[todoIndex]!, // Use non-null assertion or local variable
    ...req.body,
    id: todos[todoIndex]?.id, //keep the original id
  };

  todos[todoIndex] = updateTodo;
  res.json(updateTodo);
});

//PATH todos - Toggle completed status
router.patch("/:id/toggle", (req: Request<{ id: string }>, res: Response) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({
      error: "Todo not Found !!",
    });
  }

  todo.completed = !todo.completed;
  res.json(todo);
});

//DELETE a todo
router.delete("/:id", (req: Request<{ id: string }>, res: Response) => {
  const id = parseInt(req.params.id);
  const initalLength = todos.length;

  todos = todos.filter((t) => t.id !== id);

  if (todos.length === initalLength) {
    return res.status(404).json({ error: "Todo not Found !!" });
  }

  res.json({
    message: "Todo Deleted Successfully",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default router;
