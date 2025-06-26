import ENV from "../SECRET.js";
import jwt from 'jsonwebtoken'
//middleware which runs on all requests to check if the locally stored token is valid or not.. other than login and register on all routes..
export default function LocalTokenValidator(req, res, next){
    let {SECRET_KEY_JWT} = ENV;
    try {
        if(req?.body?.token){
            let token = req?.body?.token;
            let tokenReal=jwt.verify(token, SECRET_KEY_JWT);
            if(tokenReal){
                next();
                return;
            }
            else
                return res.status(403).json({success : false});
        }
        else if(req?.headers?.authorization){      
            let auth =req?.headers?.['authorization'] && req?.headers?.['authorization']?.split(' ')[1];
            let tokenReal=jwt.verify(auth, SECRET_KEY_JWT);
            if(tokenReal){
                next();
                return;
            }
            else{
                return res.status(403).json({success : false});
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(403).json({success : false});
    }
    

    
}