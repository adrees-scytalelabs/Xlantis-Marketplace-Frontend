import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";

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
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header style={{ background: "black" }}>
        <Modal.Title style={{ color: "white" }}>Filter Admin List</Modal.Title>
      </Modal.Header>

      <Modal.Body className="NewTemplateBody" style={{ borderBottom: "none" }}>
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
      </Modal.Body>
      <Modal.Footer
        style={{
          backgroundColor: "#000",
          border: "1px solid white",
          borderTop: "none",
        }}
      >
        <button className="newTemplateBtn mb-3" onClick={handleClose}>
          Close
        </button>
        <button
          className="newTemplateBtn mb-3"
          onClick={() => handleApplyFilter(enabledFilters, typeFilters)}
        >
          Apply Filters
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdminFilterModal;
