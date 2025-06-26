import { InterestedClientsModel } from "../Schema_Models/InterestedClients.js";
import { SessionModel } from "../Schema_Models/Sessions.js";
import ENV from "../SECRET.js";

export default async function VerifyInterestedClient(req, res, next){
    console.log("did i log");
    try {
        let check = await fetch(`http://apilayer.net/api/check?access_key=24d85f6549672836f6b7fe1d2e5a4ea7&email=${req.body.email}&smtp=1&format=1`);
        let response = await check.json();
        console.log(response);
        if(!response?.smtp_check){
            return res.status(403).json({message: "invalid Email"});
        }else if(response?.smtp_check){
            if(!req.body.sessionBooking){
                const { name, email, mobile } = req.body ;
                let existance = await InterestedClientsModel.findOne({email})
                if(existance){
                    return res.status(402).json({message : 'User Already Exist .. !'})
                }
                next();
            }
            else if(req.body.sessionBooking){
                const { name, email, mobile , comments, sessionTime} = req.body ;
                console.log( name, email, mobile , comments, sessionTime);
                next();
            }
        }       
    } catch (error) {
        console.log(error)
    }

    
}