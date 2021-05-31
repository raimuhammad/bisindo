import * as React from "react";
import { UserModelSelector, UserModelType } from "@root/models";
import { Action } from "./type";
import { service } from "@services/auth-service";
import { useUserManagement } from "./provider";
import { useSuccessModal } from "@hooks/use-success-modal";
import { useEffect } from "react";
import { Box, Button, ButtonGroup, Typography } from "@material-ui/core";
import { observer } from "mobx-react";
import { LoadingButton } from "@components/loading-button";
import { AccountBox, Save, Send } from "@material-ui/icons";
import { FormField } from "@components/form-field/form-field";
import { useNavigate } from "@hooks/use-navigate";
import { useToggle } from "@hooks/use-toggle";
import { useApp } from "@providers/app-provider";
import { useFetchQuery } from "@hooks/use-fetch-query";
import { RootStoreBaseQueries } from "@root-model";

type Props = {
  model: UserModelType;
};

const {
  sentInvitation: useInvitation,
  editUser: useEditUser,
  activation: useActivation,
  loginUseInvitation: useLoginInvitation,
  login: useLogin,
} = service;

const useOnSuccess = (message: string, result: any, loading: boolean) => {
  const { close, whenLoading } = useUserManagement();
  useSuccessModal({
    callback: close,
    message,
    depedencies: Boolean(result),
  });
  useEffect(() => {
    whenLoading(loading);
  }, [loading]);
  return close;
};

const FieldContainer = ({ children }: any) => {
  return <Box paddingBottom={2}>{children}</Box>;
};
export const InfoBox = ({ children }: any) => {
  return (
    <Box padding={2} marginBottom={2} border="solid 1px gray" borderRadius={5}>
      {children}
    </Box>
  );
};

export const LoginForm = observer(() => {
  const { provider: Provider, result, loading, handler } = useLogin({});
  const [isInvalid, { inline }] = useToggle();
  const { setUser } = useApp();
  const [user, { fetch }] = useFetchQuery<UserModelType>({
    queryKey: RootStoreBaseQueries.queryAuth,
    builder(instance: UserModelSelector) {
      return instance.email.id.name.role.active;
    },
  });
  useSuccessModal({
    callback() {},
    depedencies: Boolean(user),
    message: "Selamat datang kembali",
  });
  useEffect(() => {
    setUser(user);
  }, [user]);

  useEffect(() => {
    fetch();
  }, [result]);

  useEffect(() => {
    if (typeof result === "boolean") {
      inline(!result);
    }
  }, [result]);

  return (
    <Box paddingY={3}>
      <Provider>
        <form onSubmit={handler}>
          <FieldContainer>
            <FormField
              label="Alamat email"
              variant="outlined"
              fullWidth
              name="email"
              type="email"
            />
          </FieldContainer>
          <FieldContainer>
            <FormField
              label="Password"
              variant="outlined"
              fullWidth
              name="password"
              type="password"
            />
          </FieldContainer>
          <FieldContainer>
            <LoadingButton
              fullWidth
              color="primary"
              variant="contained"
              loading={loading}
              type="submit"
              icon={<AccountBox />}
            >
              Login
            </LoadingButton>
          </FieldContainer>
          {isInvalid ? (
            <Typography color="secondary">
              Akun anda tidak di temukan atau kombinasi password anda salah
            </Typography>
          ) : null}
        </form>
      </Provider>
    </Box>
  );
});

