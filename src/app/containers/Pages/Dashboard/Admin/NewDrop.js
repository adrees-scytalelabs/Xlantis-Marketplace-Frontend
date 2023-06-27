import { FormControl, ThemeProvider, createTheme } from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useResolvedPath } from "react-router-dom";
import Web3 from "web3";
import {
  createNewDrop,
  getCategoriesList,
  stripeAccountStatus,
  stripeOnBoarding,
  uploadImage,
} from "../../../../components/API/AxiosInterceptor";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import {
  DropBannerDefaultImage,
  defaultProfile,
} from "../../../../components/ImageURLs/URLs";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import WorkInProgressModal from "../../../../components/Modals/WorkInProgressModal";
import SelectNFTAndSaleType from "../../../../components/Radio/SelectNFTAndSaleType";
import Select from "../../../../components/Select/Select";
import SelectDescription from "../../../../components/Select/SelectDescription";
import NotificationSnackbar from "../../../../components/Snackbar/NotificationSnackbar";
import UploadFile from "../../../../components/Upload/UploadFile";
import SubmitButton from "../../../../components/buttons/SubmitButton";
import WhiteSpinner from "../../../../components/Spinners/WhiteSpinner";
import DropBannerUpload from "../../../../components/Upload/DropBannerUpload";
import AutocompleteAddNft from "../../../../components/Autocomplete/Autocomplete";
import getCroppedImg from "../../../../components/Utils/Crop";
import ImageCropModal from "../../../../components/Modals/ImageCropModal";
import StripeAccountCreationModal from "../../../../components/Modals/StripeAccountCreationModal";
import StripeAccountMessageCard from "../../../../components/MessageCards/StripeAccountMessageCard";

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
  const path = useResolvedPath("").pathname;
  const [saleType, setSaleType] = useState("fixed-price");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(defaultProfile);
  const [bannerImage, setBannerImage] = useState(
    // "https://images.unsplash.com/photo-1590845947670-c009801ffa74?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1459&q=80"
    DropBannerDefaultImage
  );
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [, setDropId] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [network, setNetwork] = useState("");

  const [isUploadingIPFS, setIsUploadingIPFS] = useState(false);
  const [nftType, setNftType] = useState("1155");
  const [versionB, setVersionB] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [category, setCategory] = useState("");
  const [workProgressModalShow, setWorkProgressModalShow] = useState(false);
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(1 / 1);
  const [showCropModal, setShowCropModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [isUploadingCroppedImage, setIsUploadingCroppedImage] = useState();
  const [imageCounter, setImageCounter] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropShape, setCropShape] = useState("round");
  const [showStripeAccountCreationModal, setShowStripeAccountCreationModal] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleCloseNetworkModal = () => setShowNetworkModal(false);
  const handleShowNetworkModal = () => setShowNetworkModal(true);

  const handleShowLoader = () => {
    setIsLoading(true);
  };

  const handleCloseLoader = () => {
    setIsLoading(false);
  };

  const handleShowStripeAccountCreationModal = () => {
    setShowStripeAccountCreationModal(true);
  };

  const handleCloseStripeAccountCreationModal = () => {
    setShowStripeAccountCreationModal(false);
  };

  const [open, setOpen] = useState(false);
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };

  const navigate = useNavigate();

  const getCategories = () => {
    getCategoriesList()
      .then((response) => {
        console.log("Getting drop categories: ", response);
        setCategoriesList(response.data.categories);
      })
      .catch((error) => {
        console.log("Error from getting drop categories: ", error);
      });
  };

  const checkStripeStatus = () => {
    stripeAccountStatus()
      .then((response) => {
        console.log("Response from getting stripe account status: ", response);
        if (response.data.isAccountCreated) {
          handleShowStripeAccountCreationModal();
        }
        handleCloseBackdrop();
      })
      .catch((error) => {
        console.log("Error from getting stripe account status: ", error);
        handleCloseBackdrop();
      });
  };

  const getOnboardingLink = () => {
    handleShowLoader();
    stripeOnBoarding()
      .then((response) => {
        console.log("Response from getting on boarding link: ", response);
        handleCloseLoader();
        window.location.replace(response?.data?.onboardingLink?.url);
      })
      .catch((error) => {
        console.log("Error from getting on boarding link: ", error);
        handleCloseLoader();
      });
  };

  useEffect(() => {
    handleShowBackdrop();
    setVersionB(Cookies.get("Version"));
    getCategories();
    checkStripeStatus();

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
        setSnackbarMessage("Name of the Drop Cannot be Empty.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
        setIsSaving(false);
        handleCloseBackdrop();
      } else if (description === "") {
        let variant = "error";
        setSnackbarMessage("Description of the Drop Cannot be Empty.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
        setIsSaving(false);
        handleCloseBackdrop();
      } else if (image === defaultProfile) {
        let variant = "error";
        setSnackbarMessage("Please Select title image for Drop to continue.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
        setIsSaving(false);
        handleCloseBackdrop();
      } else if (bannerImage === DropBannerDefaultImage) {
        let variant = "error";
        setSnackbarMessage("Please select banner image for drop to continue.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
        setIsSaving(false);
        handleCloseBackdrop();
      } else if (
        category === "" ||
        category === null ||
        category === undefined
      ) {
        let variant = "error";
        setSnackbarMessage("Please Select category to continue.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
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
          category: category,
          marketplaceId: props.marketplaceId,
        };
        console.log("Drop Data", DropData);
        createNewDrop(DropData)
          .then((response) => {
            console.log("drop creation response", response);
            setDropId(response.data.dropId);
            dropID = response.data.dropId;
            props.setSnackbarMessage("Drop Created Successfully");
            props.setSnackbarSeverity("success");
            props.handleSnackbarOpen();
            setIsSaving(false);
            handleCloseBackdrop();
            navigate(`${path}/addNft`, {
              state: {
                dropId: dropID,
                saleType: saleType,
                nftType: nftType,
                marketplaceId: props.marketplaceId,
                dropCategory: category,
              },
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
            setSnackbarMessage("Unable to Create Drop.");
            setSnackbarSeverity(variant);
            handleSnackbarOpen();
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
          setSnackbarMessage("Name of the Drop Cannot be Empty.");
          setSnackbarSeverity(variant);
          handleSnackbarOpen();
          setIsSaving(false);
          handleCloseBackdrop();
        } else if (description === "") {
          let variant = "error";
          setSnackbarMessage("Description of the Drop Cannot be Empty.");
          setSnackbarSeverity(variant);
          handleSnackbarOpen();
          setIsSaving(false);
          handleCloseBackdrop();
        } else if (image === defaultProfile) {
          let variant = "error";
          setSnackbarMessage("Please Select title image for Drop to continue.");
          setSnackbarSeverity(variant);
          handleSnackbarOpen();
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
            marketplaceId: props.marketplaceId,
          };
          console.log("Drop Data", DropData);
          createNewDrop(DropData)
            .then((response) => {
              console.log("drop creation response", response);
              setDropId(response.data.dropId);
              dropID = response.data.dropId;
              props.setSnackbarMessage("Drop Created Successfully");
              props.setSnackbarSeverity("success");
              props.handleSnackbarOpen();
              setIsSaving(false);
              handleCloseBackdrop();
              navigate(`${path}/addNft`, {
                state: {
                  dropId: dropID,
                  saleType: saleType,
                  nftType: nftType,
                  marketplaceId: props.marketplaceId,
                },
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
              setSnackbarMessage("Unable to Create Drop.");
              setSnackbarSeverity(variant);
              handleSnackbarOpen();
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
        setSnackbarMessage("Name of the Drop Cannot be Empty.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
        setIsSaving(false);
        handleCloseBackdrop();
      } else if (description === "") {
        let variant = "error";
        setSnackbarMessage("Description of the Drop Cannot be Empty.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
        setIsSaving(false);
        handleCloseBackdrop();
      } else if (image === defaultProfile) {
        let variant = "error";
        setSnackbarMessage("Please Select title image for Drop to continue.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
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
          marketplaceId: props.marketplaceId,
        };
        console.log("Drop Data", DropData);
        createNewDrop(DropData)
          .then((response) => {
            console.log("drop creation response", response);
            setDropId(response.data.dropId);
            dropID = response.data.dropId;
            setIsSaving(false);

            handleCloseBackdrop();
            navigate(`${path}/addNft`, {
              state: {
                dropId: dropID,
                saleType: saleType,
                nftType: nftType,
                marketplaceId: props.marketplaceId,
              },
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
            setSnackbarMessage("Unable to Create Drop.");
            setSnackbarSeverity(variant);
            handleSnackbarOpen();
          });
      }
    }
  };

  let onChangeBannerFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setAspect(16 / 9);
      setCropShape("rect");
      setIsUploadingBanner(true);
      setSelectedImage("banner");
      setImageSrc(URL.createObjectURL(e.target.files[0]));
      setShowCropModal(true);
    }
  };
  const handleCloseImageCropModal = () => {
    setShowCropModal(false);
    setIsUploadingIPFS(false);
    setIsUploadingBanner(false);
    setImageSrc("");
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      setIsUploadingCroppedImage(true);
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        imageCounter,
        0
      );
      let formData = new FormData();
      formData.append("image", croppedImage);
      await uploadImage(formData)
        .then((response) => {
          if (selectedImage === "banner") {
            setBannerImage(response.data.url);
          } else if (selectedImage === "profile") {
            setImage(response.data.url);
          }
          setIsUploadingIPFS(false);
          setIsUploadingBanner(false);
          setImageSrc("");
          setSelectedImage("");
          setAspect(1 / 1);
          setIsUploadingCroppedImage(false);
          setShowCropModal(false);
          setImageCounter(imageCounter + 1);
          setSnackbarMessage("Image Uploaded Succesfully");
          setSnackbarSeverity("success");
          handleSnackbarOpen();
        })
        .catch((error) => {
          console.log("Error from uploading image", error);
        });
    } catch (e) {
      console.log("Error: ", e);
    }
  });

  let onChangeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCropShape("square");
      setSelectedImage("profile");
      setAspect(1 / 1);
      setImageSrc(URL.createObjectURL(e.target.files[0]));
      setIsUploadingIPFS(true);
      setShowCropModal(true);
    }
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
      {props.isStripeLogin ? null : (
        <StripeAccountMessageCard getOnboardingLink={props.getOnboardingLink} />
      )}
      <div className="card-body p-0">
        <div className="no-gutters">
          <label>Select Banner Image</label>
          <DropBannerUpload
            isUploading={isUploadingBanner}
            onChangeBanner={onChangeBannerFile}
            bannerURL={bannerImage}
          />
          <div className="col-md-12 col-lg-6 p-0">
            <form onSubmit={handleSubmitEvent}>
              <div className="form-group">
                <div className="form-group">
                  <div className="form-group">
                    <label>Select Title Image</label>
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
                      fileURL={image}
                      isUploading={isUploadingIPFS}
                      changeFile={onChangeFile}
                      class="co-12 col-md-auto profile-img mr-3"
                      accept=".png,.jpg,.jpeg,.gif"
                      inputId="dropImage"
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
      <NotificationSnackbar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
      <StripeAccountCreationModal
        show={showStripeAccountCreationModal}
        handleClose={handleCloseStripeAccountCreationModal}
        getOnboardingLink={getOnboardingLink}
        isLoading={isLoading}
      />
    </div>
  );
}

export default NewDrop;
