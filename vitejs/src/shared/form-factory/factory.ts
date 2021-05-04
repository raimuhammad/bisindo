import { FormBase, FormBaseProps } from "./interface";

export function factory<T>(options: FormBaseProps): FormBase<T> {
  return new FormBase<T>(options);
}
