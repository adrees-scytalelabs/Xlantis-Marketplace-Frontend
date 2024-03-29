import { ethers } from "ethers";
import Cookies from "js-cookie";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Web3 from "web3";
import {
  addNFTToBatch,
  createNewBatch,
  deleteBatch,
  deleteNFTFromBatch,
  getAdminProfileDetails,
  getAdminsDefaultTemplates,
  getCollections,
  getSavedTemplates,
  getTemplate,
  lazyMintNFTs,
  mintBatchNFTs,
  sendVoucherForLazyMint,
  updateCollectionIdInBatch,
  updateNFT,
  uploadImage,
  batchMintFinalize,
  uploadImageToIpfs,
} from "../../../../components/API/AxiosInterceptor";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import RemoveNft from "../../../../components/Cards/RemoveNft";
import ipfs from "../../../../components/IPFS/ipfs";
import { defaultProfile } from "../../../../components/ImageURLs/URLs";
import ChangeCollectionConfirmationModal from "../../../../components/Modals/ChangeCollectionConfirmationModal";
import NFTDetailModal from "../../../../components/Modals/NFTDetailModal";
import NFTEditModal from "../../../../components/Modals/NFTEditModal";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import NewTamplateModal from "../../../../components/Modals/NewTamplateModal";
import WorkInProgressModal from "../../../../components/Modals/WorkInProgressModal";
import NewNftSelectNft from "../../../../components/Radio/NewNftSelectNft";
import NewNftSelectSupply from "../../../../components/Radio/NewNftSelectSupply";
import NewNftTemplates from "../../../../components/Select/NewNftTemplates";
import NotificationSnackbar from "../../../../components/Snackbar/NotificationSnackbar";
import NFTUpload from "../../../../components/Upload/NFTUpload";
import Factory1155 from "../../../../components/blockchain/Abis/Factory1155.json";
import AddNftQueue from "../../../../components/buttons/AddNftQueue";
import BatchCreateNft from "../../../../components/buttons/BatchCreateNft";
import { getNewNftCollection } from "../../../../redux/getNewNftCollectionSlice";
import getCroppedImg from "../../../../components/Utils/Crop";
import ImageCropModal from "../../../../components/Modals/ImageCropModal";
import StripeAccountMessageCard from "../../../../components/MessageCards/StripeAccountMessageCard";

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    // backgroundColor: theme.palette.background.paper,
  },

  card: {
    minWidth: 250,
  },
  media: {
    paddingTop: "100%",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  nftInput: {
    fontFamily: "orbitron",
  },
  tooltip: {
    fontSize: "16px",
  },
};

