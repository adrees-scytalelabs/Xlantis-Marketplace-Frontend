import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { SnackbarProvider } from "notistack";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard";
import SuperAdminDashboard from "../Pages/Dashboard/SuperAdminDashboard";
import UserDashboard from "../Pages/Dashboard/UserDashboard";
import AuctionDrops from "../Pages/Users/AuctionDrops";
import CubeNFTs from "../Pages/Users/Drops/CubeNFTs";
import DropCubes from "../Pages/Users/Drops/DropCubes";
import { AuthContextProvider } from "../../components/context/AuthContext";
import AdminSSORedirect from "../Pages/Dashboard/Admin/AdminSSORedirect";
import AdminSettings from "../Pages/Dashboard/AdminSettings";
import AdminLoginSignup from "../Pages/Users/AdminLoginSignup";
import CheckoutScreen from "../Pages/Users/CheckoutScreen";
import EmailVerification from "../Pages/Users/EmailVerification";
import FixedPriceDropNFTs from "../Pages/Users/FixedPriceDropNFTs";
import ForgotPassword from "../Pages/Users/ForgotPassword";
import HomeScreen from "../Pages/Users/HomeScreen";
import LoginScreen from "../Pages/Users/LoginScreen";
import MarketPlace from "../Pages/Users/MarketPlace";
import AuctionCubeNFTs from "../Pages/Users/MarketPlace/AuctionCubeNFT";
import SaleCubeNFTs from "../Pages/Users/MarketPlace/SaleCubeNFT";
import PrivacyPolicy from "../Pages/Users/PrivacyPolicy";
import RegisterScreen from "../Pages/Users/RegisterScreen";
import TermsAndConditions from "../Pages/Users/TermsAndConditions";
import UserLoginScreen from "../Pages/Users/UserLoginScreen";
import Failed from "../Pages/Users/UserProfile/Failed";
import FixedDropSingleNFTHome from "../Pages/Users/UserProfile/FixedDropSingleNFTHome";
import Success from "../Pages/Users/UserProfile/Success";
import SuperAdminLogin from "../Pages/Users/UserProfile/SuperAdminLogin";
import UpdateRequestSent from "../Pages/Users/UserProfile/UpdateRequestSent";
import UserLoginSignup from "../Pages/Users/UserProfile/UserLoginSignup";
import UserProfileScreen from "../Pages/Users/UserProfileScreen";
import UserSettings from "../Pages/Users/UserSettings";

