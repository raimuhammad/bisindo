import React from "react";
import { FormBase, Instance } from "shared/form-factory";
import { observer } from "mobx-react";
import { FormProvider } from "react-hook-form";
import { LoadingBackdrop } from "./loading-backdrop";

export type WrapperProps<T, P> = {
  instance: Omit<Instance<T>, "Provider">;
} & P;

export function formWrapper<T, P = any>(
  Component: React.FC<WrapperProps<T, P>>,
  instance: FormBase<any>
) {
  const Node = observer((props: P) => {
    const utility = instance.instance();
    return (
      <FormProvider {...utility.form}>
        <LoadingBackdrop loading={utility.loading} />
        <Component instance={utility} {...props} />
      </FormProvider>
    );
  });
  return Node;
}
