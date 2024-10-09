import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    id: { type: String, required: true, default: () => new mongoose.Types.ObjectId() },
    name: { type: String, required: true, unique: true },
    courses: [{ type: String, ref: 'Course' }] // Reference to Course
  });
  
  export const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
  