import Cookies from "js-cookie";
import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Web3 from "web3";
import {
  approveCollection,
  createNewCollection,
  getCategoriesList,
  updateCollectionTxHash,
} from "../../../../components/API/AxiosInterceptor";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import { defaultProfile } from "../../../../components/ImageURLs/URLs";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import RequestApprovalModal from "../../../../components/Modals/RequestApprovalModal";
import WorkInProgressModal from "../../../../components/Modals/WorkInProgressModal";
import SelectNFTAndSaleType from "../../../../components/Radio/SelectNFTAndSaleType";
import Select from "../../../../components/Select/Select";
import SelectDescription from "../../../../components/Select/SelectDescription";
import SelectRoyaltyFee from "../../../../components/Select/SelectRoyaltyFee";
import NotificationSnackbar from "../../../../components/Snackbar/NotificationSnackbar";
import UploadFile from "../../../../components/Upload/UploadFile";
import CreateNFTContract1155 from "../../../../components/blockchain/Abis/Collectible1155.json";
import CreateNFTContract721 from "../../../../components/blockchain/Abis/Collectible721.json";
import Factory1155Contract from "../../../../components/blockchain/Abis/Factory1155.json";
import Factory721Contract from "../../../../components/blockchain/Abis/Factory721.json";
import * as Addresses from "../../../../components/blockchain/Addresses/Addresses";
import SubmitButton from "../../../../components/buttons/SubmitButton";
import getCroppedImg from "../../../../components/Utils/Crop";
import ImageCropModal from "../../../../components/Modals/ImageCropModal";
import AutocompleteAddNft from "../../../../components/Autocomplete/Autocomplete";

