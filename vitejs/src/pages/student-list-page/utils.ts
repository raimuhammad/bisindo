import { Context, ListPageProps } from "shared/list-page";
import { useContext } from "react";
import { UserModel } from "root/models/stores";

export function useStudentListPage() {
  return useContext(Context) as ListPageProps<typeof UserModel>;
}
