import { Purchase } from "@/mongodb/Purchase";
import { ICourse } from "@/mongodb/Course";
import {  IChapter } from "@/mongodb/Chapter";

import { getProgress } from "@/actions/get-progress";
import { ICategory } from "@/mongodb/Category";

type CourseWithProgressWithCategory = ICourse & {
  category: ICategory;
  chapters: IChapter[];
  progress: number | null;
};

type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[];
  coursesInProgress: CourseWithProgressWithCategory[];
}

export const getDashboardCourses = async (userId: string): Promise<DashboardCourses> => {
  try {
    const purchasedCourses = await Purchase.find({ userId })
      .populate({
        path: 'courseId',
        populate: [
          { path: 'category' },
          { path: 'chapters', match: { isPublished: true } }
        ]
      })
      .lean();

    const courses = purchasedCourses.map(purchase => purchase.courseId as unknown as CourseWithProgressWithCategory);

    for (let course of courses) {
      const progress = await getProgress(userId, course.id);
      course.progress = progress;
    }

    const completedCourses = courses.filter((course) => course.progress === 100);
    const coursesInProgress = courses.filter((course) => (course.progress ?? 0) < 100);

    return {
      completedCourses,
      coursesInProgress,
    }
  } catch (error) {
    console.log("[GET_DASHBOARD_COURSES]", error);
    return {
      completedCourses: [],
      coursesInProgress: [],
    }
  }
}