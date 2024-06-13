import express from "express"
const todoRouter =  express.Router();
import TodoController from "../controllers/todoController.js";
import verifyUser from "../middlewares/verifyUser.js";
import { createTodoRules, updateDetailsRules, updateTodoRules } from "../middlewares/validator.js";
import { validateResult } from "../middlewares/validationResults.js";

//private routes

todoRouter.get("/", verifyUser, TodoController.getTodos);

todoRouter.get("/:id", verifyUser, TodoController.getTodo);

todoRouter.post("/create", verifyUser,createTodoRules,validateResult, TodoController.createTodo);

todoRouter.put("/update/:id", verifyUser, updateTodoRules, validateResult, TodoController.updateTodo);

todoRouter.get("/delete/:id", verifyUser, TodoController.deleteTodo);

export default todoRouter;