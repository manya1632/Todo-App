import { check } from "express-validator";

export const registerRules = [
    check("fullName", "Name is required").notEmpty().trim().escape(),
    check("email", "Email is required").isEmail().normalizeEmail(),
    check("password", "Password should be 6 or more characters").isLength({min:6}),
    check("age", "Age is required").notEmpty().trim().escape().isNumeric(),
]

export const loginRules = [
    check("email", "Email is required").isEmail().normalizeEmail(),
    check("password", "Password should be 6 or more characters").isLength({min:6})
]

export const updateDetailsRules = [
    check("fullName", "Name is required").notEmpty().trim().escape(),
    check("email", "Email is required").isEmail().trim().normalizeEmail(),
    check("age", "Age is required").notEmpty().trim().escape().isNumeric(),
]

export const updatePasswordRules = [
    check("password", "Password should be 6 or more characters").isLength({min:6}),
    check("confirmPassword", "Password should be 6 or more characters").isLength({min:6})
]

export const createTodoRules = [
    check("title", "Title is required").notEmpty().trim().escape(),
    check("description", "Description is required").notEmpty().trim().escape(),
    check("completed", "Completed is required").notEmpty().trim().escape().isBoolean()
]

export const updateTodoRules = [
    check("title", "Title is required").notEmpty().trim().escape(),
    check("description", "Description is required").notEmpty().trim().escape(),
    check("completed", "Completed is required").notEmpty().trim().escape().isBoolean()
]
