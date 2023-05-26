import { Link } from "react-router-dom";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getSuperAdminPlatformFee } from "../../../../components/API/AxiosInterceptor";
import NotificationSnackbar from "../../../../components/Snackbar/NotificationSnackbar";

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
};

function PlatformFee(props) {
  const [value, setValue] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);

  const getPlatformFee = () => {
    getSuperAdminPlatformFee()
      .then((response) => {
        console.log(
          "Response from getting super admin platform fee: ",
          response
        );
        setAmount(response.data.platformFee);
      })
      .catch((error) => {
        console.log("Error from getting super admin platform fee: ", error);
      });
  };

  useEffect(() => {
    getPlatformFee();
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
      properties: "",
      template: "",
      saved: "",
      platformFee: "active",
    });
  }, []);
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      amount === null ||
      amount === undefined ||
      undefined === "" ||
      amount === "undefined"
    ) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Please Enter Paltform Fee");
      setSnackbarOpen(true);
    } else if (amount <= 0) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Platform Fee should be greater than 0");
      setSnackbarOpen(true);
    } else if (amount > 100) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Platform Fee should be less than 100");
      setSnackbarOpen(true);
    } else {
      handleShowBackdrop();
      let data = {
        platformFee: amount,
      };

      axios.post("/platform-fee/super-admin", data).then(
        (response) => {
          handleCloseBackdrop();
          setSnackbarSeverity("success");
          setSnackbarMessage("Platform Fee Set Successfully");
          setSnackbarOpen(true);
        },
        (error) => {
          console.log("Error in setting platform fees", error.response);
          handleCloseBackdrop();
          setSnackbarSeverity("error");
          setSnackbarMessage("Unable to set Platform fee");
          setSnackbarOpen(true);
        }
      );
    }
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
          <div className="col-lg-6 col-md-6 col-sm-12 d-flex flex-row">
            <input
              type="number"
              required
              value={amount}
              disabled={isDisabled}
              placeholder="Enter Top Up Amount"
              className="form-control newNftInput"
              min={1}
              style={{ backgroundColor: "black", color: "white" }}
              onChange={(e) => {
                if (e.target.value >= 0 && e.target.value <= 100) {
                  setAmount(e.target.value);
                }
              }}
            />
            <div class="input-group-prepend">
              <span class="input-group-text bg-transparent text-white">%</span>
            </div>
            {isDisabled ? (
              <button
                className="newTemplateBtn"
                onClick={() => {
                  setIsDisabled(false);
                }}
              >
                Edit
              </button>
            ) : null}
          </div>
        </div>
        {!isDisabled ? (
          <div className="row mt-5">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <button
                className="newTemplateBtn mb-3"
                style={{ backgroundColor: "black", float: "right" }}
                onClick={(e) => handleSubmit(e)}
              >
                Proceed
              </button>
              <button
                className="newTemplateBtn mb-3"
                style={{ backgroundColor: "black", float: "right" }}
                onClick={(e) => setIsDisabled(true)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : null}
      </div>
      <CircularBackdrop open={open} />
      <NotificationSnackbar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </div>
  );
}

export default PlatformFee;
