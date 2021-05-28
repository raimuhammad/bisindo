import * as React from "react";
import { GradeModelType, VideoModelType } from "@root/models";
import { services } from "@services/content-service";
import { observer } from "mobx-react";
import { useCallback, useContext } from "react";
import { MutateServiceHookReturn } from "@utils/mutation-service-factory";

type Props = {
  grade?: GradeModelType;
  video?: VideoModelType;
  isUpdate?: boolean;
};

const useCreate = services.create;
const useUpdate = services.update;
export const useDelete = services.destroy;

type VideoMutation = MutateServiceHookReturn<VideoModelType, any, any>;

const Context = React.createContext<null | VideoMutation>(null);

export function useVideoForm(): VideoMutation {
  return useContext(Context) as VideoMutation;
}

const Form = observer(
  ({
    grade,
    children,
    video,
    isUpdate = false,
  }: React.PropsWithChildren<Props>) => {
    const getInitial = useCallback((): any => {
      if (grade) {
        return {
          injectInput: {
            gradeId: grade.id,
          },
        };
      }
      if (video) {
        const { title, description, caption } = video;
        return {
          injectInput: {
            id: video.id,
          },
          initialValue: {
            title,
            description,
            caption,
          },
        };
      }
      return {};
    }, [grade]);
    const useService = isUpdate ? useUpdate : useCreate;
    const context = useService({
      ...getInitial(),
      inputParser(args: any) {
        return {
          ...args,
          description: JSON.stringify(args.description),
        };
      },
    });
    const { provider: Provider } = context;
    return (
      <Context.Provider value={context}>
        <Provider>{children}</Provider>
      </Context.Provider>
    );
  }
);

export const FormProvider = (Child: React.ComponentType) => {
  const FormWrapper = observer((props: Props) => {
    return (
      <Form {...props}>
        <Child />
      </Form>
    );
  });
  return FormWrapper;
};
