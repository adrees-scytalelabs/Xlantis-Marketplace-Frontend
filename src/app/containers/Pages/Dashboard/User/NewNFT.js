import { Grid } from "@material-ui/core/";
import axios from "axios";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars";
import Web3 from "web3";
import r1 from "../../../../assets/img/patients/patient.jpg";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import ipfs from "../../../../components/IPFS/ipfs";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import CreateNFTContract from "../../../../components/blockchain/Abis/CreateNFTContract.json";
import * as Addresses from "../../../../components/blockchain/Addresses/Addresses";
import CardHeaderWithAvatar from "../../../../components/CardHeader/CardHeaderWithAvatar";
import NewNftForm from "../../../../components/Forms/NewNftForm";
import NewNftUserCard from "../../../../components/Cards/NewNftUserCard";

function NewNFT(props) {
  const { enqueueSnackbar } = useSnackbar();
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
  const [tokenList, setTokenList] = useState([]);
  let [isSaving, setIsSaving] = useState(false);
  let [name, setName] = useState("");
  let [website, setWebsite] = useState("");
  let [aboutTheArt, setAboutTheArt] = useState("");
  let [ipfsHash, setIpfsHash] = useState(null);
  let [description, setDescription] = useState("");
  let [inspirationForThePiece, setInspirationForThePiece] = useState("");
  let [executiveInspirationForThePiece, setExecutiveInspirationForThePiece] =
    useState("");
  let [fanInspirationForThePiece, setFanInspirationForThePiece] = useState("");
  let [rarities] = useState([
    "Mastercraft",
    "Legendary",
    "Epic",
    "Rare",
    "Uncommon",
    "Common",
  ]);
  let [supplyType, setSupplyType] = useState("Single");
  let [imageArtistTypes, setImageArtistTypes] = useState([]);
  let [executiveProducerTypes, setExecutiveProducerTypes] = useState([]);
  let [fans, setFanTypes] = useState([]);
  let [producerTypes, setProducerTypes] = useState([]);
  let [imageArtist, setImageArtist] = useState("");
  let [imageArtistId, setImageArtistId] = useState("");
  let [collectionTypes, setCollectionTypes] = useState([]);
  let [collection, setCollection] = useState("");
  let [producer, setProducer] = useState("");
  let [producerId, setProducerId] = useState("");

  let [tokenSupply, setTokenSupply] = useState("1");
  let [isUploadingIPFS, setIsUploadingIPFS] = useState(false);
  let [rarity, setRarity] = useState("");
  let [fan, setFan] = useState("");
  let [fanId, setFanId] = useState("");

  let [other, setOther] = useState("");
  let [image, setImage] = useState(r1);
  let [artistImage, setArtistImage] = useState(r1);
  let [producerImage, setProducerImage] = useState(r1);
  let [executiveProducerImage, setExecutiveProducerImage] = useState(r1);
  let [fanImage, setFanImage] = useState(r1);
  let [collectionId, setCollectionId] = useState("");
  let [executiveProducer, setExecutiveProducer] = useState("");
  let [executiveProducerId, setExecutiveProducerId] = useState("");

  let getProfileData = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem(
      "Authorization"
    )}`;
    axios.get("/profile/createprofile").then(
      (response) => {
        console.log("response", response);
        setImageArtistTypes(response.data.Imageartist);
        setProducerTypes(response.data.Producer);
        setFanTypes(response.data.Fan);
        setExecutiveProducerTypes(response.data.ExecutiveProducer);
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
        if (error.response.data !== undefined) {
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
  let getCollections = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem(
      "Authorization"
    )}`;
    axios.get("/collection/collections").then(
      (response) => {
        console.log("response", response);
        setCollectionTypes(response.data.Collectiondata);
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
        if (error.response.data !== undefined) {
          if (
            error.response.data === "Unauthorized access (invalid token) !!"
          ) {
            sessionStorage.removeItem("Authorization");
            sessionStorage.removeItem("Address");
            window.location.reload(false);
          }
        }
      }
    );
  };

  useEffect(() => {
    getProfileData();
    getCollections();

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
      await loadWeb3();
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      const network = await web3.eth.net.getNetworkType();
      if (network !== "ropsten") {
        setNetwork(network);
        setIsSaving(false);
        handleShow();
      } else {
        handleShowBackdrop();
        const address = Addresses.CreateNftAddress;
        const abi = CreateNFTContract;
        let totalImages = tokenList.length;
        let AmountofNFTs = [];
        let IPFsHashes = [];
        for (let i = 0; i < tokenList.length; i++) {
          AmountofNFTs.push(tokenList[i].tokensupply);
          IPFsHashes.push(tokenList[i].ipfsHash);
        }
        console.log("AmountofNFTs", AmountofNFTs);
        console.log("IPFsHashes", IPFsHashes);

        var myContractInstance = await new web3.eth.Contract(abi, address);
        console.log("myContractInstance", myContractInstance);
        await myContractInstance.methods
          .new_batch(totalImages, AmountofNFTs, IPFsHashes)
          .send({ from: accounts[0] }, (err, response) => {
            console.log("get transaction", err, response);
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
            console.log(
              "receipt",
              receipt.events.TransferBatch.returnValues.ids
            );
            let ids = receipt.events.TransferBatch.returnValues.ids;
            for (let i = 0; i < tokenList.length; i++) {
              tokenList[i].nftId = ids[i];
            }

            let Data = {
              nftdata: tokenList,
            };
            console.log("Data", Data);

            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${sessionStorage.getItem("Authorization")}`;
            axios.post("/nft/createnft", Data).then(
              (response) => {
                console.log("response", response);
                let variant = "success";
                enqueueSnackbar("Nfts Created Successfully.", { variant });
                setTokenList([]);
                setIpfsHash("");
                setImage(r1);
                setName("");
                setDescription("");
                setOther("");
                setSupplyType("Single");
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
    const list = [...tokenList];
    list.splice(index, 1);
    setTokenList(list);
  };
  const handleAddClick = () => {
    if (image === r1) {
      let variant = "error";
      enqueueSnackbar("Please Upload Artwork Photo", { variant });
    } else if (name === "") {
      let variant = "error";
      enqueueSnackbar("Please Enter Artwork Name", { variant });
    } else if (description === "") {
      let variant = "error";
      enqueueSnackbar("Please Enter Artwork Description", { variant });
    } else if (rarity === "") {
      let variant = "error";
      enqueueSnackbar("Please Select Artwork Rarity", { variant });
    } else if (
      tokenSupply === "" ||
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
    } else if (imageArtist === "") {
      let variant = "error";
      enqueueSnackbar("Please Enter Image Artist Name", { variant });
    } else if (aboutTheArt === "") {
      let variant = "error";
      enqueueSnackbar("Please Enter About the Art", { variant });
    } else if (artistImage === r1) {
      let variant = "error";
      enqueueSnackbar("Please Select Image Artist Image", { variant });
    } else if (website === "") {
      let variant = "error";
      enqueueSnackbar("Please Enter Website of Image Artist", { variant });
    } else if (producer === "") {
      let variant = "error";
      enqueueSnackbar("Please Enter Producer Name", { variant });
    } else if (producerImage === r1) {
      let variant = "error";
      enqueueSnackbar("Please Select Producer Image", { variant });
    } else if (inspirationForThePiece === "") {
      let variant = "error";
      enqueueSnackbar("Please Enter Producer Inspiration For The Piece", {
        variant,
      });
    } else if (executiveProducer === "") {
      let variant = "error";
      enqueueSnackbar("Please Enter Executive Producer Name", { variant });
    } else if (executiveProducerImage === r1) {
      let variant = "error";
      enqueueSnackbar("Please Select Executive Producer Image", { variant });
    } else if (executiveInspirationForThePiece === "") {
      let variant = "error";
      enqueueSnackbar(
        "Please Enter Executive Producer Inspiration For The Piece",
        { variant }
      );
    } else if (fan === "") {
      let variant = "error";
      enqueueSnackbar("Please Enter Fan Name", { variant });
    } else if (fanImage === r1) {
      let variant = "error";
      enqueueSnackbar("Please Select Fan Image", { variant });
    } else if (fanInspirationForThePiece === "") {
      let variant = "error";
      enqueueSnackbar("Please Enter Fan Inspiration For The Piece", {
        variant,
      });
    } else if (other === "") {
      let variant = "error";
      enqueueSnackbar("Please Enter other Input field", { variant });
    } else if (collection === "") {
      let variant = "error";
      enqueueSnackbar("Please Enter Collection Name", { variant });
    } else {
      setTokenList([
        ...tokenList,
        {
          ipfsHash: ipfsHash,
          artwork: image,
          title: name,
          description: description,
          type: rarity,
          tokensupply: tokenSupply,
          ImageArtistId: imageArtistId,
          ImageArtistName: imageArtist,
          ImageArtistAbout: aboutTheArt,
          ImageArtistWebsite: website,
          ImageArtistProfile: artistImage,
          ProducerId: producerId,
          ProducerName: producer,
          ProducerInspiration: inspirationForThePiece,
          ProducerProfile: producerImage,
          ExecutiveProducerId: executiveProducerId,
          ExecutiveProducerName: executiveProducer,
          ExecutiveProducerInspiration: executiveInspirationForThePiece,
          ExecutiveProducerProfile: executiveProducerImage,
          FanId: fanId,
          FanName: fan,
          FanInspiration: fanInspirationForThePiece,
          FanProfile: fanImage,
          other: other,
          collectiontitle: collection,
          supplytype: supplyType,
          collectionId: collectionId,
        },
      ]);
      setIpfsHash("");
      setImage(r1);
      setName("");
      setDescription("");
      setTokenSupply(1);
      setOther("");
      setSupplyType("Single");
    }
  };

  let onChangeFile = (e) => {
    setIsUploadingIPFS(true);

    if (e.target.files[0] !== undefined || e.target.files[0] !== null) {
      const reader = new window.FileReader();
      let imageNFT = e.target.files[0];
      reader.readAsArrayBuffer(e.target.files[0]);
      reader.onloadend = () => {

        ipfs.add(Buffer(reader.result), async (err, result) => {
          if (err) {
            console.log(err);
            setIsUploadingIPFS(false);
            let variant = "error";
            enqueueSnackbar("Unable to Upload Image to IPFS ", { variant });
            return;
          }
          console.log("HASH", result[0].hash);
          setIpfsHash(result[0].hash);
          let variant = "success";
          enqueueSnackbar("Image Uploaded to IPFS", { variant });
        });
      };
      let fileData = new FormData();
      fileData.append("image", imageNFT);
      axios.post("upload/uploadtos3", fileData).then(
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
    } else {
      setIsUploadingIPFS(false);
    }
  };

  return (
    <div className="card">
      <ul className="breadcrumb" style={{ backgroundColor: "rgb(167,0,0)" }}>
        <li className="breadcrumb-item">
          <a href="/">Dashboard</a>
        </li>
        <li className="breadcrumb-item active">New NFT</li>
      </ul>
      <div className="card-body">
        <div className="row">
          <div className="col-md-12 col-lg-6">
            <NewNftForm
              image={image}
              isUploadingIPFS={isUploadingIPFS}
              onChangeFile={onChangeFile}
              name={name}
              setName={setName}
              setDescription={setDescription}
              description={description}
              setRarity={setRarity}
              rarities={rarities}
              setSupplyType={setSupplyType}
              setTokenSupply={setTokenSupply}
              supplyType={supplyType}
              tokenSupply={tokenSupply}
              imageArtistTypes={imageArtistTypes}
              setImageArtistId={setImageArtistId}
              setImageArtist={setImageArtist}
              setWebsite={setWebsite}
              setAboutTheArt={setAboutTheArt}
              setArtistImage={setArtistImage}
              producerTypes={producerTypes}
              setProducerId={setProducerId}
              setProducer={setProducer}
              setInspirationForThePiece={setInspirationForThePiece}
              setProducerImage={setProducerImage}
              executiveProducerTypes={executiveProducerTypes}
              setExecutiveProducerId={setExecutiveProducerId}
              setExecutiveProducer={setExecutiveProducer}
              setExecutiveInspirationForThePiece={setExecutiveInspirationForThePiece}
              setExecutiveProducerImage={setExecutiveProducerImage}
              fans={fans}
              setFan={setFan}
              setFanId={setFanId}
              setFanImage={setFanImage}
              setFanInspirationForThePiece={setFanInspirationForThePiece}
              setOther={setOther}
              other={other}
              collectionTypes={collectionTypes}
              setCollection={setCollection}
              setCollectionId={setCollectionId}
              handleAddClick={handleAddClick}
            />
          </div>
          <div className="col-md-12 col-lg-6">
            <form>
              <Scrollbars style={{ height: 1500 }}>
                <div className="form-group">
                  <div>
                    <Grid
                      container
                      spacing={2}
                      direction="row"
                      justifyContent="flex-start"
                    >
                      {tokenList.map((i, index) => (
                        <Grid item xs={12} sm={6} md={6} key={index}>
                          <NewNftUserCard i={i} handleRemoveClick={handleRemoveClick} index={index} />
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                </div>
              </Scrollbars>
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
              className="btn submit-btn"
            >
              Batch create NFTs
            </button>
          </div>
        )}
      </div>
      <NetworkErrorModal
        show={show}
        handleClose={handleClose}
        network={network}
      />
      <CircularBackdrop open={open} />
    </div>
  );
}

export default NewNFT;
