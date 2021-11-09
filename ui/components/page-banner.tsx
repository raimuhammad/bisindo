import type { PropsWithChildren } from "react";
import { Typography, Box, Container } from "@mui/material";

export const PageBanner = ({
  title,
  subtitle,
  children,
}: PropsWithChildren<Record<"title" | "subtitle", string>>) => {
  return (
    <Box sx={{ p: [3,5], color: "primary.light", background: "#eef4fb" }}>
      <Container>
        <Typography variant="h3">Menagemen batch</Typography>
        <Typography>
          Menampilkan informasi , tambah, hapus, dan manage setiap batch yang
          terdaftar pada sistem.
        </Typography>
        {children}
      </Container>
    </Box>
  );
};
