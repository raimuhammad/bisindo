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
import { QuizModel, QuizModelType } from "./QuizModel"
import { quizModelPrimitives, QuizModelSelector } from "./QuizModel.base"
import { QuizAnswerModel, QuizAnswerModelType } from "./QuizAnswerModel"
import { quizAnswerModelPrimitives, QuizAnswerModelSelector } from "./QuizAnswerModel.base"
import { PageInfoModel, PageInfoModelType } from "./PageInfoModel"
import { pageInfoModelPrimitives, PageInfoModelSelector } from "./PageInfoModel.base"
import { PaginatorInfoModel, PaginatorInfoModelType } from "./PaginatorInfoModel"
import { paginatorInfoModelPrimitives, PaginatorInfoModelSelector } from "./PaginatorInfoModel.base"


import { AppRole } from "./AppRoleEnum"
import { QuizType } from "./QuizTypeEnum"
import { SortOrder } from "./SortOrderEnum"
import { Trashed } from "./TrashedEnum"

export type CreateVideoInput = {
  title: string
  caption: string
  description: any
  content: any
}
export type UpdateVideoInput = {
  title?: string
  caption?: string
  description?: any
  content?: any
}
export type CreateQuizInput = {
  video_id: string
  show_at: number
  type: QuizType
  meta_data?: MetaDataInput
}
export type MetaDataInput = {
  letters?: string
  word?: string
  question?: string
  options?: string[]
  question_answer?: string
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
}
export type OrderByClause = {
  column: string
  order: SortOrder
}
/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  users: ObservableMap<string, UserModelType>,
  videos: ObservableMap<string, VideoModelType>,
  quizzes: ObservableMap<string, QuizModelType>,
  quizAnswers: ObservableMap<string, QuizAnswerModelType>
}


/**
* Enums for the names of base graphql actions
*/
export enum RootStoreBaseQueries {
queryAuth="queryAuth",
queryVideos="queryVideos",
queryQuizzes="queryQuizzes",
queryQuizVideo="queryQuizVideo",
queryQuizAnswers="queryQuizAnswers",
queryStudents="queryStudents"
}
export enum RootStoreBaseMutations {
mutateLogin="mutateLogin",
mutateLogout="mutateLogout",
mutateVideo="mutateVideo",
mutateVideoUpdate="mutateVideoUpdate",
mutateQuiz="mutateQuiz",
mutateQuizDelete="mutateQuizDelete",
mutateQuizAnswer="mutateQuizAnswer",
mutateUser="mutateUser",
mutateLoginWithInvitation="mutateLoginWithInvitation",
mutateUserChangeUserPassword="mutateUserChangeUserPassword",
mutateSentInvitation="mutateSentInvitation"
}

/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = withTypedRefs<Refs>()(MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['User', () => UserModel], ['Video', () => VideoModel], ['Quiz', () => QuizModel], ['QuizAnswer', () => QuizAnswerModel], ['PageInfo', () => PageInfoModel], ['PaginatorInfo', () => PaginatorInfoModel]], ['User', 'Video', 'Quiz', 'QuizAnswer'], "js"))
  .props({
    users: types.optional(types.map(types.late((): any => UserModel)), {}),
    videos: types.optional(types.map(types.late((): any => VideoModel)), {}),
    quizzes: types.optional(types.map(types.late((): any => QuizModel)), {}),
    quizAnswers: types.optional(types.map(types.late((): any => QuizAnswerModel)), {})
  })
  .actions(self => ({
    queryAuth(variables?: {  }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ auth: UserModelType}>(`query auth { auth {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryVideos(variables?: {  }, resultSelector: string | ((qb: VideoModelSelector) => VideoModelSelector) = videoModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ videos: VideoModelType[]}>(`query videos { videos {
        ${typeof resultSelector === "function" ? resultSelector(new VideoModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryQuizzes(variables?: {  }, resultSelector: string | ((qb: QuizModelSelector) => QuizModelSelector) = quizModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ quizzes: QuizModelType[]}>(`query quizzes { quizzes {
        ${typeof resultSelector === "function" ? resultSelector(new QuizModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryQuizVideo(variables: { videoId: string }, resultSelector: string | ((qb: QuizModelSelector) => QuizModelSelector) = quizModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ quizVideo: QuizModelType[]}>(`query quizVideo($videoId: String!) { quizVideo(video_id: $videoId) {
        ${typeof resultSelector === "function" ? resultSelector(new QuizModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryQuizAnswers(variables?: {  }, resultSelector: string | ((qb: QuizAnswerModelSelector) => QuizAnswerModelSelector) = quizAnswerModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ quizAnswers: QuizAnswerModelType[]}>(`query quizAnswers { quizAnswers {
        ${typeof resultSelector === "function" ? resultSelector(new QuizAnswerModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryStudents(variables?: {  }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ students: UserModelType[]}>(`query students { students {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    mutateLogin(variables: { email: string, password: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ login: boolean }>(`mutation login($email: String!, $password: String!) { login(email: $email, password: $password) }`, variables, optimisticUpdate)
    },
    mutateLogout(variables?: {  }, optimisticUpdate?: () => void) {
      return self.mutate<{ logout: boolean }>(`mutation logout { logout }`, variables, optimisticUpdate)
    },
    mutateVideo(variables: { args: CreateVideoInput }, resultSelector: string | ((qb: VideoModelSelector) => VideoModelSelector) = videoModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ video: VideoModelType}>(`mutation video($args: CreateVideoInput!) { video(args: $args) {
        ${typeof resultSelector === "function" ? resultSelector(new VideoModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateVideoUpdate(variables: { id: string, args: UpdateVideoInput }, resultSelector: string | ((qb: VideoModelSelector) => VideoModelSelector) = videoModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ videoUpdate: VideoModelType}>(`mutation videoUpdate($id: ID!, $args: UpdateVideoInput!) { videoUpdate(id: $id, args: $args) {
        ${typeof resultSelector === "function" ? resultSelector(new VideoModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateQuiz(variables: { args: CreateQuizInput }, resultSelector: string | ((qb: QuizModelSelector) => QuizModelSelector) = quizModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ quiz: QuizModelType}>(`mutation quiz($args: CreateQuizInput!) { quiz(args: $args) {
        ${typeof resultSelector === "function" ? resultSelector(new QuizModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateQuizDelete(variables: { id: string }, resultSelector: string | ((qb: QuizModelSelector) => QuizModelSelector) = quizModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ quizDelete: QuizModelType}>(`mutation quizDelete($id: ID!) { quizDelete(id: $id) {
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
    mutateLoginWithInvitation(variables: { invitation?: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ loginWithInvitation: boolean }>(`mutation loginWithInvitation($invitation: String) { loginWithInvitation(invitation: $invitation) }`, variables, optimisticUpdate)
    },
    mutateUserChangeUserPassword(variables: { password: string, passwordConfirmation: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ userChangeUserPassword: boolean }>(`mutation userChangeUserPassword($password: String!, $passwordConfirmation: String!) { userChangeUserPassword(password: $password, password_confirmation: $passwordConfirmation) }`, variables, optimisticUpdate)
    },
    mutateSentInvitation(variables: { id: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ sentInvitation: boolean }>(`mutation sentInvitation($id: String!) { sentInvitation(id: $id) }`, variables, optimisticUpdate)
    },
  })))
