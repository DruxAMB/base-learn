import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { Course } from "@/mongodb/Course";
import { Chapter, IChapter } from "@/mongodb/Chapter";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await Course.findOne({
      _id: params.courseId,
      userId,
    }).populate({
      path: 'chapters',
      model: Chapter,
      select: '-__v', // Select all fields except __v
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    const hasPublishedChapter = (course.chapters as unknown as IChapter[]).some((chapter) => chapter.isPublished);

    if (!course.title || !course.description || !course.imageUrl || !course.categoryId || !hasPublishedChapter) {
      return new NextResponse("Missing required fields", { status: 401 });
    }

    const publishedCourse = await Course.findOneAndUpdate(
      {
        _id: params.courseId,
        userId,
      },
      {
        isPublished: true,
      },
      { new: true }
    );

    return NextResponse.json(publishedCourse);
  } catch (error) {
    console.log("[COURSE_ID_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}