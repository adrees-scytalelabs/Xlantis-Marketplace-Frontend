import Cookies from "js-cookie";
import {
  disbaleAdminV1,
  disbaleAdminV2,
  enableAdminV1,
  enableAdminV2,
  getAdminsV1Paginated,
  getAdminsV2Paginated,
  getDisabledAdminsV1,
  getDisabledAdminsV2,
  getEnabledAdminsV1,
  getEnabledAdminsV2,
  getUnverifiedAdminsV1Paginated,
  getUnverifiedAdminsV2Paginated,
  getVerifiedAdminsV1Paginated,
  getVerifiedAdminsV2Paginated,
  verifyAdminV1,
  verifyAdminV2,
} from "../API/AxiosInterceptor";

const handleClose = (setShow) => setShow(false);
const handleShow = (setShow) => setShow(true);
export const handleModalOpen = (e, data, setShow, setModalData) => {
  e.preventDefault();
  handleShow(setShow);
  setModalData(data);
};
export const handleModalClose = (e, setShow) => {
  e.preventDefault();
  handleClose(setShow);
};
const handleCloseBackdrop = (setOpen) => {
  setOpen(false);
};
const handleShowBackdrop = (setOpen) => {
  setOpen(true);
};
export let getUnverifiedAdminsSSO = (
  start,
  end,
  setOpen,
  setAdmins,
  setAdminCount
) => {
  setOpen(true);
  getUnverifiedAdminsV1Paginated(start, end)
    .then((response) => {
      setAdmins(response.data.unverifiedAdmins);
      setAdminCount(response.data.unverifiedAdmins.length);
      setOpen(false);
    })
    .catch((error) => {
      console.log(error.response.data);
      if (error.response.data !== undefined) {
        if (error.response.data === "Unauthorized access (invalid token) !!") {
          sessionStorage.removeItem("Authorization");
          sessionStorage.removeItem("Address");
          window.location.reload(false);
        }
      }
      setOpen(false);
    });
};
export let getUnverifiedAdminsWallet = (
  start,
  end,
  setOpen,
  setWalletAdmins,
  setAdminCount
) => {
  setOpen(true);
  getUnverifiedAdminsV2Paginated(start, end)
    .then((response) => {
      setWalletAdmins(response.data.unverifiedAdmins);
      setAdminCount(response.data.unverifiedAdmins.length);
      setOpen(false);
    })
    .catch((error) => {
      console.log(error.response.data);
      if (error.response.data !== undefined) {
        if (error.response.data === "Unauthorized access (invalid token) !!") {
          sessionStorage.removeItem("Authorization");
          sessionStorage.removeItem("Address");
          window.location.reload(false);
        }
      }
      setOpen(false);
    });
};
export let handleVerify = (
  e,
  verifyAdminId,
  setOpen,
  setAdmins,
  setAdminCount,
  rowsPerPage,
  setVariant,
  setLoad,
  setNotificationData
) => {
  e.preventDefault();
  handleShowBackdrop(setOpen);
  let data = {
    adminId: verifyAdminId,
  };

  verifyAdminV1(data)
    .then((response) => {
      handleCloseBackdrop(setOpen);
      getUnverifiedAdminsSSO(0, rowsPerPage, setOpen, setAdmins, setAdminCount);
      setVariant("success");
      setNotificationData("Admin Verified Successfully.");
      setLoad(true);
    })
    .catch((error) => {
      console.log("Error on verify: ", error);
      console.log("Error on verify: ", error.response);
      handleCloseBackdrop(setOpen);
      setVariant("error");
      setNotificationData("Unable to Verify Admin.");
      setLoad(true);
    });
};

