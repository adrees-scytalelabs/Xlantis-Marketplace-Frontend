import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { ethers } from "ethers";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import r1 from "../../../../assets/img/patients/patient.jpg";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import RemoveNft from "../../../../components/Cards/RemoveNft";
import ipfs from "../../../../components/IPFS/ipfs";
import ChangeCollectionConfirmationModal from "../../../../components/Modals/ChangeCollectionConfirmationModal";
import NFTDetailModal from "../../../../components/Modals/NFTDetailModal";
import NFTEditModal from "../../../../components/Modals/NFTEditModal";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import NewTamplateModal from "../../../../components/Modals/NewTamplateModal";
import WorkInProgressModal from "../../../../components/Modals/WorkInProgressModal";
import NewNftSelectNft from "../../../../components/Radio/NewNftSelectNft";
import NewNftSelectSupply from "../../../../components/Radio/NewNftSelectSupply";
import NewNftTemplates from "../../../../components/Select/NewNftTemplates";
import NFTUpload from "../../../../components/Upload/NFTUpload";
import CreateNFTContract from "../../../../components/blockchain/Abis/Collectible1155.json";
import AddNftQueue from "../../../../components/buttons/AddNftQueue";
import BatchCreateNft from "../../../../components/buttons/BatchCreateNft";

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
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
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
    getDefaultTemplate();
    getSavedTemplate("admin");
    setTemplate("default");
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
  const [image, setImage] = useState(r1);
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
  const [previewImageURI, setPreviewImageURI] = useState(r1);
  const [isUploadingPreview, setIsUploadingPreview] = useState(false);
  const [isMp3File, setIsMp3File] = useState(false);
  const [contractType, setContractType] = useState("");
  const [NFTType, setNFTType] = useState("1155");
  const [workProgressModalShow, setWorkProgressModalShow] = useState(false);

  const [previewImage, setPreviewImage] = useState(r1);
  const [versionB, setVersionB] = useState("");
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
    } else if (
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
    } else if (collection === "") {
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
                <label className="mb-0 p-1">Select Artwork</label>
                <NFTUpload
                  image={image}
                  name={name}
                  isMp3File={isMp3File}
                  onChangePreviewImage={onChangePreviewImage}
                  isGlbFile={isGlbFile}
                  nftURI={nftURI}
                  isUploadingIPFS={isUploadingIPFS}
                  onChangeFile={onChangeFile}
                  previewImageURI={previewImageURI}
                  isUploadingPreview={isUploadingPreview}
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
                    classes={classes}
                    setWorkProgressModalShow={setWorkProgressModalShow}
                    NFTType={NFTType}
                    setNFTType={setNFTType}
                    getCollections={getCollections}
                    collectionTypes={collectionTypes}
                    setCollection={setCollection}
                    setCollectionId={setCollectionId}
                    setNftContractAddress={setNftContractAddress}
                    collection={collection}
                    setContractType={setContractType}
                  />

                  <NewNftSelectSupply
                    NFTType={NFTType}
                    classes={classes}
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
            classes={classes}
            handleRemoveClick={handleRemoveClick}
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
    </div>
  );
}

export default NewNFT;
