import type { VideoModelType } from "@root/models";
import { useStudent } from ".";

export function useStudentVideoStatus(video: VideoModelType) {
  const {
    progressInfo: { videoHistory, quizHistory },
    videoList: { videos },
  } = useStudent();
  const getPrevVideo = (): VideoModelType | undefined => {
    return videos.find((item) => item.order === (video.order as number) - 1);
  };
  console.log(videos);
  const getIsLocked = (): boolean => {
    if (video.order === 1) {
      return false;
    }
    const prevVideo = getPrevVideo();
    if (!prevVideo) {
      return false;
    }
    const videoProgress = videoHistory.find(
      (item) => item.video_id.toString() === prevVideo.id.toString()
    );
    const quizProgresses = quizHistory.filter(
      (item) => item.videoId.toString() === prevVideo.id.toString()
    );
    if (!videoProgress || quizProgresses.length !== prevVideo.quiz_count) {
      return true;
    }
    return videoProgress.time < (prevVideo.duration as number);
  };
  return {
    getIsLocked,
  };
}
