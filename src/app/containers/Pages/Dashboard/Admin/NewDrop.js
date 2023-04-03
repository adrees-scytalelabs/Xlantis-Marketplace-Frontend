import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { Avatar, CardHeader, Grid } from "@material-ui/core/";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import Web3 from "web3";
import DropBanner from "../../../../assets/img/patients/DropBannerDefaultImage.jpg";
import r1 from "../../../../assets/img/patients/patient.jpg";
import CubeComponent1 from "../../../../components/Cube/CubeComponent1";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import WorkInProgressModal from "../../../../components/Modals/WorkInProgressModal";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 300,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  badge: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  card: {
    minWidth: 250,
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
  tooltip: {
    fontSize: "16px",
  },
}));

const makeTheme = createMuiTheme({
  overrides: {
    MuiFormControlLabel: {
      label: {
        color: "white",
        fontFamily: "inter",
      },
    },
    MuiRadio: {
      root: {
        color: "white",
      },
    },
  },
});

function NewDrop(props) {
  const { enqueueSnackbar } = useSnackbar();
  let { path } = useRouteMatch();

  const classes = useStyles();
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  let [saleType, setSaleType] = useState("fixed-price");
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [image, setImage] = useState(r1);
  let [bannerImage, setBannerImage] = useState(DropBanner);
  let [isUploadingBanner, setIsUploadingBanner] = useState(false);
  let [dropId, setDropId] = useState("");

  let [isUploading, setIsUploading] = useState();
  let [isSaving, setIsSaving] = useState(false);
  let [type, setType] = useState();
  let [types, setTypes] = useState([]);
  const [typesImages, setTypesImages] = useState([]);
  const [network, setNetwork] = useState("");

  let [isUploadingIPFS, setIsUploadingIPFS] = useState(false);
  let [imageType, setImageType] = useState("");
  let [ipfsURI, setIpfsURI] = useState("");
  let [ipfsHash, setIpfsHash] = useState(null);
  let [nftType, setNftType] = useState("1155");
  let [versionB, setVersionB] = useState("");
  let [workProgressModalShow, setWorkProgressModalShow] = useState(false);
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const handleCloseNetworkModal = () => setShowNetworkModal(false);
  const handleShowNetworkModal = () => setShowNetworkModal(true);
  const Text721 =
    "ERC-721 is a standard for representing ownership of non-fungible tokens, that is, where each token is unique and cannot be exchanged on a one-to-one basis with other tokens.";
  const Text1155 =
    "ERC-1155 tokens are semi-fungible tokens, which means that each token can represent multiple, identical assets. For example, an ERC-1155 token could represent 10 units of a particular item, and those 10 units can be traded or transferred individually.";
  const AuctionText =
    "Auction will have bidding for NFTs and after some time NFT will be sold to best bidder.";
  const FixedPriceText =
    "In Fixed-Price sale NFT will be sold to buyer on the spot.";

  const [open, setOpen] = useState(false);
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };

  const history = useHistory();


  useEffect(() => {
    setVersionB(Cookies.get("Version"));

    props.setActiveTab({
      dashboard: "",
      newNFT: "",
      newDrop: "active",
      newCube: "",
      mySeason: "",
      myCubes: "",
      myDrops: "",
      myNFTs: "",
      newCollection: "",
      orders: "",
      settings: "",
      privacyPolicy: "",
      termsandconditions: "",
      changePassword: "",
      newRandomDrop: "",
      topUp: "",
    }); 
  }, []);

  let loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const handleSubmitEvent = async (e) => {
    if (nftType === "1155") {
      e.preventDefault();
      setIsSaving(true);
      handleShowBackdrop();
      if (name === "") {
        let variant = "error";
        enqueueSnackbar("Name of the Drop Cannot be Empty.", { variant });
        setIsSaving(false);
        handleCloseBackdrop();
      } else if (description === "") {
        let variant = "error";
        enqueueSnackbar("Description of the Drop Cannot be Empty.", {
          variant,
        });
        setIsSaving(false);
        handleCloseBackdrop();
      } else if (image === r1) {
        let variant = "error";
        enqueueSnackbar("Please Select title image for Drop to continue.", {
          variant,
        });
        setIsSaving(false);
        handleCloseBackdrop();
      } else if (bannerImage === DropBanner) {
        let variant = "error";
        enqueueSnackbar("Please select banner image for drop to continue.", {
          variant,
        });
        setIsSaving(false);
        handleCloseBackdrop();
      } else {
        let dropID;
        let DropData = {
          bannerURL: bannerImage,
          title: name,
          image: image,
          description: description,
          saleType: saleType,
          dropType: nftType,
        };
        console.log("Drop Data", DropData);
        axios.post(`/drop/`, DropData).then(
          (response) => {
            console.log("drop creation response", response);
            setDropId(response.data.dropId);
            dropID = response.data.dropId;
            setIsSaving(false);
            handleCloseBackdrop();
            history.push({
              pathname: `${path}/addNft`,
              state: {
                dropId: dropID,
                saleType: saleType,
                nftType: nftType,
              },
            });
          },
          (error) => {
            if (process.env.NODE_ENV === "development") {
              console.log(error);
              console.log(error.response);
            }
            handleCloseBackdrop();

            setIsSaving(false);
            let variant = "error";
            enqueueSnackbar("Unable to Create Drop.", { variant });
          }
        );
      }
    } else if (nftType === "721") {
      e.preventDefault();

      setIsSaving(true);
      await loadWeb3();
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      const network = await web3.eth.net.getNetworkType();
      if (network !== "private") {
        setNetwork(network);
        setIsSaving(false);
        handleShowNetworkModal();
      } else {
        handleShowBackdrop();
        if (name === "") {
          let variant = "error";
          enqueueSnackbar("Name of the Drop Cannot be Empty.", { variant });
          setIsSaving(false);
          handleCloseBackdrop();
        } else if (description === "") {
          let variant = "error";
          enqueueSnackbar("Description of the Drop Cannot be Empty.", {
            variant,
          });
          setIsSaving(false);
          handleCloseBackdrop();
        } else if (image === r1) {
          let variant = "error";
          enqueueSnackbar("Please Select title image for Drop to continue.", {
            variant,
          });
          setIsSaving(false);
          handleCloseBackdrop();
        } else {
          let dropID;
          let DropData = {
            bannerImage: bannerImage,
            title: name,
            image: image,
            description: description,
            saleType: saleType,
            dropType: nftType,
          };
          console.log("Drop Data", DropData);
          axios.post(`/drop/`, DropData).then(
            (response) => {
              console.log("drop creation response", response);
              setDropId(response.data.dropId);
              dropID = response.data.dropId;
              setIsSaving(false);
              handleCloseBackdrop();
              history.push({
                pathname: `${path}/addNft`,
                state: {
                  dropId: dropID,
                  saleType: saleType,
                  nftType: nftType,
                },
              });
            },
            (error) => {
              if (process.env.NODE_ENV === "development") {
                console.log(error);
                console.log(error.response);
              }
              handleCloseBackdrop();

              setIsSaving(false);
              let variant = "error";
              enqueueSnackbar("Unable to Create Drop.", { variant });
            }
          );
        }
      }
    }
  };

  const handleSubmitEventMetamask = async (e) => {
    e.preventDefault();

    setIsSaving(true);
    await loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const network = await web3.eth.net.getNetworkType();
    if (network !== "private") {
      setNetwork(network);
      setIsSaving(false);
      handleShowNetworkModal();
    } else {
      handleShowBackdrop();

      if (name === "") {
        let variant = "error";
        enqueueSnackbar("Name of the Drop Cannot be Empty.", { variant });
        setIsSaving(false);
        handleCloseBackdrop();
      } else if (description === "") {
        let variant = "error";
        enqueueSnackbar("Description of the Drop Cannot be Empty.", {
          variant,
        });
        setIsSaving(false);
        handleCloseBackdrop();
      } else if (image === r1) {
        let variant = "error";
        enqueueSnackbar("Please Select title image for Drop to continue.", {
          variant,
        });
        setIsSaving(false);
        handleCloseBackdrop();
      } else {
        let dropID;

        let DropData = {
          title: name,
          image: image,
          description: description,
          saleType: saleType,
          dropType: nftType,
        };
        console.log("Drop Data", DropData);
        axios.post(`/drop/`, DropData).then(
          (response) => {
            console.log("drop creation response", response);
            setDropId(response.data.dropId);
            dropID = response.data.dropId;
            setIsSaving(false);

            handleCloseBackdrop();
            history.push({
              pathname: `${path}/addNft`,
              state: {
                dropId: dropID,
                saleType: saleType,
                nftType: nftType,
              },
            });
          },
          (error) => {
            if (process.env.NODE_ENV === "development") {
              console.log(error);
              console.log(error.response);
            }
            handleCloseBackdrop();

            setIsSaving(false);
            let variant = "error";
            enqueueSnackbar("Unable to Create Drop.", { variant });
          }
        );
      }
    }
  };

  let onChangeBannerFile = async (e) => {
    console.log("In banner change function: ", e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      setIsUploadingBanner(true);
      const reader = new window.FileReader();
      let imageNFT = e.target.files[0];
      setImageType(e.target.files[0].type.split("/")[1]);
      console.log("e.target.files[0]", e.target.files[0]);
      reader.readAsArrayBuffer(e.target.files[0]);
      let fileData = new FormData();
      fileData.append("image", imageNFT);
      axios.post(`/upload/image`, fileData).then(
        (response) => {
          console.log("response", response);
          setBannerImage(response.data.url);
          setIsUploadingBanner(false);
          let variant = "success";
          enqueueSnackbar("Image Uploaded Successfully", { variant });
        },
        (error) => {
          if (process.env.NODE_ENV === "development") {
            console.log(error);
            console.log(error.response);
          }
          setIsUploadingBanner(false);
          let variant = "error";
          enqueueSnackbar("Unable to Upload Image", { variant });
        }
      );
    }
  };

  let onChangeFile = (e) => {
    console.log("In change file function");
    setIsUploadingIPFS(true);
    const reader = new window.FileReader();
    let imageNFT = e.target.files[0];
    setImageType(e.target.files[0].type.split("/")[1]);
    console.log("e.target.files[0]", e.target.files[0]);
    reader.readAsArrayBuffer(e.target.files[0]);
    let fileData = new FormData();
    fileData.append("image", imageNFT);
    axios.post(`/upload/image`, fileData).then(
      (response) => {
        console.log("response", response);
        setImage(response.data.url);
        setIsUploadingIPFS(false);
        let variant = "success";
        enqueueSnackbar("Image Uploaded Successfully", { variant });
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
        setIsUploadingIPFS(false);
        let variant = "error";
        enqueueSnackbar("Unable to Upload Image", { variant });
      }
    );

  };
  return (
    <div className="backgroundDefault">

      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">New Drop</h3>
            <ul className="breadcrumb">
              <Link to={`/dashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <li className="breadcrumb-item active">New Drop</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="card-body p-0">
        <div className="row no-gutters">
          <div className="col-md-12 col-lg-6">
            <form onSubmit={handleSubmitEvent}>
              <div className="form-group">
                <div className="form-group">
                  <div className="form-group">
                    <label>Select Banner Image</label>
                    <div className="filter-widget">
                      <div className="form-group">
                        <div className="no-gutters align-items-end justify-content-start">
                          <div className="co-12 col-md-auto drop-banner-img mr-3">
                            <img src={bannerImage} alt="Selfie" />
                          </div>
                          <div className="co-12 col-md-auto">
                            <label
                              htmlFor="uploadBannerImg"
                              className="uploadLabel"
                            >
                              {isUploadingBanner ? (
                                <div className="text-center">
                                  <Spinner
                                    animation="border"
                                    role="status"
                                    style={{ color: "#fbfeff" }}
                                  ></Spinner>
                                </div>
                              ) : (
                                "Choose File"
                              )}
                            </label>
                            <input
                              name="sampleFile"
                              type="file"
                              id="uploadBannerImg"
                              accept=".png,.jpg,.jpeg"
                              onChange={onChangeBannerFile}
                              hidden
                            />
                            <small className="form-text text-muted">
                              Allowed JPG, JPEG, PNG Max size of 5MB
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Select Title Image</label>
                    <div className="filter-widget">
                      <div className="form-group">
                        <div className="no-gutters align-items-end justify-content-start">
                          <div className="co-12 col-md-auto profile-img mr-3">
                            <img src={image} alt="Selfie" />
                          </div>
                          <div className="co-12 col-md-auto">
                            <label
                              htmlFor="uploadPreviewImg"
                              className="uploadLabel"
                            >
                              {isUploadingIPFS ? (
                                <div className="text-center">
                                  <Spinner
                                    animation="border"
                                    role="status"
                                    style={{ color: "#fbfeff" }}
                                  ></Spinner>
                                </div>
                              ) : (
                                "Choose File"
                              )}
                            </label>
                            <input
                              name="sampleFile"
                              type="file"
                              id="uploadPreviewImg"
                              accept=".png,.jpg,.jpeg,.gif"
                              onChange={onChangeFile}
                              hidden
                            />
                            <small className="form-text text-muted">
                              Allowed JPG, JPEG, PNG, GIF. Max size of 5MB
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group newNftFields">
                    <label>Drop Name</label>
                    <div className="form-group newNftWrapper">
                      <input
                        type="text"
                        required
                        value={name}
                        placeholder="Enter Name of Drop"
                        className="form-control newNftInput"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>

                    <div className="form-group newNftWrapper">
                      <label>Drop Description</label>
                      <textarea
                        type="text"
                        required
                        rows="4"
                        value={description}
                        placeholder="Enter Description of Drop"
                        className="form-control newNftInput"
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <ThemeProvider theme={makeTheme}>
                    <FormControl component="fieldset">
                      <label
                        component="legend"
                        style={{ fontWeight: "bold", fontFamily: "orbitron" }}
                      >
                        Select Sale Type
                      </label>
                      <RadioGroup
                        row
                        aria-label="position"
                        name="position"
                        defaultValue="top"
                      >
                        <Tooltip
                          title={AuctionText}
                          classes={{ tooltip: classes.tooltip }}
                          placement="top-start"
                          arrow={true}
                        >
                          <FormControlLabel
                            style={{ color: "white" }}
                            value="auction"
                            onChange={() => {
                              setWorkProgressModalShow(true);
                            }}
                            checked={saleType === "auction"}
                            control={<Radio style={{ color: "#fff" }} />}
                            label={
                              <span style={{ fontSize: "0.9rem" }}>
                                Auction{" "}
                                <i
                                  className="fa fa-info-circle"
                                  aria-hidden="true"
                                ></i>
                              </span>
                            }
                          />
                        </Tooltip>
                        <Tooltip
                          title={FixedPriceText}
                          classes={{ tooltip: classes.tooltip }}
                          placement="top-start"
                          arrow={true}
                        >
                          <FormControlLabel
                            style={{ color: "white" }}
                            value="fixed-price"
                            onChange={() => {
                              setSaleType("fixed-price");
                            }}
                            checked={saleType === "fixed-price"}
                            control={<Radio style={{ color: "#fff" }} />}
                            label={
                              <span style={{ fontSize: "0.9rem" }}>
                                Fixed-Price{" "}
                                <i
                                  className="fa fa-info-circle"
                                  aria-hidden="true"
                                ></i>
                              </span>
                            }
                          />
                        </Tooltip>
                      </RadioGroup>
                      <label
                        component="legend"
                        style={{ fontWeight: "bold", fontFamily: "orbitron" }}
                      >
                        Select Drop Type
                      </label>
                      <RadioGroup
                        row
                        aria-label="position"
                        name="position"
                        defaultValue="top"
                      >
                        <Tooltip
                          title={Text721}
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <FormControlLabel
                            style={{ color: "black" }}
                            value="ERC721"
                            onChange={() => {
                              setWorkProgressModalShow(true);
                            }}
                            checked={nftType === "721"}
                            control={<Radio style={{ color: "#fff" }} />}
                            label={
                              <span style={{ fontSize: "0.9rem" }}>
                                Single{" "}
                                <i
                                  className="fa fa-info-circle"
                                  aria-hidden="true"
                                ></i>
                              </span>
                            }
                          />
                        </Tooltip>
                        <Tooltip
                          title={Text1155}
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <FormControlLabel
                            style={{ color: "black" }}
                            value="ERC1155"
                            onChange={() => {
                              setNftType("1155");
                            }}
                            checked={nftType === "1155"}
                            control={<Radio style={{ color: "#fff" }} />}
                            label={
                              <span style={{ fontSize: "0.9rem" }}>
                                Multiple{" "}
                                <i
                                  className="fa fa-info-circle"
                                  aria-hidden="true"
                                ></i>
                              </span>
                            }
                          />
                        </Tooltip>
                      </RadioGroup>
                    </FormControl>
                  </ThemeProvider>
                </div>
              </div>
            </form>
          </div>

          <div className="col-md-12 col-lg-6">
            {types.length > 0 ? (
              <Scrollbars style={{ height: 900 }}>
                <div className="form-group">
                  <div>
                    <Grid
                      container
                      spacing={3}
                      direction="row"
                      justify="flex-start"
                    >
                      {types.map((i, index) => (
                        <Grid item xs={12} sm={6} md={6} key={index}>
                          <Card
                            style={{ height: "100%" }}
                            variant="outlined"
                            className={classes.root}
                          >
                            <CardActionArea>
                              <CardMedia
                                className={classes.media}
                                title=""
                              >
                                <CubeComponent1
                                  data={typesImages}
                                  index={index}
                                />
                              </CardMedia>
                              <CardContent>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  component="p"
                                >
                                  <strong>Cube Title: </strong>
                                  {i.title}
                                </Typography>

                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  component="p"
                                >
                                  <strong>Cube Description: </strong>
                                  {i.description}
                                </Typography>

                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  component="p"
                                >
                                  <strong>Sale Price: </strong>
                                  {i.SalePrice / 10 ** 18} ETH
                                </Typography>
                                <Typography
                                  variant="h6"
                                  gutterBottom
                                  color="textSecondary"
                                  className="text-center"
                                >
                                  Music Artist
                                </Typography>
                                <CardHeader
                                  avatar={
                                    <Avatar
                                      src={i.MusicArtistProfile}
                                      aria-label="Artist"
                                      className={classes.avatar}
                                    />
                                  }
                                  title={i.MusicArtistName}
                                  subheader={i.MusicArtistAbout}
                                />
                              </CardContent>
                            </CardActionArea>
                            <CardActions>
                              <Button
                                onClick={(e) => {
                                  e.preventDefault();
                                }}
                                className="btn btn-sm bg-danger-light btn-block"
                              >
                                Remove NFT
                              </Button>
                            </CardActions>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                </div>
              </Scrollbars>
            ) : null}
          </div>
        </div>
        {isSaving ? (
          <div className="text-center">
            <Spinner animation="border" role="status" style={{ color: "#fff" }}>
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <div className="submit-section">
            <button
              type="button"
              onClick={(e) => {
                versionB === "v1-sso"
                  ? handleSubmitEvent(e)
                  : handleSubmitEventMetamask(e);
              }}
              className="btn submit-btn propsActionBtn"
            >
              Create Drop
            </button>
          </div>
        )}
      </div>
      <NetworkErrorModal
        show={showNetworkModal}
        handleClose={handleCloseNetworkModal}
        network={network}
      ></NetworkErrorModal>
      <WorkInProgressModal
        show={workProgressModalShow}
        handleClose={() => setWorkProgressModalShow(false)}
      />
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default NewDrop;
