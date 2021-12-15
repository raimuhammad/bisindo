import { ComponentType, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBatchShowProvider, Context } from "@admin-pages/batch.show/context";
import { List } from "@providers/model-provider/lists";
import { observer } from "mobx-react";
import { ScreenLoading } from "@components/screen-loading";
import { VideoModelSelector } from "@root/models";

const selector = (v: VideoModelSelector) => {
  return v.id.caption.content.title.quiz_count.duration.description.quizes(
    (q) => q.id
  );
};

export const WithBatchShow = (Component: ComponentType) => {
  return observer(() => {
    const params = useParams();
    const context = useBatchShowProvider(params);
    useEffect(() => {
      context.refreshModel();
    }, []);
    return (
      <Context.Provider value={context}>
        <List
          dataKey="videoByGrade"
          props={{ gradeId: params.id }}
          selector={selector}
        >
          {context.pageLoading || !context.model ? (
            <ScreenLoading />
          ) : (
            <Component />
          )}
        </List>
      </Context.Provider>
    );
  });
};
