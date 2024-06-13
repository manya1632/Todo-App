import jwt from "jsonwebtoken";
const verifyUser = (req, res, next) =>{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    const token = req.cookies.token;
    if(token) {
        try {
            const decoded =  jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
        } catch (error) {
            return res.json({
                "msg" : "Unauthorized"
            })
        }
    }else { 
        return res.json({
            "msg"  : "Unauthorized"
        })
    }
}

export default verifyUser