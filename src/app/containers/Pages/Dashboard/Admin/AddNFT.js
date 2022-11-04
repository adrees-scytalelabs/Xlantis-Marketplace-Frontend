import { CardActionArea, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@material-ui/core/';
import Backdrop from '@material-ui/core/Backdrop';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from 'axios';
// import { response } from 'express';
import Cookies from "js-cookie";
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useHistory, useLocation } from 'react-router-dom';
import Web3 from 'web3';
import r1 from '../../../../assets/img/patients/patient.jpg';
import DropFactory721 from '../../../../components/blockchain/Abis/DropFactory721.json';
import AuctionDropFactory721 from '../../../../components/blockchain/Abis/AuctionDropFactory721.json';
import DropFactory1155 from '../../../../components/blockchain/Abis/DropFactory1155.json';
import AuctionDropFactory1155 from '../../../../components/blockchain/Abis/AuctionDropFactory1155.json';
import CreateNFTContract from '../../../../components/blockchain/Abis/Collectible1155.json';
import * as Addresses from '../../../../components/blockchain/Addresses/Addresses';
import NetworkErrorModal from '../../../../components/Modals/NetworkErrorModal';
import NFTDetailModal from '../../../../components/Modals/NFTDetailModal';
import { Web } from '@material-ui/icons';
import crypto from 'crypto';


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



