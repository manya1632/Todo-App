import mongoose from "mongoose";

const todoSchema = mongoose.Schema( { 
    title : {type : String, required :true , trim : true},
    description : {type: String, required : true, trim: true}, 
    completed : {type : Boolean, required : true},
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
}, {timestamps : true})

const Todo = mongoose.model("todo", todoSchema);

export default Todo; 