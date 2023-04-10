import { ThemeProvider } from "@material-ui/core";
import { createTheme } from '@material-ui/core/styles';
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";
import { useHistory } from "react-router-dom";


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
      MuiInputBase: {
        input: {
          color: "#777",
          fontFamily: "inter",
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
          "&:$before": {},
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

function NewNftSelectNft({
    tokenList,
    classes,
    setWorkProgressModalShow,
    NFTType,
    setNFTType,
    getCollections,
    collectionTypes,
    setCollection,
    setCollectionId,
    setNftContractAddress,
    collection,
    setContractType
}) {
    let history = useHistory();
    const Text721 =
    "ERC-721 is a standard for representing ownership of non-fungible tokens, that is, where each token is unique and cannot be exchanged on a one-to-one basis with other tokens.";
    const Text1155 =
    "ERC-1155 tokens are semi-fungible tokens, which means that each token can represent multiple, identical assets. For example, an ERC-1155 token could represent 10 units of a particular item, and those 10 units can be traded or transferred individually.";
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
                            title={Text721}
                            classes={{ tooltip: classes.tooltip }}
                          >
                            <FormControlLabel
                              style={{ color: "white" }}
                              disabled
                              value="ERC721"
                              onChange={() => {
                                setWorkProgressModalShow(true);
                              }}
                              checked={NFTType === "721"}
                              control={<Radio />}
                              label={
                                <span
                                  style={{ fontSize: "0.9rem", color: "white" }}
                                >
                                  Single
                                </span>
                              }
                            />
                          </Tooltip>

                          <Tooltip
                            title={Text1155}
                            classes={{ tooltip: classes.tooltip }}
                          >
                            <FormControlLabel
                              style={{ color: "white" }}
                              disabled
                              value="ERC1155"
                              onChange={() => {
                                setNFTType("1155");
                                getCollections("1155");
                              }}
                              checked={NFTType === "1155"}
                              control={<Radio color="secondary" />}
                              label={
                                <span
                                  style={{ fontSize: "0.9rem", color: "white" }}
                                >
                                  Multiple
                                </span>
                              }
                            />
                          </Tooltip>
                        </RadioGroup>
                      </FormControl>
                    ) : (
                      <FormControl component="fieldset">
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
                            title={Text721}
                            classes={{ tooltip: classes.tooltip }}
                          >
                            <FormControlLabel
                              style={{ color: "black" }}
                              value="ERC721"
                              onChange={() => {
                                setWorkProgressModalShow(true);
                              }}
                              checked={NFTType === "721"}
                              control={<Radio color="secondary" />}
                              label={
                                <span style={{ fontSize: "0.9rem" }}>
                                  Single{" "}
                                  <i
                                    className="fa fa-info-circle"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                              }
                            />
                          </Tooltip>

                          <Tooltip
                            title={Text1155}
                            classes={{ tooltip: classes.tooltip }}
                          >
                            <FormControlLabel
                              style={{ color: "black", marginLeft: ".8rem" }}
                              value="ERC1155"
                              onChange={() => {
                                setNFTType("1155");
                                getCollections("1155");
                              }}
                              checked={NFTType === "1155"}
                              control={<Radio color="secondary" />}
                              label={
                                <span style={{ fontSize: "0.9rem" }}>
                                  Multiple{" "}
                                  <i
                                    class="fa fa-info-circle"
                                    aria-hidden="true"
                                  ></i>
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
                      <label
                        style={{ fontWeight: "bold", fontFamily: "poppins" }}
                      >
                        Select Collection
                      </label>
                      <div className="filter-widget">
                        <Autocomplete
                          id="combo-dox-demo"
                          disabled
                          options={collectionTypes}
                          getOptionLabel={(option) => option.name}
                          onChange={(event, value) => {
                            if (value == null) setCollection("");
                            else {
                              if (value.name === "+ Create new Collection") {
                                history.push("/dashboard/createNewCollection");
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
                              />
                            </ThemeProvider>
                          )}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="form-group">
                      <label
                        style={{ fontWeight: "bold", fontFamily: "poppins" }}
                      >
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
                                history.push("/dashboard/createNewCollection");
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
                              />
                            </ThemeProvider>
                          )}
                        />
                      </div>
                    </div>
                  )}
    </div>
  )
}

export default NewNftSelectNft