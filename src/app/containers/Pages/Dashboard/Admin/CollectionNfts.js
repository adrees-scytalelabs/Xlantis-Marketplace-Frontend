import { Grid } from "@material-ui/core/";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import NFTCard from "../../../../components/Cards/NFTCard";
import MessageCard from "../../../../components/MessageCards/MessageCard";

function CollectionNfts(props) {
  const { collectionId } = useParams();
  const [tokenList, setTokenList] = useState([]);
  const [open, setOpen] = useState(false);
  const [versionB, setVersionB] = useState("");
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

    props.setActiveTab({
      dashboard: "",
      newCollection: "active",
      myCollections: "",
      newNFT: "",
      myNFTs: "",
      marketplace: "",
      newDrop: "",
      myDrops: "",
      topUp: "",
    });
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
              <MessageCard msg="No items to display" />
            ) : (
              <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="flex-start"
              >
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
