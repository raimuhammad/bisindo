import * as React from "react";
import { GradeModelType } from "@root/models";
import { useSuccessModal } from "@hooks/use-success-modal";
import { service } from "@services/student-services";
import { useEffect } from "react";
import { observer } from "mobx-react";
import { Box } from "@mui/material";
import { FormField } from "@components/form-field/form-field";
import { GradeField } from "@admin-pages/shared/grade-field";
import { LoadingButton } from "@components/loading-button";
import { Save } from "@mui/icons-material";

const { withGradeSchema, withouthGradeSchema, create } = service;

type Props = {
  onSuccess(): void;
  message: string;
  grade?: GradeModelType;
  onLoading(v: boolean): void;
};

const FieldContainer = ({ children }: any) => (
  <Box paddingBottom={2}>{children}</Box>
);

export const StudentForm = observer(
  ({ onSuccess, message, grade, onLoading }: Props) => {
    const getInjected = () => {
      if (!grade) return {};
      return { gradeId: grade.id };
    };
    const {
      updateSchema,
      result,
      loading,
      provider: Provider,
      handler,
    } = create({
      injectInput: getInjected(),
      inputParser({ gradeId, ...args }) {
        return {
          args: {
            grade_id: gradeId,
            ...args,
          },
        };
      },
    });
    useEffect(() => {
      onLoading(loading);
    }, [loading]);

    useEffect(() => {
      updateSchema(grade ? withouthGradeSchema : withGradeSchema);
    }, [grade]);

    useSuccessModal({
      callback: onSuccess,
      depedencies: Boolean(result),
      message,
    });

    return (
      <Provider>
        <form onSubmit={handler}>
          <FieldContainer>
            <FormField
              fullWidth
              label="Nama siswa"
              variant="outlined"
              name="name"
            />
          </FieldContainer>
          <FieldContainer>
            <FormField
              name="email"
              fullWidth
              variant="outlined"
              label="Email"
            />
          </FieldContainer>
          {!grade ? (
            <FieldContainer>
              <GradeField label="Batch" variant="outlined" />
            </FieldContainer>
          ) : null}
          <FieldContainer>
            <LoadingButton type="submit" loading={loading} icon={<Save />}>
              Simpan
            </LoadingButton>
          </FieldContainer>
        </form>
      </Provider>
    );
  }
);
