import mongoose from "mongoose";



export const InterestedClientsSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true, 
    },
    email : {
        type : String,
        
    },
    mobile : {
        type : Number,
    },
    time : {
        type: String,
        default : ()=>new Date(),
        required : true
    }
    
});
 export const InterestedClientsModel = mongoose.model('InterestedClientList', InterestedClientsSchema  )