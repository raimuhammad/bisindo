import * as React from "react";
import { useStore } from "./provider";
import { Box, Button } from "@mui/material";
import { Add, ArrowBack } from "@mui/icons-material";
import { selectFieldFactory } from "@components/form-field/select-field";
import { QuizType } from "@root/models";
import { FormNode } from "./form-node";
import { useLayout } from "@root/layout";
import { QuizList } from "./quiz-list";

const TypeSwitcher = selectFieldFactory([
  { label: "Pilihan ganda", value: QuizType.MULTIPLE_CHOICE },
  { label: "Pencocokan gambar", value: QuizType.IMAGE_MATCH },
  { label: "Susun gambar", value: QuizType.LETTER_SEQUENCE },
]);

const CreateFormSwitcher = () => {
  const { formType, updateFormType } = useStore();
  return (
    <Box padding={2}>
      <TypeSwitcher
        variant="outlined"
        label="Jenis quis"
        noUseForm
        onChange={updateFormType}
        value={formType}
        name="type"
      />
    </Box>
  );
};

export const SideBar = () => {
  const { mode, modeHandler } = useStore();
  const handler = () => modeHandler(mode === "create" ? "list" : "create");
  const { getContentHeight } = useLayout();
  return (
    <Box height={getContentHeight(0)} overflow="auto">
      <Button
        fullWidth
        onClick={handler}
        startIcon={mode === "create" ? <ArrowBack /> : <Add />}
      >
        {mode !== "create" ? "Tambah quis baru" : "Kembali"}
      </Button>
      {mode === "create" ? (
        <>
          <CreateFormSwitcher />
          <FormNode />
        </>
      ) : (
        <QuizList />
      )}
    </Box>
  );
};
