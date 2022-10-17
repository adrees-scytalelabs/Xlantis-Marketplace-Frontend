import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { Backdrop, Card, CardContent, CardHeader, CardMedia, CircularProgress, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { Col, Row, Table } from 'react-bootstrap';
import Web3 from 'web3';
import NetworkErrorModal from '../../../../components/Modals/NetworkErrorModal';
import { useSnackbar } from 'notistack';



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
    const { nftId } = useParams();
    const location = useLocation();
    const { nftContractAddress } = location.state;
    const [open, setOpen] = useState(false);
    const [nftDetail, setNftDetail] = useState({});
    const [properties, setProperties] = useState([]);
    const [keys, setKeys] = useState([]);
    const [biddingValue, setBiddingValue] = useState(0);
    const [network, setNetwork] = useState("");
    const [show, setShow] = useState(false);
    // const [nftContractAddress, setNftContractAddress] = useState("");

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
                console.log("Response: ", response);
                setNftDetail(response.data.data[0]);
                // let properties = [{}];
                const keys = Object.keys(response.data.data[0].properties);
                console.log("Keys: ", keys);
                setKeys(keys);
                // setNftContractAddress(response.data.data[0].collectionId.nftContractAddress);
                // for(let i = 0; i < keys.length; i++) {
                //     properties[i]['key'] = keys[i];
                //     properties[i].value = response.data.data[0].properties.keys[i];
                // }
                setProperties(response.data.data[0].properties);

            }
        )
        .catch((error) => {
            console.log("Error: ", error);
        })

    }

    useEffect(() => {
        console.log("Auction contract address: ", location);
        getNftDetail();

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

    let handleBidSubmit = async (event) => {
        event.preventDefault();
        await loadWeb3();
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts();
        const network = await web3.eth.net.getNetworkType()
        if (network !== 'goerli') {
            setNetwork(network);
            handleShow();
        }
        else {
            handleShowBackdrop();
            //put condition here if badding value is higher than max bid or if there is first bid then it should be higher than floor value
            let bidData = {
                nftId: nftDetail._id,
                bidAmount: biddingValue.toString(),
                bidderAddress: accounts[0],
                expiryTime: location.state.endTime
            }
            
            axios.post("/auction/bid", bidData).then(
                (response) => {
                    console.log("Response from sending bid data to backend: ", response);
                },
                (error) => {
                    console.log("Error from sending bid data to backend: ", error);
                }
            )
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
                                    image={nftDetail.nftURI}
                                >

                                </CardMedia>
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
                                <Row>
                                    <Col>
                                        <form>
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
                                                <button className='btn' style={{marginTop:'9px', marginLeft:'5px'}} onChange={() => handleBidSubmit()} >
                                                    Bid
                                                </button>
                                            </div>
                                        </form>
                                    </Col>
                                </Row>
                            </CardContent>
                        </Card>
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