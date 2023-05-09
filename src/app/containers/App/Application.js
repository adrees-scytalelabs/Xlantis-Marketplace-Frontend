import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { SnackbarProvider } from "notistack";
import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "../../components/context/AuthContext";
import Loading from "../Pages/Users/Loading";
const LazyAdminSSORedirect = React.lazy(() => import('../Pages/Dashboard/Admin/AdminSSORedirect'));
const LazyAdminDashboard = React.lazy(() => import('../Pages/Dashboard/AdminDashboard'));
const LazyAdminSettings = React.lazy(() => import('../Pages/Dashboard/AdminSettings'));
const LazySuperAdminDashboard = React.lazy(() => import('../Pages/Dashboard/SuperAdminDashboard'));
const LazyUserDashboard = React.lazy(() => import('../Pages/Dashboard/UserDashboard'));
const LazyAdminLoginSignup = React.lazy(() => import('../Pages/Users/AdminLoginSignup'));
const LazyAuctionDrops = React.lazy(() => import('../Pages/Users/AuctionDrops'));
const LazyCheckoutScreen = React.lazy(() => import('../Pages/Users/CheckoutScreen'));
const LazyEmailVerification = React.lazy(() => import('../Pages/Users/EmailVerification'));
const LazyFixedPriceDropNFTs = React.lazy(() => import('../Pages/Users/FixedPriceDropNFTs'));
const LazyHomeScreen = React.lazy(() => import('../Pages/Users/HomeScreen'));
const LazyMarketPlace = React.lazy(() => import('../Pages/Users/MarketPlace'));
const LazyPrivacyPolicy = React.lazy(() => import('../Pages/Users/PrivacyPolicy'));
const LazyTermsAndConditions = React.lazy(() => import('../Pages/Users/TermsAndConditions'));
const LazyFailed = React.lazy(() => import('../Pages/Users/UserProfile/Failed'));
const LazyFixedDropSingleNFTHome = React.lazy(() => import('../Pages/Users/UserProfile/FixedDropSingleNFTHome'));
const LazySuccess = React.lazy(() => import('../Pages/Users/UserProfile/Success'));
const LazySuperAdminLogin = React.lazy(() => import('../Pages/Users/UserProfile/SuperAdminLogin'));
const LazyUpdateRequestSent = React.lazy(() => import('../Pages/Users/UserProfile/UpdateRequestSent'));
const LazyUserLoginSignup = React.lazy(() => import('../Pages/Users/UserProfile/UserLoginSignup'));
const LazyUserSettings = React.lazy(() => import('../Pages/Users/UserSettings'));


