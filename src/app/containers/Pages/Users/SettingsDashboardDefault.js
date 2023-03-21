// eslint-disable-next-line
import axios from "axios"; // eslint-disable-next-line
import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
// import React, { useEffect } from "react";
import Edit from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import InfoOutlined from "@material-ui/icons/InfoOutlined";
import StorageIcon from "@material-ui/icons/Storage";
import Cookies from "js-cookie";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { isUndefined } from "lodash";
import { useSnackbar } from "notistack";
import { Col, Row, Spinner } from "react-bootstrap";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
// import r1 from '/home/ashba/scytalelabs/robotDropFrontend2/Robotdrop-frontend/src/app/assets/img/patients/patient.jpg';

// import ipfs from 'src/app/components/IPFS/ipfs.js';
import ipfs from "../../../components/IPFS/ipfs";

import { Scrollbars } from "react-custom-scrollbars";
import { useHistory } from "react-router-dom";
import Web3 from "web3";
import ImageCropModal from "../../../components/Modals/ImageCropModal";

// import CreateNFTContract from '../../../../components/blockchain/Abis/Collectible1155.json';
// import * as Addresses from '../../../../components/blockchain/Addresses/Addresses';
// import ipfs from '../../../../components/IPFS/ipfs';
// import ChangeCollectionConfirmationModal from '../../../../components/Modals/ChangeCollectionConfirmationModal';
// import NetworkErrorModal from '../../../../components/Modals/NetworkErrorModal';
// import NFTDetailModal from '../../../../components/Modals/NFTDetailModal';
// import NFTEditModal from '../../../../components/Modals/NFTEditModal';
// import { GLTFModel, AmbientLight, DirectionLight } from "react-3d-viewer";
// import AudioPlayer from "react-h5-audio-player";
// import "react-h5-audio-player/lib/styles.css";
// import { ethers } from "ethers";
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
}));

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

