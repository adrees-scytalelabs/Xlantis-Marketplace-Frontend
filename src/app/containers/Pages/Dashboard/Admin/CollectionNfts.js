import { Grid } from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getNFTsFromSingleCollection } from "../../../../components/API/AxiosInterceptor";
import NFTCard from "../../../../components/Cards/NFTCard";
import MessageCard from "../../../../components/MessageCards/MessageCard";
import CollectionSaleModal from "../../../../components/Modals/CollectionSaleModal";
function CollectionNfts(props) {
  const { collectionId } = useParams();
  const [tokenList, setTokenList] = useState([]);
  const [open, setOpen] = useState(false);
  const [versionB, setVersionB] = useState("");
  const [collectionDetail, setCollectionDetail] = useState({});
  const [showCollectioSaleModal, setShowCollectionSaleModal] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [startTimeStamp, setStartTimeStamp] = useState(
    Math.round(startTime.getTime() / 1000)
  );
  const [endTimeStamp, setEndTimeStamp] = useState(
    Math.round(endTime.getTime() / 1000)
  );
  const [currentTimeStamp, setCurrentTimeStamp] = useState(0);

  const handleCollectionSaleModalOpen = () => {
    setShowCollectionSaleModal(true);
  };
  const handleCollectionSaleModalClose = () => {
    setShowCollectionSaleModal(false);
  };

  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };
  let getCollectionNfts = () => {
    handleShowBackdrop();
    getNFTsFromSingleCollection(collectionId)
      .then((response) => {
        console.log("Token list: ", response.data.collectionData);
        setTokenList(response.data.nftsdata);
        setCollectionDetail(response.data.collectionData);
        handleCloseBackdrop();
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
        handleCloseBackdrop();
      });
  };

  useEffect(() => {
    setVersionB(Cookies.get("Version"));

    getCollectionNfts();

    props.setActiveTab({
      dashboard: "",
      newCollection: "",
      myCollections: "active",
      newNFT: "",
      myNFTs: "",
      marketplace: "",
      newDrop: "",
      myDrops: "",
      topUp: "",
    });
  }, []);

  return (
    <div
      className="card"
      style={{ backgroundColor: "rgba(32,32,32,255)", border: "None" }}
    >
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
        <div>
          <Button
            onClick={handleCollectionSaleModalOpen}
            style={{
              float: "right",
              padding: "12px 10px",
              borderRadius: "5px",
              backgroundColor: "transparent",
            }}
          >
            List for Sale
          </Button>
        </div>
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
      <CollectionSaleModal
        show={showCollectioSaleModal}
        handleClose={handleCollectionSaleModalClose}
        collectionDetail={collectionDetail}
        startTime={startTime}
        endTime={endTime}
        setCurrentTimeStamp={setCurrentTimeStamp}
        setStartTimeStamp={setStartTimeStamp}
        setStartTime={setStartTime}
        setEndTime={setEndTime}
        setEndTimeStamp={setEndTimeStamp}
      />
    </div>
  );
}

export default CollectionNfts;
