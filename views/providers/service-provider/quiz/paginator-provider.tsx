import * as React from "react";
import { usePaginator, UsePaginator } from "@hooks/use-paginator";
import { service } from "@services/quiz-service";
import { useParams } from "react-router-dom";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { QuizModelType } from "@root/models";
import { observer } from "mobx-react";

export interface IQuizPaginatorProvider extends UsePaginator<QuizModelType> {
  selected: null | QuizModelType;
  setSelected(model: QuizModelType): void;
}

const Context = createContext<null | IQuizPaginatorProvider>(null);
export function useQuizPaginator(): IQuizPaginatorProvider {
  return useContext(Context) as IQuizPaginatorProvider;
}
const PaginatorProvider = observer(
  ({ children }: React.PropsWithChildren<any>) => {
    const params = useParams<{ videoId: string }>();

    const [id, setId] = useState<string>("");

    const paginator = usePaginator({
      ...service.paginatorOptions,
      initial: {
        videoId: params.videoId,
        first: 5,
      },
    }) as UsePaginator<QuizModelType>;

    const setSelected = useCallback(({ id: selectedId }: QuizModelType) => {
      const isSameId = id === selectedId;
      setId(id && isSameId ? "" : selectedId);
    }, []);

    useEffect(() => {
      if (paginator.data.length) {
        setSelected(paginator.data[0]);
      }
    }, [paginator.data]);

    const getSelected = useCallback((): null | QuizModelType => {
      const f = paginator.data.find((item) => item.id === id);
      return f ?? null;
    }, [paginator.data, id]);

    const context: IQuizPaginatorProvider = {
      ...paginator,
      selected: getSelected(),
      setSelected,
    };

    return (
      <Context.Provider value={context}>
        {!params.videoId ? null : children}
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