const AdminSSORedirect = () => (
  <Suspense fallback={<Loading/>}>
      <LazyAdminSSORedirect/>
  </Suspense>
);
const AdminDashboard = () => (
  <Suspense fallback={<Loading/>}>
      <LazyAdminDashboard/>
  </Suspense>
);
const AdminSettings = () => (
  <Suspense fallback={<Loading/>}>
      <LazyAdminSettings/>
  </Suspense>
);
const SuperAdminDashboard = () => (
  <Suspense fallback={<Loading/>}>
      <LazySuperAdminDashboard/>
  </Suspense>
);
const UserDashboard = () => (
  <Suspense fallback={<Loading/>}>
      <LazyUserDashboard/>
  </Suspense>
);
const AdminLoginSignup = () => (
  <Suspense fallback={<Loading/>}>
      <LazyAdminLoginSignup/>
  </Suspense>
);
const AuctionDrops = () => (
  <Suspense fallback={<Loading/>}>
      <LazyAuctionDrops/>
  </Suspense>
);
const CheckoutScreen = () => (
  <Suspense fallback={<Loading/>}>
      <LazyCheckoutScreen/>
  </Suspense>
);
const EmailVerification = () => (
  <Suspense fallback={<Loading/>}>
      <LazyEmailVerification/>
  </Suspense>
);
const FixedPriceDropNFTs = () => (
  <Suspense fallback={<Loading/>}>
      <LazyFixedPriceDropNFTs/>
  </Suspense>
);
const HomeScreen = () => (
  <Suspense fallback={<Loading/>}>
      <LazyHomeScreen/>
  </Suspense>
);
const MarketPlace = () => (
  <Suspense fallback={<Loading/>}>
      <LazyMarketPlace/>
  </Suspense>
);
const PrivacyPolicy = () => (
  <Suspense fallback={<Loading/>}>
      <LazyPrivacyPolicy/>
  </Suspense>
);
const TermsAndConditions = () => (
  <Suspense fallback={<Loading/>}>
      <LazyTermsAndConditions/>
  </Suspense>
);
const Failed = () => (
  <Suspense fallback={<Loading/>}>
      <LazyFailed/>
  </Suspense>
);
const FixedDropSingleNFTHome = () => (
  <Suspense fallback={<Loading/>}>
      <LazyFixedDropSingleNFTHome/>
  </Suspense>
);
const Success = () => (
  <Suspense fallback={<Loading/>}>
      <LazySuccess/>
  </Suspense>
);
const SuperAdminLogin = () => (
  <Suspense fallback={<Loading/>}>
      <LazySuperAdminLogin/>
  </Suspense>
);
const UpdateRequestSent = () => (
  <Suspense fallback={<Loading/>}>
      <LazyUpdateRequestSent/>
  </Suspense>
);
const UserLoginSignup = () => (
  <Suspense fallback={<Loading/>}>
      <LazyUserLoginSignup/>
  </Suspense>
);
const UserSettings = () => (
  <Suspense fallback={<Loading/>}>
      <LazyUserSettings/>
  </Suspense>
);


