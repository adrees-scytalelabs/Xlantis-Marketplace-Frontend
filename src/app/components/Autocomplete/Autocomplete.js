import { Autocomplete, TextField, ThemeProvider, createTheme } from '@mui/material';
import React from 'react';
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
        <Autocomplete
          id="combo-dox-demo"
          required
          disabled={isDisabled}
          options={options}
          getOptionLabel={(option) => option.name}
          onChange={onChange}
          filterSelectedOptions
          renderInput={(params) => (
            <div>
              <ThemeProvider theme={makeTheme}>
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder={placeholder}
                />
              </ThemeProvider>
            </div>
          )}
          style={{ padding: "6px 15px !important" }}
        />
      </div>
    </div>

  )
}

export default AutocompleteAddNft;