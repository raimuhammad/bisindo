import * as React from "react";
import { useUserManagement } from "@pages/shared/user-management/provider";
import { componentMap } from "@pages/shared/user-management";
import { Action } from "@pages/shared/user-management/type";
import { PageDrawer } from "@admin-pages/shared/page-drawer";

const titleMap: Record<Action, string> = {
  activation: "Aktivasi pengguna",
  edit: "Edit",
  invitation: "Invitasi akun",
};

export const DrawerController = () => {
  const { user, close, action, isCloseDisabled } = useUserManagement();
  const isOpen = Boolean(action && user);
  const CHILD = action ? componentMap[action] : (_: any) => <></>;
  return (
    <PageDrawer
      isCloseDisable={isCloseDisabled}
      title={!action ? "" : titleMap[action]}
      close={close}
      open={isOpen}
    >
      {user ? <CHILD model={user} /> : null}
    </PageDrawer>
  );
};