export let handleVerifyWallet = (
  e,
  verifyAdminId,
  setOpen,
  setWalletAdmins,
  setAdminCount,
  rowsPerPage,
  setVariant,
  setLoad,
  setNotificationData
) => {
  e.preventDefault();
  handleShowBackdrop(setOpen);
  let data = {
    adminId: verifyAdminId,
  };

  verifyAdminV2(data)
    .then((response) => {
      handleCloseBackdrop(setOpen);
      getUnverifiedAdminsWallet(
        0,
        rowsPerPage,
        setOpen,
        setWalletAdmins,
        setAdminCount
      );
      setVariant("success");
      setNotificationData("Admin Verified Successfully.");
      setLoad(true);
    })
    .catch((error) => {
      console.log("Error on verify: ", error);
      console.log("Error on verify: ", error.response);
      handleCloseBackdrop(setOpen);
      setVariant("error");
      setNotificationData("Unable to Verify Admin.");
      setLoad(true);
    });
};
export let getVerifiedSSOAdmins = (
  start,
  end,
  setOpen,
  setAdmins,
  setAdminCount
) => {
  setOpen(true);
  getVerifiedAdminsV1Paginated(start, end)
    .then((response) => {
      setAdmins(response.data.verifiedAdmins);
      setAdminCount(response.data.verifiedAdmins.length);
      setOpen(false);
    })
    .catch((error) => {
      console.log(error.response.data);
      if (error.response.data !== undefined) {
        if (error.response.data === "Unauthorized access (invalid token) !!") {
          sessionStorage.removeItem("Authorization");
          sessionStorage.removeItem("Address");
          window.location.reload(false);
        }
      }
      setOpen(false);
    });
};
export let getVerifiedWalletAdmins = (
  start,
  end,
  setOpen,
  setWalletAdmins,
  setWalletAdminCount
) => {
  setOpen(true);
  getVerifiedAdminsV2Paginated(start, end)
    .then((response) => {
      setWalletAdmins(response.data.verifiedAdmins);
      setWalletAdminCount(response.data.verifiedAdmins.length);
      setOpen(false);
    })
    .catch((error) => {
      console.log(error.response);
      if (error.response.data !== undefined) {
        if (error.response.data === "Unauthorized access (invalid token) !!") {
          sessionStorage.removeItem("Authorization");
          sessionStorage.removeItem("Address");
          window.location.reload(false);
        }
      }
      setOpen(false);
    });
};

export let getSSOAdmins = (start, end, setOpen, setAdmins, setAdminCount) => {
  setOpen(true);
  getAdminsV1Paginated(start, end)
    .then((response) => {
      setAdmins(response.data.Admins);
      setAdminCount(response.data.Admins.length);
      setOpen(false);
    })
    .catch((error) => {
      console.log(error.response.data);
      if (error.response.data !== undefined) {
        if (error.response.data === "Unauthorized access (invalid token) !!") {
          sessionStorage.removeItem("Authorization");
          sessionStorage.removeItem("Address");
          window.location.reload(false);
        }
      }
      setOpen(false);
    });
};
export let getWalletAdmins = (
  start,
  end,
  setOpen,
  setWalletAdmins,
  setWalletAdminCount
) => {
  setOpen(true);
  getAdminsV2Paginated(start, end)
    .then((response) => {
      setWalletAdmins(response.data.Admins);
      setWalletAdminCount(response.data.Admins.length);
      setOpen(false);
    })
    .catch((error) => {
      console.log(error.response.data);
      if (error.response.data !== undefined) {
        if (error.response.data === "Unauthorized access (invalid token) !!") {
          sessionStorage.removeItem("Authorization");
          sessionStorage.removeItem("Address");
          window.location.reload(false);
        }
      }
      setOpen(false);
    });
};

export let getEnabledSSOAdmins = (setOpen, setAdmins, setAdminCount) => {
  setOpen(true);
  getEnabledAdminsV1()
    .then((response) => {
      setAdmins(response.data.admins);
      setAdminCount(response.data.admins.length);
      setOpen(false);
    })
    .catch((error) => {
      console.log(error.response.data);
      if (error.response.data !== undefined) {
        if (error.response.data === "Unauthorized access (invalid token) !!") {
          sessionStorage.removeItem("Authorization");
          sessionStorage.removeItem("Address");
          Cookies.remove("Version");

          window.location.reload(false);
        }
      }
      setOpen(false);
    });
};
export let getEnabledWalletAdmins = (
  setOpen,
  setWalletAdmins,
  setWalletAdminCount
) => {
  setOpen(true);
  getEnabledAdminsV2()
    .then((response) => {
      setWalletAdmins(response.data.admins);
      setWalletAdminCount(response.data.admins.length);
      setOpen(false);
    })
    .catch((error) => {
      console.log(error.response.data);
      if (error.response.data !== undefined) {
        if (error.response.data === "Unauthorized access (invalid token) !!") {
          sessionStorage.removeItem("Authorization");
          sessionStorage.removeItem("Address");
          Cookies.remove("Version");

          window.location.reload(false);
        }
      }
      setOpen(false);
    });
};

