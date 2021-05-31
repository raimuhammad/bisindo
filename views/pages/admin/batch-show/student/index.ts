import { Component } from "./component";
import { ProviderWrapper } from "@utils/provider-wrapper";
import { UserManagementProvider } from "@pages/shared/user-management/provider";
import { Wrapper } from "@service-provider/student-grade/paginator";

export const Student = ProviderWrapper(
  UserManagementProvider,
  Wrapper(Component)
);
