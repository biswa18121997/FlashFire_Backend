import ENV from "../SECRET.js";
import { UserModel } from "../Schema_Models/UserModel.js";
import bcrypt from 'bcrypt'
//middleware to verify if the password is correct....
export default async function LoginVerifier(req, res, next){
    try {   
        let { email, password} = req.body;
        let existance = await UserModel.findOne({email})
        if(!existance)
            return res.status(200).json({
                message : "No Such User Exist With this Email ID..!"
            })
        let verifyPassword = bcrypt.compareSync( req.body.password, existance.passwordHashed);
        if(!verifyPassword){
            return res.status(403).json({message: "Incorrect Password..."});
        }
        next();
        return;
    } catch (e) {
        console.log( "Something went wrong ..please Login / Register agian",e);
        res.status(402).json({
            message: 'Something went wrong ..please Login / Login agian'
        })
    }
}