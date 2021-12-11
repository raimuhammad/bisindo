import type { UseStudentGrade } from "./use-student-grade";
import { useQuery, VideoModelType } from "@root/models";
import { useEffect } from "react";

export function useStudentVideo({ studentGrade }: UseStudentGrade) {
  const { data, loading, setQuery } = useQuery<{
    getVideoByGrade: VideoModelType[];
  }>();
  const videos = (data
    ? data.getVideoByGrade
    : []) as unknown as VideoModelType[];
  const getPlayingPercentage = (videoId: string, playingTime: number) => {
    const check = videos.find((item) => item.id === videoId);
    if (!check) {
      return 0;
    }
    const percent = (playingTime / (check.duration as number)) * 100;
    return isFinite(percent) ? Math.floor(percent) : 0;
  };
  useEffect(() => {
    if (studentGrade) {
      setQuery((store: any) => {
        return store.queryGetVideoByGrade({
          gradeId: studentGrade.grade.id,
        });
      });
    }
  }, [studentGrade]);
  return {
    videos,
    loading: !data || loading,
    getPlayingPercentage,
  };
}
