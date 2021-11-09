import credentials from "@root/email.json";
import { useToggle } from "@hooks/use-toggle";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { VerifiedUser } from "@mui/icons-material";
import { useApp } from "@providers/application-provider";
import { useCallback } from "react";
import { useAuthFunctions, useRootStore } from "@providers/model-provider";

export const LoginControl = () => {
  const [hover, { force }] = useToggle();
  const { user, setUser } = useApp();
  const authFunction = useAuthFunctions();
  const rootStore = useRootStore();
  const doLogin = useCallback(() => {
    return rootStore.mutateLogin(credentials).then(({ login }) => {
      if (login) {
        return authFunction(setUser);
      }
    });
  }, []);

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial example"
        open={hover}
        sx={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
        }}
        onMouseEnter={force(true)}
        onMouseLeave={force(false)}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          onClick={doLogin}
          FabProps={{
            disabled: Boolean(user),
          }}
          tooltipTitle="Login"
          icon={<VerifiedUser />}
        />
      </SpeedDial>
    </>
  );
};
