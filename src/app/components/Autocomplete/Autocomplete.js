import {
  Autocomplete,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";

const makeTheme = createTheme({
  overrides: {
    MuiTextField: {
      root: {
        border: "1px solid #fff",
        borderRadius: 5,
      },
    },
    MuiOutlinedInput: {
      root: {
        fontFamily: "orbitron",
        color: "#fff",
        border: "1px solid #fff",
        "&$focused": {},
      },
    },
    MuiInput: {
      root: {
        fontFamily: "orbitron",
        color: "#fff",
        border: "none",
        borderRadius: 5,
        padding: "6px 15px !important",
        "&$focused": {},
      },
      underline: {
        "&$before": {},
        "&::after": {
          border: "none !important",
        },
      },
    },
    MuiAutocomplete: {
      inputRoot: {},
    },
    MuiIconButton: {
      root: {
        color: "#fff !important",
      },
    },
    MuiFormControlLabel: {
      label: {
        color: "white",
        fontFamily: "inter",
      },
    },
  },
});

function AutocompleteAddNft({
  label,
  options,
  isDisabled,
  placeholder,
  onChange,
}) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="filter-widget newNftWrapper">
        <ThemeProvider theme={makeTheme}>
          <Autocomplete
            style={{ border: "1px solid white" }}
            id="combo-dox-demo"           
            required
            disabled={isDisabled}
            options={options}
            getOptionLabel={(option) => (label==="Select NFT")?(option.title):(option.name)}
            onChange={onChange}
            filterSelectedOptions
            renderInput={(params) => (
              <div>
                <TextField
                  sx={{
                    "& input": {
                      color: "white",
                    },
                    "& .MuiButtonBase-root.MuiAutocomplete-clearIndicator": {
                      color: "white",
                      visibility: "visible",
                    },
                    "& .MuiButtonBase-root.MuiAutocomplete-popupIndicator": {
                      color: "white",
                      visibility: "visible",
                    },
                    "& .MuiButtonBase-root.MuiAutocomplete-arr": {
                      color: "white",
                      visibility: "visible",
                    },
                  }}
                  InputLabelProps={{
                    style: { color: "white" }
                  }}
                  {...params}
                  variant="outlined"
                  placeholder={placeholder}
                />
              </div>
            )}
          />
        </ThemeProvider>
      </div>
    </div>
  );
}

export default AutocompleteAddNft;
