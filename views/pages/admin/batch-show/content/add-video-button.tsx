import { Box, Typography } from "@mui/material";
import { styles as VideoItemStyles } from "@admin-pages/batch-show/content/video-list-item";
import { AddCircle } from "@mui/icons-material";

const sx = {
  root: {
    ...VideoItemStyles.root,
    display: "flex",
    "& > div": {
      flex: 1,
      borderRadius: 3,
      border: "solid 1px",
      borderColor: "primary.light",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "primary.main",
      cursor: "pointer",
      transition: "all ease-in-out .3s",
    },
    "& div": {
      textAlign: "center",
    },
    "& .caption": {
      display: "block",
    },
  },
};

export const AddVideoButton = () => {
  return (
    <Box sx={sx.root}>
      <Box>
        <Box sx={{ textAlign: "center" }}>
          <div>
            <AddCircle fontSize="large" />
          </div>
          <Typography
            className="caption"
            variant="caption"
            sx={{ display: "block" }}
          >
            Tambah video pembelajaran
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
