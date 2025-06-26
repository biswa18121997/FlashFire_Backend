import mongoose from 'mongoose'
import {JobModel, JobSchema} from "../Schema_Models/JobSchema.js";

////schema and models for profile....

const profileSchema= new mongoose.Schema({
    userID:{
        type: String,
        required : true,
         default : ()=>new Date().getTime()
    },
    name : {
        type: String,
        required : true,
    },
    email: {
        type: String,
        required : true,
        unique : true, 
    },
    education : {
        type : String,
        required : false
    },
    skills : [String],
    dashBoard : {
        Applied : [JobSchema],
        RecruiterAction : [JobSchema],
        InterviewScheduled : [JobSchema]
    }

});

export const ProfileModel = mongoose.model('profiles', profileSchema);
