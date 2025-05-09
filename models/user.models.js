import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'User name is required'],
        trim:true,
        minLength:2, 
        maxLength:50
    },
    email:{
        type:String,
        required:[true, "User email is required"],
        unique:true,
        trim:true,
        lowercase:true,
        match:[/\S+@\S.\S+/, "please fill valid address"],
    },
    password:{
        type:String,
        required:[true, "User Password is required"],
        minLength:6
    },
    options:{timestamps:true}
});

const User = mongoose.model("User", userSchema);
export default User;