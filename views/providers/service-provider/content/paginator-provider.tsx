import * as React from "react";
import { usePaginator, UsePaginator } from "@hooks/use-paginator";
import { services } from "@services/content-service";
import { useParams } from "react-router-dom";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { VideoModelType } from "@root/models";
import { observer } from "mobx-react";

interface IPaginatorProvider extends UsePaginator<VideoModelType> {
  selected: null | VideoModelType;
  setSelected(model: VideoModelType): void;
}

const Context = createContext<null | IPaginatorProvider>(null);
export function useContentPaginator(): IPaginatorProvider {
  return useContext(Context) as IPaginatorProvider;
}
const PaginatorProvider = observer(
  ({ children }: React.PropsWithChildren<any>) => {
    const params = useParams<{ id: string }>();

    const [id, setId] = useState<string>("");

    const paginator = usePaginator({
      ...services.paginateOption,
      initial: {
        gradeId: params.id,
        first: 5,
      },
    }) as UsePaginator<VideoModelType>;

    const setSelected = useCallback(({ id: selectedId }: VideoModelType) => {
      const isSameId = id === selectedId;
      setId(id && isSameId ? "" : selectedId);
    }, []);

    useEffect(() => {
      if (paginator.data.length) {
        setSelected(paginator.data[0]);
      }
    }, [paginator.data]);

    const getSelected = useCallback((): null | VideoModelType => {
      const f = paginator.data.find((item) => item.id === id);
      return f ?? null;
    }, [paginator.data, id]);

    const context: IPaginatorProvider = {
      ...paginator,
      selected: getSelected(),
      setSelected,
    };

    return (
      <Context.Provider value={context}>
        {!params.id ? null : children}
      </Context.Provider>
    );
  }
);

export const Wrapper = (Com: React.ComponentType<any>) => {
  const ContentPaginatorProvider = observer(() => {
    return (
      <PaginatorProvider>
        <Com />
      </PaginatorProvider>
    );
  });
  return ContentPaginatorProvider;
};
