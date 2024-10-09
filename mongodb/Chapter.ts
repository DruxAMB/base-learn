import mongoose from 'mongoose';

const chapterSchema = new mongoose.Schema({
    id: { type: String, required: true, default: () => new mongoose.Types.ObjectId() },
    title: { type: String, required: true },
    description: { type: String, default: null },
    videoUrl: { type: String, default: null },
    position: { type: Number, required: true },
    isPublished: { type: Boolean, default: false },
    isFree: { type: Boolean, default: false },
    courseId: { type: String, ref: 'Course', required: true }, // Reference to Course
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  // Index on courseId for faster queries
  chapterSchema.index({ courseId: 1 });
  
  export const Chapter = mongoose.models.Chapter || mongoose.model('Chapter', chapterSchema);
  