import { useContentPaginator } from "@service-provider/content";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import * as React from "react";

const useClasses = makeStyles((theme) => ({
  container: {
    position: "sticky",
    top: 0,
  },
  listItem: {
    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
    "&:hover": {
      "&.Mui-selected": {
        backgroundColor: theme.palette.primary.main,
        color: "white",
      },
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
  },
}));

export const VideoList = () => {
  const { data, loading, selected, setSelected } = useContentPaginator();
  const classes = useClasses();
  return (
    <Box className={classes.container}>
      <Box padding={2}>
        <Typography variant="h5">Video</Typography>
        <Divider />
      </Box>
      <List>
        {data.map((model) => (
          <ListItem
            button
            className={classes.listItem}
            onClick={() => setSelected(model)}
            selected={Boolean(selected && selected.id === model.id)}
            key={model.id}
          >
            <ListItemAvatar>
              <Avatar src={model.thumbnail} variant="square" />
            </ListItemAvatar>
            <ListItemText
              primary={model.title}
              secondary={model.durationText}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
