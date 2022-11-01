
import { CardContent, CardHeader, CardMedia, Grid } from '@material-ui/core/';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Cookies from "js-cookie";
import { useSnackbar } from 'notistack';
import React, { useEffect, useState, useRef } from "react";
import { Spinner } from "react-bootstrap";
import { Link, useLocation, useRouteMatch } from 'react-router-dom';

import CornerRibbon from "react-corner-ribbon";
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';



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

function MyNFTs(props) {
    let location = useLocation();
    const classes = useStyles();
    let { path } = useRouteMatch();
    const [rowsPerPage, setRowsPerPage] = React.useState(8);
    const [totalNfts, setTotalNfts] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [tokenList, setTokenList] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [nftIds, setNftIds] = useState([]);
    let [isSaving, setIsSaving] = useState(false);
    const [network, setNetwork] = useState("");
    const [showNetworkModal, setShowNetworkModal] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    let [openDialog, setOpenDialog] = useState(false);
    let [openEditModal, setOpenEditModal] = useState(false);
    let [isPlaying, setIsPlaying] = useState(false);
    let [nftDetail, setNftDetail] = useState({});
    let [audio, setAudio] = useState();
    let handleOpenNFTDetailModal = (nftObject) => {
        setNftDetail(nftObject);
        setOpenDialog(true);
    }
    

    const handleCloseNetworkModal = () => setShowNetworkModal(false);
    const handleShowNetworkModal = () => setShowNetworkModal(true);
    const myRef = useRef();

    // let loadWeb3 = async () => {
    //     if (window.ethereum) {
    //         window.web3 = new Web3(window.ethereum)
    //         await window.ethereum.enable()
    //     }
    //     else if (window.web3) {
    //         window.web3 = new Web3(window.web3.currentProvider)
    //     }
    //     else {
    //         window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    //     }
    // }

    // const getHash = (id) => {
     
    //     const hex = Web3.utils.toHex(id);
    //     console.log('conversion to hex: ', hex);
    //     return hex;

    // }

    // let handleCloseNFTDetailModal = () => {
    //     // setTokenList([...tempTokenList]);
    //     // setTempTokenList([]);
    //     console.log("Close button called from modal.");
    //     setOpenDialog(false);
    // }

    // let handleBuy= async() => {
    //     // setNftDetail(nftObject);
    //     console.log("Nft detail: ", nftDetail);
    //     setNftDetail(nftDetail);
    //     // console.log("Nft detail id: ", nftDetail.collectionId._id);
    //     let dropIdHex = getHash(nftDetail.dropId);
    //     console.log(dropIdHex);
    //     setOpenDialog(false);
    //     setIsSaving(true);
    //     await loadWeb3();
    //     const web3 = window.web3
    //     const accounts = await web3.eth.getAccounts();
    //     const network = await web3.eth.net.getNetworkType()
    //     if (network !== 'goerli') {
    //         setNetwork(network);
    //         setIsSaving(false);
    //         handleShowNetworkModal();
    //     }
    //     else {
    //         handleShowBackdrop();
    //         const addressDropFactory = Addresses.FactoryDrop;
    //         const abiDropFactory = DropFactory;            

    //         var myContractInstance = await new web3.eth.Contract(abiDropFactory, addressDropFactory);
    //         console.log("myContractInstance", myContractInstance)
        
    //         await myContractInstance.methods.executeOrder(dropIdHex, nftDetail.collectionId.nftContractAddress, nftDetail.nftId, nftDetail.tokenSupply, nftDetail.currentMarketplaceId.price).send({from : accounts[0]}, (err, response) => {
    //             console.log('get transaction', err, response);
    //             let data = {
    //                 dropId : nftDetail.dropId,
    //                 nftId : nftDetail._id,
    //                 txHash : response

    //             }

    //             console.log("data",data);
    //             axios.put(`/marketplace/buy`, data).then(
    //                 (response) => {
    //                     console.log("Transaction Hash sending on backend response: ", response);
    //                 },
    //                 (error) => {
    //                     console.log("Transaction hash on backend error: ", error.response);
    //                 }
    //             )
                   

    //             if (err !== null) {
    //                 console.log("err", err);
    //                 let variant = "error";
    //                 enqueueSnackbar('User Canceled Transaction', { variant });
    //                 handleCloseBackdrop();
    //                 setIsSaving(false);

    //             }
                
    //         })
    //         .on('receipt', (receipt) => {
    //             console.log("receipt", receipt);
                
    //         })
    //     }

    // }
    const handleCloseBackdrop = () => {
        setOpen(false);
    };
    const handleShowBackdrop = () => {
        setOpen(true);
    };
    let handlePlay= async(e, src) => {
        e.preventDefault();
        let audioPlay = new Audio(src);
        console.log("src", src);
        console.log("audi play", audioPlay);
        
        console.log("playing?",isPlaying);
        console.log("audio", audio);
        setIsPlaying(true);
        audioPlay.play();
        setAudio(audioPlay);
        console.log("Audio",audio);

     
    }
    let handlePause= async(e, src) => {
        e.preventDefault();
        console.log("Audio",audio);
        setIsPlaying(false);
        audio.pause();

        
     
    }
    let getNFTs = (start, end) => {
        handleShowBackdrop();
        console.log("nftids", location.state.nftId);
        console.log("dropId", location.state.dropId);

        let data = {
            nftIds : location.state.nftId
        }
        axios.get(`/drop/nfts/${location.state.dropId}/${start}/${end}`, data).then(
            (response) => {
                console.log("response", response);
                setTokenList(response.data.data);
                setTotalNfts(response.data.data.length);

                handleCloseBackdrop();
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
                handleCloseBackdrop();
            })
    }

    useEffect(() => {

        setNftIds(location.state.nftId);
        getNFTs(0, rowsPerPage);
        // getCollections();?

        props.setActiveTab({
            dashboard: "",
            newNFT: "",
            orders: "",
            myNFTs: "",
            myCubes: "",
            myDrops: "",
            settings: "",
            mySeason: "",
            privacyPolicy: "",
            termsandconditions: "",
            changePassword: "",
            newDrop: "",
            newCube: "",
            newCollection: "",
            newRandomDrop: "",
            marketPlace: "active"
        });// eslint-disable-next-line
    }, []);
    const handleChangePage = (event, newPage) => {
        console.log("newPage", newPage);
        setPage(newPage);
        console.log("Start", newPage * rowsPerPage);
        console.log("End", newPage * rowsPerPage + rowsPerPage);
        getNFTs(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        getNFTs(0, parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className="card">
            <ul className="breadcrumb" style={{ backgroundColor: "rgb(167,0,0)" }}>
                <li className="breadcrumb-item">
                    <a href="/">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Market Place Drops</li>
            </ul>
            <div className="card-body">
                <form >
                    <div className="form-group">

                        {open ? (
                            <div align="center" className="text-center">
                                <Spinner
                                    animation="border"
                                    role="status"
                                    style={{ color: "#ff0000" }}
                                >
                                </Spinner>
                                <span style={{ color: "#ff0000" }} className="sr-only">Loading...</span>
                            </div>
                        ) : tokenList.length === 0 ? (
                            <Card variant="outlined" style={{ padding: "40px", marginTop: '20px', marginBottom: '20px' }}>
                                <Typography variant="body2" className="text-center" color="textSecondary" component="p"  >
                                    <strong>No items to display </strong>
                                </Typography>
                            </Card>
                        ) : (
                            <Grid
                                container
                                spacing={2}
                                direction="row"
                                justify="flex-start"
                            >
                                {tokenList.map((i, index) => (
                                     
                                     <Grid item xs={12} sm={6} md={3} key={index}>
                                        {(location.state.saleType === "fixed-price") ? (
                                             <Link to={{pathname :`${path}/buy`, state : {nftDetail : i, startTime : location.state.startTime, endTime : location.state.endTime}}} >
                                             <Card style={{ height: "100%" }} variant="outlined" className={classes.cardHeight}>
                                                 {/* <CardActionArea onClick={() => {
                                                         console.log("nftDetailObject: ", i);
                                                         handleOpenNFTDetailModal(i);
                                                         console.log("Open Dialog Value: ", openDialog); 
                                                 }}> */}
                                                     <div style={{ position: "relative" }}>
 
                                                         <CardHeader className="text-center"
                                                         title={i.title.length > 7 ? (<span>{i.title.slice(0,7)}...</span>) : (i.title)}
 
                                                         />
 
                                                         {(i.currentMarketplaceId.isSold === true) ? (
                                                         <CornerRibbon
                                                                 position="top-right" 
                                                                 fontColor="#f0f0f0" 
                                                                 backgroundColor="#f44336"
                                                                 style={{fontWeight : 'bold'}} 
                                                                 >
                                                                 SOLD
                                                         </CornerRibbon>
                                                         ) : (null) }
                                                         
                                                     </div>
                                                     
                                                    <div style={{ position: "relative" }}>
                                                        <CardMedia
                                                            variant="outlined" style={{ border: i.type === "Mastercraft" ? '4px solid #ff0000' : i.type === "Legendary" ? '4px solid #FFD700' : i.type === "Epic" ? '4px solid #9400D3' : i.type === "Rare" ? '4px solid #0000FF' : i.type === "Uncommon" ? '4px solid #008000' : i.type === "Common" ? '4px solid #FFFFFF' : 'none' }}
                                                            className={classes.media}
                                                            image={i.previewImageURI ? i.previewImageURI : i.nftURI}
                                                            title="NFT Image"
                                                        />
                                                         
                                                         
                                                        {i.nftFormat === "mp3" ? (
                                                            
                                                            <div style={{ position: "absolute", top: "80%", left: "75%" , }}>
                                                                {
                    
                                                               
                                                                (isPlaying === false ) ? (
                                                                     <button class="btn" style={{borderRadius: "80%" }} onClick={(e) => handlePlay(e,i.nftURI)}><PlayArrow /></button>
                                                                ) : (
                                                                    <button class="btn" style={{borderRadius: "80%" }} onClick={(e) => handlePause(e)}><Pause /></button>
                                                                )}
                                                               
                                                            </div>
                                                        ) : (null)}
                                                        
                                                    </div>
                                                        
                                                 
                                                 
                                                     <CardContent>
                                                    
                                                     <Typography variant="body2" color="textSecondary" component="p">
                                                         <strong>Token Rarity: </strong>{i.type}
                                                     </Typography>
                                                     <Typography variant="body2" color="textSecondary" component="p">
                                                         <strong>Token Supply: </strong>{i.tokenSupply}
                                                     </Typography>
                                                     <Typography variant="body2" color="textSecondary" component="p">
                                                         <strong>Artwork Description: </strong>{i.description}
                                                     </Typography>
                                                     </CardContent>
                                                 {/* </CardActionArea> */}
                                             </Card>
                                         </Link>
                                        ) : (
                                            <Link to={{pathname:`/dashboard/marketPlace/${i.dropId}/${i._id}`, state: {nftContractAddress: i.collectionId.nftContractAddress, endTime: location.state.endTime}}} >
                                            <Card style={{ height: "100%" }} variant="outlined" className={classes.cardHeight}>
                                                {/* <CardActionArea onClick={() => {
                                                        console.log("nftDetailObject: ", i);
                                                        handleOpenNFTDetailModal(i);
                                                        console.log("Open Dialog Value: ", openDialog); 
                                                }}> */}
                                                    <div style={{ position: "relative" }}>

                                                        <CardHeader className="text-center"
                                                        title={i.title.length > 7 ? (<span>{i.title.slice(0,7)}...</span>) : (i.title)}

                                                        />

                                                        {(i.currentMarketplaceId.isSold === true) ? (
                                                        <CornerRibbon
                                                                position="top-right" 
                                                                fontColor="#f0f0f0" 
                                                                backgroundColor="#f44336"
                                                                style={{fontWeight : 'bold'}} 
                                                                >
                                                                SOLD
                                                        </CornerRibbon>
                                                        ) : (null) }
                                                        
                                                    </div>
                                                    
                                                        <CardMedia
                                                            variant="outlined" style={{ border: i.type === "Mastercraft" ? '4px solid #ff0000' : i.type === "Legendary" ? '4px solid #FFD700' : i.type === "Epic" ? '4px solid #9400D3' : i.type === "Rare" ? '4px solid #0000FF' : i.type === "Uncommon" ? '4px solid #008000' : i.type === "Common" ? '4px solid #FFFFFF' : 'none' }}
                                                            className={classes.media}
                                                            image={i.nftURI}
                                                            title="NFT Image"
                                                        />
                                                       
                                                
                                                
                                                    <CardContent>
                                                   
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        <strong>Token Rarity: </strong>{i.type}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        <strong>Token Supply: </strong>{i.tokenSupply}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        <strong>Artwork Description: </strong>{i.description}
                                                    </Typography>
                                                    </CardContent>
                                                {/* </CardActionArea> */}
                                            </Card>
                                        </Link>
                                        )}
                                       
                                 </Grid>
                                ))}
                            </Grid>
                        )}
                    </div>
                    <TablePagination
                        rowsPerPageOptions={[4, 8, 12, 24]}
                        component="div"
                        count={totalNfts}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </form>
            </div >
            {/* <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop> */}
            {/* <NetworkErrorModal
                show={showNetworkModal}
                handleClose={handleCloseNetworkModal}
                network={network}
            >
            </NetworkErrorModal>
            <NFTBuyModal 
                show={openDialog} 
                handleClose={handleCloseNFTDetailModal}
                nftDetail={nftDetail}
                handleBuy={handleBuy}
            >
            </NFTBuyModal> */}
        </div >

    );
}

export default MyNFTs;

