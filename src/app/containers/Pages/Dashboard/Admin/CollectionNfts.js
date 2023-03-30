import { Grid } from "@material-ui/core/";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import NFTCard from "../../../../components/Cards/NFTCard";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

function CollectionNfts(props) {
  const { collectionId } = useParams();
  const [tokenList, setTokenList] = useState([]);
  const [open, setOpen] = useState(false);
  let [versionB, setVersionB] = useState("");
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };
  let getCollectionNfts = () => {
    handleShowBackdrop();
    axios.get(`/collection/${collectionId}`).then(
      (response) => {
        console.log("response", response);
        setTokenList(response.data.nftsdata);
        handleCloseBackdrop();
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
        handleCloseBackdrop();
      }
    );
  };

  useEffect(() => {
    setVersionB(Cookies.get("Version"));

    getCollectionNfts();
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
      newCollection: "active",
      newRandomDrop: "",
    }); // eslint-disable-next-line
  }, []);

  return (
    <div className="card" style={{ backgroundColor: "#000", border: "None" }}>
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">My NFTs</h3>
            <ul className="breadcrumb">
              <Link to={`/dashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <Link to={`/dashboard/myCollection`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Collections
                </li>
              </Link>
              <li className="breadcrumb-item active">NFTs</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="card-body">
        <form>
          <div className="form-group">
            {open ? (
              <div align="center" className="text-center">
                <Spinner
                  animation="border"
                  role="status"
                  style={{ color: "#ff0000" }}
                ></Spinner>
                <span style={{ color: "#ff0000" }} className="sr-only">
                  Loading...
                </span>
              </div>
            ) : tokenList.length === 0 ? (
              <Card
                variant="outlined"
                style={{
                  padding: "40px",
                  marginTop: "20px",
                  marginBottom: "20px",
                  backgroundColor: "#000",
                }}
              >
                <Typography
                  variant="body2"
                  className="text-center"
                  component="p"
                  style={{ color: "#fff" }}
                >
                  <strong>No items to display </strong>
                </Typography>
              </Card>
            ) : (
              <Grid container spacing={2} direction="row" justify="flex-start">
                {tokenList.map((i, index) => (
                  <Grid item xs={12} sm={4} lg={3} xl={2} key={index}>
                    <NFTCard data={i[0]} />
                  </Grid>
                ))}
              </Grid>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CollectionNfts;
