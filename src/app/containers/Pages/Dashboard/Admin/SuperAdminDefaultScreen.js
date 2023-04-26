import ListAltIcon from "@material-ui/icons/ListAlt";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import DisplayNumbersAndContentCard from "../../../../components/Cards/DisplayNumbersAndContentCard";
import { getSuperAdminCountsType1, getSuperAdminCountsType2 } from "../../../../redux/getSuperAdminsCountsSlice";

function SuperAdminDefaultScreen(props) {
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [totalVerifiedAdmins, setTotalVerifiedAdmins] = useState(0);
  const [totalUnverifiedAdmins, setTotalUnverifiedAdmins] = useState(0);
  const [totalEnabled, setTotalEnabled] = useState(0);
  const [totalDisabled, setTotalDisabled] = useState(0);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const { countsType1, countsType2, loadingType1, loadingType2 } = useSelector((store) => store.getSuperAdminsCounts);
  const dispatch = useDispatch();
  let getCounts = () => {
    setOpen(true);
    dispatch(getSuperAdminCountsType1());
    dispatch(getSuperAdminCountsType2());
    console.log("dispatchResp", countsType1, countsType2);
    if (loadingType1 === 1 && loadingType2 === 1) {
      setTotalAdmins(
        countsType2.totalAdmins +
        countsType1.totalAdmins
      );
      setTotalVerifiedAdmins(
        countsType2.totalVerifiedAdmins +
        countsType1.totalVerifiedAdmins
      );
      setTotalUnverifiedAdmins(
        countsType2.totalUnverifiedAdmins +
        countsType1.totalUnverifiedAdmins
      );
      setTotalEnabled(
        countsType2.totalEnabledAdmins +
        countsType1.totalEnabledAdmins
      );
      setTotalDisabled(
        countsType2.totalDisabledAdmins +
        countsType1.totalDisabledAdmins
      );
      setOpen(false);
    }
  };

  useEffect(() => {
    getCounts();
  }, [loadingType1, loadingType2]);

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
  }, []);
  return (
    <div className="container">
      <div className="row no-gutters justify-content-center justify-content-sm-start align-items-center mt-5 mb-5">
        <div className="col-12 col-lg-5 col-md-5 col-sm-5 col-xl-5 mr-sm-3 mb-2 mb-sm-3 totalNftsAdminDash">
          <DisplayNumbersAndContentCard
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            linkTo={`${props.match.url}/accounts`}
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
            linkTo={{
              pathname: `${props.match.url}/manageAccounts`,
              state: { current: "enabled" },
            }}
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
            linkTo={{
              pathname: `${props.match.url}/manageAccounts`,
              state: { current: "disabled" },
            }}
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
            linkTo={`${props.match.url}/verifiedAccounts`}
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
            linkTo={`${props.match.url}/accountApproval`}
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