function App() {
  const [reload, setReload] = useState();
  let isLoggedIn;
  let isVerified;
  let version;
  var jwtDecoded;
  let jwt = sessionStorage.getItem("Authorization");
  console.log("jwtjwt", jwt);
  if (jwt && jwt !== null) jwtDecoded = jwtDecode(jwt);
  let checkLoginStatus = () => {
    jwt !== null && console.log("jwt in application: ", jwt);
    if (jwtDecoded) {
      isLoggedIn = true;
      if (Cookies.get("Verified") === "true") {
        isVerified = true;
      } else if (Cookies.get("Verified") === "false") isVerified = false;
      version = Cookies.get("Version");
      console.log("isLoggedIn", isLoggedIn);
      console.log("isVerified", isVerified);
    } else {
      isLoggedIn = false;
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    checkLoginStatus(); // eslint-disable-next-line

    return () => {
      controller.abort();
    };
  }, [jwt]);

  jwt !== null && console.log("jwtDecoded", jwtDecoded.role);

  const PrivateRoute = ({ path, ...rest }) => {
    if (jwtDecoded && isLoggedIn) {
      if (jwtDecoded.role === "admin") {
        return (
          <Route
            {...rest}
            render={(props) =>
              version === "v1-sso" ? (
                isLoggedIn && isVerified ? (
                  <AdminDashboard {...props} jwtDecoded={jwtDecoded} />
                ) : (
                  <Redirect to="/" />
                )
              ) : version === "v2-wallet-login" ? (
                isLoggedIn && isVerified ? (
                  <AdminDashboard {...props} jwtDecoded={jwtDecoded} />
                ) : (
                  <Redirect to="/" />
                )
              ) : isLoggedIn ? (
                <AdminDashboard {...props} jwtDecoded={jwtDecoded} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
        );
      } else if (jwtDecoded.role === "super-admin") {
        return (
          <Route
            {...rest}
            render={(props) =>
              isLoggedIn ? (
                <SuperAdminDashboard {...props} jwtDecoded={jwtDecoded} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
        );
      } else if (jwtDecoded.role === "user") {
        return (
          <Route
            {...rest}
            render={(props) =>
              isLoggedIn ? (
                <UserDashboard {...props} jwtDecoded={jwtDecoded} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
        );
      }
    } else {
      return <Redirect to="/" />;
    }
  };

  const LoginRegisterRedirectCheck = ({ path, ...rest }) => {
    checkLoginStatus();
    if (
      jwtDecoded &&
      isLoggedIn &&
      version === "v1-sso" &&
      isVerified &&
      jwtDecoded.role === "admin"
    ) {
      // if (cookies.Verified && cookies.InfoAdded) {
      console.log("herer!! ", jwtDecoded.role);
      return <Redirect to="/dashboard" />;
    } else if (
      jwtDecoded &&
      isLoggedIn &&
      version === "v2-wallet-login" &&
      isVerified &&
      jwtDecoded.role === "admin"
    ) {
      // if (cookies.Verified && cookies.InfoAdded) {
      console.log("herer!! ", jwtDecoded.role);
      return <Redirect to="/dashboard" />;
    } else if (jwtDecoded && isLoggedIn && jwtDecoded.role === "super-admin") {
      return <Redirect to="/superAdminDashboard" />;
    } else if (path === "/admin-login") {
      return <Route component={LoginScreen} />;
    } else if (path === "/login") {
      return <Route component={UserLoginScreen} />;
    } else if (path === "/checkout") {
      return <Route component={CheckoutScreen} />;
    } else if (path === "/user-account") {
      return <Route component={UserLoginSignup} />;
    } else if (path === "/admin-account") {
      return <Route component={AdminLoginSignup} />;
    } else if (path === "/super-admin-account") {
      return <Route component={SuperAdminLogin} />;
    } else if (path === "/admin-signup-details") {
      return <Route component={AdminSSORedirect} />;
    } else if (path === "/updatRequestSent") {
      return <Route component={UpdateRequestSent} />;
    } else if (path === "/register") {
      return <Route component={RegisterScreen} />;
    } else if (path === "/marketPlace") {
      return <Route component={MarketPlace} />;
    } else if (path === "/auctionDrops") {
      return <Route component={AuctionDrops} />;
    } else if (path === "/fixedDropNFTHome") {
      return <Route component={FixedDropSingleNFTHome} />;
    } else if (path === "/usd_payment/success") {
      return <Route component={Success} />;
    } else if (path === "/usd_payment/failed") {
      return <Route component={Failed} />;
    } else if (path === "/auctionDrops/DropCubes/:dropId") {
      return (
        <Route
          exact
          path="/auctionDrops/DropCubes/:dropId"
          render={(routeProps) => <DropCubes {...routeProps} />}
        />
      );
    } else if (path === "/auctionDrops/DropCubes/Nfts/:dropId/:cubeId") {
      return (
        <Route
          exact
          path="/auctionDrops/DropCubes/Nfts/:dropId/:cubeId"
          component={CubeNFTs}
        />
      );
    } else if (
      path === "/marketPlace/Cubes/Nfts/notdrop/:expiresAt/:cubeId/:auctionId"
    ) {
      return (
        <Route
          exact
          path="/marketPlace/Cubes/Nfts/notdrop/:expiresAt/:cubeId/:auctionId"
          component={SaleCubeNFTs}
        />
      );
    } else if (
      path === "/marketPlace/Cubes/Nfts/userauction/:cubeId/:auctionId"
    ) {
      return (
        <Route
          exact
          path="/marketPlace/Cubes/Nfts/userauction/:cubeId/:auctionId"
          component={AuctionCubeNFTs}
        />
      );
    } else if (path === "/fixdropnft/:dropId") {
      return (
        <Route
          exact
          path="/fixdropnft/:dropId"
          component={FixedPriceDropNFTs}
        />
      );
    } else if (path === "/fixedDropNFTHome/:singleNFTid") {
      return (
        <Route
          exact
          path="/fixedDropNFTHome/:singleNFTid"
          component={FixedDropSingleNFTHome}
        />
      );
    } else {
      return <Route component={HomeScreen} />;
    }
  };

  return (
    <AuthContextProvider>
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          <Switch>
            <LoginRegisterRedirectCheck exact path="/" />
            {/* <LoginRegisterRedirectCheck exact path="/login" /> */}
            <LoginRegisterRedirectCheck exact path="/register" />
            <LoginRegisterRedirectCheck exact path="/marketPlace" />
            <LoginRegisterRedirectCheck exact path="/admin-login" />
            <LoginRegisterRedirectCheck exact path="/user-account" />
            <LoginRegisterRedirectCheck exact path="/super-admin-account" />
            <LoginRegisterRedirectCheck exact path="/admin-account" />
            <LoginRegisterRedirectCheck exact path="/login" />
            <LoginRegisterRedirectCheck exact path="/checkout" />
            <LoginRegisterRedirectCheck exact path="/admin-signup-details" />
            <LoginRegisterRedirectCheck exact path="/updatRequestSent" />
            <LoginRegisterRedirectCheck exact path="/usd_payment/success" />
            <LoginRegisterRedirectCheck exact path="/usd_payment/failed" />
            {/* <LoginRegisterRedirectCheck exact path="/" /> */}
            <LoginRegisterRedirectCheck exact path="/auctionDrops" />
            <LoginRegisterRedirectCheck
              exact
              path="/fixedDropNFTHome/:singleNFTid"
            />
            <LoginRegisterRedirectCheck exact path="/fixedDropNFTHome" />
            <LoginRegisterRedirectCheck exact path="/test" />
            <LoginRegisterRedirectCheck
              exact
              path="/fixdropnft/:dropId"
              component={FixedPriceDropNFTs}
            />
            <LoginRegisterRedirectCheck
              exact
              path="/auctionDrops/DropCubes/:dropId"
              component={DropCubes}
            />
            <LoginRegisterRedirectCheck
              exact
              path="/auctionDrops/DropCubes/Nfts/:dropId/:cubeId"
              component={CubeNFTs}
            />
            <LoginRegisterRedirectCheck
              exact
              path="/marketPlace/Cubes/Nfts/notdrop/:expiresAt/:cubeId/:auctionId"
              component={SaleCubeNFTs}
            />
            <LoginRegisterRedirectCheck
              exact
              path="/marketPlace/Cubes/Nfts/userauction/:cubeId/:auctionId"
              component={AuctionCubeNFTs}
            />

            <Route path="/forgotpassword" component={ForgotPassword} />
            <Route
              path="/users/emailverification/:email/:token"
              render={(routeProps) => <EmailVerification {...routeProps} />}
            />
            {/* <Route exact path="/admin-login"component={LoginScreen} /> */}
            <Route path="/termsandconditions" component={TermsAndConditions} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />

            <Route
              exact
              path="/User/Profile/Detail/:userRole/:userId/:cubeId"
              render={(routeProps) => <UserProfileScreen {...routeProps} />}
            />
            {/* <Route path="/user/settings" >
            <UserSettings></UserSettings>
          </Route> */}

            <PrivateRoute path="/dashboard" />
            <PrivateRoute path="/superAdminDashboard" />
            {/* <PrivateRoute path="/admin/settings" /> */}
            <Route
              exact
              path="/user/settings"
              render={(routeProps) =>
                isLoggedIn && jwtDecoded.role === "user" ? (
                  <UserSettings {...routeProps} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              exact
              path="/admin/settings"
              render={(routeProps) =>
                isLoggedIn && jwtDecoded.role === "admin" ? (
                  <AdminSettings {...routeProps} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
          </Switch>
        </BrowserRouter>
      </SnackbarProvider>
    </AuthContextProvider>
  );
}

export default App;
