import {  Grid } from '@material-ui/core/';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link, useParams } from 'react-router-dom';
import SeasonDropsCard from '../../../../components/Cards/SeasonDropsCard';



function SeasonDrops(props) {
    const { seasonId } = useParams();
    const [tokenList, setTokenList] = useState([]);

    const [open, setOpen] = React.useState(false);
    const handleCloseBackdrop = () => {
        setOpen(false);
    };
    const handleShowBackdrop = () => {
        setOpen(true);
    };
    let getSeasonDrops = () => {
        handleShowBackdrop();
        let SeasonId = {
            seasonId: seasonId
        }
        
        axios.post("/season/seasons", SeasonId).then(
            (response) => {
                console.log("response", response);
                setTokenList(response.data.Dropdata);
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
        getSeasonDrops();
        

        props.setActiveTab({
            dashboard: "",
            newNFT: "",
            orders: "",
            myNFTs: "",
            myCubes: "",
            myDrops: "",
            mySeason: "active",
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
                    <Link to="/dashboard/mySeason">My Season</Link>
                </li>
                <li className="breadcrumb-item active">Drops</li>
            </ul>
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
                    ) : (
                        <Grid
                            container
                            spacing={2}
                            direction="row"
                            justify="flex-start"
                        >
                            {tokenList.map((i, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <Link to={"/dashboard/myDrops/cubes/" + i[0]._id}>
                                        <SeasonDropsCard i={i}  />
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

export default SeasonDrops;
