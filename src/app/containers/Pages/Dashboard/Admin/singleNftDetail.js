
import { ThemeProvider, createTheme } from '@mui/material';
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "react-h5-audio-player/lib/styles.css";
import { Link, useParams } from "react-router-dom";
import { getSingleNFTDetail } from "../../../../components/API/AxiosInterceptor";
import PropertiesAccordian from "../../../../components/Accordian/PropertiesAccordian";
import NFTMediaCard from "../../../../components/Cards/AuctionNFTCards/NFTMediaCard";
import SingleNFTDetailCard from "../../../../components/Cards/SingleNFTDetailCard";

const styles = {
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
  },
  media: {
    width: "100%",
    paddingTop: "100%",
  },

}

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
  const { nftId } = useParams();
  const [nftDetail, setNftDetail] = useState({});
  const [keys, setKeys] = useState([]);
  const [properties, setProperties] = useState({});

  let getNftDetail = () => {
    getSingleNFTDetail(nftId)
      .then((response) => {
        setNftDetail(response.data.data[0]);
        setProperties(response.data.data[0].properties);
        const keys = Object.keys(response.data.data[0].properties);
        setKeys(keys);
      })
      .catch((error) => {
        console.log("Error: ", error);
        console.log("Error response: ", error.response);
      });
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
              <NFTMediaCard nftDetail={nftDetail} classes={styles} />
            </div>
            <div className="col-md-12 col-lg-8">
              <SingleNFTDetailCard nftDetail={nftDetail} />
              <Row style={{ marginTop: "5px", marginBottom: "5px" }}>
                <Col>
                  <PropertiesAccordian keys={keys} properties={properties} />
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
