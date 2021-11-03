import * as React from "react";
import { useDiscussion } from "./provider";
import { Box, Paper, Typography } from "@mui/material";
import moment from "moment";
import { observer } from "mobx-react";

export const ThreadSwitcher = observer(() => {
  const { data, setSelected } = useDiscussion();
  return (
    <div>
      {data.map((item) => (
        <Box marginBottom={2} padding={1} key={item.id}>
          <Paper
            onClick={() => setSelected(item)}
            role="button"
            style={{ cursor: "pointer" }}
          >
            <Box padding={1}>
              <Typography>{item.user.name}</Typography>
              <Typography variant="caption" color="textSecondary">
                Dibuka pada tanggal :{" "}
                {moment(item.created_at).format("dddd, D MM Y")}
              </Typography>
            </Box>
          </Paper>
        </Box>
      ))}
    </div>
  );
});
