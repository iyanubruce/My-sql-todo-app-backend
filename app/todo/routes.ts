import { Router } from "express";
import {getTodoList, postTodo, getById, setComplete, changeTask, deleteRequest} from "./controller"

export const routes = Router();

routes.get('/todos', getTodoList);

 routes.post('/todos', postTodo);

 routes.get("/todo/:id", getById);

 routes.patch("/todo/:id", setComplete);

 routes.put("/todo/:id", changeTask);

 routes.delete("/todo/:id", deleteRequest);