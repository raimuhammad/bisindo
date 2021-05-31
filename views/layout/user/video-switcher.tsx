/* eslint-disable */
import * as React from "react";
import { useState } from "react";
import { useStudent } from "@providers/student-app-provider";
import { Box, Button, List, ListItem, ListItemText } from "@material-ui/core";
import { FormField } from "@components/form-field/form-field";
import { useNodeDimension } from "@hooks/use-node-dimension";
import { ArrowBack } from "@material-ui/icons";

type Props = {
  height: number;
};

export const VideoSwitcher = ({ height }: Props) => {
  const [search, setSearch] = useState<string>("");

  const { videos } = useStudent();

  const items = search
    ? videos.filter((item) => {
        return (item.title as string)
          .toLowerCase()
          .includes(search.toLowerCase());
      })
    : videos;

  const { nodeRef, dimension } = useNodeDimension();
  const listHeight = height - dimension.height;
  return (
    <Box bgcolor="white" height={height} overflow="hidden">
      <Box
        // @ts-ignore
        ref={nodeRef}
        padding={1}
      >
        <Box marginBottom={1}>
          <Button color="primary" startIcon={<ArrowBack />} fullWidth>
            Kembali
          </Button>
        </Box>
        <FormField
          name="search"
          fullWidth
          variant="outlined"
          value={search}
          label="Cari video"
          onChange={(e) => setSearch(e.target.value)}
          noUseForm
        />
      </Box>
      <Box style={{ height: listHeight, overflow: "auto" }}>
        <List>
          {items.map((item) => (
            <ListItem key={item.id} button>
              <ListItemText secondary={item.title} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};
