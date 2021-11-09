import type { GradeModelType } from "@root/models";
import { observer } from "mobx-react";
import { usePaginator } from "@providers/model-provider/paginators";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { OndemandVideo, School, Info } from "@mui/icons-material";
import { useBatchPage } from "./provider";

type ItemProps = {
  model: GradeModelType;
};

const itemInfoSx = {
  display: "flex",
  "& > div": {
    flex: 1,
    display: "flex",
    alignItems: "center",
    fontSize: "small",
    color: "#2c3e50",
  },
};

const ItemInfo = ({ model }: ItemProps) => {
  return (
    <Box sx={itemInfoSx}>
      {!model.student_count ? (
        <></>
      ) : (
        <Box>
          <School sx={{ marginRight: 2 }} />
          {model.student_count
            ? `${model.student_count} siswa`
            : "Belum ada siswa terdaftar"}
        </Box>
      )}
      <Box>
        <OndemandVideo sx={{ marginRight: 2 }} />
        {model.video_count ? `${model.video_count} video` : "Data video kosong"}
      </Box>
    </Box>
  );
};

const sx = {
  bgcolor: "white",
  cursor: "pointer",
  marginRight: [1, 4],
  marginLeft: [1, 0],
  my:[2,0],
  transition: "all ease-in-out .2s",
  "&[data-scale='true']:hover": {
    marginRight: 0,
  },
  zIndex: 99,
  "&[data-active='true']": {
    marginRight: [1, 0],
    zIndex: 101,
    my: 2,
    bgcolor: ["primary.light", "primary.light"],
    "& *": {
      color: ["white", "white"],
    },
    boxShadow: 5,
  },
};

type ItemBaseProp = {
  model: GradeModelType;
  handler(): void;
  active: boolean;
};

const Item = observer(({ model, handler, active }: ItemBaseProp) => {
  const theme = useTheme();
  const islg = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={sx}
      data-scale={!islg}
      data-active={active}
      onClick={active ? undefined : handler}
      className="item"
    >
      <Box sx={{ p: 2 }}>
        <Typography
          variant="h6"
          sx={{ color: "#2c3e50", fontWeight: "lighter" }}
          noWrap
        >
          {model.name}
        </Typography>
        <ItemInfo model={model} />
        <Button fullWidth size="small" onClick={handler} disabled={active}>
          Manage batch
        </Button>
      </Box>
    </Box>
  );
});

export const BatchItem = () => {
  const {
    result: { data },
  } = usePaginator<GradeModelType>();
  const { setModel, selected } = useBatchPage();

  return (
    <>
      {data.map((item) => (
        <Item
          handler={setModel(item)}
          active={selected ? selected.id === item.id : false}
          model={item}
          key={item.id}
        />
      ))}
    </>
  );
};
