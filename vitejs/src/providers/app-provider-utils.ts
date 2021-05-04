import { RootStoreType, UserModelType } from "root/models/stores";
import voca from "voca";

export enum AppStatus {
  INVITATION_FAIL = "invitation_fail",
  INVITATION_SUCCESS = "invitation_success",
  CHANGE_USER_PASSWORD = "change_user_password",
  LOGGED_IN = "logged_in",
  GUEST = "guest",
  INIT = "init",
}

const loginUsingInvitation = async (
  root: RootStoreType
): Promise<boolean | AppStatus> => {
  const search = voca(window.location.search).replace("?", "").value();
  if (!search || !search.includes("invitation")) {
    return false;
  }
  const arr = search.split("=");
  if (arr.length >= 2) {
    try {
      const invitation = arr[1];
      const result = await root.mutateLoginWithInvitation({
        invitation,
      });
      return result.loginWithInvitation
        ? AppStatus.INVITATION_SUCCESS
        : AppStatus.INVITATION_FAIL;
    } catch (e) {
      return AppStatus.INVITATION_FAIL;
    }
  }
  return false;
};

type ReturnTypeBootApp = {
  user: UserModelType | null;
  status: AppStatus;
};

export const bootApp = async (
  root: RootStoreType,
  checkInvitation = true
): Promise<ReturnTypeBootApp> => {
  const invitation = !checkInvitation ? null : await loginUsingInvitation(root);
  const result = await root.queryAuth();
  if (checkInvitation) {
    if (invitation === AppStatus.INVITATION_FAIL) {
      return {
        user: null,
        status: AppStatus.INVITATION_FAIL,
      };
    }
    if (!result.auth) {
      return {
        status: AppStatus.GUEST,
        user: null,
      };
    }

    if (typeof invitation !== "boolean" && result.auth.need_change_password) {
      return {
        user: result.auth,
        status: AppStatus.CHANGE_USER_PASSWORD,
      };
    }
  }
  return {
    user: result.auth,
    status: result.auth ? AppStatus.LOGGED_IN : AppStatus.GUEST,
  };
};
