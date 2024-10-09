import { Request, Response } from 'express';
import { User } from '../models';

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching users' });
  }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user' });
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error creating user', error });
  }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error updating user', error });
  }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting user' });
  }
};
