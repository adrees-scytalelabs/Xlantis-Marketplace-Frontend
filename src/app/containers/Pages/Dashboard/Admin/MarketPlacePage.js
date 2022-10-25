import { CardHeader, Grid } from '@material-ui/core/';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Countdown from 'react-countdown';
import { Link } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '100%', // 16:9
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



function MarketPlacePage(props) {
    const classes = useStyles();
    let { path } = useRouteMatch();
    const [tokenList, setTokenList] = useState([]);

    const [rowsPerPage, setRowsPerPage] = React.useState(8);
    const [totalDrops, setTotalDrops] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [open, setOpen] = useState(false);
    const handleCloseBackdrop = () => {
        setOpen(false);
    };
    const handleShowBackdrop = () => {
        setOpen(true);
    };
    let getMyDrops = (saleType,start, end) => {
        handleShowBackdrop();
        axios.get(`/drop/saleType/${saleType}/${start}/${end}`).then(
            (response) => {
                console.log("response", response);
                setTokenList(response.data.data);
                setTotalDrops(response.data.data.length);
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
        getMyDrops(props.saleType, 0, rowsPerPage);

        // props.setActiveTab({
        //     dashboard: "",
        //     newNFT: "",
        //     orders: "",
        //     myNFTs: "",
        //     myCubes: "",
        //     myDrops: "active",
        //     mySeason: "",
        //     settings: "",
        //     privacyPolicy: "",
        //     termsandconditions: "",
        //     changePassword: "",
        //     newDrop: "",
        //     newCube: "",
        //     newCollection: "",
        //     newRandomDrop: "",
        // });
        // eslint-disable-next-line
    }, []);
    const handleChangePage = (event, newPage) => {
        console.log("newPage", newPage);
        setPage(newPage);
        console.log("Start", newPage * rowsPerPage);
        console.log("End", newPage * rowsPerPage + rowsPerPage);
        getMyDrops(props.saleType, newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        getMyDrops(props.saleType, 0, parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <div className="card">
            
            <div className="card-body">
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
                    ) : (totalDrops === 0) ? (
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
                        // alignItems="flex-start"
                        >
                            {tokenList.map((i, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <Link to={{pathname :`${path}/drops/nfts`, state : {nftId : i.NFTIds, dropId : i._id, endTime: i.endTime}}}>
                                        <Card style={{ height: "100%" }} variant="outlined" className={classes.root}>
                                            <CardActionArea>
                                                <CardHeader className="text-center"
                                                    title={i.title}
                                                />
                                                <CardMedia
                                                    className={classes.media}
                                                    image={i.image}
                                                    title="Drop Image"
                                                >
                                                </CardMedia>
                                                <CardContent>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        <strong>No Of Nfts: </strong>{i.totalNFTs}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        <strong>Description: </strong>{i.description}
                                                    </Typography>

                                                    <br></br>
                                                    {/* {(i.saleType === "auction") ? 
                                                    (<Typography variant="body2" color="textSecondary" component="p">
                                                        <strong>Minimum Bid: </strong>{i.price} WETH
                                                    </Typography>
                                                    ) : (
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                        <strong>Price: </strong>{i.price} WETH
                                                        </Typography>
                                                    )} */}

                                                    {(i.saleType === "auction") ? (
                                                        <Typography variant="h6" gutterBottom color="textSecondary" className="text-center">
                                                        {new Date() < new Date(i.startTime) ? (
                                                            <div style={{ color: "#00FF00" }} >

                                                                <Typography variant="body2" color="textSecondary" component="p">
                                                                    <strong>Auction Starts At:</strong>
                                                                </Typography>
                                                                {console.log("Date(i.AuctionStartsAt)", Date(i.startTime))}
                                                                <Countdown daysInHours date={new Date(i.startTime)}>
                                                                </Countdown>
                                                            </div>
                                                        ) : new Date() > new Date(i.startTime) && new Date() < new Date(i.endTime) ? (
                                                            <div style={{ color: "#FF0000" }}>
                                                                {/* {console.log("Date(i.AuctionStartsAt)", Date(i.AuctionEndsAt.toLoca))} */}
                                                                <Typography variant="body2" color="textSecondary" component="p">
                                                                    <strong>Auction Ends At:</strong>
                                                                </Typography>
                                                                <Countdown daysInHours date={new Date(i.endTime)}>
                                                                </Countdown>
                                                            </div>) : (
                                                            <Typography variant="body2" style={{ color: "#FF0000" }} component="p">
                                                                <strong>Auction Ended</strong>
                                                            </Typography>
                                                        )}
                                                        </Typography>
                                                    ) : (
                                                        <Typography variant="h6" gutterBottom color="textSecondary" className="text-center">
                                                        {new Date() < new Date(i.startTime) ? (
                                                            <div style={{ color: "#00FF00" }} >

                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                <strong>Sale Starts At:</strong>
                                                            </Typography>
                                                            {console.log("Date(i.AuctionStartsAt)", Date(i.startTime))}
                                                            <Countdown daysInHours date={new Date(i.startTime)}>
                                                            </Countdown>
                                                            </div>
                                                        ) : new Date() > new Date(i.startTime) && new Date() < new Date(i.endTime) ? (
                                                            <div style={{ color: "#FF0000" }}>
                                                                {/* {console.log("Date(i.AuctionStartsAt)", Date(i.AuctionEndsAt.toLoca))} */}
                                                                <Typography variant="body2" color="textSecondary" component="p">
                                                                    <strong>Sale Ends At:</strong>
                                                                </Typography>
                                                                <Countdown daysInHours date={new Date(i.endTime)}>
                                                                </Countdown>
                                                            </div>) : (
                                                            <Typography variant="body2" style={{ color: "#FF0000" }} component="p">
                                                                <strong>Sale Ended</strong>
                                                            </Typography>
                                                        )}
                                                        </Typography>
                                                    )}
                                                    
                                                    {/* <Typography variant="h6" gutterBottom color="textSecondary" className="text-center">
                                                        {new Date() < new Date(i.startTime) ? (
                                                            <div style={{ color: "#00FF00" }} >

                                                                <Typography variant="body2" color="textSecondary" component="p">
                                                                    <strong>Auction Starts At:</strong>
                                                                </Typography>
                                                                {console.log("Date(i.AuctionStartsAt)", Date(i.startTime))}
                                                                <Countdown daysInHours date={new Date(i.startTime)}>
                                                                </Countdown>
                                                            </div>
                                                        ) : new Date() > new Date(i.startTime) && new Date() < new Date(i.endTime) ? (
                                                            <div style={{ color: "#FF0000" }}>
                                                                {console.log("Date(i.AuctionStartsAt)", Date(i.AuctionEndsAt.toLoca))}
                                                                <Typography variant="body2" color="textSecondary" component="p">
                                                                    <strong>Auction Ends At:</strong>
                                                                </Typography>
                                                                <Countdown daysInHours date={new Date(i.endTime)}>
                                                                </Countdown>
                                                            </div>) : (
                                                            <Typography variant="body2" style={{ color: "#FF0000" }} component="p">
                                                                <strong>Auction Ended</strong>
                                                            </Typography>
                                                        )}
                                                    </Typography> */}
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions>

                                            </CardActions>
                                        </Card>
                                    </Link>
                                </Grid >
                            ))}
                        </Grid>
                    )}
                </div>
            </div >
            <TablePagination
                rowsPerPageOptions={[4, 8, 12, 24]}
                component="div"
                count={totalDrops}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div >

    );
}

export default MarketPlacePage;