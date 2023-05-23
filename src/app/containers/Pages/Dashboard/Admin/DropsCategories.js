import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WhiteSpinner from "../../../../components/Spinners/WhiteSpinner";
import MessageCard from "../../../../components/MessageCards/MessageCard";
import { Grid } from "@mui/material";
import MyCollectionsCard from "../../../../components/Cards/MyCollectionsCard";
import MetaRacers from "../../../../assets/img/MetaRacers.png";
import DigitalMembership from "../../../../assets/img/DigitalMemberShip.png";
import MysteryBox from "../../../../assets/img/XMANNA - Mystery Box.png";
import LandPlot from "../../../../assets/img/Capture.JPG";
import CategoriesCards from "../../../../components/Cards/CategoriesCards";

const useStyles = {
  root: {
    minWidth: 250,
    backgroundColor: "rgba(32,32,32,255)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cardHeight: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "100%",
  },
};

const DropsCategories = (props) => {
  const [categories, setCategories] = useState([
    { name: "META RACERS", value: "meta-racers", image: MetaRacers },
    {
      name: "DIGITAL MEMBERSHIPS",
      value: "digital-memberships",
      image: DigitalMembership,
    },
    { name: "MYSTERY BOXES", value: "mystery-boxes", image: MysteryBox },
    { name: "LAND PLOTS", value: "land-plots", image: LandPlot },
  ]);

  useEffect(() => {
    props.setActiveTab({
      dashboard: "",
      newCollection: "",
      myCollections: "",
      newNFT: "",
      myNFTs: "",
      marketplace: "",
      newDrop: "",
      myDrops: "",
      topUp: "",
      categories: "active",
    });
  }, []);

  return (
    <div className="backgroundDefault">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Categories</h3>
            <ul className="breadcrumb">
              <Link to={`/dashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Categories
                </li>
              </Link>
              <li className="breadcrumb-item active">Categories</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="card-body page-height">
        <div sx={useStyles.root}>
          <Grid container spacing={2} direction="row" justify="flex-start">
            {categories.map((i, index) => (
              <Grid
                item
                xs={12}
                sm={4}
                md={3}
                lg={2}
                direction="row"
                key={index}
              >
                <Link to={"/dashboard/dropsCategories/drops/" + i.value}>
                  <CategoriesCards i={i} />
                </Link>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default DropsCategories;