const UserActivation = observer(({ model }: Props) => {
  const { provider: Provider, loading, result, handler } = useActivation({
    injectInput: {
      id: model.id,
    },
    inputParser({ password, id }: any) {
      return { password, id };
    },
  });
  useOnSuccess(
    "Password Pengguna berhasil di aktivasi & di ganti",
    result,
    loading
  );

  return (
    <Provider>
      <InfoBox>
        <Typography>
          Gunakan form ini untuk mengaktifkan akun & memberikan password ke pada
          pengguna agar dapat login dengan password yang diberikan.
        </Typography>
      </InfoBox>
      <FieldContainer>
        <FormField
          fullWidth
          variant="outlined"
          name="password"
          type="password"
          disabled={loading}
          label="Password"
        />
      </FieldContainer>
      <FieldContainer>
        <FormField
          fullWidth
          type="password"
          variant="outlined"
          name="passwordConfirmation"
          disabled={loading}
          label="Konfirmasi password"
        />
      </FieldContainer>
      <LoadingButton onClick={handler} loading={loading} icon={<Save />}>
        Simpan
      </LoadingButton>
    </Provider>
  );
});

export const InvitationForm = observer(
  ({ invitation }: { invitation: string }) => {
    const { loading, handler, provider: Provider, result } = useLoginInvitation(
      {
        injectInput: { invitation },
      }
    );
    const { navigateHandler } = useNavigate();
    useSuccessModal({
      callback: navigateHandler("/"),
      message: "Password anda telah di buat silahkkan login",
      depedencies: Boolean(result),
    });
    return (
      <Provider>
        <FieldContainer>
          <FormField
            fullWidth
            variant="outlined"
            name="password"
            type="password"
            disabled={loading}
            label="Password"
          />
        </FieldContainer>
        <FieldContainer>
          <FormField
            fullWidth
            type="password"
            variant="outlined"
            name="passwordConfirmation"
            disabled={loading}
            label="Konfirmasi password"
          />
        </FieldContainer>
        <LoadingButton
          fullWidth
          color="primary"
          variant="contained"
          onClick={handler}
          loading={loading}
          icon={<Save />}
        >
          Ganti password
        </LoadingButton>
      </Provider>
    );
  }
);

const UserEditor = observer(({ model }: Props) => {
  const { provider: Provider, loading, result, handler, form } = useEditUser({
    initialValue: {
      email: model.email,
      name: model.name,
    },
    injectInput: {
      id: model.id,
    },
    inputParser({ email, name, id }: any) {
      const arg = { email, name, id };
      if (model.email === email) {
        delete arg.email;
      }
      if (model.name === name) {
        delete arg.name;
      }
      return arg;
    },
  });
  const {
    formState: { isDirty },
  } = form;
  useOnSuccess("Informasi pengguna berhasil di ubah", result, loading);

  return (
    <Provider>
      <FieldContainer>
        <FormField
          fullWidth
          variant="outlined"
          name="name"
          disabled={loading}
          label="Nama siswa"
        />
      </FieldContainer>
      <FieldContainer>
        <FormField
          fullWidth
          variant="outlined"
          name="email"
          disabled={loading}
          label="Email"
        />
      </FieldContainer>
      <LoadingButton
        onClick={handler}
        disabled={!isDirty}
        loading={loading}
        icon={<Save />}
      >
        Simpan
      </LoadingButton>
    </Provider>
  );
});

const UserInvitation = observer(({ model }: Props) => {
  const { result, loading, resolver } = useInvitation({
    injectInput: {
      id: model.id,
    },
  });
  const onCancel = useOnSuccess("Invitasi berhasil di kirim", result, loading);
  return (
    <div>
      <InfoBox>
        <Typography>
          Pengiriman invitasi ke email {model.email} di gunakan untuk calon
          siswa dapat login & mengganti default password.
        </Typography>
      </InfoBox>
      <Typography>Kirim invitasi ke email : {model.email} ? </Typography>
      <Box display="flex" paddingY={2} justifyContent="flex-end">
        <ButtonGroup>
          <Button disabled={loading} onClick={onCancel} color="secondary">
            Batal
          </Button>
          <LoadingButton
            onClick={() => resolver()}
            loading={loading}
            color="primary"
            icon={<Send />}
          >
            Ya
          </LoadingButton>
        </ButtonGroup>
      </Box>
    </div>
  );
});
export const componentMap: Record<Action, React.ComponentType<Props>> = {
  activation: UserActivation,
  edit: UserEditor,
  invitation: UserInvitation,
};
