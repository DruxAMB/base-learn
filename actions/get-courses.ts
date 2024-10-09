import { Course } from "@/mongodb/Course"; // Mongoose Course model
import {  ICategory } from "@/mongodb/Category"; // Mongoose Category model
import { getProgress } from "@/actions/get-progress";

type CourseWithProgressWithCategory = {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  isPublished: boolean;
  category: ICategory | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getCourses = async ({
  userId,
  title,
  categoryId
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    // Build query object for filtering courses
    const query: any = {
      isPublished: true,
      ...(title ? { title: { $regex: title, $options: "i" } } : {}), // If title is provided, filter by partial match
      ...(categoryId ? { categoryId } : {}),
    };

    // Fetch courses with Mongoose and populate related data
    const courses = await Course.find(query)
      .populate({
        path: 'categoryId', // Populate category data
        select: 'name', // Only select the category name
      })
      .populate({
        path: 'chapters',
        match: { isPublished: true }, // Only include published chapters
        select: 'id', // Only select the 'id' field for chapters
      })
      .populate({
        path: 'purchases',
        match: { userId }, // Filter purchases by userId
      })
      .sort({ createdAt: -1 }) // Sort courses by creation date in descending order
      .lean(); // Use lean() to improve performance (returns plain JS objects)

    // Calculate progress for each course
    const coursesWithProgress: CourseWithProgressWithCategory[] = await Promise.all(
      courses.map(async (course: any) => {
        const progress = course.purchases && course.purchases.length > 0
          ? await getProgress(userId, course._id.toString())
          : null;

        return {
          id: course._id.toString(),
          title: course.title,
          description: course.description,
          imageUrl: course.imageUrl,
          price: course.price,
          isPublished: course.isPublished,
          category: course.categoryId ? course.categoryId : null,
          chapters: course.chapters.map((chapter: any) => ({ id: chapter._id.toString() })),
          progress,
        };
      })
    );

    return coursesWithProgress;
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
};
