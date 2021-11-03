import { ComponentType, forwardRef, ReactNode } from "react";
import { Icon, InputBase, Box } from "@mui/material";
import type { InputBaseProps } from "@mui/material";
import clsx from "clsx";
import { useSoftUi } from "../../soft-ui";
import { useClasses } from "./styles";

type WithIcon = {
  icon: ReactNode;
  direction?: "none" | "left" | "right";
};

type Props = {
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
  customClass?: string;
  withIcon?: WithIcon;
} & InputBaseProps;

const NoIcon = forwardRef(
  (
    {
      size = "medium",
      disabled = false,
      error = false,
      success = false,
      customClass = "",
      ...rest
    }: Omit<Props, "withIcon">,
    ref: any
  ) => {
    const [controller] = useSoftUi();
    const { direction } = controller;
    const classes = useClasses({ size, error, success, direction, disabled });
    return (
      <InputBase
        {...rest}
        ref={ref}
        className={clsx(classes.suiInput, customClass, {
          [classes.suiInput_error]: error,
          [classes.suiInput_success]: success,
          [classes[`suiInput_${size}`]]: size,
        })}
        classes={{
          focused: classes.suiInput_focused,
          disabled: classes.suiInput_disabled,
          error: classes.suiInput_error,
          multiline: classes.suiInput_multiline,
        }}
      />
    );
  }
);

const LeftIcon = forwardRef(
  (
    {
      size = "medium",
      disabled = false,
      error = false,
      success = false,
      customClass = "",
      withIcon,
      ...rest
    }: Props,
    ref: any
  ) => {
    const classes = useClasses({ size, error, success, direction: "right", disabled });
    return (
      <Box ref={ref} className={clsx(classes.suiInputIcon, customClass)}>
        <Box className={classes.suiInputIcon_right}>
          <Icon className={classes.suiInputIcon_icon} fontSize="small">
            {withIcon.icon}
          </Icon>
        </Box>
        <InputBase
          {...rest}
          className={clsx(classes.suiInput, classes.suiInputIcon_input, {
            [classes.suiInput_error]: error,
            [classes.suiInput_success]: success,
            [classes[`suiInput_${size}`]]: size,
          })}
          classes={{
            focused: classes.suiInput_focused,
            disabled: classes.suiInput_disabled,
            error: classes.suiInput_error,
            multiline: classes.suiInput_multiline,
          }}
        />
      </Box>
    );
  }
);
const RightIcon = forwardRef(
  (
    {
      size = "medium",
      disabled = false,
      error = false,
      success = false,
      customClass = "",
      withIcon,
      ...rest
    }: Props,
    ref: any
  ) => {
    const classes = useClasses({ size, error, success, direction: "left", disabled });
    return (
      <Box ref={ref} className={clsx(classes.suiInputIcon, customClass)}>
        <InputBase
          {...rest}
          className={clsx(classes.suiInput, classes.suiInputIcon_input, {
            [classes.suiInput_error]: error,
            [classes.suiInput_success]: success,
            [classes[`suiInput_${size}`]]: size,
          })}
          classes={{
            focused: classes.suiInput_focused,
            disabled: classes.suiInput_disabled,
            error: classes.suiInput_error,
            multiline: classes.suiInput_multiline,
          }}
        />
        <Box className={classes.suiInputIcon_right}>
          <Icon className={classes.suiInputIcon_icon} fontSize="small">
            {withIcon.icon}
          </Icon>
        </Box>
      </Box>
    );
  }
);

export const SuiInput: ComponentType<Props> = forwardRef((props: Props, ref: any) => {
  const {
    size = "medium",
    disabled = false,
    error = false,
    success = false,
    customClass = "",
    withIcon = undefined,
  } = props;
  if (!withIcon) {
    return <NoIcon {...props} ref={ref} />;
  }
  const Cmap = {
    left: LeftIcon,
    right: RightIcon,
  };
  const direction = withIcon.direction
    ? withIcon.direction === "none"
      ? "left"
      : "right"
    : "left";
  const Component = Cmap[direction];
  return (
    <Component
      {...props}
      withIcon={{
        direction,
        icon: withIcon.icon,
      }}
      ref={ref}
    />
  );
});
