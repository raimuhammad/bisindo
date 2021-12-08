import { Tab, Tabs } from "@mui/material";
import { useIsSm } from "@hooks/use-media";
import { ReactNode } from "react";

type Item = {
  label: ReactNode;
  value: any;
};

type Props = {
  change(v: any): void;
  value: any;
  items: Item[];
};
const sx = {
  "& *": {
    textTransform: "none!important",
  },
  "& button": {
    px: 1,
    transition: "all ease-in-out .2s",
  },
  "& .Mui-selected": {
    bgcolor: "white",
    boxShadow: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
} as any;

export const PageControl = ({ change, value, items }: Props) => {
  const isSm = useIsSm();
  return (
    <>
      <Tabs
        value={value}
        onChange={(e: any, v) => change(v)}
        variant={isSm ? "scrollable" : "fullWidth"}
        sx={sx as any}
        TabIndicatorProps={
          {
            sx: {
              bgcolor: "transparent",
            },
          } as any
        }
      >
        {items.map(({ value, label }) => (
          <Tab label={label} value={value} key={value} />
        ))}
      </Tabs>
    </>
  );
};
