// import Avatar from '@material-ui/core/Avatar';
import Backdrop from '@material-ui/core/Backdrop';
// import Button from '@material-ui/core/Button';
// import CardActions from '@material-ui/core/CardActions';
// import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
// import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
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
import Factory1155Contract from '../../../../components/blockchain/Abis/Factory1155.json';
import * as Addresses from '../../../../components/blockchain/Addresses/Addresses';
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
    let [collectionSymbol, setCollectionSymbol] = useState("");
    let [isUploadingIPFS, setIsUploadingIPFS] = useState(false);
    let [image, setImage] = useState(r1);
    let [imageFile, setImageFile] = useState();
    let [fileURL, setFileURL] = useState(r1);


    useEffect(() => {

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

            const abi = Factory1155Contract;
            const address = Addresses.Factory1155Address;
            var cloneContractAddress;
            var myContractInstance = await new web3.eth.Contract(abi, address);
            await myContractInstance.methods.createNFT1155(true).send({ from: accounts[0] }, (err, response) => {
                console.log("Get transaction ", err, response);
                if(err !== null) {
                    console.log("err", err);
                    let variant = "error";
                    enqueueSnackbar('User Canceled Transaction', { variant });
                    handleCloseBackdrop();
                    setIsSaving(false);
                }
            })
                .on('receipt', (receipt) => {
                    console.log("receipt", receipt);
                    cloneContractAddress = receipt.events.CloneCreated.returnValues.cloneAddress;
                }
            )

            let fileData = new FormData();
            fileData.append("thumbnail", imageFile);
            fileData.append("name", collectionName);
            fileData.append("symbol", collectionSymbol);
            fileData.append("description", collectionDescription);
            fileData.append("nftContractAddress", cloneContractAddress);
            console.log("NFT Clone Address: ", cloneContractAddress);
            console.log("File data while creating collection on backend: ", fileData);

            axios.post("/collection/create", fileData).then(
                (response) => {
                    console.log("response", response);
                    let variant = "success";
                    enqueueSnackbar('New Collection Created Successfully.', { variant });
                    handleCloseBackdrop();
                    setIsSaving(false)
                },
                (error) => {
                    if (process.env.NODE_ENV === "development") {
                        console.log(error);
                        console.log(error.response);
                    }

                    let variant = "error";
                    enqueueSnackbar('Unable to Create New Collection.', { variant });
                    handleCloseBackdrop();
                    setIsSaving(false)
                })
            // const address = Addresses.CreateNftAddress;
            // const abi = CreateNFTContract;
            // let totalImages = tokenList.length;
            // let AmountofNFTs = [];
            // let IPFsHashes = [];
            // for (let i = 0; i < tokenList.length; i++) {
            //     AmountofNFTs.push(tokenList[i].tokensupply);
            //     IPFsHashes.push(tokenList[i].ipfsHash);
            // }
            // console.log("AmountofNFTs", AmountofNFTs);
            // console.log("IPFsHashes", IPFsHashes);

            // var myContractInstance = await new web3.eth.Contract(abi, address);
            // console.log("myContractInstance", myContractInstance);
            // await myContractInstance.methods.new_batch(totalImages, AmountofNFTs, IPFsHashes).send({ from: accounts[0] }, (err, response) => {
            //     console.log('get transaction', err, response);
            //     if (err !== null) {
            //         console.log("err", err);
            //         let variant = "error";
            //         enqueueSnackbar('User Canceled Transaction', { variant });
            //         handleCloseBackdrop();
            //         setIsSaving(false);
            //     }
            // })
            //     .on('receipt', (receipt) => {
            //         console.log("receipt", receipt);
            //         console.log("receipt", receipt.events.TransferBatch.returnValues.ids);
            //         let ids = receipt.events.TransferBatch.returnValues.ids;
            //         for (let i = 0; i < tokenList.length; i++) {
            //             tokenList[i].nftId = ids[i];
            //         }

            //         let Data = {
            //             nftdata: tokenList
            //         }
            //         console.log("Data", Data);
            //         axios.post("/nft/createnft", Data).then(
            //             (response) => {
            //                 console.log("response", response);
            //                 let variant = "success";
            //                 enqueueSnackbar('Nfts Created Successfully.', { variant });
            //                 setTokenList([]);
            //                 setIpfsHash("");
            //                 setImage(r1);
            //                 setCollectionName("");
            //                 setCollectionDescription("");
            //                 setAboutTheArt("");
            //                 setWebsite("");
            //                 handleCloseBackdrop();
            //                 setIsSaving(false);
            //             },
            //             (error) => {
            //                 if (process.env.NODE_ENV === "development") {
            //                     console.log(error);
            //                     console.log(error.response);
            //                 }

            //                 let variant = "error";
            //                 enqueueSnackbar('Unable to Create Nfts.', { variant });

            //                 handleCloseBackdrop();
            //                 setIsSaving(false);
            //             })
            //     })
        }

    };

    let onChangeFile = (e) => {
        setImageFile(e.target.files[0]);
        setFileURL(URL.createObjectURL(e.target.files[0]));
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
                                                    <img src={fileURL} alt="Selfie" />
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
                                    <label>Collection Symbol</label>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            required
                                            value={collectionSymbol}
                                            placeholder="Enter Symbol of Collection"
                                            className="form-control"
                                            onChange={(e) => {
                                                setCollectionSymbol(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label>Collection Description</label><small style={{ marginLeft: "5px" }}></small>
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
                                    {/* <div>
                                        <label>Add Properties</label><small style={{ marginLeft: "5px" }}>(optional)</small>
                                    </div>
                                    <div>
                                        <button
                                            className="btn btn-submit"
                                            color="primary"
                                            // className="btn submit-btn"
                                            onClick={onDialogOpenClick}
                                        >
                                            Add Properties
                                        </button>
                                        <Dialog
                                            fullWidth={true}
                                            maxWidth={true}
                                            open={openDialog}
                                            onClose={onDialogCloseClick}
                                            aria-labelledby="max-width-dialog-title"
                                        >
                                            <DialogTitle id="max-width-dialog-title">Enter Properties</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>Enter Properties in key value pair</DialogContentText>
                                                <form>
                                                    <TextField
                                                        label="Key"
                                                        value={propertyKey}
                                                        onChange={(e) => setPropertyKey(e.target.value)}
                                                    />
                                                    <TextField
                                                        label="Value"
                                                        value={propertyValue}
                                                        onChange={(e) => setPropertyValue(e.target.value)}
                                                        style={{ marginLeft: "5px" }}
                                                    />
                                                    <button className="btn submit-btn" onClick={onClickDialogFormSubmit} >Add</button>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                    </div> */}
                                    {/* <div>
                                        <div>
                                            {properties.map((property, index) => {
                                                return (
                                                    <Card>
                                                        <CardHeader
                                                            title={property.key}
                                                            subheader={property.value}
                                                        />
                                                    </Card>
                                                )
                                            })}
                                        </div>
                                    </div> */}
                                    {/* <div style={{marginTop: "5px"}}>
                                        <label>Add Level</label>
                                    </div> */}
                                    {/* {levelValues.map((level, index)=> {
                                      return (
                                        <div>
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
                                            <IconButton onClick={() => onRemoveLevels(index)} >
                                                <Clear />
                                            </IconButton>
                                        </div>
                                      )      
                                    })} */}
                                    {/* <button className= "btn" onClick={addLevels} >Add more</button> */}
                                    {/* <button onClick={ onSubmit }>Submit</button> */}
                                </div>
                            </div>
                        </form>

                    </div>

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
