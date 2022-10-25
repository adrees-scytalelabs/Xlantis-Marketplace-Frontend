import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardMedia, makeStyles, Paper, Typography } from '@material-ui/core';
import { Col, Row, Table } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import {Button} from '@material-ui/core';
import Web3 from 'web3';
import DropFactory from '../../../../components/blockchain/Abis/DropFactory.json';
import * as Addresses from '../../../../components/blockchain/Addresses/Addresses';
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

    useEffect(() => {
        // getNftDetail();
        console.log("hehe",location.state.nftDetail);
        setNftDetail(location.state.nftDetail);
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
                                
                                
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div >
        
    );
}
 
export default DropSingleNFT;