import * as React from "react";
import {
  ProgressModelType,
  QuizModelType,
  UserModelType,
  VideoModelType,
} from "@root/models";
import { rootStore } from "@providers/app-provider";
import { withRouter } from "react-router-dom";

type State = {
  videos: VideoModelType[];
  quizes: QuizModelType[];
  students: UserModelType[];
  progresses: ProgressModelType[];
  loading: boolean;
  student: null | UserModelType;
};

type IQuizCheck = State & {
  getQuizList(video: VideoModelType): QuizModelType[];
  updateStudent(student: UserModelType): void;
  getQuizStatus(
    quiz: QuizModelType
  ): ProgressModelType["quizHistories"][number] | null | undefined;
};

const Context = React.createContext<null | IQuizCheck>(null);

export const useQuizCheck = () => {
  const ctx = React.useContext(Context);
  if (!ctx) {
    throw new Error("Context value is null");
  }
  return ctx as IQuizCheck;
};

class DataProvider extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      quizes: [],
      videos: [],
      students: [],
      progresses: [],
      student: null,
    };
  }

  async componentDidMount() {
    const args = { gradeId: this.props.match.params.id };
    const queryUsers = await rootStore.queryUserByGrade(args).currentPromise();
    const queryVideos = await rootStore
      .queryVideoByGrade(args)
      .currentPromise();
    const queryQuiz = await rootStore.queryQuizByGrade(args).currentPromise();
    const queryProgress = await rootStore
      .queryProgressByGrade(args)
      .currentPromise();
    this.setState({
      students: queryUsers.userByGrade,
      videos: queryVideos.videoByGrade,
      quizes: queryQuiz.quizByGrade,
      progresses: queryProgress.progressByGrade,
      loading: false,
      student: queryUsers.userByGrade.length ? queryUsers.userByGrade[0] : null,
    });
  }

  getQuizList = (video: VideoModelType) => {
    return this.state.quizes.filter((item) => item.video_id === video.id);
  };

  getQuizStatus = (quiz: QuizModelType) => {
    const progress = this.state.progresses.find((item) => {
      if (!this.state.student) {
        return false;
      }
      return item.user_id === this.state.student.id;
    });
    if (!progress) {
      return null;
    }
    const check = progress.quizHistories.find(
      (item) => item.id.toString() === quiz.id.toString()
    );
    return check;
  };

  updateStudent = (student: UserModelType) => {
    this.setState({
      student,
    });
  };
  getContext = (): IQuizCheck => ({
    ...this.state,
    getQuizStatus: this.getQuizStatus,
    getQuizList: this.getQuizList,
    updateStudent: this.updateStudent,
  });
  render() {
    return (
      <Context.Provider value={this.getContext()}>
        {this.state.loading ? null : this.props.children}
      </Context.Provider>
    );
  }
}

export const Provider = withRouter(DataProvider);
