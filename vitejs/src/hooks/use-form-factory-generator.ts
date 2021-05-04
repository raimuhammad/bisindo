import { FormBaseProps, factory } from "shared/form-factory";

export function useFormFactoryGenerator<T>(options: FormBaseProps) {
  const form = factory<T>(options);
  return form;
}
