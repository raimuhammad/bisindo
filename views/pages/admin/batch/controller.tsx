import { Box, Button, ButtonGroup } from "@material-ui/core";
import * as React from "react";
import { useStore } from "./provider";

export const Controller = () => {
  const { nextDisabled, prevDisabled, next, prev, setAction } = useStore();
  return (
    <Box marginLeft="auto" display="flex">
      <ButtonGroup size="small" color="inherit">
        <Button disabled={prevDisabled} onClick={prev}>
          Sebelumnya
        </Button>
        <Button disabled={nextDisabled} onClick={next}>
          Selanjutnya
        </Button>
      </ButtonGroup>
      <Box marginLeft={1}>
        <Button
          onClick={() => setAction()}
          variant="contained"
          color="primary"
          size="small"
        >
          Tambah batch
        </Button>
      </Box>
    </Box>
  );
};
