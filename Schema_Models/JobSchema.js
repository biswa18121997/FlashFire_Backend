import { mongoose } from "mongoose";
export const JobSchema = new mongoose.Schema({
  jobID: {
    type: String,
    required: true,
    unique: true
  },
  jobTitle : {
    type : String,
    required : true ,
  },
  jobDescription: {
    type: String,
    required: true
  },
  jobRole: {
    type: String,
    required: true
  },
  jobSalary : {
    type : Number
  },
  companyName: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Internship', 'Contract', 'Remote', 'Freelance'],
    required: true,
    default: 'Full-time'
  },
  jobLocation: {
    type: String,
    required: true
  },
  skillsRequired: {
    type: [String], 
    required: true
  },
  additionalDetails: {
    type: String 
  },
  timeStand : {
    type : Date,
  }
});

export const JobModel = mongoose.model('JobDB', JobSchema)