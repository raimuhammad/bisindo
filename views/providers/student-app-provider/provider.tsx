import * as React from "react";
import {
  GradeModelType,
  ProgressModelType,
  QuizModelType,
  UserModelType,
  VideoModelType,
} from "@root/models";
import { useApp } from "../app-provider";
import { observer } from "mobx-react";
import { useGetVideoPercentage } from "./use-get-video-percentage";
import { useUserGradeInfo } from "./use-grade-info";
import { useProvideProgress } from "./use-progress";
import { useQuizList } from "./use-quiz-list";

interface IStudentProvider {
  videos: VideoModelType[];
  classmates: UserModelType[];
  quizes: QuizModelType[];
  user: UserModelType;
  progress: ProgressModelType;
  title: string;
  grade: GradeModelType;
  updateTitle(title: string): void;
  updateProgress(): void;
  getVideoPercentage(video: VideoModelType): number;
}

const Context = React.createContext<null | IStudentProvider>(null);

export function useStudent() {
  return React.useContext(Context) as IStudentProvider;
}

export const StudentAppProvider = observer(({ children }: any) => {
  const { result, loading } = useUserGradeInfo();
  const { progress, refresh: updateProgress } = useProvideProgress();
  const [title, setTitle] = React.useState<string>("dashboard");
  const getVideoPercentage = useGetVideoPercentage(progress);
  const quizes = useQuizList(result ? (result.grade.id as string) : "");
  const videos = (): VideoModelType[] => {
    if (!result) return [];
    return result.grade.videos;
  };
  const app = useApp();
  const user = app.user as UserModelType;
  const classmates = (): UserModelType[] => {
    if (!result) return [];
    return result.grade.students
      .map((item) => item.student)
      .filter((item) => item.id !== user.id);
  };

  const ctx: IStudentProvider = {
    videos: videos(),
    classmates: classmates(),
    progress: progress as ProgressModelType,
    user,
    title,
    quizes,
    updateTitle: setTitle,
    updateProgress,
    getVideoPercentage,
    grade: result?.grade as GradeModelType,
  };
  const render = !loading && result && progress;
  return (
    <Context.Provider value={ctx}>{render ? children : null}</Context.Provider>
  );
});
