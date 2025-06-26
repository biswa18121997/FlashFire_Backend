import { UserModel } from "../Schema_Models/UserModel.js";

//registration middleware to check for duplicate registration..
export default async function RegisterVerifier(req, res, next){
    try {   
        let {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message: "Enter a different Email ..!"})
        }
        let userExistance = await UserModel.findOne({"email" : email});
        console.log(req.body)

        if(userExistance){
            return res.status(403).json({
                message : "User Already Exist with this email please try registering with a different Email..!"})
        }
        next();
        return;
    } catch (e) {
        console.log( "Something went wrong ..please try or Login agian",e);
        return res.status(402).json({
            message: 'Something went wrong ..please try or Login agian'
        })
    }
}