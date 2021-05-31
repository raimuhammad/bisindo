import { ProgressModelType, VideoModelType } from "@root/models";

export const useGetVideoPercentage = (progress: ProgressModelType | null) => {
  return (video: VideoModelType) => {
    if (!progress || !progress.videoHistories.length) {
      return 0;
    }
    const find = progress.videoHistories.find(
      (item) => item.video_id.toString() === video.id
    );
    if (find) return find.time / (video.duration as number);
    return 0;
  };
};
