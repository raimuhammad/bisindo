import { useList } from "@providers/model-provider/lists";
import { VideoModelType } from "@root/models";
import { Box, Button, Typography, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { WithBatchShow } from "./with-batch-show";
import { useNavigate } from "react-router-dom";
import { useBatchShow } from "@admin-pages/batch.show/context";
import { VideoListRenderer } from "@components/video/video-list-renderer";
import { VideoPlayer } from "@components/video-player";
import { AnimatePresence, motion } from "framer-motion";
import { DraftJsViewer } from "@components/draft-js-viewer";

const VideoDetail = ({ model }: { model: VideoModelType }) => {
  const { model: batch } = useBatchShow();
  const push = useNavigate();
  const navigate = () =>
    push(`/admin/video/${model.id}/info`, {
      state: {
        backurl: {
          url: `/classroom/${batch.name}/${batch.id}/videos`,
          label: `Manage ke kelas ${batch.name}`,
        },
      },
    });
  return (
    <AnimatePresence exitBeforeEnter>
      <Box
        key={model.id}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        sx={{ p: 1 }}
      >
        <VideoPlayer url={model.content as string} />
        <Button
          onClick={navigate}
          fullWidth
          sx={{ my: 2, bgcolor: "primary.light", textTransform: "none" }}
          variant="contained"
        >
          Manage video
        </Button>
        <Box
          sx={{
            p: 2,
            border: "solid 1px",
            borderColor: "#bababa",
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bolder" }}>
            {model.title}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography sx={{ fontWeight: "bolder" }}>{model.caption}</Typography>
          <DraftJsViewer data={model.description as any} />
        </Box>
      </Box>
    </AnimatePresence>
  );
};

export const VideoList = WithBatchShow(
  observer(() => {
    const { data, fetch } = useList<VideoModelType>();
    useEffect(() => {
      fetch();
    }, []);
    const [selected, setSelected] = useState<null | VideoModelType>(null);

    useEffect(() => {
      if (data.length && data && !selected) {
        setSelected(data[0]);
      }
    }, [data, selected]);

    return (
      <Box sx={{ py: 5 }}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: "70%", minHeight: "50vh" }}>
            {selected && <VideoDetail model={selected} />}
          </Box>
          <Box sx={{ width: "30%", minHeight: "50vh" }}>
            <VideoListRenderer
              selected={selected}
              videos={data ?? []}
              onItemClick={setSelected}
            />
          </Box>
        </Box>
      </Box>
    );
  })
);
