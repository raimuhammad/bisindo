import { observer } from "mobx-react";
import { usePaginator } from "@providers/model-provider/paginators";
import type { QuizModelType } from "@root/models";
import { useEffect } from "react";
import { Box, Button, ButtonGroup, Paper, Typography } from "@mui/material";
import { QuizType } from "@root/models";
import { useQuizInfo } from "./provider";

const labelMap = {
  [QuizType.MULTIPLE_CHOICE]: "Pilihan ganda",
  [QuizType.IMAGE_MATCH]: "Pencocokan gambar",
  [QuizType.LETTER_SEQUENCE]: "Pengurutan gambar",
};

const ItemList = () => {
  const { initialFetch, result, isEmpty } = usePaginator<QuizModelType>();
  useEffect(() => {
    initialFetch();
  }, []);
  const { handleSelected, onDeleteSelected } = useQuizInfo();
  return (
    <div>
      {isEmpty ? (
        <Typography sx={{ my: 3 }} align="center" variant="h4">
          Video ini tidak memiliki quis
        </Typography>
      ) : null}
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {result.data.map((item, index) => {
          return (
            <Box key={item.id} sx={{ width: ["100%", "33.25%"] }}>
              <Box sx={{ p: 1 }}>
                <Paper sx={{ p: 1 }}>
                  <Typography variant="caption">Quiz {index + 1}</Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="subtitle2">
                      {labelMap[item.type as keyof typeof labelMap]}
                    </Typography>
                    <Typography variant="subtitle2">
                      Ditampilkan pada : {item.durationText}
                    </Typography>
                  </Box>
                  <ButtonGroup fullWidth size="small">
                    <Button
                      onClick={handleSelected(item)}
                      sx={{ textTransform: "none" }}
                      size="small"
                      variant="outlined"
                      fullWidth
                    >
                      Simulasi quis
                    </Button>
                    <Button
                      onClick={onDeleteSelected(item)}
                      sx={{ textTransform: "none" }}
                      size="small"
                      variant="outlined"
                      fullWidth
                      color="error"
                    >
                      Hapus
                    </Button>
                  </ButtonGroup>
                </Paper>
              </Box>
            </Box>
          );
        })}
      </Box>
    </div>
  );
};

export const QuizList = observer(() => {
  return (
    <>
      <ItemList />
    </>
  );
});
