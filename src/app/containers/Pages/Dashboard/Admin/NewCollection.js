// import Avatar from '@material-ui/core/Avatar';
import Backdrop from "@material-ui/core/Backdrop";
// import Button from '@material-ui/core/Button';
// import CardActions from '@material-ui/core/CardActions';
// import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from "@material-ui/core/CircularProgress";
// import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from "@material-ui/core/styles";
// import Typography from '@material-ui/core/Typography';
// import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
// import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
// import { Scrollbars } from 'react-custom-scrollbars';
// import { Icon } from 'semantic-ui-react';
import Web3 from "web3";
import r1 from "../../../../assets/img/patients/patient.jpg";
import Factory1155Contract from "../../../../components/blockchain/Abis/Factory1155.json";
import Factory721Contract from "../../../../components/blockchain/Abis/Factory721.json";
import * as Addresses from "../../../../components/blockchain/Addresses/Addresses";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import RequestApprovalModal from "../../../../components/Modals/RequestApprovalModal";
import CreateNFTContract1155 from "../../../../components/blockchain/Abis/Collectible1155.json";
import CreateNFTContract721 from "../../../../components/blockchain/Abis/Collectible721.json";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

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
}));

function NewCollection(props) {
  const [propertyKey, setPropertyKey] = useState("");
  const [propertyValue, setPropertyValue] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [properties, setProperties] = useState([]);
  const [levelValues, setLevelValues] = useState([
    { name: "", lowLevel: 0, highLevel: 0 },
  ]);
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  let [network, setNetwork] = useState(false);
  const [show, setShow] = useState(false);
  let [approvalModalShow, setApprovalModalShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [open, setOpen] = useState(false);
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };

  const [tokenList, setTokenList] = useState([]);
  let [isSaving, setIsSaving] = useState(false);
  let [collectionName, setCollectionName] = useState("");
  let [website, setWebsite] = useState("");
  let [aboutTheArt, setAboutTheArt] = useState("");
  let [ipfsHash, setIpfsHash] = useState(null);
  let [collectionDescription, setCollectionDescription] = useState("");
  let [collectionSymbol, setCollectionSymbol] = useState("");
  let [isUploadingIPFS, setIsUploadingIPFS] = useState(false);
  let [image, setImage] = useState(r1);
  let [imageFile, setImageFile] = useState();
  let [fileURL, setFileURL] = useState(r1);
  let [collectionId, setCollectionId] = useState("");
  let [nftContractAddress, setNftContractAddress] = useState("");
  let [isFixedPriceApproved, setIsFixedPriceApproved] = useState(false);
  let [approvingFixedPrice, setApprovingFixedPrice] = useState(false);
  let [isAuctionApproved, setIsAuctionApproved] = useState(false);
  let [approvingAuction, setApprovingAuction] = useState(false);
  let [doneLoader, setDoneLoader] = useState(false);
  let [nftType, setNftType] = useState("ERC721");

  useEffect(() => {
    props.setActiveTab({
      dashboard: "",
      newNFT: "",
      orders: "",
      settings: "",
      myNFTs: "",
      mySeason: "",
      myDrops: "",
      myCubes: "",
      privacyPolicy: "",
      termsandconditions: "",
      changePassword: "",
      newDrop: "",
      newCube: "",
      createNewCollection: "active",
      newCollection: "",
      newRandomDrop: "",
    }); // eslint-disable-next-line
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

  const getHash = (id) => {
    const hex = Web3.utils.toHex(id);
    console.log("conversion to hex: ", hex);
    return hex;
  };

  const handleSubmitEvent = async (event) => {
    event.preventDefault();
    setIsSaving(true);

    await loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const network = await web3.eth.net.getNetworkType();
    if (network !== "goerli") {
      setNetwork(network);
      setIsSaving(false);
      handleShow();
    } else {
      handleShowBackdrop();
      let collectionID;

      let fileData = new FormData();
      fileData.append("thumbnail", imageFile);
      fileData.append("name", collectionName);
      fileData.append("symbol", collectionSymbol);
      fileData.append("description", collectionDescription);

      // fileData.append("nftContractAddress", cloneContractAddress);
      // console.log("NFT Clone Address: ", cloneContractAddress);
      // console.log("File data while creating collection on backend: ", fileData);

      axios.post("/collection/", fileData).then(
        async (response) => {
          console.log("collection creation response", response);
          setCollectionId(response.data.collection._id);
          collectionID = response.data.collection._id;

          // let variant = "success";
          // enqueueSnackbar('New Collection Created Successfully.', { variant });
          // setCollectionName("");
          // setCollectionSymbol("");
          // setCollectionDescription("");
          // handleCloseBackdrop();
          setIsSaving(false);
          let CloneId = getHash(collectionID);
          if (nftType === "ERC1155") {
            console.log("ERC1155 COLLECTION CREATION");
            const abi = Factory1155Contract;
            const address = Addresses.Factory1155Address;
            var cloneContractAddress;
            var myContractInstance = await new web3.eth.Contract(abi, address);
            console.log("ERC1155 Contract", myContractInstance);
            await myContractInstance.methods
              .createNFT1155(CloneId, true)
              .send({ from: accounts[0] }, (err, response) => {
                console.log("Get transaction ", err, response);
                console.log(typeof response);
                // console.log("Collection ID: ", collectionId);
                axios
                  .put(`/collection/txHash/${collectionID}`, {
                    txHash: response,
                  })
                  .then(
                    (response) => {
                      console.log(
                        "Transaction Hash sending on backend response: ",
                        response
                      );
                    },
                    (error) => {
                      console.log("Transaction hash on backend error: ", error);
                    }
                  );
                if (err !== null) {
                  console.log("err", err);
                  let variant = "error";
                  enqueueSnackbar("User Canceled Transaction", { variant });
                  handleCloseBackdrop();
                  setIsSaving(false);
                }
              })
              .on("receipt", (receipt) => {
                console.log("receipt", receipt);
                cloneContractAddress =
                  receipt.events.CloneCreated.returnValues.cloneAddress;
                let variant = "success";
                enqueueSnackbar("New Collection Created Successfully.", {
                  variant,
                });
                setApprovalModalShow(true);
                setNftContractAddress(cloneContractAddress);
                setCollectionName("");
                setCollectionSymbol("");
                setCollectionDescription("");
                setFileURL(r1);
                handleCloseBackdrop();
              });
          } else if (nftType === "ERC721") {
            console.log("ERC721 COLLECTION CREATION");
            const abi = Factory721Contract;
            const address = Addresses.Factory721Address;
            var cloneContractAddress;
            var myContractInstance = await new web3.eth.Contract(abi, address);
            console.log("ERC721 Contract", myContractInstance);
            await myContractInstance.methods
              .createNFT721(CloneId)
              .send({ from: accounts[0] }, (err, response) => {
                console.log("Get transaction ", err, response);
                console.log(typeof response);
                // console.log("Collection ID: ", collectionId);
                axios
                  .put(`/collection/txHash/${collectionID}`, {
                    txHash: response,
                  })
                  .then(
                    (response) => {
                      console.log(
                        "Transaction Hash sending on backend response: ",
                        response
                      );
                    },
                    (error) => {
                      console.log("Transaction hash on backend error: ", error);
                    }
                  );
                if (err !== null) {
                  console.log("err", err);
                  let variant = "error";
                  enqueueSnackbar("User Canceled Transaction", { variant });
                  handleCloseBackdrop();
                  setIsSaving(false);
                }
              })
              .on("receipt", (receipt) => {
                console.log("receipt", receipt);
                cloneContractAddress =
                  receipt.events.CloneCreated.returnValues.cloneAddress;
                let variant = "success";
                enqueueSnackbar("New Collection Created Successfully.", {
                  variant,
                });
                setApprovalModalShow(true);
                setNftContractAddress(cloneContractAddress);
                setCollectionName("");
                setCollectionSymbol("");
                setCollectionDescription("");
                setFileURL(r1);
                handleCloseBackdrop();
              });
          }
        },
        (error) => {
          if (process.env.NODE_ENV === "development") {
            console.log(error);
            console.log(error.response);
          }

          let variant = "error";
          enqueueSnackbar("Unable to Create New Collection.", { variant });
          handleCloseBackdrop();
          setIsSaving(false);
        }
      );

      // const address = Addresses.CreateNftAddress;
      // const abi = CreateNFTContract;
      // let totalImages = tokenList.length;
      // let AmountofNFTs = [];
      // let IPFsHashes = [];
      // for (let i = 0; i < tokenList.length; i++) {
      //     AmountofNFTs.push(tokenList[i].tokensupply);
      //     IPFsHashes.push(tokenList[i].ipfsHash);
      // }
      // console.log("AmountofNFTs", AmountofNFTs);
      // console.log("IPFsHashes", IPFsHashes);

      // var myContractInstance = await new web3.eth.Contract(abi, address);
      // console.log("myContractInstance", myContractInstance);
      // await myContractInstance.methods.new_batch(totalImages, AmountofNFTs, IPFsHashes).send({ from: accounts[0] }, (err, response) => {
      //     console.log('get transaction', err, response);
      //     if (err !== null) {
      //         console.log("err", err);
      //         let variant = "error";
      //         enqueueSnackbar('User Canceled Transaction', { variant });
      //         handleCloseBackdrop();
      //         setIsSaving(false);
      //     }
      // })
      //     .on('receipt', (receipt) => {
      //         console.log("receipt", receipt);
      //         console.log("receipt", receipt.events.TransferBatch.returnValues.ids);
      //         let ids = receipt.events.TransferBatch.returnValues.ids;
      //         for (let i = 0; i < tokenList.length; i++) {
      //             tokenList[i].nftId = ids[i];
      //         }

      //         let Data = {
      //             nftdata: tokenList
      //         }
      //         console.log("Data", Data);
      //         axios.post("/nft/createnft", Data).then(
      //             (response) => {
      //                 console.log("response", response);
      //                 let variant = "success";
      //                 enqueueSnackbar('Nfts Created Successfully.', { variant });
      //                 setTokenList([]);
      //                 setIpfsHash("");
      //                 setImage(r1);
      //                 setCollectionName("");
      //                 setCollectionDescription("");
      //                 setAboutTheArt("");
      //                 setWebsite("");
      //                 handleCloseBackdrop();
      //                 setIsSaving(false);
      //             },
      //             (error) => {
      //                 if (process.env.NODE_ENV === "development") {
      //                     console.log(error);
      //                     console.log(error.response);
      //                 }

      //                 let variant = "error";
      //                 enqueueSnackbar('Unable to Create Nfts.', { variant });

      //                 handleCloseBackdrop();
      //                 setIsSaving(false);
      //             })
      //     })
    }
  };

  let onChangeFile = (e) => {
    setImageFile(e.target.files[0]);
    setFileURL(URL.createObjectURL(e.target.files[0]));
  };

  let handleApprovalModalClose = () => {
    setApprovalModalShow(false);
  };

  //approval
  let giveFixedPriceApproval = async () => {
    await loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const network = await web3.eth.net.getNetworkType();
    if (network !== "goerli") {
      setNetwork(network);
      setIsSaving(false);
      handleShow();
    } else {
      setApprovingFixedPrice(true);

      const addressNft = nftContractAddress;
      let addressDropFactory;
      let abiNft;
      if (nftType === "ERC1155") {
        abiNft = CreateNFTContract1155;
        addressDropFactory = Addresses.FactoryDrop1155;
      } else if (nftType === "ERC721") {
        abiNft = CreateNFTContract721;
        addressDropFactory = Addresses.FactoryDrop721;
      }

      console.log("Contract Address: ", nftContractAddress);
      var myContractInstance = await new web3.eth.Contract(abiNft, addressNft);
      console.log("myContractInstance", myContractInstance);

      await myContractInstance.methods
        .setApprovalForAll(addressDropFactory, true)
        .send({ from: accounts[0] }, (err, response) => {
          console.log("get transaction", err, response);

          if (err !== null) {
            console.log("err", err);
            let variant = "error";
            enqueueSnackbar("User Canceled Transaction", { variant });
            setApprovingFixedPrice(false);
            handleCloseBackdrop();
            setIsSaving(false);
          }
        })
        .on("receipt", (receipt) => {
          console.log("receipt", receipt);

          //sending call on backend

          let approvalData = {
            collectionId: collectionId,
            factoryType: "fixed-price",
          };

          axios.put("/collection/approve", approvalData).then(
            (response) => {
              console.log("Response from approval of Fixed Price: ", response);
              setIsFixedPriceApproved(true);
              setApprovingFixedPrice(false);
            },
            (err) => {
              console.log("Err from approval Fixed-price: ", err);
              console.log(
                "Err response from approval Fixed-price: ",
                err.response
              );
              setApprovingFixedPrice(false);
            }
          );
        });
    }
  };

  let giveAuctionApproval = async () => {
    await loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const network = await web3.eth.net.getNetworkType();
    if (network !== "goerli") {
      setNetwork(network);
      setIsSaving(false);
      handleShow();
    } else {
      setApprovingAuction(true);

      const addressNft = nftContractAddress;
      let addressDropFactory;
      let abiNft;
      if (nftType === "ERC1155") {
        abiNft = CreateNFTContract1155;
        addressDropFactory = Addresses.AuctionDropFactory1155;
      } else if (nftType === "ERC721") {
        abiNft = CreateNFTContract721;
        addressDropFactory = Addresses.AuctionDropFactory721;
      }

      console.log("Contract Address: ", nftContractAddress);
      var myContractInstance = await new web3.eth.Contract(abiNft, addressNft);
      console.log("myContractInstance", myContractInstance);

      await myContractInstance.methods
        .setApprovalForAll(addressDropFactory, true)
        .send({ from: accounts[0] }, (err, response) => {
          console.log("get transaction", err, response);

          if (err !== null) {
            console.log("err", err);
            let variant = "error";
            enqueueSnackbar("User Canceled Transaction", { variant });
            setApprovingAuction(false);
            handleCloseBackdrop();
            setIsSaving(false);
          }
        })
        .on("receipt", (receipt) => {
          console.log("receipt", receipt);

          //sending call on backend

          let approvalData = {
            collectionId: collectionId,
            factoryType: "auction",
          };

          axios.put("/collection/approve", approvalData).then(
            (response) => {
              console.log("Response from Auction approval: ", response);
              setIsAuctionApproved(true);
              setApprovingAuction(false);
            },
            (err) => {
              console.log("Err from auction approval: ", err);
              console.log("Err response from auction approval: ", err.response);
              setApprovingAuction(false);
            }
          );
        });
    }
  };

  let handleDoneButton = () => {
    if (isFixedPriceApproved === false) {
      let variant = "error";
      enqueueSnackbar("Approve For Fixed Price First", { variant });
    }
    if (isAuctionApproved === false) {
      let variant = "error";
      enqueueSnackbar("Approve For Auction First", { variant });
    }
    if (isAuctionApproved === true && isFixedPriceApproved === true) {
      setDoneLoader(true);
      // axios.put(`/collection/approve/${collectionId}`).then(
      //     (response) => {
      //         console.log("Response from collection approval: ", response);
      //         let variant = "success";
      //         enqueueSnackbar("Collection Approval Successful", { variant });
      //         setDoneLoader(false);
      //     },
      //     (error) => {
      //         console.log("Error from collection approval: ", error);
      //         let variant = "error";
      //         enqueueSnackbar("Collection Approval Unsuccessful", { variant });
      //         setDoneLoader(false);
      //     }
      // );

      handleApprovalModalClose();
    }
  };

  return (
    <div className="backgroundDefault">
      {/* Page Header */}
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">New Collection</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                Dashboard
              </li>
              <li className="breadcrumb-item active">New Collection</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="card-body px-0">
        <div className="row no-gutters">
          <div className="col-md-12 col-lg-6">
            <form>
              <div className="form-group">
                {/* Upload Image */}
                <label>Select Preview Image</label>
                <div className="filter-widget">
                  <div className="form-group">
                    <div className="row no-gutters align-items-end justify-content-start">
                      <div className="co-12 col-md-auto profile-img mr-3">
                        <img src={fileURL} alt="Selfie" />
                      </div>
                      <div className="co-12 col-md-auto">
                        <label for="uploadPreviewImg" className="uploadLabel">
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

                {/* Feilds */}
                <div className="form-group newNftFields">
                  <label>Collection Name</label>
                  <div className="form-group newNftWrapper">
                    <input
                      type="text"
                      required
                      value={collectionName}
                      placeholder="Enter Name of Collection"
                      className="form-control newNftInput"
                      onChange={(e) => {
                        setCollectionName(e.target.value);
                      }}
                    />
                  </div>
                  <label>Collection Symbol</label>
                  <div className="form-group newNftWrapper">
                    <input
                      type="text"
                      required
                      value={collectionSymbol}
                      placeholder="Enter Symbol of Collection"
                      className="form-control newNftInput"
                      onChange={(e) => {
                        setCollectionSymbol(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label>Collection Description</label>
                    <small style={{ marginLeft: "5px" }}></small>
                  </div>

                  <div className="form-group newNftWrapper">
                    {/* <label>About the Art</label> */}
                    <textarea
                      type="text"
                      required
                      rows="4"
                      value={collectionDescription}
                      placeholder="Enter Description of Collection"
                      className="form-control newNftInput"
                      onChange={(e) => {
                        setCollectionDescription(e.target.value);
                      }}
                    />
                  </div>

                  <FormControl component="fieldset">
                    <lable
                      component="legend"
                      style={{ fontWeight: "bold", fontFamily: "poppins" }}
                    >
                      Select NFT Type
                    </lable>
                    <RadioGroup
                      row
                      aria-label="position"
                      name="position"
                      defaultValue="top"
                    >
                      <FormControlLabel
                        style={{ color: "black" }}
                        value="ERC721"
                        onChange={() => {
                          setNftType("ERC721");
                          // checked={saleType === 'auction'}
                        }}
                        checked={nftType === "ERC721"}
                        control={<Radio color="secondary" />}
                        label={
                          <span style={{ fontSize: "0.9rem" }}>ERC721</span>
                        }
                      />
                      <FormControlLabel
                        style={{ color: "black" }}
                        value="ERC1155"
                        onChange={() => {
                          setNftType("ERC1155");
                        }}
                        checked={nftType === "ERC1155"}
                        control={<Radio color="secondary" />}
                        label={
                          <span style={{ fontSize: "0.9rem" }}>ERC1155</span>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                  {/* <div>
                                        <label>Add Properties</label><small style={{ marginLeft: "5px" }}>(optional)</small>
                                    </div>
                                    <div>
                                        <button
                                            className="btn btn-submit"
                                            color="primary"
                                            // className="btn submit-btn"
                                            onClick={onDialogOpenClick}
                                        >
                                            Add Properties
                                        </button>
                                        <Dialog
                                            fullWidth={true}
                                            maxWidth={true}
                                            open={openDialog}
                                            onClose={onDialogCloseClick}
                                            aria-labelledby="max-width-dialog-title"
                                        >
                                            <DialogTitle id="max-width-dialog-title">Enter Properties</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>Enter Properties in key value pair</DialogContentText>
                                                <form>
                                                    <TextField
                                                        label="Key"
                                                        value={propertyKey}
                                                        onChange={(e) => setPropertyKey(e.target.value)}
                                                    />
                                                    <TextField
                                                        label="Value"
                                                        value={propertyValue}
                                                        onChange={(e) => setPropertyValue(e.target.value)}
                                                        style={{ marginLeft: "5px" }}
                                                    />
                                                    <button className="btn submit-btn" onClick={onClickDialogFormSubmit} >Add</button>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                    </div> */}
                  {/* <div>
                                        <div>
                                            {properties.map((property, index) => {
                                                return (
                                                    <Card>
                                                        <CardHeader
                                                            title={property.key}
                                                            subheader={property.value}
                                                        />
                                                    </Card>
                                                )
                                            })}
                                        </div>
                                    </div> */}
                  {/* <div style={{marginTop: "5px"}}>
                                        <label>Add Level</label>
                                    </div> */}
                  {/* {levelValues.map((level, index)=> {
                                      return (
                                        <div>
                                            <div 
                                                style={{
                                                float: "left",
                                                width: "55%"
                                                }}
                                            >
                                                <div>
                                                    <small><label>Name</label></small>
                                                </div>
                                                <div>
                                                    <input 
                                                        name= "name"
                                                        type= "text"
                                                        placeholder='Name'
                                                        value={ level.name }
                                                        className= "form-control"
                                                        onChange = { (e) => handleOnChangeLevel(index, e)} 
                                                        // style={{width: "30%"}}
                                                    />
                                                </div>
                                            </div>
                                            <div style={{ float: "left", width: "45%" }} >
                                                <div>
                                                    <small><label>Value</label></small>
                                                </div>
                                                <div style={{ float: "left", width: "33.33%" }}>
                                                    <input 
                                                        name= "lowLevel"
                                                        type= "number"
                                                        value= { level.lowLevel } 
                                                        className= "form-control"
                                                        onChange= { (e) => handleOnChangeLevel(index, e)}
                                                    />
                                                </div>
                                                <div style={{ width: "33.33%", border: "thin black", float: "left", marginTop: "10px" }} >Of</div>
                                                <div style={{ float: "left", width: "33.33%" }}>
                                                    <input 
                                                        name= "highLevel"
                                                        type= "number"
                                                        value= { level.highLevel } 
                                                        className= "form-control"
                                                        onChange= { (e) => handleOnChangeLevel(index, e)}
                                                    />
                                                </div>
                                            </div>
                                            <IconButton onClick={() => onRemoveLevels(index)} >
                                                <Clear />
                                            </IconButton>
                                        </div>
                                      )      
                                    })} */}
                  {/* <button className= "btn" onClick={addLevels} >Add more</button> */}
                  {/* <button onClick={ onSubmit }>Submit</button> */}
                </div>
              </div>
            </form>
          </div>
        </div>
        {isSaving ? (
          <div className="text-center">
            <Spinner
              animation="border"
              role="status"
              style={{ color: "#ff0000" }}
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <div className="submit-section">
            <button
              type="button"
              onClick={(e) => handleSubmitEvent(e)}
              className="btn submit-btn propsActionBtn"
            >
              Add Collection
            </button>
          </div>
        )}
      </div>
      <NetworkErrorModal
        show={show}
        handleClose={handleClose}
        network={network}
      ></NetworkErrorModal>
      <RequestApprovalModal
        show={approvalModalShow}
        handleClose={handleApprovalModalClose}
        giveFixPriceApproval={giveFixedPriceApproval}
        giveAuctionApproval={giveAuctionApproval}
        approvingAuction={approvingAuction}
        approvingFixedPrice={approvingFixedPrice}
        isAuctionApproved={isAuctionApproved}
        isFixedPriceApproved={isFixedPriceApproved}
        done={handleDoneButton}
        doneLoader={doneLoader}
      ></RequestApprovalModal>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default NewCollection;
