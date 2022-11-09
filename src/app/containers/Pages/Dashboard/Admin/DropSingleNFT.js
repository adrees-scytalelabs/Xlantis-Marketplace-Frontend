import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, CardHeader, CardMedia, makeStyles, Paper, Tooltip, Typography } from '@material-ui/core';
import { Col, Row, Table } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import {Button} from '@material-ui/core';
import Web3 from 'web3';
import DropFactory from '../../../../components/blockchain/Abis/DropFactory.json';
import * as Addresses from '../../../../components/blockchain/Addresses/Addresses';
import { useSnackbar } from 'notistack';
import abiAuctionDropFactory1155 from '../../../../components/blockchain/Abis/AuctionDropFactory1155.json';
import abiAuctionDropFactory721 from '../../../../components/blockchain/Abis/AuctionDropFactory721.json';
import { BlurLinear, ExpandMore } from '@material-ui/icons';
import ListIcon from "@material-ui/icons/List";
import Countdown from 'react-countdown';
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { GLTFModel, AmbientLight, DirectionLight } from "react-3d-viewer";

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
    media1: {
        height: 300,
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
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },

}));



const DropSingleNFT = (props) => {
    let location = useLocation();
    const classes = useStyles();
    const { nftId } = useParams();
    const [open, setOpen] = useState(false);
    const [nftDetail, setNftDetail] = useState({});
    const [properties, setProperties] = useState([]);
    const [keys, setKeys] = useState([]);
    let [openDialog, setOpenDialog] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    let [isSaving, setIsSaving] = useState(false);
    const [network, setNetwork] = useState("");
    const [showNetworkModal, setShowNetworkModal] = useState(false);
    let [show, setShow] = useState(false);
    let [bidDetail, setBidDetail] = useState([]);
    let [isHovering, setIsHovering] = useState(false);
    let [contractType, setContractType] = useState("");


    const handleCloseBackdrop = () => {
        setOpen(false);
    };
    const handleShowBackdrop = () => {
        setOpen(true);
    };
    const handleCloseNetworkModal = () => setShowNetworkModal(false);
    const handleShowNetworkModal = () => setShowNetworkModal(true);
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


    const getHash = (id) => {
     
        const hex = Web3.utils.toHex(id);
        console.log('conversion to hex: ', hex);
        return hex;

    }

    let handleBuy= async() => {
        // setNftDetail(nftObject);
        console.log("Nft detail: ", nftDetail);
        // setNftDetail(nftDetail);
        // console.log("Nft detail id: ", nftDetail.collectionId._id);
        let dropIdHex = getHash(nftDetail.dropId);
        console.log(dropIdHex);
        setOpenDialog(false);
        setIsSaving(true);
        await loadWeb3();
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts();
        const network = await web3.eth.net.getNetworkType()
        if (network !== 'goerli') {
            setNetwork(network);
            setIsSaving(false);
            handleShowNetworkModal();
        }
        else {
            handleShowBackdrop();
            const addressDropFactory = Addresses.FactoryDrop;
            const abiDropFactory = DropFactory;            

            var myContractInstance = await new web3.eth.Contract(abiDropFactory, addressDropFactory);
            console.log("myContractInstance", myContractInstance)
        
            await myContractInstance.methods.executeOrder(dropIdHex, nftDetail.collectionId.nftContractAddress, nftDetail.nftId, nftDetail.tokenSupply, nftDetail.currentMarketplaceId.price).send({from : accounts[0]}, (err, response) => {
                console.log('get transaction', err, response);
                let data = {
                    dropId : nftDetail.dropId,
                    nftId : nftDetail._id,
                    txHash : response

                }

                console.log("data",data);
                axios.post(`/marketplace/buy`, data).then(
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
                
            })
        }

    }

    let getBidList = (nftId) => {
        axios.get(`/auction/bids/${nftId}/${0}/${1000}`).then(
            (response) => {
                console.log("Response from getting bid: ", response);
                console.log("Bid array: ", response.data.data);
                setBidDetail(response.data.data);
            },
            (err) => {
                console.log("Error from getting bids: ", err);
                console.log("Error response from getting bids: ", err);
                setBidDetail([]);
            }
        )
    }

    useEffect(() => {
        // getNftDetail();
        // console.log("hehe",location.state.nftDetail);
        setNftDetail(location.state.nftDetail);
        console.log("NFT detail: ", location.state.nftDetail);
        setContractType(location.state.nftDetail.collectionId.contractType);
        setKeys(Object.keys(location.state.nftDetail.properties));
        setProperties(location.state.nftDetail.properties);
        if (location.state.saleType === "auction") {
            getBidList(location.state.nftDetail._id);
        }
        console.log("saleType", location.state.saleType);

        props.setActiveTab({
            dashboard: "",
            newNFT: "",
            orders: "",
            myNFTs: "",
            myCubes: "",
            myDrops: "active",
            settings: "",
            mySeason: "",
            privacyPolicy: "",
            termsandconditions: "",
            changePassword: "",
            newDrop: "",
            newCube: "",
            newCollection: "",
            newRandomDrop: "",
            marketPlace: ""
        });
    }, []);

    let handleCloseModal = () => {
        setShow(false);
    }

    let handleAcceptBid = async (e, bidId) => {
        e.preventDefault();
        await loadWeb3();
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts();
        const network = await web3.eth.net.getNetworkType()
        if (network !== 'goerli') {
            setNetwork(network);
            setIsSaving(false);
            handleShowNetworkModal();
        }
        else {

            if (contractType === "1155"){
                //sending call on blockchain
                let abiAuctionFactory;
                let addressAuctionFactory;

                if (contractType === '1155') {
                    abiAuctionFactory = abiAuctionDropFactory1155;
                    addressAuctionFactory = Addresses.AuctionDropFactory1155;
                }
                else if (contractType === '721') {
                    abiAuctionFactory = abiAuctionDropFactory721;
                    addressAuctionFactory = Addresses.AuctionDropFactory721;
                }

                //getting data to send call
                let dropIdHash = getHash(nftDetail.dropId);
                let nftAddress = nftDetail.collectionId.nftContractAddress //to be confirmed to send request
                let tokenId = nftDetail.nftId;
                let bidIdHash = getHash(bidId) //get bid object id and get hash to send to blockchain
                let trxHash;

                let myContractInstance = await new web3.eth.Contract(abiAuctionFactory, addressAuctionFactory);
                console.log("My auction drop factory instance: ", myContractInstance);


                //Call for auction drop factory 1155
                if (contractType === '1155') {

                    await myContractInstance.methods.acceptBid(dropIdHash, nftAddress, tokenId, bidIdHash).send({ from: accounts[0] }, (err, response) => {
                        console.log("get Transaction: ", err, response);
    
                        if(err !== null) {
                            console.log("Err: ", err);
                        }
                        trxHash = response;
    
    
                    }).
                    on('receipt', (receipt) => {
                        console.log("receipt: ", receipt);
                    });

                }
                    //Call for auction drop factory 721
                else if (contractType === '721') {

                    await myContractInstance.methods.acceptBidLazyMint(dropIdHash, nftAddress, tokenId, bidIdHash).send({ from: accounts[0] }, (err, response) => {
                        console.log("get Transaction: ", err, response);
    
                        if(err !== null) {
                            console.log("Err: ", err);
                        }
                        trxHash = response;
    
    
                    }).
                    on('receipt', (receipt) => {
                        console.log("receipt: ", receipt);
                    });

                }

               

                //sending call on backend to update data

                let data = {
                    "bidId": bidId,
                    "txHash": trxHash 
                }

                axios.post("/auction/bid/accept", data).then(
                    (response) => {
                        console.log("response", response);
                    },
                    (error) => {
                        console.log("Error: ", error);
                    }
                )

                
            } 
            // else if (contractType === "721") {
            //     //sending call on backend to update data

            //     let data = {
            //         "bidId": bidId
            //     }

            //     axios.post("/auction/bid/accept", data).then(
            //         (response) => {
            //             console.log("response", response);
            //         },
            //         (error) => {
            //             console.log("Error: ", error);
            //         }
            //     )
            // }
            
        }   
    }
    
    return (
        <div className="card">
            <ul className="breadcrumb" style={{ backgroundColor: "rgb(167, 0, 0)" }}>
                <li className="breadcrumb-item">
                    <a href="/">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">NFT</li>
            </ul>
            <div className="card-body" >
                <div className="row">
                    <div className="col-md-12 col-lg-4">
                        <Paper elevation={5} >
                            <Card className={classes.root}>
                                <div>
                                    {nftDetail.nftFormat === "glb" || nftDetail.nftFormat === "gltf" ? (
                                        <div>
                                            <div style={{display: 'flex',margin: "10px", justifyContent: 'center', alignItems: 'center'}}>
                                                <GLTFModel src={nftDetail.nftURI} width={250} height={250} >
                                                    <AmbientLight color={0xffffff} />
                                                    <AmbientLight color={0xffffff} />
                                                    <AmbientLight color={0xffffff} />
                                                    <AmbientLight color={0xffffff} />
                                                    {/* <AmbientLight color={0xffffff} />
                                                    <AmbientLight color={0xffffff} />
                                                    <AmbientLight color={0xffffff} /> */}
                                                    <DirectionLight
                                                        color={0xffffff}
                                                        position={{ x: 100, y: 200, z: 100 }}
                                                    />
                                                    <DirectionLight
                                                        color={0xffffff}
                                                        position={{ x: 50, y: 200, z: 100 }}
                                                    />
                                                    <DirectionLight
                                                        color={0xffffff}
                                                        position={{ x: 0, y: 0, z: 0 }}
                                                    />
                                                    <DirectionLight
                                                        color={0xffffff}
                                                        position={{ x: 0, y: 100, z: 200 }}
                                                    />
                                                    <DirectionLight
                                                        color={0xffffff}
                                                        position={{ x: -100, y: 200, z: -100}}
                                                    />
                                                </GLTFModel>
                                            </div>
                                            <div style={{marginTop: "20px"}}>
                                                <CardMedia
                                                className={classes.media}
                                                title="NFT Artwork"
                                                image={nftDetail.previewImageURI}
                                                >

                                                </CardMedia>
                                            </div>
                                        </div>
                                    ): nftDetail.nftFormat === "mp3" ? (
                                        <div>
                                            <CardMedia
                                                className={classes.media}
                                                title="NFT Artwork"
                                                image={nftDetail.previewImageURI ? nftDetail.previewImageURI : nftDetail.nftURI}
                                            >
                                            </CardMedia>
                                            <div>
                                                <AudioPlayer
                                                    // style={{ width: "300px" }}
                                                    style={{ borderRadius: "1rem" }}
                                                    autoPlay = {false}
                                                    layout="horizontal"
                                                    src={nftDetail.nftURI}
                                                    onPlay={(e) => console.log("onPlay")}
                                                    showSkipControls={false}
                                                    showJumpControls={false}
                                                    // header={`Now playing: ${name}`}
                                                    showDownloadProgress
                                                    // onClickPrevious={handleClickPrevious}
                                                    // onClickNext={handleClickNext}
                                                    // onEnded={handleClickNext}
                                                    // other props here
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <CardMedia
                                            className={classes.media}
                                            title="NFT Artwork"
                                            image={nftDetail.nftURI}
                                        >

                                        </CardMedia>
                                    )}

                                </div>
                            </Card>
                        </Paper>
                    </div>
                    <div className="col-md-12 col-lg-8">
                        <Card>
                            <CardContent>
                                <Row>
                                    <Col>
                                        <Typography variant="body1" component="p" style={{color:"#a70000"}} >
                                            <strong>NFT Title </strong>
                                        </Typography>
                                    </Col>
                                    <Col>
                                        {nftDetail.title}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Typography variant="body1" component="p" style={{color:"#a70000"}} >
                                            <strong>NFT Description </strong>
                                        </Typography>
                                    </Col>
                                    <Col>
                                        {nftDetail.description}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Typography variant="body1" component="p" style={{color:"#a70000"}} >
                                            <strong>Rarity </strong>
                                        </Typography>
                                    </Col>
                                    <Col>
                                        {nftDetail.type}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Typography variant="body1" component="p" style={{color:"#a70000"}} >
                                            <strong>Supply Type </strong>
                                        </Typography>
                                    </Col>
                                    <Col>
                                        {nftDetail.supplyType}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Typography variant="body1" component="p" style={{color:"#a70000"}} >
                                            <strong>Token Supply </strong>
                                        </Typography>
                                    </Col>
                                    <Col>
                                        {nftDetail.tokenSupply}
                                    </Col>
                                </Row>
                            </CardContent>
                        </Card>
                        <Row style={{marginTop: '5px'}}>
                            <Col>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                    >
                                        <Typography variant="body1" style={{color:'#a70000'}}><BlurLinear /><strong> Properties</strong></Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Table striped bordered hover responsive >
                                            <thead>
                                                <tr>
                                                    <th>Key</th>
                                                    <th>Value</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {keys?.map((j, index) => (
                                                    <tr key={index}>
                                                        <td>{j}</td>
                                                        <td>{properties[j]}</td>
                                                    </tr>
                                                ))
                                                }   
                                            </tbody>
                                        </Table>
                                    </AccordionDetails>
                                </Accordion>
                            </Col>
                        </Row>
                        {location.state.saleType === "auction" ? (
                            <Row style={{marginTop: '5px'}}>
                                <Col>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMore />}
                                        >
                                            <Typography variant="body1" style={{color: '#a70000'}}><ListIcon /><strong> Offers</strong></Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Table striped hover bordered size="sm" responsive>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Bidder</th>
                                                        <th>Bid</th>
                                                        <th>Expiration</th>
                                                        <th colSpan={2}></th>
                                                        {/* <th>
                                                            <button className="btn" onClick={props.acceptBid}>
                                                                Accept
                                                            </button>
                                                        </th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {bidDetail?.map((bid, index) => (
                                                        <tr key={index}>
                                                            <td>{index+1}</td>
                                                            <td>
                                                                <Tooltip title={bid.bidderAddress}>
                                                                    <span>{bid.bidderAddress.slice(0,6)}...</span>
                                                                </Tooltip>
                                                            </td>
                                                            <td>{bid.bidAmount}</td>
                                                            <td>
                                                                {bid.isAccepted ? (
                                                                    <span>Accepted</span>
                                                                ) : new Date() > new Date(bid.expiryTime) ? (
                                                                    <span>Expired</span>
                                                                ) : (
                                                                <Countdown daysInHour date={new Date(bid.expiryTime)}>
                                                                </Countdown>
                                                            )}
                                                            </td>
                                                            <td>
                                                                {new Date() > new Date(bid.expiryTime) ? (
                                                                    <button className="btn" disabled>
                                                                        Accept
                                                                    </button>
                                                                ): bid.isAccepted || location.nftDetail.currentMarkteplaceId.isSold ? (
                                                                    <button className="btn" disabled>
                                                                        Accept
                                                                    </button>
                                                                ) : (
                                                                    <button className="btn" onClick={(e) => handleAcceptBid(e, bid._id)}>
                                                                        Accept
                                                                    </button>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </AccordionDetails>
                                    </Accordion>
                                </Col>
                            </Row>
                        ) : null}
                        
                    </div>
                </div>
            </div>
        </div >
        
    );
}
 
export default DropSingleNFT;