import * as React from "react";
import { withListPage, WithListPageProp } from "shared/list-page";
import { UserModel, UserModelType } from "root/models/stores";
import { RootStoreBaseMutations, RootStoreBaseQueries } from "root-model";
import { TableCell, TableRow } from "@material-ui/core";
import { RouteProps } from "react-router-dom";
import { PageLayout } from "components/page-layout";
import { DataTable } from "components/data-table";
import { Row } from "./row";
import { UserDrawer } from "./user-drawer";
import { useFormFactoryGenerator } from "hooks/use-form-factory-generator";
import { resolverFactory } from "utils/resolver-factory";
import * as yup from "yup";

const Header = () => {
  return (
    <TableRow>
      <TableCell colSpan={2}>Nama</TableCell>
      <TableCell>Email</TableCell>
      <TableCell>Status</TableCell>
    </TableRow>
  );
};

export const Page = ({
  items,
  loading,
  loadData,
}: WithListPageProp<typeof UserModel, RouteProps>) => {
  const formProps = useFormFactoryGenerator<UserModelType>({
    callback: (data) => {
      return (model: RootModel) =>
        model.mutateUser({
          args: data,
        });
    },
    resolver: resolverFactory({
      email: yup.string().required().email(),
      name: yup.string().required(),
    }),
    resultKey: RootStoreBaseMutations.mutateUser,
  });
  return (
    <PageLayout
      pageTitle="Data siswa"
      customButton={<UserDrawer onSuccess={() => loadData({})} />}
    >
      <DataTable
        items={items}
        rowRenderer={Row}
        headerRenderer={Header}
        refresh={() => loadData({})}
        loading={loading}
      />
    </PageLayout>
  );
};

export const StudentListPage = withListPage<typeof UserModel>({
  subType: UserModel,
  subTypeKey: "users",
  queryKey: RootStoreBaseQueries.queryStudents,
  initialVar: {},
  component: Page,
  disableAutoFetch: false,
});
