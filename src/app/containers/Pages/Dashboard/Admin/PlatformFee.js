import { Link, } from "react-router-dom";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import { useResolvedPath } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import axios from "axios";

import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";


const styles = {
  root: {
    maxWidth: 345,
  },
  media: {
    height: 300,
  },
 
  card: {
    minWidth: 250,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  tooltip: {
    fontSize: "16px",
  },
}

const makeTheme = createTheme({
  overrides: {
    MuiFormControlLabel: {
      label: {
        color: "white",
        fontFamily: "inter",
      },
    },
    MuiRadio: {
      root: {
        color: "white",
      },
    },
  },
});

function PlatformFee(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState(0);

  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (props.tab === 1) {
      setValue(1);
      props.setTab(0);
    }
    if (props.tab === 2) {
      setValue(2);
      props.setTab(0);
    }
    props.setActiveTab({
      dashboard: "",
      manageAccounts: "",
      accountApproval: "",
      accounts: "",
      sso: "",
      wallet: "",
      properties:"",
      template:"",
      saved:"",
      platformFee:"active",
    }); 
  }, []);
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    handleShowBackdrop();
    let data = {
      platformFee: PlatformFee,
    };

    axios.post("/platform-fee/admin", data).then(
      (response) => {
        handleCloseBackdrop();
        let variant = "success";
        enqueueSnackbar("Platform Fee Set Successfully", { variant });
      },
      (error) => {

        handleCloseBackdrop();
        let variant = "error";
        enqueueSnackbar("Unable to set Platform fee", { variant });
      }
    );
  };
  

  return (
    <div className="backgroundDefault">
      
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Platform Fee</h3>
            <ul className="breadcrumb">
              <Link to={`/dashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <li className="breadcrumb-item active">Platform Fee</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="card-body p-0">
        <div className="row mt-5">
          <div className="col-lg-6 col-md-6 col-sm-12 ">
            <label>Select your Platform Fee</label>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <input
              type="number"
              required
              value={amount}
              placeholder="Enter Top Up Amount"
              className="form-control newNftInput"
              min={1}

              style={{ backgroundColor: "black", color: "white" }}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <button 
              className="newTemplateBtn mb-3"
              style={{ backgroundColor: "black", float: "right" }}
              onClick={(e) => handleSubmit(e)}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
      <CircularBackdrop open={open} />

    </div>
  );
}

export default PlatformFee;
