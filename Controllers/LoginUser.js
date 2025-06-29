import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import { UserModel } from "../Schema_Models/UserModel.js";
import {ProfileModel} from '../Schema_Models/ProfileModel.js'
import dotenv from 'dotenv'
//login user controller that sends the token to clent to be saved to local storage..after jwt verification

export default async function LoginUser(req, res) {
    let SECRET_KEY_JWT = ENV.SECRET_KEY_JWT;
    try {
        let findProfile = await ProfileModel.findOne({email:req.email});
        let findUser = await UserModel.findOne({email: req.email});
        if(jwt.verify(req.token, process.env.SECRET_KEY_JWT)){
            let {userID,name,email } = jwt.verify(req.token, SECRET_KEY_JWT);
        }
        else{
            return res.status(201).json({
                success : false,
                message : 'token Expired ..Please Login Again...!'
             });
        }
        return res.status(201).json({
                success : true,
                user : findUser || null,
                token : req.token
             });       
    } catch (error) {
        res.status(400).json({
            message : 'Somthing went wrong ..Please try again..'
        })
    }
}

