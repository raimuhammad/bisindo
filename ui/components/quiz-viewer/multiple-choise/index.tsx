import { useQuizDimension } from "../quiz-viewer-container";
import { Box, Typography } from "@mui/material";
import {
  MultipleChoiceContext,
  useMultipleChoiseProvider,
  Props,
} from "./provider";
import { ImageOption } from "./image-option";
import { TextOption } from "./text-option";
import { ComponentType } from "react";
import { QuizInfo } from './quiz-info'

const sx = {
  display: "flex",
  width: "100%",
  "& > div": {
    width: ["100%", "50%"],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
const optionContainerFx = {
  display: "flex",
  flexWrap: "wrap",
  width: "90%",
  "& > .item": {
    cursor: "pointer",
    transition: "all ease .2s",
    background: "white",
    width: "50%",
    p: 2,
    zIndex: 1,
    "&[data-selected='true']": {
      boxShadow: 3,
      zIndex: 2,
      bgcolor:"primary.main",
      color:'white'
    },
    "&:hover": {
      bgcolor:"primary.main",
      color:'white'
    },
  },
};

const IndexMap = ["A", "B", "C", "D"];
const Cmap: Record<string, ComponentType<any>> = {
  text: TextOption,
  image: ImageOption,
};

const Option = (props: any) => {
  const Component = Cmap[props.type];
  return <Component {...props} />;
};

export const MultipleChoise = (props: Props) => {
  const dimension = useQuizDimension();
  const { question, image, options, answer } = props;
  const ctx = useMultipleChoiseProvider(props);
  return (
    <MultipleChoiceContext.Provider value={ctx}>
      <Box
        sx={{
          ...sx,
          height: dimension.height,
          width: dimension.width,
        }}
      >
        <div>
          <Box sx={{ width: "100%", textAlign: "center" }}>
            {image ? (
              <Box component="img" src={image} sx={{ maxHeight: 256 }} />
            ) : null}
            <Typography>{question}</Typography>
          </Box>
        </div>
        <div>
          <Box sx={{ width: "100%" }}>
            <Box>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Pilih jawaban anda :
              </Typography>
              <Box sx={optionContainerFx as any}>
                {options.map((item: any, index: any) => (
                  <Option key={index} index={index} {...item} />
                ))}
              </Box>
            </Box>
            <QuizInfo/>
          </Box>
        </div>
      </Box>
    </MultipleChoiceContext.Provider>
  );
};
