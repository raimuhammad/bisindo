import * as React from "react";
import { Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { observer } from "mobx-react";
import { useLayout } from "root/layout/layout.store";
import { useClasses } from "./styles";

export const WelcomeText = observer(() => {
  const classes = useClasses();
  return (
    <div className={classes.welcomeContainer}>
      <div>
        <Typography variant="h3">Selamat datang di bisindo</Typography>
        <Typography align="center">Belajar bahasa isyarat indonesia</Typography>
      </div>
    </div>
  );
});
