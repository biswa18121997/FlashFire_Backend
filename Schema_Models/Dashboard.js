import mongoose from 'mongoose';
import { JobSchema } from '../Schema_Models/JobSchema';
const dashboardSchema = new mongoose.Schema({
  job: {
    type: JobSchema,
    required: true 
  },
  status: {
    type: String,
    enum: ['Applied', 'Rejected', 'Short-listed', 'Interviews'],
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Dashboard', dashboardSchema);
