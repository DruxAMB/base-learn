// import { Request, Response } from 'express';

// // Get all teachers
// export const getTeachers = async (req: Request, res: Response) => {
//   try {
//     const teachers = await Teacher.find({});
//     res.status(200).json({ success: true, data: teachers });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Error fetching teachers' });
//   }
// };

// // Get a single teacher by ID
// export const getTeacherById = async (req: Request, res: Response) => {
//   try {
//     const teacher = await Teacher.findById(req.params.id);
//     if (!teacher) {
//       return res.status(404).json({ success: false, message: 'Teacher not found' });
//     }
//     res.status(200).json({ success: true, data: teacher });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Error fetching teacher' });
//   }
// };

// // Create a new teacher
// export const createTeacher = async (req: Request, res: Response) => {
//   try {
//     const newTeacher = new Teacher(req.body);
//     await newTeacher.save();
//     res.status(201).json({ success: true, data: newTeacher });
//   } catch (error) {
//     res.status(400).json({ success: false, message: 'Error creating teacher', error });
//   }
// };

// // Update a teacher by ID
// export const updateTeacher = async (req: Request, res: Response) => {
//   try {
//     const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updatedTeacher) {
//       return res.status(404).json({ success: false, message: 'Teacher not found' });
//     }

//     res.status(200).json({ success: true, data: updatedTeacher });
//   } catch (error) {
//     res.status(400).json({ success: false, message: 'Error updating teacher', error });
//   }
// };

// // Delete a teacher by ID
// export const deleteTeacher = async (req: Request, res: Response) => {
//   try {
//     const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);

//     if (!deletedTeacher) {
//       return res.status(404).json({ success: false, message: 'Teacher not found' });
//     }

//     res.status(200).json({ success: true, message: 'Teacher deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Error deleting teacher' });
//   }
// };
