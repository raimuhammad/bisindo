import { Box, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

export const ScreenLoading = () => {
  return (
    <Box
      component={motion.div as any}
      initial={{ opacity: 0 }}
      enter={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      sx={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <CircularProgress size={150} />
    </Box>
  );
};
