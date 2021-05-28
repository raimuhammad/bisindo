import { makeStyles, Theme } from "@material-ui/core";
import { useState } from "react";
import { useWatch } from "react-hook-form";
import { ViewerType } from "./type";

export const useClasses = makeStyles((theme: Theme) => ({
  img: {
    maxHeight: 144,
    maxWidth: 256,
    boxShadow: theme.shadows[2],
    transition: "all ease .3s",
    ...theme.shape,
  },
  container: {
    cursor: "pointer",
    "&:hover": {
      "& > img": {
        boxShadow: theme.shadows[4],
      },
    },
    "& > h4": {
      transition: "all ease .3s",
    },
  },
}));

export function useMultipleChouse() {
  const [answer, setAnswer] = useState<number>(-1);
  return {
    answer,
    setAnswer,
  };
}

export function transformModelForm(): ViewerType {
  const question = useWatch({
    name: "question",
    defaultValue: "",
  });
  const additional_image = useWatch({
    name: "additionalFile",
    defaultValue: "",
  }) as File;
  const choises = useWatch({
    name: "options",
    defaultValue: [],
  }) as Array<any>;

  const transformOptions = ({ content, index }: any) => {
    if (!content) return null;
    if (content instanceof File) {
      return {
        index,
        id: index,
        image: URL.createObjectURL(content),
      };
    }
    return {
      index,
      id: index,
      text: content,
    };
  };

  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    choises: choises.map(transformOptions).filter(Boolean),
    question,
    additional_image: additional_image
      ? URL.createObjectURL(additional_image)
      : "",
  };
}
