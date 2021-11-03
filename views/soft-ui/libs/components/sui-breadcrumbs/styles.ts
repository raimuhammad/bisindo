import { makeStyles } from "@mui/styles";

export const useClasses = makeStyles(({ palette }: any) => ({
  breadcrumbs: {
    "& .MuiBreadcrumbs-separator": {
      color: ({ light }: any) => (light ? palette.white.main : palette.grey[600]),
    },
  },
}));
