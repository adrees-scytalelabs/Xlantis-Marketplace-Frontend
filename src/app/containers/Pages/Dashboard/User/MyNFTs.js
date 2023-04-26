import { Grid } from "@material-ui/core/";
import TablePagination from "@material-ui/core/TablePagination";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import NFTCard from "../../../../components/Cards/NFTCard";
import MessageCard from "../../../../components/MessageCards/MessageCard";
import WhiteSpinner from "../../../../components/Spinners/WhiteSpinner";
import { myNft } from "../../../../redux/myNftSlice";

function MyNFTs(props) {
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [totalNfts, setTotalNfts] = useState(0);
  const [page, setPage] = useState(0);
  const [tokenList, setTokenList] = useState([]);
  const [open, setOpen] = useState(false);
  const { nftData, nftCount, loading } = useSelector((store) => store.myNft);
  const dispatch = useDispatch();
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };

  let getMyNFTs = (start, end) => {
    handleShowBackdrop();
    dispatch(myNft({ start, end }));
    if (loading === 1) {
      setTokenList(nftData);
      setTotalNfts(nftCount);

      handleCloseBackdrop();
    }
    else if (loading === 2) {
      handleCloseBackdrop();
    }
  };

  useEffect(() => {
    getMyNFTs(0, rowsPerPage);
  }, [loading]);

  useEffect(() => {
    props.setActiveTab({
      dashboard: "",
      newNFT: "",
      orders: "",
      myNFTs: "active",
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
    });
  }, []);
  const handleChangePage = (event, newPage) => {
    console.log("newPage", newPage);
    setPage(newPage);
    getMyNFTs(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    getMyNFTs(0, parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="backgroundDefault">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">My NFTs</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item slash">
                <Link style={{ color: "#777" }} to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="breadcrumb-item active">My NFTs</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={`card-body px-0 ${!tokenList.length && "page-height"}`}>
        <div className="form-group">
          {open ? (
            <WhiteSpinner />
          ) : tokenList.length === 0 ? (
            <MessageCard msg="No items to display"></MessageCard>
          ) : (
            <Grid container spacing={1} direction="row" justify="flex-start">
              {tokenList.map((i, index) => (
                <Grid item xs={12} sm={4} lg={3} xl={2} key={index}>
                  <NFTCard data={i} />
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
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}

export default MyNFTs;