export let handleSSODisable = (
  e,
  verifyAdminId,
  setOpen,
  setAdmins,
  setAdminCount,
  setVariant,
  setLoad,
  setNotificationData
) => {
  e.preventDefault();
  handleShowBackdrop(setOpen);
  let data = {
    adminId: verifyAdminId,
  };

  disbaleAdminV1(data)
    .then((response) => {
      handleCloseBackdrop(setOpen);
      getEnabledSSOAdmins(setOpen, setAdmins, setAdminCount);
      setVariant("success");
      setNotificationData("Admin Disabled Successfully.");
      setLoad(true);
    })
    .catch((error) => {
      console.log("Error on disable: ", error);
      console.log("Error on disable: ", error.response);
      handleCloseBackdrop(setOpen);
      setVariant("error");
      setNotificationData("Unable to Disable Admin.");
      setLoad(true);
    });
};
export let handleWalletDisable = (
  e,
  verifyAdminId,
  setOpen,
  setWalletAdmins,
  setWalletAdminCount,
  setVariant,
  setLoad,
  setNotificationData
) => {
  e.preventDefault();
  handleShowBackdrop(setOpen);
  let data = {
    adminId: verifyAdminId,
  };

  disbaleAdminV2(data)
    .then((response) => {
      handleCloseBackdrop(setOpen);
      getEnabledWalletAdmins(setOpen, setWalletAdmins, setWalletAdminCount);
      setVariant("success");
      setNotificationData("Admin Disabled Successfully.");
      setLoad(true);
    })
    .catch((error) => {
      console.log("Error on disable: ", error);
      console.log("Error on disable: ", error.response);
      handleCloseBackdrop(setOpen);
      setVariant("error");
      setNotificationData("Unable to Enable Admin.");
      setLoad(true);
    });
};

export let getDisableSSOAdmins = (setOpen, setAdmins, setAdminCount) => {
  setOpen(true);
  getDisabledAdminsV1()
    .then((response) => {
      setAdmins(response.data.admins);
      setAdminCount(response.data.admins.length);
      setOpen(false);
    })
    .catch((error) => {
      console.log(error.response.data);
      if (error.response.data !== undefined) {
        if (error.response.data === "Unauthorized access (invalid token) !!") {
          sessionStorage.removeItem("Authorization");
          sessionStorage.removeItem("Address");
          Cookies.remove("Version");

          window.location.reload(false);
        }
      }
      setOpen(false);
    });
};

export let getDisableWalletAdmins = (
  setOpen,
  setWalletAdmins,
  setWalletAdminCount
) => {
  setOpen(true);
  getDisabledAdminsV2()
    .then((response) => {
      setWalletAdmins(response.data.admins);
      setWalletAdminCount(response.data.admins.length);
      setOpen(false);
    })
    .catch((error) => {
      console.log(error.response.data);
      if (error.response.data !== undefined) {
        if (error.response.data === "Unauthorized access (invalid token) !!") {
          sessionStorage.removeItem("Authorization");
          sessionStorage.removeItem("Address");
          window.location.reload(false);
        }
      }
      setOpen(false);
    });
};
export let handleEnableSSO = (
  e,
  verifyAdminId,
  setOpen,
  setAdmins,
  setAdminCount,
  setVariant,
  setLoad,
  setNotificationData
) => {
  e.preventDefault();
  handleShowBackdrop(setOpen);
  let data = {
    adminId: verifyAdminId,
  };

  enableAdminV1(data)
    .then((response) => {
      handleCloseBackdrop(setOpen);
      getDisableSSOAdmins(setOpen, setAdmins, setAdminCount);
      setVariant("success");
      setNotificationData("Admin Enabled Successfully.");
      setLoad(true);
    })
    .catch((error) => {
      console.log("Error during enable: ", error);
      console.log("Error response: ", error.response);
      handleCloseBackdrop(setOpen);
      setVariant("error");
      setNotificationData("Unable to Enabled Admin.");
      setLoad(true);
    });
};
export let handleEnableWallet = (
  e,
  verifyAdminId,
  setOpen,
  setWalletAdmins,
  setWalletAdminCount,
  setVariant,
  setLoad,
  setNotificationData
) => {
  e.preventDefault();
  handleShowBackdrop(setOpen);
  let data = {
    adminId: verifyAdminId,
  };

  enableAdminV2(data)
    .then((response) => {
      handleCloseBackdrop(setOpen);
      getDisableWalletAdmins(setOpen, setWalletAdmins, setWalletAdminCount);
      setVariant("success");
      setNotificationData("Admin Enabled Successfully.");
      setLoad(true);
    })
    .catch((error) => {
      console.log("Error: ", error);
      console.log("Error response: ", error.response);
      handleCloseBackdrop(setOpen);
      setVariant("error");
      setNotificationData("Unable to Enabled Admin.");
      setLoad(true);
    });
};
