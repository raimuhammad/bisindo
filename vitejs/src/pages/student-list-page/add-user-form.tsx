import React, { useCallback } from "react";
import { formWrapper, WrapperProps } from "components/form-wrapper";
import { UserModelType } from "root/models/stores";
import { useSuccessModal } from "hooks/use-success-modal";
import { Box, Button, CircularProgress, Typography } from "@material-ui/core";
import { FormField } from "components/form-fields/form-field";
import { useFormFactoryGenerator } from "hooks/use-form-factory-generator";
import { RootStoreBaseMutations } from "root-model";
import { resolverFactory } from "utils/resolver-factory";
import * as yup from "yup";
import { Save } from "@material-ui/icons";
import { GradeField } from "components/form-fields/grade-field";

type Props = WrapperProps<UserModelType, { onSuccess: () => void }>;
const Component = (props: Props) => {
  const { instance } = props;
  const { loading, result } = instance;

  useSuccessModal({
    callback() {
      if (result) {
        props.onSuccess();
      }
    },
    depedencies: Boolean(result),
    message: "Data siswa berhasil di tambahkan",
  });
  return (
    <div>
      <Box paddingY={2}>
        <form onSubmit={instance.handler}>
          <Typography align="center" variant="h4">
            Tambah siswa
          </Typography>
          <Box padding={2}>
            <Box paddingY={2}>
              <FormField
                fullWidth
                variant="outlined"
                name="name"
                label="Nama siswa"
              />
            </Box>
            <FormField
              fullWidth
              variant="outlined"
              name="email"
              label="Alamat email"
            />
            <Box paddingY={2}>
              <GradeField />
            </Box>
            <Box paddingY={2}>
              <Button
                startIcon={loading ? <CircularProgress size={10} /> : <Save />}
                disabled={loading}
                type="submit"
              >
                Simpan
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export const AddUserForm = ({ onSuccess }: { onSuccess(): void }) => {
  const instance = useFormFactoryGenerator<UserModelType>({
    callback: (data) => {
      return (model: RootModel) =>
        model.mutateUser({
          args: data,
        });
    },
    resolver: resolverFactory({
      email: yup.string().required().email(),
      name: yup.string().required(),
    }),
    resultKey: RootStoreBaseMutations.mutateUser,
  });

  const Node = useCallback(() => {
    const Form = formWrapper<UserModelType, any>(Component, instance);
    return <Form onSuccess={onSuccess} />;
  }, []);
  return <Node />;
};