function NewCollection(props) {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(1 / 1);
  const [showCropModal, setShowCropModal] = useState(false);
  const [isUploadingCroppedImage, setIsUploadingCroppedImage] = useState();
  const [imageCounter, setImageCounter] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropShape, setCropShape] = useState("square");
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  const [network, setNetwork] = useState(false);
  const [show, setShow] = useState(false);
  const [approvalModalShow, setApprovalModalShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [open, setOpen] = useState(false);
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");
  const [collectionSymbol, setCollectionSymbol] = useState("");
  const [isUploadingIPFS] = useState(false);
  const [imageFile, setImageFile] = useState();
  const [fileURL, setFileURL] = useState(defaultProfile);
  const [collectionId, setCollectionId] = useState("");
  const [nftContractAddress, setNftContractAddress] = useState("");
  const [isFixedPriceApproved, setIsFixedPriceApproved] = useState(false);
  const [approvingFixedPrice, setApprovingFixedPrice] = useState(false);
  const [isAuctionApproved, setIsAuctionApproved] = useState(false);
  const [approvingAuction, setApprovingAuction] = useState(false);
  const [doneLoader, setDoneLoader] = useState(false);
  const [nftType, setNftType] = useState("1155");
  const [version, setVersion] = useState("");
  const [royaltyFee, setRoyaltyFee] = useState(null);
  const [approvalFlag, setApprovalFlag] = useState(false);
  const [workProgressModalShow, setWorkProgressModalShow] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const [category, setCategory] = useState("");

  const RoyaltyFeeText =
    "A royalty fee is a percentage of the revenue generated from the resale of a non-fungible token (NFT) that is paid to the original owner or creator of the NFT. The percentage of the royalty fee can be set by the NFT creator and can range from a small percentage to a significant portion of the resale price.\nNote: Royalty Fee is in percentage %";

  const getCategories = () => {
    getCategoriesList()
      .then((response) => {
        console.log("Response from getting categories list: ", response);
        setCategoriesList(response.data.categories);
      })
      .catch((error) => {
        console.log("Error from getting categories list: ", error);
      });
  };

  useEffect(() => {
    setVersion(Cookies.get("Version"));
    console.log("Market Place id", props.marketplaceId);
    getCategories();
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
    if (fileURL === defaultProfile) {
      let variant = "error";
      setSnackbarMessage("Please Add Preview Image.");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
    } else if (
      collectionName === "" ||
      collectionName === undefined ||
      collectionName === null ||
      collectionName === "undefined"
    ) {
      let variant = "error";
      setSnackbarMessage("Please Enter Collection Name.");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
    } else if (
      collectionSymbol === "" ||
      collectionSymbol === undefined ||
      collectionSymbol === null ||
      collectionSymbol === "undefined"
    ) {
      let variant = "error";
      setSnackbarMessage("Please Enter Collection Symbol.");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
    } else if (
      collectionDescription === "" ||
      collectionDescription === undefined ||
      collectionDescription === null ||
      collectionDescription === "undefined"
    ) {
      let variant = "error";
      setSnackbarMessage("Please Add Collection Description.");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
    } else if (
      category === "" ||
      category === undefined ||
      category === null ||
      category === "undefined"
    ) {
      let variant = "error";
      setSnackbarMessage("Please Select a Category.");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
    } else if (royaltyFee <= 0 || royaltyFee >= 100) {
      let variant = "error";
      setSnackbarMessage("Royalty Fee range is from 0 to 100.");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
    } else {
      // setIsSaving(true);

      handleShowBackdrop();
      let collectionID;

      let fileData = new FormData();
      fileData.append("thumbnail", imageFile);
      fileData.append("name", collectionName);
      fileData.append("symbol", collectionSymbol);
      fileData.append("description", collectionDescription);
      fileData.append("royaltyFee", royaltyFee);
      fileData.append("contractType", nftType);
      fileData.append("marketplaceId", props.marketplaceId);
      fileData.append("category", category);

      let royaltyBlockchain = royaltyFee * 10000;

      if (nftType === "1155") {
        createNewCollection(fileData)
          .then(async (response) => {
            //console.log("collection creation response", response);
            setCollectionId(response.data.collection._id);
            collectionID = response.data.collection._id;

            let variant = "success";
            props.setSnackbarMessage("New Collection Created Successfully.");
            props.setSnackbarSeverity(variant);
            props.handleSnackbarOpen();
            setCollectionName("");
            setCollectionSymbol("");
            setCollectionDescription("");
            setFileURL(defaultProfile);
            setRoyaltyFee(0);
            setIsSaving(false);
            handleCloseBackdrop();
            setIsSaving(false);
            navigate("/dashboard/myCollection");
          })
          .catch((error) => {
            if (process.env.NODE_ENV === "development") {
              console.log(error);
              console.log(error.response);
            }

            let variant = "error";
            setSnackbarMessage("Unable to Create New Collection.");
            setSnackbarSeverity(variant);
            handleSnackbarOpen();
            handleCloseBackdrop();
            setCollectionName("");
            setCollectionSymbol("");
            setCollectionDescription("");
            setFileURL(defaultProfile);
            setIsSaving(false);
          });
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
          createNewCollection(fileData)
            .then(async (response) => {
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
                  updateCollectionTxHash(collectionID, {
                    txHash: response,
                  }).then(
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
                    setSnackbarMessage("User Canceled Transaction.");
                    setSnackbarSeverity(variant);
                    handleSnackbarOpen();
                    handleCloseBackdrop();
                    setIsSaving(false);
                  }
                })
                .on("receipt", (receipt) => {
                  console.log("receipt", receipt);
                  cloneContractAddress =
                    receipt.events.CloneCreated.returnValues.cloneAddress;
                  let variant = "success";
                  setSnackbarMessage("New Collection Created Successfully.");
                  setSnackbarSeverity(variant);
                  handleSnackbarOpen();
                  setApprovalModalShow(true);
                  setNftContractAddress(cloneContractAddress);
                  setCollectionName("");
                  setCollectionSymbol("");
                  setCollectionDescription("");
                  setFileURL(defaultProfile);
                  handleCloseBackdrop();
                });
            })
            .catch((error) => {
              if (process.env.NODE_ENV === "development") {
                console.log(error);
                console.log(error.response);
              }

              let variant = "error";
              setSnackbarMessage("Unable to Create New Collection.");
              setSnackbarSeverity(variant);
              handleSnackbarOpen();
              handleCloseBackdrop();
              setIsSaving(false);
            });
        }
      }
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
        fileData.append("marketplaceId", props.marketplaceId);

        let royaltyBlockchain = royaltyFee * 10000;

        createNewCollection(fileData)
          .then(async (response) => {
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
                  setSnackbarMessage(
                    "Sending transaction on blockchain to deploy a collection (1155)."
                  );
                  setSnackbarSeverity(variant);
                  handleSnackbarOpen();
                  updateCollectionTxHash(collectionID, {
                    txHash: response,
                  }).then(
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
                    setSnackbarMessage("User Canceled Transaction.");
                    setSnackbarSeverity(variant);
                    handleSnackbarOpen();
                    handleCloseBackdrop();
                    setIsSaving(false);
                  }
                })
                .on("receipt", (receipt) => {
                  console.log("receipt", receipt);
                  cloneContractAddress =
                    receipt.events.CloneCreated.returnValues.cloneAddress;
                  let variant = "success";
                  setSnackbarMessage("New Collection Created Successfully.");
                  setSnackbarSeverity(variant);
                  handleSnackbarOpen();

                  setApprovalModalShow(true);
                  setNftContractAddress(cloneContractAddress);
                  setCollectionName("");
                  setCollectionSymbol("");
                  setCollectionDescription("");
                  setFileURL(defaultProfile);
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
                  setSnackbarMessage(
                    "Sending transaction on blockchain to deploy a collection (ERC721)."
                  );
                  setSnackbarSeverity(variant);
                  handleSnackbarOpen();
                  updateCollectionTxHash(collectionID, {
                    txHash: response,
                  }).then(
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
                    setSnackbarMessage("User Canceled Transaction.");
                    setSnackbarSeverity(variant);
                    handleSnackbarOpen();
                    handleCloseBackdrop();
                    setIsSaving(false);
                  }
                })
                .on("receipt", (receipt) => {
                  console.log("receipt", receipt);
                  cloneContractAddress =
                    receipt.events.CloneCreated.returnValues.cloneAddress;
                  let variant = "success";
                  setSnackbarMessage("New Collection Created Successfully.");
                  setSnackbarSeverity(variant);
                  handleSnackbarOpen();
                  setApprovalModalShow(true);
                  setNftContractAddress(cloneContractAddress);
                  setCollectionName("");
                  setCollectionSymbol("");
                  setCollectionDescription("");
                  setFileURL(defaultProfile);
                  handleCloseBackdrop();
                });
            }
          })
          .catch((error) => {
            if (process.env.NODE_ENV === "development") {
              console.log(error);
              console.log(error.response);
            }

            let variant = "error";
            setSnackbarMessage("Unable to Create New Collection.");
            setSnackbarSeverity(variant);
            handleSnackbarOpen();
            handleCloseBackdrop();
            setIsSaving(false);
          });
      }
    } else {
      let variant = "error";
      setSnackbarMessage("Invalid Value Of Royalty Fee.");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
    }
  };

  const handleCloseImageCropModal = () => {
    setShowCropModal(false);
    setImageSrc("");
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      setIsUploadingCroppedImage(true);
      const imageNFT = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        imageCounter,
        0
      );
      setImageFile(imageNFT);
      setFileURL(URL.createObjectURL(imageNFT));
      setImageSrc("");
      setAspect(1 / 1);
      setIsUploadingCroppedImage(false);
      setShowCropModal(false);
      setImageCounter(imageCounter + 1);
      setSnackbarMessage("Image Uploaded Succesfully");
      setSnackbarSeverity("success");
    } catch (e) {
      console.log("Error: ", e);
    }
  })

  let onChangeFile = (e) => {
    let file = e.target.files[0];
    if (file) {
      setCropShape("square");
      setAspect(1 / 1);
      setImageSrc(URL.createObjectURL(e.target.files[0]));
      setShowCropModal(true);
    }
    // setImageFile(e.target.files[0]);
    // setFileURL(URL.createObjectURL(e.target.files[0]));
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

    approveCollection(approvalData)
      .then((response) => {
        console.log("Response from approval of Fixed Price: ", response);
        let variant = "success";
        setSnackbarMessage("Collection Approved For Fixed Price Successfully.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
        setIsFixedPriceApproved(true);
        setApprovingFixedPrice(false);
        setApprovalFlag(false);
      })
      .catch((error) => {
        let variant = "error";
        setSnackbarMessage("Unable to approve collection.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
        console.log("Err from approval Fixed-price: ", error);
        console.log("Err response from approval Fixed-price: ", error.response);
        setApprovingFixedPrice(false);
        setApprovalFlag(false);
      });
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
            setSnackbarMessage("User Canceled Transaction.");
            setSnackbarSeverity(variant);
            handleSnackbarOpen();
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

          approveCollection(approvalData)
            .then((response) => {
              console.log("Response from Auction approval: ", response);
              let variant = "success";
              setSnackbarMessage(
                "Collection Approved For Auction Successfully."
              );
              setSnackbarSeverity(variant);
              handleSnackbarOpen();
              setIsAuctionApproved(true);
              setApprovingAuction(false);
              setApprovalFlag(false);
            })
            .catch((error) => {
              let variant = "error";
              setSnackbarMessage("Unable to approve collection.");
              setSnackbarSeverity(variant);
              handleSnackbarOpen();
              console.log("Err from auction approval: ", error);
              console.log(
                "Err response from auction approval: ",
                error.response
              );
              setApprovingAuction(false);
              setApprovalFlag(false);
            });
        });
    }
  };
  let handleDoneButton = () => {
    if (isFixedPriceApproved === false) {
      let variant = "error";
      setSnackbarMessage("Approve For Fixed Price First.");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
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
                <ImageCropModal
                  show={showCropModal}
                  handleClose={handleCloseImageCropModal}
                  crop={crop}
                  setCrop={setCrop}
                  onCropComplete={onCropComplete}
                  imageSrc={imageSrc}
                  uploadImage={showCroppedImage}
                  isUploadingCroppedImage={isUploadingCroppedImage}
                  zoom={zoom}
                  setZoom={setZoom}
                  aspect={aspect}
                  cropShape={cropShape}
                />
                <UploadFile
                  fileURL={fileURL}
                  isUploading={isUploadingIPFS}
                  changeFile={onChangeFile}
                  class="co-12 col-md-auto profile-img mr-3"
                  accept=".png,.jpg,.jpeg,.gif"
                  inputId="uploadPreviewImg"
                />
                <div className="form-group newNftFields">
                  <Select
                    label="Collection Name"
                    values={collectionName}
                    placeholder="Enter Name of Collection"
                    setValue={setCollectionName}
                  />
                  <Select
                    label="Collection Symbol"
                    values={collectionSymbol}
                    placeholder="Enter Symbol of Collection"
                    setValue={setCollectionSymbol}
                  />
                  <SelectDescription
                    label="Collection Description"
                    values={collectionDescription}
                    placeholder="Enter Description of Collection"
                    setDescription={setCollectionDescription}
                  />
                  <AutocompleteAddNft
                    label="Select Category"
                    options={categoriesList}
                    placeholder={"Select Category"}
                    onChange={(e, newValue) => {
                      if (newValue == "") {
                        setCategory();
                      } else {
                        console.log("New value is: ", newValue);
                        setCategory(newValue);
                      }
                    }}
                    type="category"
                  />
                  <SelectRoyaltyFee
                    RoyaltyFeeText={RoyaltyFeeText}
                    values={royaltyFee}
                    setRoyaltyFee={setRoyaltyFee}
                  />

                  <SelectNFTAndSaleType
                    label="Select NFT Type"
                    onChangeWorkInProgress={() => {
                      console.log("721workinf");
                      setWorkProgressModalShow(true);
                    }}
                    onChange={() => {
                      console.log("1155working");
                      setNftType("1155");
                    }}
                    type={nftType}
                    radioType="nft"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <SubmitButton
          label="Create Collection"
          isSaving={isSaving}
          version={version}
          handleSubmitEvent={handleSubmitEvent}
          handleSubmitEventMetamask={handleSubmitEventMetamask}
        />
      </div>
      <NetworkErrorModal
        show={show}
        handleClose={handleClose}
        network={network}
      />
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
      <NotificationSnackbar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </div>
  );
}

export default NewCollection;
