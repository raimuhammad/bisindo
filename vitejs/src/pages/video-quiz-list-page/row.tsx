/* eslint-disable */
import React from "react";
import { QuizModelType, QuizType, useQuery } from "root/models/stores";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  IconButton,
  makeStyles,
  TableCell,
  TableRow,
} from "@material-ui/core";
import { useToggle } from "hooks/use-toggle";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { Delete } from "@material-ui/icons";
import { RowProps } from "components/data-table";
import { useSuccessModal } from "hooks/use-success-modal";
import { observer } from "mobx-react";

const useClasses = makeStyles(() => ({
  root: {
    position: "relative",
  },
  button: {
    position: "absolute",
    right: "1rem",
  },
}));

const variants = {
  entering: {
    opacity: 0,
  },
  leaving: {
    opacity: 0,
    display: "none",
  },
  enter: {
    opacity: 1,
  },
};

const DeleteMode = observer(
  ({
    onCancel,
    onSuccess,
    quiz,
  }: {
    quiz: QuizModelType;
    onCancel(): void;
    onSuccess(): void;
  }) => {
    const { setQuery, data, loading } = useQuery<{
      quizDelete: null | QuizModelType;
    }>();

    useSuccessModal({
      callback: onSuccess,
      message: "Quiz berhasil di hapus",
      depedencies: Boolean(data && data.quizDelete),
    });

    const handler = () =>
      setQuery((model: RootModel) =>
        model.mutateQuizDelete({
          id: quiz.id,
        })
      );

    return (
      // @ts-ignore
      <TableRow
        variants={variants}
        animate="enter"
        initial="entering"
        exit="leaving"
        component={motion.tr}
      >
        <TableCell colSpan={3}>
          <span>
            Apakah anda yakin untuk menghapus quis ini ?{" "}
            <ButtonGroup disabled={loading} size="small">
              <Button onClick={handler}>
                {loading ? <CircularProgress size={15} /> : "Ya"}
              </Button>
              <Button onClick={onCancel}>Tutup</Button>
            </ButtonGroup>
          </span>
        </TableCell>
      </TableRow>
    );
  }
);

const NormalMode = ({
  quiz,
  onDelete,
}: {
  quiz: QuizModelType;
  onDelete(): void;
}) => {
  const classes = useClasses();
  return (
    <TableRow
      animate="enter"
      initial="entering"
      exit="leaving"
      component={motion.tr}
      hover
      variants={variants}
      className={classes.root}
    >
      <TableCell style={{ width: 20 }}>
        <IconButton color="secondary" size="small" onClick={onDelete}>
          <Delete />
        </IconButton>
      </TableCell>
      <TableCell>{quiz.label}</TableCell>
      <TableCell>{quiz.playAtDuration}</TableCell>
    </TableRow>
  );
};

type State = {
  mode: "normal" | "delete";
};

export class Row extends React.Component<RowProps<QuizModelType>, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      mode: "normal",
    };
  }

  onCancel = () => this.setState({ mode: "normal" });

  onDelete = () => this.setState({ mode: "delete" });

  render() {
    const { mode } = this.state;
    return (
      <AnimatePresence exitBeforeEnter initial={false}>
        {mode === "normal" ? (
          <NormalMode onDelete={this.onDelete} quiz={this.props.model} />
        ) : (
          <DeleteMode
            onSuccess={this.props.refresh}
            onCancel={this.onCancel}
            quiz={this.props.model}
          />
        )}
      </AnimatePresence>
    );
  }
}
