import { useDiscussion } from "./provider";
import { observer } from "mobx-react";
import { Box, Button, Container, Typography } from "@mui/material";
import { ChatBubble } from "@mui/icons-material";
import { usePaginator } from "@providers/model-provider/paginators";
import type { DiscussionModelType } from "@root/models";
import { useCallback, useEffect } from "react";
import { DiscussionCard } from "./discussion-card";
import { useDeleteApiProvider, DeleteContext } from "@hooks/use-delete-api";
import { RootStoreBaseMutations } from "@root-model";

export const DiscussionList = observer(() => {
  const { setFormMode } = useDiscussion();
  const {
    isEmpty,
    initialFetch,
    result: { data },
  } = usePaginator<DiscussionModelType>();
  useEffect(() => {
    initialFetch();
  }, []);
  const openFormCreate = useCallback(() => {
    setFormMode("create");
  }, []);
  const DeleteContextValue = useDeleteApiProvider({
    api: RootStoreBaseMutations.mutateDeleteDiscussion,
    callback: initialFetch,
    getContentText(): string {
      return "Apakah anda yakin untuk menghapus thread diskusi ini ? ";
    },
  });

  return (
    <DeleteContext.Provider value={DeleteContextValue}>
      <DeleteContextValue.Dialog />
      {isEmpty ? (
        <Box sx={{ textAlign: "center", py: 5 }}>
          <Typography align="center" variant="h5">
            Saat ini tidak ada thread diskusi
          </Typography>
          <Button onClick={openFormCreate} sx={{ textTransform: "none" }}>
            Klik disini untuk menambahkan
          </Button>
        </Box>
      ) : null}
      <Container>
        <Box sx={{my:2}}>
          <Button startIcon={<ChatBubble />} onClick={openFormCreate}>
            Buat thread diskusi
          </Button>
        </Box>
        {data.map((item) => (
          <DiscussionCard model={item} key={item.id} />
        ))}
      </Container>
    </DeleteContext.Provider>
  );
});
