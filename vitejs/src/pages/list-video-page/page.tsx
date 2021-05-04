import React from "react";
import { withListPage, WithListPageProp } from "shared/list-page";
import { VideoModel } from "root/models/stores";
import { RootStoreBaseQueries } from "root-model";
import { PageLayout } from "components/page-layout";
import { DataTable } from "components/data-table";
import { pageProperties } from "./page-properties";
import { useNavigate } from "hooks/use-navigate";
import { DescriptionViewer } from "./description-viewer";
import { RouteProps } from "react-router-dom";
import { TableCell, TableRow } from "@material-ui/core";
import { Row } from "./row";
import { observer } from "mobx-react";

const Header = () => {
  return (
    <TableRow>
      <TableCell>Video</TableCell>
      <TableCell>Tanggal upload</TableCell>
      <TableCell>Durasi video</TableCell>
    </TableRow>
  );
};

const Component = ({
  items,
  loading,
  loadData,
}: WithListPageProp<typeof VideoModel, RouteProps>) => {
  const { navigateHandler } = useNavigate();
  const pageLayoutProps = {
    pageTitle: pageProperties.title,
    customButton: {
      onClick: navigateHandler("/video/new"),
      label: pageProperties.addButton,
      icon: <pageProperties.addButtonIcon />,
    },
  };

  React.useEffect(() => {
    loadData({});
  }, []);
  return (
    <PageLayout {...pageLayoutProps}>
      <DescriptionViewer />
      <DataTable
        headerRenderer={Header}
        rowRenderer={Row}
        items={[...items]}
        refresh={() => loadData({})}
        loading={loading}
      />
    </PageLayout>
  );
};

export const Page = withListPage<typeof VideoModel>({
  subType: VideoModel,
  subTypeKey: "videos",
  queryKey: RootStoreBaseQueries.queryVideos,
  initialVar: {},
  component: Component,
  disableAutoFetch: true,
});
