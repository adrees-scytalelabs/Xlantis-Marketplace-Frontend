import {
  Autocomplete,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React from "react";
const makeTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          border: "1px solid #fff !important",
          borderRadius: 5,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontFamily: "orbitron",
          color: "#fff",
          border: "1px solid white",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none !important",
          },
        },
        input: {
          "&.Mui-disabled": {
            WebkitTextFillColor: "#fff",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: "#fff",
          fontFamily: "inter",
        },
        root: {
          border: "1px solid red",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          fontFamily: "orbitron",
          color: "#fff",
          border: "1px solid white",
          borderRadius: 5,
          padding: "6px 15px !important",
          "&$focused": {},
        },
        underline: {
          "&:$before": {},
          "&::after": {
            border: "none !important",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#fff !important",
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          color: "white",
          fontFamily: "inter",
          "&.Mui-disabled": {
            color: "white",
          },
        },
        labelPlacementEnd: {
          color: "white",
          fontFamily: "inter",
          "&.Mui-disabled": {
            color: "white",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: "white !important",
        },
      },
    },
  },
  // overrides: {
  //   MuiTextField: {
  //     root: {
  //       border: "1px solid #fff",
  //       borderRadius: 5,
  //     },
  //   },
  //   MuiOutlinedInput: {
  //     root: {
  //       fontFamily: "orbitron",
  //       color: "#fff",
  //       border: "1px solid #fff",
  //       "&$focused": {},
  //     },
  //   },
  //   MuiInput: {
  //     root: {
  //       fontFamily: "orbitron",
  //       color: "#fff",
  //       border: "none",
  //       borderRadius: 5,
  //       padding: "6px 15px !important",
  //       "&$focused": {},
  //     },
  //     underline: {
  //       "&$before": {},
  //       "&::after": {
  //         border: "none !important",
  //       },
  //     },
  //   },
  //   MuiAutocomplete: {
  //     inputRoot: {},
  //   },
  //   MuiIconButton: {
  //     root: {
  //       color: "#fff !important",
  //     },
  //   },
  //   MuiFormControlLabel: {
  //     label: {
  //       color: "white",
  //       fontFamily: "inter",
  //     },
  //   },
  // },
});

function AutocompleteAddNft({
  label,
  options,
  isDisabled,
  placeholder,
  onChange,
  type,
}) {
  return (
    <div className="form-group">
      <ThemeProvider theme={makeTheme}>
        <label>{label}</label>
        <div className="filter-widget newNftWrapper">
          <Autocomplete
            id="combo-dox-demo"
            required
            disabled={isDisabled}
            options={options}
            getOptionLabel={(option) =>
              type === "collection" ? option.name : option.title
            }
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
            style={{ padding: "6px 15px !important" }}
          />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default AutocompleteAddNft;
