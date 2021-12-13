import type { VideoModelType } from "@root/models";
import { useStudent } from ".";

export function useStudentVideoStatus(video: VideoModelType) {
  const {
    progressInfo: { videoHistory, quizHistory },
    videoList: { videos },
  } = useStudent();
  const getPrevVideo = (): VideoModelType | null => {
    const check = videos.findIndex((item) => item.id === video.id);
    if (check > 0) {
      return videos[check - 1];
    }
    return null;
  };
  const getNextVideo = () => {
    const check = videos.findIndex((item) => item.id === video.id);
    if (check === videos.length) {
      return null;
    }
    return videos[check + 1];
  }
  const getIsLocked = (): boolean => {
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
