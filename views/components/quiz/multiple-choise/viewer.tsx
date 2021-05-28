import * as React from "react";
import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import { useClasses, useMultipleChouse } from "./utils";
import { ViewerOption, ViewerType } from "./type";

const OptionMap = ["A", "B", "C", "D"];

const ImageViewer = ({ src }: { src: string }) => {
  const classes = useClasses();
  return <img src={src} className={classes.img} />;
};

const OptionViewer = ({
  model,
  active,
  onClick,
}: {
  model: ViewerOption;
  onClick: () => void;
  active: boolean;
}) => {
  const isImage = Boolean(model.image);
  const classes = useClasses();
  return (
    <Grid item sm={12} md={6}>
      <Button
        onClick={onClick}
        variant={active ? "contained" : "text"}
        color={active ? "primary" : "default"}
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
    </Grid>
  );
};

export const Viewer = ({ model }: { model: ViewerType }) => {
  const { answer, setAnswer } = useMultipleChouse();
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
                active={item.index === answer}
                onClick={() => setAnswer(item.index as number)}
                key={item.id}
                model={item}
              />
            ))}
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};