function App() {
  let isLoggedIn;
  let isVerified;
  let version;
  var jwtDecoded;
  let jwt = sessionStorage.getItem("Authorization");
  if (jwt && jwt !== null) jwtDecoded = jwtDecode(jwt);
  let checkLoginStatus = () => {
    jwt !== null && console.log();
    if (jwtDecoded) {
      isLoggedIn = true;
      if (Cookies.get("Verified") === "true") {
        isVerified = true;
      } else if (Cookies.get("Verified") === "false") isVerified = false;
      version = Cookies.get("Version");
    } else {
      isLoggedIn = false;
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    checkLoginStatus();
    return () => {
      controller.abort();
    };
  }, [jwt]);

  useEffect(() => {
    const controller = new AbortController();
    checkLoginStatus();
    return () => {
      controller.abort();
    };
  }, []);

  jwt !== null && console.log();

  const PrivateRoute = ({ path, ...rest }) => {
    console.log("...rest", rest);
    console.log("jwtDecoded", jwtDecoded);
    checkLoginStatus();
    if (jwtDecoded && isLoggedIn) {
      if (jwtDecoded.role === "admin") {
        return (
          version === "v1-sso" ? (
            isLoggedIn && isVerified ? (
              <AdminDashboard jwtDecoded={jwtDecoded} />
            ) : (
              <Navigate to="/" />
            )
          ) : version === "v2-wallet-login" ? (
            isLoggedIn && isVerified ? (
              <AdminDashboard jwtDecoded={jwtDecoded} />
            ) : (
              <Navigate to="/" />
            )
          ) : isLoggedIn ? (
            <AdminDashboard jwtDecoded={jwtDecoded} />
          ) : (
            <Navigate to="/" />
          )
        );
      } else if (jwtDecoded.role === "super-admin") {
        return (
          isLoggedIn ? (
            <SuperAdminDashboard jwtDecoded={jwtDecoded} />
          ) : (
            <Navigate to="/" />
          )

        );
      } else if (jwtDecoded.role === "user") {
        return (
          isLoggedIn ? (
            <UserDashboard jwtDecoded={jwtDecoded} />
          ) : (
            <Navigate to="/" />
          )
        );
      }
    } else {
      return <Navigate to="/" />;
    }
  };

  const LoginRegisterRedirectCheck = ({ path, ...rest }) => {
    checkLoginStatus();
    return (
      jwtDecoded && isLoggedIn && jwtDecoded.role === "super-admin" ? (
        <Navigate to="/superAdminDashboard" />
      ) : version === "v1-sso" && jwtDecoded && isLoggedIn && isVerified && jwtDecoded.role === "admin" ||
        version === "v2-wallet-login" && jwtDecoded && isLoggedIn && isVerified && jwtDecoded.role === "admin" ? (
        <Navigate to="/dashboard" />
      ) : path === "/checkout" ? (
        <CheckoutScreen />
      ) : path === "/user-account" ? (
        <UserLoginSignup />
      ) : path === "/admin-account" ? (
        <AdminLoginSignup />
      ) : path === "/super-admin-account" ? (
        <SuperAdminLogin />
      ) : path === "/admin-signup-details" ? (
        <AdminSSORedirect />
      ) : path === "/updatRequestSent" ? (
        <UpdateRequestSent />
      ) : path === "/marketPlace" ? (
        <MarketPlace />
      ) : path === "/auctionDrops" ? (
        <AuctionDrops />
      ) : path === "/fixedDropNFTHome" ? (
        <FixedDropSingleNFTHome />
      ) : path === "/usd_payment/success" ? (
        <Success />
      ) : path === "/usd_payment/failed" ? (
        <Failed />
      ) : path === "/fixdropnft/:dropId" ? (
        <FixedPriceDropNFTs />
      ) : path === "/fixedDropNFTHome/:singleNFTid" ? (
        <FixedDropSingleNFTHome />
      ) : path === "/user/settings" && jwtDecoded && isLoggedIn && jwtDecoded.role === "user" ? (
        <UserSettings />
      ) : path === "/admin/settings" && jwtDecoded && isLoggedIn && jwtDecoded.role === "admin" ? (
        <AdminSettings />
      ) : (
        <HomeScreen />
      )
    );
  };


  return (
    <AuthContextProvider>
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<LoginRegisterRedirectCheck exact path="/" />} />
            <Route path="/marketPlace" element={<LoginRegisterRedirectCheck exact path="/marketPlace" />} />
            <Route path="/user-account" element={<LoginRegisterRedirectCheck exact path="/user-account" />} />
            <Route path="/super-admin-account" element={<LoginRegisterRedirectCheck exact path="/super-admin-account" />} />
            <Route path="/admin-account" element={<LoginRegisterRedirectCheck exact path="/admin-account" />} />
            <Route path="/checkout" element={<LoginRegisterRedirectCheck exact path="/checkout" />} />
            <Route path="/admin-signup-details" element={<LoginRegisterRedirectCheck exact path="/admin-signup-details" />} />
            <Route path="/updatRequestSent" element={<LoginRegisterRedirectCheck exact path="/updatRequestSent" />} />
            <Route path="/usd_payment/success" element={<LoginRegisterRedirectCheck exact path="/usd_payment/success" />} />
            <Route path="/usd_payment/failed" element={<LoginRegisterRedirectCheck exact path="/usd_payment/failed" />} />
            <Route path="/auctionDrops" element={<LoginRegisterRedirectCheck exact path="/auctionDrops" />} />
            <Route path="/fixedDropNFTHome/:singleNFTid" element={<LoginRegisterRedirectCheck exact path="/fixedDropNFTHome/:singleNFTid" />} />
            <Route path="/fixedDropNFTHome" element={<LoginRegisterRedirectCheck exact path="/fixedDropNFTHome" />} />
            <Route path="/fixdropnft/:dropId" element={<LoginRegisterRedirectCheck exact path="/fixdropnft/:dropId" />} />
            <Route path="/users/emailverification/:email/:token" element={<EmailVerification />} />
            <Route path="/termsandconditions" element={<TermsAndConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/dashboard/*" element={<PrivateRoute path="/dashboard/*" />} />
            <Route path="/superAdminDashboard/*" element={<PrivateRoute path="/superAdminDashboard/*" />} />
            <Route path="/user/settings" element={<LoginRegisterRedirectCheck exact path="/user/settings" />} />
            <Route path="/admin/settings" element={<LoginRegisterRedirectCheck exact path="/admin/settings" />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </AuthContextProvider>
  );
}

export default App;