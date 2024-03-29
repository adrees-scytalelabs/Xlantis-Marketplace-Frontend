import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCollections } from '../../../../components/API/AxiosInterceptor';
import NFTCard from '../../../../components/Cards/NFTCard';
import WhiteSpinner from "../../../../components/Spinners/WhiteSpinner";
function CollectionNfts(props) {
    const { collectionId } = useParams();
    const [tokenList, setTokenList] = useState([]);
    const [open, setOpen] = useState(false);
    const handleCloseBackdrop = () => {
        setOpen(false);
    };
    const handleShowBackdrop = () => {
        setOpen(true);
    };
    let getCollectionNfts = () => {
        handleShowBackdrop();

        getCollections(collectionId)
            .then((response) => {
                console.log("response", response);
                setTokenList(response.data.Nftsdata);
                handleCloseBackdrop();
            })
            .catch((error) => {
                if (process.env.NODE_ENV === "development") {
                    console.log(error);
                    console.log(error.response);
                }
                handleCloseBackdrop();
            })
    }

    useEffect(() => {
        getCollectionNfts();
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
            newCollection: "active",
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
                    <Link to="/dashboard/newCollection">Collections</Link>
                </li>
                <li className="breadcrumb-item active">My NFTs</li>
            </ul>
            <div className="card-body">
                <form >
                    <div className="form-group">

                        {open ? (
                            <div align="center" className="text-center">
                                <WhiteSpinner />
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
                                    <NFTCard data={i[0]} key={index} />
                                ))}
                            </Grid>
                        )}
                    </div>
                </form>
            </div >
        </div >

    );
}

export default CollectionNfts;
