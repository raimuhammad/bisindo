import {
  Box,
  Typography,
  Paper,
  Divider,
  InputAdornment,
  Button,
  CircularProgress,
  Collapse,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { FormField } from "@components/form-field/form-field";
import { useAuthFunctions, useLoginForm } from "@providers/model-provider";
import { observer } from "mobx-react";
import { makeField } from "../../validator/login-validator";
import { useComponentMapper } from "@hooks/use-component-mapper";
import { ExitToApp } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { useApp } from "@providers/application-provider";
import { useHistory } from "react-router-dom";
import { AppRole } from "@root/models";

const sx = {
  display: {
    sm: "block",
    md: "flex",
  },
  bgcolor: "primary.main",
  height: "100vh",
  overflow: "hidden",
  "& > .content": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: {
      sm: "100%",
      md: "50%",
    },
    height: "100%",
  },
};

const FieldContrainer = ({ icon: Icon, ...props }: any) => {
  return (
    <Box sx={{ marginY: 2, padding: 2 }}>
      <FormField
        {...props}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Icon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

const useOnAuthenticated = () => {
  const authFunction = useAuthFunctions();
  const { enqueueSnackbar } = useSnackbar();
  const app = useApp();
  const history = useHistory();
  return () => {
    authFunction().then((user) => {
      if (user) {
        const { name } = user;
        enqueueSnackbar(`Selamat datang ${name}`);
        history.push(user.role === AppRole.ADMIN ? "/batch" : "/study");
        app.setUser(user as any);
      }
    });
  };
};

const Form = observer(() => {
  const callback = useOnAuthenticated();
  const { isCredentialInvalid, form, onSubmit, loading } =
    useLoginForm(callback);
  const fields = makeField(loading);
  const Fields = useComponentMapper({
    getKey({ name }) {
      return name;
    },
    component: FieldContrainer,
    data: fields,
  });
  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <Fields />
        <Box textAlign="right" padding={2}>
          <Collapse in={isCredentialInvalid} timeout="auto">
            <Typography
              sx={{ color: "error.light", marginY: 2 }}
              variant="subtitle2"
            >
              Kombinasi email & password salah
            </Typography>
          </Collapse>
          <Button
            variant="contained"
            size="large"
            type="submit"
            endIcon={
              loading ? (
                <CircularProgress sx={{ color: "white" }} size={15} />
              ) : (
                <ExitToApp />
              )
            }
          >
            Masuk
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
});

export const Login = () => {
  return (
    <Box component="main" sx={sx as any}>
      <div className="content">
        <Box sx={{ color: "white" }}>
          <Typography variant="h1">Bisindo</Typography>
          <Typography variant="h5">Selamat datang</Typography>
          <Typography>
            Kami adalah platform kursus online untuk pembelajaran bahasa
            isyarat.
          </Typography>
        </Box>
      </div>
      <div className="content">
        <Paper
          sx={{ padding: 2, width: "80%", height: "60%", color: "#2c3e50" }}
        >
          <Typography align="center" variant="h5" sx={{ fontWeight: "light" }}>
            Login dengan email & password anda
          </Typography>
          <Divider sx={{ marginY: 2 }} />
          <Form />
        </Paper>
      </div>
    </Box>
  );
};
