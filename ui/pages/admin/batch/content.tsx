import type { GradeModelType } from "@root/models";
import { observer } from "mobx-react";
import { usePaginator } from "@providers/model-provider/paginators";
import { ReactNode, useEffect, useState } from "react";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { Delete, OndemandVideo, Save, School } from "@mui/icons-material";
import { FormDialog } from "@components/form-dialog";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { batchValidator } from "@root/validator/batch-validator";
import { FormField } from "@components/form-field/form-field";
import { useMutation } from "@hooks/use-mutation";
import { RootStoreBaseMutations } from "@root-model";
import { SubmitButton } from "@components/submit-button";
import { usePopup } from "@hooks/use-popup";
import { useNavigation } from "@hooks/use-navigation";
import voca from "voca";

type State = {
  selected: null | GradeModelType;
  action: null | "delete" | "update";
};

type Props = {
  batch: GradeModelType;
  onSelect(v: GradeModelType, type: State["action"]): () => void;
};
/**
 * Icon & informasi batch
 *
 */
const Info = ({ icon, text }: { text: string; icon: ReactNode }) => {
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", mr: 2 }}>
      <Box sx={{ mr: 2 }}>{icon}</Box>
      <Typography variant="caption">{text}</Typography>
    </Box>
  );
};
/**
 * Komponen penampil batch
 */
const BatchCard = observer(({ batch, onSelect }: Props) => {
  const path = `/classroom/${voca(batch.name).slugify().value()}/${
    batch.id
  }/videos`;
  const { navigate } = useNavigation(path);
  return (
    <Paper
      sx={{
        p: 2,
        mx: [1, 0],
        mb: 2,
        display: ["block", "flex"],
      }}
    >
      <Box sx={{ width: ["100%", "80%"] }}>
        <Typography variant="h4" sx={{ textTransform: "capitalize" }}>
          {batch.name}
        </Typography>
        <Info text={`${batch.student_count} siswa`} icon={<School />} />
        <Info text={`${batch.video_count} video`} icon={<OndemandVideo />} />
      </Box>
      <Box sx={{ width: ["100%", "20%"], "& >button": { mb: 1 } }}>
        <Button onClick={navigate} size="small" fullWidth variant="outlined">
          Manage
        </Button>
        <Button
          onClick={onSelect(batch, "update")}
          size="small"
          fullWidth
          variant="outlined"
        >
          Ganti nama batch
        </Button>
        <Button
          onClick={onSelect(batch, "delete")}
          size="small"
          fullWidth
          variant="outlined"
        >
          Hapus
        </Button>
      </Box>
    </Paper>
  );
});
/**
 * Dialog form update nama batch
 */
const UpdateForm = observer(
  ({ selected, action, handleClose }: State & { handleClose(): void }) => {
    const form = useForm({
      resolver: yupResolver(batchValidator),
    });
    const [{ response, loading }, api] = useMutation<GradeModelType>({
      api: RootStoreBaseMutations.mutateGradeEdit,
      merge: { id: selected ? selected.id : "" },
    });
    const onSubmit = form.handleSubmit(api);
    const showPopup = usePopup({
      show: Boolean(response && action === "update"),
      message: "Perubahan berhasil disimpan",
      variant: "success",
      autoShow: false,
    });
    useEffect(() => {
      if (response) {
        handleClose();
        showPopup();
      }
    }, [response]);

    useEffect(() => {
      if (selected) {
        form.setValue("name", selected.name);
      }
    }, [selected]);

    return (
      <FormDialog
        handleClose={handleClose}
        open={action === "update"}
        isCloseDisabled={loading}
      >
        <FormProvider {...form}>
          <form onSubmit={onSubmit}>
            <Typography variant="subtitle1">Ganti nama batch</Typography>
            <FormField fullWidth name="name" />
            <SubmitButton icon={<Save />} loading={loading}>
              Simpan
            </SubmitButton>
          </form>
        </FormProvider>
      </FormDialog>
    );
  }
);
const DeleteForm = observer(
  ({ selected, action, handleClose }: State & { handleClose(): void }) => {
    const [{ response, loading }, dispatch] = useMutation<GradeModelType>({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      api: RootStoreBaseMutations.mutateGradeDelete,
      merge: { id: selected ? selected.id : "" },
    });
    const showPopUp = usePopup({
      message: response ? `${response.name} berhasil di hapus` : "",
      autoShow: false,
      variant: "success",
      show: Boolean(response),
    });
    const { initialFetch } = usePaginator();
    useEffect(() => {
      if (response) {
        showPopUp();
        initialFetch();
        handleClose();
      }
    }, [response]);
    return (
      <FormDialog
        handleClose={handleClose}
        open={action === "delete"}
        isCloseDisabled={loading}
      >
        <Typography variant="h5">
          Apakah anda yakin untuk menghapus {selected ? selected.name : ""} ?
        </Typography>
        <Box
          sx={{
            pt: 4,
            width: ["100%", "50%"],
            "& > button": {
              textTransform: "capitalize",
            },
          }}
        >
          <SubmitButton
            onClick={() => dispatch({})}
            icon={<Delete />}
            loading={loading}
          >
            Hapus
          </SubmitButton>
          <Button variant="outlined" disabled={loading} onClick={handleClose}>
            Batal
          </Button>
        </Box>
      </FormDialog>
    );
  }
);
export const Content = observer(() => {
  const {
    result: { data },
  } = usePaginator<GradeModelType>();
  const [state, setState] = useState<State>({
    selected: null,
    action: null,
  });
  const { selected, action } = state;
  const handleState = (model: State["selected"], action: State["action"]) => {
    return () =>
      setState({
        selected: model,
        action,
      });
  };
  const handleClose = () => {
    setState({
      action: null,
      selected,
    });
    setTimeout(() => {
      setState({
        selected: null,
        action: null,
      });
    }, 1000);
  };
  return (
    <Container>
      {data.map((item) => (
        <BatchCard key={item.id} batch={item} onSelect={handleState} />
      ))}
      <UpdateForm {...state} handleClose={handleClose} />
      <DeleteForm {...state} handleClose={handleClose} />
    </Container>
  );
});
