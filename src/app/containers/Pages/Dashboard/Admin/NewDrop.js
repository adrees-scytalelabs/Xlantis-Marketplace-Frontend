import { ThemeProvider, createTheme } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import Web3 from "web3";
import DropBanner from "../../../../assets/img/patients/DropBannerDefaultImage.jpg";
import r1 from "../../../../assets/img/patients/patient.jpg";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import WorkInProgressModal from "../../../../components/Modals/WorkInProgressModal";
import UploadFile from "../../../../components/Upload/UploadFile";

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

const makeTheme = createTheme({
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
  const [saleType, setSaleType] = useState("fixed-price");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(r1);
  const [bannerImage, setBannerImage] = useState(DropBanner);
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [, setDropId] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [network, setNetwork] = useState("");

  const [isUploadingIPFS, setIsUploadingIPFS] = useState(false);
  const [, setImageType] = useState("");
  const [nftType, setNftType] = useState("1155");
  const [versionB, setVersionB] = useState("");
  const [workProgressModalShow, setWorkProgressModalShow] = useState(false);
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
      newCollection: "",
      myCollections: "",
      newNFT: "",
      myNFTs: "",
      marketplace: "",
      newDrop: "active",
      myDrops: "",
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
    //console.log("In banner change function: ", e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      setIsUploadingBanner(true);
      const reader = new window.FileReader();
      let imageNFT = e.target.files[0];
      setImageType(e.target.files[0].type.split("/")[1]);
      reader.readAsArrayBuffer(e.target.files[0]);
      let fileData = new FormData();
      fileData.append("image", imageNFT);
      axios.post(`/upload/image`, fileData).then(
        (response) => {
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
    setIsUploadingIPFS(true);
    const reader = new window.FileReader();
    let imageNFT = e.target.files[0];
    setImageType(e.target.files[0].type.split("/")[1]);
    reader.readAsArrayBuffer(e.target.files[0]);
    let fileData = new FormData();
    fileData.append("image", imageNFT);
    axios.post(`/upload/image`, fileData).then(
      (response) => {
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
                    <UploadFile
                      fileURL={bannerImage}
                      isUploading={isUploadingBanner}
                      changeFile={onChangeBannerFile}
                      class="co-12 col-md-auto drop-banner-img mr-3"
                      accept=".png,.jpg,.jpeg,.gif"
                    />
                  </div>
                  <div className="form-group">
                    <label>Select Title Image</label>
                    <UploadFile
                      fileURL={image}
                      isUploading={isUploadingIPFS}
                      changeFile={onChangeFile}
                      class="co-12 col-md-auto profile-img mr-3"
                      accept=".png,.jpg,.jpeg,.gif"
                    />
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
      />
      <WorkInProgressModal
        show={workProgressModalShow}
        handleClose={() => setWorkProgressModalShow(false)}
      />
      <CircularBackdrop open={open} />
    </div>
  );
}

export default NewDrop;
