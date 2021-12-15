import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Mail, Lock } from "@mui/icons-material";

export const loginValidator = yupResolver(
  object({
    email: string().required().email(),
    password: string().required().min(6),
  })
);

export const makeField = (loading: boolean) =>
  [
    {
      name: "email",
      type: "email",
      label: "Masukan email anda",
      icon: Mail,
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      icon: Lock,
    },
  ].map((item) => ({
    ...item,
    disabled: loading,
    fullWidth: true,
  }));
