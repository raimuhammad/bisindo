import {Tab, Tabs} from "@mui/material";

export const ViewControl = () => {
  return (
    <div>
      <Tabs value={0}>
        <Tab label='informasi video'/>
        <Tab label='diskusi'/>
        <Tab label='Edit'/>
        <Tab label='Quiz'/>
      </Tabs>
    </div>
  );
};
