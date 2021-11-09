import {
  Box,
  InputBase,
  Button,
  CircularProgress,
  Collapse,
  Typography,
} from "@mui/material";
import { Restore, Search } from "@mui/icons-material";
import { usePaginator } from "@providers/model-provider/paginators";
import { useCallback, useState } from "react";
import voca from "voca";
import { useToggle } from "@hooks/use-toggle";

const sx = {
  px:2,
  pt:[2, 0],
  borderRadius: 3,
  "& > .inner": {
    borderRadius: 3,
    display: "flex",
    alignItems: "center",
    border: "solid 1px #f8f8f8",
    boxShadow: `inset 0 1px 2px #eee`,
    background: "white",
    "& > .icon-container": {
      alignItems: "center",
      display: "flex",
      background: "white",
      height: 42,
      borderRadius: 3,
    },
  },
};

export const SearchForm = () => {
  const {
    actions: { updateParameter, parameter, removeParam },
    loading,
    result,
  } = usePaginator();
  const { paginator } = result;
  const v = parameter["search"] ? parameter["search"] : "";
  const cb = updateParameter("search");
  const [touched, { inline }] = useToggle();
  const safeHtml = voca(v).replaceAll("%", "").value();
  const [search, setSearch] = useState<string>(() => {
    if (safeHtml) {
      return safeHtml;
    }
    return "";
  });

  const handleChange = useCallback((e: any) => {
    setSearch(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e: any) => {
      cb(`%${search}%`);
      e.preventDefault();
      inline(true);
    },
    [search]
  );
  const onReset = useCallback(() => {
    setSearch("");
    removeParam("search");
    inline(false);
  }, []);

  return (
    <Box className="search-bar" sx={sx as any}>
      <Box component="form" onSubmit={handleSubmit} className="inner">
        <InputBase
          value={search}
          onChange={handleChange}
          sx={{ flex: 1, paddingLeft: 2 }}
          placeholder="Pencarian"
          disabled={loading}
        />
        <Box className="icon-container">
          <Button disabled={loading} type="submit">
            {loading ? <CircularProgress size={15} /> : <Search />}
          </Button>
          <Button onClick={onReset} disabled={loading || !search}>
            <Restore />
          </Button>
        </Box>
      </Box>
      {/*<Collapse in={touched && !loading && v}>*/}
      {/*  <Typography*/}
      {/*    sx={{ display: "block", p: 1 }}*/}
      {/*    align="right"*/}
      {/*    variant="caption"*/}
      {/*  >*/}
      {/*    Menampilkan {paginator.total} dengan kata kunci "{safeHtml}"*/}
      {/*  </Typography>*/}
      {/*</Collapse>*/}
    </Box>
  );
};
