import React from "react";
import { withListPage, WithListPageProp } from "shared/list-page";
import { RouteComponentProps } from "react-router-dom";
import { QuizModel, VideoModelType } from "root/models/stores";
import { RootStoreBaseQueries } from "root-model";
import { ModelPage } from "components/model-page";
import { PageLayout } from "components/page-layout";
import { AddQuizForm } from "./add-quiz-form";
import { observer } from "mobx-react";
import { DataTable } from "components/data-table";
import { TableCell, TableHead, TableRow } from "@material-ui/core";
import { Row } from "./row";

type Props = WithListPageProp<
  typeof QuizModel,
  RouteComponentProps<{ video_id: string }>
>;

type PageProps = {
  video: VideoModelType;
  refresh(): void;
};

const ComponentPage = ({
  children,
  video,
  refresh,
}: React.PropsWithChildren<PageProps>) => {
  return (
    <PageLayout
      customButton={<AddQuizForm refresh={refresh} video={video} />}
      backPath="/video"
      pageTitle="Quis"
    >
      {children}
    </PageLayout>
  );
};

@observer
class Component extends ModelPage<VideoModelType, Props, any> {
  fallbackUrl(): string {
    return "";
  }

  getKey(): keyof RootModel {
    return "videos";
  }

  getParams(match: any): string {
    return match.params.video_id;
  }

  fetchData = () => {
    if (this.model) {
      this.props.loadData({
        videoId: this.model.id,
      });
    }
  };

  componentDidMount() {
    super.componentDidMount();
    this.fetchData();
  }

  headerRenderer = () => (
    <>
      <TableRow>
        <TableCell colSpan={2}>Jenis</TableCell>
        <TableCell>Di putar pada menit</TableCell>
      </TableRow>
    </>
  );

  render() {
    if (!this.model) return null;
    return (
      <ComponentPage video={this.model} refresh={this.fetchData}>
        <DataTable
          headerRenderer={this.headerRenderer}
          rowRenderer={Row}
          refresh={this.fetchData}
          loading={this.props.loading}
          items={this.props.items}
        />
      </ComponentPage>
    );
  }
}

export const Page = withListPage<typeof QuizModel>({
  subType: QuizModel,
  subTypeKey: "quizzes",
  queryKey: RootStoreBaseQueries.queryQuizVideo,
  initialVar: {},
  component: Component,
  disableAutoFetch: true,
});
