import mongoose from 'mongoose';

const userProgressSchema = new mongoose.Schema({
    id: { type: String, required: true, default: () => new mongoose.Types.ObjectId() },
    userId: { type: String, required: true },
    chapterId: { type: String, ref: 'Chapter', required: true },
    isCompleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  // Unique index on userId and chapterId to ensure each user can only have one progress entry per chapter
  userProgressSchema.index({ userId: 1, chapterId: 1 }, { unique: true });
  
  export const UserProgress = mongoose.models.UserProgress || mongoose.model('UserProgress', userProgressSchema);
  