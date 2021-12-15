import type { PropsWithChildren } from "react";
import { Typography, Box, Container } from "@mui/material";

export const PageBanner = ({
  title,
  subtitle,
  children,
}: PropsWithChildren<Record<"title" | "subtitle", string>>) => {
  return (
    <Box
      sx={{
        px: [3, 5],
        pt: [3, 5],
        color: "primary.light",
        background: "#eef4fb",
      }}
    >
      <Container
        sx={{
          position: "relative",
        }}
      >
        <Typography sx={{ mb: 2, textTransform: "capitalize" }} variant="h4">
          {title}
        </Typography>
        <Typography sx={{ mb: 2 }}>{subtitle}</Typography>
        {children}
      </Container>
    </Box>
  );
};
