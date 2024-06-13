import express from "express";
const userRouter = express.Router();
import UserController from "../controllers/userControllers.js";
import verifyUser from "../middlewares/verifyUser.js";
import { loginRules, registerRules, updateDetailsRules, updatePasswordRules } from "../middlewares/validator.js";
import { validateResult } from "../middlewares/validationResults.js";

//public routes

userRouter.post("/signup",registerRules, validateResult, UserController.signUp );

userRouter.post("/login", loginRules, validateResult, UserController.login);

userRouter.post("/logout", UserController.logout);

//private routes

userRouter.get("/me",verifyUser, UserController.getMe);

userRouter.put("/update-details",verifyUser, updateDetailsRules,validateResult, UserController.updateDetails);

userRouter.put("/update-password",verifyUser,updatePasswordRules,validateResult, UserController.updatePassword);

userRouter.delete("/delete-user",verifyUser, UserController.deleteUser);

export default userRouter;