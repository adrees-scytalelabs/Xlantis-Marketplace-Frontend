import React, { useState } from "react";
import { Route, Routes, useResolvedPath } from "react-router-dom";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import "../../../assets/plugins/fontawesome/css/all.min.css";
import "../../../assets/plugins/fontawesome/css/fontawesome.min.css";
import HeaderHome from "../../../components/Headers/NewHeader";
import UserSidebar from "../../Pages/Dashboard/User/UserSidebar";
import SettingDashboardDefault from "./SettingsDashboardDefault";


function UserSettings(props) {
  const path = useResolvedPath("").pathname;
  const [activeTab, setActiveTab] = useState({
    profile: "active",
    offer: ""

  });
  const [updateProfile, setUpdateProfile] = useState("");
  return (
    <div className="main-wrapper">
      <div className="home-section home-full-height">
        <HeaderHome
          selectedNav={""} role={null}
          updateProfile={updateProfile}
        />

        <UserSidebar
          match={path}
          activeTab={activeTab}
          setActiveTab={setActiveTab} />

        <div className="page-wrapper">
          <div className="content container-fluid">
            <Routes>
              <Route exact path={`/`} element={
                <SettingDashboardDefault
                  user="user"
                  setActiveTab={setActiveTab}
                  updateProfile={updateProfile}
                  setUpdateProfile={setUpdateProfile}
                />
              } />

            </Routes>
          </div>
        </div>
      </div>
    </div>
  );



}

export default UserSettings;
