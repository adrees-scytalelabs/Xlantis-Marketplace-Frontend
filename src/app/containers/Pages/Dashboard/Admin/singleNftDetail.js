import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, CardHeader, CardMedia, makeStyles, Typography } from '@material-ui/core';
import { BlurLinear, ExpandMore } from '@material-ui/icons';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

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

const SingleNftDetail = (props) => {
    const classes = useStyles();
    const { nftId } = useParams();
    const [open, setOpen] = useState(false);
    const [nftDetail, setNftDetail] = useState({});
    const [keys, setKeys] = useState([]);
    const [properties, setProperties] = useState({});

    const handleCloseBackdrop = () => {
        setOpen(false);
    };
    const handleShowBackdrop = () => {
        setOpen(true);
    };

    let getNftDetail = () => {
        // handleShowBackdrop();
        axios.get(`nft/getSingleNFT/${nftId}`).then(
            (response) => {
                console.log("Response: ", response);
                setNftDetail(response.data.data[0]);
                setProperties(response.data.data[0].properties);
                const keys = Object.keys(response.data.data[0].properties);
                console.log("Keys: ", keys);
                setKeys(keys);
            },
            (error) => {
                console.log("Error: ", error);
                console.log("Error response: ", error.response);
            }
        )
        // .catch((error) => {
        //     console.log("Error: ", error.response.data);
        // })

    }

    useEffect(() => {
        getNftDetail();
        props.setActiveTab({
            dashboard: "",
            totalUserAccount: "",
            pendingUserAccount: "",
            newCube: "",
            myNFTs: "active",
            newCollection: "",
            mySeason: "",
            tradeListOrders: "",
            myDrops: "",
            myCubes: "",
            referralEarnings: "",
            disputedOrders: "",
            resolvedDisputedOrders: "",
            settings: "",
            changePassword: "",
            newRandomDrop: ""
        });// eslint-disable-next-line
    }, []);

    return (
        <div className="card">
            <ul className="breadcrumb" style={{ backgroundColor: "rgb(167, 0, 0)" }}>
                <li className="breadcrumb-item">
                    <a href="/">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">NFT Detail</li>
            </ul>
            <div className="card-body" >
                <div className="row">
                    <div className="col-md-12 col-lg-4">
                        <Card className={classes.root}>
                            <CardMedia
                                className={classes.media}
                                title="NFT Artwork"
                                image={nftDetail.nftURI}
                            >

                            </CardMedia>
                        </Card>
                    </div>
                    <div className="col-md-12 col-lg-8">
                        <Card>
                            <CardContent>
                                <Row>
                                    <Col>
                                        <Typography variant="body1" component="p" style={{color: '#a70000'}}>
                                            <strong>NFT Title </strong>
                                        </Typography>
                                    </Col>
                                    <Col>
                                        {nftDetail.title}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Typography variant="body1" component="p" style={{color: '#a70000'}}>
                                            <strong>NFT Description </strong>
                                        </Typography>
                                    </Col>
                                    <Col>
                                        {nftDetail.description}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Typography variant="body1" component="p" style={{color: '#a70000'}}>
                                            <strong>Rarity </strong>
                                        </Typography>
                                    </Col>
                                    <Col>
                                        {nftDetail.type}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Typography variant="body1" component="p" style={{color: '#a70000'}}>
                                            <strong>Supply Type </strong>
                                        </Typography>
                                    </Col>
                                    <Col>
                                        {nftDetail.supplyType}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Typography variant="body1" component="p" style={{color: '#a70000'}}>
                                            <strong>Token Supply </strong>
                                        </Typography>
                                    </Col>
                                    <Col>
                                        {nftDetail.tokenSupply}
                                    </Col>
                                </Row>
                            </CardContent>
                        </Card>
                        <Row style={{marginTop: '5px', marginBottom: '5px'}} >
                            <Col>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                    >
                                        <Typography variant="body1" style={{color: '#a70000'}}><BlurLinear /><strong> Properties</strong></Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
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
                                    </AccordionDetails>
                                </Accordion>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default SingleNftDetail;