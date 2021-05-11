import { GradeModelType } from "root/models/stores";

export interface UseGradeListPage {
  data: Array<GradeModelType> | null;
  loading: boolean;
  fetch(): void;
}

type ShowAction = "video" | "student" | "edit";

export interface UseGradeShowPage {
  model: GradeModelType;
  action: null | ShowAction;
  loading: boolean;
  fetch(args: { id: string }): void;
}
