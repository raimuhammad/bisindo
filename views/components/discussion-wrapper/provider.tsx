import * as React from "react";
import {
  DiscussionModelSelector,
  DiscussionModelType,
  GradeModelType,
  UserModelType,
} from "@root/models";
import { usePaginator } from "@hooks/use-paginator";
import { RootStoreBaseQueries } from "@root-model";
import { useToggle } from "@hooks/use-toggle";
import { observer } from "mobx-react";
import { orderBy } from "lodash";
import { useCreateThread } from "./use-create-thread";
import { useReplyThread } from "./use-reply-thread";

type Props = {
  user: UserModelType;
  grade: GradeModelType;
};

const useDiscussionPaginator = (grade: GradeModelType) => {
  const { paginator, data, next, reset, loading, go } = usePaginator<
    DiscussionModelType,
    any
  >({
    keepResult: true,
    initial: {
      gradeId: grade.id,
    },
    queryKey: RootStoreBaseQueries.queryDiscussion,
    modelBuilder(selector: DiscussionModelSelector) {
      return selector
        .replies((i) => i.id.user((u) => u.id.name).content.created_at)
        .id.user((u) => u.id.name).content.user_id.created_at;
    },
  });
  const [initialFetch, s] = useToggle(true);

  React.useEffect(() => {
    if (data && initialFetch) {
      s.inline(false);
    }
  }, [initialFetch, data]);

  React.useEffect(() => {
    if (initialFetch) {
      go(1);
    }
  }, [initialFetch]);

  return {
    paginator,
    data,
    refresh: reset,
    next,
    loading,
    initialFetch,
  };
};

type UseDiscussion = ReturnType<typeof useDiscussionPaginator> & {
  create: ReturnType<typeof useCreateThread>;
  reply: ReturnType<typeof useReplyThread>;
  selected: null | DiscussionModelType;
  setSelected(v: DiscussionModelType): void;
  user: UserModelType;
  grade: GradeModelType;
  deletedIds: Array<string>;
  pushDeleted(id: string): void;
};

const Context = React.createContext<null | UseDiscussion>(null);

export const useDiscussion = () => {
  const ctx = React.useContext(Context);
  if (!ctx) {
    throw new Error("Context value is undefined");
  }
  return ctx as UseDiscussion;
};

export const Provider = observer(
  ({ grade, user, children }: React.PropsWithChildren<Props>) => {
    const dataProvider = useDiscussionPaginator(grade);

    const createUtils = useCreateThread({
      user,
      grade,
      onSuccess: dataProvider.refresh,
    });

    const { data } = dataProvider;
    const [selected, setSelected] = React.useState<null | string>(null);
    const [deletedIds, setDeletedIds] = React.useState<Array<string>>([]);

    const getSelected = () => {
      if (deletedIds.includes(selected ?? "")) {
        return null;
      }
      return data.find((item) => selected && selected === item.id) ?? null;
    };
    const pushDeleted = (id: string) => setDeletedIds([...deletedIds, id]);
    const getItems = () => {
      return orderBy(
        data.filter((item) => !deletedIds.includes(item.id)),
        "created_at",
        "desc"
      );
    };

    React.useEffect(() => {
      if (deletedIds.length) {
        setSelected(null);
      }
    }, [deletedIds]);

    React.useEffect(() => {
      if (data.length && !selected) {
        setSelected(data[0]?.id ?? null);
      }
    }, [selected, data]);

    const setSelectedModel = (model: DiscussionModelType) => {
      setSelected(model?.id);
    };

    const replyUtils = useReplyThread({
      discussion: getSelected(),
      user,
      onSuccess: dataProvider.refresh,
    });

    const ctx: UseDiscussion = {
      ...dataProvider,
      create: createUtils,
      reply: replyUtils,
      selected: getSelected(),
      setSelected: setSelectedModel,
      data: getItems(),
      user,
      grade,
      pushDeleted,
      deletedIds,
    };

    return <Context.Provider value={ctx}>{children}</Context.Provider>;
  }
);
