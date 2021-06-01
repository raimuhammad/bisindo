import * as React from "react";
import { useLayout } from "@root/layout";
import { useNodeDimension } from "@hooks/use-node-dimension";
import { Box, Typography, useTheme } from "@material-ui/core";
import { LetterSequence } from "@components/quiz/letter-sequence";
import { QuizModelType } from "@root/models";

type Props = { text: string; model?: QuizModelType };

export const LetterSequencePreview = ({ text, model }: Props) => {
  const { getContentHeight } = useLayout();
  const letter: string = model ? (model.image_matcher as string) : text;
  const {
    nodeRef,
    dimension: { width },
  } = useNodeDimension();

  const theme = useTheme();

  return (
    <Box
      component="div"
      display={letter.length < 2 ? "flex" : "block"}
      alignItems="center"
      justifyContent="center"
      height={getContentHeight(0)}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref={nodeRef as any}
      paddingTop={1}
    >
      {width && letter.length > 2 ? (
        <LetterSequence
          text={letter}
          height={getContentHeight(0) - theme.spacing(2)}
          width={width - theme.spacing(1)}
        />
      ) : (
        <Typography variant="h4">
          Masukan 3 huruf untuk menampilkan quis
        </Typography>
      )}
    </Box>
  );
};
