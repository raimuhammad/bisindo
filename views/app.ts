import { PaginatorInfoModelType } from "@root/models/PaginatorInfoModel";
export const paginator = {
  defaultInput: {
    first: 10,
    page: 1,
  },
  defaultPaginator: {
    currentPage: 0,
    hasMorePages: false,
    perPage: 0,
    total: 0,
    count: 0,
  } as PaginatorInfoModelType,
};
