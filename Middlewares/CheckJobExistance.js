import mongoose from "mongoose";
import { JobModel } from "../Schema_Models/JobSchema.js";
export default async function CheckJobExistance(req, res, next) {
    try {
        let JobData = req.body;
        let existance = await JobModel.findOne({jobID : JobData.jobID});
        if(existance)
            return res.status(403).json({'message': 'such record already exist'});
        next();

    } catch (error) {
        console.log(error)
    }   
}