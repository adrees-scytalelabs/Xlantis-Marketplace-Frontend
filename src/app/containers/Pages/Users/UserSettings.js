import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import Logo from "../../../assets/img/logo.png";
import patient from "../../../assets/img/patients/patient.jpg";
import "../../../assets/plugins/fontawesome/css/all.min.css";
import "../../../assets/plugins/fontawesome/css/fontawesome.min.css";
import HeaderHome from "../../../components/Headers/Header";
import UserCubeNFTs from "./UserProfile/UserCubeNFTs";
import UserCubes from "./UserProfile/UserCubes";
import UserExecutiveProducer from "./UserProfile/UserExecutiveProducer";
import UserFan from "./UserProfile/UserFan";
import UserImageArtist from "./UserProfile/UserImageArtist";
import UserMusicArtist from "./UserProfile/UserMusicArtist";
import UserNfts from "./UserProfile/UserNfts";
import UserProducer from "./UserProfile/UserProducer";
import UserProfile from "./UserProfile/UserProfile";
import UserProfileSidebar from "./UserProfile/UserProfileSidebar";
import SettingsSidebar from "./SettingsSidebar";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import SettingDashboardDefault from "./SettingsDashboardDefault";


function UserSettings(props) {
   
    let { path } = useRouteMatch();

    let [activeTab, setActiveTab] = useState({
        profile: "active",
        offer: ""
        
      });
    console.log("hello");
    return(
        <div className="main-wrapper">
        <div className="home-section home-full-height">
            <HeaderHome  
                
            />
            <SettingsSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab} 
                
            />
        <div className="page-wrapper">
        <div className="content container-fluid">
          <Switch>
            <Route exact path={`${path}`}>
              <SettingDashboardDefault
                // match={props.match}
                setActiveTab={setActiveTab}
              />
            </Route>
            {/* <Route exact path={`${path}/myCubes`}>
              <MyCubes setActiveTab={setActiveTab} />
            </Route> */}
           
          </Switch>
        </div>
        </div>
        </div>
        </div>
    );

   
    
}

export default UserSettings;