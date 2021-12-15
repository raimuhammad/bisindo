import { Box, CircularProgress } from "@mui/material";

export const ScreenLoading = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
        zIndex: 100 * 100,
      }}
    >
      <CircularProgress size={150} />
    </Box>
  );
};
