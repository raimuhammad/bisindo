import { object, ref, string } from "yup";
import { Mail, AccountCircle } from "@mui/icons-material";

export const userValidator = object({
  email: string().required().email(),
  name: string().required(),
});
export const activationValidator = object({
  password: string()
    .required("Password wajib disi")
    .min(6, "Minimal password  6 karakter"),
  passwordConfirmation: string()
    .required("Silahkan konfirmasi password")
    .oneOf([ref("password")], "Konfirmasi password salah"),
});

export const makeField = (loading: boolean) =>
  [
    {
      name: "name",
      label: "Nama",
      icon: AccountCircle,
    },
    {
      name: "email",
      type: "email",
      label: "Masukan email anda",
      icon: Mail,
    },
  ].map((item) => ({
    ...item,
    disabled: loading,
    fullWidth: true,
  }));
