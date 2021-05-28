import * as React from "react";
import { useLayout } from "@root/layout";
import { useNodeDimension } from "@hooks/use-node-dimension";
import { Box, Typography, useTheme } from "@material-ui/core";
import { View as ImageMatcherView } from "@components/quiz/image-matcher/view";
import { QuizModelType } from "@root/models";

export const PreviewWrapper = ({ text }: { text: string }) => {
  const { getContentHeight } = useLayout();
  const {
    nodeRef,
    dimension: { width },
  } = useNodeDimension();
  const theme = useTheme();
  return (
    <Box
      component="div"
      display={text.length < 2 ? "flex" : "block"}
      alignItems="center"
      justifyContent="center"
      height={getContentHeight(0) - theme.spacing(2)}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref={nodeRef as any}
      paddingTop={1}
    >
      {width && text.length > 2 ? (
        <ImageMatcherView
          text={text}
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

export const ImageMatchPreview = ({ model }: { model: QuizModelType }) => {
  return <PreviewWrapper text={model.image_matcher as string} />;
};
