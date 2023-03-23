import { Avatar, CardHeader, Grid } from "@material-ui/core/";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import axios from "axios";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars";
import DateTimePicker from "react-datetime-picker";
import Web3 from "web3";
import r1 from "../../../../assets/img/patients/patient.jpg";
import CreateAuctionContract from "../../../../components/blockchain/Abis/CreateAuctionContract.json";
import * as Addresses from "../../../../components/blockchain/Addresses/Addresses";
import CubeComponent1 from "../../../../components/Cube/CubeComponent1";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import { useHistory, useRouteMatch } from "react-router-dom";
import ipfs from "../../../../components/IPFS/ipfs";
import Tooltip from "@material-ui/core/Tooltip";
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
  // const [inputList, setInputList] = useState([]);
  // const [imageData, setImageData] = useState([]);
  let [saleType, setSaleType] = useState("auction");
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [image, setImage] = useState(r1);
  let [dropId, setDropId] = useState("");

  let [isUploading, setIsUploading] = useState();
  let [isSaving, setIsSaving] = useState(false);
  // let [minimumBid, setMinimumBid] = useState();
  // let [bidDelta, setBidDelta] = useState();

  // eslint-disable-next-line
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

  // let getMyCubes = () => {
  //     axios.get("/token/TokenIdsnotonauction").then(
  //         (response) => {
  //             console.log("response", response);
  //             setInputList(response.data.tokensdata);
  //             setImageData(response.data.nftsdata);
  //         },
  //         (error) => {
  //             if (process.env.NODE_ENV === "development") {
  //                 console.log(error);
  //                 console.log(error.response);
  //             }
  //             if (error.response.data !== undefined) {
  //                 if (error.response.data === "Unauthorized access (invalid token) !!") {
  //                     Cookies.remove("Authorization");
  //                     localStorage.removeItem("Address")
  //                     window.location.reload(false);
  //                 }
  //             }
  //         })
  // }
  useEffect(() => {
    setVersionB(Cookies.get("Version"));

    // getMyCubes();
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
    }); // eslint-disable-next-line
  }, []);
  // const handleRemoveClick = (index, newCube) => {
  //     console.log("index", index);
  //     console.log("inputList", types);

  //     const list = [...types];
  //     console.log("list", list);
  //     list.splice(index, 1);
  //     setInputList(inputList => [...inputList, newCube])
  //     setTypes(list);
  // };
  // const handleAddClick = (value) => {

  //     setTypes([...types, value]);
  //     var index = inputList.findIndex(i => i._id === value._id);
  //     setTypesImages([...typesImages, imageData[index]])
  //     const list = [...inputList];
  //     list.splice(index, 1);
  //     setInputList(list);
  //     setType("");
  // };
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
      } else {
        let dropID;
        let DropData = {
          // tokenId: tokensId,
          // dropId: dropId,
          // MinimumBid: minimumBid * 10 ** 18,
          // bidDelta: bidDelta * 10 ** 18,
          title: name,
          image: image,
          description: description,
          saleType: saleType,
          dropType: nftType,
        };
        console.log("Drop Data", DropData);
        // history.push({
        //   pathname: `${path}/addNft`,
        //   state: {
        //     dropId: dropID,
        //     saleType: saleType,
        //     startTime: `2023-02-27T02:55:00.000+00:00`,
        //     endTime: `2023-04-27T02:55:00.000+00:00`,
        //     nftType: nftType,
        //   },
        // });
        axios.post(`/drop/`, DropData).then(
          (response) => {
            console.log("drop creation response", response);
            setDropId(response.data.dropId);
            dropID = response.data.dropId;
            setIsSaving(false);
            handleCloseBackdrop();
            // history.push(`${path}/addNft`);
            history.push({
              pathname: `${path}/addNft`,
              state: {
                dropId: dropID,
                saleType: saleType,
                nftType: nftType,
              },
            });

            // let variant = "success";
            // enqueueSnackbar('Drop Created Successfully.', { variant });
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

        // })
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
        // const address = Addresses.AuctionAddress;
        // const abi = CreateAuctionContract;
        // let tokensId = [];
        // handleCloseBackdrop();
        // for (let i = 0; i < types.length; i++) {
        //     tokensId.push(types[i]._id);
        // }
        // if (tokensId.length === 0) {
        //     let variant = "error";
        //     enqueueSnackbar('Please Select Cubes to create drop', { variant });
        //     setIsSaving(false);
        //     handleCloseBackdrop();
        // } else

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
          // let tokenId = [];
          // for (let i = 0; i < types.length; i++) {
          //     tokenId.push(types[i].tokenId);
          // }
          // console.log("startTimeStamp", Math.round(startTimeStamp));
          // console.log("endTimeStamp", endTimeStamp);
          // console.log("minimumBid * 10 ** 18", minimumBid * 10 ** 18);
          // var myContractInstance = await new web3.eth.Contract(abi, address);
          // var receipt = await myContractInstance.methods.newAuction(startTimeStamp.toString(), endTimeStamp.toString(), (minimumBid * 10 ** 18).toString(), tokenId).send({ from: accounts[0] }, (err, response) => {
          //     console.log('get transaction', err, response);
          //     if (err !== null) {
          //         console.log("err", err);
          //         let variant = "error";
          //         enqueueSnackbar('User Canceled Transaction', { variant });
          //         handleCloseBackdrop();
          //         setIsSaving(false);
          //         return;
          //     }
          // })
          // .on('receipt', (receipt) => {
          // console.log("receipt", receipt);
          // console.log("receipt.events.Transfer.returnValues.tokenId", receipt.events.New_Auction.returnValues.dropId);
          // let dropId = receipt.events.New_Auction.returnValues.dropId;

          let DropData = {
            // tokenId: tokensId,
            // dropId: dropId,
            // MinimumBid: minimumBid * 10 ** 18,
            // bidDelta: bidDelta * 10 ** 18,
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

              // setStartTime(new Date());
              // setEndTime(new Date());
              // setName("");
              // setMinimumBid();
              // setDescription("");
              // setTypes([]);
              // setTypesImages([])
              // setType("");
              // setMinimumBid(0);
              // setBidDelta(0);
              // setImage(r1);
              handleCloseBackdrop();
              // history.push(`${path}/addNft`);
              history.push({
                pathname: `${path}/addNft`,
                state: {
                  dropId: dropID,
                  saleType: saleType,
                  nftType: nftType,
                },
              });

              // let variant = "success";
              // enqueueSnackbar('Drop Created Successfully.', { variant });
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

  let onChangeFile = (e) => {
    setIsUploadingIPFS(true);
    const reader = new window.FileReader();
    let imageNFT = e.target.files[0];
    setImageType(e.target.files[0].type.split("/")[1]);
    console.log("e.target.files[0]", e.target.files[0]);
    // console.log("Image type: ", imageType);
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onloadend = () => {
      console.log("reader.result", reader.result);
      // setBuffer(Buffer(reader.result));
      ipfs.add(Buffer(reader.result), async (err, result) => {
        if (err) {
          console.log("err", err);
          setIsUploadingIPFS(false);
          let variant = "error";
          enqueueSnackbar("Unable to Upload Image to IPFS ", { variant });
          return;
        }
        console.log("HASH", result[0].hash);

        setIpfsHash(result[0].hash);
        setIpfsURI(`https://ipfs.io/ipfs/${result[0].hash}`);
        let variant = "success";
        enqueueSnackbar("Image Uploaded to IPFS", { variant });
        //
      });
    };
    // setIsUploadingIPFS(true);
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

    // setIsUploading(true);
    // let imageNFT = e.target.files[0]
    // let fileData = new FormData();
    // fileData.append("image", imageNFT);
    // axios.post("upload/uploadtos3", fileData).then(
    //     (response) => {
    //         console.log("response", response);
    //         setImage(response.data.url);
    //         setIsUploading(false);
    //         let variant = "success";
    //         enqueueSnackbar('Image Uploaded to S3 Successfully', { variant });
    //     },
    //     (error) => {
    //         if (process.env.NODE_ENV === "development") {
    //             console.log(error);
    //             console.log(error.response);
    //         }
    //         setIsUploading(false);
    //         let variant = "error";
    //         enqueueSnackbar('Unable to Upload Image to S3 .', { variant });

    //     }
    // );
  };
  return (
    <div className="backgroundDefault">
      {/* Page Header */}
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
                {/* <label>Select Cubes</label>
                                <div className="filter-widget">
                                    <Autocomplete
                                        id="combo-dox-demo"
                                        required
                                        options={inputList}
                                        // value={type}
                                        // disabled={isDisabledImporter}
                                        getOptionLabel={(option) =>
                                            option.title + ',' + option.SalePrice / 10 ** 18
                                        }
                                        onChange={(event, value) => {
                                            if (value == null)
                                                setType("");
                                            else {
                                                console.log(value, event);
                                                setType(value.name)
                                                handleAddClick(value);
                                            }
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Cubes"
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                </div> */}
                <div className="form-group">
                  <div className="form-group">
                    {/* Upload Image */}
                    <label>Select Title Image</label>
                    <div className="filter-widget">
                      <div className="form-group">
                        <div className="row no-gutters align-items-end justify-content-start">
                          <div className="co-12 col-md-auto profile-img mr-3">
                            <img src={image} alt="Selfie" />
                          </div>
                          <div className="co-12 col-md-auto">
                            <label
                              for="uploadPreviewImg"
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

                  {/* Feilds */}
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
                      <lable
                        component="legend"
                        style={{ fontWeight: "bold", fontFamily: "orbitron" }}
                      >
                        Select Sale Type
                      </lable>
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
                              setSaleType("auction");
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
                      {/* </FormControl>
                                <FormControl component="fieldset"> */}
                      <lable
                        component="legend"
                        style={{ fontWeight: "bold", fontFamily: "orbitron" }}
                      >
                        Select Drop Type
                      </lable>
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
                            // onChange={() => {
                            //   setNftType("721");
                            //   // checked={saleType === 'auction'}
                            // }}
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
                {/* <!-- Change Password Form --> */}
                <div className="form-group">
                  <div>
                    <Grid
                      container
                      spacing={3}
                      direction="row"
                      justify="flex-start"
                      // alignItems="flex-start"
                    >
                      {types.map((i, index) => (
                        <Grid item xs={12} sm={6} md={6} key={index}>
                          <Card
                            style={{ height: "100%" }}
                            variant="outlined"
                            className={classes.root}
                          >
                            {/* style={{ height: "100%" }} variant="outlined" */}
                            <CardActionArea>
                              <CardMedia
                                className={classes.media}
                                // image={img}
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
                                  // handleRemoveClick(index, i);
                                }}
                                className="btn btn-sm bg-danger-light btn-block"
                              >
                                Remove NFT
                              </Button>
                            </CardActions>
                          </Card>
                        </Grid>
                      ))}
                      {/* {types.map((data, index) =>
                                                <NewNFTCards key={index} index={index} data={data} handleRemoveClick={handleRemoveClick}></NewNFTCards>
                                            )} */}
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
