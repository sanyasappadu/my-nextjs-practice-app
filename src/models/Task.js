// models/Task.js
import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['untouched', 'active', 'completed'],
    default: 'untouched',
  },
  category: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);
