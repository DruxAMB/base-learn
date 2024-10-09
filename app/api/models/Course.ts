import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  price: { type: Number },
  isPublished: { type: Boolean, default: false },
  categoryId: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Course = mongoose.model('Course', CourseSchema);
