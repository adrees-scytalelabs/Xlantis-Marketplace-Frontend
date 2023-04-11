import ListAltIcon from "@material-ui/icons/ListAlt";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import DisplayNumbersAndContentCard from "../../../../components/Cards/DisplayNumbersAndContentCard";
import { useDispatch, useSelector } from 'react-redux';
import { getCount } from "../../../../redux/getCountSlice";

function AdminDashboardDefaultScreen(props) {
  const [totalNFTs, setTotalNFTs] = useState(0);
  const [totalCollections, setTotalCollections] = useState(0);
  const [hover, setHover] = useState(false);
  const [hoverCollections, setHoverCollections] = useState(false);
   const {nftCount,collectionCount } = useSelector((store) => store.count);
     const dispatch = useDispatch();


     useEffect(() => {
      dispatch(getCount());
      setTotalNFTs(nftCount);
      setTotalCollections(collectionCount);
    }, [nftCount]);

  useEffect(() => {
    props.setActiveTab({
      dashboard: "active",
      newCollection: "",
      myCollections: "",
      newNFT: "",
      myNFTs: "",
      marketplace: "",
      newDrop: "",
      myDrops: "",
      topUp: "",
    });
  }, []);
  return (
    <>
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Welcome Admin!</h3>
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
            linkTo={`${props.match.url}/myNFTs`}
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
        <div className="col-12 col-sm-5 col-xl-4 ml-sm-2 mt-2 mt-sm-0 totalCollectionsAdminDash">
          <DisplayNumbersAndContentCard
            onMouseEnter={() => setHoverCollections(true)}
            onMouseLeave={() => setHoverCollections(false)}
            linkTo={`${props.match.url}/myCollection`}
            hoverH4={
              hoverCollections
                ? "totalCollectionsAdminDashHeadingHover totalCollectionsAdminDashHeading"
                : "totalCollectionsAdminDashHeading"
            }
            hoverH1={
              hoverCollections
                ? "totalCollectionsAdminDashCountHover"
                : "totalCollectionsAdminDashCount"
            }
            content={totalCollections}
            message="Total Collections"
            icon={<i className="fas fa-layer-group pr-1"></i>}
          />
        </div>
      </div>
    </>
  );
}

export default AdminDashboardDefaultScreen;
