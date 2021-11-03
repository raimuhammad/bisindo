import * as React from "react";

import {
  selectFieldFactory,
  SelectField,
} from "@components/form-field/select-field";
import { useQuizCheck } from "./data-provider";
import { Box, List, ListItem, ListItemText } from "@mui/material";

export const UserSelector = () => {
  const { students, student, updateStudent } = useQuizCheck();
  return (
    <Box padding={2}>
      <List>
        {students.map((item) => (
          <ListItem
            button
            onClick={() => updateStudent(item)}
            selected={Boolean(student && item.id === student.id)}
            key={item.id}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
