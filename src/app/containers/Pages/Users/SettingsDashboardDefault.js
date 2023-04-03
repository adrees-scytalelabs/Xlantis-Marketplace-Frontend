import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Edit from "@material-ui/icons/Edit";
import axios from "axios"; 
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import ImageCropModal from "../../../components/Modals/ImageCropModal";
import getCroppedImg from "../../../components/Utils/Crop";

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
}));

function SettingDashboardDefault(props) {
  let [isAdmin, setIsAdmin] = useState(false);
  let [name, setName] = useState("");
  let [bio, setBio] = useState("");
  let [email, setEmail] = useState("");
  let [isUploadingIPFS, setIsUploadingIPFS] = useState(false);
  let [isUploadingBannerIPFS, setIsUploadingBannerIPFS] = useState(false);
  const [open, setOpen] = useState(false);
  let [isSaving, setIsSaving] = useState(false);
  let [isUploadingData, setIsUploadingData] = useState(false);
  let [imageSrc, setImageSrc] = useState("");
  let [crop, setCrop] = useState({ x: 0, y: 0 });
  let [zoom, setZoom] = useState(1);
  let [aspect, setAspect] = useState(1 / 1);
  let [showCropModal, setShowCropModal] = useState(false);
  let [selectedImage, setSelectedImage] = useState("");
  let [isUploadingCroppedImage, setIsUploadingCroppedImage] = useState();
  let [imageCounter, setImageCounter] = useState(0);
  let [adminName, setAdminName] = useState("");
  let [adminCompanyName, setAdminCompanyName] = useState("");
  let [adminDomain, setAdminDomain] = useState("");
  let [adminDesignation, setAdminDesignation] = useState("");
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropShape, setCropShape] = useState("round");

  const classes = useStyles();

  let [profileImage, setProfileImage] = useState(
    "https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service.png"
  );
  let [bannerImage, setBannerImage] = useState(
    "http://www.mub.eps.manchester.ac.uk/graphene/wp-content/themes/uom-theme/assets/images/default-banner.jpg"
  );

  const { enqueueSnackbar } = useSnackbar();

  const handleOverlay = (e) => {
    e.target.style.opacity = 1;
  };

  const handleRemoveOverlay = (e) => {
    e.target.style.opacity = 0;
  };
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };

  const handleSubmitEvent = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    handleShowBackdrop();

    let data = {
      walletAddress: sessionStorage.getItem("Address"),
      username: name,
      bio: bio,
      email: email,
      imageURL: profileImage,
      bannerURL: bannerImage,
    };

    console.log("data", data);

    axios.put(`/${Cookies.get("Version")}/user/profile`, data).then(
      (response) => {
        console.log("profile update response: ", response);
        let variant = "success";
        enqueueSnackbar("Profile Updated Succesfully", { variant });
        setIsUploadingData(false);
        handleCloseBackdrop();
        props.setUpdateProfile(profileImage);
      },
      (error) => {
        console.log("Error on profile update: ", error);
        console.log("Error on profile update: ", error.response);

        setIsUploadingData(false);

        handleCloseBackdrop();

        let variant = "error";
        enqueueSnackbar("Unable to Update Profile", { variant });
      }
    );

    setIsSaving(false);
  };

  const handleCloseImageCropModal = () => {
    setShowCropModal(false);
    setIsUploadingBannerIPFS(false);
    setIsUploadingIPFS(false);
    setImageSrc("");
  };

  let onChangeFile = async (e) => {
    let file = e.target.files[0];
    if (file) {
      setCropShape("round");
      setIsUploadingIPFS(true);
      setSelectedImage("profile");
      setAspect(1 / 1);
      setImageSrc(URL.createObjectURL(e.target.files[0]));
      setShowCropModal(true);
    }
  };

  let onChangeBannerFile = async (e) => {
    let file = e.target.files[0];
    if (file) {
      setAspect(16 / 9);
      setCropShape("rect");
      setIsUploadingBannerIPFS(true);
      setSelectedImage("banner");
      setImageSrc(URL.createObjectURL(e.target.files[0]));
      setShowCropModal(true);
    }
  };

  let getProfile = () => {
    let version = Cookies.get("Version");
    console.log("Version: ", version);
    console.log("UserId:", sessionStorage.getItem("Authorization"));
    axios
      .get(`${version}/user/profile`)
      .then((response) => {
        console.log("Response from getting user: ", response);
        setName(response.data.userData.username);
        setBio(response.data.userData.bio);
        response.data.userData.imageURL &&
          setProfileImage(response.data.userData.imageURL);
        response.data.userData.bannerURL &&
          setBannerImage(response.data.userData.bannerURL);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
      });
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
      console.log("Done: ", { croppedImage });
      let formData = new FormData();
      formData.append("image", croppedImage);
      await axios.post("/upload/image/", formData).then(
        (response) => {
          console.log("Response from uploading Image", response);
          if (selectedImage === "banner") {
            setBannerImage(response.data.url);
            setIsUploadingBannerIPFS(false);
          } else if (selectedImage === "profile") {
            setProfileImage(response.data.url);
            setIsUploadingIPFS(false);
          }
          setImageSrc("");
          setSelectedImage("");
          setAspect(1 / 1);
          setIsUploadingCroppedImage(false);
          setShowCropModal(false);
          setImageCounter(imageCounter + 1);
          let variant = "success";
          enqueueSnackbar("Image uploaded successfully", { variant });
        },
        (error) => {
          console.log("Error from uploading image", error);
        }
      );
    } catch (e) {
      console.log("Error: ", e);
    }
  });

  useEffect(() => {
    if (props.user === "admin") {
      setIsAdmin(true);
    }
    props.setActiveTab({
      profile: "active",
      offer: "",
    });
    getProfile();
  }, []);

  return (
    <div>
      <div className="row no-gutters">
        <div className="col-12">
          <div
            className="banner-img"
            style={{ backgroundImage: `url(${bannerImage})` }}
          >
            {isUploadingBannerIPFS ? (
              <div
                className="text-center"
                style={{ position: "relative", top: "150px", right: "10px" }}
              >
                <Spinner
                  animation="border"
                  role="status"
                  style={{ color: "#FFFFFF" }}
                ></Spinner>
              </div>
            ) : (
              <label htmlFor="banner-file-input" className="banner-input-label">
                <div className="banner-dark-layer">
                  <Edit fontSize="large" id="banner-icon" />
                </div>
              </label>
            )}

            <input
              id="banner-file-input"
              type="file"
              onChange={onChangeBannerFile}
            />
          </div>
          <div
            style={{
              backgroundImage: `url(${profileImage})`,
              marginLeft: "1%",
            }}
            className="profile-backgrnd"
          >
            {isUploadingIPFS ? (
              <div
                className="text-center"
                style={{ position: "relative", top: "70px" }}
              >
                <Spinner
                  animation="border"
                  role="status"
                  style={{ color: "#FFFFFF" }}
                ></Spinner>
              </div>
            ) : (
              <label
                htmlFor="profile-file-input"
                className="profile-input-label"
              >
                <div className="profile-dark-layer">
                  <Edit fontSize="medium" id="profile-icon" />
                </div>
              </label>
            )}

            <input
              id="profile-file-input"
              type="file"
              onChange={onChangeFile}
            />
          </div>
        </div>
      </div>
      {isAdmin ? (
        <>
          <div className="row pt-5">
            <h1 className="profileDetailHeading">Profile Details</h1>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 col-lg-6">
                <form>
                  <div className="form-group">
                    <label>Name</label>
                    <div className="form-group">
                      <input
                        type="text"
                        required
                        value={adminName}
                        placeholder="Enter Name"
                        className="form-control"
                        onChange={(e) => {
                          setAdminName(e.target.value);
                        }}
                      />
                    </div>
                    <label>Company Name</label>
                    <div className="form-group">
                      <textarea
                        type="text"
                        value={adminCompanyName}
                        required
                        placeholder="Enter Company Name"
                        className="form-control"
                        onChange={(e) => {
                          setAdminCompanyName(e.target.value);
                        }}
                      />
                    </div>
                    <>
                      <label>Domain</label>
                      <div className="form-group">
                        <input
                          type="text"
                          required
                          value={adminDomain}
                          placeholder="Enter Domain"
                          className="form-control"
                          onChange={(e) => {
                            setAdminDomain(e.target.value);
                          }}
                        />
                      </div>
                    </>
                    <label>Designation</label>
                    <div className="form-group">
                      <input
                        type="text"
                        required
                        value={adminDesignation}
                        placeholder="Enter Designation"
                        className="form-control"
                        onChange={(e) => {
                          setAdminDesignation(e.target.value);
                        }}
                      />
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
                          className="btn submit-btn"
                          id="save-profile-btn"
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="row pt-5">
            <h1 className="profileDetailHeading">Profile Details</h1>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 col-lg-6">
                <form>
                  <div className="form-group">
                    <label>Username</label>
                    <div className="form-group">
                      <input
                        type="text"
                        required
                        value={name}
                        placeholder="Enter Username"
                        className="form-control"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                    <label>Bio</label>
                    <div className="form-group">
                      <textarea
                        type="text"
                        value={bio}
                        required
                        rows="4"
                        placeholder="Tell the world your story!"
                        className="form-control"
                        onChange={(e) => {
                          setBio(e.target.value);
                        }}
                      />
                    </div>
                    {Cookies.get("Version") != "v2-wallet-login" && (
                      <>
                        <label>Email</label>
                        <div className="form-group">
                          <input
                            type="email"
                            required
                            value={email}
                            placeholder="Enter Email"
                            className="form-control"
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                        </div>
                      </>
                    )}
                    <label>Wallet Address</label>
                    <div className="form-group">
                      <input
                        type="text"
                        readOnly={true}
                        value={sessionStorage.getItem("Address")}
                        placeholder="Wallet Address"
                        className="form-control"
                      />
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
                          id="save-profile-btn"
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
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
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default SettingDashboardDefault;
