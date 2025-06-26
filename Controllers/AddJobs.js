import mongoose from "mongoose";
import { JobModel, JobSchema } from "../Schema_Models/JobSchema.js";

export default async function AddJobs(req, res) {
    
    const newJob = req.body;
    try {
        await JobModel.create(newJob);
        let FreshJobs = await JobModel.find();
        res.status(201).json({message : 'Sucess',
                                FreshJobs
                            })
        
    } catch (error) {
        console.log(error)
    }
}