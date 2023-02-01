// eslint-disable-next-line
import axios from "axios";// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import React, { useEffect } from "react";
import Edit from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import InfoOutlined  from "@material-ui/icons/InfoOutlined";
import StorageIcon from '@material-ui/icons/Storage';
import Cookies from "js-cookie";
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { isUndefined } from 'lodash';
import { useSnackbar } from 'notistack';
import { Col, Row, Spinner } from "react-bootstrap";
// import r1 from '/home/ashba/scytalelabs/robotDropFrontend2/Robotdrop-frontend/src/app/assets/img/patients/patient.jpg';
import r1 from '../../../assets/img/patients/patient.jpg';
// import ipfs from 'src/app/components/IPFS/ipfs.js';

import { Scrollbars } from 'react-custom-scrollbars';
import { useHistory } from 'react-router-dom';
import Web3 from 'web3';
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
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    badge: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },

    card: {
        minWidth: 250,
    },
    media: {
        height: 0,
        paddingTop: '100%', // 16:9
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));
function SettingDashboardDefault(props) {

  let [name, setName] = useState("");
  let [bio, setBio] = useState("");
  let [email, setEmail] = useState("");
  let [editProfile, setEditProfile]= useState(false);
  let [isUploadingIPFS, setIsUploadingIPFS] = useState(false);
  let [isUploadingBannerIPFS, setIsUploadingBannerIPFS] = useState(false);
  const [open, setOpen] = useState(false);
  let [isSaving, setIsSaving] = useState(false);
  let [isUploadingData, setIsUploadingData] = useState(false);
  const classes = useStyles();


  
  let [profileImage, setProfileImage] = useState(r1);
  let [bannerImage, setBannerImage] = useState(r1);
  let [ipfsHash, setIpfsHash] = useState(null);

  const { enqueueSnackbar } = useSnackbar();
  
  const handleOverlay = (e) => {
    e.target.style.opacity = 1;
  } 
  
  const handleRemoveOverlay = (e) => {
    e.target.style.opacity = 0;
  }
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


        let data ={
            "walletAddress" : sessionStorage.getItem("Address"),
            "username" : name,
            "bio" : bio,
            "email" : email,
            "imageURL": profileImage,
            "bannerURL" : bannerImage
        }

        console.log("data", data);

        axios.put("user/profile", data).then(
            (response) => {
                console.log("profile update response: ", response);
                let variant = "success";
                enqueueSnackbar('Profile Updated Succesfully', { variant });
                setIsUploadingData(false);
                handleCloseBackdrop();

            },
            (error) => {
                console.log("Error on profile update: ", error);      
                console.log("Error on profile update: ", error.response);                            

                setIsUploadingData(false);

                handleCloseBackdrop();

                let variant = "error";
                enqueueSnackbar('Unable to Update Profile', { variant });
            }
        )

        setIsSaving(false);
        
            

    
    };

  let onChangeFile = (e) => {
        setIsUploadingIPFS(true);

        if (e.target.files[0] !== undefined || e.target.files[0] !== null) {
            const reader = new window.FileReader();
            let imageNFT = e.target.files[0]
            // reader.readAsArrayBuffer(e.target.files[0]);
            // reader.onloadend = () => {
            //     // setBuffer(Buffer(reader.result));
            //     ipfs.add(Buffer(reader.result), async (err, result) => {
            //         if (err) {
            //             console.log(err);
            //             setIsUploadingIPFS(false);
            //             let variant = "error";
            //             enqueueSnackbar('Unable to Upload Image to IPFS ', { variant });
            //             return
            //         }
            //         console.log("HASH", result[0].hash);
            //         setIpfsHash(result[0].hash);
            //         let variant = "success";
            //         enqueueSnackbar('Image Uploaded to IPFS Successfully', { variant });
            //     })
            // }
            let fileData = new FormData();
            fileData.append("image", imageNFT);
            axios.post("upload/uploadtos3", fileData).then(
                (response) => {
                    console.log("response", response);
                    setProfileImage(response.data.url);
                    setIsUploadingIPFS(false);
                    let variant = "success";
                    enqueueSnackbar('Image Uploaded to S3 Successfully', { variant });
                },
                (error) => {
                    if (process.env.NODE_ENV === "development") {
                        console.log(error);
                        console.log(error.response);
                    }
                    setIsUploadingIPFS(false);
                    let variant = "error";
                    enqueueSnackbar('Unable to Upload Image to S3 .', { variant });

                }
            );

        } else {
            setIsUploadingIPFS(false);
        }
    }

    let onChangeBannerFile = (e) => {
        setIsUploadingBannerIPFS(true);

        if (e.target.files[0] !== undefined || e.target.files[0] !== null) {
            const reader = new window.FileReader();
            let imageNFT = e.target.files[0]
            // reader.readAsArrayBuffer(e.target.files[0]);
            // reader.onloadend = () => {
            //     // setBuffer(Buffer(reader.result));
            //     ipfs.add(Buffer(reader.result), async (err, result) => {
            //         if (err) {
            //             console.log(err);
            //             setIsUploadingIPFS(false);
            //             let variant = "error";
            //             enqueueSnackbar('Unable to Upload Image to IPFS ', { variant });
            //             return
            //         }
            //         console.log("HASH", result[0].hash);
            //         setIpfsHash(result[0].hash);
            //         let variant = "success";
            //         enqueueSnackbar('Image Uploaded to IPFS Successfully', { variant });
            //     })
            // }
            let fileData = new FormData();
            fileData.append("image", imageNFT);
            axios.post("upload/uploadtos3", fileData).then(
                (response) => {
                    console.log("response", response);
                    setBannerImage(response.data.url);
                    setIsUploadingBannerIPFS(false);
                    let variant = "success";
                    enqueueSnackbar('Image Uploaded to S3 Successfully', { variant });
                },
                (error) => {
                    if (process.env.NODE_ENV === "development") {
                        console.log(error);
                        console.log(error.response);
                    }
                    setIsUploadingBannerIPFS(false);
                    let variant = "error";
                    enqueueSnackbar('Unable to Upload Image to S3 .', { variant });

                }
            );

        } else {
            setIsUploadingIPFS(false);
        }
    }


  useEffect(() => {
    props.setActiveTab({
      profile: "active",
      offer: "",
     
    });
    
    // eslint-disable-next-line
  }, []);

  return (
   
            <div >
                
                    <div className="row">
                        <h1 className="page-title">Profile Details</h1>
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
                                        
                                        placeholder="Enter Username"
                                        className="form-control"
                                        onChange={(e) => {
                                            setName(e.target.value)
                                        }}
                                    />
                                </div>
                                <label>Bio</label>
                                <div className="form-group">
                                    {/* <label>About the Art</label> */}
                                    <textarea
                                        type="text"
                                        required
                                        rows="4"
                                        // value={description}
                                        placeholder="Tell the world your story!"
                                        className="form-control"
                                        onChange={(e) => {
                                            setBio(e.target.value)
                                        }}
                                    />
                                </div>
                                <label>Email</label>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        required
                                        
                                        placeholder="Enter Email"
                                        className="form-control"
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}
                                    />
                                </div>
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
                                </div>):(

                                <div className="submit-section">
                                            <button type="button"  onClick={(e) => handleSubmitEvent(e)}  className="btn submit-btn" >
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
                        <form >
                            {/* <Scrollbars style={{ height: 1500 }}> */}

                            <div className="form-group">
                            <label>Profile Image</label>
                                <div className="filter-widget">
                                    <div className="form-group">
                                        <div className="change-avatar">
                                            <div className="profile-img">
                                                <div
                                                    style={{
                                                        background: "#E9ECEF",
                                                        width: "100px",
                                                        height: "100px",
                                                    }}
                                                >
                                                    <img src={profileImage} alt="Selfie" />
                                                </div>
                                            </div>
                                            <div className="upload-img">
                                                <div
                                                    className="change-photo-btn"
                                                    style={{ backgroundColor: "rgb(167,0,0)" }}
                                                >
                                                    {isUploadingIPFS ? (
                                                        <div className="text-center">
                                                            <Spinner
                                                                animation="border"
                                                                role="status"
                                                                style={{ color: "#fff" }}
                                                            >
                                                            </Spinner>
                                                        </div>
                                                    ) : (
                                                        <span><i className="fa fa-upload"></i>Upload photo</span>
                                                    )}

                                                    <input
                                                        name="sampleFile"
                                                        type="file"
                                                        className="upload"
                                                        accept=".png,.jpg,.jpeg,.gif"
                                                        onChange={onChangeFile}
                                                    />
                                                </div>
                                                <small className="form-text text-muted">
                                                    Allowed JPG, JPEG, PNG, GIF. Max size of 5MB
                                                </small>
                                            </div>

                                        </div>
                                    </div>
                                </div>
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

                                <label>Banner Image</label>
                                <div className="filter-widget">
                                    <div className="form-group">
                                        <div className="change-avatar">
                                            <div className="profile-img">
                                                <div
                                                    style={{
                                                        background: "#E9ECEF",
                                                        width: "100px",
                                                        height: "100px",
                                                    }}
                                                >
                                                    <img src={bannerImage} alt="Selfie" />
                                                </div>
                                            </div>
                                            <div className="upload-img">
                                                <div
                                                    className="change-photo-btn"
                                                    style={{ backgroundColor: "rgb(167,0,0)" }}
                                                >
                                                    {isUploadingBannerIPFS ? (
                                                        <div className="text-center">
                                                            <Spinner
                                                                animation="border"
                                                                role="status"
                                                                style={{ color: "#fff" }}
                                                            >
                                                            </Spinner>
                                                        </div>
                                                    ) : (
                                                        <span><i className="fa fa-upload"></i>Upload photo</span>
                                                    )}

                                                    <input
                                                        name="sampleFile"
                                                        type="file"
                                                        className="upload"
                                                        accept=".png,.jpg,.jpeg,.gif"
                                                        onChange={onChangeBannerFile}
                                                    />
                                                </div>
                                                <small className="form-text text-muted">
                                                    Allowed JPG, JPEG, PNG, GIF. Max size of 5MB
                                                </small>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                
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
            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>  
                                         
            </div >


  );
}

export default SettingDashboardDefault;
