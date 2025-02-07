import { useState } from "react";
import { Stack, TextField } from "@mui/material";
import { ArrowBack, Search } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { setSearchingData } from "../store/search";

const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchValue, setSearchValue] = useState<string>("");
  const handleSearch = (e: any) => {
    setSearchValue(e.target.value);
    dispatch(setSearchingData(e.target.value));
  };
  return (
    <Stack
      direction="row"
      sx={{ alignItems: "center", gap: { xs: "16px", sm: "32px" } }}
      className="search-bar"
    >
      <ArrowBack />
      <TextField
        value={searchValue}
        placeholder="Search Here"
        onChange={handleSearch}
        sx={{ flexGrow: "1" }}
        InputProps={{
          startAdornment: (
            <Search
              sx={{
                position: "absolute",
                right: "16px",
                cursor: "pointer",
              }}
            />
          ),
        }}
      />
    </Stack>
  );
};

export default SearchBar;
