import jwt from 'jsonwebtoken'
import { UserModel } from '../Schema_Models/UserModel.js';


//middleware to create a login token using jwt..
export default async function Tokenizer(req, res, next){
    try {   
        let {email,userID, name} = await UserModel.findOne({email: req.body.email});
        const userToken = jwt.sign({userID, name, email},SECRET_KEY_JWT, {expiresIn : '1d'});
        req.headers['authorization'] = `JWT ${userToken}`;
        req.token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
        req.email = email;
        req.name = name;
        req.userID = userID;
        res.status(201);
        next();
    } catch (e) {
        console.log( "Something went wrong ..please Login / Register agian");
        res.status(402).json({
            message: 'Something went wrong ..please Login / Register agian'
        })
    }
}