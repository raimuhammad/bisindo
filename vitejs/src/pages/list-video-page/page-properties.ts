import { Add } from "@material-ui/icons";
import { Context, ListPageProps } from "shared/list-page";
import { useContext } from "react";
import { VideoModel } from "root/models/stores";

export const pageProperties = {
  title: "Konten video",
  addButton: "Tambah video",
  addButtonIcon: Add,
  button: {
    description: "deskripsi",
    download: "unduh",
    delete: "hapus",
  },
};

export function useVideoPageList() {
  return useContext(Context) as ListPageProps<typeof VideoModel>;
}
