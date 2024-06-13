import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Todo from "../models/todoModel.js";


 class TodoController { 
    static getTodo = async (res, req) => {
     const {id} = req.params;
     try {
        const todo = await Todo.findById(id);
        if(todo) {
            if(todo.user.toString() ==  req.user) {
                return res.json({
                    "msg" : "todo found",
                    "todo" : todo
                })
            } else { 
                return res.json({
                    "msg" : "Unauthorized"
                })
            }
        } else { 
            return res.json({
                "msg" : "No todo found"
            })
        }
     } catch (error) {
        return res.json({
            "msg" : "Internal Server Error"
        })
     }   
    }
    
    static getTodos = async (res, req) => {
        try {
            const todo = await Todo.find({
                user : req.user
            })
            return res.json({
                "msg" : "Todo found",
                "todos"  : todo
            })
        } catch (error) {
            return res.json({
                "msg" : "Internal Server Error"
            })
        }
    }

    static createTodo = async (res, req) => {
        const {title, description} = req.body;
        try {
            const todo = await Todo.create({
                title : title, 
                description : description,
                completed : false, 
                user : user.req
            })
        } catch (error) {
            return res.json({
                "msg" : "Internal Server Error"
            })
        }
    }

    static updateTodo = async(res, req) => {
        const {title, description, completed} = req.body;
        const {id} = req.params;
        try {
            const todo = await Todo.findById(id);
            if(todo){
                if(todo.user.toString() ==  req.user) {
                    todo.title =  title;
                    todo.description = description;
                    todo.completed = completed
                    try {
                        await todo.save();
                        return res.json({
                            "msg" : "Todo updated successfully"
                        })
                    } catch (error) {
                        return res.json({
                            "msg" : "Internal server error"
                        })
                    }
                } else  {
                    return res.json({
                        "msg" : "Unauthorized"
                    })
                }
            } else  {
                return res.json({
                    "msg" : "No such todo exists"
                })
            }
        } catch (error) {
            return res.json({
                "msg" : "Internal server error"
            })
        }
    }

    static deleteTodo = async(res, req) => {
        const {id} = req.params;
        try {
            const todo = await Todo.findById(id);
            if(todo) {
                if(todo.user.toString() == req.user) { 
                    await todo.remove();
                    return res.json({
                        "msg" : "todo deleted successfully"
                    })
                } else {
                    return res.json({
                        "msg" : "Unauthorized"
                    })
                }
            } else {
                return res.json({
                    "msg" : "No such todo exists"
                })
            }
        } catch (error) {
            return res.json({
                "msg" : "Internal server error"
            })
        }
    }
 }

 export default TodoController