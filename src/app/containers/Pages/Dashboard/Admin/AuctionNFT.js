import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { Backdrop, Card, CardContent, CardHeader, CardMedia, CircularProgress, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { Col, Row, Table } from 'react-bootstrap';
import Web3 from 'web3';
import NetworkErrorModal from '../../../../components/Modals/NetworkErrorModal';
import { useSnackbar } from 'notistack';
import DateTimePicker from 'react-datetime-picker';
import CreateNFTContract from '../../../../components/blockchain/Abis/AuctionDropFactory.json';
import * as Addresses from '../../../../components/blockchain/Addresses/Addresses';
import { now } from 'lodash';
import ERC20Abi from "../../../../components/blockchain/Abis/AuctionERC20.json";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";



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


const AuctionNFT = (props) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const { nftId, dropId } = useParams();
    const location = useLocation();
    const { nftContractAddress } = location.state;
    const [open, setOpen] = useState(false);
    const [nftDetail, setNftDetail] = useState({});
    const [properties, setProperties] = useState([]);
    const [keys, setKeys] = useState([]);
    const [biddingValue, setBiddingValue] = useState(0);
    const [network, setNetwork] = useState("");
    const [show, setShow] = useState(false);
    const [dropIdObj, setDropIdObj] = useState("");
    const [nftBlockChainId, setNftBlockChainId] = useState("");
    const [bidExpiryTime, setBidExpiryTime] = useState(new Date());
    const [bidExpiryTimeStamp, setBidExpiryTimeStamp] = useState(Math.round(bidExpiryTime.getTime() /1000))
    const [dropExpiryTime, setDropExpiryTime] = useState(new Date());
    const [dropExpiryTimeStamp, setDropExpiryTimeStamp] = useState(Math.round(dropExpiryTime.getTime()/1000));
    const [dropCloneAddress, setDropCloneAddress] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseBackdrop = () => {
        setOpen(false);
    };
    const handleShowBackdrop = () => {
        setOpen(true);
    };

    let getNftDetail = () => {
        // handleShowBackdrop();
        axios.get(`drop/nft/${nftId}`).then(
            (response) => {
                console.log("Response getting NFT Detail: ", response);
                setNftDetail(response.data.data[0]);
                setDropIdObj(response.data.data[0].dropId);
                setNftBlockChainId(response.data.data[0].nftId);
                const keys = Object.keys(response.data.data[0].properties);
                console.log("Keys: ", keys);
                setKeys(keys);
                setProperties(response.data.data[0].properties);
            }
        )
        .catch((error) => {
            console.log("Error: ", error);
        })

    }

    let getDropCloneAddress = () => {
        console.log("Drop ID: ", dropId);
        axios.get(`/drop/${dropId}`).then(
            (response) => {
                console.log("Response from getting drop details: ", response);
                console.log("Response from getting drop details: ", response.data.dropData.dropCloneAddress);
                setDropCloneAddress(response.data.dropData.dropCloneAddress);
            },
            (err) => {
                console.log("Err from getting drop details: ", err);
                console.log("Err response from getting drop details: ", err.response);
            }
        )
    }

    useEffect(() => {
        console.log("Auction contract address: ", location);
        setDropExpiryTime(new Date(location.state.endTime));
        setDropExpiryTimeStamp(Math.round(new Date(location.state.endTime).getTime()));
        getNftDetail();
        getDropCloneAddress();

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
        });
    }, []);

    let handleChangeBiddingValue = (event) => {
        if(event.target.value >= 0) {
            setBiddingValue(event.target.value);
        }
    }

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

    let getHash = (id) => {
     
        const hex = Web3.utils.toHex(id);
        console.log('conversion to hex: ', hex);
        return hex;

    }

    let giveAuctionErc20Approval = async () => {
        await loadWeb3();
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts();
        console.log("Account 0: ", accounts[0]);
        const network = await web3.eth.net.getNetworkType()
        if (network !== 'goerli') {
            setNetwork(network);
            handleShow();
        }
        else{

            const addressErc20Auction = Addresses.AuctionERC20;
            const addressDropClone = dropCloneAddress;            
            const abiERC20 = ERC20Abi;

            let bidValue = web3.utils.toWei(biddingValue, 'ether');


            console.log("Contract Address: ", addressErc20Auction);
            var myContractInstance = await new web3.eth.Contract(abiERC20, addressErc20Auction);
            console.log("myContractInstance", myContractInstance)
            

            await myContractInstance.methods.approve(addressDropClone, bidValue).send({from : accounts[0]}, (err, response) => {
                console.log('get transaction', err, response);
                
                if (err !== null) {
                    console.log("err", err);
                    let variant = "error";
                    enqueueSnackbar('User Canceled Transaction', { variant });
                    handleCloseBackdrop();

                }
            
            }
        )
            .on('receipt', (receipt) => {
                console.log("receipt", receipt);
            })
        }
    }

    let handleBidSubmit = async (event) => {
        event.preventDefault();

        //conditions checking
        console.log("Bid Expiry Timestamp: ", bidExpiryTimeStamp);
        console.log("Drop Expiry Timestamp: ", dropExpiryTimeStamp);
        console.log("Bid Expiry Time: ", bidExpiryTime);
        console.log("Drop Expiry Time: ", dropExpiryTime);

        if(bidExpiryTimeStamp > dropExpiryTimeStamp || new Date(bidExpiryTime) > new Date(dropExpiryTime)) {
            let variant = 'error';
            enqueueSnackbar("Bid Expiry Time cannot be more than Drop's Expiry Time.", { variant });
        }
        if (biddingValue === 0) {
            let variant = "error";
            enqueueSnackbar("Bidding Value cannot be zero.", { variant });
        }
        else {
            await loadWeb3();
            const web3 = window.web3
            const accounts = await web3.eth.getAccounts();
            console.log("Accounts[0]: ", accounts[[0]]);
            const network = await web3.eth.net.getNetworkType()
            if (network !== 'goerli') {
                setNetwork(network);
                handleShow();
            }
            else {
                handleShowBackdrop();
                await giveAuctionErc20Approval();
                //put condition here if badding value is higher than max bid or if there is first bid then it should be higher than floor value
                let bidData = {
                    nftId: nftDetail._id,
                    bidAmount: biddingValue.toString(),
                    bidderAddress: accounts[0],
                    expiryTime: bidExpiryTime
                }

                console.log("Type of time: ", typeof(bidExpiryTime), bidExpiryTime);
                console.log("Bid data: ", bidData);
                

                let dropIdHash = getHash(dropIdObj);
                let nftId = nftBlockChainId;
                let bidValue = web3.utils.toWei(biddingValue, 'ether');

                console.log("NFT id type: ", typeof(nftId));
                console.log("Bid Value type: ", typeof(bidValue), bidValue);
                console.log("Drop Id Hash: ", dropIdHash);

                let contractAddress = Addresses.AuctionDropFactory;
                let contractAbi = CreateNFTContract;
                let myContractInstance = await new web3.eth.Contract(contractAbi, contractAddress);
                let trxHash;

                axios.post("/auction/bid", bidData).then(
                    (response) => {
                        console.log("Response from sending bid data to backend: ", response);
                        let bidIdHash = getHash(response.data.bidId);
                        let bidId = response.data.bidId;

                        //sending call on blockchain

                        console.log("Bid data for blockchain: ");
                        console.log("drop id hash: ", dropIdHash);
                        console.log("bid id hash: ", bidIdHash);
                        console.log("nft address: ", location.state.nftContractAddress);
                        console.log("nft id: ", nftId);
                        console.log("bid Value: ", bidValue);
                        

                        myContractInstance.methods.bid(dropIdHash, bidIdHash, location.state.nftContractAddress, nftId, bidValue).send({ from: accounts[0] }, (err, response) => {
                            console.log('get transaction: ', err, response);
                            if (err !== null) {
                                console.log('err: ', err);
                                handleCloseBackdrop();
                            }
                            trxHash = response;
                            

                        })
                            .on('receipt', (receipt) => {
                                console.log('receipt: ', receipt);

                                //sending finalize call on backend
                                let finalizeBidData = {
                                    "bidId": bidId,
                                    "txHash": trxHash 
                                }

                                axios.put('/auction/bid/finalize', finalizeBidData).then(
                                    (response) => {
                                        console.log("Response from finalize bid: ", response);
                                    },
                                    (err) => {
                                        console.log("Err from finalize bid: ", err);
                                        console.log("Err response from finalize bid: ", err);
                                    }
                                )
                                handleCloseBackdrop();
                            });

                    },
                    (error) => {
                        console.log("Error from sending bid data to backend: ", error);
                        handleCloseBackdrop();
                    }
                )
            }
        }
    }
    
    return (
        <div className="card">
            <ul className="breadcrumb" style={{ backgroundColor: "rgb(167, 0, 0)" }}>
                <li className="breadcrumb-item">
                    <a href="/">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Market Palce</li>
            </ul>
            <div className="card-body" >
                <div className="row">
                    <div className="col-md-12 col-lg-6">
                        <Paper elevation={5} >
                            <Card className={classes.root}>
                                {/* <CardHeader 
                                    className="text-center"
                                    title={nftDetail.title}
                                /> */}
                                <CardMedia
                                    className={classes.media}
                                    title="NFT Artwork"
                                    image={nftDetail.previewImageURI ? nftDetail.previewImageURI : nftDetail.nftURI}
                                >

                                </CardMedia>
                                {nftDetail.nftFormat === "mp3"  ? (
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
                                    </div>) : (null) }
                            </Card>
                        </Paper>
                    </div>
                    <div className="col-md-12 col-lg-6">
                        <Card>
                            <CardContent>
                                <Row>
                                    <Col>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            <strong>Nft Title: </strong>
                                        </Typography>
                                    </Col>
                                    <Col>
                                        {nftDetail.title}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            <strong>Nft Description: </strong>
                                        </Typography>
                                    </Col>
                                    <Col>
                                        {nftDetail.description}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            <strong>Rarity: </strong>
                                        </Typography>
                                    </Col>
                                    <Col>
                                        {nftDetail.type}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            <strong>Supply Type: </strong>
                                        </Typography>
                                    </Col>
                                    <Col>
                                        {nftDetail.supplyType}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            <strong>Token Supply: </strong>
                                        </Typography>
                                    </Col>
                                    <Col>
                                        {nftDetail.tokenSupply}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Typography color="textSecondary" component="p">
                                            <strong>Properties:</strong>
                                        </Typography>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <Table striped bordered hover >
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
                                    </Col>
                                </Row>
                            </CardContent>
                        </Card>
                        <Row>
                            <Col>
                                <form>
                                    <label style={{color:"#a70000", marginTop: "10px"}}>Set Bid Expiry Time</label>
                                    <div className="form-group">
                                        <DateTimePicker
                                            className="form-control"
                                            onChange={(e) => {
                                                console.log(e);
                                                console.log("e.getTime()", Math.round(e.getTime() ));
                                                setBidExpiryTime(e);
                                                setBidExpiryTimeStamp(Number(Math.round(e.getTime())));
                                            }}
                                            value={bidExpiryTime}
                                        />
                                    </div>
                                    <label>Bidding value</label>
                                    <div className="form-group">
                                        <TextField
                                            style={{marginTop:'5px'}} 
                                            autoComplete='false'
                                            value={biddingValue}
                                            variant="outlined" 
                                            type='number' 
                                            color='secondary'
                                            onChange={(e) => {
                                                handleChangeBiddingValue(e);
                                            }}  
                                        />
                                        <button className='btn' style={{marginTop:'9px', marginLeft:'5px'}} onClick={(e) => handleBidSubmit(e)} >
                                            Bid
                                        </button>
                                    </div>
                                </form>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>

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
 
export default AuctionNFT;