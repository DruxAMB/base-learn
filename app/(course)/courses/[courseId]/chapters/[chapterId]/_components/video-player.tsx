"use client";

import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import Player from "react-player";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { ICourse } from "@/mongodb/Course";

interface VideoPlayerProps {
  videoUrl: string;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
}

export const VideoPlayer = ({
  videoUrl,
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  title,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();

  const ipfsUrl = `https://ipfs.io/ipfs/${videoUrl.split('ipfs/')[1]}`
  console.log(ipfsUrl);
  

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/progress`,
          {
            isCompleted: true,
          }
        );

        if (!nextChapterId) {
          confetti.onOpen();
        }

        toast.success("Progress updated");
        router.refresh();

        if (nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
        }
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <video
        width="100%"
        height="100%"
        title={title}
        controls
        autoPlay
        className={isReady ? '' : 'hidden'}
        onCanPlay={() => setIsReady(true)} // Equivalent to onReady
        onEnded={onEnd}
      >
        <source src={ipfsUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      )}
    </div>
  );
};
