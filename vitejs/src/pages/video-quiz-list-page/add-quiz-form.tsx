import * as React from "react";
import { QuizType, VideoModelType } from "root/models/stores";
import { QuizForm } from "components/forms/quiz-form/quiz-form";
import { useToggle } from "hooks/use-toggle";
import { Box, Button, Drawer } from "@material-ui/core";

const question = "Apakah huruf untuk gambar dibawah ini?";

type Props = {
  video: VideoModelType;
  refresh(): void;
};

export const AddQuizForm = ({ video, refresh }: Props) => {
  const callback = React.useCallback((data: any) => {
    return (model: RootModel) => {
      if (data.type === QuizType.MULTIPLE_CHOICE) {
        data.meta_data.question = question;
      }
      console.log(data);
      return model.mutateQuiz({
        args: { ...data, video_id: video.id },
      });
    };
  }, []);
  const [disableClose, { inline: setDisableClose }] = useToggle();
  const [open, { toggle, inline }] = useToggle();
  const handler = () => {
    if (!disableClose) {
      toggle();
    }
  };
  const onSuccess = () => {
    inline(false);
    refresh();
  };
  return (
    <>
      <Button variant="outlined" onClick={handler}>
        Tambah kuis
      </Button>
      <Drawer
        PaperProps={{
          style: {
            width: "30vw",
          },
        }}
        anchor="right"
        keepMounted={false}
        open={open}
      >
        <Box padding={2}>
          <Box paddingBottom={2}>
            <Button onClick={handler}>Tutup</Button>
          </Box>
          <QuizForm
            onSuccess={onSuccess}
            model={video}
            callback={callback}
            onLoading={setDisableClose}
          />
        </Box>
      </Drawer>
    </>
  );
};
