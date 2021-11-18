import { Typography, Box, InputAdornment, Button } from "@mui/material";
import { FormField } from "@components/form-field/form-field";
import { Refresh, Search } from "@mui/icons-material";
import { useState } from "react";
import { PageContentContainer } from "@components/page-content-container";
import { usePaginator } from "@providers/model-provider/paginators";

export const SearchBar = () => {
  const [search, setSearch] = useState<string>("");
  const handleChange = (e: any) => setSearch(e.target.value);
  const {
    actions: { removeParam, parameter, updateParameter },
    result,
    loading,
    hasResponse,
  } = usePaginator();
  const onSubmit = (e: any) => {
    updateParameter("search")(search);
    e.preventDefault();
  };
  const onReset = () => {
    removeParam("search");
    setSearch("");
  };
  return (
    <PageContentContainer>
      <form onSubmit={onSubmit} onReset={onReset}>
        <FormField
          fullWidth
          disabled={loading}
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment sx={{ px: 2 }} position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ bgcolor: "white", "& input": { py: 2 } }}
          placeholder="Masukan kata kunci pencarian"
          name="search"
          onChange={handleChange}
          value={search}
          noUseForm
          size="medium"
        />
        <Box sx={{ p: 1, display: "flex", justifyContent: "flex-end" }}>
          <Box sx={{display: hasResponse?"block" : "none"}}>
            <Typography variant='caption'>
              {
                result.paginator.total ?
                  `Hasil pencarian : ${result.paginator.total} item` :
                  `Data tidak di temukan dengan kata kunci "${parameter.search}"`
              }
            </Typography>
          </Box>
          <Box sx={{ml: "auto"}}>
            <Button type="submit" startIcon={<Search />} disabled={loading}>
              Cari
            </Button>
            <Button
              type="reset"
              startIcon={<Refresh />}
              disabled={loading || !search}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </form>
    </PageContentContainer>
  );
};
