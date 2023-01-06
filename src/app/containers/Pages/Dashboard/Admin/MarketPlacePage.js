import { CardHeader, Grid, Tooltip } from "@material-ui/core/";
import Alert from "@material-ui/lab/Alert";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
// COMPONENTS
import Countdown from "react-countdown";
import WhiteSpinner from "../../../../components/Spinners/WhiteSpinner";
// UTILS
import { truncate } from "../../../../assets/js/utils";

const cardStyles = makeStyles((theme) => ({
  cardTheme: {
    // borderRadius: "12px",
    boxShadow: "none",
  },
  cardTitle: {
    color: "#fff",
    fontFamily: "orbitron",
    fontWeight: "bold",
    textTransform: "capitalize",
    fontSize: "1rem",
    marginTop: "0rem",
  },
  cardDescriptions: {
    color: "#999",
    fontFamily: "inter",
    fontSize: "0.875rem",
    // marginTop: "0.15rem",
  },
  price: {
    color: "hsla(350, 93%, 61%, 1)",
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  textAlert: {
    justifyContent: "center",
    // borderRadius: "12px",
    fontSize: "1rem",
  },
  exploreBtn: {
    padding: "0.75rem 2rem",
    border: "none",
    // borderRadius: "12px",
    fontWeight: "bold",
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    borderRadius: 0,
  },
  media: {
    height: 0,
    paddingTop: "100%", // 16:9
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
  // overflowWithDots: {
  //     textOverflow: 'ellipsis',
  //     whiteSpace: 'nowrap',
  //     overflow: 'hidden',
  //     width: "80%"
  // }
}));

function MarketPlacePage(props) {
  const classes = useStyles();
  const cardClasses = cardStyles();
  let { path } = useRouteMatch();
  const [tokenList, setTokenList] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [totalDrops, setTotalDrops] = useState(0);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  let [versionB, setVersionB] = useState("");
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };
  let getMyDrops = (saleType, start, end) => {
    handleShowBackdrop();
    const version = Cookies.get("Version");
    console.log("version", version);
    axios.get(`/${version}/drop/saleType/${saleType}/${start}/${end}`).then(
      (response) => {
        console.log("response", response);
        setTokenList(response.data.data);
        setTotalDrops(response.data.data.length);
        handleCloseBackdrop();
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
        if (error.response.data !== undefined) {
          if (
            error.response.data === "Unauthorized access (invalid token) !!"
          ) {
            Cookies.remove("Authorization");
            localStorage.removeItem("Address");
            window.location.reload();
          }
        }
        handleCloseBackdrop();
      }
    );
  };

  useEffect(() => {
    setVersionB(Cookies.get("Version"));

    getMyDrops(props.saleType, 0, rowsPerPage);
    // getCollections();?

    // props.setActiveTab({
    //     dashboard: "",
    //     newNFT: "",
    //     orders: "",
    //     myNFTs: "",
    //     myCubes: "",
    //     myDrops: "active",
    //     mySeason: "",
    //     settings: "",
    //     privacyPolicy: "",
    //     termsandconditions: "",
    //     changePassword: "",
    //     newDrop: "",
    //     newCube: "",
    //     newCollection: "",
    //     newRandomDrop: "",
    // });
    // eslint-disable-next-line
  }, []);
  const handleChangePage = (event, newPage) => {
    console.log("newPage", newPage);
    setPage(newPage);
    console.log("Start", newPage * rowsPerPage);
    console.log("End", newPage * rowsPerPage + rowsPerPage);
    getMyDrops(
      props.saleType,
      newPage * rowsPerPage,
      newPage * rowsPerPage + rowsPerPage
    );
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    getMyDrops(props.saleType, 0, parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div className="backgroundDefault">
      <div className="card-body" style={{ minHeight: "60vh" }}>
        <div className="form-group">
          {open ? (
            <WhiteSpinner />
          ) : totalDrops === 0 ? (
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
                component="div"
                style={{ color: "#fff" }}
              >
                <strong>No items to display </strong>
              </Typography>
            </Card>
          ) : (
            <Grid
              container
              spacing={2}
              direction="row"
              justify="flex-start"
              // alignItems="flex-start"
            >
              {tokenList.map((i, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={3}
                  // xl={3}
                  direction="row"
                  key={index}
                >
                  <Link
                    to={{
                      pathname: `${path}/drops/nfts`,
                      state: {
                        nftId: i.NFTIds,
                        dropId: i._id,
                        startTime: i.startTime,
                        endTime: i.endTime,
                        saleType: i.saleType,
                      },
                    }}
                  >
                    <Card
                      id="marketCardProps"
                      style={{ height: "100%" }}
                      variant="outlined"
                      className={classes.root}
                    >
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image={i.image}
                          title="Drop Image"
                        ></CardMedia>
                        <CardContent>
                          {/* Title, Description and Price */}
                          <div
                            className="row no-gutters justify-content-between"
                            style={{ minHeight: "60px" }}
                          >
                            <div className="col-8 align-self-end">
                              <Typography
                                variant="h6"
                                component="div"
                                className={cardClasses.cardTitle}
                              >
                                {truncate(i.title, 15)}
                              </Typography>
                              <Typography
                                variant="body2"
                                component="p"
                                className={cardClasses.cardDescriptions}
                              >
                                {truncate(i.description, 25)}
                              </Typography>
                            </div>
                            <div className="col-4 align-self-end text-right p-0">
                              <p
                                className="nftPrice mb-0 p-0"
                                style={{ lineHeight: "1.6" }}
                              >
                                {i.totalNFTs} NFTs
                              </p>
                            </div>
                          </div>
                          {/* <Typography variant="body2" color="textSecondary" component="p">
                                                        <strong>Description: </strong>{i.description}
                                                    </Typography> */}

                          <br></br>
                          {/* {(i.saleType === "auction") ? 
                                                    (<Typography variant="body2" color="textSecondary" component="p">
                                                        <strong>Minimum Bid: </strong>{i.price} WETH
                                                    </Typography>
                                                    ) : (
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                        <strong>Price: </strong>{i.price} WETH
                                                        </Typography>
                                                    )} */}

                          {i.saleType === "auction" ? (
                            <Typography
                              variant="h6"
                              gutterBottom
                              // color="textSecondary"
                              className="text-center mb-0"
                            >
                              {new Date() < new Date(i.startTime) ? (
                                <div style={{ marginTop: "1rem" }}>
                                  <Alert
                                    severity="info"
                                    className={cardClasses.textAlert}
                                  >
                                    <span
                                      style={{
                                        fontFamily: "orbitron",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Auction Starts At:{" "}
                                    </span>
                                    <span>
                                      <Countdown
                                        daysInHours
                                        date={new Date(i.startTime)}
                                        style={{ fontFamily: "orbitron" }}
                                      ></Countdown>
                                    </span>
                                  </Alert>
                                </div>
                              ) : new Date() > new Date(i.startTime) &&
                                new Date() < new Date(i.endTime) ? (
                                <div style={{ marginTop: "1rem" }}>
                                  {/* {console.log("Date(i.AuctionStartsAt)", Date(i.AuctionEndsAt.toLoca))} */}
                                  <Alert
                                    severity="warning"
                                    className={cardClasses.textAlert}
                                  >
                                    <span
                                      style={{
                                        fontFamily: "orbitron",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Auction Ends At:{" "}
                                    </span>
                                    <span>
                                      <Countdown
                                        daysInHours
                                        date={new Date(i.endTime)}
                                        style={{ fontFamily: "orbitron" }}
                                      ></Countdown>
                                    </span>
                                  </Alert>
                                </div>
                              ) : (
                                <Typography
                                  variant="body2"
                                  style={{
                                    marginTop: "1rem",
                                    // marginBottom: "1.25rem",
                                  }}
                                  component="p"
                                >
                                  <Alert
                                    severity="error"
                                    // variant="filled"
                                    className={cardClasses.textAlert}
                                    style={{ fontWeight: "bold" }}
                                  >
                                    Auction Ended
                                  </Alert>
                                </Typography>
                              )}
                            </Typography>
                          ) : (
                            <Typography
                              variant="h6"
                              gutterBottom
                              // color="textSecondary"
                              className="text-center mb-0"
                            >
                              {new Date() < new Date(i.startTime) ? (
                                <div style={{ marginTop: "1rem" }}>
                                  <Alert
                                    severity="info"
                                    className={cardClasses.textAlert}
                                  >
                                    <span
                                      style={{
                                        fontFamily: "orbitron",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Sale Starts At:{" "}
                                    </span>
                                    <span>
                                      <Countdown
                                        daysInHours
                                        date={new Date(i.startTime)}
                                        style={{ fontFamily: "orbitron" }}
                                      ></Countdown>
                                    </span>
                                  </Alert>
                                </div>
                              ) : new Date() > new Date(i.startTime) &&
                                new Date() < new Date(i.endTime) ? (
                                <div style={{ marginTop: "1rem" }}>
                                  {/* {console.log("Date(i.AuctionStartsAt)", Date(i.AuctionEndsAt.toLoca))} */}
                                  <Alert
                                    severity="warning"
                                    className={cardClasses.textAlert}
                                  >
                                    <span
                                      style={{
                                        fontFamily: "orbitron",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Sale Ends At:{" "}
                                    </span>
                                    <span>
                                      <Countdown
                                        daysInHours
                                        date={new Date(i.endTime)}
                                        style={{ fontFamily: "orbitron" }}
                                      ></Countdown>
                                    </span>
                                  </Alert>
                                </div>
                              ) : (
                                <Typography
                                  variant="body2"
                                  style={{
                                    marginTop: "1rem",
                                    // marginBottom: "1.25rem",
                                  }}
                                  component="p"
                                >
                                  <Alert
                                    severity="error"
                                    // variant="filled"
                                    className={cardClasses.textAlert}
                                    style={{ fontWeight: "bold" }}
                                  >
                                    Sale Ended
                                  </Alert>
                                </Typography>
                              )}
                            </Typography>
                          )}

                          {/* <Typography variant="h6" gutterBottom color="textSecondary" className="text-center">
                                                        {new Date() < new Date(i.startTime) ? (
                                                            <div style={{ color: "#00FF00" }} >

                                                                <Typography variant="body2" color="textSecondary" component="p">
                                                                    <strong>Auction Starts At:</strong>
                                                                </Typography>
                                                                {console.log("Date(i.AuctionStartsAt)", Date(i.startTime))}
                                                                <Countdown daysInHours date={new Date(i.startTime)}>
                                                                </Countdown>
                                                            </div>
                                                        ) : new Date() > new Date(i.startTime) && new Date() < new Date(i.endTime) ? (
                                                            <div style={{ color: "#FF0000" }}>
                                                                {console.log("Date(i.AuctionStartsAt)", Date(i.AuctionEndsAt.toLoca))}
                                                                <Typography variant="body2" color="textSecondary" component="p">
                                                                    <strong>Auction Ends At:</strong>
                                                                </Typography>
                                                                <Countdown daysInHours date={new Date(i.endTime)}>
                                                                </Countdown>
                                                            </div>) : (
                                                            <Typography variant="body2" style={{ color: "#FF0000" }} component="p">
                                                                <strong>Auction Ended</strong>
                                                            </Typography>
                                                        )}
                                                    </Typography> */}
                        </CardContent>
                      </CardActionArea>
                      {/* <CardActions></CardActions> */}
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          )}
        </div>
      </div>
      <div className="row no-gutters justify-content-center paginationBg mt-5">
        <TablePagination
          rowsPerPageOptions={[4, 8, 12, 24]}
          component="div"
          count={totalDrops}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}

export default MarketPlacePage;
