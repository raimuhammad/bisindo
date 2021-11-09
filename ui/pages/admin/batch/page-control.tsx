import { AppBar, Box, Tab, Typography, Button } from "@mui/material";
import { SearchForm } from "./search-form";
import { OndemandVideo, School, Upload } from "@mui/icons-material";
import { TabList } from "@mui/lab";
import { useBatchPage } from "@admin-pages/batch/provider";
import { ReactNode, useEffect } from "react";
import { useContent } from "./content.context";
import { useIsSm } from "@hooks/use-media";

const TabController = () => {
  const [{ tab }, { changeTab }] = useContent();
  const { selected } = useBatchPage();
  const handleChange = (e: any, v: any) => {
    return changeTab(v)();
  };
  useEffect(() => {
    if (tab !== "videos") changeTab("videos")();
  }, [selected]);

  const isSm = useIsSm();

  return (
    <TabList
      variant={isSm ? "fullWidth" : "standard"}
      sx={{
        "& .Mui-selected": {
          "& > *": {
            color: "white",
          },
        },
      }}
      TabIndicatorProps={
        {
          sx: {
            bgcolor: "white",
          },
        } as any
      }
      onChange={handleChange}
    >
      <Tab
        icon={<OndemandVideo />}
        value="videos"
        label={
          <Typography variant="caption" sx={{ textTransform: "none" }}>
            Video
          </Typography>
        }
      />
      <Tab
        value="students"
        icon={<School />}
        label={
          <Typography variant="caption" sx={{ textTransform: "none" }}>
            Siswa
          </Typography>
        }
      />
      <Tab
        value="add-video"
        icon={<Upload />}
        label={
          <Typography variant="caption" sx={{ textTransform: "none" }}>
            Upload video
          </Typography>
        }
      />
    </TabList>
  );
};

export const PageControl = () => {
  const [{ tab }, { changeTab }] = useContent();
  const { selected } = useBatchPage();
  const handleChange = (e: any, v: any) => {
    return changeTab(v)();
  };
  useEffect(() => {
    if (tab !== "videos") changeTab("videos")();
  }, [selected]);
  return (
    <AppBar sx={{ zIndex: 100, bgcolor: "primary.light" }} position="static">
      <Box sx={{ display: ["block", "flex"], alignItems: "center" }}>
        <Box sx={{display: ["none", "block"], widht: "100%"}}>
          <SearchForm />
        </Box>
        <Box sx={{display:["block", "none"], p:2, pb:0}}>
          <Button sx={{bgcolor: "white!important", borderRadius: 3,}} fullWidth>Pilih batch</Button>
        </Box>
        <TabController />
      </Box>
    </AppBar>
  );
};
