import { UserModel } from '../Schema_Models/UserModel.js';
import ENV from '../SECRET.js';
import jwt from 'jsonwebtoken'

////middleware that runs a verification on the token..
export default async function TokenVerifier(req, res, next){
    let { SECRET_KEY_JWT } = ENV ;

    try {   
        let userLoginToken = req.token;
        let verifcation = jwt.verify(userLoginToken, SECRET_KEY_JWT);
        if(!verifcation){
            res.status(403).json({message: "TOKEN EXPIRED PLEASE LOGIN AGAIN.."})
        }
        else{
            console.log(req.token, req.email, req.name, req.userID);
        next();
        return;
        }
        
       
    } catch (e) {
        console.log( "Something went wrong ..please Login / Register agian",e);
        return res.status(402).json({
            message: 'Something went wrong ..please Login / Login agian . Your Token Must Be Invalid'
        })
    }
}