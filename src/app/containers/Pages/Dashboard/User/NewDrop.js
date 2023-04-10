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
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import CreateAuctionContract from "../../../../components/blockchain/Abis/CreateAuctionContract.json";
import * as Addresses from "../../../../components/blockchain/Addresses/Addresses";
import NewDropForm from "../../../../components/Forms/NewDropForm";
import NewDropCard from "../../../../components/Cards/NewDropCard";

function NewDrop(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [startTimeStamp, setStartTimeStamp] = useState(
    startTime.getTime() / 1000
  );
  const [endTimeStamp, setEndTimeStamp] = useState(endTime.getTime() / 1000);
  const [inputList, setInputList] = useState([]);
  const [imageData, setImageData] = useState([]);
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [image, setImage] = useState(r1);
  let [isUploading, setIsUploading] = useState();
  let [isSaving, setIsSaving] = useState(false);
  let [minimumBid, setMinimumBid] = useState();
  let [bidDelta, setBidDelta] = useState();
  let [types, setTypes] = useState([]);
  const [typesImages, setTypesImages] = useState([]);
  const [network, setNetwork] = useState("");

  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const handleCloseNetworkModal = () => setShowNetworkModal(false);
  const handleShowNetworkModal = () => setShowNetworkModal(true);

  const [open, setOpen] = useState(false);
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };

  let getMyCubes = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem(
      "Authorization"
    )}`;
    axios.get("/token/TokenIdsnotonauction").then(
      (response) => {
        console.log("response", response);
        setInputList(response.data.tokensdata);
        setImageData(response.data.nftsdata);
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
  useEffect(() => {
    getMyCubes();
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
    });
  }, []);
  const handleRemoveClick = (index, newCube) => {
    console.log("index", index);
    console.log("inputList", types);

    const list = [...types];
    console.log("list", list);
    list.splice(index, 1);
    setInputList((inputList) => [...inputList, newCube]);
    setTypes(list);
  };
  const handleAddClick = (value) => {
    setTypes([...types, value]);
    var index = inputList.findIndex((i) => i._id === value._id);
    setTypesImages([...typesImages, imageData[index]]);
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
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
    e.preventDefault();
    setIsSaving(true);
    await loadWeb3();
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const network = await web3.eth.net.getNetworkType();
    if (network !== "ropsten") {
      setNetwork(network);
      setIsSaving(false);
      handleShowNetworkModal();
    } else {
      handleShowBackdrop();
      const address = Addresses.AuctionAddress;
      const abi = CreateAuctionContract;
      let tokensId = [];
      for (let i = 0; i < types.length; i++) {
        tokensId.push(types[i]._id);
      }
      if (tokensId.length === 0) {
        let variant = "error";
        enqueueSnackbar("Please Select Cubes to create drop", { variant });
        setIsSaving(false);
        handleCloseBackdrop();
      } else if (name === "") {
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
      } else if (new Date(startTime) === new Date(endTime)) {
        let variant = "error";
        enqueueSnackbar("Auction cannot be Start and End on same time.", {
          variant,
        });
        setIsSaving(false);
        handleCloseBackdrop();
      } else if (new Date(startTime) > new Date(endTime)) {
        let variant = "error";
        enqueueSnackbar("Auction End time must be greater than Start time.", {
          variant,
        });
        setIsSaving(false);
        handleCloseBackdrop();
      } else if (minimumBid === undefined || minimumBid === null) {
        let variant = "error";
        enqueueSnackbar("Please Enter minimum bid.", { variant });
        setIsSaving(false);
        handleCloseBackdrop();
      } else if (bidDelta === undefined || bidDelta === null) {
        let variant = "error";
        enqueueSnackbar("Please Enter Bid Delta.", { variant });
        setIsSaving(false);
        handleCloseBackdrop();
      } else {
        let tokenId = [];
        for (let i = 0; i < types.length; i++) {
          tokenId.push(types[i].tokenId);
        }
        var myContractInstance = await new web3.eth.Contract(abi, address);
        console.log("myContractInstance", myContractInstance);
        console.log(
          "minimumBid * 10 ** 18",
          startTimeStamp.toString(),
          endTimeStamp.toString()
        );
        var receipt = await myContractInstance.methods
          .newAuction(
            startTimeStamp.toString(),
            endTimeStamp.toString(),
            (minimumBid * 10 ** 18).toString(),
            tokenId
          )
          .send({ from: accounts[0] }, (err, response) => {
            console.log("get transaction", err, response);
            if (err !== null) {
              console.log("err", err);
              let variant = "error";
              enqueueSnackbar("User Canceled Transaction", { variant });
              handleCloseBackdrop();
              setIsSaving(false);
              return;
            }
          });
        console.log("receipt", receipt);
        console.log(
          "receipt.events.Transfer.returnValues.tokenId",
          receipt.events.New_Auction.returnValues.dropId
        );
        let dropId = receipt.events.New_Auction.returnValues.dropId;
        let DropData = {
          tokenId: tokensId,
          dropId: dropId,
          AuctionStartsAt: startTime,
          AuctionEndsAt: endTime,
          MinimumBid: minimumBid * 10 ** 18,
          bidDelta: bidDelta * 10 ** 18,
          title: name,
          description: description,
          image: image,
        };
        console.log("cubeData", DropData);

        axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem(
          "Authorization"
        )}`;
        axios.post("/drop/createdrop", DropData).then(
          (response) => {
            console.log("response", response);
            setIsSaving(false);
            setStartTime(new Date());
            setEndTime(new Date());
            setName("");
            setMinimumBid();
            setDescription("");
            setTypes([]);
            setTypesImages([]);
            setMinimumBid(0);
            setBidDelta(0);
            setImage(r1);
            handleCloseBackdrop();
            let variant = "success";
            enqueueSnackbar("Drop Created Successfully.", { variant });
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
    setIsUploading(true);
    let imageNFT = e.target.files[0];
    let fileData = new FormData();
    fileData.append("image", imageNFT);
    axios.post("upload/uploadtos3", fileData).then(
      (response) => {
        console.log("response", response);
        setImage(response.data.url);
        setIsUploading(false);
        let variant = "success";
        enqueueSnackbar("Image Uploaded Successfully", { variant });
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
        setIsUploading(false);
        let variant = "error";
        enqueueSnackbar("Unable to Upload Image", { variant });
      }
    );
  };
  return (
    <div className="card">
      <ul className="breadcrumb" style={{ backgroundColor: "rgb(167,0,0)" }}>
        <li className="breadcrumb-item">
          <a href="/">Dashboard</a>
        </li>
        <li className="breadcrumb-item active">New Drop</li>
      </ul>
      <div className="card-body">
        <div className="row">
          <div className="col-md-12 col-lg-6">
            <NewDropForm
              handleSubmitEvent={handleSubmitEvent}
              inputList={inputList}
              handleAddClick={handleAddClick}
              setName={setName}
              name={name}
              setDescription={setDescription}
              description={description}
              image={image}
              isUploading={isUploading}
              onChangeFile={onChangeFile}
              setStartTimeStamp={setStartTimeStamp}
              setStartTime={setStartTime}
              startTime={startTime}
              setEndTimeStamp={setEndTimeStamp}
              setEndTime={setEndTime}
              endTime={endTime}
              setMinimumBid={setMinimumBid}
              minimumBid={minimumBid}
              setBidDelta={setBidDelta}
              bidDelta={bidDelta}
            />
          </div>

          <div className="col-md-12 col-lg-6">
            {types.length > 0 ? (
              <Scrollbars style={{ height: 900 }}>
                <div className="form-group">
                  <div>
                    <Grid
                      container
                      spacing={3}
                      direction="row"
                      justifyContent="flex-start"
                    >
                      {types.map((i, index) => (
                        <Grid item xs={12} sm={6} md={6} key={index}>
                          <NewDropCard
                            typesImages={typesImages}
                            index={index}
                            i={i}
                            handleRemoveClick={handleRemoveClick}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                </div>
              </Scrollbars>
            ) : null}
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
              onClick={handleSubmitEvent}
              className="btn submit-btn"
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
      <CircularBackdrop open={open} />
    </div>
  );
}

export default NewDrop;
