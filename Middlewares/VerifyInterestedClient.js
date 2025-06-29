import { InterestedClientsModel } from "../Schema_Models/InterestedClients.js";
import dotenv from 'dotenv'
dotenv.config();
export default async function VerifyInterestedClient(req, res, next){
    console.log("req.body:",req.body);
    try {
        let checkingInDatabaseForEmail = await InterestedClientsModel.find({email : req.body.email});
        let checkingInDatabaseForMobile = await InterestedClientsModel.find({mobile : req.body.mobile});
        if( checkingInDatabaseForEmail.length == 0 && checkingInDatabaseForMobile.length == 0){
            let checkEmail = await fetch(`http://apilayer.net/api/check?access_key=${process.env.MAILBOX_LAYER_API_ACCESS_KEY}&email=${req.body.email}&smtp=1&format=1`);
            let responseCheckEmail = await checkEmail.json();
            console.log(responseCheckEmail);

            let checkMobile = await fetch(`http://apilayer.net/api/validate?access_key=${process.env.NUMVERIFY_API_ACCESS_KEY}&number=${req.body.mobile}&country_code=&format=1`)
            let responseCheckMobile = await checkMobile.json();
            console.log(responseCheckMobile);
            if((responseCheckMobile?.carrier !=='' && responseCheckMobile?.location !=='') && checkEmail?.smtp_check){
                req.body.carrier = responseCheckMobile?.carrier;
                req.body.location = responseCheckMobile?.location;
                req.body.smtp_check = responseCheckEmail?.smtp_check;
                next();
                return;
            }
           else if((responseCheckMobile?.carrier == '' || responseCheckMobile?.location == ''  ) && responseCheckEmail?.smtp_check ){
            req.body.smtp_check = responseCheckEmail?.smtp_check;
            next();
            return;
           }
           else if((responseCheckMobile?.carrier !== '' && responseCheckMobile?.location !== ''  ) && !responseCheckEmail?.smtp_check) { 
            req.body.carrier = responseCheckMobile?.carrier;
            req.body.location = responseCheckMobile?.location;
            next();
            return;
           }
           else{
            return res.status(400).json({message : 'enter details correctly..!'});
           }
             
        }
        else{
            if(checkingInDatabaseForEmail.length > 0 && checkingInDatabaseForMobile.length > 0)
                return res.status(400).json({message : 'User already exist with this Email and Mobile No.'});
            else if(checkingInDatabaseForEmail?.length > 0 && checkingInDatabaseForMobile.length == 0)
                return res.status(400).json({message : 'User already exist with this Email '});
            else if(checkingInDatabaseForEmail.length == 0 && checkingInDatabaseForMobile.length > 0)
                return res.status(400).json({message : 'User already exist with this Mobile '});
            
        }
    
             
    } catch (error) {
        console.log(error)
    }

    
}