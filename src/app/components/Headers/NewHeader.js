import "@fontsource/jost";
import MoreIcon from '@mui/icons-material/MoreVert';
import { Paper } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import transakSDK from "@transak/transak-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";
import axios from 'axios';
import { ethers } from "ethers";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";
import WalletLink from "walletlink";
import Web3 from "web3";
import Web3Modal from "web3modal";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import Logo from "../../assets/img/BlockLogo.png";
import { getHeaderNotification } from "../../redux/getHeaderNotificationSlice";
import { getUserProfile } from "../../redux/getUserProfileSlice";
import CartModal from "../Modals/CartModal";
import NetworkErrorModal from "../Modals/NetworkErrorModal";
import SSOWalletModal from "../Modals/SSOWalletModal";
import WorkInProgressModal from "../Modals/WorkInProgressModal";
import NotificationSnackbar from "../Snackbar/NotificationSnackbar";
import { Spinner } from "react-bootstrap";



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(2, 0, 2, 1),
    fontWeight: 1000, fontFamily: "Jost",
    fontSize: "25px",
    transition: theme.transitions.create('width'),
    height: '9px',
    '&::placeholder': {
      // color: 'rgba(54,54,54,255)',
      // textShadow: "-1px 0 rgba(54,54,54,255), 0 1px rgba(54,54,54,255), 1px 0 rgba(54,54,54,255), 0 -1px rgba(54,54,54,255)",
      letterSpacing: '2px',
      fontWeight: 1000, fontFamily: "Jost",
      fontSize: "25px"
    },

    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  '& .MuiToolbar-gutters': {
    paddingLeft: 0,
    paddingRight: 0,
  },
}));
const StyledAppbar = styled(AppBar)(({ theme }) => ({
  '& .MuiToolbar-gutters': {
    paddingRight: 0,
  },
}));


