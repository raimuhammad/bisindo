/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { ObservableMap } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions, withTypedRefs } from "mst-gql"

import { UserModel, UserModelType } from "./UserModel"
import { userModelPrimitives, UserModelSelector } from "./UserModel.base"
import { VideoModel, VideoModelType } from "./VideoModel"
import { videoModelPrimitives, VideoModelSelector } from "./VideoModel.base"
import { GradeModel, GradeModelType } from "./GradeModel"
import { gradeModelPrimitives, GradeModelSelector } from "./GradeModel.base"
import { StudentGradeModel, StudentGradeModelType } from "./StudentGradeModel"
import { studentGradeModelPrimitives, StudentGradeModelSelector } from "./StudentGradeModel.base"
import { ProgressModel, ProgressModelType } from "./ProgressModel"
import { progressModelPrimitives, ProgressModelSelector } from "./ProgressModel.base"
import { QuizModel, QuizModelType } from "./QuizModel"
import { quizModelPrimitives, QuizModelSelector } from "./QuizModel.base"
import { MultipleChoiseModel, MultipleChoiseModelType } from "./MultipleChoiseModel"
import { multipleChoiseModelPrimitives, MultipleChoiseModelSelector } from "./MultipleChoiseModel.base"
import { QuizAnswerModel, QuizAnswerModelType } from "./QuizAnswerModel"
import { quizAnswerModelPrimitives, QuizAnswerModelSelector } from "./QuizAnswerModel.base"
import { VideoPaginatorModel, VideoPaginatorModelType } from "./VideoPaginatorModel"
import { videoPaginatorModelPrimitives, VideoPaginatorModelSelector } from "./VideoPaginatorModel.base"
import { PaginatorInfoModel, PaginatorInfoModelType } from "./PaginatorInfoModel"
import { paginatorInfoModelPrimitives, PaginatorInfoModelSelector } from "./PaginatorInfoModel.base"
import { QuizPaginatorModel, QuizPaginatorModelType } from "./QuizPaginatorModel"
import { quizPaginatorModelPrimitives, QuizPaginatorModelSelector } from "./QuizPaginatorModel.base"
import { StudentGradePaginatorModel, StudentGradePaginatorModelType } from "./StudentGradePaginatorModel"
import { studentGradePaginatorModelPrimitives, StudentGradePaginatorModelSelector } from "./StudentGradePaginatorModel.base"
import { GradePaginatorModel, GradePaginatorModelType } from "./GradePaginatorModel"
import { gradePaginatorModelPrimitives, GradePaginatorModelSelector } from "./GradePaginatorModel.base"
import { DiscussionPaginatorModel, DiscussionPaginatorModelType } from "./DiscussionPaginatorModel"
import { discussionPaginatorModelPrimitives, DiscussionPaginatorModelSelector } from "./DiscussionPaginatorModel.base"
import { DiscussionModel, DiscussionModelType } from "./DiscussionModel"
import { discussionModelPrimitives, DiscussionModelSelector } from "./DiscussionModel.base"
import { DiscussionReplyModel, DiscussionReplyModelType } from "./DiscussionReplyModel"
import { discussionReplyModelPrimitives, DiscussionReplyModelSelector } from "./DiscussionReplyModel.base"
import { VideoGradeModel, VideoGradeModelType } from "./VideoGradeModel"
import { videoGradeModelPrimitives, VideoGradeModelSelector } from "./VideoGradeModel.base"
import { SimplePaginatorInfoModel, SimplePaginatorInfoModelType } from "./SimplePaginatorInfoModel"
import { simplePaginatorInfoModelPrimitives, SimplePaginatorInfoModelSelector } from "./SimplePaginatorInfoModel.base"
import { PageInfoModel, PageInfoModelType } from "./PageInfoModel"
import { pageInfoModelPrimitives, PageInfoModelSelector } from "./PageInfoModel.base"


import { AppRole } from "./AppRoleEnum"
import { QuizType } from "./QuizTypeEnum"
import { SortOrder } from "./SortOrderEnum"
import { Trashed } from "./TrashedEnum"

