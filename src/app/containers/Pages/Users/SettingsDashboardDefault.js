import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import r1 from "../../../assets/img/patients/patient.jpg";
import {
  updateAdminProfileSSO,
  updateUserProfileVersioned,
  uploadImage
} from "../../../components/API/AxiosInterceptor";
import CircularBackdrop from "../../../components/Backdrop/Backdrop";
import ProfileDetailInput from "../../../components/Input/ProfileDetailInput";
import ImageCropModal from "../../../components/Modals/ImageCropModal";
import ProfileUpdationConfirmationModal from "../../../components/Modals/ProfileUpdationConfirmationModal";
import getCroppedImg from "../../../components/Utils/Crop";
import ProfileDetailBanner from "../../../components/banners/ProfileDetailBanner";
import { getAdminProfileData } from "../../../redux/getAdminProfileDataSlice";
import { getUserProfile } from "../../../redux/getUserProfileSlice";

function SettingDashboardDefault(props) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isUploadingIPFS, setIsUploadingIPFS] = useState(false);
  const [isUploadingBannerIPFS, setIsUploadingBannerIPFS] = useState(false);
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [, setIsUploadingData] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(1 / 1);
  const [showCropModal, setShowCropModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [isUploadingCroppedImage, setIsUploadingCroppedImage] = useState();
  const [imageCounter, setImageCounter] = useState(0);
  const [adminName, setAdminName] = useState("");
  const [adminCompanyName, setAdminCompanyName] = useState("");
  const [adminDomain, setAdminDomain] = useState("");
  const [adminDesignation, setAdminDesignation] = useState("");
  const [adminOldData, setAdminOldData] = useState({});
  const [adminReasonForInterest, setAdminReasonForInterest] = useState("");
  const [adminIndustry, setAdminIndustry] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropShape, setCropShape] = useState("round");
  const { userData, loading } = useSelector((store) => store.userProfile);
  const { adminUserData, adminLoading } = useSelector((store) => store.getAdminProfileData);
  const dispatch = useDispatch();

  const [profileImage, setProfileImage] = useState(
    "https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service.png"
  );
  const [bannerImage, setBannerImage] = useState(r1);
  const { enqueueSnackbar } = useSnackbar();
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

    updateUserProfileVersioned(Cookies.get("Version"), data)
      .then((response) => {
        let variant = "success";
        enqueueSnackbar("Profile Updated Succesfully", { variant });
        setIsUploadingData(false);
        handleCloseBackdrop();
        props.setUpdateProfile(profileImage);
      })
      .catch((error) => {
        console.log("Error on profile update: ", error);
        console.log("Error on profile update: ", error.response);
        setIsUploadingData(false);
        handleCloseBackdrop();
        let variant = "error";
        enqueueSnackbar("Unable to Update Profile", { variant });
      });
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
    dispatch(getUserProfile());
    setName(userData.username);
    setBio(userData.bio);
    userData.imageURL &&
      setProfileImage(userData.imageURL);
    userData.bannerURL &&
      setBannerImage(userData.bannerURL);
    setEmail(userData.email);
    setWalletAddress(userData.walletAddress)
  };

  const getAdminProfile = async () => {
    dispatch(getAdminProfileData());
    console.log("dispatchResp", adminUserData);
    setAdminOldData(adminUserData);
    setProfileImage(adminUserData.imageURL);
    adminUserData.bannerURL &&
      setBannerImage(adminUserData.bannerURL);
    setAdminCompanyName(adminUserData.companyName);
    setAdminDesignation(adminUserData.designation);
    setAdminDomain(adminUserData.domain);
    setAdminName(adminUserData.username);
    setAdminReasonForInterest(adminUserData.reasonForInterest);
    setAdminIndustry(adminUserData.industryType);
  };

  const handleSubmitAdminProfile = (e) => {
    e.preventDefault();
    if (
      adminCompanyName === adminOldData.companyName &&
      adminDomain === adminOldData.domain &&
      profileImage === adminOldData.imageURL &&
      adminName === adminOldData.username &&
      bannerImage === adminOldData.bannerURL
    ) {
      let variant = "info";
      enqueueSnackbar("No updation in data", { variant });
    } else if (adminName === "" || adminCompanyName === "") {
      let variant = "error";
      enqueueSnackbar("Please fill all editable fields", { variant });
    } else {
      setShowConfirmationModal(true);
    }
  };

  const updateData = async () => {
    let data = {
      companyName: adminCompanyName,
      imageURL: profileImage,
      bannerURL: bannerImage,
      username: adminName,
    };
    await updateAdminProfileSSO(data)
      .then((response) => {
        setShowConfirmationModal(false);
        let variant = "success";
        enqueueSnackbar("Data updated successfully", { variant });
      })
      .catch((error) => {
        console.log("Error from updating admin data: ", error);
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
      let formData = new FormData();
      formData.append("image", croppedImage);
      await uploadImage(formData)
        .then((response) => {
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
        })
        .catch((error) => {
          console.log("Error from uploading image", error);
        });
    } catch (e) {
      console.log("Error: ", e);
    }
  });

  useEffect(() => {
    props.setActiveTab({
      profile: "active",
      offer: "",
    });
    if (props.user === "admin") {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    if (props.user === "user") {
      getProfile();
    }
  }, [loading]);

  useEffect(() => {
    if (props.user === "admin") {
      getAdminProfile();
    }
  }, [adminLoading]);

  return (
    <div>
      <ProfileDetailBanner
        bannerImage={bannerImage}
        isUploadingBannerIPFS={isUploadingBannerIPFS}
        onChangeBannerFile={onChangeBannerFile}
        profileImage={profileImage}
        isUploadingIPFS={isUploadingIPFS}
        onChangeFile={onChangeFile}
      />
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
                    <ProfileDetailInput
                      type="text"
                      label="Name"
                      placeholder="Enter Name"
                      set={setAdminName}
                      value={adminName}
                    />
                    <ProfileDetailInput
                      type="text"
                      label="Company Name"
                      placeholder="Enter Company Name"
                      set={setAdminCompanyName}
                      value={adminCompanyName}
                    />
                    <ProfileDetailInput
                      type="text"
                      label="Domain"
                      placeholder="Enter Domain"
                      disabled={true}
                      value={adminDomain}
                    />
                    <ProfileDetailInput
                      type="text"
                      label="Designation"
                      placeholder="Enter Designation"
                      disabled={true}
                      value={adminDesignation}
                    />
                    <ProfileDetailInput
                      type="text"
                      label="Industry"
                      disabled={true}
                      value={adminIndustry}
                    />
                    <ProfileDetailInput
                      type="text"
                      label="Reason For Interest"
                      disabled={true}
                      value={adminReasonForInterest}
                      row="4"
                    />
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
                          onClick={(e) => handleSubmitAdminProfile(e)}
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
                    <ProfileDetailInput
                      type="text"
                      label="Username"
                      placeholder="Enter Username"
                      set={setName}
                      value={name}
                    />
                    <ProfileDetailInput
                      type="text"
                      label="Bio"
                      placeholder="Tell the world your story!"
                      set={setBio}
                      value={bio}
                      row="4"
                    />

                    {Cookies.get("Version") != "v2-wallet-login" && (
                      <ProfileDetailInput
                        type="email"
                        label="Email"
                        placeholder="Enter Email"
                        set={setEmail}
                        value={email}
                        disabled
                      />
                    )}
                    <ProfileDetailInput
                      type="text"
                      label="Wallet Address"
                      placeholder="Wallet Address"
                      set={setWalletAddress}
                      value={walletAddress}
                      disabled
                    />
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
      <ProfileUpdationConfirmationModal
        show={showConfirmationModal}
        handleClose={() => setShowConfirmationModal(false)}
        updateData={updateData}
      />
      <CircularBackdrop open={open} />
    </div>
  );
}

export default SettingDashboardDefault;
