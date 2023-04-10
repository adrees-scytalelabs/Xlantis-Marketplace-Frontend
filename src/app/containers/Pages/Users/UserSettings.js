import React, { useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import "../../../assets/plugins/fontawesome/css/all.min.css";
import "../../../assets/plugins/fontawesome/css/fontawesome.min.css";
import HeaderHome from "../../../components/Headers/Header";
import UserSidebar from "../../Pages/Dashboard/User/UserSidebar";
import SettingDashboardDefault from "./SettingsDashboardDefault";


function UserSettings(props) {
  let { path } = useRouteMatch();
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
          match={props.match}
          activeTab={activeTab}
          setActiveTab={setActiveTab} />

        <div className="page-wrapper">
          <div className="content container-fluid">
            <Switch>
              <Route exact path={`${path}`}>
                <SettingDashboardDefault
                  user="user"
                  setActiveTab={setActiveTab}
                  updateProfile={updateProfile}
                  setUpdateProfile={setUpdateProfile}
                />
              </Route>

            </Switch>
          </div>
        </div>
      </div>
    </div>
  );



}

export default UserSettings;
