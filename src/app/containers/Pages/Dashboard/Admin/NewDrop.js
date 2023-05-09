
import { FormControl, ThemeProvider, createTheme } from '@mui/material';
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useResolvedPath } from "react-router-dom";
import Web3 from "web3";
import {
  createNewDrop,
  uploadImage,
} from "../../../../components/API/AxiosInterceptor";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import WorkInProgressModal from "../../../../components/Modals/WorkInProgressModal";
import SelectNFTAndSaleType from "../../../../components/Radio/SelectNFTAndSaleType";
import Select from "../../../../components/Select/Select";
import SelectDescription from "../../../../components/Select/SelectDescription";
import UploadFile from "../../../../components/Upload/UploadFile";
import SubmitButton from "../../../../components/buttons/SubmitButton";
import { DropBannerDefaultImage, defaultProfile } from '../../../../components/ImageURLs/URLs';

const makeTheme = createTheme({
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
  const path = useResolvedPath("").pathname;
  const [saleType, setSaleType] = useState("fixed-price");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(defaultProfile);
  const [bannerImage, setBannerImage] = useState(DropBannerDefaultImage);
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [, setDropId] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [network, setNetwork] = useState("");

  const [isUploadingIPFS, setIsUploadingIPFS] = useState(false);
  const [, setImageType] = useState("");
  const [nftType, setNftType] = useState("1155");
  const [versionB, setVersionB] = useState("");
  const [workProgressModalShow, setWorkProgressModalShow] = useState(false);
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

  const navigate = useNavigate();

  useEffect(() => {
    setVersionB(Cookies.get("Version"));

    props.setActiveTab({
      dashboard: "",
      newCollection: "",
      myCollections: "",
      newNFT: "",
      myNFTs: "",
      marketplace: "",
      newDrop: "active",
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
      } else if (image === defaultProfile) {
        let variant = "error";
        enqueueSnackbar("Please Select title image for Drop to continue.", {
          variant,
        });
        setIsSaving(false);
        handleCloseBackdrop();
      } else if (bannerImage === DropBannerDefaultImage) {
        let variant = "error";
        enqueueSnackbar("Please select banner image for drop to continue.", {
          variant,
        });
        setIsSaving(false);
        handleCloseBackdrop();
      } else {
        let dropID;
        let DropData = {
          bannerURL: bannerImage,
          title: name,
          image: image,
          description: description,
          saleType: saleType,
          dropType: nftType,
        };
        console.log("Drop Data", DropData);
        createNewDrop(DropData)
          .then((response) => {
            console.log("drop creation response", response);
            setDropId(response.data.dropId);
            dropID = response.data.dropId;
            setIsSaving(false);
            handleCloseBackdrop();
            navigate(`${path}/addNft`,
              {
                state: {
                  dropId: dropID,
                  saleType: saleType,
                  nftType: nftType,
                }
              },
            );
          })
          .catch((error) => {
            if (process.env.NODE_ENV === "development") {
              console.log(error);
              console.log(error.response);
            }
            handleCloseBackdrop();

            setIsSaving(false);
            let variant = "error";
            enqueueSnackbar("Unable to Create Drop.", { variant });
          });
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
        } else if (image === defaultProfile) {
          let variant = "error";
          enqueueSnackbar("Please Select title image for Drop to continue.", {
            variant,
          });
          setIsSaving(false);
          handleCloseBackdrop();
        } else {
          let dropID;
          let DropData = {
            bannerImage: bannerImage,
            title: name,
            image: image,
            description: description,
            saleType: saleType,
            dropType: nftType,
          };
          console.log("Drop Data", DropData);
          createNewDrop(DropData)
            .then((response) => {
              console.log("drop creation response", response);
              setDropId(response.data.dropId);
              dropID = response.data.dropId;
              setIsSaving(false);
              handleCloseBackdrop();
              navigate(`${path}/addNft`,
                {
                  state: {
                    dropId: dropID,
                    saleType: saleType,
                    nftType: nftType,
                  }
                });
            })
            .catch((error) => {
              if (process.env.NODE_ENV === "development") {
                console.log(error);
                console.log(error.response);
              }
              handleCloseBackdrop();

              setIsSaving(false);
              let variant = "error";
              enqueueSnackbar("Unable to Create Drop.", { variant });
            });
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
      } else if (image === defaultProfile) {
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
        createNewDrop(DropData)
          .then((response) => {
            console.log("drop creation response", response);
            setDropId(response.data.dropId);
            dropID = response.data.dropId;
            setIsSaving(false);

            handleCloseBackdrop();
            navigate(`${path}/addNft`,
              {
                state: {
                  dropId: dropID,
                  saleType: saleType,
                  nftType: nftType,
                }
              });
          })
          .catch((error) => {
            if (process.env.NODE_ENV === "development") {
              console.log(error);
              console.log(error.response);
            }
            handleCloseBackdrop();

            setIsSaving(false);
            let variant = "error";
            enqueueSnackbar("Unable to Create Drop.", { variant });
          });
      }
    }
  };

  let onChangeBannerFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploadingBanner(true);
      const reader = new window.FileReader();
      let imageNFT = e.target.files[0];
      setImageType(e.target.files[0].type.split("/")[1]);
      reader.readAsArrayBuffer(e.target.files[0]);
      let fileData = new FormData();
      fileData.append("image", imageNFT);
      uploadImage(fileData)
        .then((response) => {
          setBannerImage(response.data.url);
          setIsUploadingBanner(false);
          let variant = "success";
          enqueueSnackbar("Image Uploaded Successfully", { variant });
        })
        .catch((error) => {
          if (process.env.NODE_ENV === "development") {
            console.log(error);
            console.log(error.response);
          }
          setIsUploadingBanner(false);
          let variant = "error";
          enqueueSnackbar("Unable to Upload Image", { variant });
        });
    }
  };

  let onChangeFile = (e) => {
    setIsUploadingIPFS(true);
    const reader = new window.FileReader();
    let imageNFT = e.target.files[0];
    setImageType(e.target.files[0].type.split("/")[1]);
    reader.readAsArrayBuffer(e.target.files[0]);
    let fileData = new FormData();
    fileData.append("image", imageNFT);
    uploadImage(fileData)
      .then((response) => {
        setImage(response.data.url);
        setIsUploadingIPFS(false);
        let variant = "success";
        enqueueSnackbar("Image Uploaded Successfully", { variant });
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
        setIsUploadingIPFS(false);
        let variant = "error";
        enqueueSnackbar("Unable to Upload Image", { variant });
      });
  };
  return (
    <div className="backgroundDefault">
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
                <div className="form-group">
                  <div className="form-group">
                    <label>Select Banner Image</label>
                    <UploadFile
                      fileURL={bannerImage}
                      isUploading={isUploadingBanner}
                      changeFile={onChangeBannerFile}
                      class="co-12 col-md-auto drop-banner-img mr-3"
                      accept=".png,.jpg,.jpeg,.gif"
                      inputId="uploadDropBannerImg"
                    />
                  </div>
                  <div className="form-group">
                    <label>Select Title Image</label>
                    <UploadFile
                      fileURL={image}
                      isUploading={isUploadingIPFS}
                      changeFile={onChangeFile}
                      class="co-12 col-md-auto profile-img mr-3"
                      accept=".png,.jpg,.jpeg,.gif"
                      inputId="uploadPreviewImg"
                    />
                  </div>

                  <div className="form-group newNftFields">
                    <Select
                      label="Drop Name"
                      values={name}
                      placeholder="Enter Name of Drop"
                      setValue={setName}
                    />

                    <SelectDescription
                      label="Drop Description"
                      values={description}
                      placeholder="Enter Description of Drop"
                      setDescription={setDescription}
                    />

                  </div>
                  <ThemeProvider theme={makeTheme}>
                    <FormControl component="fieldset">
                      <SelectNFTAndSaleType
                        label="Select Sale Type"
                        onChangeWorkInProgress={() => {
                          console.log("721workinf");
                          setWorkProgressModalShow(true);
                        }}
                        onChange={() => {
                          console.log("1155working");
                          setSaleType("fixed-price");
                        }}
                        type={saleType}
                        radioType="sale"
                      />

                      <SelectNFTAndSaleType
                        label="Select Drop Type"
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
                    </FormControl>
                  </ThemeProvider>
                </div>
              </div>
            </form>
          </div>
        </div>
        <SubmitButton
          label="Create Drop"
          isSaving={isSaving}
          version={versionB}
          handleSubmitEvent={handleSubmitEvent}
          handleSubmitEventMetamask={handleSubmitEventMetamask}
        />
      </div>
      <NetworkErrorModal
        show={showNetworkModal}
        handleClose={handleCloseNetworkModal}
        network={network}
      />
      <WorkInProgressModal
        show={workProgressModalShow}
        handleClose={() => setWorkProgressModalShow(false)}
      />
      <CircularBackdrop open={open} />
    </div>
  );
}

export default NewDrop;
