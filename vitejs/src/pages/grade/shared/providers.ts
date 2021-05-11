import { useFetchQuery } from "hooks/use-fetch-query";
import { GradeModelType } from "root/models/stores";
import { RootStoreBaseQueries } from "root-model";
import { createContext, useContext } from "react";
import { UseGradeListPage, UseGradeShowPage } from "./type";
/**
 * Mengambil data grade dari server graphql
 * untuk hamalam /grade
 * component: pages/grade/list/list-page.tsx
 */
export function useGradeListPageProvider(): UseGradeListPage {
  const { data, fetch, loading } = useFetchQuery<Array<GradeModelType>>({
    queryKey: RootStoreBaseQueries.queryGrades,
    initialValue: [],
  });
  return {
    data,
    fetch,
    loading,
  };
}
/**
 * Mengambil data grade dari server graphql berdasarkan id
 * untuk halaman /grade/:grade_id
 * component: pages/grade/show/show-page.tsx
 */
export function useGradeShowPageProvider(): UseGradeShowPage {
  const { data, loading, fetch } = useFetchQuery<
    GradeModelType,
    { id: string }
  >({
    queryKey: RootStoreBaseQueries.queryGradeById,
  });
  return {
    action: null,
    model: data as GradeModelType,
    loading,
    fetch,
  };
}
export const ListContext = createContext<UseGradeListPage | null>(null);
export const ShowContext = createContext<UseGradeShowPage | null>(null);

export function useListPage(): UseGradeListPage {
  return useContext(ListContext) as UseGradeListPage;
}
