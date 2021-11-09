import { Tab, Tabs } from "@mui/material";
import { useBatchPage } from "./provider";

export const MobileControl = () => {
  const { mobileControlTab, setMobileControlTab } = useBatchPage();
  return (
    <>
      <Tabs onChange={(e: any,v: any)=>setMobileControlTab(v)} variant="fullWidth" value={mobileControlTab}>
        <Tab sx={{ textTransform: "none" }} value="list" label="List" />
        <Tab sx={{ textTransform: "none" }} value="manage" label="Manage" />
      </Tabs>
    </>
  );
};
