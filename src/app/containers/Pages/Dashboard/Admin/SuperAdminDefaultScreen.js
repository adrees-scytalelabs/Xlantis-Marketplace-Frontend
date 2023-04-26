
import ListAltIcon from '@mui/icons-material/ListAlt';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useResolvedPath } from 'react-router-dom';
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import DisplayNumbersAndContentCard from "../../../../components/Cards/DisplayNumbersAndContentCard";
function SuperAdminDefaultScreen(props) {
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [totalVerifiedAdmins, setTotalVerifiedAdmins] = useState(0);
  const [totalUnverifiedAdmins, setTotalUnverifiedAdmins] = useState(0);
  const [totalEnabled, setTotalEnabled] = useState(0);
  const [totalDisabled, setTotalDisabled] = useState(0);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const path = useResolvedPath("").pathname;
  let getCounts = () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("Authorization")}`;
    setOpen(true);
    axios
      .get(`/super-admin/admins/counts?userType=v1`)
      .then((response) => {
        axios
          .get(`/super-admin/admins/counts?userType=v2`)
          .then((response1) => {
            setTotalAdmins(
              response1.data.counts.totalAdmins +
              response.data.counts.totalAdmins
            );
            setTotalVerifiedAdmins(
              response1.data.counts.totalVerifiedAdmins +
              response.data.counts.totalVerifiedAdmins
            );
            setTotalUnverifiedAdmins(
              response1.data.counts.totalUnverifiedAdmins +
              response.data.counts.totalUnverifiedAdmins
            );
            setTotalEnabled(
              response1.data.counts.totalEnabledAdmins +
              response.data.counts.totalEnabledAdmins
            );
            setTotalDisabled(
              response1.data.counts.totalDisabledAdmins +
              response.data.counts.totalDisabledAdmins
            );
            setOpen(false);
          })
          .catch((error) => {
            console.log(error);
            console.log(error.response);
          });
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
      });
  };

  useEffect(() => {
    props.setActiveTab({
      dashboard: "active",
      manageAccounts: "",
      accountApproval: "",
      accounts: "",
      sso: "",
      wallet: "",
      properties: "",
      template: "",
      saved: "",
    });
    getCounts();
  }, []);
  return (
    <div className="container">
      <div className="row no-gutters justify-content-center justify-content-sm-start align-items-center mt-5 mb-5">
        <div className="col-12 col-lg-5 col-md-5 col-sm-5 col-xl-5 mr-sm-3 mb-2 mb-sm-3 totalNftsAdminDash">
          <DisplayNumbersAndContentCard
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            linkTo={`${path}/accounts`}
            hoverH4={
              hover
                ? "totalNftsAdminDashHeadingHover totalNftsAdminDashHeading"
                : "totalNftsAdminDashHeading"
            }
            hoverH1={
              hover ? "totalNftsAdminDashCountHover" : "totalNftsAdminDashCount"
            }
            content={totalAdmins}
            message="Total Admins"
            icon={<ListAltIcon />}
          />
        </div>
        <div className="col-12 col-lg-5 col-md-5 col-sm-5 col-xl-5 mr-sm-3 mb-2 mb-sm-3 totalNftsAdminDash">
          <DisplayNumbersAndContentCard
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            linkTo={`${path}/manageAccounts`}
            state={{ current: "enabled" }}
            hoverH4={
              hover
                ? "totalNftsAdminDashHeadingHover totalNftsAdminDashHeading"
                : "totalNftsAdminDashHeading"
            }
            hoverH1={
              hover ? "totalNftsAdminDashCountHover" : "totalNftsAdminDashCount"
            }
            content={totalEnabled}
            message="Total Enabled"
            icon={<ListAltIcon />}
          />
        </div>
        <div className="col-12 col-lg-5 col-md-5 col-sm-5 col-xl-5 mr-sm-3 mb-2 mb-sm-3 totalNftsAdminDash">
          <DisplayNumbersAndContentCard
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            linkTo={`${path}/manageAccounts`}
            state={{ current: "disabled" }}
            hoverH4={
              hover
                ? "totalNftsAdminDashHeadingHover totalNftsAdminDashHeading"
                : "totalNftsAdminDashHeading"
            }
            hoverH1={
              hover ? "totalNftsAdminDashCountHover" : "totalNftsAdminDashCount"
            }
            content={totalDisabled}
            message="Total Disabled"
            icon={<ListAltIcon />}
          />
        </div>
        <div className="col-12 col-lg-5 col-md-5 col-sm-5 col-xl-5 mr-sm-3 mb-2 mb-sm-3 totalNftsAdminDash">
          <DisplayNumbersAndContentCard
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            linkTo={`${path}/verifiedAccounts`}
            hoverH4={
              hover
                ? "totalNftsAdminDashHeadingHover totalNftsAdminDashHeading"
                : "totalNftsAdminDashHeading"
            }
            hoverH1={
              hover ? "totalNftsAdminDashCountHover" : "totalNftsAdminDashCount"
            }
            content={totalVerifiedAdmins}
            message="Total Verified"
            icon={<ListAltIcon />}
          />
        </div>
        <div className="col-12 col-lg-5 col-md-5 col-sm-5 col-xl-5 mr-sm-3 mb-2 mb-sm-3 totalNftsAdminDash">
          <DisplayNumbersAndContentCard
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            linkTo={`${path}/accountApproval`}
            hoverH4={
              hover
                ? "totalNftsAdminDashHeadingHover totalNftsAdminDashHeading"
                : "totalNftsAdminDashHeading"
            }
            hoverH1={
              hover ? "totalNftsAdminDashCountHover" : "totalNftsAdminDashCount"
            }
            content={totalUnverifiedAdmins}
            message="Total Unverified"
            icon={<ListAltIcon />}
          />
        </div>
      </div>
      <CircularBackdrop open={open} />
    </div>
  );
}

export default SuperAdminDefaultScreen;
