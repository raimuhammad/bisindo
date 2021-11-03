import type { PropsWithChildren } from "react";
import { Box, Divider } from "@mui/material";
import { SuiTypography } from "@root/soft-ui/libs/components/sui-typography";

type Props = {
  title: string;
};

export const Section = ({ title, children }: PropsWithChildren<Props>) => {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <SuiTypography variant="h3">{title}</SuiTypography>
      <Divider sx={{ marginY: 2 }} />
      {children}
    </Box>
  );
};
