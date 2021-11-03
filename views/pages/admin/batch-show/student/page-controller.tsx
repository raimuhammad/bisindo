import { useStudentGradePaginator } from "@service-provider/student-grade/paginator";
import { UsePaginator } from "@hooks/use-paginator";
import { Pagination } from '@mui/material';
import * as React from "react";

export const PageController = () => {
  const {
    go,
    paginator,
    loading,
  } = useStudentGradePaginator() as UsePaginator<any>;
  return (
    <Pagination
      onChange={(e, page) => go(page)}
      disabled={loading}
      color="primary"
      variant="outlined"
      count={paginator.lastPage}
    />
  );
};
