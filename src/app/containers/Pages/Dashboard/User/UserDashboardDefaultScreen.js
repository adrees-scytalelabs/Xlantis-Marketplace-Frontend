import ListAltIcon from "@mui/icons-material/ListAlt";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useResolvedPath } from "react-router-dom";
import AdminBalanceCard from "../../../../components/Cards/AdminBalanceCard";
import DisplayNumbersAndContentCard from "../../../../components/Cards/DisplayNumbersAndContentCard";
import { getUserCount } from "../../../../redux/getUserCount";
import { getUserProfile } from "../../../../redux/getUserProfileSlice";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { getMaticBalance } from "../../../../components/API/AxiosInterceptor";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";

function UserDashboardDefaultScreen(props) {
  const [open, setOpen] = useState(false);
  const [balanceUSD, setBalanceUSD] = useState(0);
  const [balanceMatic, setBalanceMatic] = useState(0);
  const [totalNFTs, setTotalNFTs] = useState(0);
  const [hover, setHover] = useState(false);
  const [userName, setUserName] = useState("");
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const { nftCount } = useSelector((store) => store.userCount);
  const { userData, loading } = useSelector((store) => store.userProfile);
  const dispatch = useDispatch();
  const path = useResolvedPath("").pathname;
  const cardContainerStyle = {
    flex: 1,
    minWidth: 0,
    maxWidth: "100%",
    padding: "0 0.5rem",
  };

  useEffect(() => {
    dispatch(getUserCount());
    setTotalNFTs(nftCount);
  }, [nftCount]);

  useEffect(() => {
    let userLogin = sessionStorage.getItem("Authorization");
    if (userLogin != "undefined") {
      dispatch(getUserProfile());
      setUserName(userData.username);
    }
  }, [loading]);

  useEffect(() => {
    props.setActiveTab({
      dashboard: "active",
      newNFT: "",
      orders: "",
      myNFTs: "",
      myDrops: "",
      settings: "",
      privacyPolicy: "",
      termsandconditions: "",
      changePassword: "",
      newDrop: "",
      newCube: "",
      newCollection: "",
      newRandomDrop: "",
    });
  }, []);

  return (
    <>
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Welcome {userName}!</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item active" style={{ color: "#999" }}>
                Dashboard
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row no-gutters justify-content-center justify-content-sm-start align-items-center mt-5 mb-5">
        <div className="col-6" style={{ display: "flex", flexWrap: "wrap" }}>
          <div style={cardContainerStyle}>
            <DisplayNumbersAndContentCard
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              linkTo={`${path}/myNFTs`}
              hoverH4={
                hover
                  ? "totalNftsAdminDashHeadingHover totalNftsAdminDashHeading"
                  : "totalNftsAdminDashHeading"
              }
              hoverH1={
                hover
                  ? "totalNftsAdminDashCountHover"
                  : "totalNftsAdminDashCount"
              }
              content={totalNFTs}
              message="Total NFTs"
              icon={<ListAltIcon />}
            />
          </div>
        </div>
      </div>
      <CircularBackdrop open={open} />
    </>
  );
}

export default UserDashboardDefaultScreen;
