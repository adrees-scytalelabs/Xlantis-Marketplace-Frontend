import axios from "axios";
import React, { useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import "../../../assets/css/adminStyle.css";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import "../../../assets/plugins/fontawesome/css/all.min.css";
import "../../../assets/plugins/fontawesome/css/fontawesome.min.css";
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
axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${sessionStorage.getItem("Authorization")}`;

function UserDashboard(props) {
  let { path } = useRouteMatch();
  let [slideNavClass] = useState();

  let [activeTab, setActiveTab] = useState({
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
        match={props.match}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Switch>
            <Route exact path={`${path}/dashboard`}>
              <UserDashboardDefaultScreen
                match={props.match}
                setActiveTab={setActiveTab}
              />
            </Route>

            <Route exact path={`${path}/myNFTs`}>
              <MyNFTs setActiveTab={setActiveTab} />
            </Route>
            <Route exact path={`${path}/nftDetail/:nftId`}>
              <SingleNftDetail setActiveTab={setActiveTab} />
            </Route>

            <Route exact path={`${path}/myDrops`}>
              <MyDrops setActiveTab={setActiveTab} />
            </Route>

            <Route exact path={`${path}/myCollection`}>
              <MyCollection setActiveTab={setActiveTab} />
            </Route>
            <Route exact path={`${path}/marketPlace`}>
              <MarketPlace setActiveTab={setActiveTab} />
            </Route>
            <Route exact path={`${path}/marketPlace/drops/nfts`}>
              <DropNfts setActiveTab={setActiveTab} />
            </Route>
            <Route exact path={`${path}/marketPlace/drops/nfts/buy`}>
              <NFTBuy setActiveTab={setActiveTab} />
            </Route>
            <Route exact path={`${path}/marketPlace/:dropId/:nftId`}>
              <AuctionNFT setActiveTab={setActiveTab} />
            </Route>
            <Route exact path={`${path}/collection/nfts/:collectionId`}>
              <CollectionNfts setActiveTab={setActiveTab} />
            </Route>
            <Route path={`${path}`}>
              <UserDashboardDefaultScreen
                match={props.match}
                setActiveTab={setActiveTab}
              />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
