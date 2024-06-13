import  dotenv from "dotenv";
dotenv.config();
import express from "express";
const app =  express();
import connectDb from "./config/connectDb.js"
import userRouter from "./routes/userRoute.js";
import todoRouter from "./routes/todoRoute.js";

app.use(express.urlencoded({extended : true})); // makes the URL encoded form data available in the req.body as javascript body
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/todo", todoRouter);

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;
connectDb(DB_URL);

app.listen(PORT, () => {
    console.log(`The server is listening at port ${PORT}`);
})