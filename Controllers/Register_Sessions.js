import mongoose from "mongoose";
import { InterestedClientsModel } from "../Schema_Models/InterestedClients.js";
import { SessionModel } from "../Schema_Models/Sessions.js";
import { DiscordConnect } from "../Utils/DiscordConnect.js";


export default async function Register_Sessions( req, res ) {
    try {
        let {name, email, mobile, smtp_check, carrier, location} = req.body;
        if(smtp_check && carrier !=='' && location !=='')
            await InterestedClientsModel.create({name, email, mobile })
        else if(!smtp_check && (carrier!== '' && location !== ''))
            await InterestedClientsModel.create({name,mobile})
        else if(smtp_check && (carrier=='' || location == ''))
            await InterestedClientsModel.create({name, email});
        const discordMessage ={
            "Message" : "A New Lead Added ..!!.", 
            'Client Name' : name,
            'Client E-Mail' : smtp_check ? email : "<INVALID E-MAIL>",
            'Client Mobile' : (carrier !=='' && location !== '')? mobile : "<INVALID MOBILE NO.>",
        }
        DiscordConnect(JSON.stringify(discordMessage, null, 2));
        res.status(201).json({message : 'Sucess'});
    }
    catch (error) {
        console.log(error);
    }
    
    
}