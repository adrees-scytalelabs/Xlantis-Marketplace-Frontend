import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import windowSize from "react-window-size";
import "../../../assets/css/bootstrap.min.css";
import "../../../assets/css/style.css";
import "../../../assets/plugins/fontawesome/css/all.min.css";
import "../../../assets/plugins/fontawesome/css/fontawesome.min.css";
import TermsAndConditionsCard from "../../../components/Cards/TermsAndConditionsCard";
import Footer from "../../../components/Footers/Footer";
import Header from "../../../components/Headers/Header";

const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function TermsAndConditions(props) {
  const classes = useStyles();

  return (
    <div className="account-page">
      <div className="main-wrapper">
        <div className="home-section home-full-height">
          <Header />
          <div
            className="content"
            style={{ paddingTop: "180px" }}
            position="absolute"
          >
            <div className="container-fluid">
              <div className="row">
                <TermsAndConditionsCard classes={classes} />
              </div>
            </div>
          </div>
        </div>
        <Footer position={"relative"} />
      </div>
    </div>
  );
}

export default windowSize(TermsAndConditions);
