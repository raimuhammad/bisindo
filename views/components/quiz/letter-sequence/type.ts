export type ItemState = {
  letter: string;
  originalIndex: number;
  currentIndex: number;
  imageUrl: string;
  id: string;
};
export interface ILetterCheck {
  isCorrect: boolean;
  answerArr: Array<ItemState>;
  questionArr: Array<ItemState>;
}
