import React, { useEffect, useState } from "react";
import { useResolvedPath } from "react-router-dom";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import "../../../assets/plugins/fontawesome/css/all.min.css";
import "../../../assets/plugins/fontawesome/css/fontawesome.min.css";
import SettingDashboardDefault from "../Users/SettingsDashboardDefault";

function AdminSettings(props) {
  const path = useResolvedPath("").pathname;
  const [match] = useState({
    isExact: true,
    params: {},
    path: "/dashboard",
    url: "/dashboard",
  });
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
    profile: "active",
    offer: "",
  });

  const [updateProfile, setUpdateProfile] = useState("");
  return (
    <div className="main-wrapper">
      <div className="home-section home-full-height">
        <div className="content container-fluid">
          <SettingDashboardDefault
            user="admin"
            setActiveTab={setActiveTab}
            updateProfile={updateProfile}
            setUpdateProfile={setUpdateProfile}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;
