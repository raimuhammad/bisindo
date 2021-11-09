import { TabPanel } from "@mui/lab";
import { ContentVideos } from "@admin-pages/batch/content.videos";
import { ContentVideoUploader } from "@admin-pages/batch/content.video-uploader";

export const PageSwitcher = () => {
  return (
    <>
      <TabPanel sx={{ p: [0, 2] }} value="videos">
        <ContentVideos />
      </TabPanel>
      <TabPanel value="students">Wait for implementation</TabPanel>
      <TabPanel value="add-video">
        <ContentVideoUploader />
      </TabPanel>
    </>
  );
};
