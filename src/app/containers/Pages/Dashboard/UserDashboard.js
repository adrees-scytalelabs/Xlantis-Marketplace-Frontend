import React, { Suspense, useState } from "react";
import { Route, Routes, useResolvedPath } from "react-router-dom";
import "../../../assets/css/adminStyle.css";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import "../../../assets/plugins/fontawesome/css/all.min.css";
import "../../../assets/plugins/fontawesome/css/fontawesome.min.css";
import HeaderHome from "../../../components/Headers/Header";
import UserSidebar from "./User/UserSidebar";
import Loading from "../Users/Loading";

const LazyAuctionNFT = React.lazy(() => import('./Admin/AuctionNFT'));
const LazyDropNfts = React.lazy(() => import('./Admin/DropNfts'));
const LazyMarketPlace = React.lazy(() => import('./Admin/MarketPlace'));
const LazyNFTBuy = React.lazy(() => import('./Admin/NFTBuy'));
const LazySingleNftDetail = React.lazy(() => import('./Admin/singleNftDetail'));
const LazyCollectionNfts = React.lazy(() => import('./User/CollectionNfts'));
const LazyMyCollection = React.lazy(() => import('./User/MyCollection'));
const LazyMyDrops = React.lazy(() => import('./User/MyDrops'));
const LazyMyNFTs = React.lazy(() => import('./User/MyNFTs'));
const LazyUserDashboardDefaultScreen = React.lazy(() => import('./User/UserDashboardDefaultScreen'));


const AuctionNFT = ({ setActiveTab }) => (
  <Suspense fallback={<Loading />}>
    <LazyAuctionNFT
      setActiveTab={setActiveTab} />
  </Suspense>
);
const DropNfts = ({ setActiveTab }) => (
  <Suspense fallback={<Loading />}>
    <LazyDropNfts
      setActiveTab={setActiveTab} />
  </Suspense>
);
const MarketPlace = ({ setActiveTab }) => (
  <Suspense fallback={<Loading />}>
    <LazyMarketPlace
      setActiveTab={setActiveTab} />
  </Suspense>
);
const NFTBuy = ({ setActiveTab }) => (
  <Suspense fallback={<Loading />}>
    <LazyNFTBuy
      setActiveTab={setActiveTab} />
  </Suspense>
);
const SingleNftDetail = ({ setActiveTab }) => (
  <Suspense fallback={<Loading />}>
    <LazySingleNftDetail
      setActiveTab={setActiveTab} />
  </Suspense>
);
const CollectionNfts = ({ setActiveTab }) => (
  <Suspense fallback={<Loading />}>
    <LazyCollectionNfts
      setActiveTab={setActiveTab} />
  </Suspense>
);
const MyCollection = ({ setActiveTab }) => (
  <Suspense fallback={<Loading />}>
    <LazyMyCollection
      setActiveTab={setActiveTab} />
  </Suspense>
);
const MyDrops = ({ setActiveTab }) => (
  <Suspense fallback={<Loading />}>
    <LazyMyDrops
      setActiveTab={setActiveTab} />
  </Suspense>
);
const MyNFTs = ({ setActiveTab }) => (
  <Suspense fallback={<Loading />}>
    <LazyMyNFTs
      setActiveTab={setActiveTab} />
  </Suspense>
);
const UserDashboardDefaultScreen = ({ match, setActiveTab }) => (
  <Suspense fallback={<Loading />}>
    <LazyUserDashboardDefaultScreen
      match={match}
      setActiveTab={setActiveTab} />
  </Suspense>
);




function UserDashboard(props) {
  const path = useResolvedPath("").pathname;
  const [slideNavClass] = useState();

  const [activeTab, setActiveTab] = useState({
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
  });

  return (
    <div className={`main-wrapper ${slideNavClass}`}>
      <HeaderHome selectedNav={""} role={null} />

      <UserSidebar
        match={path}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Routes>
            <Route exact path={`dashboard`} element={
              <UserDashboardDefaultScreen
                match={path}
                setActiveTab={setActiveTab}
              />
            } />

            <Route exact path={`myNFTs`} element={
              <MyNFTs setActiveTab={setActiveTab} />
            } />
            <Route exact path={`nftDetail/:nftId`} element={
              <SingleNftDetail setActiveTab={setActiveTab} />
            } />
            <Route exact path={`myDrops`} element={
              <MyDrops setActiveTab={setActiveTab} />
            } />

            <Route exact path={`myCollection`} element={
              <MyCollection setActiveTab={setActiveTab} />
            } />
            <Route exact path={`marketPlace`} element={
              <MarketPlace setActiveTab={setActiveTab} />
            } />
            <Route exact path={`marketPlace/drops/nfts`} element={
              <DropNfts setActiveTab={setActiveTab} />
            } />
            <Route exact path={`marketPlace/drops/nfts/buy`} element={
              <NFTBuy setActiveTab={setActiveTab} />
            } />
            <Route exact path={`marketPlace/:dropId/:nftId`} element={
              <AuctionNFT setActiveTab={setActiveTab} />
            } />
            <Route exact path={`collection/nfts/:collectionId`} element={
              <CollectionNfts setActiveTab={setActiveTab} />} />
            <Route path={`/`} element={
              <UserDashboardDefaultScreen
                match={path}
                setActiveTab={setActiveTab}
              />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
