import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  createTheme,
  makeStyles,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { BlurLinear, ExpandMore } from "@material-ui/icons";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "react-h5-audio-player/lib/styles.css";
import NFTMediaCard from "../../../../components/Cards/AuctionNFTCards/NFTMediaCard";
import SingleNFTDetailCard from "../../../../components/Cards/SingleNFTDetailCard";
import PropertiesAccordian from "../../../../components/Accordian/PropertiesAccordian";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  badge: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },

  card: {
    minWidth: 250,
  },
  media1: {
    height: 300,
  },
  media: {
    width: "100%",
    paddingTop: "100%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const makeTheme = createTheme({
  overrides: {
    MuiAccordion: {
      root: {
        backgroundColor: "#000",
        border: "1px solid white",
        borderRadius: "0px",
      },
    },
    MuiSvgIcon: {
      root: {
        color: "white",
      },
    },
    MuiCard: {
      root: {
        backgroundColor: "#000",
        border: "1px solid #fff",
      },
    },
    MuiCardContent: {
      root: {
        color: "#fff",
      },
    },
  },
});

const SingleNftDetail = (props) => {
  const classes = useStyles();
  const { nftId } = useParams();
  const [nftDetail, setNftDetail] = useState({});
  const [keys, setKeys] = useState([]);
  const [properties, setProperties] = useState({});

  let getNftDetail = () => {

    axios.get(`/nft/getSingleNFT/${nftId}`).then(
      (response) => {
        setNftDetail(response.data.data[0]);
        setProperties(response.data.data[0].properties);
        const keys = Object.keys(response.data.data[0].properties);
        setKeys(keys);
      },
      (error) => {
        console.log("Error: ", error);
        console.log("Error response: ", error.response);
      }
    );
  };

  useEffect(() => {
    getNftDetail();
    props.setActiveTab({
      dashboard: "",
      newCollection: "",
      myCollections: "",
      newNFT: "",
      myNFTs: "active",
      marketplace: "",
      newDrop: "",
      myDrops: "",
      topUp: "",
    });
  }, []);

  return (
    <div className="backgroundDefault">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">NFT Details</h3>
            <ul className="breadcrumb">
              <Link to={`/dashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <Link to={`/dashboard/myNFTs`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  NFTs
                </li>
              </Link>
              <li className="breadcrumb-item active">NFT Details</li>
            </ul>
          </div>
        </div>
      </div>

      <ThemeProvider theme={makeTheme}>
        <div className="card-body p-0">
          <div className="row">
            <div className="col-md-12 col-lg-4">
              <NFTMediaCard nftDetail={nftDetail} classes={classes} />
            </div>
            <div className="col-md-12 col-lg-8">
              <SingleNFTDetailCard nftDetail={nftDetail} />
              <Row style={{ marginTop: "5px", marginBottom: "5px" }}>
                <Col>
                  <PropertiesAccordian 
                    keys={keys}
                    properties={properties}
                  />
                  
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default SingleNftDetail;
