import { Box, Container, Typography } from "@mui/material";
import { useApp } from "@providers/application-provider";

export const Banner = () => {
  const { user } = useApp();
  return !user ? (
    <></>
  ) : (
    <Box
      sx={{
        minHeight: "10vh",
        display: "flex",
        alignItems: "center",
        bgcolor: "primary.dark",
        color: "white",
        py: 3,
      }}
    >
      <Container>
        <Typography sx={{ fontWeight: "bolder" }} variant="h4">
          Selamat datang, {user.name}
        </Typography>
        <Typography sx={{ fontWeight: "bolder" }} variant="caption">
          {user.role}
        </Typography>
      </Container>
    </Box>
  );
};
