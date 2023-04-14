import {
  CardActionArea,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core/";
import Avatar from "@material-ui/core/Avatar";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import { Link } from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
// import ReactTooltip from "react-tooltip";

import axios from "axios";
import Cookies from "js-cookie";
import { isUndefined, templateSettings } from "lodash";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars";
import { useHistory } from "react-router-dom";
import Web3 from "web3";
import r1 from "../../../../assets/img/patients/patient.jpg";
import CreateNFTContract from "../../../../components/blockchain/Abis/Collectible1155.json";
import * as Addresses from "../../../../components/blockchain/Addresses/Addresses";
import ipfs from "../../../../components/IPFS/ipfs";
import ChangeCollectionConfirmationModal from "../../../../components/Modals/ChangeCollectionConfirmationModal";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import NFTDetailModal from "../../../../components/Modals/NFTDetailModal";
import NFTEditModal from "../../../../components/Modals/NFTEditModal";
import { GLTFModel, AmbientLight, DirectionLight } from "react-3d-viewer";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { ethers } from "ethers";
import Alert from "@material-ui/lab/Alert";
import NewTamplateModal from "../../../../components/Modals/NewTamplateModal";
import WorkInProgressModal from "../../../../components/Modals/WorkInProgressModal";

// STYLES

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
    // height: 0,
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

  // let defaultTemplates =
  // {
  //   "_id": "63a17fdbdf852a1017aa2ccc",
  //   "name": "Tables",
  //   "properties": [
  //     {
  //       "value": "",
  //       "key": "Material",
  //       "type": "String",
  //       "_id": "63a17fdbdf852a1017aa2cab"
  //     },
  //     {
  //       "value": "",
  //       "key": "Wooden",
  //       "type": "Boolean",
  //       "_id": "63a17fdbdf852a1017aa2cbc"
  //     }
  //   ],
  //   "__v": 0
  // };

  // let standardTemplates = [{
  //   "_id": "63a17fdbdf852a1017aa298c",
  //   "name": "Pens",
  //   "properties": [
  //     {
  //       "value": "",
  //       "key": "Type",
  //       "type": "String",
  //       "_id": "63a17fdbdf852a1017aa2bb9"
  //     },
  //     {
  //       "value": "",
  //       "key": "Color",
  //       "type": "String",
  //       "_id": "63a17fdbdf852a1017aa2aaa"
  //     },
  //     {
  //       "value": "",
  //       "key": "Eraseable",
  //       "type": "Boolean",
  //       "_id": "63a17fdbdf852a1bb7aa2c9b"
  //     }
  //   ],
  //   "__v": 0
  // }, {
  //   "_id": "63a17fdbdfacac3017aa298c",
  //   "name": "Paints",
  //   "properties": [
  //     {
  //       "value": "",
  //       "key": "Container Capacity (L)",
  //       "type": "Number",
  //       "_id": "63a17fdbbebe2a2017aa2bb9"
  //     },
  //     {
  //       "value": "",
  //       "key": "Color",
  //       "type": "String",
  //       "_id": "63a17f0f4a852a1017aa2aaa"
  //     },
  //     {
  //       "value": "",
  //       "key": "Token",
  //       "type": "Boolean",
  //       "_id": "63a17ffffff52a1bb7aa2c9b"
  //     }
  //   ],
  //   "__v": 0
  // }, {
  //   "_id": "00a00fdbdfacac3017aa298c",
  //   "name": "Bread",
  //   "properties": [
  //     {
  //       "value": "",
  //       "key": "Baker",
  //       "type": "String",
  //       "_id": "600a00dbbebe2a2017aa2bb9"
  //     },
  //     {
  //       "value": "",
  //       "key": "Type",
  //       "type": "String",
  //       "_id": "63a00a004a852a1017aa2aaa"
  //     },
  //     {
  //       "value": "",
  //       "key": "Large",
  //       "type": "Boolean",
  //       "_id": "00a00ffffff52a1bb7aa2c9b"
  //     }
  //   ],
  //   "__v": 0
  // }];

  // let templateData = [{
  //   "_id": "63a17fdbdf854d1017aa2c98",
  //   "name": "Cars",
  //   "properties": [
  //     {
  //       "value": "",
  //       "key": "Suspension",
  //       "type": "String",
  //       "_id": "63a17fdbdfc32a1017aa2c99"
  //     },
  //     {
  //       "value": "",
  //       "key": "Engine",
  //       "type": "String",
  //       "_id": "63a17fdbb4da2a1017aa2c9a"
  //     },
  //     {
  //       "value": "",
  //       "key": "Color",
  //       "type": "String",
  //       "_id": "63a17fdbdf856c1017aa2c9b"
  //     }
  //   ],
  //   "__v": 0
  // },
  // {
  //   "_id": "63a1805e5cb0ae01bffe1378",
  //   "name": "Bikes",
  //   "properties": [
  //     {
  //       "value": "",
  //       "key": "Hybrid",
  //       "type": "Boolean",
  //       "_id": "63ee805e5cb0ae01ba9e1379"
  //     },
  //     {
  //       "value": "",
  //       "key": "EngineType",
  //       "type": "String",
  //       "_id": "63a1805e5cb0aeeeba9e137a"
  //     },
  //     {
  //       "value": "",
  //       "key": "Gears",
  //       "type": "Number",
  //       "_id": "63a18bae5cb0ae01ba9e137b"
  //     }
  //   ]
  // },
  // {
  //   "_id": "63a1805e5cb0ae01baae4471",
  //   "name": "Laptop",
  //   "properties": [
  //     {
  //       "value": "",
  //       "key": "SSD",
  //       "type": "Boolean",
  //       "_id": "63a1805e5cccce01ba9e137e"
  //     },
  //     {
  //       "value": "",
  //       "key": "Graphic Card",
  //       "type": "Boolean",
  //       "_id": "63a4ac5e5cb0ae01ba9e13ba"
  //     },
  //     {
  //       "value": "",
  //       "key": "Mechanical Keyboard",
  //       "type": "Boolean",
  //       "_id": "63a1805e5cb0ae01ba96c6cb"
  //     }
  //   ]
  // }];

  // const [templateOptions, setTemplateOptions] = useState(null);
  // const [savedData, setSavedData] = useState(null);
  // const [savedDataProps, setSavedDataProps] = useState(null)
  // const [defaultPropNum, setDefaultPropNum] = useState()
  // const [defaultPropValueYes, setDefaultPropValueYes] = useState("Yes")
  const [defaultPropValue, setDefaultPropValue] = useState("default");
  const [defaultPropValueNo, setDefaultPropValueNo] = useState("No");
  const [dataStringProp, setDataStringProp] = useState("");
  const [dataNumProp, setDataNumProp] = useState("");
  const [dataBoolProp, setDataBoolProp] = useState("");
  const [standardDataProps, setStandardDataProps] = useState(null);

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

  if (extractedDataProps) {
   // console.log(extractedDataProps, " Extracted Properties");
  }

  const handleTemplatePropertyChange = (index, e) => {
    //console.log(properties, " /// properties");
    let data = [...properties];

    data[index].value = e.target.value;
   // console.log("change", data[index]);
    setProperties(data);
  };

  // const handleSavedPropertyChange = (index, e, check) => {

  //   let data = [...savedDataProps]
  //   if (check === null) {
  //     data[index].value = e.target.value;
  //   } else if (check === true) {
  //     data[index].value = "yes"
  //   } else data[index].value = "no"
  //   console.log(data[index].value)
  //   console.log(data)
  //   setSavedDataProps(data)
  // }

  // useEffect(() => {
  //   if (template === "") {
  //     console.log(template, "template is null")
  //     setTemplate("default")
  //   } else if (template === "new") {
  //     handleNewTemplateModalOpen();
  //   }
  // });

  // useEffect(() => {
  //   const controller = new AbortController();
  //   if (templateOptions) {
  //     console.log(templateOptions)
  //     for (let i = 0; i < defaultTemplates.length; i++) {
  //       if (templateOptions === defaultTemplates[i].name) {
  //         setDefaultPropValue(templateOptions);
  //         let dynamicField = [];
  //         for (let p = 0; p < defaultTemplates[i].properties.length; p++) {
  //           dynamicField.push({
  //             key: defaultTemplates[i].properties[p].key,
  //             value: "",
  //             type: defaultTemplates[i].properties[p].type,
  //             id: defaultTemplates[i].properties[p]._id
  //           });
  //           setTemplateDataProps(dynamicField);
  //         }
  //       }
  //     }
  //   } else if (savedData) {
  //     console.log(savedData)
  //     for (let i = 0; i < defaultTemplates.length; i++) {
  //       if (savedData === defaultTemplates[i].name) {
  //         let dynamicField = [];
  //         for (let p = 0; p < defaultTemplates[i].properties.length; p++) {
  //           dynamicField.push({
  //             key: defaultTemplates[i].properties[p].key,
  //             value: "",
  //             type: defaultTemplates[i].properties[p].type,
  //             id: defaultTemplates[i].properties[p]._id
  //           });
  //           setSavedDataProps(dynamicField);
  //         }
  //       }
  //     }
  //   }
  //   return () => {
  //     controller.abort();
  //   };
  //}, [templateOptions, savedData, template])

  // useEffect(() => {
  // if (document.getElementById('selectTemplate').getAttribute('listener') !== 'true') {
  //   document.getElementById('selectTemplate').addEventListener('change', function () {
  //     alert('changed');
  //   });
  // }
  // }, [template])

  const [tokenList, setTokenList] = useState([]);
  let [isSaving, setIsSaving] = useState(false);
  let [name, setName] = useState("");
  // let [website, setWebsite] = useState("");
  // let [aboutTheArt, setAboutTheArt] = useState("");
  let [ipfsHash, setIpfsHash] = useState(null);
  let [description, setDescription] = useState("");
  // let [inspirationForThePiece, setInspirationForThePiece] = useState("");
  // let [executiveInspirationForThePiece, setExecutiveInspirationForThePiece] = useState("");
  // let [fanInspirationForThePiece, setFanInspirationForThePiece] = useState("");
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
  // let [imageArtistTypes, setImageArtistTypes] = useState([]);
  // let [executiveProducerTypes, setExecutiveProducerTypes] = useState([]);
  // let [fans, setFanTypes] = useState([]);
  // let [producerTypes, setProducerTypes] = useState([]);
  let [nftContractAddress, setNftContractAddress] = useState("");

  // let [imageArtist, setImageArtist] = useState('');
  // let [imageArtistId, setImageArtistId] = useState('');
  let [collectionTypes, setCollectionTypes] = useState([]);
  // let [collectionType, setCollectionType] = useState("New");
  let [collection, setCollection] = useState("");

  // let [producerId, setProducerId] = useState('');
  // let [producer, setProducer] = useState('');
  let [tokenSupply, setTokenSupply] = useState(1);
  let [isUploadingIPFS, setIsUploadingIPFS] = useState(false);
  // let [isUploadingExecutiveProducer, setIsUploadingExecutiveProducer] = useState(false);
  // let [isUploadingProducer, setIsUploadingProducer] = useState(false);
  // let [isUploadingFan, setIsUploadingFan] = useState(false);
  // let [isUploadingImageArtist, setIsUploadingImageArtist] = useState(false);
  let [rarity, setRarity] = useState("");
  // let [fan, setFan] = useState('');
  // let [fanId, setFanId] = useState('');
  // let [other, setOther] = useState('');
  let [image, setImage] = useState(r1);
  // let [artistImage, setArtistImage] = useState(r1);
  // let [producerImage, setProducerImage] = useState(r1);
  // let [executiveProducerImage, setExecutiveProducerImage] = useState(r1);
  // let [fanImage, setFanImage] = useState(r1);
  // let [imageArtistType, setImageArtistType] = useState("New");
  // let [producerType, setProducerType] = useState("New");
  // let [executiveProducerType, setExecutiveProducerType] = useState("New");
  // let [fanType, setFanType] = useState("New");
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

  // let [executiveProducerId, setExecutiveProducerId] = useState('');
  // let [executiveProducer, setExecutiveProducer] = useState('');

  // let getProfileData = () => {
  //     axios.get("/profile/createprofile").then(
  //         (response) => {
  //             console.log("response", response);
  //             setImageArtistTypes(response.data.Imageartist);
  //             setProducerTypes(response.data.Producer);
  //             setFanTypes(response.data.Fan);
  //             setExecutiveProducerTypes(response.data.ExecutiveProducer);
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
  let getCollections = (collectionType) => {
    setCollection("");
   // console.log("get collections");
   // console.log("collectionType", collectionType);
   // console.log("VERSION", Cookies.get("Version"));
    const url = `/collection/collections/${collectionType}`;
   // console.log("url", url);
    // setCollectionTypes([]);
    axios.get(url).then(
      (response) => {
       // console.log("response", response);

        if (collectionType === "1155") {
          setChangeCollectionList(response.data.collectionData);
        }

        // response.data.collectionData = [
        //   {
        //     name: "+ Create new Collection",
        //   },
        //   ...response.data.collectionData,
        // ];
       // console.log(
         // "response.data.collectionData",
         // response
          // response.data.collectionData[0].nftContractAddress
       // );
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
   // console.log("avail prop", availableProperties);
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
      // property.type ==="boolean" ? true : property.type === "number" ? 0 :

      let newData = { key: property.key, value: val };
      prop.push(newData);
      //console.log("property", property);
    });

   // console.log("prop", prop);
   // console.log("properties from def", prop);
    setProperties(prop);
  };

  const getDefaultTemplate = () => {
    axios.get(`/nft-properties/admin/default`).then(
      (response) => {
       // console.log("default template response", response);

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
        if (error.response !== undefined) {
          if (error.response.status === 400) {
            // setMsg(error.response.data.message);
          } else {
            // setMsg("Unknown Error Occured, try again.");
          }
        } else {
          // setMsg("Unknown Error Occured, try again.");
        }
        // setIsLoading(false);
      }
    );
  };

  const getSavedTemplate = (role) => {
    if (role === "admin") {
    }
    axios.get(`/nft-properties/${role}`).then(
      (response) => {
        if (role === "admin") {
        //  console.log("saved template response", response);
          setTemplateData(response.data.templates);
        } else {
         // console.log("standard template response", response);
          setStandardTemplates(response.data.templates);
        }
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
        if (error.response !== undefined) {
          if (error.response.status === 400) {
            // setMsg(error.response.data.message);
          } else {
            // setMsg("Unknown Error Occured, try again.");
          }
        } else {
          // setMsg("Unknown Error Occured, try again.");
        }
        // setIsLoading(false);
      }
    );
  };

  let getDataFromCookies = () => {
    let data = Cookies.get("NFT-Detail");
    let batchMintId = Cookies.get("Batch-ID");
   // console.log("data", data);
    if (
      (data && batchMintId) !== null &&
      (typeof data || typeof batchMintId) !== "undefined" &&
      (data && batchMintId) !== ""
    ) {
     // console.log("Data: ", data);
     // console.log("Batch ID: ", batchMintId);
     // console.log("Type is: ", typeof data);
     // console.log("Type is: ", typeof batchMintId);
      setTokenList(JSON.parse(data));
      setBatchId(batchMintId);
      setCollection(JSON.parse(data)[0].collectiontitle);
      setCollectionId(JSON.parse(data)[0].collectionId);
      setNFTType("1155");
    } else {
     // console.log("No data in cookies");
    }
  };

  useEffect(() => {
    // getProfileData();

    setVersionB(Cookies.get("Version"));
    //console.log("version", Cookies.get("Version"));
    getCollections(NFTType);
    getDefaultTemplate();
    getSavedTemplate("admin");
    getSavedTemplate("super-admin");
    //console.log("default valu", defaultTemplates);

    // setTokenList(Cookies.get("NFT-Detail"));
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
      // setImageArtist("");
      // setImageArtistId("");
      // setAboutTheArt("");
      // setWebsite("");
      // setArtistImage(r1);
      // setProducer("");
      // setProducerId("");
      // setInspirationForThePiece("");
      // setProducerImage(r1);
      // setExecutiveProducer("");
      // setExecutiveProducerId("");
      // setExecutiveInspirationForThePiece("");
      // setExecutiveProducerImage(r1);
      // setFan("");
      // setFanId("");
      // setFanInspirationForThePiece("");
      // setFanImage(r1);
      // setOther("");
      setCollection("");
      // setCollectionType("New");
      // setImageArtistType("New");
      // setProducerType("New");
      // setExecutiveProducerType("New");
      // setFanType("New");
      setSupplyType("Single");
      //setCollectionId("");
      handleCloseBackdrop();
      setIsSaving(false);
      history.push({
        pathname: `/dashboard/collection/nfts/${collectionId}`
      });
      // await loadWeb3();
      // const web3 = window.web3;
      // const accounts = await web3.eth.getAccounts();
      // const network = await web3.eth.net.getNetworkType();
      // if (network !== "private") {
      //   setNetwork(network);
      //   setIsSaving(false);
      //   handleShow();
      // } else {
      //   handleShowBackdrop();
      //   const address = nftContractAddress;
      //   const abi = CreateNFTContract;
      //   let totalImages = tokenList.length;
      //   let AmountofNFTs = [];
      //   let IPFsURIs = [];
      //   for (let i = 0; i < tokenList.length; i++) {
      //     AmountofNFTs.push(parseInt(tokenList[i].tokensupply));
      //     IPFsURIs.push(tokenList[i].nftURI);
      //   }
      //   console.log("AmountofNFTs", AmountofNFTs);
      //   console.log("IPFsHashes", IPFsURIs);

      //   console.log("Contract Address: ", address);
      //   var myContractInstance = await new web3.eth.Contract(abi, address);
      //   console.log("myContractInstance", myContractInstance);
      //   console.log("Name: ", name);
      //   console.log("Description: ", description);
      //   console.log("nftURI: ", nftURI);
      //   console.log("tokenSupply: ", tokenSupply);
      //   console.log("Account address: ", accounts[0]);
      //   console.log("Image Type: ", imageType);
      //   await myContractInstance.methods
      //     .mintBatch(accounts[0], AmountofNFTs, IPFsURIs)
      //     .send({ from: accounts[0] }, (err, response) => {
      //       console.log("get transaction", err, response);
      //       if (err !== null) {
      //         console.log("err", err);
      //         let variant = "error";
      //         enqueueSnackbar("User Canceled Transaction", { variant });
      //         handleCloseBackdrop();
      //         setIsSaving(false);
      //       }
      //     })
      //     .on("receipt", (receipt) => {
      //       console.log("receipt", receipt);
      //       Cookies.remove("NFT-Detail");
      //       console.log(
      //         "receipt",
      //         receipt.events.TransferBatch.returnValues.ids
      //       );
      //       let ids = receipt.events.TransferBatch.returnValues.ids;
      //       // for (let i = 0; i < tokenList.length; i++) {
      //       //     tokenList[i].nftId = ids[i];
      //       // }

      //       let data = {
      //         blockchainIds: ids,
      //       };
      //       // let Data = {
      //       //     "collectionId": collectionId,
      //       //     "data": [
      //       //         {
      //       //             "title": name,
      //       //             "description": description,
      //       //             "collectionId": collectionId,
      //       //             "nftURI": ipfsURI,
      //       //             "metadataURI": ipfsURI,
      //       //             "tokenSupply": tokenSupply,
      //       //             "nftFormat": imageType,
      //       //             "type": rarity,
      //       //             "supplyType": supplyType,
      //       //             // "properties": properties
      //       //             "userAddress": accounts[0]
      //       //         }
      //       //     ]
      //       // }

      //       // let Data = new FormData();
      //       // console.log("Data", Data);
      //       axios.put(`/batch-mint/minted/${batchId}`, data).then(
      //         (response) => {
      //           console.log("response", response);
      //           let variant = "success";
      //           enqueueSnackbar("Nfts Created Successfully.", { variant });
      //           Cookies.remove("Batch-ID");
      //           Cookies.remove("NFT-Detail");
      //           setTokenList([]);
      //           setImageType("");
      //           setIpfsHash("");
      //           setImage(r1);
      //           setName("");
      //           setDescription("");
      //           setRarity("");
      //           setTokenSupply(1);
      //           // setImageArtist("");
      //           // setImageArtistId("");
      //           // setAboutTheArt("");
      //           // setWebsite("");
      //           // setArtistImage(r1);
      //           // setProducer("");
      //           // setProducerId("");
      //           // setInspirationForThePiece("");
      //           // setProducerImage(r1);
      //           // setExecutiveProducer("");
      //           // setExecutiveProducerId("");
      //           // setExecutiveInspirationForThePiece("");
      //           // setExecutiveProducerImage(r1);
      //           // setFan("");
      //           // setFanId("");
      //           // setFanInspirationForThePiece("");
      //           // setFanImage(r1);
      //           // setOther("");
      //           setCollection("");
      //           // setCollectionType("New");
      //           // setImageArtistType("New");
      //           // setProducerType("New");
      //           // setExecutiveProducerType("New");
      //           // setFanType("New");
      //           setSupplyType("Single");
      //           setCollectionId("");
      //           handleCloseBackdrop();
      //           setIsSaving(false);
      //         },
      //         (error) => {
      //           if (process.env.NODE_ENV === "development") {
      //             console.log(error);
      //             console.log(error.response);
      //           }

      //           let variant = "error";
      //           enqueueSnackbar("Unable to Create Nfts.", { variant });

      //           handleCloseBackdrop();
      //           setIsSaving(false);
      //         }
      //       );
      //     });
      // }
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
       // console.log("AmountofNFTs", AmountofNFTs);
       // console.log("IPFsHashes", IPFsURIs);

       // console.log("Contract Address: ", address);
        var myContractInstance = await new web3.eth.Contract(abi, address);
       // console.log("myContractInstance", myContractInstance);
       // console.log("Name: ", name);
      //  console.log("Description: ", description);
      //  console.log("nftURI: ", nftURI);
        // console.log("tokenSupply: ", tokenSupply);
        // console.log("Account address: ", accounts[0]);
        // console.log("Image Type: ", imageType);
        await myContractInstance.methods
          .mintBatch(accounts[0], AmountofNFTs, IPFsURIs)
          .send({ from: accounts[0] }, (err, response) => {
            //console.log("get transaction", err, response);
            if (err !== null) {
              console.log("err", err);
              let variant = "error";
              enqueueSnackbar("User Canceled Transaction", { variant });
              handleCloseBackdrop();
              setIsSaving(false);
            }
          })
          .on("receipt", (receipt) => {
           // console.log("receipt", receipt);
            Cookies.remove("NFT-Detail");
            // console.log(
            //   "receipt",
            //   receipt.events.TransferBatch.returnValues.ids
            // );
            let ids = receipt.events.TransferBatch.returnValues.ids;
            // for (let i = 0; i < tokenList.length; i++) {
            //     tokenList[i].nftId = ids[i];
            // }

            let data = {
              blockchainIds: ids,
            };
            // let Data = {
            //     "collectionId": collectionId,
            //     "data": [
            //         {
            //             "title": name,
            //             "description": description,
            //             "collectionId": collectionId,
            //             "nftURI": ipfsURI,
            //             "metadataURI": ipfsURI,
            //             "tokenSupply": tokenSupply,
            //             "nftFormat": imageType,
            //             "type": rarity,
            //             "supplyType": supplyType,
            //             // "properties": properties
            //             "userAddress": accounts[0]
            //         }
            //     ]
            // }

            // let Data = new FormData();
            // console.log("Data", Data);
            axios.put(`/batch-mint/minted/${batchId}`, data).then(
              (response) => {
                //console.log("response", response);
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
                // setImageArtist("");
                // setImageArtistId("");
                // setAboutTheArt("");
                // setWebsite("");
                // setArtistImage(r1);
                // setProducer("");
                // setProducerId("");
                // setInspirationForThePiece("");
                // setProducerImage(r1);
                // setExecutiveProducer("");
                // setExecutiveProducerId("");
                // setExecutiveInspirationForThePiece("");
                // setExecutiveProducerImage(r1);
                // setFan("");
                // setFanId("");
                // setFanInspirationForThePiece("");
                // setFanImage(r1);
                // setOther("");
                setCollection("");
                // setCollectionType("New");
                // setImageArtistType("New");
                // setProducerType("New");
                // setExecutiveProducerType("New");
                // setFanType("New");
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
         // console.log("deleting batch response: ", response);
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
         // console.log("Response for delete nft from batch: ", response);
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

  // handle click event of the Add button
  const handleAddClick = (e) => {
    e.preventDefault();
   // console.log("token supply", tokenSupply);
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
    // else if (rarity === "") {
    //   let variant = "error";
    //   enqueueSnackbar("Please Select Artwork Rarity", { variant });
    // }
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

      // uploading metadata to ipfs
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
     // console.log("blob", blob);
      var dataIpfsHash;
      reader.readAsArrayBuffer(blob);
      reader.onloadend = () => {
        // setBuffer(Buffer(reader.result));
        ipfs.add(Buffer(reader.result), async (err, result) => {
          if (err) {
            console.log("Error: ", err);
            let variant = "error";
            enqueueSnackbar("Unable to Upload Meta Data to IPFS ", { variant });
            return;
          }
          //console.log("HASH: ", result[0].hash);
          ipfsMetaData = `https://ipfs.io/ipfs/${result[0].hash}`;
          setMetaDataURI(ipfsMetaData);
         // console.log("Meta Data URI: ", ipfsMetaData);

          let propertiesObject = {};
          properties.map((property) => {
            propertiesObject[property.key] = property.value;
          });
          //console.log("Properties are: ", propertiesObject);

          //sending data to backend
          let data = {
            collectionId: collectionId,
            title: name,
            description: description,
            nftURI: nftURI,
            previewImageURI: previewImageURI,
            metadataURI: nftURI,
            nftFormat: imageType,
            // type: rarity,
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
                    
                    
                    
                    // rarity: rarity,
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
                    // rarity: rarity,
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
           // console.log("data: ", data);
            axios.post(`/batch-mint/nft`, data).then(
              (response) => {
                // console.log(
                //   "Batch minting into existing batch response: ",
                //   response
                // );
                setNftId(response.data.nftId);
                setTokenList([
                  ...tokenList,
                  {
                    properties: properties,
                    ipfsHash: ipfsHash,
                    nftURI: nftURI,
                    title: name,
                    description: description,
                    // rarity: rarity,
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
                    // rarity: rarity,
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

      // setImageType(e.target.files[0].type.split("/")[1]);
    } else {
      setImageType(e.target.files[0].type.split("/")[1]);
      typeImage = e.target.files[0].type.split("/")[1];
      setImage(e.target.files[0]);

      if (previewImageURI !== "") {
        setPreviewImageURI("");
        setPreviewImage(r1);
      }
      // setIsGlbFile(false);
    }

    // console.log("Image Type: ", typeImage);
    // console.log("e.target.files[0]", e.target.files[0]);
    // console.log("Image type: ", imageType);
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onloadend = () => {
     // console.log("reader.result", reader.result);
      // setBuffer(Buffer(reader.result));
      ipfs.add(Buffer(reader.result), async (err, result) => {
        if (err) {
          console.log("err", err);
          setIsUploadingIPFS(false);
          let variant = "error";
          enqueueSnackbar("Unable to Upload Image to IPFS ", { variant });
          return;
        }
       // console.log("HASH", result[0].hash);

        setIpfsHash(result[0].hash);
        setNftURI(`https://ipfs.io/ipfs/${result[0].hash}`);
        let variant = "success";
        enqueueSnackbar("Image Uploaded to IPFS", { variant });
        if (typeImage === "glb") {
          setIsGlbFile(true);
        }
        //
      });
    };
    // setIsUploadingIPFS(true);
    let fileData = new FormData();
    fileData.append("image", imageNFT);
    axios.post(`/upload/image`, fileData).then(
      (response) => {
      //  console.log("response", response);
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
  // let onChangeSelfieHandler = (e) => {
  //     setIsUploadingImageArtist(true);
  //     let fileData = new FormData();
  //     fileData.append("image", e.target.files[0]);
  //     axios.post("upload/uploadtos3", fileData).then(
  //         (response) => {
  //             console.log("response", response);
  //             setArtistImage(response.data.url);
  //             setIsUploadingImageArtist(false);
  //             let variant = "success";
  //             enqueueSnackbar('Image Uploaded to S3 Successfully', { variant });
  //         },
  //         (error) => {
  //             if (process.env.NODE_ENV === "development") {
  //                 console.log(error);
  //                 console.log(error.response);
  //             }
  //             setIsUploadingImageArtist(false);
  //             let variant = "error";
  //             enqueueSnackbar('Unable to Upload Image to S3 .', { variant });

  //         }
  //     );
  // }
  // let onChangeProducerHandler = (e) => {
  //     setIsUploadingProducer(true);
  //     let fileData = new FormData();
  //     fileData.append("image", e.target.files[0]);
  //     axios.post("upload/uploadtos3", fileData).then(
  //         (response) => {
  //             console.log("response", response);
  //             setProducerImage(response.data.url);
  //             setIsUploadingProducer(false);
  //             let variant = "success";
  //             enqueueSnackbar('Image Uploaded to S3 Successfully', { variant });
  //         },
  //         (error) => {
  //             if (process.env.NODE_ENV === "development") {
  //                 console.log(error);
  //                 console.log(error.response);
  //             }
  //             setIsUploadingProducer(false);
  //             let variant = "error";
  //             enqueueSnackbar('Unable to Upload Image to S3 .', { variant });

  //         }
  //     );
  // }
  // let onChangeExecutiveProducerHandler = (e) => {
  //     setIsUploadingExecutiveProducer(true);
  //     let fileData = new FormData();
  //     fileData.append("image", e.target.files[0]);
  //     axios.post("upload/uploadtos3", fileData).then(
  //         (response) => {
  //             console.log("response", response);
  //             setExecutiveProducerImage(response.data.url);
  //             setIsUploadingExecutiveProducer(false);
  //             let variant = "success";
  //             enqueueSnackbar('Image Uploaded to S3 Successfully', { variant });
  //         },
  //         (error) => {
  //             if (process.env.NODE_ENV === "development") {
  //                 console.log(error);
  //                 console.log(error.response);
  //             }
  //             setIsUploadingExecutiveProducer(false);
  //             let variant = "error";
  //             enqueueSnackbar('Unable to Upload Image to S3 .', { variant });

  //         }
  //     );
  // }
  // let onChangeFanHandler = (e) => {
  //     setIsUploadingFan(true);
  //     let fileData = new FormData();
  //     fileData.append("image", e.target.files[0]);
  //     axios.post("upload/uploadtos3", fileData).then(
  //         (response) => {
  //             console.log("response", response);
  //             setFanImage(response.data.url);
  //             setIsUploadingFan(false);
  //             let variant = "success";
  //             enqueueSnackbar('Image Uploaded to S3 Successfully', { variant });
  //         },
  //         (error) => {
  //             if (process.env.NODE_ENV === "development") {
  //                 console.log(error);
  //                 console.log(error.response);
  //             }
  //             setIsUploadingFan(false);
  //             let variant = "error";
  //             enqueueSnackbar('Unable to Upload Image to S3 .', { variant });

  //         }
  //     );
  // }

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
   // console.log("Add button pressed.");
   // console.log("Properties: ", properties);
  };

  let handlePropertyChange = (index, event) => {
  //  console.log(properties, " /// properties");
    let data = [...properties];
    // console.log("the datat change: ", event.target);
    // console.log("the data index /// ", data[index][event.target.name]);
    data[index][event.target.name] = event.target.value;
    setProperties(data);
  };

  let handleOpenNFTDetailModal = (nftObject) => {
    setNftDetail(nftObject);
    setOpenDialog(true);
  };

  let handleCloseNFTDetailModal = () => {
    // setTokenList([...tempTokenList]);
    // setTempTokenList([]);
   // console.log("Close button called from modal.");
    setOpenDialog(false);
  };

  let handleEdit = () => {
    // setNftDetail(nftObject);
  //  console.log("Nft detail: ", nftDetail);
    // setNftDetail(nftDetail);
    setOpenDialog(false);
    setOpenEditModal(true);
  };

  let handleEditClose = () => {
    setOpenEditModal(false);
  };

  let onUpdateEditModal = (obj) => {
   // console.log("object in new nft screen: ", obj);
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
   // console.log("blob", blob);
    reader.readAsArrayBuffer(blob);
    reader.onloadend = () => {
      // setBuffer(Buffer(reader.result));
      ipfs.add(Buffer(reader.result), async (err, result) => {
        if (err) {
          console.log("Error: ", err);
          setIsUploadingData(false);
          let variant = "error";
          enqueueSnackbar("Unable to Upload Meta Data to IPFS ", { variant });
          return;
        }
      //  console.log("HASH: ", result[0].hash);
        setMetaDataURI(`https://ipfs.io/ipfs/${result[0].hash}`);

        let updatedObject = {
          title: data[editObjectIndex].title,
          description: data[editObjectIndex].description,
          // type: data[editObjectIndex].rarity,
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

       // console.log("Data: ", data);
        setTokenList(data);
        setIsUploadingData(false);
        setOpenEditModal(false);
        handleCloseBackdrop();

        let variant = "success";
        enqueueSnackbar("Meta Data Uploaded to IPFS ", { variant });
      });
    };

    // let data ={
    //     "collectionId": collectionId,
    //     "title": name,
    //     "description": description,
    //     "nftURI": ipfsURI,
    //     "metadataURI": ipfsURI,
    //     "nftFormat": imageType,
    //     "type": rarity,
    //     "tokenSupply": tokenSupply,
    //     "supplyType": supplyType,
    //     "properties": propertiesObject
    // }
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
      // setBuffer(Buffer(reader.result));
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

        // setIpfsHash(result[0].hash);
        setPreviewImageURI(`https://ipfs.io/ipfs/${result[0].hash}`);
        let variant = "success";
        enqueueSnackbar("Preview Image Uploaded to IPFS", {
          variant,
        });
        setIsUploadingPreview(false);
        //
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
    // else if (rarity === "") {
    //   let variant = "error";
    //   enqueueSnackbar("Please Select Artwork Rarity", { variant });
    // }
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
          //   type: rarity,
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

        //signing tokenId
        // const messageHash = await web3.eth.accounts.hashMessage(web3.utils.utf8ToHex("Hello World"));
        // const messageData = {
        //     "tokenId": nftIdHex
        // }

        // const signature = await web3.eth.personal.sign(web3.utils.toHex(JSON.stringify(messageData)), accounts[0], (err, signature) => {
        //     console.log("Sinature: ", signature);
        // });
        // console.log("Signature: ", signature);

        //sending call on backend to update voucher sign
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

        //resetting the values
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

    console.log("In the starting");

    // const provider = new ethers.providers.Web3Provider(window.ethereum);

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
      // alert("Signature");
      console.log("Signature issue");
    }
  };

  return (
    <div className="backgroundDefault">
      {/* Page Header */}
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
      {/* Page Content */}
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
                            {/* <AmbientLight color={0xffffff} />
                                                <AmbientLight color={0xffffff} />
                                                <AmbientLight color={0xffffff} /> */}
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
                            // style={{ width: "300px" }}
                            style={{ borderRadius: "1rem" }}
                            autoPlay
                            layout="horizontal"
                            src={nftURI}
                            onPlay={(e) => console.log("onPlay")}
                            showSkipControls={false}
                            showJumpControls={false}
                            header={`Now playing: ${name}`}
                            showDownloadProgress
                            // onClickPrevious={handleClickPrevious}
                            // onClickNext={handleClickNext}
                            // onEnded={handleClickNext}
                            // other props here
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
                    {/* <label>About the Art</label> */}
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
                  {/* <label for="rarity-select">Rarity</label>
                  <div className="filter-widget newNftWrapper">
                    <Autocomplete
                      id="combo-dox-demo"
                      required
                      options={rarities}
                      // disabled={isDisabledImporter}
                      getOptionLabel={(option) => option}
                      onChange={(event, value) => {
                        if (value == null) setRarity("");
                        else {
                          console.log(value);
                          setRarity(value);
                        }
                      }}
                      inputValue={rarity}
                      renderInput={(params) => (
                        <div> */}
                  {/* <select
                        name="rarity"
                        id="rarity-select"
                        autocomplete="on"
                        className="newNftInput"
                        required
                      >
                        <option value="" disabled selected>
                          Choose your pet
                        </option>
                        <option value="goldfish">Goldfish</option>
                        <option value="cat">Cat</option>
                        <option value="dog">Dog</option>
                        <option value="parrot">Parrot</option>
                      </select> */}
                  {/* <ThemeProvider theme={makeTheme}>
                            <TextField
                              {...params}
                              // label="Rarity"
                              // variant="outlined"
                              placeholder="Rarity"
                              // style={{ borderRadius: 12 }}
                              // InputProps={{
                              //   className: classes.nftInput,
                              // }}
                              // className={classes.nftInput}
                            />
                          </ThemeProvider>
                        </div>
                      )}
                    />
                  </div> */}

                  {/* Templates */}
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
                                      // value={properties[index].value}
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
                                // className="btn submit-btn"
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
                              // onChange={() => {
                              //   setNFTType("721");
                              //   getCollections("721");
                              //   // checked={saleType === 'auction'}
                              // }}
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
                              // onChange={() => {
                              //   setNFTType("721");
                              //   getCollections("721");
                              //   // checked={saleType === 'auction'}
                              // }}
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
                          // disabled={isDisabledImporter}
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
                                // label="Collections"
                                // variant="outlined"
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
                          // disabled={isDisabledImporter}
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
                                // label="Collections"
                                placeholder="Collections"
                                // variant="outlined"
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
                              setTokenSupply("");
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
                              placeholder="0"
                              required
                              value={tokenSupply ?? ""}
                              className="form-control"
                              onChange={(e) => {
                                if (e.target.value >= 0) {
                                  const regex = /^\d*$/;
                                  if (regex.test(e.target.value)) {
                                    setTokenSupply(e.target.value);
                                  }
                                }
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
            {/* <!-- Change Password Form --> */}
            <form>
              {/* <Scrollbars style={{ height: 1500 }}> */}

              {/* CARD */}
              <div className="form-group">
                <div>
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="flex-start"
                    // alignItems="flex-start"
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
                            {/* <CardHeader
                                className="text-center"
                                title={i.title}
                              /> */}
                            <CardMedia
                              className={classes.media}
                              image={i.nftURI}
                            >
                              {/* className={classes.media}
                                image={
                                  i.previewImageURI === ""
                                    ? i.nftURI
                                    : i.previewImageURI
                                }
                                title="NFT Image" */}
                              {/* /> */}
                            </CardMedia>
                          </Card>
                          {/* <Dialog
                                                        fullWidth={true}
                                                        maxWidth={true}
                                                        open={openDialog}
                                                        onClose={handleClickCloseDialog}
                                                        aria-labelledby="max-width-dialog-title"
                                                    >
                                                        <DialogTitle id="max-width-dialog-title">Edit NFT Details</DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText></DialogContentText>
                                                            <form>
                                                                <TextField
                                                                    label="NFT Title"
                                                                    variant="outlined"
                                                                    value={tempTokenList.title}
                                                                    onChange={(e) => {
                                                                        let temp = [...tempTokenList];
                                                                        temp[index].title = e.target.value;
                                                                        console.log(tempTokenList);
                                                                        setTempTokenList(temp);
                                                                    }}
                                                                />
                                                                <TextField
                                                                    label="NFT Description"
                                                                    variant="outlined"
                                                                    value={tempTokenList.description}
                                                                    onChange={(e) => {
                                                                        let temp = [...tempTokenList];
                                                                        temp[index].description = e.target.value;
                                                                        setTempTokenList(temp);
                                                                    }}
                                                                    style={{ marginLeft: "5px" }}
                                                                />
                                                                <button className="btn submit-btn" onClick={console.log("Submit clicked")} >Save</button> 
                                                            </form>
                                                        </DialogContent>
                                                    </Dialog> */}
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
                        {/* <NFTDetailModal 
                                                    show={openDialog} 
                                                    handleClose={handleCloseNFTDetailModal}
                                                    nftDetail={tokenList[index]}
                                                    handleEdit={handleEdit}
                                                >
                                                </NFTDetailModal>
                                                <NFTEditModal
                                                    show={openEditModal}
                                                    handleClose={handleEditClose}
                                                    nftDetail={i}
                                                    index={index}
                                                    onUpdate={onUpdateEditModal}
                                                >
                                                </NFTEditModal> */}
                      </Grid>
                    ))}
                  </Grid>
                </div>
              </div>

              {/* </Scrollbars> */}
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
          // )
        )}
        {/* <button type="button" onClick={(e) => signTypedData(e)} className="btn submit-btn">
                    Free Mint
                </button> */}
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
        // index={index}
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
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default NewNFT;
