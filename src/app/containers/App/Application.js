import Cookies from "js-cookie";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import { SnackbarProvider } from "notistack";
import React, { useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard";
import UserDashboard from "../Pages/Dashboard/UserDashboard";
import SuperAdminDashboard from "../Pages/Dashboard/SuperAdminDashboard";
import AuctionDrops from "../Pages/Users/AuctionDrops";
import CubeNFTs from "../Pages/Users/Drops/CubeNFTs";
import DropCubes from "../Pages/Users/Drops/DropCubes";
// import ExporterDashboard from "../Pages/Dashboard/ExporterDashboard";
// import ImporterDashboard from "../Pages/Dashboard/ImporterDashboard";
import EmailVerification from "../Pages/Users/EmailVerification";
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
import UserProfileScreen from "../Pages/Users/UserProfileScreen";
import UserSettings from "../Pages/Users/UserSettings";
import FixedPriceDropNFTs from "../Pages/Users/FixedPriceDropNFTs";
import CheckoutScreen from "../Pages/Users/CheckoutScreen";
import UserLoginSignup from "../Pages/Users/UserProfile/UserLoginSignup";
import AdminLoginSignup from "../Pages/Users/AdminLoginSignup";
import AdminSSORedirect from "../Pages/Dashboard/Admin/AdminSSORedirect";
import UpdateRequestSent from "../Pages/Users/UserProfile/UpdateRequestSent";
import { AuthContextProvider } from "../../components/context/AuthContext";
import SuperAdminLogin from "../Pages/Users/UserProfile/SuperAdminLogin";


function App() {
  let isLoggedIn;
  let isVerified = false;
  let version;
  let jwtDecoded;
  let jwt = Cookies.get("Authorization");
  let checkLoginStatus = () => {
    // Cookies.remove("Authorization");
    console.log("verified? ", Cookies.get("Verified"))
    jwt && console.log("jwt in application: ", jwt);
    if (jwt) {
      console.log(jwtDecode(jwt));
      // setjwtDecoded(jwtDecode(jwt));
      jwtDecoded = jwtDecode(jwt);
      // jwtDecoded2 = jwtDecode(newJwt);
      console.log("jwtDecoded", jwtDecoded);
      isLoggedIn = true;
      isVerified = Cookies.get("Verified");
      version = Cookies.get("Version")
      console.log("isLoggedIn", isLoggedIn);
      console.log("isVerified", isVerified);
      // setIsLoggedIn(true);
    } else {
      // setIsLoggedIn(false);
      isLoggedIn = false;
    }
  };

  useEffect(() => {
    checkLoginStatus(); // eslint-disable-next-line
  }, []);

  const PrivateRoute = ({ path, ...rest }) => {
    // checkLoginStatus();
    if (jwtDecoded && isLoggedIn) {
      if (jwtDecoded.role === "admin") {
        return (
          <Route
            {...rest}
            render={(props) =>
              (version === "v1-sso") ? (
              (isLoggedIn && isVerified)  ? (
                <AdminDashboard {...props} jwtDecoded={jwtDecoded} />
              ) : (
                <Redirect to="/" />
              )
              ) : (
                (isLoggedIn)  ? (
                  <AdminDashboard {...props} jwtDecoded={jwtDecoded} />
                ) : (
                  <Redirect to="/" />
                )
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
    if (jwtDecoded && isLoggedIn && version === "v1-sso" && isVerified && jwtDecoded.role === "admin") {
      // if (cookies.Verified && cookies.InfoAdded) {
      console.log("herer!! ", jwtDecoded.role);
      return <Redirect to="/dashboard" />;
     }else if (jwtDecoded && isLoggedIn && version === "v2-wallet-login" && jwtDecoded.role === "admin") {
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
    } else if (path === "/fixdropnft") {
      return <Route component={FixedPriceDropNFTs} />;
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
            <LoginRegisterRedirectCheck exact path="/fixdropnft" />
            <LoginRegisterRedirectCheck exact path="/marketPlace" />
            <LoginRegisterRedirectCheck exact path="/admin-login" />
            <LoginRegisterRedirectCheck exact path="/user-account" />
            <LoginRegisterRedirectCheck exact path="/super-admin-account" />
            <LoginRegisterRedirectCheck exact path="/admin-account" />
            <LoginRegisterRedirectCheck exact path="/login" />
            <LoginRegisterRedirectCheck exact path="/checkout" />
            <LoginRegisterRedirectCheck exact path="/admin-signup-details" />
            <LoginRegisterRedirectCheck exact path="/updatRequestSent" />
            {/* <LoginRegisterRedirectCheck exact path="/" /> */}
            <LoginRegisterRedirectCheck exact path="/auctionDrops" />
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
            <PrivateRoute path="/user/settings">
              <UserSettings></UserSettings>
            </PrivateRoute>
          </Switch>
        </BrowserRouter>
      </SnackbarProvider>
    </AuthContextProvider>
  );
}

export default App;
