import * as React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { QuizModelType, VideoModelType } from "@root/models";
import { useQuizCheck } from "./data-provider";

const QuizRow = ({ model, index }: { model: QuizModelType; index: number }) => {
  const { getQuizStatus } = useQuizCheck();

  const status = getQuizStatus(model);

  const getStatusNode = () => {
    if (!status) {
      return "-";
    }
    return status.correct ? "benar" : "salah";
  };

  return (
    <TableRow>
      <TableCell style={{ width: "20%" }}>Quis {index + 1}</TableCell>
      <TableCell>{getStatusNode()}</TableCell>
    </TableRow>
  );
};

const VideoWrapper = ({ model }: { model: VideoModelType }) => {
  const { getQuizList } = useQuizCheck();
  const quizes = getQuizList(model);
  return (
    <Box padding={1} marginBottom={2}>
      <Paper>
        <Box padding={2}>
          <Typography variant="h4">{model.title}</Typography>
        </Box>
        <Box padding={2}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Nomor quis</TableCell>
                <TableCell>Hasil</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quizes.map((item, index) => (
                <QuizRow key={item.id} model={item} index={index} />
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Box>
  );
};

export const VideoContainer = () => {
  const { videos } = useQuizCheck();
  return (
    <>
      {videos.map((item) => (
        <VideoWrapper model={item} key={item.id} />
      ))}
    </>
  );
};