export type MultipleChoiseInput = {
  index: number
  image?: any
  text?: string
}
export type CreateQuizAnswerInput = {
  quiz_id: string
  meta_data: QuizAnswerMetaInput
}
export type QuizAnswerMetaInput = {
  selected?: string
  to?: string[]
  from?: string[]
  items?: string[]
}
export type CreateUserInput = {
  name: string
  email: string
  grade_id: string
}
export type OrderByClause = {
  column: string
  order: SortOrder
}
/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  users: ObservableMap<string, UserModelType>,
  videos: ObservableMap<string, VideoModelType>,
  grades: ObservableMap<string, GradeModelType>,
  studentGrades: ObservableMap<string, StudentGradeModelType>,
  progresses: ObservableMap<string, ProgressModelType>,
  quizzes: ObservableMap<string, QuizModelType>,
  multipleChoises: ObservableMap<string, MultipleChoiseModelType>,
  quizAnswers: ObservableMap<string, QuizAnswerModelType>,
  discussions: ObservableMap<string, DiscussionModelType>,
  discussionReplies: ObservableMap<string, DiscussionReplyModelType>,
  videoGrades: ObservableMap<string, VideoGradeModelType>
}


/**
* Enums for the names of base graphql actions
*/
export enum RootStoreBaseQueries {
queryAuth="queryAuth",
queryVideo="queryVideo",
queryGetVideoByGrade="queryGetVideoByGrade",
queryVideoNotInGrade="queryVideoNotInGrade",
queryQuizAnswers="queryQuizAnswers",
queryIsUniqueEmail="queryIsUniqueEmail",
queryUserByGrade="queryUserByGrade",
queryVideoByGrade="queryVideoByGrade",
queryQuizByGrade="queryQuizByGrade",
queryProgressByGrade="queryProgressByGrade",
queryGradeAll="queryGradeAll",
queryGradeById="queryGradeById",
queryGradeQuizes="queryGradeQuizes",
queryProgress="queryProgress",
queryGradeByAuth="queryGradeByAuth",
queryStudentProgress="queryStudentProgress",
queryVideos="queryVideos",
queryQuizes="queryQuizes",
queryStudents="queryStudents",
queryGrades="queryGrades",
queryGetStudentByGrade="queryGetStudentByGrade",
queryStudentGrades="queryStudentGrades",
queryDiscussion="queryDiscussion"
}
export enum RootStoreBaseMutations {
mutateLogin="mutateLogin",
mutateLogout="mutateLogout",
mutateVideo="mutateVideo",
mutateVideoUpdate="mutateVideoUpdate",
mutateVideoDelete="mutateVideoDelete",
mutateQuizDelete="mutateQuizDelete",
mutateMultipleChoiseQuiz="mutateMultipleChoiseQuiz",
mutateImageMatchQuiz="mutateImageMatchQuiz",
mutateLetterSequenceQuiz="mutateLetterSequenceQuiz",
mutateQuizAnswer="mutateQuizAnswer",
mutateUser="mutateUser",
mutateLoginWithInvitation="mutateLoginWithInvitation",
mutateUserChangeUserPassword="mutateUserChangeUserPassword",
mutateSentInvitation="mutateSentInvitation",
mutateUserEdit="mutateUserEdit",
mutateUserActivation="mutateUserActivation",
mutateGrade="mutateGrade",
mutateGradeEdit="mutateGradeEdit",
mutateAddVideoInGrade="mutateAddVideoInGrade",
mutateUpdateVideoProgress="mutateUpdateVideoProgress",
mutateUpdateQuizProgress="mutateUpdateQuizProgress",
mutateDiscussion="mutateDiscussion",
mutateDiscussionReply="mutateDiscussionReply",
mutateUpdateDiscussion="mutateUpdateDiscussion",
mutateUpdateDiscussionReply="mutateUpdateDiscussionReply",
mutateDeleteDiscussion="mutateDeleteDiscussion",
mutateDeleteDiscussionReply="mutateDeleteDiscussionReply"
}

