export type ImageQuiz = {
  letter: string;
  image: string;
  id: string;
};
export type WithQuestion = {
  questionLetter: string;
} & ImageQuiz;
