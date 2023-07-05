import React, { useState } from "react";
import { Route, Routes, useLocation, useResolvedPath } from "react-router-dom";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/style.css";

import HeaderHome from "../../../components/Headers/Header";
import AuctionNFT from "./Admin/AuctionNFT";
import DropNfts from "./Admin/DropNfts";
import MarketPlace from "./Admin/MarketPlace";
import NFTBuy from "./Admin/NFTBuy";
import SingleNftDetail from "./Admin/singleNftDetail";
import CollectionNfts from "./User/CollectionNfts";
import MyCollection from "./User/MyCollection";
import MyDrops from "./User/MyDrops";
import MyNFTs from "./User/MyNFTs";
import UserDashboardDefaultScreen from "./User/UserDashboardDefaultScreen";
import UserSidebar from "./User/UserSidebar";
import TopupHistoryPageUser from "./User/TopupHistoryPageUser";
import TopUp from "../../../components/Topup/TopUp";
import Notification from "./Admin/Notification";
function UserDashboard() {
  const path = useResolvedPath("").pathname;
  const [slideNavClass] = useState();
  let location = useLocation();
  const [activeTab, setActiveTab] = useState(
    {
      dashboard: "active",
      myNFTs: "",
      totalUserAccount: "",
      pendingUserAccount: "",
      resolvedDisputedOrders: "",
      tradeListOrders: "",
      earningsList: "",
      referralEarnings: "",
      settings: "",
      changePassword: "",
      newNFT: "",
      newCube: "",
      myDrops: "",
      newDrop: "",
      newSeason: "",
      newCollection: "",
      myCubes: "",
      newRandomDrop: "",
      topUp: "",
      topupHistory: "",
      notification: "",
    },
    []
  );

  return (
    <div className={`main-wrapper ${slideNavClass}`}>
      <HeaderHome selectedNav={""} role={null} />

      <UserSidebar
        match={path}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        notification={location.state?.notification}
      />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Routes>
            <Route
              exact
              path={`dashboard`}
              element={
                <UserDashboardDefaultScreen
                  match={path}
                  setActiveTab={setActiveTab}
                  notification={location.state?.notification}
                  isStripeLogin={true}
                />
              }
            />
            <Route
              exact
              path={`notifications`}
              element={
                <Notification
                  match={path}
                  setActiveTab={setActiveTab}
                  notification={location.state?.notification}
                  isStripeLogin={true}
                />
              }
            />
            <Route
              exact
              path={`myNFTs`}
              element={
                <MyNFTs setActiveTab={setActiveTab} isStripeLogin={true} />
              }
            />
            {/* <Route
              exact
              path={"topup-history"}
              element={<TopupHistoryPageUser setActiveTab={setActiveTab} />}
            /> */}
            <Route
              exact
              path={`nftDetail/:nftId`}
              element={
                <SingleNftDetail
                  setActiveTab={setActiveTab}
                  isStripeLogin={true}
                />
              }
            />
            <Route
              exact
              path={`myDrops`}
              element={
                <MyDrops setActiveTab={setActiveTab} isStripeLogin={true} />
              }
            />

            <Route
              exact
              path={`myCollection`}
              element={
                <MyCollection
                  setActiveTab={setActiveTab}
                  isStripeLogin={true}
                />
              }
            />
            <Route
              exact
              path={`marketPlace`}
              element={
                <MarketPlace setActiveTab={setActiveTab} isStripeLogin={true} />
              }
            />
            <Route
              exact
              path={`marketPlace/drops/nfts`}
              element={
                <DropNfts setActiveTab={setActiveTab} isStripeLogin={true} />
              }
            />
            <Route
              exact
              path={`marketPlace/drops/nfts/buy`}
              element={
                <NFTBuy setActiveTab={setActiveTab} isStripeLogin={true} />
              }
            />
            {/* <Route
              exact
              path={`topUp`}
              element={<TopUp setActiveTab={setActiveTab} />}
            /> */}
            <Route
              exact
              path={`marketPlace/:dropId/:nftId`}
              element={
                <AuctionNFT setActiveTab={setActiveTab} isStripeLogin={true} />
              }
            />
            <Route
              exact
              path={`collection/nfts/:collectionId`}
              element={
                <CollectionNfts
                  setActiveTab={setActiveTab}
                  isStripeLogin={true}
                />
              }
            />
            <Route
              path={`/`}
              element={
                <UserDashboardDefaultScreen
                  match={path}
                  setActiveTab={setActiveTab}
                  isStripeLogin={true}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
