import Cookies from "js-cookie";
import React, { Suspense, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, Route, Routes, useResolvedPath } from "react-router-dom";
import "../../../assets/css/adminStyle.css";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import Logo from "../../../assets/img/logo.png";
import "../../../assets/plugins/fontawesome/css/all.min.css";
import "../../../assets/plugins/fontawesome/css/fontawesome.min.css";
import { defaultProfile } from "../../../components/ImageURLs/URLs";
import Loading from "../Users/Loading";
import AdminSidebar from "./Admin/AdminSidebar";

const LazyAddNFT = React.lazy(() => import('./Admin/AddNFT'));
const LazyNewCollection = React.lazy(() => import('./Admin/NewCollection'));
const LazyAdminDashboardDefaultScreen = React.lazy(() => import('./Admin/AdminDashboardDefaultScreen'));
const LazyAuctionNFT = React.lazy(() => import('./Admin/AuctionNFT'));
const LazyCollectionNfts = React.lazy(() => import('./Admin/CollectionNfts'));
const LazyDropApproval = React.lazy(() => import('./Admin/DropApproval'));
const LazyDropNfts = React.lazy(() => import('./Admin/DropNfts'));
const LazyDropSingleNFT = React.lazy(() => import('./Admin/DropSingleNFT'));
const LazyMarketPlace = React.lazy(() => import('./Admin/MarketPlace'));
const LazyMyCollection = React.lazy(() => import('./Admin/MyCollection'));
const LazyMyDropNFTs = React.lazy(() => import('./Admin/MyDropNfts'));
const LazyMyDrops = React.lazy(() => import('./Admin/MyDrops'));
const LazyMyNFTs = React.lazy(() => import('./Admin/MyNFTs'));
const LazyNFTBuy = React.lazy(() => import('./Admin/NFTBuy'));
const LazyNewDrop = React.lazy(() => import('./Admin/NewDrop'));
const LazyNewNFT = React.lazy(() => import('./Admin/NewNFT'));
const LazyTopUp = React.lazy(() => import('./Admin/TopUp'));
const SingleNftDetail = React.lazy(() => import('./Admin/singleNftDetail'));



const AddNFT = ({setActiveTab}) => (
  <Suspense fallback={<Loading />}>
    <LazyAddNFT setActiveTab={setActiveTab} />
  </Suspense>
);
const NewCollection = ({setActiveTab}) => (
  <Suspense fallback={<Loading />}>
    <LazyNewCollection  setActiveTab={setActiveTab}/>
  </Suspense>
);
const AdminDashboardDefaultScreen = ({match, setActiveTab}) => (
  <Suspense fallback={<Loading />}>
    <LazyAdminDashboardDefaultScreen match={match}
      setActiveTab={setActiveTab} />
  </Suspense>
);
const AuctionNFT = ({setActiveTab}) => (
  <Suspense fallback={<Loading />}>
    <LazyAuctionNFT setActiveTab={setActiveTab}/>
  </Suspense>
);
const CollectionNfts = ({setActiveTab}) => (
  <Suspense fallback={<Loading />}>
    <LazyCollectionNfts setActiveTab={setActiveTab} />
  </Suspense>
);
const DropApproval = ({setActiveTab}) => (
  <Suspense fallback={<Loading />}>
    <LazyDropApproval setActiveTab={setActiveTab} />
  </Suspense>
);
const DropNfts = ({setActiveTab}) => (
  <Suspense fallback={<Loading />}>
    <LazyDropNfts setActiveTab={setActiveTab}/>
  </Suspense>
);
const DropSingleNFT = ({setActiveTab}) => (
  <Suspense fallback={<Loading />}>
    <LazyDropSingleNFT setActiveTab={setActiveTab} />
  </Suspense>
);
const MarketPlace = ({setActiveTab}) => (
  <Suspense fallback={<Loading />}>
    <LazyMarketPlace setActiveTab={setActiveTab}/>
  </Suspense>
);
const MyCollection = ({setActiveTab}) => (
  <Suspense fallback={<Loading />}>
    <LazyMyCollection setActiveTab={setActiveTab}/>
  </Suspense>
);
const MyDropNFTs = ({setActiveTab}) => (
  <Suspense fallback={<Loading/>}>
      <LazyMyDropNFTs setActiveTab={setActiveTab}/>
  </Suspense>
);
const MyDrops = ({setActiveTab}) => (
  <Suspense fallback={<Loading />}>
    <LazyMyDrops setActiveTab={setActiveTab} />
  </Suspense>
);
const MyNFTs = ({setActiveTab}) => (
  <Suspense fallback={<Loading />}>
    <LazyMyNFTs setActiveTab={setActiveTab} />
  </Suspense>
);
const NFTBuy = ({setActiveTab}) => (
  <Suspense fallback={<Loading />}>
    <LazyNFTBuy setActiveTab={setActiveTab} />
  </Suspense>
);
const NewDrop = ({setActiveTab}) => (
  <Suspense fallback={<Loading />}>
    <LazyNewDrop setActiveTab={setActiveTab} />
  </Suspense>
);
const NewNFT = ({setActiveTab}) => (
  <Suspense fallback={<Loading />}>
    <LazyNewNFT setActiveTab={setActiveTab} />
  </Suspense>
);
const TopUp = ({setActiveTab}) => (
  <Suspense fallback={<Loading />}>
    <LazyTopUp setActiveTab={setActiveTab}/>
  </Suspense>
);


