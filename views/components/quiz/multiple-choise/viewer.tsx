import * as React from "react";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useClasses, useMultipleChouse } from "./utils";
import { ViewerOption, ViewerType } from "./type";
import { useToggle } from "@hooks/use-toggle";

const OptionMap = ["A", "B", "C", "D"];

const ImageViewer = ({ src }: { src: string }) => {
  const classes = useClasses();
  return <img src={src} className={classes.img} />;
};

const OptionViewer = ({
  model,
  active,
  onClick,
  isAnswer,
  showHint,
}: {
  model: ViewerOption;
  onClick: () => void;
  active: boolean;
  isAnswer: boolean;
  showHint: boolean;
}) => {
  const isImage = Boolean(model.image);
  const classes = useClasses();

  const getColor = () => {
    if (showHint && active && !isAnswer) {
      return "secondary";
    }
    if (showHint && active && isAnswer) {
      return "primary";
    }
    return "primary";
  };
  const isShowAnwerHint = () => {
    return showHint && !active && isAnswer;
  };

  return (
    <Grid item sm={12} md={6}>
      <Box padding={2}>
        <Button
          onClick={onClick}
          className={isShowAnwerHint() ? classes.hint : ""}
          variant={active ? "contained" : "text"}
          color={getColor()}
          fullWidth
          component="div"
        >
          <Box padding={2} className={classes.container} textAlign="center">
            <Typography variant="h4" style={{ fontWeight: "bolder" }}>
              {OptionMap[model.index as number]}
            </Typography>
            {isImage ? (
              <ImageViewer src={model.image as string} />
            ) : (
              <Typography variant="h5">{model.text}</Typography>
            )}
          </Box>
        </Button>
      </Box>
    </Grid>
  );
};

export const Viewer = ({
  model,
  viewOnly = true,
  onSubmit,
}: {
  model: ViewerType;
  showHint?: boolean;
  viewOnly?: boolean;
  onSubmit?(answer: number): void;
}) => {
  const [showHint, { toggle }] = useToggle();
  const { answer, setAnswer } = useMultipleChouse(showHint);
  const isRightAnswer = answer === model.questionAnswer;
  const handleSubmit = () => {
    if (showHint && onSubmit) {
      return onSubmit(answer);
    }
    return toggle();
  };
  return (
    <Box padding={2}>
      <Paper>
        <Box padding={2}>
          <Typography variant="h5" align="center">
            {model.question} ?
          </Typography>
          <Box textAlign="center">
            {model.additional_image ? (
              <ImageViewer src={model.additional_image} />
            ) : null}
          </Box>
        </Box>
      </Paper>
      <Box marginTop={3}>
        <Paper>
          <Grid container>
            <Grid item sm={12}>
              <Box padding={2}>
                <Typography>Pilih salah satu opsi jawaban : </Typography>
              </Box>
            </Grid>
            {model.choises.map((item) => (
              <OptionViewer
                showHint={showHint}
                isAnswer={item.index === model.questionAnswer}
                active={item.index === answer}
                onClick={() => setAnswer(item.index as number)}
                key={item.id}
                model={item}
              />
            ))}
          </Grid>
        </Paper>
      </Box>
      {!viewOnly ? (
        <Box marginTop={3}>
          <Paper>
            <Box display="flex" alignItems="center" padding={2}>
              <Box flex={1}>
                <Button disabled={answer === -1} onClick={handleSubmit}>
                  {showHint ? "Tutup" : "Periksa jawaban saya"}
                </Button>
              </Box>
              {showHint ? (
                <Typography
                  style={{ marginLeft: "" }}
                  color={isRightAnswer ? "primary" : "secondary"}
                >
                  {isRightAnswer
                    ? "Jawaban benar"
                    : `Maaf jawaban anda kurang tepat, jawaban yang benar adalah opsi ${
                        OptionMap[model.questionAnswer as number]
                      }`}
                </Typography>
              ) : null}
            </Box>
          </Paper>
        </Box>
      ) : null}
    </Box>
  );
};
