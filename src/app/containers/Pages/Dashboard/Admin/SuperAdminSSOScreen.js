import ListAltIcon from "@mui/icons-material/ListAlt";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useResolvedPath } from "react-router-dom";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import DisplayNumbersAndContentCard from "../../../../components/Cards/DisplayNumbersAndContentCard";
import { getSuperAdminCountsType1 } from "../../../../redux/getSuperAdminsCountsSlice";

function SuperAdminSSOScreen(props) {
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [open, setOpen] = useState(false);
  const [totalVerifiedAdmins, setTotalVerifiedAdmins] = useState(0);
  const [totalUnverifiedAdmins, setTotalUnverifiedAdmins] = useState(0);
  const [totalEnabled, setTotalEnabled] = useState(0);
  const [totalDisabled, setTotalDisabled] = useState(0);
  const [hover, setHover] = useState(false);
  const path = useResolvedPath("").pathname;
  const { countsType1, loadingType1 } = useSelector(
    (store) => store.getSuperAdminsCounts
  );
  const dispatch = useDispatch();

  let getCounts = () => {
    setOpen(true);
    dispatch(getSuperAdminCountsType1());
    if (loadingType1 === 1) {
      setTotalAdmins(countsType1.totalAdmins);
      setTotalVerifiedAdmins(countsType1.totalVerifiedAdmins);
      setTotalUnverifiedAdmins(countsType1.totalUnverifiedAdmins);
      setTotalEnabled(countsType1.totalEnabledAdmins);
      setTotalDisabled(countsType1.totalDisabledAdmins);
      setOpen(false);
    }
  };
  useEffect(() => {
    props.setTab(1);
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
      adminStats: "active",
    });
  }, []);

  useEffect(() => {
    getCounts();
  }, [loadingType1]);

  return (
    <div className="container">
      <div className="row no-gutters justify-content-sm-start align-items-center mt-5 mb-5">
        <div className="col-12 col-lg-5 col-md-5 col-sm-5 col-xl-5 mr-sm-3 mb-2 mb-sm-3 totalNftsAdminDash">
          <DisplayNumbersAndContentCard
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            linkTo={``}
            hoverH4={
              hover
                ? "totalNftsAdminDashHeadingHover totalNftsAdminDashHeading"
                : "totalNftsAdminDashHeading"
            }
            hoverH1={
              hover ? "totalNftsAdminDashCountHover" : "totalNftsAdminDashCount"
            }
            content={totalAdmins}
            message="Total SSO Admins"
            icon={<ListAltIcon />}
          />
        </div>
        <div className="col-12 col-lg-5 col-md-5 col-sm-5 col-xl-5 mr-sm-3 mb-2 mb-sm-3 totalNftsAdminDash">
          <DisplayNumbersAndContentCard
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            linkTo={``}
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
            message="SSO Enabled Admins"
            icon={<ListAltIcon />}
          />
        </div>
        <div className="col-12 col-lg-5 col-md-5 col-sm-5 col-xl-5 mr-sm-3 mb-2 mb-sm-3 totalNftsAdminDash">
          <DisplayNumbersAndContentCard
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            linkTo={``}
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
            message="SSO Disbaled Admins"
            icon={<ListAltIcon />}
          />
        </div>
        <div className="col-12 col-lg-5 col-md-5 col-sm-5 col-xl-5 mr-sm-3 mb-2 mb-sm-3 totalNftsAdminDash">
          <DisplayNumbersAndContentCard
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            linkTo={``}
            hoverH4={
              hover
                ? "totalNftsAdminDashHeadingHover totalNftsAdminDashHeading"
                : "totalNftsAdminDashHeading"
            }
            hoverH1={
              hover ? "totalNftsAdminDashCountHover" : "totalNftsAdminDashCount"
            }
            content={totalVerifiedAdmins}
            message="Total SSO Verified Admins"
            icon={<ListAltIcon />}
          />
        </div>
        <div className="col-12 col-lg-5 col-md-5 col-sm-5 col-xl-5 mr-sm-3 mb-2 mb-sm-3 totalNftsAdminDash">
          <DisplayNumbersAndContentCard
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            linkTo={``}
            hoverH4={
              hover
                ? "totalNftsAdminDashHeadingHover totalNftsAdminDashHeading"
                : "totalNftsAdminDashHeading"
            }
            hoverH1={
              hover ? "totalNftsAdminDashCountHover" : "totalNftsAdminDashCount"
            }
            content={totalUnverifiedAdmins}
            message="Total SSO Unverified Admins"
            icon={<ListAltIcon />}
          />
        </div>
      </div>
      <CircularBackdrop open={open} />
    </div>
  );
}

export default SuperAdminSSOScreen;
