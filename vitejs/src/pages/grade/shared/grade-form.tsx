import * as React from "react";
import { gradeService } from "services/grade";
import { observer } from "mobx-react";
import { FormField } from "components/form-fields/form-field";
import { useSuccessModal } from "hooks/use-success-modal";
import { Box, Button, CircularProgress } from "@material-ui/core";

type Props =
  | ReturnType<typeof gradeService["create"]>
  | ReturnType<typeof gradeService["update"]>;

export const GradeForm = observer(
  ({
    provider: Provider,
    handler,
    loading,
    onClose,
  }: Props & { onClose: () => void }) => {
    return (
      <Provider>
        <form onSubmit={handler}>
          <Box paddingY={2}>
            <FormField fullWidth label="Nama batch" name="name" />
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={onClose} disabled={loading} color="secondary">
              Tutup
            </Button>
            <Button
              disabled={loading}
              variant="outlined"
              color="primary"
              type="submit"
            >
              {loading ? <CircularProgress size={15} /> : "Simpan"}
            </Button>
          </Box>
        </form>
      </Provider>
    );
  }
);
