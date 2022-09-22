import { Card, CardContent, CardHeader, CardMedia, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
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
            }
        )
        .catch((error) => {
            console.log("Error: ", error.response.data);
        })

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
                    <div className="col-md-12 col-lg-6">
                        <Card className={classes.root}>
                            <CardHeader 
                                className="text-center"
                                title={nftDetail.title}
                            />
                            <CardMedia
                                className={classes.media}
                                title="NFT Artwork"
                                image={nftDetail.nftURI}
                            >

                            </CardMedia>
                        </Card>
                    </div>
                    <div className="col-md-12 col-lg-6">
                        <Card>
                            <CardContent>
                                <CardHeader className="text-center" title="Nft Details" />
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <strong>Nft Title: </strong>{nftDetail.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <strong>Nft Description: </strong>{nftDetail.description}
                                </Typography>
                                <CardHeader className="text-center" title="Nft Rarity" />
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <strong>Rarity: </strong>{nftDetail.type}
                                </Typography>
                                <CardHeader className="text-center" title="Nft Supply Details" />
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <strong>Supply Type: </strong>{nftDetail.supplyType}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <strong>Token Supply: </strong>{nftDetail.tokenSupply}
                                </Typography>
                                <CardHeader className="text-center" title="Created By" />
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <strong>Created By: </strong>{nftDetail.userAddress}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default SingleNftDetail;