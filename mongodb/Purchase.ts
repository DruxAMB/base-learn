import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
    id: { type: String, required: true, default: () => new mongoose.Types.ObjectId() },
    userId: { type: String, required: true },
    courseId: { type: String, ref: 'Course', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  // Unique index on userId and courseId to prevent duplicate purchases
  purchaseSchema.index({ userId: 1, courseId: 1 }, { unique: true });
  
  export const Purchase = mongoose.model('Purchase', purchaseSchema);
  