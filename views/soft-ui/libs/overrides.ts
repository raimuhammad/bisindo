type ComponentType<T> = import("react").ComponentType<T>;

type SuiBoxType = ComponentType<import("@mui/material/Box").BoxProps & { customClass?: string }>;
type SuiInputType = ComponentType<
  import("@mui/material/InputBase").InputBaseProps & {
    customClass?: string;
    error?: boolean;
    success?: boolean;
    placeholder?: string;
    withIcon?: {
      direction?: "none" | "left" | "right";
      icon?: boolean | import("react").ElementType | string;
    };
  }
>;
