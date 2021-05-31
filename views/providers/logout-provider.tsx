import * as React from "react";
import { useToggle } from "@hooks/use-toggle";
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { useQuery } from "@root/models";
import { LoadingButton } from "@components/loading-button";
import { useEffect } from "react";
import { observer } from "mobx-react";

interface ILogoutProvider {
  openDialog(): void;
  closeDialog(): void;
  doLogout(): void;
}

const Context = React.createContext<null | ILogoutProvider>(null);

export function useLogout(): ILogoutProvider {
  return React.useContext(Context) as ILogoutProvider;
}

export const LogoutProvider = observer(({ children, handler: cb }: any) => {
  const [openDialog, { force }] = useToggle();

  const ctx: ILogoutProvider = {
    openDialog: force(true),
    closeDialog: force(true),
    doLogout: () => alert("doit"),
  };

  const { setQuery, data, loading } = useQuery();
  console.log(data);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (data && data["logout"]) {
      window.location.reload();
    }
  }, [data]);

  const handler = () => {
    setQuery((q: RootModel) => q.mutateLogout());
  };

  return (
    <Context.Provider value={ctx}>
      {children}
      <Dialog open={openDialog}>
        <DialogTitle>Konfirmasi logout</DialogTitle>
        <DialogContent>
          <Typography>Apakah anda yakin untuk keluar ?</Typography>
          <ButtonGroup>
            <Button disabled={loading} onClick={force(false)}>
              Tidak
            </Button>
            <LoadingButton onClick={handler} loading={loading} icon={<></>}>
              Ya
            </LoadingButton>
          </ButtonGroup>
        </DialogContent>
      </Dialog>
    </Context.Provider>
  );
});
