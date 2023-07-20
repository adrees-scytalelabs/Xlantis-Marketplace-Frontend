import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Modal,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useState } from "react";
import { style } from "../styles/MuiModalStyle";

const theme = createTheme({
  components: {
    MuiModal: {
      styleOverrides: {
        backdrop: {
          pointerEvents: "none",
        },
      },
    },
  },
});

const AdminFilterModal = ({ show, handleClose, handleApplyFilter }) => {
  const [isSSO, setIsSSO] = useState(false);
  const [isWallet, setIsWallet] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isEnable, setIsEnabled] = useState(false);
  const [typeFilters, setTypeFilters] = useState([]);
  const [enabledFilters, setEnableFilters] = useState([]);

  const handleTypeFilters = (event) => {
    const { value, checked } = event.target;
    console.log("type Filter values: ", typeFilters);
    if (checked) {
      setTypeFilters([...typeFilters, value]);
    } else {
      setTypeFilters(typeFilters.filter((filter) => filter !== value));
    }
  };

  const handleEnabledFilters = (event) => {
    const { value, checked } = event.target;
    console.log("enable filter: ", enabledFilters);
    if (checked) {
      setEnableFilters([...enabledFilters, value]);
    } else {
      setEnableFilters(enabledFilters.filter((filter) => filter !== value));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal open={show} onClose={handleClose}>
        <Box sx={style.box}>
          {/* HEADER CONTAINER */}
          <Container sx={style.containerHeader}>
            <div>
              <Typography sx={style.text}>Filter Admin List</Typography>
            </div>
          </Container>

          {/* BODY CONTAINER */}
          <Container sx={style.containerBody} className="NewTemplateBody">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    value="v1"
                    sx={{
                      color: "white",
                      "&.Mui-checked": {
                        color: "white",
                      },
                    }}
                    onChange={(e) => {
                      setIsSSO(!isSSO);
                      handleTypeFilters(e);
                    }}
                    checked={isSSO}
                  />
                }
                label="SSO"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="v2"
                    sx={{
                      color: "white",
                      "&.Mui-checked": {
                        color: "white",
                      },
                    }}
                    onChange={(e) => {
                      setIsWallet(!isWallet);
                      handleTypeFilters(e);
                    }}
                    checked={isWallet}
                  />
                }
                label="Wallet"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value={false}
                    sx={{
                      color: "white",
                      "&.Mui-checked": {
                        color: "white",
                      },
                    }}
                    onChange={(e) => {
                      setIsDisabled(!isDisabled);
                      handleEnabledFilters(e);
                    }}
                    checked={isDisabled}
                  />
                }
                label="Disabled"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value={true}
                    sx={{
                      color: "white",
                      "&.Mui-checked": {
                        color: "white",
                      },
                    }}
                    checked={isEnable}
                    onChange={(e) => {
                      setIsEnabled(!isEnable);
                      handleEnabledFilters(e);
                    }}
                  />
                }
                label="Enabled"
              />
            </FormGroup>
          </Container>

          {/* FOOTER CONTAINER */}
          <Container sx={style.containerFooter}>
            <button className="newTemplateBtn mb-3" onClick={handleClose}>
              Close
            </button>
            <button
              className="newTemplateBtn mb-3"
              onClick={() => handleApplyFilter(enabledFilters, typeFilters)}
            >
              Apply Filters
            </button>
          </Container>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default AdminFilterModal;
