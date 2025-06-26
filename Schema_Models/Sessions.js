import mongoose from "mongoose";


export const SessionSchema = new mongoose.Schema({
    SessionID : {
        type : String,
        unique : true,
        default: ()=>Date.now(),
        required : true

    },
    StudentName : {
        type : String ,
        required : true ,
    },
    StudentEmail : {
        type : String,
        required : true
    },
    StudentMobile : {
        type: Number ,
        required : true
    },
    SessionTiming : {
        type : Date,
        required : true,
        default : ()=>new Date()
    },
    SessionBookingTime : {
        type : Date,
        required : true,
        default : ()=>new Date()
    },
    comments : {
        type : String,
        required : false 
    }
})
export const SessionModel = mongoose.model('Sessions', SessionSchema)