import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: null },
  imageUrl: { type: String, default: null },
  price: { type: Number, default: null },
  isPublished: { type: Boolean, default: false },
  categoryId: { type: String, ref: 'Category', default: null }, // Reference to Category
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }], // Reference to Chapter
  purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Purchase' }], // Reference to Purchase
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Index on categoryId for faster queries
courseSchema.index({ categoryId: 1 });

// Check if model already exists to prevent overwriting
export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