function AdminDashboard(props) {
  console.log("propsprops", props);
  // const path = useResolvedPath("").pathname;
  const path = useResolvedPath("").pathname;
  console.log("path", path);
  const [menuOpenedClass, setMenuOpenedClass] = useState();
  const [slideNavClass, setSlideNavClass] = useState();

  let handleSlideNav = (e) => {
    e.preventDefault();
    if (slideNavClass !== "" && menuOpenedClass !== "") {
      setMenuOpenedClass("");
      setSlideNavClass("");
    } else {
      setMenuOpenedClass("menu-opened");
      setSlideNavClass("slide-nav");
    }
  };

  const [activeTab, setActiveTab] = useState({
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

  return (
    <div className={`main-wrapper ${slideNavClass}`}>
      <div className={`admin-header ${menuOpenedClass}`}>
        <div className="header-left">
          <a href="/" className="navbar-brand logo" style={{ width: "210px" }}>
            <img
              src={Logo}
              alt="Logo"
              width="120"
              height="34"
              style={{
                marginTop: "16px",
                width: "210px",
                height: "30px",
                padding: "5px 15px",
              }}
            />
          </a>
          <a href="/" className="logo logo-small" style={{ width: "210px" }}>
            <img
              src={Logo}
              alt="Logo"
              width="90"
              style={{
                marginTop: "16px",
                width: "210px",
                height: "30px",
                padding: "5px 15px",
              }}
            />
          </a>
        </div>
        <a
          href="/"
          className="mobile_btn"
          id="mobile_btn"
          onClick={handleSlideNav}
        >
          <i className="fa fa-bars"></i>
        </a>
        <ul className="nav user-menu">
          <li className="nav-item dropdown has-arrow">
            <Dropdown>
              <Dropdown.Toggle
                style={{
                  backgroundColor: "transparent",
                  border: "0",
                  paddingTop: "15px",
                }}
              >
                <span className="admin-img">
                  <img
                    className="avatar-sm rounded-circle"
                    src={defaultProfile}
                    width="50"
                    alt="Ryan Taylor"
                  />
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu
                alignRight="true"
                style={{ backgroundColor: "black" }}
              >
                <Dropdown.Item>
                  <Link to="/dashboard" style={{ width: "100%" }}>
                    Dashboard
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/admin/settings" style={{ width: "100%" }}>
                    Profile Settings
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link
                    onClick={() => {
                      sessionStorage.clear();
                      sessionStorage.removeItem("Address");
                      Cookies.remove("PNT");
                      window.location.reload(false);
                    }}
                    to="/"
                    style={{ width: "100%" }}
                  >
                    Logout
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </div>

      <AdminSidebar
        match={path}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Routes>
            <Route path={`/`} element={
              <AdminDashboardDefaultScreen
                match={path}
                setActiveTab={setActiveTab} />
            }
            />

            <Route path={`newNFT`}
              element={<NewNFT setActiveTab={setActiveTab} />}
            />
            <Route exact path={`myNFTs`}
              element={<MyNFTs setActiveTab={setActiveTab} />}
            />

            <Route exact path={`dropApproval`}
              element={<DropApproval setActiveTab={setActiveTab} />}
            />
            <Route exact path={`topUp`}
              element={<TopUp setActiveTab={setActiveTab} />}
            />

            <Route exact path={`newDrop`}
              element={<NewDrop setActiveTab={setActiveTab} />}
            />
            <Route exact path={`newDrop/addNft`}
              element={<AddNFT setActiveTab={setActiveTab} />}
            />

            <Route exact path={`myDrops`}
              element={<MyDrops setActiveTab={setActiveTab} />}
            />

            <Route exact path={`myDrops/nfts`}
              element={<MyDropNFTs setActiveTab={setActiveTab} />}
            />

            <Route exact path={`myDrops/nfts/singleNft`}
              element={<DropSingleNFT setActiveTab={setActiveTab} />}
            />

            <Route exact path={`createNewCollection`}
              element={<NewCollection setActiveTab={setActiveTab} />}
            />
            <Route exact path={`myCollection`}
              element={<MyCollection setActiveTab={setActiveTab} />}
            />

            <Route exact path={`nftDetail/:nftId`}
              element={<SingleNftDetail setActiveTab={setActiveTab} />}
            />


            <Route exact path={`collection/nfts/:collectionId`}
              element={<CollectionNfts setActiveTab={setActiveTab} />}
            />
            <Route exact path={`marketPlace`}
              element={<MarketPlace setActiveTab={setActiveTab} />}
            />

            <Route exact path={`marketPlace/drops/nfts`}
              element={<DropNfts setActiveTab={setActiveTab} />}
            />
            <Route exact path={`marketPlace/drops/nfts/buy`}
              element={<NFTBuy setActiveTab={setActiveTab} />}
            />

            <Route exact path={`marketPlace/:dropId/:nftId`}
              element={<AuctionNFT setActiveTab={setActiveTab} />}
            />

            <Route path={`/`}
              element={<AdminDashboardDefaultScreen
                match={path}
                setActiveTab={setActiveTab}
              />}
            />

          </Routes>
        </div>
      </div>
    </div >
  );
}

export default AdminDashboard;