/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = withTypedRefs<Refs>()(MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['User', () => UserModel], ['Video', () => VideoModel], ['Grade', () => GradeModel], ['StudentGrade', () => StudentGradeModel], ['Progress', () => ProgressModel], ['Quiz', () => QuizModel], ['MultipleChoise', () => MultipleChoiseModel], ['QuizAnswer', () => QuizAnswerModel], ['VideoPaginator', () => VideoPaginatorModel], ['PaginatorInfo', () => PaginatorInfoModel], ['QuizPaginator', () => QuizPaginatorModel], ['StudentGradePaginator', () => StudentGradePaginatorModel], ['GradePaginator', () => GradePaginatorModel], ['DiscussionPaginator', () => DiscussionPaginatorModel], ['Discussion', () => DiscussionModel], ['DiscussionReply', () => DiscussionReplyModel], ['VideoGrade', () => VideoGradeModel], ['SimplePaginatorInfo', () => SimplePaginatorInfoModel], ['PageInfo', () => PageInfoModel]], ['User', 'Video', 'Grade', 'StudentGrade', 'Progress', 'Quiz', 'MultipleChoise', 'QuizAnswer', 'Discussion', 'DiscussionReply', 'VideoGrade'], "js"))
  .props({
    users: types.optional(types.map(types.late((): any => UserModel)), {}),
    videos: types.optional(types.map(types.late((): any => VideoModel)), {}),
    grades: types.optional(types.map(types.late((): any => GradeModel)), {}),
    studentGrades: types.optional(types.map(types.late((): any => StudentGradeModel)), {}),
    progresses: types.optional(types.map(types.late((): any => ProgressModel)), {}),
    quizzes: types.optional(types.map(types.late((): any => QuizModel)), {}),
    multipleChoises: types.optional(types.map(types.late((): any => MultipleChoiseModel)), {}),
    quizAnswers: types.optional(types.map(types.late((): any => QuizAnswerModel)), {}),
    discussions: types.optional(types.map(types.late((): any => DiscussionModel)), {}),
    discussionReplies: types.optional(types.map(types.late((): any => DiscussionReplyModel)), {}),
    videoGrades: types.optional(types.map(types.late((): any => VideoGradeModel)), {})
  })
  .actions(self => ({
    queryAuth(variables?: {  }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ auth: UserModelType}>(`query auth { auth {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryVideo(variables: { id: string }, resultSelector: string | ((qb: VideoModelSelector) => VideoModelSelector) = videoModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ video: VideoModelType}>(`query video($id: ID!) { video(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new VideoModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryGetVideoByGrade(variables: { gradeId: string }, resultSelector: string | ((qb: VideoModelSelector) => VideoModelSelector) = videoModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ getVideoByGrade: VideoModelType[]}>(`query getVideoByGrade($gradeId: ID!) { getVideoByGrade(grade_id: $gradeId) {
        ${typeof resultSelector === "function" ? resultSelector(new VideoModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryVideoNotInGrade(variables: { id: string }, resultSelector: string | ((qb: VideoModelSelector) => VideoModelSelector) = videoModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ videoNotInGrade: VideoModelType[]}>(`query videoNotInGrade($id: ID!) { videoNotInGrade(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new VideoModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryQuizAnswers(variables?: {  }, resultSelector: string | ((qb: QuizAnswerModelSelector) => QuizAnswerModelSelector) = quizAnswerModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ quizAnswers: QuizAnswerModelType[]}>(`query quizAnswers { quizAnswers {
        ${typeof resultSelector === "function" ? resultSelector(new QuizAnswerModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryIsUniqueEmail(variables: { email: string }, options: QueryOptions = {}) {
      return self.query<{ isUniqueEmail: boolean }>(`query isUniqueEmail($email: String!) { isUniqueEmail(email: $email) }`, variables, options)
    },
    queryUserByGrade(variables: { gradeId: string }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ userByGrade: UserModelType[]}>(`query userByGrade($gradeId: ID!) { userByGrade(grade_id: $gradeId) {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryVideoByGrade(variables: { gradeId: string }, resultSelector: string | ((qb: VideoModelSelector) => VideoModelSelector) = videoModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ videoByGrade: VideoModelType[]}>(`query videoByGrade($gradeId: ID!) { videoByGrade(grade_id: $gradeId) {
        ${typeof resultSelector === "function" ? resultSelector(new VideoModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryQuizByGrade(variables: { gradeId: string }, resultSelector: string | ((qb: QuizModelSelector) => QuizModelSelector) = quizModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ quizByGrade: QuizModelType[]}>(`query quizByGrade($gradeId: ID!) { quizByGrade(grade_id: $gradeId) {
        ${typeof resultSelector === "function" ? resultSelector(new QuizModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryProgressByGrade(variables: { gradeId: string }, resultSelector: string | ((qb: ProgressModelSelector) => ProgressModelSelector) = progressModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ progressByGrade: ProgressModelType[]}>(`query progressByGrade($gradeId: ID!) { progressByGrade(grade_id: $gradeId) {
        ${typeof resultSelector === "function" ? resultSelector(new ProgressModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryGradeAll(variables?: {  }, resultSelector: string | ((qb: GradeModelSelector) => GradeModelSelector) = gradeModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ gradeAll: GradeModelType[]}>(`query gradeAll { gradeAll {
        ${typeof resultSelector === "function" ? resultSelector(new GradeModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryGradeById(variables: { id: string }, resultSelector: string | ((qb: GradeModelSelector) => GradeModelSelector) = gradeModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ gradeById: GradeModelType}>(`query gradeById($id: ID!) { gradeById(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new GradeModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryGradeQuizes(variables: { gradeId: string }, resultSelector: string | ((qb: QuizModelSelector) => QuizModelSelector) = quizModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ gradeQuizes: QuizModelType[]}>(`query gradeQuizes($gradeId: ID!) { gradeQuizes(grade_id: $gradeId) {
        ${typeof resultSelector === "function" ? resultSelector(new QuizModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryProgress(variables?: {  }, resultSelector: string | ((qb: ProgressModelSelector) => ProgressModelSelector) = progressModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ progress: ProgressModelType}>(`query progress { progress {
        ${typeof resultSelector === "function" ? resultSelector(new ProgressModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryGradeByAuth(variables?: {  }, resultSelector: string | ((qb: StudentGradeModelSelector) => StudentGradeModelSelector) = studentGradeModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ gradeByAuth: StudentGradeModelType}>(`query gradeByAuth { gradeByAuth {
        ${typeof resultSelector === "function" ? resultSelector(new StudentGradeModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryStudentProgress(variables: { userId: string }, resultSelector: string | ((qb: ProgressModelSelector) => ProgressModelSelector) = progressModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ studentProgress: ProgressModelType}>(`query studentProgress($userId: ID!) { studentProgress(user_id: $userId) {
        ${typeof resultSelector === "function" ? resultSelector(new ProgressModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryVideos(variables: { gradeId?: string, search?: string, first?: number, page?: number }, resultSelector: string | ((qb: VideoPaginatorModelSelector) => VideoPaginatorModelSelector) = videoPaginatorModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ videos: VideoPaginatorModelType}>(`query videos($gradeId: ID, $search: String, $first: Int, $page: Int) { videos(grade_id: $gradeId, search: $search, first: $first, page: $page) {
        ${typeof resultSelector === "function" ? resultSelector(new VideoPaginatorModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryQuizes(variables: { videoId: string, first?: number, page?: number }, resultSelector: string | ((qb: QuizPaginatorModelSelector) => QuizPaginatorModelSelector) = quizPaginatorModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ quizes: QuizPaginatorModelType}>(`query quizes($videoId: String!, $first: Int, $page: Int) { quizes(videoId: $videoId, first: $first, page: $page) {
        ${typeof resultSelector === "function" ? resultSelector(new QuizPaginatorModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryStudents(variables: { search?: string, gradeId?: string, first?: number, page?: number }, resultSelector: string | ((qb: StudentGradePaginatorModelSelector) => StudentGradePaginatorModelSelector) = studentGradePaginatorModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ students: StudentGradePaginatorModelType}>(`query students($search: String, $gradeId: String, $first: Int, $page: Int) { students(search: $search, grade_id: $gradeId, first: $first, page: $page) {
        ${typeof resultSelector === "function" ? resultSelector(new StudentGradePaginatorModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryGrades(variables: { search?: string, first?: number, page?: number }, resultSelector: string | ((qb: GradePaginatorModelSelector) => GradePaginatorModelSelector) = gradePaginatorModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ grades: GradePaginatorModelType}>(`query grades($search: String, $first: Int, $page: Int) { grades(search: $search, first: $first, page: $page) {
        ${typeof resultSelector === "function" ? resultSelector(new GradePaginatorModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryGetStudentByGrade(variables: { gradeId: string, first?: number, page?: number }, resultSelector: string | ((qb: StudentGradePaginatorModelSelector) => StudentGradePaginatorModelSelector) = studentGradePaginatorModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ getStudentByGrade: StudentGradePaginatorModelType}>(`query getStudentByGrade($gradeId: ID!, $first: Int, $page: Int) { getStudentByGrade(grade_id: $gradeId, first: $first, page: $page) {
        ${typeof resultSelector === "function" ? resultSelector(new StudentGradePaginatorModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryStudentGrades(variables: { gradeId?: string, search?: string, first?: number, page?: number }, resultSelector: string | ((qb: StudentGradePaginatorModelSelector) => StudentGradePaginatorModelSelector) = studentGradePaginatorModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ studentGrades: StudentGradePaginatorModelType}>(`query studentGrades($gradeId: String, $search: String, $first: Int, $page: Int) { studentGrades(grade_id: $gradeId, search: $search, first: $first, page: $page) {
        ${typeof resultSelector === "function" ? resultSelector(new StudentGradePaginatorModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryDiscussion(variables: { gradeId: string, first?: number, page?: number }, resultSelector: string | ((qb: DiscussionPaginatorModelSelector) => DiscussionPaginatorModelSelector) = discussionPaginatorModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ discussion: DiscussionPaginatorModelType}>(`query discussion($gradeId: ID!, $first: Int, $page: Int) { discussion(grade_id: $gradeId, first: $first, page: $page) {
        ${typeof resultSelector === "function" ? resultSelector(new DiscussionPaginatorModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    mutateLogin(variables: { email: string, password: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ login: boolean }>(`mutation login($email: String!, $password: String!) { login(email: $email, password: $password) }`, variables, optimisticUpdate)
    },
    mutateLogout(variables?: {  }, optimisticUpdate?: () => void) {
      return self.mutate<{ logout: boolean }>(`mutation logout { logout }`, variables, optimisticUpdate)
    },
    mutateVideo(variables: { gradeId: string, title: string, caption: string, description: string, content: any }, resultSelector: string | ((qb: VideoModelSelector) => VideoModelSelector) = videoModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ video: VideoModelType}>(`mutation video($gradeId: String!, $title: String!, $caption: String!, $description: String!, $content: Upload!) { video(grade_id: $gradeId, title: $title, caption: $caption, description: $description, content: $content) {
        ${typeof resultSelector === "function" ? resultSelector(new VideoModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateVideoUpdate(variables: { id: string, title: string, caption: string, description: string }, resultSelector: string | ((qb: VideoModelSelector) => VideoModelSelector) = videoModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ videoUpdate: VideoModelType}>(`mutation videoUpdate($id: ID!, $title: String!, $caption: String!, $description: String!) { videoUpdate(id: $id, title: $title, caption: $caption, description: $description) {
        ${typeof resultSelector === "function" ? resultSelector(new VideoModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateVideoDelete(variables: { id: string }, resultSelector: string | ((qb: VideoModelSelector) => VideoModelSelector) = videoModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ videoDelete: VideoModelType}>(`mutation videoDelete($id: ID!) { videoDelete(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new VideoModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateQuizDelete(variables: { id: string }, resultSelector: string | ((qb: QuizModelSelector) => QuizModelSelector) = quizModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ quizDelete: QuizModelType}>(`mutation quizDelete($id: ID!) { quizDelete(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new QuizModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateMultipleChoiseQuiz(variables: { videoId: string, showAt: number, options: MultipleChoiseInput[], answer: number, additionalFile?: any, question: string }, resultSelector: string | ((qb: QuizModelSelector) => QuizModelSelector) = quizModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ multipleChoiseQuiz: QuizModelType}>(`mutation multipleChoiseQuiz($videoId: String!, $showAt: Int!, $options: [MultipleChoiseInput!]!, $answer: Int!, $additionalFile: Upload, $question: String!) { multipleChoiseQuiz(video_id: $videoId, show_at: $showAt, options: $options, answer: $answer, additionalFile: $additionalFile, question: $question) {
        ${typeof resultSelector === "function" ? resultSelector(new QuizModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateImageMatchQuiz(variables: { videoId: string, showAt: number, text: string }, resultSelector: string | ((qb: QuizModelSelector) => QuizModelSelector) = quizModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ imageMatchQuiz: QuizModelType}>(`mutation imageMatchQuiz($videoId: String!, $showAt: Int!, $text: String!) { imageMatchQuiz(video_id: $videoId, show_at: $showAt, text: $text) {
        ${typeof resultSelector === "function" ? resultSelector(new QuizModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateLetterSequenceQuiz(variables: { videoId: string, showAt: number, text: string }, resultSelector: string | ((qb: QuizModelSelector) => QuizModelSelector) = quizModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ letterSequenceQuiz: QuizModelType}>(`mutation letterSequenceQuiz($videoId: String!, $showAt: Int!, $text: String!) { letterSequenceQuiz(video_id: $videoId, show_at: $showAt, text: $text) {
        ${typeof resultSelector === "function" ? resultSelector(new QuizModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateQuizAnswer(variables: { args: CreateQuizAnswerInput }, resultSelector: string | ((qb: QuizAnswerModelSelector) => QuizAnswerModelSelector) = quizAnswerModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ quizAnswer: QuizAnswerModelType}>(`mutation quizAnswer($args: CreateQuizAnswerInput!) { quizAnswer(args: $args) {
        ${typeof resultSelector === "function" ? resultSelector(new QuizAnswerModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUser(variables: { args: CreateUserInput }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ user: UserModelType}>(`mutation user($args: CreateUserInput!) { user(args: $args) {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateLoginWithInvitation(variables: { invitation: string, password: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ loginWithInvitation: boolean }>(`mutation loginWithInvitation($invitation: String!, $password: String!) { loginWithInvitation(invitation: $invitation, password: $password) }`, variables, optimisticUpdate)
    },
    mutateUserChangeUserPassword(variables: { password: string, passwordConfirmation: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ userChangeUserPassword: boolean }>(`mutation userChangeUserPassword($password: String!, $passwordConfirmation: String!) { userChangeUserPassword(password: $password, password_confirmation: $passwordConfirmation) }`, variables, optimisticUpdate)
    },
    mutateSentInvitation(variables: { id: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ sentInvitation: boolean }>(`mutation sentInvitation($id: String!) { sentInvitation(id: $id) }`, variables, optimisticUpdate)
    },
    mutateUserEdit(variables: { id: string, name?: string, email?: string }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ userEdit: UserModelType}>(`mutation userEdit($id: String!, $name: String, $email: String) { userEdit(id: $id, name: $name, email: $email) {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUserActivation(variables: { id: string, password: string }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ userActivation: UserModelType}>(`mutation userActivation($id: String!, $password: String!) { userActivation(id: $id, password: $password) {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateGrade(variables: { name: string }, resultSelector: string | ((qb: GradeModelSelector) => GradeModelSelector) = gradeModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ grade: GradeModelType}>(`mutation grade($name: String!) { grade(name: $name) {
        ${typeof resultSelector === "function" ? resultSelector(new GradeModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateGradeEdit(variables: { id: string, name?: string }, resultSelector: string | ((qb: GradeModelSelector) => GradeModelSelector) = gradeModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ gradeEdit: GradeModelType}>(`mutation gradeEdit($id: ID!, $name: String) { gradeEdit(id: $id, name: $name) {
        ${typeof resultSelector === "function" ? resultSelector(new GradeModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateAddVideoInGrade(variables: { videoId: string, gradeId: string }, resultSelector: string | ((qb: VideoGradeModelSelector) => VideoGradeModelSelector) = videoGradeModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ addVideoInGrade: VideoGradeModelType}>(`mutation addVideoInGrade($videoId: ID!, $gradeId: ID!) { addVideoInGrade(video_id: $videoId, grade_id: $gradeId) {
        ${typeof resultSelector === "function" ? resultSelector(new VideoGradeModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdateVideoProgress(variables: { videoId: string }, resultSelector: string | ((qb: ProgressModelSelector) => ProgressModelSelector) = progressModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ updateVideoProgress: ProgressModelType}>(`mutation updateVideoProgress($videoId: ID!) { updateVideoProgress(video_id: $videoId) {
        ${typeof resultSelector === "function" ? resultSelector(new ProgressModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdateQuizProgress(variables: { quizId: string, correct: boolean }, resultSelector: string | ((qb: ProgressModelSelector) => ProgressModelSelector) = progressModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ updateQuizProgress: ProgressModelType}>(`mutation updateQuizProgress($quizId: ID!, $correct: Boolean!) { updateQuizProgress(quiz_id: $quizId, correct: $correct) {
        ${typeof resultSelector === "function" ? resultSelector(new ProgressModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateDiscussion(variables: { gradeId: string, userId: string, content: string }, resultSelector: string | ((qb: DiscussionModelSelector) => DiscussionModelSelector) = discussionModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ discussion: DiscussionModelType}>(`mutation discussion($gradeId: ID!, $userId: ID!, $content: String!) { discussion(grade_id: $gradeId, user_id: $userId, content: $content) {
        ${typeof resultSelector === "function" ? resultSelector(new DiscussionModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateDiscussionReply(variables: { userId: string, discussionId: string, content: string }, resultSelector: string | ((qb: DiscussionReplyModelSelector) => DiscussionReplyModelSelector) = discussionReplyModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ discussionReply: DiscussionReplyModelType}>(`mutation discussionReply($userId: ID!, $discussionId: ID!, $content: String!) { discussionReply(user_id: $userId, discussion_id: $discussionId, content: $content) {
        ${typeof resultSelector === "function" ? resultSelector(new DiscussionReplyModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdateDiscussion(variables: { id: string, content: string }, resultSelector: string | ((qb: DiscussionModelSelector) => DiscussionModelSelector) = discussionModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ updateDiscussion: DiscussionModelType}>(`mutation updateDiscussion($id: ID!, $content: String!) { updateDiscussion(id: $id, content: $content) {
        ${typeof resultSelector === "function" ? resultSelector(new DiscussionModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUpdateDiscussionReply(variables: { id: string, content: string }, resultSelector: string | ((qb: DiscussionReplyModelSelector) => DiscussionReplyModelSelector) = discussionReplyModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ updateDiscussionReply: DiscussionReplyModelType}>(`mutation updateDiscussionReply($id: ID!, $content: String!) { updateDiscussionReply(id: $id, content: $content) {
        ${typeof resultSelector === "function" ? resultSelector(new DiscussionReplyModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateDeleteDiscussion(variables: { id: string }, resultSelector: string | ((qb: DiscussionModelSelector) => DiscussionModelSelector) = discussionModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ deleteDiscussion: DiscussionModelType}>(`mutation deleteDiscussion($id: ID!) { deleteDiscussion(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new DiscussionModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateDeleteDiscussionReply(variables: { id: string }, resultSelector: string | ((qb: DiscussionReplyModelSelector) => DiscussionReplyModelSelector) = discussionReplyModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ deleteDiscussionReply: DiscussionReplyModelType}>(`mutation deleteDiscussionReply($id: ID!) { deleteDiscussionReply(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new DiscussionReplyModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
  })))
