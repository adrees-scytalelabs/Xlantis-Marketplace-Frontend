import ListAltIcon from '@mui/icons-material/ListAlt';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import DisplayNumbersAndContentCard from "../../../../components/Cards/DisplayNumbersAndContentCard";
import { getUserCount } from "../../../../redux/getUserCount";
import { getUserProfile } from "../../../../redux/getUserProfileSlice";
import { useResolvedPath } from 'react-router-dom';
function UserDashboardDefaultScreen(props) {
  const [totalNFTs, setTotalNFTs] = useState(0);
  const [hover, setHover] = useState(false);
  const [userName, setUserName] = useState("");
  const { nftCount } = useSelector((store) => store.userCount);
  const { userData } = useSelector((store) => store.userProfile);
  const dispatch = useDispatch();
  const path = useResolvedPath("").pathname;
  useEffect(() => {
    dispatch(getUserCount());
    setTotalNFTs(nftCount);
  }, [nftCount]);

  useEffect(() => {
    dispatch(getUserProfile());
    setUserName(userData);
  }, [userData]);

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
        <div className="col-12 col-sm-5 col-xl-4 mr-sm-2 mb-2 mb-sm-0 totalNftsAdminDash">
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
              hover ? "totalNftsAdminDashCountHover" : "totalNftsAdminDashCount"
            }
            content={totalNFTs}
            message="Total NFTs"
            icon={<ListAltIcon />}
          />
        </div>
      </div>
    </>
  );
}

export default UserDashboardDefaultScreen;
