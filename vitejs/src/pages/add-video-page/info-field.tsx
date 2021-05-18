import * as React from "react";
import { Box, FormLabel, Grid, Theme, useMediaQuery } from "@material-ui/core";
import { observer } from "mobx-react";
import { FormField } from "components/form-fields/form-field";
import { TextEditor } from "components/form-fields/text-editor-field";
import { GradeField } from "components/form-fields/grade-field";
import { useLocation } from "react-router-dom";
import voca from "voca";

const fields = [
  { name: "title", label: "Judul" },
  { name: "caption", label: "Caption" },
];

export const InfoField = observer(
  ({ disableGrade }: { disableGrade?: boolean }) => {
    const isSm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

    const location = useLocation();
    const gradeId = voca(location.search).replaceAll("?gradeId=", "").value();

    const getPading = (index: number) => {
      if (isSm)
        return {
          marginTop: "1rem",
        };
      const n = index + 1;
      let key = "paddingLeft";
      if (n % 2 !== 0) {
        key = "paddingRight";
      }
      return { [key]: "1rem" };
    };

    return (
      <Grid container justify="space-between" style={{ marginTop: "1rem" }}>
        {fields.map((item, index) => (
          <Grid sm={12} md={6} item key={item.name}>
            <Box style={getPading(index)}>
              <FormField variant="outlined" fullWidth {...item} />
            </Box>
          </Grid>
        ))}
        {!disableGrade ? (
          <Grid item sm={12}>
            <Box paddingY={2}>
              <GradeField gradeId={gradeId} />
            </Box>
          </Grid>
        ) : null}
        <Grid item sm={12}>
          <Box paddingY={2}>
            <FormLabel>Deskripsi</FormLabel>
            <TextEditor name="description" />
          </Box>
        </Grid>
      </Grid>
    );
  }
);
