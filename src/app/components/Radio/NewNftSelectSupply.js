import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  ThemeProvider,
  Tooltip,
  createTheme,
  Typography,
} from "@mui/material";
import React from "react";

const theme = createTheme({
  components: {
    MuiRadio: {
      styleOverrides: {
        root: {
          color: "white !important",
        },
      },
    },
  },
});

function NewNftSelectSupply({
  NFTType,
  classes,
  setSupplyType,
  setTokenSupply,
  supplyType,
  tokenSupply,
}) {
  const SupplyTypeText =
    "Single supply in ERC-1155 refers to a collection of NFTs that have a predetermined, only one copy of NFTs available, while variable supply allows for the creation of multiple and identical NFTs copies, depending on demand.";

  return (
    <div>
      {NFTType === "1155" ? (
        <div>
          <ThemeProvider theme={theme}>
            <FormControl component="fieldset">
              <Tooltip
                classes={{ tooltip: classes.tooltip }}
                title={<Typography fontSize={18}>{SupplyTypeText}</Typography>}
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
                  Select Supply Type{" "}
                  <i className="fa fa-info-circle" aria-hidden="true"></i>
                </label>
              </Tooltip>
              <RadioGroup
                row
                aria-label="position"
                name="position"
                defaultValue="top"
              >
                <FormControlLabel
                  // style={{ color: "black" }}
                  value="Single"
                  onChange={() => {
                    setSupplyType("Single");
                    setTokenSupply(1);
                  }}
                  checked={supplyType === "Single"}
                  control={<Radio />}
                  label={
                    <span
                      style={{
                        fontWeight: "bold",
                        fontFamily: "poppins",
                      }}
                    >
                      Single
                    </span>
                  }
                />
                <FormControlLabel
                  // style={{ color: "black" }}
                  value="Variable Supply"
                  onChange={() => {
                    setSupplyType("Variable");
                    setTokenSupply("");
                  }}
                  checked={supplyType === "Variable"}
                  control={<Radio />}
                  label={
                    <span
                      style={{
                        fontWeight: "bold",
                        fontFamily: "poppins",
                      }}
                    >
                      Variable Supply
                    </span>
                  }
                />
              </RadioGroup>
            </FormControl>
          </ThemeProvider>

          {supplyType === "Single" ? (
            <div className="form-group">
              <label
                style={{
                  fontWeight: "bold",
                  fontFamily: "poppins",
                }}
              >
                Token Supply
              </label>
              <div className="filter-widget">
                <input
                  type="number"
                  required
                  value={tokenSupply}
                  className="form-control"
                  disabled
                />
              </div>
            </div>
          ) : (
            <div className="form-group">
              <label
                style={{
                  fontWeight: "bold",
                  fontFamily: "poppins",
                }}
              >
                Token Supply
              </label>
              <div className="filter-widget">
                <input
                  type="number"
                  placeholder="0"
                  required
                  value={tokenSupply ?? ""}
                  className="form-control"
                  onChange={(e) => {
                    if (e.target.value >= 0) {
                      const regex = /^\d*$/;
                      if (regex.test(e.target.value)) {
                        setTokenSupply(e.target.value);
                      }
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default NewNftSelectSupply;
