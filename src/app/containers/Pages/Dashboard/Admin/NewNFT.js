import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import {
  CardActionArea,
  Grid
} from "@material-ui/core/";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import { ethers } from "ethers";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { AmbientLight, DirectionLight, GLTFModel } from "react-3d-viewer";
import { Spinner } from "react-bootstrap";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Link, useHistory } from "react-router-dom";
import Web3 from "web3";
import r1 from "../../../../assets/img/patients/patient.jpg";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import ipfs from "../../../../components/IPFS/ipfs";
import ChangeCollectionConfirmationModal from "../../../../components/Modals/ChangeCollectionConfirmationModal";
import NFTDetailModal from "../../../../components/Modals/NFTDetailModal";
import NFTEditModal from "../../../../components/Modals/NFTEditModal";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import NewTamplateModal from "../../../../components/Modals/NewTamplateModal";
import WorkInProgressModal from "../../../../components/Modals/WorkInProgressModal";
import CreateNFTContract from "../../../../components/blockchain/Abis/Collectible1155.json";

const themeTemplate = createMuiTheme({
  overrides: {
    Mui: {
      focused: {},
    },
  },
});

const makeTheme = createMuiTheme({
  overrides: {
    MuiTextField: {
      root: {
        border: "1px solid #fff",
        borderRadius: 5,
      },
    },
    MuiOutlinedInput: {
      root: {
        fontFamily: "orbitron",
        color: "#fff",
        border: "1px solid #fff",
        "&$focused": {},
      },
    },
    MuiInputBase: {
      input: {
        color: "#777",
        fontFamily: "inter",
      },
    },
    MuiInput: {
      root: {
        fontFamily: "orbitron",
        color: "#fff",
        border: "none",
        borderRadius: 5,
        padding: "6px 15px !important",
        "&$focused": {},
      },
      underline: {
        "&:$before": {},
        "&::after": {
          border: "none !important",
        },
      },
    },
    MuiAutocomplete: {
      inputRoot: {},
    },
    MuiIconButton: {
      root: {
        color: "#fff !important",
      },
    },
    MuiFormControlLabel: {
      label: {
        color: "white",
        fontFamily: "inter",
      },
    },
  },
});

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
  nftInput: {
    fontFamily: "orbitron",
  },
  tooltip: {
    fontSize: "16px",
  },
}));

