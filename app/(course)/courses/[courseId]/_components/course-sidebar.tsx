import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { CourseProgress } from "@/components/course-progress";
import { CourseSidebarItem } from "./course-sidebar-item";
import { ICourse } from "@/mongodb/Course"; // Mongoose Course interface
import { Chapter, IChapter } from "@/mongodb/Chapter"; // Mongoose Chapter interface
import { IUserProgress } from "@/mongodb/UserProgress"; // Mongoose UserProgress interface
import { Purchase } from "@/mongodb/Purchase"; // Mongoose Purchase model
import mongoose from "mongoose"; // For ObjectId handling
import getChaptersForCourse from "@/actions/get-chapters-courses";

interface CourseSidebarProps {
  course: ICourse & {
    chapters: (IChapter & {
      userProgress: IUserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const CourseSidebar = async ({
  course,
  progressCount,
}: CourseSidebarProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  // Fetch purchase record for the user and course
  const purchase = await Purchase.findOne({
    userId: userId,
    courseId: course._id // Convert course._id to ObjectId
  }).lean();

  const chapters = await Chapter.find({
    courseId: course._id, // Filter chapters by courseId
    isPublished: true, // Optional: Only return published chapters
  })
  .populate('userProgress') // Populate userProgress for each chapter
  .lean();

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">
          {course.title}
        </h1>
        {purchase && (
          <div className="mt-10">
            <CourseProgress
              variant="success"
              value={progressCount}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {chapters.map((chapter) => (
          <CourseSidebarItem
            id={chapter._id.toString()} // Ensure _id is correctly converted to string
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course._id as string} // Ensure courseId is treated as a string
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  );
};
