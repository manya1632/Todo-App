import mongoose from "mongoose";

const userModel = mongoose.Schema( { 
    fullName : {type : String, required :true, trim : true},
    email : {type : String , required: true , trim: true},
    password : {type : String , required: true , trim: true},
    age : {type : Number , required: true , trim: true}
}, {timestamps :true}) ;

const User = mongoose.model("user", userModel);

export default User