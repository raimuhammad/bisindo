import voca from "voca";
import { useToggle } from "@hooks/use-toggle";
import { FormField } from "@components/form-field/form-field";
import { Box } from "@mui/material";
import { useWatch } from "react-hook-form";

export const CommonField = ({
  label,
  onlyUnique = false,
}: {
  label: string;
  onlyUnique?: boolean;
}) => {
  const [isFormError, { inline }] = useToggle();
  const text = useWatch({
    name: "text",
  }) as string;
  const onKeyDown = (event: any) => {
    const isnum = voca(event.key).isNumeric();
    if (isnum) {
      event.preventDefault();
      return;
    }
    if (isFormError) {
      inline(false);
    }
    if (text.includes(event.key)) {
      event.preventDefault();
      inline(true);
    }
  };

  let props: Record<string, any> = {
    size: "small",
    fullWidth: true,
    helperText: !isFormError ? "" : "Huruf telah di gunakan",
    error: isFormError,
    name: "text",
  };
  if (onlyUnique) {
    props.onKeyDown = onKeyDown;
  }
  return (
    <Box sx={{ pr: 2 }}>
      <FormField name="text" {...(props as any)} label={label} />
    </Box>
  );
};