function NewNFT(props) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const navigate = useNavigate();
  const [network, setNetwork] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [open, setOpen] = useState(false);
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };

  const [defaultTemplates, setDefaultTemplates] = useState({
    name: "",
    properties: [],
  });
  const [templateData, setTemplateData] = useState([]);
  const [standardTemplates, setStandardTemplates] = useState([]);

  const [extractedDataProps, setExtractedDataProps] = useState(null);
  const [newTemplateModalShow, setNewTemplateModalShow] = useState(false);
  const [template, setTemplate] = useState("default");

  let handleNewTemplateModalClose = () => {
    setNewTemplateModalShow(false);
    setTemplate("default");
    getDefaultTemplate();
    getSavedTemplate();
  };

  const handleStandardSelectTemplate = (e) => {
    setExtractedDataProps(null);
    if (standardTemplates) {
      for (let i = 0; i < standardTemplates.length; i++) {
        if (e.target.value === standardTemplates[i].name) {
          handleSetProperties(standardTemplates[i].properties);
          let dynamicField = [];
          for (let p = 0; p < standardTemplates[i].properties.length; p++) {
            dynamicField.push({
              key: standardTemplates[i].properties[p].key,
              value: "",
              type: standardTemplates[i].properties[p].type,
              id: standardTemplates[i].properties[p]._id,
            });

            setExtractedDataProps(dynamicField);
          }
        }
      }
      if (e.target.value === "none") setExtractedDataProps(null);
    }
  };

  const [tokenList, setTokenList] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState("");
  const [ipfsHash, setIpfsHash] = useState(null);
  const [description, setDescription] = useState("");
  const [properties, setProperties] = useState([{ key: "", value: "" }]);

  const [supplyType, setSupplyType] = useState("Single");
  const [nftContractAddress, setNftContractAddress] = useState("");

  const [collectionTypes, setCollectionTypes] = useState([]);
  const [collection, setCollection] = useState("");

  const [tokenSupply, setTokenSupply] = useState(1);
  const [isUploadingIPFS, setIsUploadingIPFS] = useState(false);
  const [rarity, setRarity] = useState("");
  const [image, setImage] = useState(defaultProfile);
  const [collectionId, setCollectionId] = useState("");
  const [nftURI, setNftURI] = useState("");
  const [metaDataURI, setMetaDataURI] = useState("");
  const [imageType, setImageType] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [nftDetail, setNftDetail] = useState({});
  const [editObjectIndex, setEditObjectIndex] = useState(0);
  const [batchId, setBatchId] = useState("");
  const [changeCollection, setChangeCollection] = useState(false);
  const [changeCollectionList, setChangeCollectionList] = useState([]);
  const [nftId, setNftId] = useState("");
  const [isUploadingData, setIsUploadingData] = useState(false);
  const [isGlbFile, setIsGlbFile] = useState(false);
  const [previewImageURI, setPreviewImageURI] = useState("");
  const [isUploadingPreview, setIsUploadingPreview] = useState(false);
  const [isMp3File, setIsMp3File] = useState(false);
  const [contractType, setContractType] = useState("");
  const [NFTType, setNFTType] = useState("1155");
  const [workProgressModalShow, setWorkProgressModalShow] = useState(false);
  const [useEffectLoader, setUseEffectLoader] = useState(false);
  const [adminData, setAdminData] = useState({});

  const [previewImage, setPreviewImage] = useState(defaultProfile);
  const [versionB, setVersionB] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(1 / 1);
  const [showCropModal, setShowCropModal] = useState(false);
  const [isUploadingCroppedImage, setIsUploadingCroppedImage] = useState();
  const [imageCounter, setImageCounter] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropShape, setCropShape] = useState("round");
  const [isGIFFile, setIsGIFFile] = useState(false);
  const [imageWithoutCrop,setImageWithoutCrop] = useState();

  const { collectionData, loading } = useSelector(
    (store) => store.NewNftCollection
  );
  const { defaultTemplate, loadingDefault } = useSelector(
    (store) => store.defaultTemplate
  );
  const { templates, propertiesLoading } = useSelector(
    (store) => store.newNftProperties
  );
  const dispatch = useDispatch();

  let getCollectionsUsingType = (collectionType) => {
    getCollections(collectionType, props.marketplaceId)
      .then((response) => {
        console.log("Response from getting collections: ", response);
        if (collectionType === "1155") {
          setChangeCollectionList(response.data.collectionData);
        }
        setCollectionTypes(response.data.collectionData);
      })
      .catch((error) => {
        console.log("Error from getting collections: ", error);
      });
  };

  useEffect(() => {
    getCollectionsUsingType(NFTType);
  }, [NFTType]);

  useEffect(() => {
    getAdminProfile();
  }, []);

  const getAdminProfile = () => {
    getAdminProfileDetails()
      .then((response) => {
        // console.log("Response from getting admin profile: ", response);
        setAdminData(response.data.userData);
      })
      .catch((error) => {
        console.log("Error from getting admin profile: ", error);
      });
  };

  const handleSetProperties = (availableProperties) => {
    let prop = [];

    if (availableProperties === undefined || availableProperties === null) {
      setProperties([{ key: "", value: "" }]);
    } else {
      availableProperties &&
        availableProperties.map((property) => {
          let val;
          if (property.type === "boolean") {
            val = null;
          } else if (property.type === "number") {
            val = 0;
          } else {
            val = "";
          }
          let newData = { key: property.key, value: val };
          prop.push(newData);
        });
      setProperties(prop);
    }
  };

  const getDefaultTemplate = async () => {
    await getAdminsDefaultTemplates()
      .then((response) => {
        console.log("Response from getting default templates: ", response);
        setDefaultTemplates(response.data.defaultTemplate);
        if (response.data.defaultTemplate?.properties) {
          handleSetProperties(response.data.defaultTemplate.properties);
        }
      })
      .catch((error) => {
        console.log("Error from getting default templates: ", error);
      });
  };

  const getStandardTemplates = async (role) => {
    await getTemplate(role)
      .then((response) => {
        // console.log("response from getting standard Templates: ", response);
        setStandardTemplates(response.data.templates);
      })
      .catch((error) => {
        console.log("Error from getting standard Templates: ", error);
      });
  };

  const getSavedTemplate = async () => {
    await getSavedTemplates()
      .then((response) => {
        // console.log("Response from getting saved templates: ", response);
        setTemplateData(response.data.templates);
      })
      .catch((error) => {
        console.log("Error from getting saved templates: ", error);
      });
  };

  useEffect(() => {
    getDefaultTemplate();
    getStandardTemplates("super-admin");
    getSavedTemplate();
    // getSavedTemplate();
  }, [useEffectLoader]);

  // useEffect(() => {
  //   console.log("In use effect of properties loading");
  //   getSavedTemplate("admin");
  //   // getSavedTemplate("super-admin");
  // }, [propertiesLoading]);

  let getDataFromCookies = () => {
    let data = Cookies.get("NFT-Detail");
    console.log("NFT-Detail: ", data);
    let batchMintId = Cookies.get("Batch-ID");
    if (
      (data && batchMintId) !== null &&
      (typeof data || typeof batchMintId) !== "undefined" &&
      (data && batchMintId) !== ""
    ) {
      setTokenList(JSON.parse(data));
      setBatchId(batchMintId);
      setCollection(JSON.parse(data)[0].collectiontitle);
      console.log("Collection title:", JSON.parse(data)[0].collectiontitle);
      setCollectionId(JSON.parse(data)[0].collectionId);
      setNFTType("1155");
    }
  };

  useEffect(() => {
    setVersionB(Cookies.get("Version"));
    getDataFromCookies();

    props.setActiveTab({
      dashboard: "",
      newCollection: "",
      myCollections: "",
      newNFT: "active",
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

  const handleSubmitEvent = async (event) => {
    event.preventDefault();
    setIsSaving(true);

    if (tokenList.length === 0) {
      let variant = "error";
      setSnackbarMessage("Add Nfts to Queue before Creation.");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
      setIsSaving(false);
    } else {
      batchMintFinalize(Cookies.get("Batch-ID"))
        .then((response) => {
          let variant = "success";
          props.setSnackbarMessage("Batch Created Successfully.");
          props.setSnackbarSeverity(variant);
          props.handleSnackbarOpen();
          Cookies.remove("Batch-ID");
          Cookies.remove("NFT-Detail");
          setTokenList([]);
          setImageType("");
          setIpfsHash("");
          setImage(defaultProfile);
          setName("");
          setDescription("");
          setRarity("");
          setTokenSupply(1);
          setSupplyType("Single");
          setCollectionId("");
          handleCloseBackdrop();
          setIsSaving(false);
          navigate(`/dashboard/collection/nfts/${collectionId}`);
        })
        .catch((error) => {
          console.log("Error in batch mint finalize", error.response);
          setIsSaving(false);
        });
    }
  };

  const handleSubmitEventMetamask = async (event) => {
    event.preventDefault();
    setIsSaving(true);

    if (tokenList.length === 0) {
      let variant = "error";
      setSnackbarMessage("Add Nfts to Queue before Creation.");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
      setIsSaving(false);
    } else {
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
        const address = nftContractAddress;
        const abi = Factory1155;
        let totalImages = tokenList.length;
        let AmountofNFTs = [];
        let IPFsURIs = [];
        for (let i = 0; i < tokenList.length; i++) {
          AmountofNFTs.push(parseInt(tokenList[i].tokensupply));
          IPFsURIs.push(tokenList[i].nftURI);
        }
        var myContractInstance = await new web3.eth.Contract(abi, address);
        await myContractInstance.methods
          .mintBatch(accounts[0], AmountofNFTs, IPFsURIs)
          .send({ from: accounts[0] }, (err, response) => {
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
            Cookies.remove("NFT-Detail");
            let ids = receipt.events.TransferBatch.returnValues.ids;

            let data = {
              blockchainIds: ids,
            };

            mintBatchNFTs(batchId, data)
              .then((response) => {
                let variant = "success";
                setSnackbarMessage("Nfts Created Successfully.");
                setSnackbarSeverity(variant);
                handleSnackbarOpen();
                Cookies.remove("Batch-ID");
                Cookies.remove("NFT-Detail");
                setTokenList([]);
                setImageType("");
                setIpfsHash("");
                setImage(defaultProfile);
                setName("");
                setDescription("");
                setRarity("");
                setTokenSupply(1);
                setCollection("");
                setSupplyType("Single");
                setCollectionId("");
                handleCloseBackdrop();
                setIsSaving(false);
              })
              .catch((error) => {
                if (process.env.NODE_ENV === "development") {
                  console.log(error);
                  console.log(error.response);
                }

                let variant = "error";
                setSnackbarMessage("Unable to Create Nfts.");
                setSnackbarSeverity(variant);
                handleSnackbarOpen();

                handleCloseBackdrop();
                setIsSaving(false);
              });
          });
      }
    }
  };
  const handleRemoveClick = (index) => {
    if (tokenList.length === 1) {
      handleShowBackdrop();
      deleteBatch(batchId)
        .then((response) => {
          handleCloseBackdrop();
          Cookies.remove("NFT-Detail");
          Cookies.remove("Batch-ID");
          setTokenList([]);
          setBatchId("");

          // Setting collection to default values when removing all NFTs from queue
          setCollection("");
          setCollectionId("");
          setNftContractAddress("");
        })
        .catch((error) => {
          handleCloseBackdrop();
          console.log("Error on deleting response: ", error);
        });
    } else {
      handleShowBackdrop();
      deleteNFTFromBatch(tokenList[index].nftId)
        .then((response) => {
          handleCloseBackdrop();
          const list = [...tokenList];
          list.splice(index, 1);
          Cookies.remove("NFT-Detail");
          Cookies.set("NFT-Detail", list, {});
          setTokenList(list);
        })
        .catch((error) => {
          handleCloseBackdrop();
          console.log("Error for delete nft from batch: ", error);
        });
    }
  };

  function hasEmptyValue(obj) {
    return Object.values(obj).some((value) => value === null || value === "");
  }
  const uploadMetaDataToIPFS = async (reader, blob, dataIpfsHash) => {
    try {
      const arrayBuffer = await new Response(blob).arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const result = await ipfs.add(buffer);
      console.log("IPFS Upload Result: ", result.path);
      if (result) {
        const ipfsHash = result.path;
        dataIpfsHash = ipfsHash;
        console.log("IPFS Hash: ", ipfsHash);
        const ipfsMetaData = `https://ipfs.io/ipfs/${ipfsHash}`;
        console.log("link", `https://ipfs.io/ipfs/${ipfsHash}`);
        setMetaDataURI(ipfsMetaData);
      }
    } catch (error) {
      // Handle errors
      console.error("Error: ", error);
      let variant = "error";
      setSnackbarMessage("Unable to Upload Meta Data to IPFS.");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
      handleCloseBackdrop();
    }
  };
  const handleAddClick = async (e) => {
    e.preventDefault();
    if (image === defaultProfile) {
      let variant = "error";
      setSnackbarMessage("Please Upload Artwork Photo.");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
    } else if (name === "") {
      let variant = "error";
      setSnackbarMessage("Please Enter Artwork Name.");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
    } else if (description === "") {
      let variant = "error";
      setSnackbarMessage("Please Enter Artwork Description.");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
    } else if (properties.length === 0) {
      let variant = "error";
      setSnackbarMessage("Please add properties to continue");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
    } else if (properties.some((obj) => hasEmptyValue(obj))) {
      let variant = "error";
      setSnackbarMessage("Please Fill All Empty Value of properties");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
    } else if (
      tokenSupply === 0 ||
      tokenSupply === undefined ||
      tokenSupply === null
    ) {
      let variant = "error";
      setSnackbarMessage("Token Supply cannot be Empty.");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
    } else if (tokenSupply < 0) {
      let variant = "error";
      setSnackbarMessage("Token Supply cannot be Negative.");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
    } else if (collection === "") {
      let variant = "error";
      setSnackbarMessage("Please Enter Collection Name");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
    } else {
      let flagCheckPreviewImage = true;
      if (imageType === "mp3" || imageType === "glb" || imageType === "gltf") {
        if (
          previewImageURI === "" ||
          previewImageURI === undefined ||
          previewImageURI === null
        ) {
          flagCheckPreviewImage = false;
          let variant = "error";
          setSnackbarMessage("Please Upload Preview Image.");
          setSnackbarSeverity(variant);
          handleSnackbarOpen();
        }
      }
      if (flagCheckPreviewImage) {
        handleShowBackdrop();
        setIsUploadingData(true);
        let metaData = {
          name: name,
          description: description,
          image: nftURI,
          properties: properties,
          collection: { name: collection },
          creator: {
            address: adminData?.walletAddress,
            name: adminData?.username,
            profileImage: adminData?.imageURL,
          },
        };
        const reader = new window.FileReader();
        const blob = new Blob([JSON.stringify(metaData, null, 2)], {
          type: "application/json",
        });
        var dataIpfsHash;
        await uploadMetaDataToIPFS(reader, blob, dataIpfsHash);
        let propertiesObject = {};
        properties.map((property) => {
          propertiesObject[property.key] = property.value;
        });
        let data = {
          collectionId: collectionId,
          title: name,
          description: description,
          nftURI: image,
          previewImageURI: previewImageURI,
          metadataURI: nftURI,
          nftFormat: imageType,
          totalSupply: tokenSupply,
          supplyType: supplyType,
          properties: propertiesObject,
          marketplaceId: props.marketplaceId,
        };

        if (previewImageURI !== "") {
          data["previewImageURI"] = previewImageURI;
        }

        if (batchId === "") {
          createNewBatch(data)
            .then((response) => {
              setBatchId(response.data.batchId);
              setNftId(response.data.nftId);
              setTokenList([
                ...tokenList,
                {
                  collectionId: collectionId,
                  title: name,
                  description: description,
                  nftURI: image,
                  previewImageURI: previewImageURI,
                  nftFormat: imageType,
                  properties: properties,
                  ipfsHash: ipfsHash,
                  totalSupply: tokenSupply,
                  collectiontitle: collection,
                  supplytype: supplyType,

                  nftId: response.data.nftId,
                },
              ]);

              let cookieData = [
                ...tokenList,
                {
                  properties: properties,
                  ipfsHash: ipfsHash,
                  nftURI: image,
                  title: name,
                  description: description,
                  totalSupply: tokenSupply,
                  collectiontitle: collection,
                  supplytype: supplyType,
                  collectionId: collectionId,
                  marketplaceId: props.marketplaceId,
                  nftId: response.data.nftId,
                  previewImageURI: previewImageURI,
                  nftFormat: imageType,
                },
              ];

              Cookies.set("Batch-ID", response.data.batchId, {});

              Cookies.set("NFT-Detail", cookieData, {});
            })
            .catch((error) => {
              console.log("Error on batch mint: ", error.response);
            });
        } else {
          data["batchId"] = batchId;
          addNFTToBatch(data)
            .then((response) => {
              setNftId(response.data.nftId);
              setTokenList([
                ...tokenList,
                {
                  properties: properties,
                  ipfsHash: ipfsHash,
                  nftURI: image,
                  title: name,
                  description: description,
                  totalSupply: tokenSupply,
                  collectiontitle: collection,
                  supplytype: supplyType,
                  collectionId: collectionId,
                  nftId: response.data.nftId,
                  marketplaceId: props.marketplaceId,
                  previewImageURI: previewImageURI,
                },
              ]);

              let cookieData = [
                ...tokenList,
                {
                  properties: properties,
                  ipfsHash: ipfsHash,
                  nftURI: image,
                  title: name,
                  description: description,
                  totalSupply: tokenSupply,
                  collectiontitle: collection,
                  supplytype: supplyType,
                  collectionId: collectionId,
                  marketplaceId: props.marketplaceId,
                  nftId: response.data.nftId,
                  previewImageURI: previewImageURI,
                },
              ];

              Cookies.remove("NFT-Detail");

              Cookies.set("NFT-Detail", cookieData, {});
            })
            .catch((error) => {
              console.log("Batch minting into existing batch error: ", error);
            });
        }

        //SETTING STATES TO DEFAULT VALUES

        // setProperties([{ key: "", value: "" }]);
        handleSetProperties(defaultTemplates?.properties);
        setNftId("");
        setNftURI("");
        setPreviewImageURI("");
        setIpfsHash("");
        setImage(defaultProfile);
        setName("");
        setDescription("");
        setRarity("");
        setTokenSupply(1);
        setSupplyType("Single");
        setTemplate("default");
        setIpfsHash("");
        setIsGlbFile(false);
        setIsMp3File(false);
        let variant = "success";
        setSnackbarMessage("Meta Data Uploaded to IPFS.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
        setSnackbarMessage("NFT Has Been Added to Batch");
        setSnackbarSeverity("success");
        handleSnackbarOpen();
        setIsUploadingData(false);
        handleCloseBackdrop();
      }
    }
  };

  const handleCloseImageCropModal = () => {
    setShowCropModal(false);
    setIsUploadingIPFS(false);
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
      const nftFormData = new FormData();
      nftFormData.append("image", imageWithoutCrop);
      //uploading image on IPFS using backend endpoint
      uploadImageToIpfs(nftFormData)
        .then((response) => {
          console.log("Response from uploading image on IPFS: ", response);
          setIpfsHash(response.data.IpfsData.IpfsHash);
          setNftURI(`https://ipfs.io/ipfs/${response.data.IpfsData.IpfsHash}`);
          console.log(
            "Hash of NFT: ",
            `https://ipfs.io/ipfs/${response.data.IpfsData.IpfsHash}`
          );
          let variant = "success";
          setSnackbarMessage("Image Uploaded to IPFS.");
          setSnackbarSeverity(variant);
          handleSnackbarOpen();
          if (imageType === "glb") {
            setIsGlbFile(true);
          }
        })
        .catch((error) => {
          console.log("err", error);
          setIsUploadingIPFS(false);
          let variant = "error";
          setSnackbarMessage("Unable to Upload Image to IPFS.");
          setSnackbarSeverity(variant);
          handleSnackbarOpen();
          return;
        });
      let fileData = new FormData();
      fileData.append("image", imageNFT);
      uploadImage(fileData)
        .then((response) => {
          console.log("response.data.url", response.data.url);
          setImage(response.data.url);
          setIsUploadingIPFS(false);
          setImageSrc("");
          setAspect(1 / 1);
          setIsUploadingCroppedImage(false);
          setShowCropModal(false);
          setImageCounter(imageCounter + 1);
          setSnackbarMessage("Image Uploaded Succesfully");
          setSnackbarSeverity("success");
          handleSnackbarOpen();
        })
        .catch((error) => {
          if (process.env.NODE_ENV === "development") {
            console.log(error);
            console.log(error.response);
          }
          setIsUploadingIPFS(false);
          let variant = "error";
          setSnackbarMessage("Unable to Upload Image.");
          setSnackbarSeverity(variant);
          handleSnackbarOpen();
        });
    } catch (e) {
      console.log("Error: ", e);
    }
  });

  let onChangeFile = (e) => {
    if (e.target.files[0]) {
      setIsUploadingIPFS(true);
      setIsGlbFile(false);
      setIsMp3File(false);
      setIsGIFFile(false);
      setNftURI("");

      let imageNFT = e.target.files[0];
      let typeImage;
      const acceptedImageFormats = ["png", "jpg", "jpeg"];
      const fileExtension = imageNFT.name.split(".").pop();

      // if (e.target.files[0].name.includes(".glb")) {
      //   typeImage = "glb";
      //   setImageType("glb");
      //   // setImage(e.target.files[0]);
      //   setImage(defaultProfile);
      // } else
      if (
        e.target.files[0].type.split("/")[1] === "mp3" ||
        e.target.files[0].name.includes(".mp3")
      ) {
        typeImage = "mp3";
        setIsMp3File(true);
        setImageType("mp3");
        // setImage(e.target.files[0]);
        setImage(defaultProfile);
      } else if (e.target.files[0].type.split("/")[1] === "gif") {
        typeImage = "gif";
        setImageType("gif");
        setIsGIFFile(true);
        setIsUploadingIPFS(true);
      } else if (acceptedImageFormats.includes(fileExtension)) {
        console.log("File Extension : ", fileExtension);
        setImageType(e.target.files[0].type.split("/")[1]);
        typeImage = e.target.files[0].type.split("/")[1];
        // setImage(e.target.files[0]);

        if (previewImageURI !== "") {
          setPreviewImageURI("");
          setPreviewImage(defaultProfile);
        }

        setCropShape("square");
        setIsUploadingIPFS(true);
        setAspect(1 / 1);
        setImageSrc(URL.createObjectURL(e.target.files[0]));
        setShowCropModal(true);
      } else {
        setSnackbarMessage("Unsupported file format");
        setSnackbarSeverity("error");
        handleSnackbarOpen();
        setIsUploadingIPFS(false);
        return;
      }
      setImageWithoutCrop(e.target.files[0]);
    }
  };

  let handleOpenNFTDetailModal = (nftObject) => {
    setNftDetail(nftObject);
    setOpenDialog(true);
  };

  let handleCloseNFTDetailModal = () => {
    setOpenDialog(false);
  };

  let handleEdit = () => {
    setOpenDialog(false);
    setOpenEditModal(true);
  };

  let handleEditClose = () => {
    setOpenEditModal(false);
  };

  let onUpdateEditModal = (obj) => {
    setIsUploadingData(true);
    handleShowBackdrop();
    let data = [...tokenList];
    data[editObjectIndex] = obj;

    let propertiesObject = {};
    data[editObjectIndex].properties.map((property) => {
      propertiesObject[property.key] = property.value;
    });

    let metaData = {
      name: data[editObjectIndex].title,
      description: data[editObjectIndex].description,
      image: data[editObjectIndex].nftURI,
    };
    const reader = new window.FileReader();
    const blob = new Blob([JSON.stringify(metaData, null, 2)], {
      type: "application/json",
    });
    reader.readAsArrayBuffer(blob);
    reader.onloadend = () => {
      ipfs.add(Buffer(reader.result), async (err, result) => {
        if (err) {
          console.log("Error: ", err);
          setIsUploadingData(false);
          let variant = "error";
          setSnackbarMessage("Unable to Upload Meta Data to IPFS.");
          setSnackbarSeverity(variant);
          handleSnackbarOpen();
          return;
        }
        setMetaDataURI(`https://ipfs.io/ipfs/${result[0].hash}`);

        let updatedObject = {
          title: data[editObjectIndex].title,
          description: data[editObjectIndex].description,
          tokenSupply: data[editObjectIndex].tokensupply,
          supplyType: data[editObjectIndex].supplytype,
          properties: propertiesObject,
          nftFormat: data[editObjectIndex].nftFormat,
          metadataURI: data[editObjectIndex].metadataURI,
          nftURI: data[editObjectIndex].nftURI,
        };

        Cookies.remove("NFT-Detail");

        Cookies.set("NFT-Detail", data, {});

        updateNFT(data[editObjectIndex].nftId, updatedObject)
          .then((response) => {
            //  console.log("Response of updated nft: ", response);
          })
          .catch((error) => {
            console.log("Error of updated nft: ", error);
          });

        setTokenList(data);
        setIsUploadingData(false);
        setOpenEditModal(false);
        handleCloseBackdrop();

        let variant = "success";
        setSnackbarMessage("Meta Data Uploaded to IPFS.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
      });
    };
  };

  let handleChangeCollectionClose = () => {
    setChangeCollection(false);
  };

  let handleChangeCollectionOpen = () => {
    setChangeCollection(true);
  };

  let updateChangeCollection = (collectionObj) => {
    console.log("Collection obj: ", collectionObj);
    setCollection(collectionObj.name);
    setCollectionId(collectionObj._id);
    setNftContractAddress(collectionObj.nftContractAddress);
    tokenList.map((token) => {
      token.collectiontitle = collectionObj.name;
      token.collectionId = collectionObj._id;
    });

    let updatedCollectionID = {
      batchId: batchId,
      collectionId: collectionObj._id,
    };
    updateCollectionIdInBatch(updatedCollectionID)
      .then((response) => {
        // console.log("Response after updating collection id: ", response);
      })
      .catch((error) => {
        console.log("Error on updating collection id: ", error);
      });
    handleChangeCollectionClose();
  };

  let onChangePreviewImage = (e) => {
    setIsUploadingPreview(true);
    setPreviewImage(e.target.files[0]);
    let typeImage;

    console.log("Image Type: ", typeImage);
    console.log("e.target.files[0]", e.target.files[0]);

    const previewFormData = new FormData();
    previewFormData.append("image", e.target.files[0]);

    // uploading NFT on ipfs using backend endpoint
    uploadImageToIpfs(previewFormData)
      .then((response) => {
        console.log("HASH", response.data.IpfsData.IpfsHash);
        setPreviewImageURI(
          `https://ipfs.io/ipfs/${response.data.IpfsData.IpfsHash}`
        );
        let variant = "success";
        setSnackbarMessage("Preview Image Uploaded to IPFS.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
        setIsUploadingPreview(false);
      })
      .catch((error) => {
        console.log("err", error);
        setIsUploadingPreview(false);
        let variant = "error";
        setSnackbarMessage("Unable to Upload Preview Image to IPFS .");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
        return;
      });
  };

  let handleFreeMint = async (e) => {
    e.preventDefault();
    if (image === defaultProfile) {
      let variant = "error";
      setSnackbarMessage("Please Upload Artwork Photo.");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
    } else if (name === "") {
      let variant = "error";
      setSnackbarMessage("Please Enter Artwork Name.");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
    } else if (description === "") {
      let variant = "error";
      setSnackbarMessage("Please Enter Artwork Description.");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
    } else if (collection === "") {
      let variant = "error";
      setSnackbarMessage("Please Enter Collection Name.");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
    } else if (
      image !== defaultProfile &&
      (imageType === "glb" || imageType === "mp3") &&
      previewImage === defaultProfile
    ) {
      let variant = "error";
      setSnackbarMessage("Please Upload Preview Image.");
      setSnackbarSeverity(variant);
      handleSnackbarOpen();
    } else {
      handleShowBackdrop();
      await loadWeb3();

      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      const network = await web3.eth.net.getNetworkType();
      if (network !== "private") {
        setNetwork(network);
        setIsSaving(false);
        handleShow();
      } else {
        let lazyMintId;
        let nftIdHex;
        let propertiesObject = {};
        properties.map((property) => {
          propertiesObject[property.key] = property.value;
        });
        console.log("Properties are: ", propertiesObject);

        let nftData = {
          title: name,
          description: description,
          collectionId: collectionId,
          nftURI: nftURI,
          metadataURI: nftURI,
          nftFormat: imageType,
          properties: propertiesObject,
        };

        if (
          imageType === "glb" ||
          imageType === "gltf" ||
          imageType === "mp3"
        ) {
          nftData["previewImageURI"] = previewImageURI;
        }

        console.log("NFT Data: ", nftData);
        await lazyMintNFTs(nftData)
          .then(async (response) => {
            console.log("Response from backend on free mint: ", response);
            lazyMintId = response.data.nftObjectId;
            nftIdHex = response.data.nftId;
          })
          .catch((error) => {
            console.log("Err from backend on free mint: ", error);
            console.log(
              "Err response from backend on free mint: ",
              error.response
            );
          });

        let signature = await signTypedData(nftIdHex, nftURI);
        let voucherData = {
          nftId: lazyMintId,
          signature: signature,
        };

        await sendVoucherForLazyMint(voucherData)
          .then((response) => {
            console.log("Response from sending voucher sign: ", response);
          })
          .catch((error) => {
            console.log("Err from sending voucher sign: ", error);
            console.log(
              "Err response from sending voucher sign: ",
              error.response
            );
          });
        // setProperties([{ key: "", value: "" }]);
        handleSetProperties(defaultTemplates.properties);
        setNftId("");
        setNftURI("");
        setPreviewImageURI("");
        setIpfsHash("");
        setImage(defaultProfile);
        setName("");
        setDescription("");
        setRarity("");
        setTokenSupply(1);
        setSupplyType("Single");
        setIpfsHash("");
        setIsGlbFile(false);
        setIsMp3File(false);
        setCollection("");
        setCollectionId("");
        handleCloseBackdrop();
        let variant = "success";
        setSnackbarMessage("NFT free minted successfully.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
      }
    }
  };

  let signTypedData = async (tokenId, tokenURI) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    console.log("Provider: ", provider);

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Address: ", await signer.getAddress());

    console.log("Signer: ", signer);

    const SIGNING_DOMAIN_NAME = "RobotDrop";
    const SIGNING_DOMAIN_VERSION = "1";

    const domain = {
      name: SIGNING_DOMAIN_NAME,
      version: SIGNING_DOMAIN_VERSION,
      verifyingContract: nftContractAddress,
      chainId: 80001,
    };

    const voucher = {
      tokenId: parseInt(tokenId),
      uri: tokenURI,
    };
    console.log("tokenId", tokenId);
    const types = {
      NftVoucher: [
        { name: "tokenId", type: "uint256" },
        { name: "uri", type: "string" },
      ],
    };

    let signature;

    await signer
      ._signTypedData(domain, types, voucher)
      .then((value) => {
        console.log("Value: ", value);
        signature = value;
      })
      .catch((error) => {
        console.log("Error: ", error);
        let variant = "error";
        setSnackbarMessage("Error signing.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
      });
    console.log("Signature: ", signature);

    if (signature) {
      return signature;
    } else {
      console.log("Signature issue");
    }
  };

  return (
    <div className="backgroundDefault">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">New NFT</h3>
            <ul className="breadcrumb">
              <Link to={`/dashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <li className="breadcrumb-item active">New NFT</li>
            </ul>
          </div>
        </div>
      </div>
      {props.isStripeLogin ? null : (
        <StripeAccountMessageCard
          getOnboardingLink={props.getOnboardingLink}
          setIsStripeLogin={props.setIsStripeLogin}
        />
      )}
      <div className="card-body px-0">
        <div className="row no-gutters">
          <div className="col-md-12 col-lg-6">
            <form>
              <div className="form-group">
                <label className="mb-0 p-1">Select Artwork</label>
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
                <NFTUpload
                  image={image}
                  name={name}
                  isMp3File={isMp3File}
                  onChangePreviewImage={onChangePreviewImage}
                  isGlbFile={isGlbFile}
                  nftURI={image}
                  isUploadingIPFS={isUploadingIPFS}
                  onChangeFile={onChangeFile}
                  previewImageURI={previewImageURI}
                  isUploadingPreview={isUploadingPreview}
                  isGIFFile={isGIFFile}
                />
                <div className="form-group newNftFields">
                  <label>Title</label>
                  <div className="form-group newNftWrapper">
                    <input
                      type="text"
                      required
                      value={name}
                      placeholder="Enter Name of NFT"
                      className="form-control newNftInput"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>

                  <label>Description</label>
                  <div className="form-group newNftWrapper">
                    <textarea
                      type="text"
                      required
                      rows="4"
                      value={description}
                      placeholder="Enter Description of NFT"
                      className="form-control newNftInput"
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </div>
                  <NewNftTemplates
                    setProperties={setProperties}
                    properties={properties}
                    standardTemplates={standardTemplates}
                    handleStandardSelectTemplate={handleStandardSelectTemplate}
                    handleSetProperties={handleSetProperties}
                    extractedDataProps={extractedDataProps}
                    setExtractedDataProps={setExtractedDataProps}
                    setNewTemplateModalShow={setNewTemplateModalShow}
                    newTemplateModalShow={newTemplateModalShow}
                    setTemplate={setTemplate}
                    template={template}
                    setTemplateData={setTemplateData}
                    templateData={templateData}
                    defaultTemplates={defaultTemplates}
                  />

                  <NewNftSelectNft
                    tokenList={tokenList}
                    classes={styles}
                    setWorkProgressModalShow={setWorkProgressModalShow}
                    NFTType={NFTType}
                    setNFTType={setNFTType}
                    getCollectionsUsingType={getCollectionsUsingType}
                    collectionTypes={collectionTypes}
                    setCollection={setCollection}
                    setCollectionId={setCollectionId}
                    setNftContractAddress={setNftContractAddress}
                    collection={collection}
                    setContractType={setContractType}
                  />

                  <NewNftSelectSupply
                    NFTType={NFTType}
                    classes={styles}
                    setSupplyType={setSupplyType}
                    setTokenSupply={setTokenSupply}
                    supplyType={supplyType}
                    tokenSupply={tokenSupply}
                  />
                </div>
                <AddNftQueue
                  NFTType={NFTType}
                  image={image}
                  name={name}
                  description={description}
                  tokenSupply={tokenSupply}
                  collection={collection}
                  isUploadingData={isUploadingData}
                  handleAddClick={handleAddClick}
                />
              </div>
            </form>
          </div>

          <RemoveNft
            tokenList={tokenList}
            handleOpenNFTDetailModal={handleOpenNFTDetailModal}
            setEditObjectIndex={setEditObjectIndex}
            classes={styles}
            handleRemoveClick={handleRemoveClick}
            setWorkProgressModalShow={setWorkProgressModalShow}
          />
        </div>
        <BatchCreateNft
          isSaving={isSaving}
          NFTType={NFTType}
          tokenList={tokenList}
          versionB={versionB}
          handleSubmitEvent={handleSubmitEvent}
          handleSubmitEventMetamask={handleSubmitEventMetamask}
          handleFreeMint={handleFreeMint}
        />
      </div>
      <NetworkErrorModal
        show={show}
        handleClose={handleClose}
        network={network}
      />
      <NFTDetailModal
        show={openDialog}
        handleClose={handleCloseNFTDetailModal}
        nftDetail={nftDetail}
        handleEdit={handleEdit}
      />
      <NFTEditModal
        show={openEditModal}
        handleClose={handleEditClose}
        nftDetail={nftDetail}
        onUpdate={onUpdateEditModal}
        handleChangeCollection={handleChangeCollectionOpen}
        isUploadingData={isUploadingData}
      />
      <NewTamplateModal
        handleClose={handleNewTemplateModalClose}
        show={newTemplateModalShow}
        useEffectLoader={useEffectLoader}
        setUseEffectLoader={setUseEffectLoader}
        setSnackbarOpen={setSnackbarOpen}
        setSnackbarMessage={setSnackbarMessage}
        setSnackbarSeverity={setSnackbarSeverity}
      />
      <ChangeCollectionConfirmationModal
        show={changeCollection}
        handleClose={handleChangeCollectionClose}
        collectionDetails={changeCollectionList}
        updateChangeCollection={updateChangeCollection}
        isUploading={isUploadingData}
      />
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

export default NewNFT;
