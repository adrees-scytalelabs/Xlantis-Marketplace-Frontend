import { Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, InputLabel } from '@material-ui/core/';
// import Avatar from '@material-ui/core/Avatar';
import Backdrop from '@material-ui/core/Backdrop';
// import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
// import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
// import Typography from '@material-ui/core/Typography';
import { Clear } from '@material-ui/icons';
// import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from 'axios';
// import Cookies from "js-cookie";
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
// import { Scrollbars } from 'react-custom-scrollbars';
// import { Icon } from 'semantic-ui-react';
import Web3 from 'web3';
import r1 from '../../../../assets/img/patients/patient.jpg';
import CreateNFTContract from '../../../../components/blockchain/Abis/CreateNFTContract.json';
import * as Addresses from '../../../../components/blockchain/Addresses/Addresses';
import ipfs from '../../../../components/IPFS/ipfs';
import NetworkErrorModal from '../../../../components/Modals/NetworkErrorModal';

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



function NewCollection(props) {

    const [propertyKey, setPropertyKey] = useState("");
    const [propertyValue, setPropertyValue] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [properties, setProperties] = useState([]);
    const [levelValues, setLevelValues] = useState([
        { name: '', lowLevel: 0, highLevel: 0 }
    ])
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    let [network, setNetwork] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [open, setOpen] = React.useState(false);
    const handleCloseBackdrop = () => {
        setOpen(false);
    };
    const handleShowBackdrop = () => {
        setOpen(true);
    };

    const [tokenList, setTokenList] = useState([]);
    let [isSaving, setIsSaving] = useState(false);
    let [collectionName, setCollectionName] = useState("");
    let [website, setWebsite] = useState("");
    let [aboutTheArt, setAboutTheArt] = useState("");
    let [ipfsHash, setIpfsHash] = useState(null);
    let [collectionDescription, setCollectionDescription] = useState("");
    let [isUploadingIPFS, setIsUploadingIPFS] = useState(false);
    let [image, setImage] = useState(r1);


    // let getCollections = () => {
    //     axios.get("/collection/collections").then(
    //         (response) => {
    //             console.log("response", response);
    //             setCollectionTypes(response.data.Collectiondata)
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
    //                     window.location.reload();
    //                 }
    //             }
    //         })
    // }

    useEffect(() => {
        // getCollections();

        props.setActiveTab({
            dashboard: "",
            newNFT: "",
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
            createNewCollection: "active",
            newCollection: "",
            newRandomDrop: "",
        });// eslint-disable-next-line
    }, []);

    let loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    const handleSubmitEvent = async (event) => {
        event.preventDefault();
        setIsSaving(true);

        if (tokenList.length === 0) {

            let variant = "error";
            enqueueSnackbar('Add Nfts to Queue before Creation.', { variant });
            setIsSaving(false);
        }
        else {
            await loadWeb3();
            const web3 = window.web3
            const accounts = await web3.eth.getAccounts();
            const network = await web3.eth.net.getNetworkType()
            if (network !== 'ropsten') {
                setNetwork(network);
                setIsSaving(false);
                handleShow();
            }
            else {
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
                await myContractInstance.methods.new_batch(totalImages, AmountofNFTs, IPFsHashes).send({ from: accounts[0] }, (err, response) => {
                    console.log('get transaction', err, response);
                    if (err !== null) {
                        console.log("err", err);
                        let variant = "error";
                        enqueueSnackbar('User Canceled Transaction', { variant });
                        handleCloseBackdrop();
                        setIsSaving(false);
                    }
                })
                    .on('receipt', (receipt) => {
                        console.log("receipt", receipt);
                        console.log("receipt", receipt.events.TransferBatch.returnValues.ids);
                        let ids = receipt.events.TransferBatch.returnValues.ids;
                        for (let i = 0; i < tokenList.length; i++) {
                            tokenList[i].nftId = ids[i];
                        }

                        let Data = {
                            nftdata: tokenList
                        }
                        console.log("Data", Data);
                        axios.post("/nft/createnft", Data).then(
                            (response) => {
                                console.log("response", response);
                                let variant = "success";
                                enqueueSnackbar('Nfts Created Successfully.', { variant });
                                setTokenList([]);
                                setIpfsHash("");
                                setImage(r1);
                                setCollectionName("");
                                setCollectionDescription("");
                                // setRarity("");
                                // setTokenSupply(1);
                                // setImageArtist("");
                                // setImageArtistId("");
                                setAboutTheArt("");
                                setWebsite("");
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
                                // setCollection("");
                                // setCollectionType("New");
                                // setImageArtistType("New");
                                // setProducerType("New");
                                // setExecutiveProducerType("New");
                                // setFanType("New");
                                // setSupplyType("Single");
                                // setCollectionId("");
                                handleCloseBackdrop();
                                setIsSaving(false);
                            },
                            (error) => {
                                if (process.env.NODE_ENV === "development") {
                                    console.log(error);
                                    console.log(error.response);
                                }

                                let variant = "error";
                                enqueueSnackbar('Unable to Create Nfts.', { variant });

                                handleCloseBackdrop();
                                setIsSaving(false);
                            })
                    })
            }
        }
    };

    const handleRemoveClick = (index) => {
        const list = [...tokenList];
        list.splice(index, 1);
        setTokenList(list);
    };

    // handle click event of the Add button
    // const handleAddClick = () => {
    //     if (image === r1) {
    //         let variant = "error";
    //         enqueueSnackbar('Please Upload Artwork Photo', { variant });
    //     } else if (collectionName === "") {
    //         let variant = "error";
    //         enqueueSnackbar('Please Enter Artwork Name', { variant });
    //     } else if (collectionDescription === "") {
    //         let variant = "error";
    //         enqueueSnackbar('Please Enter Artwork Description', { variant });
    //     } else if (rarity === "") {
    //         let variant = "error";
    //         enqueueSnackbar('Please Select Artwork Rarity', { variant });
    //     } else if (tokenSupply === "" || tokenSupply === undefined || tokenSupply === null) {
    //         let variant = "error";
    //         enqueueSnackbar('Token Supply cannot be Empty', { variant });
    //     } else if (tokenSupply < 0) {
    //         let variant = "error";
    //         enqueueSnackbar('Token Supply cannot be Negative', { variant });
    //     } else if (tokenSupply < 0) {
    //         let variant = "error";
    //         enqueueSnackbar('Token Supply cannot be Negative', { variant });
    //     } else if (imageArtist === "") {
    //         let variant = "error";
    //         enqueueSnackbar('Please Enter Image Artist Name', { variant });
    //     } else if (aboutTheArt === "") {
    //         let variant = "error";
    //         enqueueSnackbar('Please Enter About the Art', { variant });
    //     } else if (artistImage === r1) {
    //         let variant = "error";
    //         enqueueSnackbar('Please Select Image Artist Image', { variant });
    //     } else if (website === "") {
    //         let variant = "error";
    //         enqueueSnackbar('Please Enter Website of Image Artist', { variant });
    //     } else if (producer === "") {
    //         let variant = "error";
    //         enqueueSnackbar('Please Enter Producer Name', { variant });
    //     } else if (producerImage === r1) {
    //         let variant = "error";
    //         enqueueSnackbar('Please Select Producer Image', { variant });
    //     } else if (inspirationForThePiece === "") {
    //         let variant = "error";
    //         enqueueSnackbar('Please Enter Producer Inspiration For The Piece', { variant });
    //     } else if (executiveProducer === "") {
    //         let variant = "error";
    //         enqueueSnackbar('Please Enter Executive Producer Name', { variant });
    //     } else if (executiveProducerImage === r1) {
    //         let variant = "error";
    //         enqueueSnackbar('Please Select Executive Producer Image', { variant });
    //     } else if (executiveInspirationForThePiece === "") {
    //         let variant = "error";
    //         enqueueSnackbar('Please Enter Executive Producer Inspiration For The Piece', { variant });
    //     } else if (fan === "") {
    //         let variant = "error";
    //         enqueueSnackbar('Please Enter Fan Name', { variant });
    //     } else if (fanImage === r1) {
    //         let variant = "error";
    //         enqueueSnackbar('Please Select Fan Image', { variant });
    //     } else if (fanInspirationForThePiece === "") {
    //         let variant = "error";
    //         enqueueSnackbar('Please Enter Fan Inspiration For The Piece', { variant });
    //     } else if (other === "") {
    //         let variant = "error";
    //         enqueueSnackbar('Please Enter other Input field', { variant });
    //     } else if (collection === "") {
    //         let variant = "error";
    //         enqueueSnackbar('Please Enter Collection Name', { variant });
    //     }
    //     else {
    //         setTokenList([...tokenList, {
    //             ipfsHash: ipfsHash,
    //             artwork: image,
    //             title: collectionName,
    //             description: collectionDescription,
    //             type: rarity,
    //             tokensupply: tokenSupply,
    //             ImageArtistName: imageArtist,
    //             ImageArtistId:imageArtistId,
    //             ImageArtistAbout: aboutTheArt,
    //             ImageArtistWebsite: website,
    //             ImageArtistProfile: artistImage,
    //             ProducerId: producerId,
    //             ProducerName: producer,
    //             ProducerInspiration: inspirationForThePiece,
    //             ProducerProfile: producerImage,
    //             ExecutiveProducerId: executiveProducerId,
    //             ExecutiveProducerName: executiveProducer,
    //             ExecutiveProducerInspiration: executiveInspirationForThePiece,
    //             ExecutiveProducerProfile: executiveProducerImage,
    //             FanId: fanId,
    //             FanName: fan,
    //             FanInspiration: fanInspirationForThePiece,
    //             FanProfile: fanImage,
    //             other: other,
    //             collectiontitle: collection,
    //             collectiontype: collectionType,
    //             imageartisttype: imageArtistType,
    //             producertype: producerType,
    //             executiveproducertype: executiveProducerType,
    //             fantype: fanType,
    //             supplytype: supplyType,
    //             collectionId: collectionId,
    //         }]);
    //         setIpfsHash("");
    //         setImage(r1);
    //         setCollectionName("");
    //         setCollectionDescription("");
    //         setRarity("");
    //         setTokenSupply(1);
    //         setImageArtist("");
    //         setImageArtistId("");
    //         setAboutTheArt("");
    //         setWebsite("");
    //         setArtistImage(r1);
    //         setProducer("");
    //         setProducerId("");
    //         setInspirationForThePiece("");
    //         setProducerImage(r1);
    //         setExecutiveProducer("");
    //         setExecutiveProducerId("");
    //         setExecutiveInspirationForThePiece("");
    //         setExecutiveProducerImage(r1);
    //         setFan("");
    //         setFanId("");
    //         setFanInspirationForThePiece("");
    //         setFanImage(r1);
    //         setOther("");
    //         setCollection("");
    //         setCollectionType("New");
    //         setImageArtistType("New");
    //         setProducerType("New");
    //         setExecutiveProducerType("New");
    //         setFanType("New");
    //         setSupplyType("Single");
    //         setCollectionId("");
    //     }
    // };

    let onChangeFile = (e) => {
        setIsUploadingIPFS(true);
        const reader = new window.FileReader();
        let imageNFT = e.target.files[0]
        console.log("e.target.files[0]",e.target.files[0]);
        reader.readAsArrayBuffer(e.target.files[0]);
        reader.onloadend = () => {
            console.log("reader.result", reader.result);
            ipfs.add(Buffer(reader.result), async (err, result) => {
                if (err) {
                    console.log("err", err);
                    setIsUploadingIPFS(false);
                    let variant = "error";
                    enqueueSnackbar('Unable to Upload Image to IPFS ', { variant });
                    return
                }
                console.log("HASH", result[0].hash);

                setIpfsHash(result[0].hash);
                let variant = "success";
                enqueueSnackbar('Image Uploaded to IPFS Successfully', { variant });
                // 
            })
        }
        // setIsUploadingIPFS(true);
        let fileData = new FormData();
        fileData.append("image", imageNFT);
        axios.post("upload/uploadtos3", fileData).then(
            (response) => {
                console.log("response", response);
                setImage(response.data.url);
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

    }

    const handleOnChangeLevel = (index, event) => {
        let newData = [...levelValues];
        newData[index][event.target.name] = event.target.value;
        console.log("event target name: ", event.target.name);
        console.log("event target value: ", event.target.value);
        setLevelValues(newData);
    }

    const addLevels = () => {
        let newLevels = { name: '', lowLevel: 0, highLevel: 0 };
        setLevelValues([...levelValues, newLevels]);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(levelValues);
    }

    const onRemoveLevels = (index) => {
        let data = [...levelValues];
        data.splice(index, 1);
        setLevelValues(data);
    }

    // const handleAddChipButton = () => {
    //     console.log("Add button clicked");
    // }

    const onDialogOpenClick = () => {
        // console.log("Dialog button Clicked");
        setOpenDialog(true);
        // console.log("Collection Types are: ", collectionTypes);
    }

    const onDialogCloseClick = () => {
        setOpenDialog(false);
    }

    const onClickDialogFormSubmit = (e) => {
        e.preventDefault();

        let newData = {
            key: propertyKey,
            value: propertyValue
        };
        setProperties([...properties, newData]);
        setOpenDialog(false);
        setPropertyKey("");
        setPropertyValue("");
    }

    return (
        <div className="card">
            <ul className="breadcrumb" style={{ backgroundColor: "rgb(167,0,0)" }}>
                <li className="breadcrumb-item">
                    <a href="/">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">New Collection</li>
            </ul>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12 col-lg-6">
                        <form>
                            <div className="form-group">
                                <label>Select Preview Image</label>
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
                                                    <img src={image} alt="Selfie" />
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


                                <div className="form-group">
                                    <label>Collection Name</label>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            required
                                            value={collectionName}
                                            placeholder="Enter Name of Collection"
                                            className="form-control"
                                            onChange={(e) => {
                                                setCollectionName(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label>Collection Description</label><small style={{marginLeft: "5px"}}>(optional)</small>
                                    </div>
                                    
                                    <div className="form-group">
                                        {/* <label>About the Art</label> */}
                                        <textarea
                                            type="text"
                                            required
                                            rows="4"
                                            value={collectionDescription}
                                            placeholder="Enter Description of Collection"
                                            className="form-control"
                                            onChange={(e) => {
                                                setCollectionDescription(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label>Add Properties</label><small style={{marginLeft: "5px"}}>(optional)</small>
                                    </div>
                                    <div>
                                        {/* <Chip
                                            label="Add Property"
                                            variant="outlined"
                                            color= "primary"
                                            onDelete= {handleAddChipButton}
                                            deleteIcon= { <Icon className="fa fa-plus-circle" color="secondary" />}
                                        /> */}
                                        <button 
                                            className= "btn btn-submit"
                                            color= "primary"
                                            // className="btn submit-btn"
                                            onClick= {onDialogOpenClick}
                                        >
                                            Add Properties
                                        </button>
                                        <Dialog
                                            fullWidth= {true}
                                            maxWidth= {true}
                                            open={openDialog}
                                            onClose={onDialogCloseClick}
                                            aria-labelledby="max-width-dialog-title"
                                        >
                                            <DialogTitle id= "max-width-dialog-title">Enter Properties</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>Enter Properties in key value pair</DialogContentText>
                                                <form>
                                                    <TextField
                                                        label= "Key"
                                                        value= {propertyKey}
                                                        onChange= {(e) => setPropertyKey(e.target.value) }
                                                    />
                                                    <TextField
                                                        label= "Value"
                                                        value= {propertyValue}
                                                        onChange= {(e) => setPropertyValue(e.target.value)}
                                                        style={{ marginLeft: "5px" }}
                                                    />
                                                    <button className="btn submit-btn" onClick={ onClickDialogFormSubmit } >Add</button>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                    <div>
                                        <div>
                                            {properties.map((property, index) => {
                                                return(
                                                    <Card>
                                                        <CardHeader
                                                            title= {property.key}
                                                            subheader= {property.value}
                                                        />
                                                    </Card>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div style={{marginTop: "5px"}}>
                                        <label>Add Level</label>
                                    </div>
                                    {levelValues.map((level, index)=> {
                                      return (
                                        <div>
                                            {/* <div style={{width: "10%", float: "left"}}>
                                                    <IconButton onClick={() => onRemoveLevels(index)} >
                                                        <Clear />
                                                    </IconButton>
                                            </div> */}
                                            <div 
                                                style={{
                                                float: "left",
                                                width: "55%"
                                                }}
                                            >
                                                <div>
                                                    <small><label>Name</label></small>
                                                </div>
                                                <div>
                                                    <input 
                                                        name= "name"
                                                        type= "text"
                                                        placeholder='Name'
                                                        value={ level.name }
                                                        className= "form-control"
                                                        onChange = { (e) => handleOnChangeLevel(index, e)} 
                                                        // style={{width: "30%"}}
                                                    />
                                                </div>
                                            </div>
                                            <div style={{ float: "left", width: "45%" }} >
                                                <div>
                                                    <small><label>Value</label></small>
                                                </div>
                                                <div style={{ float: "left", width: "33.33%" }}>
                                                    <input 
                                                        name= "lowLevel"
                                                        type= "number"
                                                        value= { level.lowLevel } 
                                                        className= "form-control"
                                                        onChange= { (e) => handleOnChangeLevel(index, e)}
                                                    />
                                                </div>
                                                <div style={{ width: "33.33%", border: "thin black", float: "left", marginTop: "10px" }} >Of</div>
                                                <div style={{ float: "left", width: "33.33%" }}>
                                                    <input 
                                                        name= "highLevel"
                                                        type= "number"
                                                        value= { level.highLevel } 
                                                        className= "form-control"
                                                        onChange= { (e) => handleOnChangeLevel(index, e)}
                                                    />
                                                </div>
                                            </div>
                                            {/* <button onClick={() => onRemoveLevels(index)}>Remove</button> */}
                                            <IconButton onClick={() => onRemoveLevels(index)} >
                                                <Clear />
                                            </IconButton>
                                        </div>
                                      )      
                                    })}
                                    <button className= "btn" onClick={addLevels} >Add more</button>
                                    {/* <button onClick={ onSubmit }>Submit</button> */}
                                </div>
                            </div>
                        </form>

                    </div>
                    {/* <div className="col-md-12 col-lg-6"> */}
                        {/* <!-- Change Password Form --> */}
                        {/* <form > */}
                            {/* <Scrollbars style={{ height: 1500 }}> */}

                                {/* <div className="form-group"> */}
                                    {/* <div > */}
                                        {/* <Grid */}
                                            {/* container */}
                                            {/* spacing={2} */}
                                            {/* direction="row" */}
                                            {/* justify="flex-start" */}
                                        {/*  */}
                                        {/* > */}
                                            {/* {tokenList.map((i, index) => ( */}

                                                {/* <Grid item xs={12} sm={6} md={6} key={index}> */}
                                                    {/* <Card > */}
                                                        {/* <CardHeader className="text-center" */}
                                                            {/* title={i.title} */}
                                                        {/* /> */}
                                                        {/* <CardMedia
                                                            variant="outlined" style={{ height: "100%", border: i.type === "Mastercraft" ? '4px solid #ff0000' : i.type === "Legendary" ? '4px solid #FFD700' : i.type === "Epic" ? '4px solid #9400D3' : i.type === "Rare" ? '4px solid #0000FF' : i.type === "Uncommon" ? '4px solid #008000' : i.type === "Common" ? '4px solid #FFFFFF' : 'none' }}
                                                            className={classes.media}
                                                            image={i.artwork}

                                                            title="NFT Image"
                                                        /> */}
                                                        {/* <CardContent>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                <strong>Artwork Description: </strong>{i.description}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                <strong>Token Rarity: </strong>{i.type}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                <strong>Token Supply: </strong>{i.tokensupply}
                                                            </Typography>
                                                            <Typography variant="h6" gutterBottom color="textSecondary" className="text-center">Image Artist</Typography>
                                                            <CardHeader
                                                                avatar={<Avatar src={i.ImageArtistProfile} aria-label="Artist" className={classes.avatar} />}
                                                                title={i.ImageArtistName}
                                                                subheader={i.ImageArtistAbout}
                                                            />
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                <strong>Website URL: </strong>{i.ImageArtistWebsite}
                                                            </Typography>
                                                            <Typography variant="h6" gutterBottom color="textSecondary" className="text-center">Producer</Typography>
                                                            <CardHeader
                                                                avatar={<Avatar src={i.ProducerProfile} aria-label="Producer" className={classes.avatar} />}
                                                                title={i.ProducerName}
                                                                subheader={i.ProducerInspiration}
                                                            />
                                                            <Typography variant="h6" gutterBottom color="textSecondary" className="text-center">Executive Producer</Typography>
                                                            <CardHeader
                                                                avatar={<Avatar src={i.ExecutiveProducerProfile} aria-label="Executive Producer" className={classes.avatar} />}
                                                                title={i.ExecutiveProducerName}
                                                                subheader={i.ExecutiveProducerInspiration}
                                                            />
                                                            <Typography variant="h6" gutterBottom color="textSecondary" className="text-center">Fan</Typography>
                                                            <CardHeader
                                                                avatar={<Avatar src={i.FanProfile} aria-label="Fan" className={classes.avatar} />}
                                                                title={i.FanName}
                                                                subheader={i.FanInspiration}
                                                            /> */}

                                                            {/* <Typography variant="body2" color="textSecondary" component="p">
                                                                <strong>Other: </strong>{i.other}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                <strong>Collection: </strong>{i.collectiontitle}
                                                            </Typography>
                                                        </CardContent>
                                                        <CardActions>

                                                            <Button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    handleRemoveClick(index);
                                                                }}
                                                                className="btn btn-sm bg-danger-light btn-block"

                                                            >
                                                                Remove NFT
                                                            </Button>
                                                        </CardActions>
                                                    </Card>
                                                </Grid>

                                            ))}
                                        </Grid> */}
                                    {/* </div>
                                </div>
                            </Scrollbars>
                        </form>
                    </div> */}
                </div>
                {
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
                }
            </div >
            <NetworkErrorModal
                show={show}
                handleClose={handleClose}
                network={network}
            >
            </NetworkErrorModal>
            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div >

    );
}

export default NewCollection;
