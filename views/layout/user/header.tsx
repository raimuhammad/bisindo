/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from "react";
import { Box, Typography, useTheme } from "@material-ui/core";
import { useStudent } from "@providers/student-app-provider";
import { useLayout } from "@root/layout";

export const Header = () => {
  const { appBarHeight } = useLayout();
  const theme = useTheme();
  const { title } = useStudent();
  return (
    <div>
      <Box
        // @ts-ignore
        paddingY={2}
        bgcolor={theme.palette.primary.main}
        color="white"
        position="sticky"
        top={appBarHeight}
      >
        <>
          <Typography
            style={{ textTransform: "capitalize" }}
            color="inherit"
            variant="h2"
          >
            {title}
          </Typography>
        </>
      </Box>
    </div>
  );
};