function AddNFT(props) {
    let location = useLocation();
    let history = useHistory();
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

    let [isSaving, setIsSaving] = useState(false);
    let [dropId, setDropId] = useState("");
    let [startTime, setStartTime] = useState(0);
    let [endTime, setEndTime] = useState(0);
    let [nftList, setNftList] = useState([]);
    let [collectionTypes, setCollectionTypes] = useState([]);
    let [collection, setCollection] = useState('');
    let [isAdded, setIsAdded] = useState(false);
    let [nftContractAddresses, setNftContractAddress] = useState('');
    let [collectionId, setCollectionId] = useState('');
    let [changeCollectionList, setChangeCollectionList] = useState([]);
    let [nftName, setNftName] = useState("");
    let [nftURI, setNftURI] = useState("");
    let [nftTokenSupply, setNftTokenSupply] = useState(0);
    let [nftDetail, setNftDetail] = useState({});
    let [openDialog, setOpenDialog] = useState(false);
    let [openEditModal, setOpenEditModal] = useState(false);
    let [nftId, setNftId] = useState("");
    let [tokenId, setTokenId] = useState("");
    let [isUploadingData, setIsUploadingData] = useState(false);
    let [price, setPrice] = useState(0);
    let [supply, setSupply] = useState(0);
    let [saleType, setSaleType] = useState('');
    let [nftType, setNftType] = useState('');

    let [dropInfo, setDropInfo] = useState([]);

    let getCollections = () => {
        console.log("NFT TYPE", location.state.nftType);
        
        axios.get(`/collection/collections/${location.state.nftType}`).then(
            (response) => {
                console.log("response", response);
                setChangeCollectionList(response.data.collectionData);
                console.log("COLLECTION",changeCollectionList);
                setCollectionTypes(...collectionTypes, response.data.collectionData)
                console.log(collectionTypes)
            },
            (error) => {
                if (process.env.NODE_ENV === "development") {
                    console.log(error);
                    console.log(error.response);
                }
                if (error.response.data !== undefined) {
                    if (error.response.data === "Unauthorized access (invalid token) !!") {
                        Cookies.remove("Authorization");
                        localStorage.removeItem("Address")
                        window.location.reload();
                    }
                }
            })

    }

    const getHash = (id) => {
     
        const hex = Web3.utils.toHex(id);
        console.log('conversion to hex: ', hex);
        return hex;

    }

    let getNfts = ( id ) => {
        axios.get(`/nft/${id}`).then(
            (response) => {
                const nft = response.data.data;
                console.log("nft response", nft);
                console.log("nft title response", response.data.data[0].title);

                setNftList(response.data.data);
                
            },
            (error) => {
                if (process.env.NODE_ENV === "development") {
                    console.log(error);
                    console.log(error.response);
                }
                if (error.response.data !== undefined) {
                    if (error.response.data === "Unauthorized access (invalid token) !!") {
                        Cookies.remove("Authorization");
                        localStorage.removeItem("Address")
                        window.location.reload();
                    }
                }
            })
    }

   

   
    useEffect(() => {
    // getProfileData();
    

    setDropId(location.state.dropId);
    setStartTime(location.state.startTime);
    setEndTime(location.state.endTime);
    setSaleType(location.state.saleType);
    let type = location.state.nftType;
    setNftType(type);
    console.log("dropid",dropId);
    
    getCollections();

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
            newDrop: "active",
            newCube: "",
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
        if (network !== 'goerli') {
            setNetwork(network);
            setIsSaving(false);
            handleShow();
        }
        else {
            handleShowBackdrop();
            setIsUploadingData(true);

            //sending data to backend
            let data ={
                "dropId" : dropId,
            }

            console.log("data", data);

            axios.put("drop/status/pending", data).then(
                (response) => {
                    console.log("drop status pending response: ", response);
                    setIsUploadingData(false);
                    handleCloseBackdrop();

                },
                (error) => {
                    console.log("Error on status pending nft: ", error);      
                    console.log("Error on status pending nft: ", error.response);                            

                    setIsUploadingData(false);

                    handleCloseBackdrop();

                    let variant = "error";
                    enqueueSnackbar('Unable to Add Nft To Drop.', { variant });
                }
            )
            
            let dropCloneId = getHash(dropId);
            if (saleType === "fixed-price") {
                if (nftType === "721") {

                }
                const address = Addresses.FactoryDrop721;
                const abi = DropFactory721;            

                console.log("Contract Address: ", address);
                var myContractInstance = await new web3.eth.Contract(abi, address);
                console.log("myContractInstance", myContractInstance);

                console.log("Start TIME", startTime);
                console.log("end time", startTime);
                console.log("drop", dropInfo);



                await myContractInstance.methods.createDrop(dropCloneId, startTime, endTime, dropInfo).send({from : accounts[0]}, (err, response) => {
                    console.log('get transaction', err, response);
                    let data = {
                        "dropId" : dropId,
                        "txHash" : response
                    }
                    console.log("data",data);
                    axios.put(`/drop/txHash`, data).then(
                        (response) => {
                            console.log("Transaction Hash sending on backend response: ", response);
                        },
                        (error) => {
                            console.log("Transaction hash on backend error: ", error.response);
                        }
                    )
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
                    let variant = "success";
                    enqueueSnackbar('New Drop Created Successfully.', { variant });
                    setIsAdded(false);
                    handleCloseBackdrop();
                    setIsSaving(false);
                    history.goBack();
                })
            }

            else if (saleType === "auction") {
                const address = Addresses.AuctionDropFactory721;
                const abi = AuctionDropFactory721;            

                console.log("Contract Address: ", address);
                var myContractInstance = await new web3.eth.Contract(abi, address);
                console.log("myContractInstance", myContractInstance);

                console.log("Start TIME", startTime);
                console.log("end time", startTime);
                console.log("drop", dropInfo);



                await myContractInstance.methods.createAuctionDrop(dropCloneId, startTime, endTime, dropInfo).send({from : accounts[0]}, (err, response) => {
                    console.log('get transaction', err, response);
                    let data = {
                        "dropId" : dropId,
                        "txHash" : response
                    }
                    console.log("data",data);
                    axios.put(`/drop/txHash`, data).then(
                        (response) => {
                            console.log("Transaction Hash sending on backend response: ", response);
                        },
                        (error) => {
                            console.log("Transaction hash on backend error: ", error.response);
                        }
                    )
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
                    let variant = "success";
                    enqueueSnackbar('New Drop Created Successfully.', { variant });
                    setIsAdded(false);
                    handleCloseBackdrop();
                    setIsSaving(false);
                    history.goBack();
                })
            }
            
        }

        
    };

    // approval
    // let giveApproval = async() => {
    //     await loadWeb3();
    //     const web3 = window.web3
    //     const accounts = await web3.eth.getAccounts();
    //     const network = await web3.eth.net.getNetworkType()
    //     if (network !== 'goerli') {
    //         setNetwork(network);
    //         setIsSaving(false);
    //         handleShow();
    //     }
    //     else{

    //     const addressNft = nftContractAddresses;
    //     const addressDropFactory = Addresses.FactoryDrop;
    //     const addressAuctionFactory = Addresses.AuctionDropFactory;
    //     const abiNft = CreateNFTContract;            

    //     console.log("Contract Address: ", nftContractAddresses);
    //     var myContractInstance = await new web3.eth.Contract(abiNft, addressNft);
    //     console.log("myContractInstance", myContractInstance)
        

    //     await myContractInstance.methods.setApprovalForAll(addressAuctionFactory, true).send({from : accounts[0]}, (err, response) => {
    //         console.log('get transaction', err, response);
            
    //         if (err !== null) {
    //             console.log("err", err);
    //             let variant = "error";
    //             enqueueSnackbar('User Canceled Transaction', { variant });
    //             handleCloseBackdrop();
    //             setIsSaving(false);

    //         }
            
    //     })
    //     .on('receipt', (receipt) => {
    //         console.log("receipt", receipt);
    //     })
    //     }
    // }
           
    // handle click event of the Add button
    const handleAddClick = async(e) => {
        e.preventDefault();
        if (collection === "") {
            let variant = "error";
            enqueueSnackbar('Please Select Collection', { variant });
        } else if (nftName === "") {
            let variant = "error";
            enqueueSnackbar('Please Select Nft', { variant });
        } else if (supply === 0 || supply === undefined || supply === null) {
            let variant = "error";
            enqueueSnackbar('Token Supply cannot be 0 or empty', { variant });
        } else if (supply < 0) {
            let variant = "error";
            enqueueSnackbar('Token Supply cannot be Negative', { variant });
        } else if (price === 0 || price === undefined || price === null) {
            let variant = "error";
            enqueueSnackbar('Price cannot be 0 or empty', { variant });
        } else if (price < 0) {
            let variant = "error";
            enqueueSnackbar('Price cannot be Negative', { variant });
        } else if (supply > nftTokenSupply) {
            let variant = "error";
            enqueueSnackbar('Supply cannot be greater than NFT token supply', { variant });
        }
        else {
            handleShowBackdrop();
            setIsUploadingData(true);

            
            

                    let weiPrice = Web3.utils.toWei(price);
                    //sending data to backend
                    let data ={
                        // "collectionId": collectionId,
                        "nftId" : nftId,
                        "dropId" : dropId,
                        "price" : weiPrice,
                        "supply": parseInt(supply)
                    }
                    
                    let newObject = {
                        "nftContractAddress" : nftContractAddresses,
                        "tokenIds" : [tokenId],
                        "amounts" : [parseInt(supply)],
                        "prices" : [weiPrice]
                    }

                    console.log("data", data);

                    console.log("new obj", newObject);

                    axios.put("/drop/nft", data).then(
                        (response) => {
                            console.log("nft drop add response: ", response);
                            console.log("time",startTime, endTime);
                            setIsAdded(true);
                            let found = false;
                            setDropInfo(current => 
                                current.map(obj => {
                                    
                                    if (obj.nftContractAddress === nftContractAddresses ) {
                                        let tokens = obj.tokenIds.concat(newObject.tokenIds);
                                        let amount = obj.amounts.concat(newObject.amounts);
                                        let price = obj.prices.concat(newObject.prices);
                                        found = true

                                        return {
                                            ...obj,
                                            tokenIds : tokens,
                                            amounts : amount,
                                            prices : price

                                        }
                                    
                                    }

                                    return obj;
                                }),
                            );

                            
                            if (found === false) {
                                const dropp = [...dropInfo, newObject];
                                // giveApproval();
                                console.log("drop", dropp);
                                console.log("here");
                                setDropInfo(dropp);
                            }

                            console.log(dropInfo);
                            
                            setIsUploadingData(false);
                            handleCloseBackdrop();

                        },
                        (error) => {
                            console.log("Error on drop add nft: ", error);      
                            console.log("Error on drop add nft: ", error.response);                            

                            setIsUploadingData(false);

                            handleCloseBackdrop();

                            let variant = "error";
                            enqueueSnackbar('Unable to Add Nft To Drop.', { variant });
                        }
                    )
            
        }
    };

    let handleOpenNFTDetailModal = (nftObject) => {
        
        setNftDetail(nftObject);
    }

    let handleCloseNFTDetailModal = () => {
        // setTokenList([...tempTokenList]);
        // setTempTokenList([]);
        console.log("Close button called from modal.");
        setOpenDialog(false);
    }

    let handleEdit = () => {
        // setNftDetail(nftObject);
        console.log("Nft detail: ", nftDetail);
        // setNftDetail(nftDetail);
        setOpenDialog(false);
        setOpenEditModal(true);
    }

    let handleEditClose = () => {
        setOpenEditModal(false);
    }

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
                        <form>
                            <div className="form-group">
                                            <div className="form-group">
                                                <label>Select Collection</label>
                                                <div className="filter-widget">
                                                    <Autocomplete
                                                        id="combo-dox-demo"
                                                        required
                                                        options={collectionTypes}
                                                        // disabled={isDisabledImporter}
                                                        getOptionLabel={(option) =>
                                                            option.name
                                                        }

                                                        onChange = {(e, value) => {
                                                            if (value == null) setCollection ("");
                                                            else {
                                                                console.log('hereee');
                                                                setCollection(value.name)
                                                                setCollectionId(value._id)
                                                                setNftContractAddress(value.nftContractAddress);
                                                                setNftList([]);
                                                                setNftName("");
                                                                getNfts(value._id);

                                                            }
                                                        }}
                                                        // onChange={(event, value) => {
                                                        //     if (value == null) setCollection("");
                                                        //     else {
                                                        //         if (value.name === "+ Create new Collection") {
                                                        //             history.push('/dashboard/createNewCollection')
                                                        //         } else {
                                                        //             console.log(value);
                                                        //             setCollection(value.name)
                                                        //             setCollectionId(value._id)
                                                        //             setNftContractAddress(value.nftContractAddress);
                                                        //             console.log("Value: ", value);
                                                        //         }
                                                        //     }
                                                        // }}
                                                        
                                                        
                                                        
                                                        filterSelectedOptions
                                                        renderInput={(params) => (
                                                            // <TextField {...params} label="Label" variant="outlined" fullWidth />
                                                            <TextField
                                                                {...params}
                                                                label="Collections"
                                                                variant="outlined"
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </div>

                                            
                                        
                                                        
                                            <div className="form-group">
                                                <label>Select NFT</label>
                                                <div className="filter-widget">
                                                    <Autocomplete
                                                        id="combo-dox-demo"
                                                        required
                                                        options={nftList}
                                                        // disabled={isDisabledImporter}
                                                        getOptionLabel={(option) =>
                                                            option.title
                                                        }
                                                        

                                                        onChange = {(e, value) => {
                                                            if (value == null) setNftName ("");
                                                            else {
                                                                console.log('hereee');

                                                                // value = 
                                                                setNftName(value.title)
                                                                setNftId(value._id)
                                                                setNftURI(value.nftURI);
                                                                setTokenId(value.nftId);
                                                                setNftTokenSupply(value.tokenSupply);

                                                                handleOpenNFTDetailModal(value);

                                                            }
                                                        }}
                                                        // onChange={(event, value) => {
                                                        //     if (value == null) setCollection("");
                                                        //     else {
                                                        //         if (value.name === "+ Create new Collection") {
                                                        //             history.push('/dashboard/createNewCollection')
                                                        //         } else {
                                                        //             console.log(value);
                                                        //             setCollection(value.name)
                                                        //             setCollectionId(value._id)
                                                        //             setNftContractAddress(value.nftContractAddress);
                                                        //             console.log("Value: ", value);
                                                        //         }
                                                        //     }
                                                        // }}
                                                        
                                                        
                                                        
                                                        filterSelectedOptions
                                                        renderInput={(params) => (
                                                            
                                                            // <TextField {...params} label="Label" variant="outlined" fullWidth />
                                                            <TextField
                                                                {...params}
                                                                label="Nfts"
                                                                variant="outlined"
                                                            />
                                                        )}
                                                    />
                                                </div>

                                                
                                            </div>

                                            {(location.state.saleType === "auction") ? (
                                                 <label>Floor Price</label>
                                            ) : (
                                                    <label>Price</label>
                                            )} 

                                            <div className="form-group">
                                                <div className="filter-widget">
                                                    <input
                                                        type="number"
                                                        required
                                                        value={price}
                                                        className="form-control"
                                                        onChange={(e) => {
                                                            if (e.target.value > 0) {
                                                                setPrice(e.target.value);
                                                            } else {
                                                                setPrice(0);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <label>Supply</label>
                                            <div className="form-group">
                                                <div className="filter-widget">
                                                    <input
                                                        type="number"
                                                        required
                                                        value={supply}
                                                        className="form-control"
                                                        onChange={(e) => {
                                                            if (e.target.value > 0) {
                                                                setSupply(e.target.value);
                                                            } else {
                                                                setSupply(0);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            
                                        

                                    {/* )} */}



                                </div>

                                { collection === "" || nftName === 0 || supply === 0 || price === "" ? (
                                    <button
                                        className="btn"
                                        type="submit"
                                        disabled
                                    >
                                        <i className="fa fa-plus"></i> Add NFT To Drop
                                    </button>
                                ) : (
                                <button
                                    className="btn"
                                    type="button"
                                    onClick={(e) => handleAddClick(e)}
                                >
                                    <i className="fa fa-plus"></i> Add NFT To Drop
                                </button>
                               )} 
                            
                        </form>

                    </div>

                   
                    <div className="col-md-12 col-lg-6">
                        {/* <!-- Change Password Form --> */}
                        { (nftName != "") ? (
                        <form >
                            {/* <Scrollbars style={{ height: 1500 }}> */}

                            <div className="form-group">
                                <div >
                                    <Grid
                                        container
                                        spacing={2}
                                        direction="row"
                                        justify="flex-start"
                                    // alignItems="flex-start"
                                    >

                                            <Grid item xs={12} sm={6} md={6} >
                                                {/* <CardActionArea onClick={() => {
                                                    
                                                    console.log("Open Dialog Value: ", openDialog);
                                                }}> */}
                                                    <Card>
                                                        <CardHeader className="text-center"
                                                            title={nftDetail.title}
                                                        />
                                                        <CardMedia
                                                            variant="outlined" style={{ height: "100%", border: '4px solid #ff0000' }}
                                                            className={classes.media}
                                                            image={nftDetail.nftURI}

                                                            title="NFT Image"
                                                        />
                                                        {/* <CardContent> */}
                                                            {/* <Typography variant="body2" color="textSecondary" component="p">
                                                                <strong>Description: </strong>{i.description}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                <strong>Rarity: </strong>{i.rarity}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                <strong>Token Supply: </strong>{i.tokensupply}
                                                            </Typography> */}
                                                            {/* <Typography variant="h6" gutterBottom color="textSecondary" className="text-center">Image Artist</Typography> */}
                                                            {/* <CardHeader
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
                                                            />

                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                <strong>Other: </strong>{i.other}
                                                            </Typography> */}
                                                            {/* <Typography variant="body2" color="textSecondary" component="p">
                                                                <strong>ID: </strong>{nftDetail._id}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                <strong>Collection: </strong>{collection}
                                                            </Typography> */}
                                                        {/* </CardContent> */}
                                                    </Card>
                                                    {/* <Dialog
                                                        fullWidth={true}
                                                        maxWidth={true}
                                                        open={openDialog}
                                                        onClose={handleClickCloseDialog}
                                                        aria-labelledby="max-width-dialog-title"
                                                    >
                                                        <DialogTitle id="max-width-dialog-title">Edit NFT Details</DialogTitle>
                                                        <DialogContent>
                                                            <DialogContentText></DialogContentText>
                                                            <form>
                                                                <TextField
                                                                    label="NFT Title"
                                                                    variant="outlined"
                                                                    value={tempTokenList.title}
                                                                    onChange={(e) => {
                                                                        let temp = [...tempTokenList];
                                                                        temp[index].title = e.target.value;
                                                                        console.log(tempTokenList);
                                                                        setTempTokenList(temp);
                                                                    }}
                                                                />
                                                                <TextField
                                                                    label="NFT Description"
                                                                    variant="outlined"
                                                                    value={tempTokenList.description}
                                                                    onChange={(e) => {
                                                                        let temp = [...tempTokenList];
                                                                        temp[index].description = e.target.value;
                                                                        setTempTokenList(temp);
                                                                    }}
                                                                    style={{ marginLeft: "5px" }}
                                                                />
                                                                <button className="btn submit-btn" onClick={console.log("Submit clicked")} >Save</button> 
                                                            </form>
                                                        </DialogContent>
                                                    </Dialog> */}
                                                {/* </CardActionArea> */}
                                                {/* <CardActions>

                                                    <Button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            // handleRemoveClick(index);
                                                        }}
                                                        className="btn btn-sm bg-danger-light btn-block"

                                                    >
                                                        Remove NFT
                                                    </Button>
                                                </CardActions> */}
                                                {/* <NFTDetailModal 
                                                    show={openDialog} 
                                                    handleClose={handleCloseNFTDetailModal}
                                                    nftDetail={tokenList[index]}
                                                    handleEdit={handleEdit}
                                                >
                                                </NFTDetailModal>
                                                <NFTEditModal
                                                    show={openEditModal}
                                                    handleClose={handleEditClose}
                                                    nftDetail={i}
                                                    index={index}
                                                    onUpdate={onUpdateEditModal}
                                                >
                                                </NFTEditModal> */}
                                            </Grid>

                                    </Grid>
                                </div>
                            </div>
                            {/* </Scrollbars> */}
                        </form>
                        ) : (null)
                    }
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
                        isAdded ? (
                            <div className="submit-section">
                                <button type="button" onClick={(e) => handleSubmitEvent(e)} className="btn submit-btn">
                                    Update Drop
                                </button>
                            </div>
                        ) : (
                       
                        <div className="submit-section">
                            <button type="button" disabled className="btn submit-btn">
                                Update Drop
                            </button>
                        </div>
                        )

                    )
                }
            </div >
            <NetworkErrorModal
                show={show}
                handleClose={handleClose}
                network={network}
            >
            </NetworkErrorModal>
            <NFTDetailModal 
                show={openDialog} 
                handleClose={handleCloseNFTDetailModal}
                nftDetail={nftDetail}
                handleEdit={handleEdit}
            >
            </NFTDetailModal>
            {/* <NFTEditModal
                show={openEditModal}
                handleClose={handleEditClose}
                nftDetail={nftDetail}
                // index={index}
                onUpdate={onUpdateEditModal}
                handleChangeCollection={handleChangeCollectionOpen}
                isUploadingData={isUploadingData}
            >
            </NFTEditModal> */}
            {/* <ChangeCollectionConfirmationModal
                show={changeCollection}
                handleClose={handleChangeCollectionClose}
                collectionDetails={changeCollectionList}
                updateChangeCollection={updateChangeCollection}
                isUploading={isUploadingData}
            >
            </ChangeCollectionConfirmationModal> */}
            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div >

    );
}

export default AddNFT;


