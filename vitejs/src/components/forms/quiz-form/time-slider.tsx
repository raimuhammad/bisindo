import * as React from "react";
import { VideoModelType } from "root/models/stores";
import { useFormContext } from "react-hook-form";
import { Box, FormLabel, Slider, Typography } from "@material-ui/core";
import { getDurationTimeText } from "utils/get-duration-time";
import { Player } from "../../player";
import { useToggle } from "hooks/use-toggle";

type Props = {
  model: VideoModelType;
};

export const TimeSlider = ({ model }: Props) => {
  const form = useFormContext();
  const [val, setVal] = React.useState(() => {
    const v = form.getValues("show_at");
    return v ?? 0;
  });
  const handleChange = (e: any, v: any) => setVal(v);

  React.useEffect(() => {
    form.register("show_at");
  }, []);

  React.useEffect(() => {
    if (val) {
      form.setValue("show_at", val);
    }
  }, [val]);
  const [play, { toggle }] = useToggle(false);
  return (
    <Box paddingY={2}>
      <Player
        url={model.content as string}
        onContainerClick={toggle}
        play={play}
      />
      <Box marginTop={1}>
        <FormLabel>Di tampilkan pada menit</FormLabel>
        <Box>
          <Slider
            min={0}
            max={model.duration}
            track={false}
            onChange={handleChange}
            valueLabelDisplay="off"
          />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle2">{getDurationTimeText(0)}</Typography>
          <Typography variant="subtitle2">
            {getDurationTimeText(val)}
          </Typography>
          <Typography variant="subtitle2">
            {getDurationTimeText(model.duration as number)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
