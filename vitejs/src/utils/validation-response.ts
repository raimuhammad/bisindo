import { useForm } from "react-hook-form";
import voca from "voca";

type ErrorsProps = {
  errors: Record<string, Array<string>>;
  message: string;
};

export class ValidationResponse {
  errors: Record<string, Array<string>> = {};

  constructor(props: ErrorsProps) {
    Object.assign(this, props);
  }

  makeFieldError = ({ setError }: ReturnType<typeof useForm>) => {
    Object.keys(this.errors).forEach((key) => {
      const field = this.errors[key];
      setError(key, {
        message: voca(field[0]).replaceAll("args.", "").value(),
        type: "validate",
      });
    });
  };

  static fromErrorObject(errors: any) {
    if (errors && errors.response) {
      if (errors.response && errors.response.errors) {
        const errorList = errors.response.errors as Array<Record<string, any>>;
        const errorObject = errorList.find((item) => {
          const extension = item.extensions ?? { category: "null" };
          return extension.category === "validation";
        });
        if (errorObject) {
          const { extensions } = errorObject;
          const errors: Record<string, Array<string>> = {};
          const validation = extensions.validation ?? {};
          Object.keys(validation).forEach((key) => {
            const name = key.replace("args.", "");
            errors[name] = validation[key];
          });
          return new ValidationResponse({
            message: errorObject.message,
            errors,
          });
        }
      }
    }
  }
}
