import { useVideo, useUpdateVideoProgress } from "./provider";
import { VideoPlayer } from "@components/video-player";
import { ScreenLoading } from "@components/screen-loading";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { ArrowForward, Close } from "@mui/icons-material";
import { useToggle } from "@hooks/use-toggle";
import { useSnackbar } from "notistack";
import { observer } from "mobx-react";
import { useStudent } from "@providers/student-contexts";
export const VideoContainer = observer(() => {
  const { video, videoUtilities } = useVideo();
  const {
    videoList: { videos },
  } = useStudent();
  const check = videos.findIndex((item) => item.id === video?.id);
  const isLastVideo = check === videos.length - 1;
  const handleVideoChange = useUpdateVideoProgress(
    videoUtilities.playerRef.current as any
  );
  const [showSuccess, { inline }] = useToggle();
  const [loading, { inline: inlineLoading }] = useToggle();
  const { enqueueSnackbar } = useSnackbar();
  const onVmEnded = () => {
    console.log("on onded");
    if (video) {
      inlineLoading(true);
      handleVideoChange(video, video.duration as number)
        .then(() => {
          inline(true);
          inlineLoading(false);
        })
        .catch(() => {
          inlineLoading(false);
          enqueueSnackbar("Ops terjadi kesalahan", {
            variant: "error",
          });
        });
    }
  };
  return (
    <>
      {loading ? <ScreenLoading /> : null}
      <Dialog onClose={() => inline(false)} open={showSuccess} fullWidth>
        <DialogContent>
          <DialogContentText>
            {!isLastVideo
              ? `Anda telah menyelesaikan video ini, apakah ingin melanjutkan ke video berikutnya ?`
              : `Anda telah menyelesaikan semua video pembelajaran pada kelas ini`}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ "& > button": { textTransform: "none" } }}>
          <Button
            onClick={() => inline(false)}
            color="secondary"
            startIcon={<Close />}
          >
            Tutup
          </Button>
          {!isLastVideo ? (
            <Button startIcon={<ArrowForward />}>Ya</Button>
          ) : null}
        </DialogActions>
      </Dialog>
      <VideoPlayer
        onPlayEnded={onVmEnded}
        playerRef={videoUtilities.playerRef}
        url={video.content as string}
      />
    </>
  );
});
