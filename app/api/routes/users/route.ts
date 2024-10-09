import { getAuth } from "@clerk/nextjs/server"; // Import Clerk's getAuth function
import connectDB from "../../utils/db";
import { User } from "../../models";

export default async function handler(req: any, res: any) {
  const { userId } = getAuth(req); // Clerk gives you the authenticated user’s id

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  await connectDB();

  switch (req.method) {
    case 'GET':
      // Fetch user from MongoDB using the Clerk userId
      const user = await User.findOne({ id: userId });
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      res.status(200).json({ success: true, data: user });
      break;

    case 'POST':
      // Create a new user in MongoDB based on Clerk's user data
      const newUser = new User({ id: userId, ...req.body });
      await newUser.save();
      res.status(201).json({ success: true, data: newUser });
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
