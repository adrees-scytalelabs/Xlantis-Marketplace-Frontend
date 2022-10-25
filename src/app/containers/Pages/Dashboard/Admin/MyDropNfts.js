
import { Grid } from '@material-ui/core/';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Card from '@material-ui/core/Card';
import Web3 from 'web3';
import { Link, useLocation } from 'react-router-dom';
import { CardContent, CardMedia, CardHeader } from '@material-ui/core/';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import { useRouteMatch } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import CornerRibbon from "react-corner-ribbon";



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

function MyDropNFTs(props) {
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
    let [nftDetail, setNftDetail] = useState({});
    let handleOpenNFTDetailModal = (nftObject) => {
        setNftDetail(nftObject);
        setOpenDialog(true);
    }

    const handleCloseNetworkModal = () => setShowNetworkModal(false);
    const handleShowNetworkModal = () => setShowNetworkModal(true);
    

    
   

    const handleCloseBackdrop = () => {
        setOpen(false);
    };
    const handleShowBackdrop = () => {
        setOpen(true);
    };
    let getNFTs = (start, end) => {
        handleShowBackdrop();
        console.log("nftids", location.state.nftId);
        console.log("dropId", location.state.dropId);
        console.log("saleType", location.state.saleType);

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
                <li className="breadcrumb-item active">Drop Nfts</li>
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
                                        <Link to={{pathname :`${path}/singleNft`, state : {nftDetail : i, saleType : location.state.saleType}}} >
                                            <Card style={{ height: "100%" }} variant="outlined" className={classes.cardHeight}>
                                                {/* <CardActionArea onClick={() => {
                                                        console.log("nftDetailObject: ", i);
                                                        handleOpenNFTDetailModal(i);
                                                        console.log("Open Dialog Value: ", openDialog); 
                                                }}> */}
                                                    <div style={{ position: "relative" }}>

                                                        <CardHeader className="text-center"
                                                            title={i.title.length > 12 ? (<span>{i.title.slice(0,7)}...</span>) : (i.title)}

                                                            />

                                                        {(i.currentMarketplaceId.isSold === true) ? (
                                                        <CornerRibbon
                                                                position="top-right" 
                                                                fontColor="#f0f0f0" 
                                                                backgroundColor="#4caf50"
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

export default MyDropNFTs;

