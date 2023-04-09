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
import { Link } from "react-router-dom";
import Web3 from "web3";
import r1 from "../../../../assets/img/patients/patient.jpg";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import RequestApprovalModal from "../../../../components/Modals/RequestApprovalModal";
import WorkInProgressModal from "../../../../components/Modals/WorkInProgressModal";
import WhiteSpinner from "../../../../components/Spinners/WhiteSpinner";
import CreateNFTContract1155 from "../../../../components/blockchain/Abis/Collectible1155.json";
import CreateNFTContract721 from "../../../../components/blockchain/Abis/Collectible721.json";
import Factory1155Contract from "../../../../components/blockchain/Abis/Factory1155.json";
import Factory721Contract from "../../../../components/blockchain/Abis/Factory721.json";
import * as Addresses from "../../../../components/blockchain/Addresses/Addresses";
import UploadFile from "../../../../components/Upload/UploadFile";

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
  tooltip: {
    fontSize: "16px",
  },
}));

function NewCollection(props) {
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

  let [isSaving, setIsSaving] = useState(false);
  let [collectionName, setCollectionName] = useState("");

  let [collectionDescription, setCollectionDescription] = useState("");
  let [collectionSymbol, setCollectionSymbol] = useState("");
  let [isUploadingIPFS, setIsUploadingIPFS] = useState(false);
  let [imageFile, setImageFile] = useState();
  let [fileURL, setFileURL] = useState(r1);
  let [collectionId, setCollectionId] = useState("");
  let [nftContractAddress, setNftContractAddress] = useState("");
  let [isFixedPriceApproved, setIsFixedPriceApproved] = useState(false);
  let [approvingFixedPrice, setApprovingFixedPrice] = useState(false);
  let [isAuctionApproved, setIsAuctionApproved] = useState(false);
  let [approvingAuction, setApprovingAuction] = useState(false);
  let [doneLoader, setDoneLoader] = useState(false);
  let [nftType, setNftType] = useState("1155");
  let [version, setVersion] = useState("");
  let [royaltyFee, setRoyaltyFee] = useState(0);
  let [approvalFlag, setApprovalFlag] = useState(false);
  let [workProgressModalShow, setWorkProgressModalShow] = useState(false);
  const Text721 =
    "ERC-721 is a standard for representing ownership of non-fungible tokens, that is, where each token is unique and cannot be exchanged on a one-to-one basis with other tokens.";
  const Text1155 =
    "ERC-1155 tokens are semi-fungible tokens, which means that each token can represent multiple, identical assets. For example, an ERC-1155 token could represent 10 units of a particular item, and those 10 units can be traded or transferred individually.";
  const RoyaltyFeeText =
    "A royalty fee is a percentage of the revenue generated from the resale of a non-fungible token (NFT) that is paid to the original owner or creator of the NFT. The percentage of the royalty fee can be set by the NFT creator and can range from a small percentage to a significant portion of the resale price.\nNote: Royalty Fee is in percentage %";

  useEffect(() => {
    setVersion(Cookies.get("Version"));

    props.setActiveTab({
      dashboard: "",
      newCollection: "active",
      myCollection: "",
      newNFT: "",
      myNFTs: "",
      marketplace: "",
      newDrop: "",
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

  const getHash = (id) => {
    const hex = Web3.utils.toHex(id);
    console.log("conversion to hex: ", hex);
    return hex;
  };

  const handleSubmitEvent = async (event) => {
    event.preventDefault();
    if (royaltyFee > 0) {
      setIsSaving(true);

      handleShowBackdrop();
      let collectionID;

      let fileData = new FormData();
      fileData.append("thumbnail", imageFile);
      fileData.append("name", collectionName);
      fileData.append("symbol", collectionSymbol);
      fileData.append("description", collectionDescription);
      fileData.append("royaltyFee", royaltyFee);
      fileData.append("contractType", nftType);

      let royaltyBlockchain = royaltyFee * 10000;

      if (nftType === "1155") {
        axios.post(`/collection/`, fileData).then(
          async (response) => {
            //console.log("collection creation response", response);
            setCollectionId(response.data.collection._id);
            collectionID = response.data.collection._id;

            let variant = "success";
            enqueueSnackbar("New Collection Created Successfully.", {
              variant,
            });
            setCollectionName("");
            setCollectionSymbol("");
            setCollectionDescription("");
            setFileURL(r1);
            setRoyaltyFee(0);
            setIsSaving(false);
            handleCloseBackdrop();
            setIsSaving(false);
          },
          (error) => {
            if (process.env.NODE_ENV === "development") {
              console.log(error);
              console.log(error.response);
            }

            let variant = "error";
            enqueueSnackbar("Unable to Create New Collection.", { variant });
            handleCloseBackdrop();
            setCollectionName("");
            setCollectionSymbol("");
            setCollectionDescription("");
            setFileURL(r1);
            setIsSaving(false);
          }
        );
      } else if (nftType === "721") {
        await loadWeb3();
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        const network = await web3.eth.net.getNetworkType();
        if (network !== "private") {
          setNetwork(network);
          setIsSaving(false);
          handleShow();
        } else {
          axios.post(`/collection/`, fileData).then(
            async (response) => {
              console.log("collection creation response", response);
              setCollectionId(response.data.collection._id);
              collectionID = response.data.collection._id;
              let CloneId = getHash(collectionID);
              setIsSaving(false);
              console.log("ERC721 COLLECTION CREATION");
              const abi = Factory721Contract;
              const address = Addresses.Factory721Address;
              var cloneContractAddress;
              var myContractInstance = await new web3.eth.Contract(
                abi,
                address
              );
              console.log("ERC721 Contract", myContractInstance);
              await myContractInstance.methods
                .createNFT721(CloneId, royaltyBlockchain)
                .send({ from: accounts[0] }, (err, response) => {
                  console.log("Get transaction ", err, response);
                  console.log(typeof response);
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
                        console.log(
                          "Transaction hash on backend error: ",
                          error
                        );
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
        }
      }
    } else {
      let variant = "error";
      enqueueSnackbar("Invalid Value Of Royalty Fee", { variant });
    }
  };

  const handleSubmitEventMetamask = async (event) => {
    event.preventDefault();
    if (royaltyFee > 0) {
      setIsSaving(true);

      await loadWeb3();
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      const network = await web3.eth.net.getNetworkType();
      if (network !== "private") {
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
        fileData.append("royaltyFee", royaltyFee);

        let royaltyBlockchain = royaltyFee * 10000;

        axios.post(`/collection/`, fileData).then(
          async (response) => {
            console.log("collection creation response", response);
            setCollectionId(response.data.collection._id);
            collectionID = response.data.collection._id;

            setIsSaving(false);
            let CloneId = getHash(collectionID);
            if (nftType === "1155") {
              console.log("ERC1155 COLLECTION CREATION");
              const abi = Factory1155Contract;
              const address = Addresses.Factory1155Address;
              var cloneContractAddress;
              var myContractInstance = await new web3.eth.Contract(
                abi,
                address
              );
              console.log("ERC1155 Contract", myContractInstance);
              await myContractInstance.methods
                .createNFT1155(CloneId, true, royaltyBlockchain)
                .send({ from: accounts[0] }, (err, response) => {
                  console.log("Get transaction ", err, response);
                  console.log(typeof response);
                  let variant = "success";
                  enqueueSnackbar(
                    "Sending transaction on blockchain to deploy a collection (1155)",
                    {
                      variant,
                    }
                  );
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
                        console.log(
                          "Transaction hash on backend error: ",
                          error
                        );
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
            } else if (nftType === "721") {
              console.log("ERC721 COLLECTION CREATION");
              const abi = Factory721Contract;
              const address = Addresses.Factory721Address;
              var cloneContractAddress;
              var myContractInstance = await new web3.eth.Contract(
                abi,
                address
              );
              console.log("ERC721 Contract", myContractInstance);
              await myContractInstance.methods
                .createNFT721(CloneId, royaltyBlockchain)
                .send({ from: accounts[0] }, (err, response) => {
                  console.log("Get transaction ", err, response);
                  console.log(typeof response);
                  let variant = "success";
                  enqueueSnackbar(
                    "Sending transaction on blockchain to deploy a collection (ERC721)",
                    {
                      variant,
                    }
                  );
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
                        console.log(
                          "Transaction hash on backend error: ",
                          error
                        );
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
      }
    } else {
      let variant = "error";
      enqueueSnackbar("Invalid Value Of Royalty Fee", { variant });
    }
  };

  let onChangeFile = (e) => {
    setImageFile(e.target.files[0]);
    setFileURL(URL.createObjectURL(e.target.files[0]));
  };

  let handleApprovalModalClose = () => {
    setApprovalModalShow(false);
    setDoneLoader(false);
    setIsAuctionApproved(false);
    setIsFixedPriceApproved(false);
  };

  let giveFixedPriceApproval = async () => {
    let approvalData = {
      collectionId: collectionId,
      factoryType: "fixed-price",
    };

    axios.put(`/collection/approve`, approvalData).then(
      (response) => {
        console.log("Response from approval of Fixed Price: ", response);
        let variant = "success";
        enqueueSnackbar("Collection Approved For Fixed Price Successfully", {
          variant,
        });
        setIsFixedPriceApproved(true);
        setApprovingFixedPrice(false);
        setApprovalFlag(false);
      },
      (err) => {
        let variant = "error";
        enqueueSnackbar("Unable to approve collection", { variant });
        console.log("Err from approval Fixed-price: ", err);
        console.log("Err response from approval Fixed-price: ", err.response);
        setApprovingFixedPrice(false);
        setApprovalFlag(false);
      }
    );
  };

  let giveAuctionApproval = async () => {
    await loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const network = await web3.eth.net.getNetworkType();
    if (network !== "private") {
      setNetwork(network);
      setIsSaving(false);
      handleShow();
    } else {
      setApprovingAuction(true);
      setApprovalFlag(true);

      const addressNft = nftContractAddress;
      let addressDropFactory;
      let abiNft;
      if (nftType === "1155") {
        abiNft = CreateNFTContract1155;
        addressDropFactory = Addresses.AuctionDropFactory1155;
      } else if (nftType === "721") {
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
            setApprovalFlag(false);
            handleCloseBackdrop();
            setIsSaving(false);
          }
        })
        .on("receipt", (receipt) => {
          console.log("receipt", receipt);
          let approvalData = {
            collectionId: collectionId,
            factoryType: "auction",
          };

          axios.put(`/collection/approve`, approvalData).then(
            (response) => {
              console.log("Response from Auction approval: ", response);
              let variant = "success";
              enqueueSnackbar("Collection Approved For Auction Successfully", {
                variant,
              });
              setIsAuctionApproved(true);
              setApprovingAuction(false);
              setApprovalFlag(false);
            },
            (err) => {
              let variant = "error";
              enqueueSnackbar("Unable to approve collection", { variant });
              console.log("Err from auction approval: ", err);
              console.log("Err response from auction approval: ", err.response);
              setApprovingAuction(false);
              setApprovalFlag(false);
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
    if (isFixedPriceApproved === true) {
      setDoneLoader(true);
      handleApprovalModalClose();
    }
  };

  return (
    <div className="backgroundDefault">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">New Collection</h3>
            <ul className="breadcrumb">
              <Link to={`/dashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <li className="breadcrumb-item active">New Collection</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="card-body page-height px-0">
        <div className="row no-gutters">
          <div className="col-md-12 col-lg-6">
            <form>
              <div className="form-group">
                <label>Select Preview Image</label>
                <UploadFile
                  fileURL={fileURL}
                  isUploading={isUploadingIPFS}
                  changeFile={onChangeFile}
                  class="co-12 col-md-auto profile-img mr-3"
                  accept=".png,.jpg,.jpeg,.gif"
                />
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

                  <div>
                    <Tooltip
                      title={RoyaltyFeeText}
                      classes={{ tooltip: classes.tooltip }}
                      placement="top-start"
                      arrow={true}
                    >
                      <label>
                        Royalty Fee{" "}
                        <i className="fa fa-info-circle" aria-hidden="true"></i>
                      </label>
                    </Tooltip>

                    <small style={{ marginLeft: "5px" }}></small>
                  </div>

                  <div className="form-group newNftWrapper">
                    <input
                      type="number"
                      required
                      value={royaltyFee}
                      placeholder="Enter Royalty Fee"
                      className="form-control newNftInput"
                      onChange={(e) => {
                        setRoyaltyFee(e.target.value);
                      }}
                    />
                  </div>

                  <FormControl component="fieldset">
                    <label
                      component="legend"
                      style={{ fontWeight: "bold", fontFamily: "orbitron" }}
                    >
                      Select NFT Type
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
                          style={{ color: "white" }}
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
                          style={{ color: "white" }}
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
                </div>
              </div>
            </form>
          </div>
        </div>
        {isSaving ? (
          <WhiteSpinner />
        ) : (
          <div className="submit-section">
            <button
              type="button"
              onClick={(e) => {
                version === "v1-sso"
                  ? handleSubmitEvent(e)
                  : handleSubmitEventMetamask(e);
              }}
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
        approvalFlag={approvalFlag}
      ></RequestApprovalModal>
      <WorkInProgressModal
        show={workProgressModalShow}
        handleClose={() => setWorkProgressModalShow(false)}
      />
      <CircularBackdrop open={open} />
    </div>
  );
}

export default NewCollection;
