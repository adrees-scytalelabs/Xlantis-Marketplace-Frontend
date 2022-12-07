import Person from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';
import Cookies from "js-cookie";
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import Logo from "../../assets/img/logo.png";
import "../../assets/plugins/fontawesome/css/all.min.css";
import "../../assets/plugins/fontawesome/css/fontawesome.min.css";
import NetworkErrorModal from "../Modals/NetworkErrorModal";
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Menu from '@material-ui/core/Menu';
import Settings from '@material-ui/icons/Settings';
import { useHistory, useRouteMatch } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import Web3 from 'web3';
import { providers, ethers } from 'ethers'
import money from "../../assets/img/wallet.png";
import man from "../../assets/img/man.png";


import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import axios from "axios";
import transakSDK from "@transak/transak-sdk";


function HeaderHome(props) {
  let [menuOpenedClass, setMenuOpenedClass] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  let { path } = useRouteMatch();
  let history = useHistory();

  const settings = {
    apiKey: 'cf5868eb-a8bb-45c8-a2db-4309e5f8b412',  // Your API Key
    environment: 'STAGING', // STAGING/PRODUCTION
    defaultCryptoCurrency: 'ETH',
    themeColor: '000000', // App theme color
    hostURL: window.location.origin,
    widgetHeight: "700px",
    widgetWidth: "500px",
  }


  
  let [isLoading, setIsLoading] = useState(false);

  let [network, setNetwork] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const providerOptions = {
    binancechainwallet: {
      package: true
      },
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "2b677656bad14a3db4592ffdb69e7805"
      }
      },
      walletlink: {
      package: WalletLink, 
      options: {
        appName: "RINKEBY API", 
        infuraId: "2b677656bad14a3db4592ffdb69e7805", 
        rpc: "", 
        chainId: 5, 
        appLogoUrl: null, 
        darkMode: true 
      }
      },
  };

  const web3Modal = new Web3Modal({
    network: "private",
    theme: "dark",
    cacheProvider: true,
    providerOptions 
  });

  function openTransak() {
    const transak = new transakSDK(settings);

    transak.init();

    // To get all the events
    transak.on(transak.ALL_EVENTS, (data) => {
        console.log(data)
    });

    // This will trigger when the user closed the widget
    transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, (eventData) => {
        console.log(eventData);
        transak.close();
    });

    // This will trigger when the user marks payment is made.
    transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
        console.log(orderData);
        window.alert("Payment Success")
        transak.close();
    });
  }

  async function handleLogin() { 
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts();
    const network = await web3.eth.net.getNetworkType()
    console.log(network);
    console.log("Account test: ", accounts[0], network);
    if (network !== 'private') {
      setNetwork(network);
      setIsLoading(false);
      handleShow();
    }
    else{
    // var provider = await web3Modal.connect();
    // var web3 = new Web3(provider); 
    // const newProvider = new providers.Web3Provider(provider)
    // await newProvider.send('eth_requestAccounts'); 
    // var accounts = await web3.eth.getAccounts(); 
    let account = accounts[0]; 
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    console.log("In the starting");

        

    console.log("Provider: ", provider);

    await provider.send("eth_requestAccounts", []);
    let signer = provider.getSigner();
    console.log("account", account);
    const address = await signer.getAddress();
    const message = `Welcome to RobotDrop! \n\nClick to sign in and accept the RobotDrop Terms of Service: https://RobotDrop.io/tos \n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nYour authentication status will reset after 24 hours. \n\nWallet address: ${address}`;
    console.log("Address: ", await signer.getAddress());
    let signatureHash = await web3.eth.personal.sign(message,address)
    console.log("Signature hash " ,signatureHash);
    let ethBalance = await web3.eth.getBalance(account);
    
    let loginData = {
      walletAddress: address,
      signature: signatureHash,
    }
    axios.post("/user/login", loginData).then(
      (response) => {
        console.log("response", response);
        Cookies.set("Authorization", response.data.token, {
        });
        // if (response.data.roles.includes("user")) {
        //   console.log("we here");
        //   localStorage.setItem("Address", accounts[0]);
        // }
        // setIsLoading(false);
        localStorage.setItem("Address", accounts[0]);
        history.push("/");
        // window.location.reload();

      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
        if (error.response !== undefined) {
          if (error.response.status === 400) {
            // setMsg(error.response.data.message);
          } else {
            // setMsg("Unknown Error Occured, try again.");
          }
        } else {
          // setMsg("Unknown Error Occured, try again.");
        }
        // setIsLoading(false);
      })
    }
    


      // contract = new web3.eth.Contract(ABI, ADDRESS); 
  }
  const selectedStyling = {
    border: "2px solid 'rgb(167,0,0)'",
    padding: "10px 20px",
    borderRadius: "12px",
    color: "#fbfeff",
    fontSize: "18px",
    fontWeight: "bold",
    backgroundImage:
      "linear-gradient(90deg, hsla(350, 93%, 61%, 1) 0%, hsla(8, 98%, 59%, 1) 100%)",
    boxShadow: "0 10px 6px -6px #777",
  };
  const defaultStyling = {
    padding: "10px 20px",
    borderRadius: "12px",
    color: "#04111D",
    fontSize: "18px",
    fontWeight: "bold",
  };
  const selectedNavStyle = {
    search: props.selectedNav === "search" ? defaultStyling : defaultStyling,
    Market: props.selectedNav === "Market" ? selectedStyling : defaultStyling,
    Drops: props.selectedNav === "Drops" ? selectedStyling : defaultStyling,
    Home: props.selectedNav === "Home" ? selectedStyling : defaultStyling,
    Blog: props.selectedNav === "Blog" ? selectedStyling : defaultStyling,
    Community:
      props.selectedNav === "Community" ? selectedStyling : defaultStyling,
    create: props.selectedNav === "create" ? selectedStyling : defaultStyling,
  };
  const hoverClassStyle = {
    Market: props.selectedNav === "Market" ? "" : "headerNavLinks",
    Drops: props.selectedNav === "Drops" ? "" : "headerNavLinks",
    Home: props.selectedNav === "Home" ? "" : "headerNavLinks",
    Blog: props.selectedNav === "Blog" ? "" : "headerNavLinks",
    Community: props.selectedNav === "Community" ? "" : "headerNavLinks",
    Create: props.selectedNav === "Create" ? "" : "headerNavLinks",
  };

  let Logout = (e) => {
    console.log("akjdf");
    Cookies.remove("Authorization");
    localStorage.removeItem("Address")
    // web3Modal.clearCachedProvider();
    window.location.reload();


    // setTimeout(() => { }, 1);
  };

  
  

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
    history.push('/user/settings');
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  return (
    <header className={`header ${menuOpenedClass}`}>
      <nav
        className="navbar navbar-expand-lg header-nav px-5 mainNav"
        style={{ width: "100%" }}
      >
        <div className="navbar-header">
          <a
            id="mobile_btn"
            href="/"
            style={{ color: "#04111D" }}
            onClick={(e) => {
              e.preventDefault();
              setMenuOpenedClass("menu-opened");
            }}
          >
            <span className="bar-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </a>

          <Link
            style={{ color: "#04111D" }}
            to="/"
            className="navbar-brand logo"
          >
            <img src={Logo} alt="Logo" width="130" />
            {/* Robot Drop */}
          </Link>

          {/* <Link style={{ color: 'rgb(167,0,0)' }} to="/kyc" className="navbar-brand">
            KYC
          </Link> */}
        </div>

        <div className="main-menu-wrapper">
          <div className="menu-header">
            {/* <a style={{ color: 'rgb(167,0,0)' }} href="/" className="menu-logo">
              <img src={Logo} alt="Logo" width="100" height="60" />
            </a> */}
            <a
              id="menu_close"
              className="menu-close"
              style={{ color: "#04111D" }}
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setMenuOpenedClass("");
              }}
            >
              <i className="fas fa-times"></i> Close
            </a>
          </div>
          <ul
            className="main-nav "
            style={{
              marginTop: "4px",
            }}
          >
            <li className="login-link ">
              <a
                href="/"
                style={{ paddingLeft: "5px" }}
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpenedClass("");
                }}
              >
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </a>
            </li>
            <li className="login-link ">
              {/* <Link to="/dashboard" style={{ color: 'rgb(167,0,0)' }} > */}

                {localStorage.getItem("Address") ? (
                <a
                  href={
                    "https://ropsten.etherscan.io/address/" +
                    localStorage.getItem("Address")
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#04111D" }}
                >
                  <span style={{ cursor: "pointer" }}>
                    {localStorage.getItem("Address").substr(0, 10)}. . .
                  </span>
                  </a>
                ) : (
                  <>
                    <Link
                      to="/login"
                      style={{
                        color: "#04111D",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                    <span
                      className={hoverClassStyle.Community}
                      style={selectedNavStyle.Community}
                    >
                      Connect Wallet
                    </span>
                    </Link>
                
                  </>

                )}
              {/* </Link> */}
            </li>
            <li>
              <a href="/" style={{ color: "rgb(167,0,0)" }}>
                <span
                  className={hoverClassStyle.Home}
                  style={selectedNavStyle.Home}
                >
                  Home
                  </span>
              </a>
            </li>
            <li>
              <Link to="/marketPlace" style={{ color: "rgb(167,0,0)" }}>
                <span
                  className={hoverClassStyle.Market}
                  style={selectedNavStyle.Market}
                >
                  Market
                  </span>
              </Link>
            </li>
            <li>
              <Link to="/auctionDrops" style={{ color: "rgb(167,0,0)" }}>
                <span
                  className={hoverClassStyle.Drops}
                  style={selectedNavStyle.Drops}
                >
                  Drops
                  </span>
              </Link>
            </li>
          </ul>
        </div>
        <ul className="nav header-navbar-rht">
          <li>
            {isLoading ? (
            <div className="text-center">
              <Spinner
                animation="border"
                role="status"
                style={{ color: "ff0000" }}
              >
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          ) : (
            localStorage.getItem("Address") ? (
              <div>
                  <Avatar
                  aria-owns={anchorEl ? "simple-menu" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                  // onMouseOver={handleClick}
                  alt="Remy Sharp"
                  src={man}
                  sx={{ width: 24, height: 24 }}
                />
                {/* <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  MenuListProps={{ onMouseLeave: handleMenuClose }}
                >
                  <MenuItem>
                    <div>
                      <Link to = "/profilesettings"></Link><Person /><span>Profile</span>
                    </div>
                  </MenuItem>
                  <MenuItem component={Link} to="/user/settings">Settings</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
                </Menu> */}
             </div>
              // <a href={"https://ropsten.etherscan.io/address/" + localStorage.getItem("Address")} target="_blank" rel="noopener noreferrer" style={{ color: 'rgb(167,0,0)' }}>
              //   <span style={{ cursor: 'pointer' }}>{localStorage.getItem("Address").substr(0, 10)}. . .</span>
              // </a>
            ) : (null
            //   <>
            //     <div>
            //       <Avatar
            //       aria-owns={anchorEl ? "simple-menu" : undefined}
            //       aria-haspopup="true"
            //       onClick={handleLogin}
            //       // onMouseOver={handleClick}
            //       alt="Remy Sharp"
            //       src="/static/images/avatar/1.jpg"
            //       sx={{ width: 24, height: 24 }}
            //     />
            //     </div>
            //     <span  style={{ color: 'rgb(167,0,0)' }} onClick = {handleLogin} >
            //       <span style={{ cursor: 'pointer' }}>
            //         Login/Signup
            // </span>
            //     </span>
            //     </>
            )
          )}

          </li>
          
          <li >
            {localStorage.getItem("Address") ? (
              <Link to="/dashboard" style={{ color: 'rgb(167,0,0)' }} >
                Dashboard
              </Link>

            ) : (
              <>
                {/* <div>
                  <Avatar
                  aria-owns={anchorEl ? "simple-menu" : undefined}
                  aria-haspopup="true"
                  onClick={handleLogin}
                  // onMouseOver={handleClick}
                  alt="Remy Sharp"
                  src={money}
                  sx={{ width: 24, height: 24 }}
                />
                </div> */}
                <span  style={{ color: 'rgb(167,0,0)' }} onClick = {handleLogin} >
                  <span style={{ cursor: 'pointer' }}>
                    Connect Wallet
            </span>
                </span>
                </>
              // <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            )}
          </li>

          <li >
            
             
            <span  style={{ color: 'rgb(167,0,0)' }} onClick = {openTransak} >
                <span style={{ cursor: 'pointer' }}>
                    Buy Crypto
                </span>
            </span>

          
          </li>
          <li>
            {localStorage.getItem("Address") ? (
              <span style={{ cursor: 'pointer' }} onClick={() => Logout()}>
                Logout
              </span>
            ) : (null)}
          </li>
        </ul>
        <NetworkErrorModal
          show={show}
          handleClose={handleClose}
          network={network}
        >
        </NetworkErrorModal>
        
      </nav>
    </header >
  );
}

export default HeaderHome;
