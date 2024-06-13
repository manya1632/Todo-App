import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
    static signUp = async (req, res) => {
        const { fullName, email, password, age } = req.body;
        if (fullName && email && password && age) {
            try {
                let user = await User.findOne({ email: email });
                
                if (user) {
                    return res.status(400).json({
                        msg: "User already exists"
                    });
                } else {
                    const salt = await bcrypt.genSalt(10);
                    const hashPassword = await bcrypt.hash(password, salt);

                    user = new User({
                        fullName: fullName,
                        email: email,
                        password: hashPassword,
                        age: age
                    });

                    await user.save();

                    const payload = {
                        user: user._id
                    };

                    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 36000 });
                    res.cookie("token", token, { httpOnly: true, maxAge: 36000000 });

                    const { password: pass, ...rest } = user._doc;
                    return res.status(201).json({
                        msg: "User created successfully",
                        user: rest
                    });
                }
            } catch (error) {
                console.error(error);
                return res.status(500).json({
                    msg: "Server error"
                });
            }
        } else {
            return res.status(400).json({
                msg: "Enter all the required fields"
            });
        }
    };

    static login = async(req, res) => {
        const {email , password} = req.body;
        if(email && password ) {
            try {
                const user = await User.findOne({
                    email : email
                })

                if(user) { 
                    
                        try {
                            const comparePassword =  await bcrypt.compare(password, user.password);
                            if(comparePassword){
                                const payload =  {
                                    user : user.id
                                }

                                const token =  jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:360000});

                                res.cookie("token", token, {httpOnly:true, expiresIn : 360000});
                                const {password, ...rest} =  user._doc;
                                return res.json({
                                    "msg" : "Login Successful",
                                    "user" : rest
                                })
                            } else {

                                return res.json({
                                    "msg" : "Invalid credentials"
                                })
                            }
                        } catch (error) {
                            return res.json({
                                "msg" : "Server error"
                            })
                        }
                } else {
                    return res.json({
                        "msg" : "User doesn't exist"
                    })
                }

                
            } catch (error) {
                return res.json({
                    "msg" : "Server error"
                })
            }
        }else { 
            return res.json({
               "msg" : "Enter both email and password"
        })
        }

    };
    
    static logout = (req, res) => {
        res.clearCookie("token");
        return res.json({
            "msg" : "Logout done"
        })  
    }

    static getMe = async(req, res) => {
        try {
            const user =  await User.findById(req.user);
            if(!user) { 
                return res.json({
                    "msg" : "user not found"
                })
            } else {
                const {password : pass,...rest} = user._doc;
                return res.json({
                    "msg" : "user found" ,
                    "user" : rest
                })
            }
        } catch (error) {
            return res.json({
                "msg" : "Server error"
            })
        }
    };

    static updateDetails = async(req, res) => {
        const {name , email, age} = req.body;
        if(name &&  email && age) {
            try {
                const user = await User.findById(req.user);
                if(user) {
                    const exists = await User.findOne({
                        email : email 
                    })
                    if(exists && exists._id.toString() !== user._id.toString()) {
                        return res.json({
                            "msg" : "Email already exists on other user accoumt"
                        })
                    } else {
                        user.name =  name;
                        user.email = email; 
                        user.age= age;
                        await user.save();
    
                        const {password : pass, ...rest} = user._doc;
                        return res.json({
                            "msg" : "User details changed successfully", 
                            "user" : rest
                        })
                    }
                } else {
                    return res.json({
                        "msg" : "Unauthorized"
                    })
                }
            } catch (error) {
                return res.json({
                    "msg" : "Server Error"
                })
            }
        } else {
            return res.json({
                "msg" : "Enter all the required fields"
            })
        }
        };

    static updatePassword = async (req, res) => {
        const {password, confirmPassword} = req.body;
        if(password, confirmPassword) { 
            if(password === confirmPassword) {
                try {
                    const user =await User.findById(req.user);
                if(user){
                    const comparePassword= await bcrypt.compare(password, user.password);
                    if(comparePassword) { 
                        const salt =  await bcrypt.genSalt(10);
                        const hashedPassword = bcrypt.hash(comparePassword,salt, {expiresIn  : 360000});

                        user.password = hashedPassword;
                        await user.save();                
                        
                        return res.json({
                            "msg" : "Password changed successfully"
                        })

                    } else { 
                        return res.json({
                            "msg" : "Unauthorized"
                        })
                    }
                }else  {
                    return res.json({
                        "msg" : "No user exists"
                    })
                }
                } catch (error) {
                    return res.json({
                        "msg" : "Server error"
                    })
                }
            } else { 
                return res.json({
                    "msg" : "Both password don't match"
                })
            }
        } else {
            return res.json({
                "msg" : "Enter both required fields"
            })
        }
        };

    static deleteUser =async (req, res) => {
        try {
            const user =  await User.findById(req.user);
            if(user) { 
                await user.remove();
                return res.json({
                    "msg" : "User deleted successfully "
                })
            } else { 
                return res.json({
                    "msg" : "No user found "
                })
            }
        } catch (error) {
            return res.json({
                "msg" : "server error"
            })
        }
    };
}

export default UserController;
