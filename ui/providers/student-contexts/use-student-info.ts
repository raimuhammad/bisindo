import {
  ProgressModelType,
  QuizHistory,
  RootStoreType,
  useQuery,
  VideoHistory,
} from "@root/models";
import { useApp } from "../application-provider";

export function useStudentInfo() {
  const { user } = useApp();
  const { loading, data } = useQuery<{
    studentProgress: ProgressModelType;
  }>((store: RootStoreType) =>
    store.queryStudentProgress({
      userId: user?.id ?? "",
    })
  );
  const resolveVideoHistory = (): VideoHistory[] => {
    return data && data.studentProgress?.videoHistories
      ? data.studentProgress.videoHistories
      : [];
  };
  const resolveQuizHistory = (): QuizHistory[] => {
    return data && data.studentProgress?.videoHistories
      ? data.studentProgress.quizHistories
      : [];
  };

  const getPlaying = (videoId: string) => {
    const check = resolveVideoHistory().find(
      (item) => item.video_id.toString() === videoId
    );
    if (!check) {
      return 0;
    }
    return check.time;
  };

  return {
    progress: (data
      ? data.studentProgress
      : null) as unknown as ProgressModelType,
    loading: !data || loading,
    videoHistory: resolveVideoHistory(),
    quizHistory: resolveQuizHistory(),
    getPlaying,
  };
}

export type StudentInfo = ReturnType<typeof useStudentInfo>;
