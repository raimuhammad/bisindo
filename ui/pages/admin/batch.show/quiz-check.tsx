import { List, useList } from "@providers/model-provider/lists";
import {
  QuizHistory,
  QuizModelType,
  StudentGradeModelSelector,
  StudentGradeModelType,
  VideoModelType,
} from "@root/models";
import { useEffect, useState } from "react";
import { WithBatchShow } from "@admin-pages/batch.show/with-batch-show";
import { observer } from "mobx-react";
import { selectFieldFactory } from "@components/form-field/select-field";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { RenderWhen } from "@components/render-when";
import { useBatchShow } from "./context";
import { Check, Close } from "@mui/icons-material";

type Props = {
  videos: VideoModelType[];
};
type RowProps = {
  video: VideoModelType;
  studentGrade: StudentGradeModelType;
};

type QuizCellProps = {
  histories: QuizHistory[];
  quiz: QuizModelType;
};

const QuizCell = ({ histories, quiz }: QuizCellProps) => {
  const history = histories?.find((item) => item.id.toString() === quiz.id);

  return (
    <TableCell>
      <RenderWhen when={!history}>-</RenderWhen>
      <RenderWhen when={Boolean(history)}>
        {history.correct ? (
          <Check sx={{ color: "success.main" }} />
        ) : (
          <Close sx={{ color: "error.main" }} />
        )}
      </RenderWhen>
    </TableCell>
  );
};

const Row = ({ video, studentGrade }: RowProps) => {
  return (
    <TableRow>
      <TableCell>{studentGrade.student.name}</TableCell>
      {video.quizes.map((item) => (
        <QuizCell
          key={item.id}
          quiz={item}
          histories={studentGrade.progress.quizHistories}
        />
      ))}
    </TableRow>
  );
};

const Wrap = observer(({ videos }: Props) => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const { data, fetch } = useList<StudentGradeModelType>();
  useEffect(() => {
    fetch();
  }, []);
  const Select = selectFieldFactory(
    videos.map((item) => ({
      label: item.title,
      value: item.id,
    }))
  );

  useEffect(() => {
    if (data && data.length && !videoId) {
      setVideoId(data[0].id);
    }
  }, [data, videoId]);

  const video = videos.find((item) => item.id === videoId);
  return (
    <div>
      <Box sx={{ my: 2 }}>
        <Paper sx={{ p: 2 }}>
          <Select
            value={videoId}
            label="Pilih video"
            size="small"
            variant="standard"
            name="videoId"
            onChange={setVideoId}
            noUseForm
          />
        </Paper>
      </Box>
      <RenderWhen when={Boolean(video)}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Siswa</TableCell>
              {Array.from({ length: video?.quiz_count ?? 0 }).map(
                (item, index) => (
                  <TableCell sx={{ width: "15%" }} key={index}>
                    Quiz {index + 1}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          {video ? (
            <TableBody>
              {data.map((item) => (
                <Row video={video as any} studentGrade={item} key={item.id} />
              ))}
            </TableBody>
          ) : null}
        </Table>
      </RenderWhen>
    </div>
  );
});

const selector = (v: StudentGradeModelSelector) => {
  return v.id.student((t) => t.id.name).progress((p) => p.id.quiz_histories);
};

export const QuizCheck = WithBatchShow(() => {
  const { model } = useBatchShow();
  const { data, fetch } = useList<VideoModelType>();
  useEffect(() => {
    fetch();
  }, []);
  return (
    <List
      selector={selector}
      dataKey="studentByGrade"
      props={{ gradeId: model.id }}
    >
      <Wrap videos={data} />
    </List>
  );
});
