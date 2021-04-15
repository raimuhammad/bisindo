/* eslint-disable */
import { Divider, makeStyles, Paper, Typography } from "@material-ui/core";
import * as React from "react";

type Props = {
  video: gapi.client.youtube.Video;
};

const useClasses = makeStyles((theme) => ({
  paragraphContainer: {
    paddingBlock: theme.spacing(3),
    "& > p": {
      marginBottom: theme.spacing(1),
    },
  },
  divider: {
    height: 2,
    marginBlock: theme.spacing(1),
  },
  paper: {
    padding: ".5rem",
    marginTop: ".5rem",
    marginBottom: ".5rem",
  },
  root: {
    paddingBottom: theme.spacing(5),
  },
}));

export const VideoInfoContainer = ({ video }: Props) => {
  const paragraphs =
    video && video.snippet
      ? // @ts-ignore
        video.snippet?.description.split("\n").filter(Boolean)
      : [];
  const classes = useClasses();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <h3
          dangerouslySetInnerHTML={{
            __html: video.snippet?.title as string,
          }}
        />
        <Divider className={classes.divider} />
        <div className={classes.paragraphContainer}>
          {(paragraphs || []).map((item, index) => (
            <Typography
              component="p"
              key={index}
              dangerouslySetInnerHTML={{
                __html: item,
              }}
            />
          ))}
        </div>
      </Paper>
    </div>
  );
};