function SettingDashboardDefault(props) {
  let [isAdmin, setIsAdmin] = useState(false);
  let [name, setName] = useState("");
  let [bio, setBio] = useState("");
  let [email, setEmail] = useState("");
  let [editProfile, setEditProfile] = useState(false);
  let [isUploadingIPFS, setIsUploadingIPFS] = useState(false);
  let [isUploadingBannerIPFS, setIsUploadingBannerIPFS] = useState(false);
  const [open, setOpen] = useState(false);
  let [isSaving, setIsSaving] = useState(false);
  let [isUploadingData, setIsUploadingData] = useState(false);
  let [isBannerSelected, setIsBannerSelected] = useState(false);
  let [isProfileSelected, setIsProfileSelected] = useState(false);
  let [imageSrc, setImageSrc] = useState("");
  let [crop, setCrop] = useState({ aspect: 1 });
  let [showCropModal, setShowCropModal] = useState(false);
  let [image, setImage] = useState();
  let [resultImage, setResultImage] = useState();
  let [selectedImage, setSelectedImage] = useState("");
  let [isUploadingCroppedImage, setIsUploadingCroppedImage] = useState();

  const classes = useStyles();

  let [profileImage, setProfileImage] = useState(
    "https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service.png"
  );
  let [bannerImage, setBannerImage] = useState(
    "http://www.mub.eps.manchester.ac.uk/graphene/wp-content/themes/uom-theme/assets/images/default-banner.jpg"
  );
  let [ipfsHash, setIpfsHash] = useState(null);

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
    // if (name === "") {
    //     let variant = "error";
    //     enqueueSnackbar("Username field cannot be empty.", { variant });
    //     setIsSaving(false);
    //     handleCloseBackdrop();
    //     setIsUploadingData(true);
    // }else if (bio === "") {
    //     let variant = "error";
    //     enqueueSnackbar("Bio field cannot be empty.", { variant });
    //     setIsSaving(false);
    //     handleCloseBackdrop();
    //     setIsUploadingData(true);
    // }

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

  let onChangeFile = (e) => {
    setIsUploadingIPFS(true);

    setSelectedImage("profile");
    console.log("In the on change function and file is: ", e.target.files[0]);

    if (e.target.files && e.target.files.length > 0) {
      // SettingsInputComponentSharp(undefined);
      console.log("In the condition");
      const reader = new FileReader();
      reader.onload = () => {
        // console.log("In onload listener", reader.result);
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    setShowCropModal(true);
    setIsUploadingIPFS(false);

    //OLD CODE
    // if (e.target.files[0] !== undefined || e.target.files[0] !== null) {
    //   const reader = new window.FileReader();
    //   let imageNFT = e.target.files[0];
    //   // reader.readAsArrayBuffer(e.target.files[0]);
    //   // reader.onloadend = () => {
    //   //     // setBuffer(Buffer(reader.result));
    //   //     ipfs.add(Buffer(reader.result), async (err, result) => {
    //   //         if (err) {
    //   //             console.log(err);
    //   //             setIsUploadingIPFS(false);
    //   //             let variant = "error";
    //   //             enqueueSnackbar('Unable to Upload Image to IPFS ', { variant });
    //   //             return
    //   //         }
    //   //         console.log("HASH", result[0].hash);
    //   //         setIpfsHash(result[0].hash);
    //   //         let variant = "success";
    //   //         enqueueSnackbar('Image Uploaded to IPFS Successfully', { variant });
    //   //     })
    //   // }
    //   let fileData = new FormData();
    //   fileData.append("image", imageNFT);
    //   axios.post(`/${Cookies.get("Version")}/upload/uploadtos3`, fileData).then(
    //     (response) => {
    //       console.log("response", response);
    //       setProfileImage(response.data.url);
    //       setIsUploadingIPFS(false);
    //       let variant = "success";
    //       enqueueSnackbar("Image Uploaded Successfully", { variant });
    //     },
    //     (error) => {
    //       if (process.env.NODE_ENV === "development") {
    //         console.log(error);
    //         console.log(error.response);
    //       }
    //       setIsUploadingIPFS(false);
    //       let variant = "error";
    //       enqueueSnackbar("Unable to Upload Image .", { variant });
    //     }
    //   );
    // } else {
    //   setIsUploadingIPFS(false);
    // }
  };

  let onChangeBannerFile = async (e) => {
    setIsUploadingBannerIPFS(true);
    setSelectedImage("banner");
    console.log("In the on change function and file is: ", e.target.files[0]);

    if (e.target.files && e.target.files.length > 0) {
      // SettingsInputComponentSharp(undefined);
      console.log("In the condition");
      const reader = new FileReader();
      reader.onload = () => {
        // console.log("In onload listener", reader.result);
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    setShowCropModal(true);
    setIsUploadingBannerIPFS(false);

    // if (e.target.files[0] !== undefined || e.target.files[0] !== null) {
    //   const reader = new window.FileReader();
    //   let imageNFT = e.target.files[0];
    //   // reader.readAsArrayBuffer(e.target.files[0]);
    //   // reader.onloadend = () => {
    //   //     // setBuffer(Buffer(reader.result));
    //   //     ipfs.add(Buffer(reader.result), async (err, result) => {
    //   //         if (err) {
    //   //             console.log(err);
    //   //             setIsUploadingIPFS(false);
    //   //             let variant = "error";
    //   //             enqueueSnackbar('Unable to Upload Image to IPFS ', { variant });
    //   //             return
    //   //         }
    //   //         console.log("HASH", result[0].hash);
    //   //         setIpfsHash(result[0].hash);
    //   //         let variant = "success";
    //   //         enqueueSnackbar('Image Uploaded to IPFS Successfully', { variant });
    //   //     })
    //   // }
    //   let fileData = new FormData();
    //   fileData.append("image", imageNFT);
    //   axios.post(`/${Cookies.get("Version")}/upload/uploadtos3`, fileData).then(
    //     (response) => {
    //       console.log("response", response);
    //       setBannerImage(response.data.url);
    //       setIsUploadingBannerIPFS(false);
    //       let variant = "success";
    //       enqueueSnackbar("Image Uploaded Successfully", { variant });
    //     },
    //     (error) => {
    //       if (process.env.NODE_ENV === "development") {
    //         console.log(error);
    //         console.log(error.response);
    //       }
    //       setIsUploadingBannerIPFS(false);
    //       let variant = "error";
    //       enqueueSnackbar("Unable to Upload Image .", { variant });
    //     }
    //   );
    // } else {
    //   setIsUploadingIPFS(false);
    // }
  };

  let getProfile = () => {
    let version = Cookies.get("Version");
    console.log("Version: ", version);
    console.log("UserId:", sessionStorage.getItem("Authorization"));
    axios
      .get(`${version}/user/profile`)
      .then((response) => {
        console.log("profile data id:", response.data.userData);
        console.log("profile data name:", response.data.userData.imageURL);
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

  // const onCropComplete = (croppedArea, croppedAreaPixels) => {
  //   // use croppedAreaPixels to get the cropped image data
  //   console.log(croppedAreaPixels);
  // };
  const onCropComplete = (c) => {
    // use croppedAreaPixels to get the cropped image data
    console.log(c);
  };

  const onImageLoad = (e) => {
    console.log("Crop is: ", crop);
    console.log("Current target: ", e.currentTarget);
    setImage(e.currentTarget);
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 16 / 9));
  };

  const getCroppedImage = async () => {
    try {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
      const base64Image = canvas.toDataURL("image/jpeg", 1);
      setResultImage(base64Image);

      // As a blob
      return new Promise((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], "cropped-image.png", {
              type: "image/png",
            });
            // file.name = "image";
            resolve(file);
          },
          "image/jpeg",
          1
        );
      });
    } catch (e) {
      console.log("crop the image");
    }
  };

  const getBlobImage = async () => {
    try {
      setIsUploadingCroppedImage(true);
      let blobImage = await getCroppedImage();

      console.log("Blob Image", blobImage);

      let formData = new FormData();

      formData.append("image", blobImage);

      console.log("Form data to upload image", formData);
      const reader = new window.FileReader();

      console.log("Before onload call");
      reader.readAsArrayBuffer(blobImage);
      reader.onloadend = () => {
        // setBuffer(Buffer(reader.result));
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
          enqueueSnackbar("Image Uploaded to IPFS Successfully", { variant });
        });
      };

      await axios.post("/upload/image/", formData).then(
        (response) => {
          console.log("Response from uploading Image", response);
          if (selectedImage === "banner") {
            setBannerImage(response.data.url);
          } else if (selectedImage === "profile") {
            setProfileImage(response.data.url);
          }
          setIsUploadingCroppedImage(false);
          setShowCropModal(false);
          let variant = "success";
          enqueueSnackbar("Image uploaded successfully", { variant });
        },
        (error) => {
          console.log("Error from uploading image", error);
        }
      );
    } catch {
      setIsUploadingCroppedImage(false);
      let variant = "error";
      enqueueSnackbar("Error uploading Image", { variant });
    }
  };

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
            {/* banner */}
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

          {/* profile pic */}

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
      {isAdmin ? null : (
        <>
          <div className="row pt-5">
            <h1 className="profileDetailHeading">Profile Details</h1>
          </div>

          {/* <ul className="breadcrumb" style={{ backgroundColor: "rgb(167,0,0)" }}>
                <li className="breadcrumb-item">
                    <a href="/">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">New NFT</li>
            </ul> */}
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
                      {/* <label>About the Art</label> */}
                      <textarea
                        type="text"
                        value={bio}
                        required
                        rows="4"
                        // value={description}
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

                    {/* <label>Link</label>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        required
                                        
                                        placeholder="yoursite.io"
                                        className="form-control"
                                        // onChange={(e) => {
                                        //     setName(e.target.value)
                                        // }}
                                    />
                                </div> */}
                    <label>Wallet Address</label>
                    <div className="form-group">
                      <input
                        type="text"
                        readOnly="true"
                        value={sessionStorage.getItem("Address")}
                        placeholder="Wallet Address"
                        className="form-control"
                        // onChange={(e) => {
                        //     setName(e.target.value)
                        // }}
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

                    {/* {
                                    isSaving ? (
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
                                            <button type="button" onClick={(e) => handleSubmitEvent(e)} className="btn submit-btn">
                                                Add Collection
                                            </button>
                                        </div>

                                    )
                                } */}
                  </div>
                </form>
              </div>
              <div className="col-md-12 col-lg-4">
                {/* <!-- Change Password Form --> */}
                <form>
                  {/* <Scrollbars style={{ height: 1500 }}> */}

                  <div className="form-group">
                    {/* <label>Profile Image </label>
                                    <span  title = "TOOLTIP">
                                        <i class="fa fa-info-circle fa-fw" ></i>
                                    </span>
                                {isUploadingIPFS ? (
                                                <div className="text-center">
                                                    <Spinner
                                                        animation="border"
                                                        role="status"
                                                        style={{ color: "#fff" }}
                                                    >
                                                    </Spinner>
                                                </div>
                                    ):(
                                <div className="filter-widget">
                                    <div className="form-group">
                                        <div className="change-avatar" >
                                        <div style = {{position : 'relative' }} >
                                            <div className="profile-img"
                                            >
                                                <div
                                                    style={{
                                                    
                                                        width: "100px",
                                                        height: "100px",
                                                       
                                                        
                                                        borderRadius : "50px"
                                                    
                                                    }}
                                                >
                                                    <img  />
                                                </div>
                                            </div>
                                            <div style = {{ position: "absolute" , top: "0",
                                                bottom: "0",
                                                left: "0",
                                                right: "0",
                                                height: "100px",
                                                width: "100px",
                                                opacity: "0",
                                                transition: ".3s ease",
                                                backgroundColor: "rgba(0,0,0,.5)" }}  onMouseEnter={handleOverlay} onMouseLeave={handleRemoveOverlay} >
                                     
                                                   <div style={{
                                                        color : "white",
                                                        position: "absolute",
                                                        top: "50%",
                                                        left: "50%",
                                                        transform: "translate(-50%, -50%)",
                                                        msTransform: "translate(-50%, -50%)",
                                                        textAlign: "center",}}
                                                        
                                                        >
                                                        <i className="fa fa-pen"></i>
                                                        <input
                                                            name="sampleFile"
                                                            type="file"
                                                            className="upload"
                                                            accept=".png,.jpg,.jpeg,.gif"
                                                            style={{display: "none"}}
                                                            onChange={onChangeFile}
                                                        />
                                                    </div> 
                                                              
                                             </div>    
                                                         
                                                       
                                                           
                                                       
                                        </div>
                                                    
                                            
                                           

                                        </div>
                                    </div>
                                </div>
                                )} */}

                    {/* <span  title = "TOOLTIP">
                                        <i class="fa fa-info-circle fa-fw" ></i>
                                </span>
                                <div className="filter-widget">
                                    <div className="form-group">
                                        <div className="change-avatar" >
                                        <div style = {{position : 'relative' }} >
                                            <div className="profile-img"
                                            >
                                                <div
                                                    style={{
                                                    
                                                        width: "100px",
                                                        height: "100px",
                                                       
                                                        
                                                        borderRadius : "50px"
                                                    
                                                    }}
                                                >
                                                    <img  />
                                                </div>
                                            </div>
                                            <div style = {{ position: "absolute" , top: "0",
                                                bottom: "0",
                                                left: "0",
                                                right: "0",
                                                height: "100px",
                                                width: "100px",
                                                opacity: "0",
                                                transition: ".3s ease",
                                                backgroundColor: "rgba(0,0,0,.5)" }}  onMouseEnter={handleOverlay} onMouseLeave={handleRemoveOverlay} >
                                     
                                                   <div style={{
                                                        color : "white",
                                                        position: "absolute",
                                                        top: "50%",
                                                        left: "50%",
                                                        transform: "translate(-50%, -50%)",
                                                        msTransform: "translate(-50%, -50%)",
                                                        textAlign: "center",}}><i className="fa fa-pen"></i>
                                                    </div> 
                                                              
                                             </div>    
                                                         
                                                       
                                                           
                                                       
                                        </div>
                                            

                                        </div>
                                    </div>
                                </div> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
      {/* {imageSrc ? (
        <React.Fragment
        // style={{
        //   marginTop: "200px",
        //   display: "flex",
        //   flexDirection: "column",
        //   marginBottom: "200px",
        // }}
        >
          <span>Hello it has to place here</span>
          <ReactCrop
            // src={imageSrc}
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
            onComplete={onCropComplete}
            aspect={1 / 1}
          >
            <img
              src={imageSrc}
              onLoad={onImageLoad}
              // style={{ transform: `scale(3) rotate(0deg)` }}
            />
          </ReactCrop>
        </React.Fragment>
      ) : null} */}
      <ImageCropModal
        show={showCropModal}
        handleClose={() => setShowCropModal(false)}
        crop={crop}
        setCrop={setCrop}
        onCropComplete={onCropComplete}
        imageSrc={imageSrc}
        onImageLoad={onImageLoad}
        resultImage={resultImage}
        getCroppedImage={getBlobImage}
        isUploadingCroppedImage={isUploadingCroppedImage}
      />
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default SettingDashboardDefault;
