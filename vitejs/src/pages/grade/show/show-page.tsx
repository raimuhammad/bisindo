import * as React from "react";
import {
  preloadPageFactory,
  PreloadComponentProp,
} from "components/preload-page";
import { GradeModelType } from "root/models/stores";
import { RootStoreBaseQueries } from "root-model";
import { PageLayout, usePageLayout } from "components/page-layout";
import { Tabs, Tab, AppBar, Box } from "@material-ui/core";
import { useSwitchValue } from "hooks/use-switch-value";
import { ChilProps, Content } from "./type";
import { Students } from "./students";
import { Discussion } from "./discussion";
import { Video } from "./video";
import { useNodeDimension } from "hooks/use-node-dimension";
import { Editor } from "./editor";
/**
 * Component tab untuk mengontrol konten yang tampilkan oleh halaman
 */
const Controller = ({
  children,
}: {
  children(content: Content, height: number): React.ReactNode;
}) => {
  const [content, callback] = useSwitchValue<Content>(
    ["student", "video", "discussion"],
    "student"
  );
  const { contentHeight } = usePageLayout();
  const { nodeRef, dimension } = useNodeDimension();
  const childHeight = contentHeight - dimension.height;
  return (
    <>
      <div ref={nodeRef as any}>
        <Box paddingRight={2}>
          <AppBar position="static">
            <Tabs
              onChange={(e: any, v: Content) => callback(v)()}
              value={content}
            >
              <Tab label="Siswa" value="student" />
              <Tab label="Konten video" value="video" />
              <Tab label="Diskusi" value="discussion" />
            </Tabs>
          </AppBar>
        </Box>
      </div>
      {children(content, childHeight)}
    </>
  );
};

const Page = ({ model }: PreloadComponentProp<GradeModelType>) => {
  const componentMap: Record<Content, React.ComponentType<ChilProps>> = {
    discussion: Discussion,
    video: Video,
    student: Students,
  };
  const renderChild = React.useCallback(
    (content: Content, h: number) => {
      const Node = componentMap[content];
      return <Node grade={model} height={h} />;
    },
    [model]
  );
  return (
    <PageLayout
      customButton={<Editor grade={model} />}
      backPath="/grades"
      pageTitle={`${model.name}`}
    >
      <Controller>{renderChild}</Controller>
    </PageLayout>
  );
};

export const ShowPage = preloadPageFactory<GradeModelType>(
  {
    queryKey: RootStoreBaseQueries.queryGradeById,
  },
  Page
);
