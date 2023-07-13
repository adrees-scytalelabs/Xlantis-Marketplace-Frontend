import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  ThemeProvider,
  Tooltip,
  createTheme,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

function NewNftSelectNft({
  tokenList,
  classes,
  setWorkProgressModalShow,
  NFTType,
  setNFTType,
  getCollectionsUsingType,
  collectionTypes,
  setCollection,
  setCollectionId,
  setNftContractAddress,
  collection,
  setContractType,
}) {
  let navigate = useNavigate();
  const Text721 =
    "ERC-721 is a standard for representing ownership of non-fungible tokens, that is, where each token is unique and cannot be exchanged on a one-to-one basis with other tokens.";
  const Text1155 =
    "ERC-1155 tokens are semi-fungible tokens, which means that each token can represent multiple, identical assets. For example, an ERC-1155 token could represent 10 units of a particular item, and those 10 units can be traded or transferred individually.";

  useEffect(() => {
    console.log("PropsPropsPropsProps: ", {
      tokenList,
      classes,
      setWorkProgressModalShow,
      NFTType,
      setNFTType,
      getCollectionsUsingType,
      collectionTypes,
      setCollection,
      setCollectionId,
      setNftContractAddress,
      collection,
      setContractType,
    });
  }, []);

  return (
    <div>
      <ThemeProvider theme={makeTheme}>
        {tokenList?.length > 0 ? (
          <FormControl
            component="fieldset"
            style={{
              color: "#fff",
              fontFamily: "orbitron",
              fontWeight: "bold",
            }}
          >
            <label
              component="legend"
              style={{ fontWeight: "bold", fontFamily: "orbitron" }}
            >
              Select NFT Type
            </label>
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="top"
            >
              <Tooltip
                classes={{ tooltip: classes.tooltip }}
                title={<Typography fontSize={18}>{Text721}</Typography>}
              >
                <FormControlLabel
                  style={{ color: "white !important" }}
                  disabled
                  value="ERC721"
                  onChange={() => {
                    setWorkProgressModalShow(true);
                  }}
                  checked={NFTType === "721"}
                  control={<Radio color="secondary" />}
                  label={
                    <span
                      style={{ fontSize: "0.9rem", color: "white !important" }}
                    >
                      Single
                    </span>
                  }
                />
              </Tooltip>
              <Tooltip
                classes={{ tooltip: classes.tooltip }}
                title={<Typography fontSize={18}>{Text1155}</Typography>}
              >
                <FormControlLabel
                  style={{ color: "white" }}
                  disabled
                  value="ERC1155"
                  onChange={() => {
                    setNFTType("1155");
                    getCollectionsUsingType("1155");
                  }}
                  checked={NFTType === "1155"}
                  control={<Radio color="secondary" />}
                  label={
                    <span style={{ fontSize: "0.9rem", color: "white" }}>
                      Multiple
                    </span>
                  }
                />
              </Tooltip>
            </RadioGroup>
          </FormControl>
        ) : (
          <FormControl
            component="fieldset"
            style={{
              color: "#fff",
              fontFamily: "orbitron",
              fontWeight: "bold",
            }}
          >
            <label
              component="legend"
              style={{ fontWeight: "bold", fontFamily: "poppins" }}
            >
              Select NFT Type
            </label>
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="top"
            >
              <Tooltip
                classes={{ tooltip: classes.tooltip }}
                title={<Typography fontSize={18}>{Text721}</Typography>}
              >
                <FormControlLabel
                  style={{ color: "black", marginLeft: ".8rem" }}
                  value="ERC721"
                  onChange={() => {
                    setWorkProgressModalShow(true);
                  }}
                  checked={NFTType === "721"}
                  control={<Radio color="secondary" />}
                  label={
                    <span
                      style={{ fontSize: "0.9rem", color: "white !important" }}
                    >
                      Single{" "}
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                    </span>
                  }
                />
              </Tooltip>
              <Tooltip
                classes={{ tooltip: classes.tooltip }}
                title={<Typography fontSize={18}>{Text1155}</Typography>}
              >
                <FormControlLabel
                  style={{ color: "black", marginLeft: ".8rem" }}
                  value="ERC1155"
                  onChange={() => {
                    setNFTType("1155");
                    getCollectionsUsingType("1155");
                  }}
                  checked={NFTType === "1155"}
                  control={<Radio color="secondary" />}
                  label={
                    <span
                      style={{ fontSize: "0.9rem", color: "white !important" }}
                    >
                      Multiple{" "}
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                    </span>
                  }
                />
              </Tooltip>
            </RadioGroup>
          </FormControl>
        )}
      </ThemeProvider>

      {tokenList.length > 0 ? (
        <div className="form-group">
          <label style={{ fontWeight: "bold", fontFamily: "poppins" }}>
            Select Collection
          </label>
          <div className="filter-widget">
            <Autocomplete
              id="combo-dox-demo"
              disabled
              options={[]}
              getOptionLabel={(option) => option.name}
              onChange={(event, value) => {
                if (value == null) setCollection("");
                else {
                  if (value.name === "+ Create new Collection") {
                    navigate("/dashboard/createNewCollection");
                  } else {
                    // console.log(value);
                    setCollection(value.name);
                    setCollectionId(value._id);
                    setNftContractAddress(value.nftContractAddress);
                    // console.log("Value: ", value);
                  }
                }
              }}
              inputValue={collection}
              renderInput={(params) => (
                <ThemeProvider theme={makeTheme}>
                  <TextField
                    {...params}
                    placeholder="Collections"
                    sx={{ border: "1px solid white !important" }}
                  />
                </ThemeProvider>
              )}
            />
          </div>
        </div>
      ) : (
        <div className="form-group">
          <label style={{ fontWeight: "bold", fontFamily: "poppins" }}>
            Select Collection
          </label>
          <div className="filter-widget">
            <Autocomplete
              id="combo-dox-demo"
              required
              options={collectionTypes}
              getOptionLabel={(option) => option.name}
              onChange={(event, value) => {
                if (value == null) setCollection("");
                else {
                  if (value.name === "+ Create new Collection") {
                    navigate("/dashboard/createNewCollection");
                  } else {
                    //  console.log(value);
                    setCollection(value.name);
                    setCollectionId(value._id);
                    setNftContractAddress(value.nftContractAddress);
                    setContractType(value.contractType);
                    //  console.log("Value: ", value);
                  }
                }
              }}
              inputValue={collection}
              renderInput={(params) => (
                <ThemeProvider theme={makeTheme}>
                  <TextField
                    {...params}
                    placeholder="Collections"
                    sx={{ border: "1px solid white !important" }}
                  />
                </ThemeProvider>
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default NewNftSelectNft;