function NewNFT(props) {
  let history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  let [network, setNetwork] = useState(false);
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

  let [defaultTemplates, setDefaultTemplates] = useState({
    name: "",
    properties: [],
  });
  let [templateData, setTemplateData] = useState([]);
  let [standardTemplates, setStandardTemplates] = useState([]);

  const [extractedDataProps, setExtractedDataProps] = useState(null);
  const [newTemplateModalShow, setNewTemplateModalShow] = useState(false);
  const [template, setTemplate] = useState("default");

  let handleNewTemplateModalClose = () => {
    setNewTemplateModalShow(false);
    getDefaultTemplate();
    getSavedTemplate("admin");
    setTemplate("default");
  };

  let handleNewTemplateModalOpen = () => {
    setNewTemplateModalShow(true);
  };

  const handleTemplateChange = (e) => {
    setExtractedDataProps(null);
    //console.log(e.target.value, " template change");
    if (e.target.value === "new") handleNewTemplateModalOpen();
    setTemplate(e.target.value);
    if (e.target.value === "default") {
      handleSetProperties(defaultTemplates.properties);
    }
  };

  const handleSelectTemplate = (e) => {
    setExtractedDataProps(null);
    //console.log(e.target.value, " Template selected!");
    if (templateData) {
      for (let i = 0; i < templateData.length; i++) {
        if (e.target.value === templateData[i].name) {
          handleSetProperties(templateData[i].properties);

          // console.log("values matched");
          let dynamicField = [];
          for (let p = 0; p < templateData[i].properties.length; p++) {
            dynamicField.push({
              key: templateData[i].properties[p].key,
              value: "",
              type: templateData[i].properties[p].type,
              id: templateData[i].properties[p]._id,
            });
            setExtractedDataProps(dynamicField);
          }
        }
      }
      if (e.target.value === "none") setExtractedDataProps(null);
    }
  };

  const handleStandardSelectTemplate = (e) => {
    setExtractedDataProps(null);
    //console.log(e.target.value, " Template selected!");
    if (standardTemplates) {
      for (let i = 0; i < standardTemplates.length; i++) {
        if (e.target.value === standardTemplates[i].name) {
          handleSetProperties(standardTemplates[i].properties);
          //console.log("values matched");
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


  const handleTemplatePropertyChange = (index, e) => {
    let data = [...properties];

    data[index].value = e.target.value;
    setProperties(data);
  };

  const [tokenList, setTokenList] = useState([]);
  let [isSaving, setIsSaving] = useState(false);
  let [name, setName] = useState("");
  let [ipfsHash, setIpfsHash] = useState(null);
  let [description, setDescription] = useState("");
  let [properties, setProperties] = useState([{ key: "", value: "" }]);

  let [value, setValue] = useState("");
  let [key, setKey] = useState("");

  let [rarities] = useState([
    "Mastercraft",
    "Legendary",
    "Epic",
    "Rare",
    "Uncommon",
    "Common",
  ]);
  let [supplyType, setSupplyType] = useState("Single");
  let [nftContractAddress, setNftContractAddress] = useState("");

  let [collectionTypes, setCollectionTypes] = useState([]);
  let [collection, setCollection] = useState("");

  let [tokenSupply, setTokenSupply] = useState(1);
  let [isUploadingIPFS, setIsUploadingIPFS] = useState(false);
  let [rarity, setRarity] = useState("");
  let [image, setImage] = useState(r1);
  let [collectionId, setCollectionId] = useState("");
  let [nftURI, setNftURI] = useState("");
  let [metaDataURI, setMetaDataURI] = useState("");
  let [imageType, setImageType] = useState("");
  let [openDialog, setOpenDialog] = useState(false);
  let [openEditModal, setOpenEditModal] = useState(false);
  let [nftDetail, setNftDetail] = useState({});
  let [editObjectIndex, setEditObjectIndex] = useState(0);
  let [batchId, setBatchId] = useState("");
  let [changeCollection, setChangeCollection] = useState(false);
  let [changeCollectionList, setChangeCollectionList] = useState([]);
  let [nftId, setNftId] = useState("");
  let [isUploadingData, setIsUploadingData] = useState(false);
  let [isGlbFile, setIsGlbFile] = useState(false);
  let [previewImageURI, setPreviewImageURI] = useState(r1);
  let [isUploadingPreview, setIsUploadingPreview] = useState(false);
  let [isMp3File, setIsMp3File] = useState(false);
  let [contractType, setContractType] = useState("");
  let [NFTType, setNFTType] = useState("1155");
  let [workProgressModalShow, setWorkProgressModalShow] = useState(false);

  let [previewImage, setPreviewImage] = useState(r1);
  let [versionB, setVersionB] = useState("");
  const Text721 =
    "ERC-721 is a standard for representing ownership of non-fungible tokens, that is, where each token is unique and cannot be exchanged on a one-to-one basis with other tokens.";
  const Text1155 =
    "ERC-1155 tokens are semi-fungible tokens, which means that each token can represent multiple, identical assets. For example, an ERC-1155 token could represent 10 units of a particular item, and those 10 units can be traded or transferred individually.";
  const SupplyTypeText =
    "Single supply in ERC-1155 refers to a collection of NFTs that have a predetermined, only one copy of NFTs available, while variable supply allows for the creation of multiple and identical NFTs copies, depending on demand.";
  let getCollections = (collectionType) => {
    setCollection("");
    const url = `/collection/collections/${collectionType}`;
    axios.get(url).then(
      (response) => {
        if (collectionType === "1155") {
          setChangeCollectionList(response.data.collectionData);
        }
        setCollectionTypes(response.data.collectionData);
      },
      (error) => {
        console.log("get collections error");
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
        if (error.response !== undefined) {
          if (
            error.response.data === "Unauthorized access (invalid token) !!"
          ) {
            sessionStorage.removeItem("Authorization");
            sessionStorage.removeItem("Address");
            Cookies.remove("Version");

            window.location.reload(false);
          }
        }
      }
    );
  };

  const handleSetProperties = (availableProperties) => {
    let prop = [];

    availableProperties.map((property) => {
      let val;
      if (property.type === "boolean") {
        val = true;
      } else if (property.type === "number") {
        val = 0;
      } else {
        val = "";
      }
      let newData = { key: property.key, value: val };
      prop.push(newData);
    });
    setProperties(prop);
  };

  const getDefaultTemplate = () => {
    axios.get(`/nft-properties/admin/default`).then(
      (response) => {
        setDefaultTemplates(response.data.defaultTemplate);
        if (response.data.defaultTemplate != null) {
          handleSetProperties(response.data.defaultTemplate.properties);
        }
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }

      }
    );
  };

  const getSavedTemplate = (role) => {
    if (role === "admin") {
    }
    axios.get(`/nft-properties/${role}`).then(
      (response) => {
        if (role === "admin") {
          setTemplateData(response.data.templates);
        } else {
          setStandardTemplates(response.data.templates);
        }
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }

      }
    );
  };

  let getDataFromCookies = () => {
    let data = Cookies.get("NFT-Detail");
    let batchMintId = Cookies.get("Batch-ID");
    if (
      (data && batchMintId) !== null &&
      (typeof data || typeof batchMintId) !== "undefined" &&
      (data && batchMintId) !== ""
    ) {
      setTokenList(JSON.parse(data));
      setBatchId(batchMintId);
      setCollection(JSON.parse(data)[0].collectiontitle);
      setCollectionId(JSON.parse(data)[0].collectionId);
      setNFTType("1155");
    }
  };

  useEffect(() => {
    setVersionB(Cookies.get("Version"));
    getCollections(NFTType);
    getDefaultTemplate();
    getSavedTemplate("admin");
    getSavedTemplate("super-admin");
    getDataFromCookies();

    props.setActiveTab({
      dashboard: "",
      newNFT: "active",
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
      newCollection: "",
      newRandomDrop: "",
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
      enqueueSnackbar("Add Nfts to Queue before Creation.", { variant });
      setIsSaving(false);
    } else {
      let variant = "success";
      enqueueSnackbar("Nfts Created Successfully.", { variant });
      Cookies.remove("Batch-ID");
      Cookies.remove("NFT-Detail");
      setTokenList([]);
      setImageType("");
      setIpfsHash("");
      setImage(r1);
      setName("");
      setDescription("");
      setRarity("");
      setTokenSupply(1);

      setCollection("");

      setSupplyType("Single");
      setCollectionId("");
      handleCloseBackdrop();
      setIsSaving(false);

    }
  };

  const handleSubmitEventMetamask = async (event) => {
    event.preventDefault();
    setIsSaving(true);

    if (tokenList.length === 0) {
      let variant = "error";
      enqueueSnackbar("Add Nfts to Queue before Creation.", { variant });
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
        const abi = CreateNFTContract;
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
              enqueueSnackbar("User Canceled Transaction", { variant });
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

            axios.put(`/batch-mint/minted/${batchId}`, data).then(
              (response) => {
                let variant = "success";
                enqueueSnackbar("Nfts Created Successfully.", { variant });
                Cookies.remove("Batch-ID");
                Cookies.remove("NFT-Detail");
                setTokenList([]);
                setImageType("");
                setIpfsHash("");
                setImage(r1);
                setName("");
                setDescription("");
                setRarity("");
                setTokenSupply(1);
                setCollection("");
                setSupplyType("Single");
                setCollectionId("");
                handleCloseBackdrop();
                setIsSaving(false);
              },
              (error) => {
                if (process.env.NODE_ENV === "development") {
                  console.log(error);
                  console.log(error.response);
                }

                let variant = "error";
                enqueueSnackbar("Unable to Create Nfts.", { variant });

                handleCloseBackdrop();
                setIsSaving(false);
              }
            );
          });
      }
    }
  };
  const handleRemoveClick = (index) => {
    if (tokenList.length === 1) {
      axios.delete(`/batch-mint/${batchId}`).then(
        (response) => {
          Cookies.remove("NFT-Detail");
          Cookies.remove("Batch-ID");
          setTokenList([]);
          setBatchId("");
        },
        (error) => {
          console.log("Error on deleting response: ", error);
        }
      );
    } else {
      axios.delete(`/batch-mint/nft/${tokenList[index].nftId}`).then(
        (response) => {
          const list = [...tokenList];
          list.splice(index, 1);
          Cookies.remove("NFT-Detail");
          Cookies.set("NFT-Detail", list, {});
          setTokenList(list);
        },
        (error) => {
          console.log("Error for delete nft from batch: ", error);
        }
      );
    }
  };

  const handleAddClick = (e) => {
    e.preventDefault();
    if (image === r1) {
      let variant = "error";
      enqueueSnackbar("Please Upload Artwork Photo", { variant });
    } else if (name === "") {
      let variant = "error";
      enqueueSnackbar("Please Enter Artwork Name", { variant });
    } else if (description === "") {
      let variant = "error";
      enqueueSnackbar("Please Enter Artwork Description", { variant });
    }
    else if (
      tokenSupply === 0 ||
      tokenSupply === undefined ||
      tokenSupply === null
    ) {
      let variant = "error";
      enqueueSnackbar("Token Supply cannot be Empty", { variant });
    } else if (tokenSupply < 0) {
      let variant = "error";
      enqueueSnackbar("Token Supply cannot be Negative", { variant });
    } else if (tokenSupply < 0) {
      let variant = "error";
      enqueueSnackbar("Token Supply cannot be Negative", { variant });
    } else if (collection === "") {
      let variant = "error";
      enqueueSnackbar("Please Enter Collection Name", { variant });
    } else {
      handleShowBackdrop();
      setIsUploadingData(true);

      let ipfsMetaData;
      let metaData = {
        name: name,
        description: description,
        image: nftURI,
      };
      const reader = new window.FileReader();
      const blob = new Blob([JSON.stringify(metaData, null, 2)], {
        type: "application/json",
      });
      var dataIpfsHash;
      reader.readAsArrayBuffer(blob);
      reader.onloadend = () => {
        ipfs.add(Buffer(reader.result), async (err, result) => {
          if (err) {
            console.log("Error: ", err);
            let variant = "error";
            enqueueSnackbar("Unable to Upload Meta Data to IPFS ", { variant });
            return;
          }
          ipfsMetaData = `https://ipfs.io/ipfs/${result[0].hash}`;
          setMetaDataURI(ipfsMetaData);

          let propertiesObject = {};
          properties.map((property) => {
            propertiesObject[property.key] = property.value;
          });
          let data = {
            collectionId: collectionId,
            title: name,
            description: description,
            nftURI: nftURI,
            previewImageURI: previewImageURI,
            metadataURI: nftURI,
            nftFormat: imageType,
            tokenSupply: tokenSupply,
            supplyType: supplyType,
            properties: propertiesObject,
          };

          if (previewImageURI !== "") {
            data["previewImageURI"] = previewImageURI;
          }

          if (batchId === "") {
            axios.post(`/batch-mint/`, data).then(
              (response) => {
                //console.log("Response on batch mint: ", response);
                setBatchId(response.data.batchId);
                setNftId(response.data.nftId);
                setTokenList([
                  ...tokenList,
                  {
                    collectionId: collectionId,
                    title: name,
                    description: description,
                    nftURI: nftURI,
                    previewImageURI: previewImageURI,
                    nftFormat: imageType,
                    properties: properties,
                    ipfsHash: ipfsHash,
                    tokensupply: tokenSupply,
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
                    nftURI: nftURI,
                    title: name,
                    description: description,
                    tokensupply: tokenSupply,
                    collectiontitle: collection,
                    supplytype: supplyType,
                    collectionId: collectionId,

                    nftId: response.data.nftId,
                    previewImageURI: previewImageURI,
                    nftFormat: imageType,
                  },
                ];

                Cookies.set("Batch-ID", response.data.batchId, {});

                Cookies.set("NFT-Detail", cookieData, {});
              },
              (error) => {
                console.log("Error on batch mint: ", error);
              }
            );
          } else {
            data["batchId"] = batchId;
            axios.post(`/batch-mint/nft`, data).then(
              (response) => {
                setNftId(response.data.nftId);
                setTokenList([
                  ...tokenList,
                  {
                    properties: properties,
                    ipfsHash: ipfsHash,
                    nftURI: nftURI,
                    title: name,
                    description: description,
                    tokensupply: tokenSupply,
                    collectiontitle: collection,
                    supplytype: supplyType,
                    collectionId: collectionId,
                    nftId: response.data.nftId,

                    previewImageURI: previewImageURI,
                  },
                ]);

                let cookieData = [
                  ...tokenList,
                  {
                    properties: properties,
                    ipfsHash: ipfsHash,
                    nftURI: nftURI,
                    title: name,
                    description: description,
                    tokensupply: tokenSupply,
                    collectiontitle: collection,
                    supplytype: supplyType,
                    collectionId: collectionId,

                    nftId: response.data.nftId,
                    previewImageURI: previewImageURI,
                  },
                ];

                Cookies.remove("NFT-Detail");

                Cookies.set("NFT-Detail", cookieData, {});
              },
              (error) => {
                console.log("Batch minting into existing batch error: ", error);
              }
            );
          }

          setProperties([{ key: "", value: "" }]);
          setNftId("");
          setNftURI("");
          setPreviewImageURI("");
          setIpfsHash("");
          setImage(r1);
          setName("");
          setDescription("");
          setRarity("");
          setTokenSupply(1);
          setSupplyType("Single");
          setIpfsHash("");
          setIsGlbFile(false);
          setIsMp3File(false);
          let variant = "success";
          enqueueSnackbar("Meta Data Uploaded to IPFS ", { variant });

          //console.log("Token list length: ", tokenList.length);
          setIsUploadingData(false);

          handleCloseBackdrop();
        });
      };
    }
  };

  let onChangeFile = (e) => {
    setIsUploadingIPFS(true);
    setIsGlbFile(false);
    setIsMp3File(false);
    const reader = new window.FileReader();
    let imageNFT = e.target.files[0];
    let typeImage;

    if (e.target.files[0].name.includes(".glb")) {
      typeImage = "glb";
      setImageType("glb");
      setImage(e.target.files[0]);
    } else if (
      e.target.files[0].type.split("/")[1] === "mp3" ||
      e.target.files[0].name.includes(".mp3")
    ) {
      typeImage = "mp3";
      setIsMp3File(true);
      setImageType("mp3");
      setImage(e.target.files[0]);
    } else {
      setImageType(e.target.files[0].type.split("/")[1]);
      typeImage = e.target.files[0].type.split("/")[1];
      setImage(e.target.files[0]);

      if (previewImageURI !== "") {
        setPreviewImageURI("");
        setPreviewImage(r1);
      }
    }

    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onloadend = () => {
      ipfs.add(Buffer(reader.result), async (err, result) => {
        if (err) {
          console.log("err", err);
          setIsUploadingIPFS(false);
          let variant = "error";
          enqueueSnackbar("Unable to Upload Image to IPFS ", { variant });
          return;
        }

        setIpfsHash(result[0].hash);
        setNftURI(`https://ipfs.io/ipfs/${result[0].hash}`);
        let variant = "success";
        enqueueSnackbar("Image Uploaded to IPFS", { variant });
        if (typeImage === "glb") {
          setIsGlbFile(true);
        }
      });
    };
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
  let handleRemoveProperty = (e, index) => {
    e.preventDefault();
    let data = [...properties];
    data.splice(index, 1);
    setProperties(data);
  };

  let handleAddProperty = (e) => {
    e.preventDefault();
    let newData = { key: "", value: "" };
    setProperties([...properties, newData]);
  };

  let handlePropertyChange = (index, event) => {
    let data = [...properties];
    data[index][event.target.name] = event.target.value;
    setProperties(data);
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
          enqueueSnackbar("Unable to Upload Meta Data to IPFS ", { variant });
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

        axios.put(`/nft/${data[editObjectIndex].nftId}`, updatedObject).then(
          (response) => {
            //  console.log("Response of updated nft: ", response);
          },
          (error) => {
            console.log("Error of updated nft: ", error);
          }
        );

        setTokenList(data);
        setIsUploadingData(false);
        setOpenEditModal(false);
        handleCloseBackdrop();

        let variant = "success";
        enqueueSnackbar("Meta Data Uploaded to IPFS ", { variant });
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
    axios.put(`/batch-mint/collection`, updatedCollectionID).then(
      (response) => {
        // console.log("Response after updating collection id: ", response);
      },
      (error) => {
        console.log("Error on updating collection id: ", error);
      }
    );
    handleChangeCollectionClose();
  };

  let onChangePreviewImage = (e) => {
    setIsUploadingPreview(true);
    const reader = new window.FileReader();
    let imageNFT = e.target.files[0];
    setPreviewImage(e.target.files[0]);
    let typeImage;

    console.log("Image Type: ", typeImage);
    console.log("e.target.files[0]", e.target.files[0]);
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onloadend = () => {
      console.log("reader.result", reader.result);
      ipfs.add(Buffer(reader.result), async (err, result) => {
        if (err) {
          console.log("err", err);
          setIsUploadingPreview(false);
          let variant = "error";
          enqueueSnackbar("Unable to Upload Preview Image to IPFS ", {
            variant,
          });
          return;
        }
        console.log("HASH", result[0].hash);
        setPreviewImageURI(`https://ipfs.io/ipfs/${result[0].hash}`);
        let variant = "success";
        enqueueSnackbar("Preview Image Uploaded to IPFS", {
          variant,
        });
        setIsUploadingPreview(false);
      });
    };
  };

  let handleFreeMint = async (e) => {
    e.preventDefault();
    if (image === r1) {
      let variant = "error";
      enqueueSnackbar("Please Upload Artwork Photo", { variant });
    } else if (name === "") {
      let variant = "error";
      enqueueSnackbar("Please Enter Artwork Name", { variant });
    } else if (description === "") {
      let variant = "error";
      enqueueSnackbar("Please Enter Artwork Description", { variant });
    }
    else if (collection === "") {
      let variant = "error";
      enqueueSnackbar("Please Enter Collection Name", { variant });
    } else if (
      image !== r1 &&
      (imageType === "glb" || imageType === "mp3") &&
      previewImage === r1
    ) {
      let variant = "error";
      enqueueSnackbar("Please Upload Preview Image", { variant });
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
        await axios.post(`/lazy-mint/NFT`, nftData).then(
          async (response) => {
            console.log("Response from backend on free mint: ", response);
            lazyMintId = response.data.nftObjectId;
            nftIdHex = response.data.nftId;
          },
          (err) => {
            console.log("Err from backend on free mint: ", err);
            console.log(
              "Err response from backend on free mint: ",
              err.response
            );
          }
        );

        let signature = await signTypedData(nftIdHex, nftURI);
        let voucherData = {
          nftId: lazyMintId,
          signature: signature,
        };

        await axios.patch(`/lazy-mint/voucher`, voucherData).then(
          (response) => {
            console.log("Response from sending voucher sign: ", response);
          },
          (err) => {
            console.log("Err from sending voucher sign: ", err);
            console.log(
              "Err response from sending voucher sign: ",
              err.response
            );
          }
        );
        setProperties([{ key: "", value: "" }]);
        setNftId("");
        setNftURI("");
        setPreviewImageURI("");
        setIpfsHash("");
        setImage(r1);
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
        enqueueSnackbar("NFT free minted successfully", { variant });
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
        enqueueSnackbar("Error signing", { variant });
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

      <div className="card-body px-0">
        <div className="row no-gutters">
          <div className="col-md-12 col-lg-6">
            <form>
              <div className="form-group">
                {/* Image Upload */}
                <label className="mb-0 p-1">Select Artwork</label>
                {isGlbFile ? (
                  <div>
                    <div className="form-group">
                      <div className="row no-gutters align-items-end justify-content-start">
                        <div className="co-12 col-md-auto profile-img mr-3">
                          <GLTFModel src={nftURI} width={250} height={250}>
                            <AmbientLight color={0xffffff} />
                            <AmbientLight color={0xffffff} />
                            <AmbientLight color={0xffffff} />
                            <AmbientLight color={0xffffff} />
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
                        <div className="co-12 col-md-auto">
                          <label for="uploadGlbFile" className="uploadLabel">
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
                            id="uploadGlbFile"
                            accept=".png,.jpg,.jpeg,.gif,.glb.,mp3"
                            onChange={onChangeFile}
                            hidden
                          />
                          <small className="form-text text-muted">
                            Allowed JPG, JPEG, PNG, GIF. Max size of 5MB
                          </small>
                        </div>
                      </div>
                    </div>
                    <label>Select Preview Image</label>
                    <div className="form-group">
                      <div className="row no-gutters align-items-end justify-content-start">
                        <div className="co-12 col-md-auto profile-img mr-3">
                          <img src={previewImageURI} alt="Selfie" />
                        </div>
                        <div className="co-12 col-md-auto">
                          <label
                            for="uploadPreviewImg1"
                            className="uploadLabel"
                          >
                            {isUploadingPreview ? (
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
                            id="uploadPreviewImg1"
                            accept=".png,.jpg,.jpeg"
                            onChange={onChangePreviewImage}
                            hidden
                          />
                          <small className="form-text text-muted">
                            Allowed JPG, JPEG, PNG, GIF. Max size of 5MB
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : isMp3File ? (
                  <div>
                    <div className="form-group">
                      <div className="row no-gutters align-items-end justify-content-start">
                        <div className="co-12 col-md-auto profile-img mr-3">
                          <AudioPlayer
                            style={{ borderRadius: "1rem" }}
                            autoPlay
                            layout="horizontal"
                            src={nftURI}
                            onPlay={(e) => console.log("onPlay")}
                            showSkipControls={false}
                            showJumpControls={false}
                            header={`Now playing: ${name}`}
                            showDownloadProgress
                          />
                        </div>
                        <div className="co-12 col-md-auto">
                          <label for="uploadMp3" className="uploadLabel">
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
                            id="uploadMp3"
                            accept=".mp3"
                            onChange={onChangeFile}
                            hidden
                          />
                          <small className="form-text text-muted">
                            Allowed JPG, JPEG, PNG, GIF. Max size of 5MB
                          </small>
                        </div>
                      </div>
                    </div>
                    <label>Select Preview Image</label>
                    <div className="filter-widget">
                      <div className="form-group">
                        <div className="row no-gutters align-items-end justify-content-start">
                          <div className="co-12 col-md-auto profile-img mr-3">
                            <img src={previewImageURI} alt="Selfie" />
                          </div>
                          <div className="co-12 col-md-auto">
                            <label
                              for="uploadPreviewImg"
                              className="uploadLabel"
                            >
                              {isUploadingPreview ? (
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
                              accept=".png,.jpg,.jpeg,.gif,.glb,.mp3"
                              onChange={onChangePreviewImage}
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
                ) : (
                  <div>
                    <div className="form-group">
                      <div className="row no-gutters align-items-end justify-content-start">
                        <div className="co-12 col-md-auto profile-img mr-3">
                          <img src={image} alt="Selfie" />
                        </div>
                        <div className="co-12 col-md-auto">
                          <label for="upload" className="uploadLabel">
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
                            id="upload"
                            accept=".png,.jpg,.jpeg,.gif,.glb,.mp3"
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
                )}

                {/* Fields */}
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
                  <div>
                    <label>Templates</label>
                    <small style={{ marginLeft: "5px" }}>(optional)</small>
                  </div>
                  <div className="w-100 position-relative mb-4">
                    <select
                      name="templates"
                      id="selectTemplate"
                      className="templatesSelect"
                      placeholder="Select a Template"
                      onChange={handleTemplateChange}
                      value={template}
                    >
                      <option value="default">Default</option>
                      <option value="none">None</option>
                      <option value="saved">Saved</option>
                      <option value="standard">Standard</option>
                      <option value="new">Create New</option>
                    </select>
                    {template === "default" ? (
                      defaultTemplates !== null ? (
                        <div className="w-100 my-3 row no-gutters justify-content-md-between">
                          <div className="filter-widget col-12">
                            <input
                              name={defaultTemplates.name}
                              type="text"
                              placeholder={defaultTemplates.name}
                              required
                              value={defaultTemplates.name}
                              className="newNftProps"
                              disabled
                              style={{
                                color: "#696969",
                                borderColor: "#626262",
                              }}
                            />
                          </div>
                          {defaultTemplates.properties.map((p, index) => (
                            <div className="col-12 col-md-5" key={index}>
                              <div className="w-100">
                                <label>{p.key}</label>
                                {p.type === "string" ? (
                                  <div className="filter-widget">
                                    <input
                                      name={p.key}
                                      type="text"
                                      placeholder="value"
                                      required
                                      value={properties[index].value}
                                      className="newNftProps"
                                      onChange={(e) =>
                                        handleTemplatePropertyChange(index, e)
                                      }
                                    />
                                  </div>
                                ) : p.type === "number" ? (
                                  <div className="filter-widget">
                                    <input
                                      name={p.key}
                                      type="number"
                                      placeholder="0"
                                      required
                                      className="newNftProps"
                                      onChange={(e) =>
                                        handleTemplatePropertyChange(index, e)
                                      }
                                    />
                                  </div>
                                ) : (
                                  <div className="filter-widget">
                                    <input
                                      name={p.key}
                                      type="radio"
                                      id="templateYes"
                                      required
                                      value={true}
                                      className="newNftProps"
                                      style={{
                                        width: "auto",
                                        margin: "0.5rem",
                                      }}
                                      onChange={(e) =>
                                        handleTemplatePropertyChange(index, e)
                                      }
                                    />
                                    <label
                                      for="templateYes"
                                      style={{
                                        width: "calc(100% - 55px)",
                                        fontFamily: "inter",
                                        fontWeight: "normal",
                                      }}
                                    >
                                      Yes
                                    </label>
                                    <input
                                      name={p.key}
                                      type="radio"
                                      id="templateNo"
                                      required
                                      value={false}
                                      className="newNftProps"
                                      style={{
                                        width: "auto",
                                        margin: "0.5rem",
                                      }}
                                      onChange={(e) =>
                                        handleTemplatePropertyChange(index, e)
                                      }
                                    />
                                    <label
                                      for="templateNo"
                                      style={{
                                        width: "calc(100% - 55px)",
                                        fontFamily: "inter",
                                        fontWeight: "normal",
                                      }}
                                    >
                                      No
                                    </label>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="mt-2 mb-4">
                          <div
                            className="alert alert-info"
                            role="alert"
                            style={{ fontFamily: "inter" }}
                          >
                            You have not set Default Template
                          </div>
                        </div>
                      )
                    ) : template === "none" ? (
                      <div className="w-100 my-3">
                        {properties.map((property, index) => {
                          return (
                            <div key={index}>
                              <div className="row no-gutters justify-content-md-between align-items-center">
                                <div className="col-12 col-md-5">
                                  <div className="form-group w-100">
                                    <label>Key</label>
                                    <div className="filter-widget">
                                      <input
                                        name="key"
                                        type="text"
                                        placeholder="Enter key of the property"
                                        required
                                        value={property.key}
                                        className="newNftProps"
                                        onChange={(e) =>
                                          handlePropertyChange(index, e)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-md-5">
                                  <div className="form-group w-100">
                                    <label>Value</label>
                                    <div className="filter-widget">
                                      <input
                                        name="value"
                                        type="text"
                                        placeholder="Enter Value of the property"
                                        required
                                        value={property.value}
                                        className="newNftProps"
                                        onChange={(e) =>
                                          handlePropertyChange(index, e)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 col-md-auto text-right">
                                  <div className="form-group">
                                    <label>Action</label>
                                    <div className="filter-widget">
                                      <Tooltip
                                        title="Remove a property"
                                        placement="bottom"
                                      >
                                        <button
                                          className="btn btn-submit btn-lg propsActionBtn"
                                          onClick={(e) =>
                                            handleRemoveProperty(e, index)
                                          }
                                        >
                                          -
                                        </button>
                                      </Tooltip>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        <div className="row no-gutters align-items-center justify-content-end">
                          <div className="col-auto">
                            <Tooltip title="Add a property" placement="right">
                              <button
                                className="btn btn-submit btn-lg propsActionBtn mb-4"
                                onClick={(e) => handleAddProperty(e)}
                              >
                                +
                              </button>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    ) : template === "saved" ? (
                      templateData !== null ? (
                        <div className="w-100 my-3">
                          <select
                            name="savedTemplate"
                            id="savedTemplate"
                            className="templatesSelect"
                            onChange={handleSelectTemplate}
                          >
                            <option value="none" defaultValue>
                              None
                            </option>
                            {templateData.map((data, index) => (
                              <option
                                value={data.name}
                                id={data.id}
                                key={index + 100}
                              >
                                {data.name}
                              </option>
                            ))}
                          </select>
                          <div className="w-100 my-3 row no-gutters justify-content-md-between">
                            {extractedDataProps !== null ? (
                              extractedDataProps.map((p, index) => (
                                <div
                                  className="col-12 col-md-5"
                                  key={index + 200}
                                >
                                  <div className="w-100">
                                    <label>{p.key}</label>
                                    {p.type === "string" ? (
                                      <div className="filter-widget">
                                        <input
                                          name={p.key}
                                          type="text"
                                          placeholder="value"
                                          required
                                          value={properties[index].value}
                                          className="newNftProps"
                                          onChange={(e) =>
                                            handleTemplatePropertyChange(
                                              index,
                                              e
                                            )
                                          }
                                        />
                                      </div>
                                    ) : p.type === "number" ? (
                                      <div className="filter-widget">
                                        <input
                                          name={p.key}
                                          type="number"
                                          placeholder="0"
                                          required
                                          value={properties[index].value}
                                          className="newNftProps"
                                          onChange={(e) =>
                                            handleTemplatePropertyChange(
                                              index,
                                              e
                                            )
                                          }
                                        />
                                      </div>
                                    ) : (
                                      <div className="filter-widget">
                                        <input
                                          name={p.key}
                                          type="radio"
                                          id="savedTemplateYes"
                                          required
                                          value={true}
                                          style={{
                                            width: "auto",
                                            margin: "0.5rem",
                                          }}
                                          className="newNftProps"
                                          onChange={(e) =>
                                            handleTemplatePropertyChange(
                                              index,
                                              e
                                            )
                                          }
                                        />
                                        <label
                                          for="savedTemplateYes"
                                          style={{
                                            width: "calc(100% - 55px)",
                                            fontFamily: "inter",
                                            fontWeight: "normal",
                                          }}
                                        >
                                          Yes
                                        </label>
                                        <input
                                          name={p.key}
                                          type="radio"
                                          id="savedTemplateNo"
                                          required
                                          value={false}
                                          className="newNftProps"
                                          style={{
                                            width: "auto",
                                            margin: "0.5rem",
                                          }}
                                          onChange={(e) =>
                                            handleTemplatePropertyChange(
                                              index,
                                              e
                                            )
                                          }
                                        />
                                        <label
                                          for="savedTemplateNo"
                                          style={{
                                            width: "calc(100% - 55px)",
                                            fontFamily: "inter",
                                            fontWeight: "normal",
                                          }}
                                        >
                                          No
                                        </label>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="mt-2 mb-4 w-100">
                                <div
                                  className="alert alert-info"
                                  role="alert"
                                  style={{ fontFamily: "inter" }}
                                >
                                  There are no Properties in this Template
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="mt-2 mb-4">
                          <div
                            className="alert alert-info"
                            role="alert"
                            style={{ fontFamily: "inter" }}
                          >
                            You have not saved any Template
                          </div>
                        </div>
                      )
                    ) : (
                      template === "standard" &&
                      (standardTemplates !== null ? (
                        <div className="w-100 my-3">
                          <select
                            name="savedTemplate"
                            id="savedTemplate"
                            className="templatesSelect"
                            onChange={handleStandardSelectTemplate}
                          >
                            <option value="none" defaultValue>
                              None
                            </option>
                            {standardTemplates.map((data, index) => (
                              <option
                                value={data.name}
                                id={data.id}
                                key={index + 300}
                              >
                                {data.name}
                              </option>
                            ))}
                          </select>
                          <div className="w-100 my-3 row no-gutters justify-content-md-between">
                            {extractedDataProps !== null ? (
                              extractedDataProps.map((p, index) => (
                                <div
                                  className="col-12 col-md-5"
                                  key={index + 400}
                                >
                                  <div className="w-100">
                                    <label>{p.key}</label>
                                    {p.type === "string" ? (
                                      <div className="filter-widget">
                                        <input
                                          name={p.key}
                                          type="text"
                                          placeholder="value"
                                          required
                                          value={properties[index].value}
                                          className="newNftProps"
                                          onChange={(e) =>
                                            handleTemplatePropertyChange(
                                              index,
                                              e
                                            )
                                          }
                                        />
                                      </div>
                                    ) : p.type === "number" ? (
                                      <div className="filter-widget">
                                        <input
                                          name={p.key}
                                          type="number"
                                          placeholder="0"
                                          required
                                          value={properties[index].value}
                                          className="newNftProps"
                                          onChange={(e) =>
                                            handleTemplatePropertyChange(
                                              index,
                                              e
                                            )
                                          }
                                        />
                                      </div>
                                    ) : (
                                      <div className="filter-widget">
                                        <input
                                          name={p.key}
                                          type="radio"
                                          id="standardTemplateYes"
                                          required
                                          value={true}
                                          className="newNftProps"
                                          style={{
                                            width: "auto",
                                            margin: "0.5rem",
                                          }}
                                          onChange={(e) =>
                                            handleTemplatePropertyChange(
                                              index,
                                              e
                                            )
                                          }
                                        />
                                        <label
                                          for="standardTemplateYes"
                                          style={{
                                            width: "calc(100% - 55px)",
                                            fontFamily: "inter",
                                            fontWeight: "normal",
                                          }}
                                        >
                                          Yes
                                        </label>
                                        <input
                                          name={p.key}
                                          type="radio"
                                          id="standardTemplateNo"
                                          required
                                          value={false}
                                          className="newNftProps"
                                          style={{
                                            width: "auto",
                                            margin: "0.5rem",
                                          }}
                                          onChange={(e) =>
                                            handleTemplatePropertyChange(
                                              index,
                                              e
                                            )
                                          }
                                        />
                                        <label
                                          for="standardTemplateNo"
                                          style={{
                                            width: "calc(100% - 55px)",
                                            fontFamily: "inter",
                                            fontWeight: "normal",
                                          }}
                                        >
                                          No
                                        </label>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="mt-2 mb-4 w-100">
                                <div
                                  className="alert alert-info"
                                  role="alert"
                                  style={{ fontFamily: "inter" }}
                                >
                                  There are no Properties in this Template
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="mt-2 mb-4">
                          <div
                            className="alert alert-info"
                            role="alert"
                            style={{ fontFamily: "inter" }}
                          >
                            Standard Properties not set
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <ThemeProvider theme={makeTheme}>
                    {tokenList.length > 0 ? (
                      <FormControl
                        component="fieldset"
                        style={{
                          color: "#fff",
                          fontFamily: "orbitron",
                          fontWeight: "bold",
                        }}
                      >
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
                              disabled
                              value="ERC721"
                              onChange={() => {
                                setWorkProgressModalShow(true);
                              }}
                              checked={NFTType === "721"}
                              control={<Radio />}
                              label={
                                <span
                                  style={{ fontSize: "0.9rem", color: "white" }}
                                >
                                  Single
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
                              disabled
                              value="ERC1155"
                              onChange={() => {
                                setNFTType("1155");
                                getCollections("1155");
                              }}
                              checked={NFTType === "1155"}
                              control={<Radio color="secondary" />}
                              label={
                                <span
                                  style={{ fontSize: "0.9rem", color: "white" }}
                                >
                                  Multiple
                                </span>
                              }
                            />
                          </Tooltip>
                        </RadioGroup>
                      </FormControl>
                    ) : (
                      <FormControl component="fieldset">
                        <label
                          component="legend"
                          style={{ fontWeight: "bold", fontFamily: "poppins" }}
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
                              style={{ color: "black" }}
                              value="ERC721"
                              onChange={() => {
                                setWorkProgressModalShow(true);
                              }}
                              checked={NFTType === "721"}
                              control={<Radio color="secondary" />}
                              label={
                                <span style={{ fontSize: "0.9rem" }}>
                                  Single{" "}
                                  <i
                                    class="fa fa-info-circle"
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
                              style={{ color: "black", marginLeft: ".8rem" }}
                              value="ERC1155"
                              onChange={() => {
                                setNFTType("1155");
                                getCollections("1155");
                              }}
                              checked={NFTType === "1155"}
                              control={<Radio color="secondary" />}
                              label={
                                <span style={{ fontSize: "0.9rem" }}>
                                  Multiple{" "}
                                  <i
                                    class="fa fa-info-circle"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                              }
                            />
                          </Tooltip>
                        </RadioGroup>
                      </FormControl>
                    )}
                  </ThemeProvider>

                  {tokenList.length > 0 ? (
                    <div className="form-group">
                      <label
                        style={{ fontWeight: "bold", fontFamily: "poppins" }}
                      >
                        Select Collection
                      </label>
                      <div className="filter-widget">
                        <Autocomplete
                          id="combo-dox-demo"
                          disabled
                          options={collectionTypes}
                          getOptionLabel={(option) => option.name}
                          onChange={(event, value) => {
                            if (value == null) setCollection("");
                            else {
                              if (value.name === "+ Create new Collection") {
                                history.push("/dashboard/createNewCollection");
                              } else {
                                // console.log(value);
                                setCollection(value.name);
                                setCollectionId(value._id);
                                setNftContractAddress(value.nftContractAddress);
                                // console.log("Value: ", value);
                              }
                            }
                          }}
                          inputValue={collection}
                          renderInput={(params) => (
                            <ThemeProvider theme={makeTheme}>
                              <TextField
                                {...params}
                                placeholder="Collections"
                              />
                            </ThemeProvider>
                          )}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="form-group">
                      <label
                        style={{ fontWeight: "bold", fontFamily: "poppins" }}
                      >
                        Select Collection
                      </label>
                      <div className="filter-widget">
                        <Autocomplete
                          id="combo-dox-demo"
                          required
                          options={collectionTypes}
                          getOptionLabel={(option) => option.name}
                          onChange={(event, value) => {
                            if (value == null) setCollection("");
                            else {
                              if (value.name === "+ Create new Collection") {
                                history.push("/dashboard/createNewCollection");
                              } else {
                                //  console.log(value);
                                setCollection(value.name);
                                setCollectionId(value._id);
                                setNftContractAddress(value.nftContractAddress);
                                setContractType(value.contractType);
                                //  console.log("Value: ", value);
                              }
                            }
                          }}
                          inputValue={collection}
                          renderInput={(params) => (
                            <ThemeProvider theme={makeTheme}>
                              <TextField
                                {...params}
                                placeholder="Collections"
                              />
                            </ThemeProvider>
                          )}
                        />
                      </div>
                    </div>
                  )}
                  {NFTType === "1155" ? (
                    <div>
                      <FormControl component="fieldset">
                        <Tooltip
                          title={SupplyTypeText}
                          classes={{ tooltip: classes.tooltip }}
                          placement="top-start"
                          arrow={true}
                        >
                          <label
                            component="legend"
                            style={{
                              fontWeight: "bold",
                              fontFamily: "poppins",
                            }}
                          >
                            Select Supply Type{" "}
                            <i
                              className="fa fa-info-circle"
                              aria-hidden="true"
                            ></i>
                          </label>
                        </Tooltip>
                        <RadioGroup
                          row
                          aria-label="position"
                          name="position"
                          defaultValue="top"
                        >
                          <FormControlLabel
                            style={{ color: "black" }}
                            value="Single"
                            onChange={() => {
                              setSupplyType("Single");
                              setTokenSupply(1);
                            }}
                            checked={supplyType === "Single"}
                            control={<Radio color="secondary" />}
                            label={
                              <span
                                style={{
                                  fontWeight: "bold",
                                  fontFamily: "poppins",
                                }}
                              >
                                Single
                              </span>
                            }
                          />
                          <FormControlLabel
                            style={{ color: "black" }}
                            value="Variable Supply"
                            onChange={() => {
                              setSupplyType("Variable");
                              setTokenSupply(1);
                            }}
                            checked={supplyType === "Variable"}
                            control={<Radio color="secondary" />}
                            label={
                              <span
                                style={{
                                  fontWeight: "bold",
                                  fontFamily: "poppins",
                                }}
                              >
                                Variable Supply
                              </span>
                            }
                          />
                        </RadioGroup>
                      </FormControl>

                      {supplyType === "Single" ? (
                        <div className="form-group">
                          <label
                            style={{
                              fontWeight: "bold",
                              fontFamily: "poppins",
                            }}
                          >
                            Token Supply
                          </label>
                          <div className="filter-widget">
                            <input
                              type="number"
                              required
                              value={tokenSupply}
                              className="form-control"
                              disabled
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="form-group">
                          <label
                            style={{
                              fontWeight: "bold",
                              fontFamily: "poppins",
                            }}
                          >
                            Token Supply
                          </label>
                          <div className="filter-widget">
                            <input
                              type="number"
                              placeholder="Enter Token price(USD)"
                              required
                              value={tokenSupply}
                              className="form-control"
                              onChange={(e) => {
                                setTokenSupply(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
                {NFTType === "1155" ? (
                  <div>
                    {image === "" ||
                      name === "" ||
                      description === "" ||
                      tokenSupply === "" ||
                      collection === "" ||
                      tokenSupply <= 0 ||
                      isUploadingData === true ? (
                      <Tooltip
                        title={
                          tokenSupply <= 0
                            ? "Token Supply Cannot Be Less Than 1"
                            : null
                        }
                      >
                        <button
                          className="btn propsActionBtn"
                          type="submit"
                          disabled
                        >
                          <i className="fa fa-plus"></i> Add NFT to Queue
                        </button>
                      </Tooltip>
                    ) : (
                      <button
                        className="btn propsActionBtn"
                        type="button"
                        onClick={(e) => handleAddClick(e)}
                      >
                        <i className="fa fa-plus"></i> Add NFT to Queue
                      </button>
                    )}
                  </div>
                ) : null}
              </div>
            </form>
          </div>

          <div
            className="col-sm-12 col-md-6 col-lg-5"
            style={{ marginLeft: "10px" }}
          >
            <form>
              <div className="form-group">
                <div>
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="flex-start"
                  >
                    {tokenList.map((i, index) => (
                      <Grid item xs={12} sm={6} md={6} lg={5} key={index}>
                        <CardActionArea
                          onClick={() => {
                            // console.log("nftDetailObject: ", i);
                            handleOpenNFTDetailModal(i);
                            setEditObjectIndex(index);
                            //  console.log("Open Dialog Value: ", openDialog);
                          }}
                        >
                          <Card id="nftCardProps">
                            <CardMedia
                              className={classes.media}
                              image={i.nftURI}
                            >
                            </CardMedia>
                          </Card>
                        </CardActionArea>
                        <CardActions>
                          <Button
                            onClick={(e) => {
                              e.preventDefault();
                              handleRemoveClick(index);
                            }}
                            className="btn btn-sm btn-block propsActionBtn"
                          >
                            Remove NFT
                          </Button>
                        </CardActions>
                      </Grid>
                    ))}
                  </Grid>
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
        ) : NFTType === "1155" ? (
          <div className="submit-section">
            {tokenList.length === 0 ? (
              <button
                type="button"
                disabled
                className="btn submit-btn propsActionBtn"
              >
                Batch create NFTs
              </button>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  versionB === "v1-sso"
                    ? handleSubmitEvent(e)
                    : handleSubmitEventMetamask(e);
                }}
                className="btn submit-btn propsActionBtn"
              >
                Batch create NFTs
              </button>
            )}
          </div>
        ) : (
          <div className="submit-section">
            <button
              type="button"
              onClick={(e) => handleFreeMint(e)}
              className="btn submit-btn propsActionBtn"
            >
              Free Mint
            </button>
          </div>
        )}
      </div>
      <NetworkErrorModal
        show={show}
        handleClose={handleClose}
        network={network}
      ></NetworkErrorModal>
      <NFTDetailModal
        show={openDialog}
        handleClose={handleCloseNFTDetailModal}
        nftDetail={nftDetail}
        handleEdit={handleEdit}
      ></NFTDetailModal>
      <NFTEditModal
        show={openEditModal}
        handleClose={handleEditClose}
        nftDetail={nftDetail}
        onUpdate={onUpdateEditModal}
        handleChangeCollection={handleChangeCollectionOpen}
        isUploadingData={isUploadingData}
      ></NFTEditModal>
      <NewTamplateModal
        handleClose={handleNewTemplateModalClose}
        show={newTemplateModalShow}
      />
      <ChangeCollectionConfirmationModal
        show={changeCollection}
        handleClose={handleChangeCollectionClose}
        collectionDetails={changeCollectionList}
        updateChangeCollection={updateChangeCollection}
        isUploading={isUploadingData}
      ></ChangeCollectionConfirmationModal>
      <WorkInProgressModal
        show={workProgressModalShow}
        handleClose={() => setWorkProgressModalShow(false)}
      />
      <CircularBackdrop open={open} />
    </div>
  );
}

export default NewNFT;
