import {
  Autocomplete,
  Box,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
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
});

const classes = {
  tooltip: {
    fontSize: "16px",
  },
};

function AutocompleteAddNft({
  label,
  options,
  isDisabled,
  placeholder,
  onChange,
  type,
  handleOpenAddNFTModal,
  isAddAllDisabled,
}) {
  const selectNFTText =
    "Only NFTs that are not currently listed for sale will be listed/shown in the drop-down menu";

  return (
    <div className="form-group">
      <ThemeProvider theme={makeTheme}>
        {label === "Select NFT" ? (
          <Tooltip
            classes={{ tooltip: classes.tooltip }}
            title={<Typography fontSize={18}>{selectNFTText}</Typography>}
            arrow={true}
            placement="top-start"
          >
            <label
              component="legend"
              style={{
                fontWeight: "bold",
                fontFamily: "poppins",
              }}
            >
              {label}{" "}
              <i className="fa fa-info-circle ml-1" aria-hidden="true"></i>
            </label>
          </Tooltip>
        ) : (
          <label>{label}</label>
        )}
        <div className="filter-widget newNftWrapper">
          {label === "Select NFT" ? (
            <div style={{ display: "flex" }}>
              <Autocomplete
                id="combo-dox-demo"
                required
                fullWidth
                disabled={isDisabled}
                options={options}
                getOptionLabel={(option) =>
                  type === "collection"
                    ? option.name
                    : type === "nft"
                    ? option.title
                    : option
                }
                renderOption={(props, option) => {
                  console.log("Option is: ", option);
                  return (
                    <Box
                      component="li"
                      sx={{
                        "& > img": { mr: 2, flexShrink: 0 },
                      }}
                      {...props}
                    >
                      <img
                        width="50px"
                        height="40px"
                        src={
                          option.previewImageURI !== ""
                            ? option.previewImageURI
                            : option.nftURI
                        }
                        srcSet={
                          option.previewImageURI !== ""
                            ? option.previewImageURI
                            : option.nftURI
                        }
                        alt=""
                        style={{ border: "1px solid black" }}
                      />
                      {option.title}
                    </Box>
                  );
                }}
                onChange={onChange}
                filterSelectedOptions
                renderInput={(params) => (
                  <div>
                    <TextField
                      sx={{
                        "& input": {
                          color: "white",
                        },
                        "& .MuiButtonBase-root.MuiAutocomplete-clearIndicator":
                          {
                            color: "white",
                            visibility: "visible",
                          },
                        "& .MuiButtonBase-root.MuiAutocomplete-popupIndicator":
                          {
                            color: "white",
                            visibility: "visible",
                          },
                        "& .MuiButtonBase-root.MuiAutocomplete-arr": {
                          color: "white",
                          visibility: "visible",
                        },
                      }}
                      InputLabelProps={{
                        style: { color: "white" },
                      }}
                      {...params}
                      variant="outlined"
                      placeholder={placeholder}
                    />
                  </div>
                )}
                style={{ padding: "6px 15px !important" }}
              />
              <button
                className="btn"
                disabled={isAddAllDisabled}
                onClick={(e) => {
                  e.preventDefault();
                  handleOpenAddNFTModal();
                }}
                style={{
                  backgroundColor: "#000",
                  marginLeft: "5px",
                  border: "1px solid white",
                }}
              >
                Add All
              </button>
            </div>
          ) : (
            <Autocomplete
              id="combo-dox-demo"
              required
              disabled={isDisabled}
              options={options}
              getOptionLabel={(option) =>
                type === "collection"
                  ? option.name
                  : type === "nft"
                  ? option.title
                  : option
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
                      style: { color: "white" },
                    }}
                    {...params}
                    variant="outlined"
                    placeholder={placeholder}
                  />
                </div>
              )}
              style={{ padding: "6px 15px !important" }}
            />
          )}
        </div>
      </ThemeProvider>
    </div>
  );
}

export default AutocompleteAddNft;
