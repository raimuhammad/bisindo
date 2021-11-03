import { useContentPaginator } from "@service-provider/content";
import { Box, Divider, Typography } from "@mui/material";
import { VideoListItem } from "./video-list-item";
import { AddVideoButton } from "./add-video-button";

const useClasses = () => ({
  container: {
    position: "sticky",
    top: 0,
    display: "flex",
    "& .content": {
      display: "flex",
      flexWrap: "wrap",
    },
  },
  listItem: {
    "&.Mui-selected": {
      backgroundColor: "primary.main",
      color: "white",
    },
    "&:hover": {
      "&.Mui-selected": {
        backgroundColor: "primary.main",
        color: "white",
      },
      backgroundColor: "primary.main",
      color: "white",
    },
  },
});

export const VideoList = () => {
  const { data } = useContentPaginator();
  const classes = useClasses();
  return (
    <Box sx={classes.container as any}>
      <Box sx={{ width: "100%" }}>
        <Box padding={2}>
          <Typography variant="h5">Video pembelajaran</Typography>
          <Divider />
        </Box>
        <Box className="content">
          <AddVideoButton />
          {data.map((item) => {
            return <VideoListItem model={item} key={item.id} />;
          })}
        </Box>
      </Box>
    </Box>
  );
};
