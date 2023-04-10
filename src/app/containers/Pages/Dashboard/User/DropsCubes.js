import { Grid } from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Countdown from 'react-countdown';
import { Link, useParams } from 'react-router-dom';
import DropsCubeCard from '../../../../components/Cards/DropsCubeCard';





function DropCubes(props) {
    const { dropId } = useParams();
    const [tokenList, setTokenList] = useState([]);
    const [imageData, setImageData] = useState([]);
    const [cubeData, setCubeData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleCloseBackdrop = () => {
        setOpen(false);
    };
    const handleShowBackdrop = () => {
        setOpen(true);
    };
    let getDropCubes = () => {
        handleShowBackdrop();
        let DropId = {
            dropId: dropId,
        }
        axios.post("/drop/drops", DropId).then(
            (response) => {
                console.log("response", response);
                setTokenList(response.data.Dropdata);
                setCubeData(response.data.Tokensdata);
                setImageData(response.data.Nftdata);
                handleCloseBackdrop();
            },
            (error) => {
                if (process.env.NODE_ENV === "development") {
                    console.log(error);
                    console.log(error.response);
                }
                handleCloseBackdrop();
            })
    }

    useEffect(() => {
        getDropCubes();
        

        props.setActiveTab({
            dashboard: "",
            newNFT: "",
            orders: "",
            myNFTs: "",
            mySeason: "",
            myCubes: "",
            myDrops: "active",
            settings: "",
            privacyPolicy: "",
            termsandconditions: "",
            changePassword: "",
            newDrop: "",
            newCube: "",
            newCollection: "",
            newRandomDrop: "",
        });
    }, []);

    return (
        <div className="card">
            <ul className="breadcrumb" style={{ backgroundColor: "rgb(167,0,0)" }}>
                <li className="breadcrumb-item">
                    <a href="/">Dashboard</a>
                </li>
                <li className="breadcrumb-item">
                    <Link to="/dashboard/myDrops">My Drops</Link>
                </li>
                <li className="breadcrumb-item active">Cubes</li>
            </ul>
            <div className="card-body">
                <div className="form-group">
                    <Typography variant="body2" color="textSecondary" component="p">
                        <strong>Drop Name: </strong>{tokenList.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <strong>Drop Description: </strong>{tokenList.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <strong>Minimum Bid: </strong>{tokenList.MinimumBid / 10 ** 18} WETH
                    </Typography>
                    {new Date() < new Date(tokenList.AuctionStartsAt) ? (
                        <Typography variant="h5" gutterBottom color="textSecondary">
                            <strong>Auction Starts At:</strong>
                            <span style={{ color: "#00FF00" }} >
                                <Countdown daysInHours date={new Date(tokenList.AuctionStartsAt)}>
                                </Countdown>
                            </span>
                        </Typography>

                    ) : new Date() > new Date(tokenList.AuctionStartsAt) && new Date() < new Date(tokenList.AuctionEndsAt) ? (
                        <Typography variant="h5" gutterBottom color="textSecondary" component="p">
                            <strong>Auction Ends At: </strong>
                            <span style={{ color: "#FF0000" }}>
                                <Countdown daysInHours date={new Date(tokenList.AuctionEndsAt)}>
                                </Countdown>
                            </span>
                        </Typography>

                    ) : (
                        <Typography variant="h5" gutterBottom style={{ color: "#FF0000" }} component="p">
                            <strong>Auction Ended</strong>
                        </Typography>
                    )}
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
                    ) : (
                        <Grid
                            container
                            spacing={2}
                            direction="row"
                            justify="flex-start"
                        
                        >
                            {cubeData.map((i, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <Link to={"/dashboard/myCubes/Nfts/" + dropId + "/" + i._id}>
                                        <DropsCubeCard imageData={imageData} i={i} index={index} />
                                    </Link>
                                </Grid >
                            ))}
                        </Grid>
                    )}
                </div>
            </div >
        </div >

    );
}

export default DropCubes;
