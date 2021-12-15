import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { VideoModelType } from "@root/models";
import { useStudent } from "@providers/student-contexts";
import { useToggle } from "@hooks/use-toggle";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { useStudentVideoStatus } from "@providers/student-contexts/use-student-video-status";
import { Lock, PlayArrow, Check } from "@mui/icons-material";
import { RenderWhen } from "@components/render-when";

type VideoProps = {
  model: VideoModelType;
  onClick(v: VideoModelType): void;
  selected?: boolean;
};

const lockedStyle = {
  opacity: 0,
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  width: "100%",
  background: "rgba(0,0,0,0.60)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 6,
};

const Video = observer(({ model, onClick, selected }: VideoProps) => {
  const theme = useTheme();
  const [hovered, { force }] = useToggle();
  const {
    progressInfo: { getPlaying },
    videoList: { getPlayingPercentage },
  } = useStudent();
  const playTime = getPlayingPercentage(model.id, getPlaying(model.id));
  const { getIsLocked } = useStudentVideoStatus(model);
  const isLocked = getIsLocked();
  const {
    progressInfo: { quizHistory },
  } = useStudent();
  const workingQuizes = quizHistory.filter(
    (item) => item.videoId.toString() === model.id.toString()
  );
  return (
    <ListItem
      dense
      data-selected={selected}
      sx={{
        mb: 1,
        transition: "all ease .2s",
        borderRadius: 1,
        "&:hover": {
          bgcolor: "primary.light",
        },
        "&[data-selected='true']": {
          bgcolor: "primary.main",
        },
        "&:hover, &[data-selected='true']": {
          boxShadow: 2,
          "& > * > *": {
            color: "white",
          },
        },
      }}
      onClick={() => onClick(model)}
      button
    >
      <ListItemIcon>
        <RenderWhen when={isLocked}>
          <Lock />
        </RenderWhen>
        <RenderWhen when={!isLocked}>
          <RenderWhen
            when={workingQuizes.length === model.quiz_count && playTime === 100}
          >
            <Check />
          </RenderWhen>
          <RenderWhen
            when={workingQuizes.length !== model.quiz_count || playTime !== 100}
          >
            <PlayArrow />
          </RenderWhen>
        </RenderWhen>
      </ListItemIcon>
      <ListItemText
        primaryTypographyProps={{
          sx: {
            color: "primary.dark",
            fontWeight: "bolder",
          },
        }}
        primary={`${model.order}. ${model.title}`}
        secondary={`${model.durationText}`}
      />
    </ListItem>
  );
});

type Props = {
  width?: string;
  onItemClick?(v: VideoModelType): void;
  exluded?: string[];
  selected?: VideoModelType;
};

export const VideoList = ({
  width = "50%",
  onItemClick,
  exluded = [],
  selected,
}: Props) => {
  const {
    videoList: { videos },
  } = useStudent();
  const navigate = useNavigate();
  const onClick = onItemClick
    ? onItemClick
    : (model: VideoModelType) => {
        navigate(`/video/${model.id}`);
      };

  const getVideos = () => {
    return videos.filter((item) => {
      const isExluded = exluded?.includes(item.id);
      return !isExluded;
    });
  };

  return (
    <Box>
      <List sx={{ py: 0 }}>
        {getVideos().map((item) => (
          <Video
            selected={selected ? selected.id === item.id : false}
            model={item}
            key={item.id}
            onClick={onClick}
          />
        ))}
      </List>
    </Box>
  );
};