export default function Header(props) {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [menuOpenedClass, setMenuOpenedClass] = useState();
  const [userSignOut] = useState(false);

  let navigate = useNavigate();
  const [modalOpen, setMOdalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [adminSignInData, setAdminSignInData] = useState(null);
  const [, setTokenVerification] = useState(true);
  const [profileImg, setProfileImg] = useState(
    "https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service.png"
  );
  let location = useLocation();
  const [userId, setUserId] = useState("");
  const [socket, setSocket] = useState(null);
  const [anchorElPopper, setAnchorElPopper] = React.useState(null);
  const openPopper = Boolean(anchorElPopper);
  const [notificationsList, setNotificationsList] = useState({});
  const [notificationCount, setNotificationCount] = useState(0);
  const [workProgressModalShow, setWorkProgressModalShow] = useState(false);
  const { userData, loading } = useSelector((store) => store.userProfile);
  const [open, setOpen] = useState(false);
  const { notification, notificationLoading } = useSelector(
    (store) => store.getHeaderNotification
  );
  const dispatch = useDispatch();


  useEffect(() => {
    setSocket(io("https://raindrop-backend.herokuapp.com/"));
  }, []);
  useEffect(() => {
    let userLogin = sessionStorage.getItem("Authorization");
    let userIdentity = sessionStorage.getItem("userId");
    if (userLogin != null) {
      setUserId(userIdentity);
      if (userId !== "" && socket !== null) {
        socket.emit("user-logged-in", userIdentity);
        socket.on("Notification", (notification) => {
          setNotificationsList((previousData) => [
            ...previousData,
            notification,
          ]);
        });
      } else if (userIdentity === "" && socket !== null) {
        socket.emit("user-logged-out", userIdentity);
      }
    }
  }, [socket, userId]);
  useEffect(() => {
    let userLogin = sessionStorage.getItem("Authorization");
    let userIdentity = sessionStorage.getItem("userId");
    if (userLogin != null) {
      setUserId(userIdentity);
      getNotifications(0, 10);
    }
  }, [notificationLoading]);

  useEffect(() => {
    getProfile();
  }, [loading]);

  useEffect(() => {
    if (adminSignInData !== null) {
      if (
        adminSignInData.isInfoAdded === true &&
        adminSignInData.isVerified === false
      ) {
        let variant = "info";
        setSnackbarMessage("Your request is under process. Waiting for approval by the Super Admin.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
      }
    }
  }, [adminSignInData]);
  const handleOpenModal = () => {
    setMOdalOpen(!modalOpen);
  };

  const handleCloseModal = () => {
    setMOdalOpen(false);
  };

  const handleOpenCart = () => {
    setCartOpen(!cartOpen);
  };
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const settings = {
    apiKey: "cf5868eb-a8bb-45c8-a2db-4309e5f8b412",
    environment: "STAGING",
    defaultCryptoCurrency: "ETH",
    themeColor: "000000",
    hostURL: window.location.origin,
    widgetHeight: "700px",
    widgetWidth: "500px",
  };

  const [isLoading, setIsLoading] = useState(false);

  const [network, setNetwork] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const providerOptions = {
    binancechainwallet: {
      package: true,
    },
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "2b677656bad14a3db4592ffdb69e7805",
      },
    },
    walletlink: {
      package: WalletLink,
      options: {
        appName: "RINKEBY API",
        infuraId: "2b677656bad14a3db4592ffdb69e7805",
        rpc: "",
        chainId: 5,
        appLogoUrl: null,
        darkMode: true,
      },
    },
  };

  const web3Modal = new Web3Modal({
    network: "private",
    theme: "dark",
    cacheProvider: true,
    providerOptions,
  });

  function openTransak() {
    const transak = new transakSDK(settings);

    transak.init();
    transak.on(transak.ALL_EVENTS, (data) => {
      console.log(data);
    });
    transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, (eventData) => {
      console.log(eventData);
      transak.close();
    });
    transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
      console.log(orderData);
      window.alert("Payment Success");
      transak.close();
    });
  }

  let loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  function getNotifications(start, end) {
    dispatch(getHeaderNotification({ start, end, setNotificationsList }));
    // setNotificationsList(notification);
    // setNotificationCount(notification.length);
  }

  function readNotification(notificationId) {
    let data = {
      notificationId,
    };

    axios.patch("/notifications/hide", data).then(
      (response) => {
        getNotifications(0, 10);
      },
      (error) => {
        console.log("Error on disable: ", error);
        console.log("Error on disable: ", error.response);
      }
    );
  }

  async function handleLogin() {
    await loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const network = await web3.eth.net.getNetworkType();

    if (network !== "private") {
      setNetwork(network);
      setIsLoading(false);
      handleShow();
    } else {
      let account = accounts[0];
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );

      console.log("In the starting");

      console.log("Provider: ", provider);

      await provider.send("eth_requestAccounts", []);
      let signer = provider.getSigner();
      console.log("account", account);
      const address = await signer.getAddress();
      const message = `Welcome to RobotDrop! \n\nClick to sign in and accept the RobotDrop Terms of Service: https://RobotDrop.io/tos \n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nYour authentication status will reset after 24 hours. \n\nWallet address: ${address}`;
      console.log("Address: ", await signer.getAddress());
      let signatureHash = await web3.eth.personal.sign(message, address);
      console.log("Signature hash ", signatureHash);
      let ethBalance = await web3.eth.getBalance(account);

      let loginData = {
        walletAddress: address,
        signature: signatureHash,
      };
      let route;
      if (props.role === "admin") {
        route = "v2-wallet-login/user/auth/admin-login";
      } else {
        route = "v2-wallet-login/user/auth/login";
      }

      console.log(route);
      axios.post(route, loginData).then(
        (response) => {
          console.log("response", response);
          if (props.role === "admin") {
            console.log("admin sett");
            console.log("admin data set");
            Cookies.set("Version", "v2-wallet-login", {});
            console.log("version set");
            Cookies.set("InfoAdded", response.data.isInfoAdded, {});
            Cookies.set("Verified", response.data.isVerified, {});
            sessionStorage.setItem(
              "Authorization",
              response.data.raindropToken,
              {}
            );
            if (
              response.data.isInfoAdded === true &&
              response.data.isVerified === true
            ) {
              sessionStorage.setItem("Address", accounts[0]);
              window.location.reload(false);
            }
            setAdminSignInData(response.data);
          } else {
            console.log("Running user", response.data);
            Cookies.set("Version", "v2-wallet-login", {});
            sessionStorage.setItem(
              "Authorization",
              response.data.raindropToken,
              {}
            );
            sessionStorage.setItem("Address", accounts[0]);
            setUserId(accounts[0]);
            window.location.reload();
          }
        },
        (error) => {
          if (process.env.NODE_ENV === "development") {
            console.log(error);
            console.log(error.response);
            if (error) setTokenVerification(false);
          }
        }
      );
    }

    setMOdalOpen(false);
  }

  function handleNotificationsIcon(event) {
    console.log("I was called");
    setAnchorElPopper(anchorElPopper ? null : event.currentTarget);
    console.log("event", event);
  }

  const selectedStyling = {
    border: "1px solid #F64D04",
    padding: "10px 20px",
    borderRadius: "0px 10px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#F64D04",
    cursor: "pointer",
  };
  const defaultStyling = {
    padding: "10px 20px",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
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

  let Logout = (e) => {
    sessionStorage.removeItem("Authorization");
    sessionStorage.removeItem("Address");
    Cookies.remove("InfoAdded");
    Cookies.remove("Verified");
    Cookies.remove("Version");
    sessionStorage.clear();
    setUserId("");
    navigate("/");
    window.location.reload(false);
  };

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
    navigate("/user/settings");
  }


  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  let jwtDecoded, jwt;
  if (props.role === null) {
    jwt = sessionStorage.getItem("Authorization");
    if (jwt !== null) {
      jwtDecoded = jwtDecode(jwt);
    }
  }

  let getProfile = () => {
    let userLogin = sessionStorage.getItem("Authorization");
    if (userLogin !== "undefined") {
      dispatch(getUserProfile());
      userData.imageURL && setProfileImg(userData.imageURL);
    }
  };


  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <p>Explore</p>

      </MenuItem>
      <MenuItem>
        <p>Login</p>

      </MenuItem>
      <MenuItem>
        <p>Menu</p>

      </MenuItem>
      <MenuItem>
        <Box >
          <Paper
            component="form"
            sx={{ display: { xs: 'none', md: 'block' }, maxWidth: '400', width: "auto", marginRight: '40px', border: '1px solid black', borderRadius: '25px', backgroundColor: "rgba(230,230,230,255)", p: '2px 4px', display: 'flex', alignItems: 'center', }}
          >
            <StyledInputBase
              placeholder="SEARCH"
              inputProps={{ 'aria-label': 'Search' }}
            />
          </Paper>
        </Box>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {adminSignInData !== null && adminSignInData.isInfoAdded === false && (
        <Navigate to="/admin-signup-details" />
      )}
      <StyledAppbar disableGutters position="static" sx={{ backgroundColor: '#ffffff' }}>
        <StyledToolbar sx={{}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <Link
              style={{ color: "#fff", width: "auto" }}
              to="/"
              className="navbar-brand logo pr-sm-2 mr-sm-4"
            >
              <img
                src={Logo}
                alt="Logo"
                style={{
                  width: "200px",
                  height: "31px",
                }}
              />
            </Link>
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ color: '#000', fontWeight: 1000, display: { xs: 'none', md: 'block' } }}
          >
            <Link to="/marketPlace" style={{ color: '#000'}}>

              EXPLORE
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box >
            <Paper
              component="form"
              sx={{ display: { xs: 'none', md: 'block' }, maxWidth: '400', width: "auto", marginRight: '40px', border: '1px solid black', borderRadius: '25px', backgroundColor: "rgba(230,230,230,255)", p: '2px 4px', alignItems: 'center', }}
            >
              <StyledInputBase
                placeholder="SEARCH"
                inputProps={{ 'aria-label': 'Search' }}
              />
            </Paper>
          </Box>


          <Box>
            {isLoading ? (
              <div className="text-center">
                <Spinner
                  animation="border"
                  role="status"
                  style={{ color: "#fff" }}
                >
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            ) : sessionStorage.getItem("Address") &&
              props.role === "admin" ? null : sessionStorage.getItem(
                "Address"
              ) ||
                (jwtDecoded !== undefined && jwtDecoded.role === "user") ? (
              <div
                className="header-profile-image"
                onClick={handleClick}
                style={{
                  backgroundImage: `url(${profileImg})`,
                  cursor: "pointer",
                }}
              ></div>
            ) : null}
          </Box>
          <Box
            className="btn-black" sx={{
              color: '#000',
              padding: '15px 30px 15px 50px',
              backgroundColor: 'rgba(0,255,255,255)',
              display: { xs: 'none', md: 'flex' }
            }}
          >
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{
                fontWeight: 1000, fontFamily: "Jost"
              }}

            >
              {(sessionStorage.getItem("Address") && props.role === "admin") ||
                sessionStorage.getItem("Address") ||
                (jwtDecoded !== undefined && jwtDecoded.role === "user") ? (
                <span
                  className="login-link"
                  onClick={Logout}
                >
                  <span
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    LOG OUT
                  </span>
                </span>
              ) : <span
                className="login-link"
                onClick={() => {
                  setMenuOpenedClass("");
                  handleOpenModal()
                }}
              >
                <span style={{
                  cursor: "pointer",
                }}>
                  LOG IN
                </span>
              </span>}
              {/* LOG IN */}
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon style={{ color: '#000' }} />
            </IconButton>
          </Box>
          {/* <div class="button-angular-wrapper-right button-angular-color-outline-white" href="">
            <div class="button-angular-main">
              <span class="cta-text tel-link-no">
                1800-1-5555
              </span>
            </div>
            <div class="button-angular-slant back-slash">
            </div>
          </div> */}
        </StyledToolbar>
      </StyledAppbar>
      {renderMobileMenu}
      {renderMenu}
      <SSOWalletModal
        handleClose={handleCloseModal}
        open={modalOpen}
        metamaskLogin={handleLogin}
        openWorkProgressModal={() => {
          setMOdalOpen(false);
          setWorkProgressModalShow(true);
        }}
      />
      <WorkInProgressModal
        show={workProgressModalShow}
        handleClose={() => setWorkProgressModalShow(false)}
      />
      <CartModal handleClose={handleOpenCart} open={cartOpen} />
      <NotificationSnackbar open={snackbarOpen} handleClose={handleSnackbarClose} severity={snackbarSeverity} message={snackbarMessage} />
      <NetworkErrorModal
        show={show}
        handleClose={handleClose}
        network={network}
      ></NetworkErrorModal>
    </Box>
  );
}
