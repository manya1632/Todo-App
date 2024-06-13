import { validationResult } from "express-validator";

export const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) { 
        return res.json({
            "msg" : errors.array()[0].msg
        })
    }
    next();
}