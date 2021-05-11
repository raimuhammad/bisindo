import * as React from "react";
import { ChilProps as Props } from "./type";
import { usePaginate } from "hooks/use-paginate";
import { VideoModelSelector, VideoModelType } from "root/models/stores";
import { RootStoreBaseQueries } from "root-model";
import { VideoDataTable } from "components/tables/video/video-data-table";
import { observer } from "mobx-react";
import { Box, Button } from "@material-ui/core";
import { useToggle } from "hooks/use-toggle";

export const Video = observer(({ grade, height }: Props) => {
  const [{ data, paginatorInfo }, { go }] = usePaginate<VideoModelType>({
    readOnlyVar: { gradeId: grade.id },
    queryKey: RootStoreBaseQueries.queryGetVideoByGrade,
    selector(instance: VideoModelSelector): VideoModelSelector {
      return instance.id.title.thumbnail.duration.grade((i) => i.id.name);
    },
  });

  const [openForm, { toggle }] = useToggle();

  return (
    <Box display="flex" height={height} overflow="auto" paddingRight={2}>
      <Box flexGrow={1}>
        <VideoDataTable
          data={data}
          HeaderNode={() => <Button onClick={toggle}>Tambah video</Button>}
          onPagingChange={go}
          paginatorInfo={paginatorInfo}
          height={height}
        />
      </Box>
    </Box>
  );
});
