import { Tab, Tabs } from "@mui/material";
import { useBatchShow } from "./context";
import {useIsSm} from "@hooks/use-media";

export const PageControl = () => {
  const [{page: value}, change] = useBatchShow().pageControll;
  const isSm = useIsSm();
  return (
    <>
      <Tabs
        value={value}
        onChange={(e: any, v) => change(v)}
        variant={isSm ? "scrollable": "fullWidth"}
        sx={{
          "& *": {
            textTransform: "none!important",
          },
          "& button": {
            px: 1,
            transition: "all ease-in-out .2s"
          },
          "& .Mui-selected": {
            bgcolor: "white",
            boxShadow: 1,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          },
        } as any}
        TabIndicatorProps={
          {
            sx: {
              bgcolor: "transparent",
            },
          } as any
        }
      >
        <Tab label="Video" value="VIDEOS" />
        <Tab label="Tambah video" value="ADD-VIDEO" />
        <Tab label="Siswa" value="STUDENTS" />
        <Tab label="Periksa kuis" value="QUIZ-CHECK" />
        <Tab label="Diskusi" value="DISCUSSION" />
      </Tabs>
    </>
  );
};
