export type ViewerOption = {
  image?: string;
  text?: string;
  index: number;
  id: string;
};

export type ViewerType = {
  question: string;
  additional_image: string;
  choises: ViewerOption[];
  questionAnswer?: number;
};
