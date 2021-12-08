import { QuizForm } from "@components/quiz-form";
import { useVideoPage } from "../provider";
import type { VideoModelType } from "@root/models";
import { Box, Button, Collapse, Paper } from "@mui/material";
import { useToggle } from "@hooks/use-toggle";
import { QuizList } from "./quiz-list";
import {
  PaginatorProvider,
  usePaginator,
} from "@providers/model-provider/paginators";
import { Context, useQuizListProvider } from "./provider";
import { QuizPreview } from "./quiz-preview";
import { useSnackbar } from "notistack";
import { DeleteModal } from "./delete-modal";
import { withVideoPage } from "../provider";

const Wrap = () => {
  const ctx = useQuizListProvider();
  const { video } = useVideoPage();
  const { initialFetch } = usePaginator();
  const [openForm, { toggle, force }] = useToggle();
  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = () => {
    initialFetch();
    force(false)();
    enqueueSnackbar("Quis baru berhasil di tambahkan", {
      variant: "success",
    });
  };
  return (
    <Context.Provider value={ctx}>
      <Box sx={{ minHeight: "110vh" }}>
        <Paper sx={{ p: 2, m: 1 }}>
          <Button sx={{ textTransform: "none" }} onClick={toggle}>
            {!openForm ? `Tambah quis baru` : "Tutup"}
          </Button>
          <Collapse in={openForm} timeout="auto" mountOnEnter>
            <QuizForm onSuccess={onSuccess} video={video as VideoModelType} />
          </Collapse>
        </Paper>
        <QuizList />
      </Box>
      <QuizPreview />
      <DeleteModal />
    </Context.Provider>
  );
};
export const Quiz = withVideoPage(() => {
  const { video } = useVideoPage();
  const [openForm, { toggle }] = useToggle();
  return (
    <PaginatorProvider
      dataKey="quizByVideo"
      includes={{ videoId: (video as VideoModelType).id }}
    >
      <Wrap />
    </PaginatorProvider>
  );
});
