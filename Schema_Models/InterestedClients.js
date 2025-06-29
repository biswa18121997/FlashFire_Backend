import mongoose from "mongoose";



export const InterestedClientsSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true, 
    },
    email : {
        type : String,
        default : ' '
    },
    mobile : {
        type : String,
        default : ' '
    },
    time : {
        type: String,
        default : ()=>new Date(),
        required : true
    },
    workAuthorization : {
        type : String,
        default : ' '
    }
    
});
 export const InterestedClientsModel = mongoose.model('InterestedClientList', InterestedClientsSchema  )