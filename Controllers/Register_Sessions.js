import mongoose from "mongoose";
import { InterestedClientsModel } from "../Schema_Models/InterestedClients.js";
import { SessionModel } from "../Schema_Models/Sessions.js";


export default async function Register_Sessions( req, res ) {
    try {

         if(!req.body.sessionBooking){
        const { name, email, mobile } = req.body ;
        await InterestedClientsModel.insertOne({name, email, mobile })
        let Clients = await InterestedClientsModel.find();
        res.status(201).json({message : 'Client Added Succesfully !.',
                                Clients                     
                            });

     }

      else if(req.body.sessionBooking){
         const { name, email, mobile , comments, sessionTime} = req.body ;
         ///here give session time based on calendly..
        await SessionModel.insertOne({ StudentName : name,
                                        StudentEmail :email,
                                        StudentMobile : mobile,
                                        comments});
        let Sessions = await SessionModel.find();
        res.status(200).json({message : "sucess",
                                Sessions
                            })
      }
        
    } catch (error) {
        console.log(error);
    }
    
    
}