// REACT
import React, { useEffect, useState } from "react";
// REACT ROUTER
import { useParams, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
// MUI
import {
  createMuiTheme,
  ThemeProvider,
  useTheme,
} from "@material-ui/core/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { BlurLinear, ExpandMore } from "@material-ui/icons";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Grid from "@material-ui/core/Grid";
import { Col, Row, Table } from "react-bootstrap";
// COMPONENTS
import HeaderHome from "../../../../components/Headers/Header";
import Web3 from "web3";
import WhiteSpinner from "../../../../components/Spinners/WhiteSpinner";

const useStyles = makeStyles((theme) => ({
  gridRoot: {
    flexGrow: 1,
    marginTop: "8px",
  },
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "black",
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
    height: 0,
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

const customTheme = createMuiTheme({
  overrides: {
    MuiAccordionSummary: {
      root: {
        borderBottom: "1px solid white",
        backgroundColor: "black",
      },
      // content: {
      //     borderBottom: "1px solid white",
      //     paddingBottom: "12px"
      // },
      expandIcon: {
        color: "white",
      },
    },
    MuiAccordionDetails: {
      root: {
        padding: "8px 0px 16px",
        backgroundColor: "black",
      },
    },
    MuiOutlinedInput: {
      input: {
        border: "1px solid white",
        color: "white",
        borderRadius: "5px",
        padding: "16px 14px",
      },
    },
    MuiCardContent: {
      root: {
        padding: "16px 0px",
      },
    },
    // MuiIconButton: {
    //     root: {
    //         padding: 0
    //     },
    //     label: {
    //         borderBottom: "1px solid white",
    //         padding: "12px",
    //     }
    // }
  },
});

// COMPONENT FUNCTION
const FixedDropSingleNFTHome = () => {
  // Sates
  const [nftData, setNftData] = useState();
  const [nftProperties, setNftProperties] = useState([]);
  const classes = useStyles();
  let history = useHistory();
  const location = useLocation();
  let dropID = location.state.id;

  // Variables
  const { singleNFTid } = useParams();
  console.log("NFT IDs from useLocation: ", singleNFTid);

  // Handlers
  const handleGoBack = () => {
    history.push(`/fixdropnft/${dropID}`);
  };

  const version = Cookies.get("Version");
  console.log("the version is ... ", version);

  const getDropDetails = () => {
    axios.get(`/${version}/drop/nft/${singleNFTid}`).then(
      (res) => {
        console.log("finding the price: ... ", res);
        setNftData(res.data.data[0]);
        setNftProperties(Object.entries(res.data.data[0].properties));
      },
      (err) => console.log("Drop could not be get: ", err.response)
    );
  };

  if (nftData !== undefined) {
    console.log("single nft data .. ", nftData);
    console.log("props.... ", nftProperties);
    console.log("go back ... ", dropID);
    // let priceCal = Web3.utils.fromWei(
    //   nftData.currentMarketplaceId.price,
    //   "ether"
    // );
    // console.log("into ether .. ", priceCal);
  }

  useEffect(() => {
    const controller = new AbortController();
    getDropDetails();

    return () => {
      controller.abort();
    };
  }, []);

  // jsx
  return (
    <>
      {/* Header */}
      <div style={{ minHeight: "95px" }}>
        <HeaderHome selectedNav={"Market"} />
      </div>
      <ThemeProvider theme={customTheme}>
        <div className="card-body">
          {nftData ? (
            <div className="row">
              <div className="col-md-12 col-lg-4">
                <Paper elevation={5}>
                  <Card className={classes.root}>
                    <div style={{ marginTop: "20px" }}>
                      <CardMedia
                        className={classes.media}
                        title={nftData?.title}
                        image={nftData?.nftURI}
                      ></CardMedia>
                    </div>
                  </Card>
                </Paper>
              </div>
              <div className="col-md-12 col-lg-8">
                <Card style={{ backgroundColor: "black" }}>
                  <CardContent>
                    <Row>
                      <Col>
                        <Typography
                          variant="body1"
                          component="p"
                          style={{ color: "#F64D04", fontFamily: "orbitron" }}
                        >
                          <strong>NFT Title </strong>
                        </Typography>
                      </Col>
                      <Col>
                        <Typography
                          variant="body1"
                          style={{
                            color: "white",
                            fontFamily: "inter",
                            fontSize: "1rem",
                          }}
                        >
                          {nftData.title}
                        </Typography>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Typography
                          variant="body1"
                          component="p"
                          style={{ color: "#F64D04", fontFamily: "orbitron" }}
                        >
                          <strong>NFT Description </strong>
                        </Typography>
                      </Col>
                      <Col
                        style={{
                          color: "white",
                          fontFamily: "inter",
                          fontSize: "1rem",
                        }}
                      >
                        {nftData.description}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Typography
                          variant="body1"
                          component="p"
                          style={{ color: "#F64D04", fontFamily: "orbitron" }}
                        >
                          <strong>Price </strong>
                        </Typography>
                      </Col>
                      {/* <Col style={{color: "white", fontFamily: "inter", fontSize: "1rem"}}>{price} WMATIC</Col> */}
                    </Row>
                    <Row>
                      <Col>
                        <Typography
                          variant="body1"
                          component="p"
                          style={{
                            color: "#F64D04",
                            fontFamily: "orbitron",
                          }}
                        >
                          <strong>Supply Type </strong>
                        </Typography>
                      </Col>
                      <Col
                        style={{
                          color: "white",
                          fontFamily: "inter",
                          fontSize: "1rem",
                        }}
                      >
                        {nftData.supplyType ? nftData.supplyType : null}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Typography
                          variant="body1"
                          component="p"
                          style={{
                            color: "#F64D04",
                            fontFamily: "orbitron",
                          }}
                        >
                          <strong>Token Supply </strong>
                        </Typography>
                      </Col>
                      <Col
                        style={{
                          color: "white",
                          fontFamily: "inter",
                          fontSize: "1rem",
                        }}
                      >
                        {nftData.tokenSupply}
                      </Col>
                    </Row>
                  </CardContent>
                </Card>
                <Row style={{ marginTop: "5px", marginBottom: "5px" }}>
                  <Col>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography
                          variant="body1"
                          style={{ color: "#F64D04", fontFamily: "orbitron" }}
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
                            {nftProperties?.map((i, index) => (
                              <tr key={index}>
                                <td>{i[0]}</td>
                                <td>{i[1]}</td>
                              </tr>
                            ))}
                            {/* {keys?.map((j, index) => (
                          <tr key={index}>
                            <td>{j}</td>
                            <td>{properties[j]}</td>
                          </tr>
                        ))} */}
                          </tbody>
                        </Table>
                      </AccordionDetails>
                    </Accordion>
                  </Col>
                </Row>
                <br></br>
                <div className="row no-gutters justify-content-center align-items-center">
                  {nftData.isMinted === false && nftData.isOnSale === true ? (
                    <>
                      <div className="col-12 col-md-4 mr-0 mr-md-2 mb-2 mb-md-0">
                        <button className="bidBtn w-100" onClick={handleGoBack}>
                          <ArrowBackIcon />
                          {"  "}
                          Back
                        </button>
                      </div>
                      <div className="col-12 col-md-4 ml-0 ml-md-2 mt-2 mt-md-0">
                        <button
                          className="bidBtn w-100"
                          type="button"
                          // onClick={(e) => handleBuy(e)}
                          onClick={() => console.log("clicked!")}
                        >
                          Buy
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="col-12 col-md-4 mr-0 mr-md-2 mb-2 mb-md-0">
                        <button className="bidBtn w-100" onClick={handleGoBack}>
                          <ArrowBackIcon />
                          {"  "}
                          Back
                        </button>
                      </div>
                      <div
                        className="col-12 col-md-4 ml-0 ml-md-2 mt-2 mt-md-0"
                        data-tip
                        data-for="registerTip"
                      >
                        <button
                          className="bidBtn w-100"
                          type="button"
                          data-tip
                          data-for="registerTip"
                          disabled
                          // onClick={(e) => handleBuy(e)}
                          onClick={(e) => console.log(e)}
                        >
                          Buy
                        </button>
                        {/* {nftData.isMinted  ===
                    true ? (
                      <ReactTooltip id="registerTip" place="top" effect="solid">
                        NFT Is Sold
                      </ReactTooltip>
                    ) : nftData.isOnSale === false && nftData.isMinted  ===
                    false ? (
                      <ReactTooltip id="registerTip" place="top" effect="solid" style={{color: "white"}}>
                        Sale Has Not Started Yet
                      </ReactTooltip>
                    ) : new Date() > new Date(location.state.endTime) ? (
                      <ReactTooltip id="registerTip" place="top" effect="solid">
                        Sale Has Ended
                      </ReactTooltip>
                    ) : null} */}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : !nftData ? (
            <div
              className="row no-gutters align-items-center justify-content-center"
              style={{ minHeight: "70vh" }}
            >
              <div className="col-12">
                <WhiteSpinner />
              </div>
            </div>
          ) : (
            <div
              className="row no-gutters align-items-center justify-content-center"
              style={{ minHeight: "70vh" }}
            >
              <div className="col-12 text-center">
                <Card
                  variant="outlined"
                  style={{
                    padding: "40px",
                    marginTop: "20px",
                    marginBottom: "20px",
                    backgroundColor: "#000",
                  }}
                >
                  <Typography
                    variant="body2"
                    className="text-center"
                    // color="textSecondary"
                    component="p"
                    style={{ color: "#fff" }}
                  >
                    <strong>No items to display </strong>
                  </Typography>
                </Card>
              </div>
              <div className="col-12 mt-4 text-center">
                <button
                  className="bidBtn"
                  onClick={handleGoBack}
                  style={{ width: "300px" }}
                >
                  <ArrowBackIcon />
                  {"  "}
                  Back
                </button>
              </div>
            </div>
          )}
        </div>
      </ThemeProvider>
    </>
  );
};

export default FixedDropSingleNFTHome;
