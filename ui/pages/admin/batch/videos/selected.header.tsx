import { useVideoContext } from "./provider";
import {Box} from "@mui/material";

export const SelectedHeader = () => {
  const [{ video }] = useVideoContext();
  console.log("video", video)
  return !video ? (
    <></>
  ) : (
    <>
      <>
        <Box sx={{position: "absolute", top: 0, left: 0, width: "100%", color: "white"}}>
          <p>LOL</p>
        </Box>
      </>
    </>
  );
};
