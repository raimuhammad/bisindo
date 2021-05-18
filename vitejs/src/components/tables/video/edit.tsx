import * as React from "react";
import { VideoModelType } from "root/models/stores";
import { observer } from "mobx-react";
import { useUpdateVideo } from "components/tables/video/utils";
import { useVideoDataTable } from "components/tables/video/provider";
import { useSuccessModal } from "hooks/use-success-modal";
import { InfoField } from "pages/add-video-page/info-field";
import { Button, CircularProgress } from "@material-ui/core";

type Props = {
  model: VideoModelType;
};
export const Edit = observer(({ model }: Props) => {
  const { id, description } = model;
  const {
    loading,
    handler,
    result,
    provider: Provider,
    setFormValue,
    form,
  } = useUpdateVideo({
    initialValue: {
      description,
    },
    inputParser(args) {
      return {
        args,
        id,
      };
    },
  });

  const { setHasLoading, refresh } = useVideoDataTable();

  React.useEffect(() => {
    const { description, title, caption } = model;
    setFormValue({
      description,
      title,
      caption,
    });
  }, [model]);

  useSuccessModal({
    callback: refresh,
    message: "Video berhasil di edit",
    depedencies: Boolean(result),
  });
  React.useEffect(() => {
    setHasLoading(loading);
  }, [loading]);
  return (
    <Provider>
      <form onSubmit={handler}>
        <InfoField disableGrade />
        <Button type="submit" disabled={loading}>
          {!loading ? "Simpan" : <CircularProgress size={15} />}
        </Button>
      </form>
    </Provider>
  );
});
