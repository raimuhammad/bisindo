import { PropsWithChildren } from "react";

type Props = {
  when: boolean;
};
export const RenderWhen = ({ when, children }: PropsWithChildren<Props>) => {
  return <>{when ? children : null}</>;
};
