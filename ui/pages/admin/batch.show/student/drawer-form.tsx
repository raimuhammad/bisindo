import { useStudentForm } from "./provider";
import { Box, Drawer, Tab, Tabs, Typography } from "@mui/material";
import * as React from "react";
import { ComponentType, Fragment, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FormField } from "@components/form-field/form-field";
import { FormProvider } from "react-hook-form";
import {
  MutationFormProvider,
  useMutationForm,
} from "@providers/model-provider/mutation";
import { observer } from "mobx-react";
import { useSnackbar } from "notistack";
import { SubmitButton } from "@components/submit-button";
import { Delete, Edit, LockOpen } from "@mui/icons-material";
import { useToggle } from "@hooks/use-toggle";
import { usePaginator } from "@providers/model-provider/paginators";
import { UserModelType } from "@root/models";
import { useMutation } from "@hooks/use-mutation";
import { RootStoreBaseMutations } from "@root-model";

const mutatemap = {
  activation: "activation",
  edit: "editUser",
};

const getParser = (user: null | UserModelType) => (data: any) => {
  if (user) {
    if (user.name === data.name) {
      delete data.name;
    }
    if (user.email === data.email) {
      delete data.email;
    }
  }
  return data;
};

function useOnSuccess(response: any, message: string) {
  const { enqueueSnackbar } = useSnackbar();
  const { handleClose } = useStudentForm();
  const { initialFetch } = usePaginator();
  useEffect(() => {
    if (response) {
      handleClose();
      enqueueSnackbar(message, {
        variant: "success",
      });
      initialFetch();
    }
  }, [response]);
}

const ActivationForm = observer(({ onLoading }: any) => {
  const { loading, form, handler, response } = useMutationForm();
  const { enqueueSnackbar } = useSnackbar();
  const { handleClose, user } = useStudentForm();
  const { initialFetch } = usePaginator();
  useOnSuccess(response, `${user?.name} berhasil di aktifkan`);
  useEffect(() => {
    onLoading(loading);
  }, [loading]);

  return (
    <FormProvider {...form}>
      <Box sx={{ p: 1, mb: 3, border: "solid 1px gray", borderRadius: 1 }}>
        <Typography>
          Gunakan form ini untuk mengaktifkan akun & memberikan password ke pada
          pengguna agar dapat login dengan password yang diberikan.
        </Typography>
      </Box>
      <form onSubmit={handler}>
        <FormField
          autoComplete="off"
          fullWidth
          variant="outlined"
          name="password"
          type="password"
          label="Password"
        />
        <FormField
          sx={{ my: 2 }}
          fullWidth
          type="password"
          variant="outlined"
          name="passwordConfirmation"
          label="Konfirmasi password"
        />
        <SubmitButton icon={<LockOpen />} loading={loading}>
          Aktifkan akun
        </SubmitButton>
      </form>
    </FormProvider>
  );
});
const EditForm = observer(({ onLoading }: any) => {
  const { loading, form, handler, response, error } = useMutationForm();
  useOnSuccess(response, `Perubahan berhasil di simpan`);
  useEffect(() => {
    if (error) {
      form.setError("email", {
        type: "backend",
        message: "Email telah di gunakan",
      });
    }
  }, [error]);
  const { user } = useStudentForm();
  useEffect(() => {
    if (user) {
      form.setValue("name", user.name);
      form.setValue("email", user.email);
    }
  }, [user]);

  useEffect(() => {
    onLoading(loading);
  }, [loading]);
  return (
    <FormProvider {...form}>
      <form onSubmit={handler}>
        <FormField
          sx={{ mb: 2 }}
          fullWidth
          variant="outlined"
          name="email"
          label="Email"
        />
        <FormField
          sx={{ mb: 2 }}
          fullWidth
          variant="outlined"
          name="name"
          label="Nama"
        />
        <SubmitButton icon={<Edit />} loading={loading}>
          Simpan perubahan
        </SubmitButton>
      </form>
    </FormProvider>
  );
});
const DeleteForm = observer(() => {
  const { user } = useStudentForm();
  const [{ loading, response, error }, handler] = useMutation({
    api: RootStoreBaseMutations.mutateUserDelete,
    merge: {
      id: user?.id,
    },
  });
  console.log(error)
  useOnSuccess(response, "Pengguna berhasil di hapus");
  return (
    <div>
      <Typography variant="subtitle1">
        Apakah anda yakin untuk menhapus akun {user?.name} ?
      </Typography>
      <SubmitButton
        onClick={() => handler({})}
        sx={{ my: 2 }}
        icon={<Delete />}
        loading={loading}
      >
        Hapus
      </SubmitButton>
    </div>
  );
});

const map: Record<string, ComponentType> = {
  activation: ActivationForm,
  edit: EditForm,
  delete: DeleteForm,
};

export const DrawerForm = () => {
  const { user, handleClose, action, changeAction } = useStudentForm();
  const Component = user ? map[action] : Fragment;
  const [hasloading, { inline }] = useToggle();
  const key = !user || action === "delete" ? "" : mutatemap[action];
  const Wrapper = user && action !== "delete" ? MutationFormProvider : Fragment;
  const wrapperProps =
    user && action !== "delete"
      ? {
          mutateKey: key,
          parser: getParser(user),
          merge: {
            id: user.id,
          },
        }
      : {};
  return (
    <Drawer
      sx={{
        zIndex: 100 * 100,
      }}
      onClose={hasloading ? undefined : handleClose}
      open={Boolean(user)}
      PaperProps={{
        sx: {
          width: ["100vw", "20vw"],
          overflow: "hidden",
        },
      }}
      anchor="right"
    >
      <Tabs onChange={(e: any, v: any) => changeAction(v)} value={action}>
        <Tab sx={{ textTransform: "none" }} value="edit" label="Edit" />
        <Tab
          sx={{ textTransform: "none" }}
          value="activation"
          label="Aktivasi akun"
          disabled={user && (user as any).status}
        />
        <Tab sx={{ textTransform: "none" }} value="delete" label="Hapus" />
      </Tabs>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={action}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            x: {
              type: "tween",
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Wrapper {...(wrapperProps as any)}>
              <Component {...((user ? { onLoading: inline } : {}) as any)} />
            </Wrapper>
          </Box>
        </motion.div>
      </AnimatePresence>
    </Drawer>
  );
};
