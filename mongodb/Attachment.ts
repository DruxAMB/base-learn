import mongoose from 'mongoose';

const attachmentSchema = new mongoose.Schema({
    id: { type: String, required: true, default: () => new mongoose.Types.ObjectId() },
    name: { type: String, required: true },
    url: { type: String, required: true },
    courseId: { type: String, ref: 'Course', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  // Index on courseId for faster queries
  attachmentSchema.index({ courseId: 1 });
  
  export const Attachment = mongoose.models.Attachment || mongoose.model('Attachment', attachmentSchema);
  