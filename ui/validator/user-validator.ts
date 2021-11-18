import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Mail, AccountCircle } from "@mui/icons-material";

export const userValidator = (
  object({
    email: string().required().email(),
    name: string().required(),
  })
);

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