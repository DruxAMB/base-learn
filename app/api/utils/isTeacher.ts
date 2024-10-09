import { User } from "../models";

export const isTeacher = async (userId: string) => {
  const user = await User.findById(userId);
  return user?.role === 'TEACHER'; // Assuming you have a 'role' field in the User model
};
