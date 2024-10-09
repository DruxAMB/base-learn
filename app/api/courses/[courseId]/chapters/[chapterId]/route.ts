import Mux from "@mux/mux-node";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Course } from "@/mongodb/Course";
import { Chapter } from "@/mongodb/Chapter";
import { MuxData } from "@/mongodb/MuxData";


const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!,
);

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await Course.findOne({
      _id: params.courseId,
      userId,
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await Chapter.findOne({
      _id: params.chapterId,
      courseId: params.courseId,
    });

    if (!chapter) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (chapter.videoUrl) {
      const existingMuxData = await MuxData.findOne({
        chapterId: params.chapterId,
      });

      if (existingMuxData) {
        await Video.Assets.del(existingMuxData.assetId);
        await MuxData.findByIdAndDelete(existingMuxData._id);
      }
    }

    const deletedChapter = await Chapter.findByIdAndDelete(params.chapterId);

    const publishedChaptersInCourse = await Chapter.find({
      courseId: params.courseId,
      isPublished: true,
    });

    if (!publishedChaptersInCourse.length) {
      await Course.findByIdAndUpdate(params.courseId, {
        isPublished: false,
      });
    }

    return NextResponse.json(deletedChapter);
  } catch (error) {
    console.log("[CHAPTER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { isPublished, ...values } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await Course.findOne({
      _id: params.courseId,
      userId
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await Chapter.findOneAndUpdate(
      {
        _id: params.chapterId,
        courseId: params.courseId,
      },
      {
        ...values,
      },
      { new: true }
    );

    if (values.videoUrl) {
      const existingMuxData = await MuxData.findOne({
        chapterId: params.chapterId,
      });

      if (existingMuxData) {
        await Video.Assets.del(existingMuxData.assetId);
        await MuxData.findByIdAndDelete(existingMuxData._id);
      }

      const asset = await Video.Assets.create({
        input: values.videoUrl,
        playback_policy: "public",
        test: false,
      });

      await MuxData.create({
        chapterId: params.chapterId,
        assetId: asset.id,
        playbackId: asset.playback_ids?.[0]?.id,
      });
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[COURSES_CHAPTER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}