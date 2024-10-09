import { Request, Response } from 'express';
import { Course } from '../models/Course'; // Assuming you have this model defined

// Get all courses for a specific user
export const getCoursesByUserId = async (req: Request, res: Response) => {
  const userId = req.params.userId; // Assuming userId is passed as a parameter

  if (!userId) {
    return res.status(400).json({ success: false, message: "User ID is required" });
  }

  try {
    const courses = await Course.find({ userId }).sort({ createdAt: 'desc' });
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching courses' });
  }
};

// Create a new course for a user
export const createCourse = async (req: Request, res: Response) => {
  const { userId, title, description, imageUrl, price, categoryId } = req.body;

  if (!userId || !title || !description) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    const newCourse = new Course({
      userId,
      title,
      description,
      imageUrl,
      price,
      categoryId,
    });

    await newCourse.save();
    res.status(201).json({ success: true, data: newCourse });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error creating course', error });
  }
};

// Update a course by ID
export const updateCourse = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

    if (!updatedCourse) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.status(200).json({ success: true, data: updatedCourse });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error updating course', error });
  }
};

// Delete a course by ID
export const deleteCourse = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.status(200).json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting course' });
  }
};
