import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { BlurLinear, ExpandMore } from "@material-ui/icons";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { GLTFModel, AmbientLight, DirectionLight } from "react-3d-viewer";
import AudioPlayer from "react-h5-audio-player";

import "react-h5-audio-player/lib/styles.css";

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
    paddingTop: "100%", // 16:9
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

const makeTheme = createMuiTheme({
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
  const [open, setOpen] = useState(false);
  const [nftDetail, setNftDetail] = useState({});
  const [keys, setKeys] = useState([]);
  const [properties, setProperties] = useState({});

  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };

  let getNftDetail = () => {
    const version = Cookies.get("Version");
    // handleShowBackdrop();
    axios.get(`/nft/getSingleNFT/${nftId}`).then(
      (response) => {
        console.log("Response: ", response);
        setNftDetail(response.data.data[0]);
        setProperties(response.data.data[0].properties);
        const keys = Object.keys(response.data.data[0].properties);
        console.log("Keys: ", keys);
        setKeys(keys);
      },
      (error) => {
        console.log("Error: ", error);
        console.log("Error response: ", error.response);
      }
    );
    // .catch((error) => {
    //     console.log("Error: ", error.response.data);
    // })
  };

  useEffect(() => {
    getNftDetail();
    props.setActiveTab({
      dashboard: "",
      totalUserAccount: "",
      pendingUserAccount: "",
      newCube: "",
      myNFTs: "active",
      newCollection: "",
      mySeason: "",
      tradeListOrders: "",
      myDrops: "",
      myCubes: "",
      referralEarnings: "",
      disputedOrders: "",
      resolvedDisputedOrders: "",
      settings: "",
      changePassword: "",
      newRandomDrop: "",
    }); // eslint-disable-next-line
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
              <li className="breadcrumb-item slash" style={{ color: "#777" }}>NFTs</li>
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
              <Card className={classes.root}>
                {/* <CardMedia
                                className={classes.media}
                                title="NFT Artwork"
                                image={nftDetail.nftURI}
                            >

                            </CardMedia> */}
                <div>
                  {nftDetail.nftFormat === "glb" ||
                  nftDetail.nftFormat === "gltf" ? (
                    <div>
                      <div>
                        <GLTFModel
                          src={nftDetail.nftURI}
                          width={250}
                          height={250}
                        >
                          <AmbientLight color={0xffffff} />
                          <AmbientLight color={0xffffff} />
                          <AmbientLight color={0xffffff} />
                          <AmbientLight color={0xffffff} />
                          {/* <AmbientLight color={0xffffff} />
                                                <AmbientLight color={0xffffff} />
                                                <AmbientLight color={0xffffff} /> */}
                          <DirectionLight
                            color={0xffffff}
                            position={{ x: 100, y: 200, z: 100 }}
                          />
                          <DirectionLight
                            color={0xffffff}
                            position={{ x: 50, y: 200, z: 100 }}
                          />
                          <DirectionLight
                            color={0xffffff}
                            position={{ x: 0, y: 0, z: 0 }}
                          />
                          <DirectionLight
                            color={0xffffff}
                            position={{ x: 0, y: 100, z: 200 }}
                          />
                          <DirectionLight
                            color={0xffffff}
                            position={{ x: -100, y: 200, z: -100 }}
                          />
                        </GLTFModel>
                      </div>
                      <div>
                        <CardMedia
                          className={classes.media}
                          title="NFT Artwork"
                          image={nftDetail.previewImageURI}
                        ></CardMedia>
                      </div>
                    </div>
                  ) : nftDetail.nftFormat === "mp3" ? (
                    <div>
                      <CardMedia
                        className={classes.media}
                        title="NFT Artwork"
                        image={
                          nftDetail.previewImageURI
                            ? nftDetail.previewImageURI
                            : nftDetail.nftURI
                        }
                      ></CardMedia>
                      <div>
                        <AudioPlayer
                          // style={{ width: "300px" }}
                          style={{ borderRadius: "1rem" }}
                          autoPlay={false}
                          layout="horizontal"
                          src={nftDetail.nftURI}
                          onPlay={(e) => console.log("onPlay")}
                          showSkipControls={false}
                          showJumpControls={false}
                          // header={`Now playing: ${name}`}
                          showDownloadProgress
                          // onClickPrevious={handleClickPrevious}
                          // onClickNext={handleClickNext}
                          // onEnded={handleClickNext}
                          // other props here
                        />
                      </div>
                    </div>
                  ) : (
                    <CardMedia
                      className={classes.media}
                      title="NFT Artwork"
                      image={nftDetail.nftURI}
                    ></CardMedia>
                  )}
                </div>
              </Card>
            </div>
            <div className="col-md-12 col-lg-8">
              <Card>
                <CardContent>
                  <Row>
                    <Col>
                      <Typography
                        variant="body1"
                        component="p"
                        style={{ color: "#fff", fontFamily: "orbitron" }}
                      >
                        <strong>NFT Title </strong>
                      </Typography>
                    </Col>
                    <Col>{nftDetail.title}</Col>
                  </Row>
                  <Row>
                    <Col>
                      <Typography
                        variant="body1"
                        component="p"
                        style={{ color: "#fff", fontFamily: "orbitron" }}
                      >
                        <strong>NFT Description </strong>
                      </Typography>
                    </Col>
                    <Col>{nftDetail.description}</Col>
                  </Row>
                  {/* <Row>
                                    <Col>
                                        <Typography variant="body1" component="p" style={{color: '#a70000'}}>
                                            <strong>Rarity </strong>
                                        </Typography>
                                    </Col>
                                    <Col>
                                        {nftDetail.type}
                                    </Col>
                                </Row> */}
                  {/* <Row>
                                    <Col>
                                        <Typography variant="body1" component="p" style={{color: '#a70000'}}>
                                            <strong>Supply Type </strong>
                                        </Typography>
                                    </Col>
                                    <Col>
                                        {nftDetail.supplyType}
                                    </Col>
                                </Row> */}
                  <Row>
                    <Col>
                      <Typography
                        variant="body1"
                        component="p"
                        style={{ color: "#fff", fontFamily: "orbitron" }}
                      >
                        <strong>Token Supply </strong>
                      </Typography>
                    </Col>
                    <Col>{nftDetail.tokenSupply}</Col>
                  </Row>
                </CardContent>
              </Card>
              <Row style={{ marginTop: "5px", marginBottom: "5px" }}>
                <Col>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography
                        variant="body1"
                        style={{ color: "#fff", fontFamily: "orbitron" }}
                      >
                        <BlurLinear />
                        <strong> Properties</strong>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Key</th>
                            <th>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {keys?.map((j, index) => (
                            <tr key={index}>
                              <td>{j}</td>
                              <td>{properties[j]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </AccordionDetails>
                  </Accordion>
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
