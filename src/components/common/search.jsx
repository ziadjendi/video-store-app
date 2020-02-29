import React from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const SearchInput = ({ onSearch, value, ...others }) => {
  const raiseSearch = event => {
    onSearch(event.currentTarget.value);
  };
  return (
    <TextField
      variant="outlined"
      fullWidth
      placeholder="search movie Title"
      onChange={raiseSearch}
      value={value}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="primary" />
          </InputAdornment>
        )
      }}
    />
  );
};

export default SearchInput;
