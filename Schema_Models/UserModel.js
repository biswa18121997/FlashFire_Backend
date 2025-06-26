import mongoose from 'mongoose'
//schema and models for users.....

export const userSchema= new mongoose.Schema({
    userID:{
        type : String,
        required : true,
        unique : true,
        default : String(new Date().getTime())
    },
    name:{
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true

    },
    passwordHashed:{
        type : String,
        required : true,
    },
    picture:{
        type : String,
        required : true,
        default : 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='

    },
    interests:{
        type : [String]
    }
});
export const UserModel = mongoose.model("users", userSchema);