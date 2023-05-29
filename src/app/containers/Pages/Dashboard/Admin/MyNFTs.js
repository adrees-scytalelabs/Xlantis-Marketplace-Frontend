
import { Grid, TablePagination, ThemeProvider, createTheme } from '@mui/material';
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import NFTCard from "../../../../components/Cards/NFTCard";
import MessageCard from "../../../../components/MessageCards/MessageCard";
import WhiteSpinner from "../../../../components/Spinners/WhiteSpinner";
import { myNft } from "../../../../redux/myNftSlice";
const useStyles = {
  root: {
    borderRadius: 12,
    border: 0,
    color: "#04111D",
    padding: "0 30px",
    fontWeight: "bold",
    fontFamily: "poppins",
  },
  label: {
    textTransform: "capitalize",
  },
  body2: {
    fontWeight: "bold",
    fontFamily: "poppins",
  },
}

const makeTheme = createTheme({
  overrides: {
    MuiTablePagination: {
      caption: {
        fontWeight: "bold",
        color: "#fff",
      },
      base: {
        border: 0,
        color: "#fff",
        padding: "0 30px",
        fontWeight: "bold",
        fontFamily: "orbitron",
      },
      label: {
        textTransform: "capitalize",
        color: "#fff",
      },
      input: {
        fontWeight: "bold",
        color: "#fff",
      },
      body2: {
        fontWeight: "bold",
        color: "#fff",
        fontFamily: "orbitron",
      },
      selectIcon: {
        color: "#fff",
      },
    },
  },
});

function MyNFTs(props) {
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [totalNfts, setTotalNfts] = useState(0);
  const [page, setPage] = useState(0);
  const [tokenList, setTokenList] = useState([]);
  const [open, setOpen] = useState(false);
  const [, setVersionB] = useState("");
  const { nftData, nftCount, loading } = useSelector((store) => store.myNft);
  const dispatch = useDispatch();
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };
  let getMyNFTs = (start, end) => {
    let marketplaceId = props.marketplaceId
    dispatch(myNft({ start, end,marketplaceId }));
    handleShowBackdrop();
    let nfts = nftData;
    console.log("data from redx", nftData, nftCount);
    let newState = nfts.map((obj) => {
      return { ...obj, isPlaying: false };
    });
    setTokenList(newState);
    setTotalNfts(nftCount);

    handleCloseBackdrop();
  };

  useEffect(() => {
    getMyNFTs(0, rowsPerPage);
  }, [loading]);

  useEffect(() => {
    setVersionB(Cookies.get("Version"));

    props.setActiveTab({
      dashboard: "",
      newCollection: "",
      myCollections: "",
      newNFT: "",
      myNFTs: "active",
      marketplace: "",
      newDrop: "",
      myDrops: "",
      topUp: "",
    });
  }, []);
  const handleChangePage = (event, newPage) => {
    console.log("newPage", newPage);
    setPage(newPage);
    console.log("Start", newPage * rowsPerPage);
    console.log("End", newPage * rowsPerPage + rowsPerPage);
    getMyNFTs(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    getMyNFTs(0, parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="backgroundDefault position-relative">
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
              <li className="breadcrumb-item active">NFTs</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={`card-body px-0 ${!tokenList.length && "page-height"}`}>
        <div className="form-group">
          {open ? (
            <div className="row no-gutters justify-content-center align-items-center">
              <div className="col-12">
                <WhiteSpinner />
              </div>
            </div>
          ) : tokenList.length === 0 ? (
            <MessageCard msg="No items to display"></MessageCard>
          ) : (
            <Grid container spacing={2} direction="row" justify="flex-start">
              {tokenList.map((i, index) => (
                <Grid item xs={12} sm={4} lg={3} xl={2} key={index}>
                  <NFTCard data={i} />
                </Grid>
              ))}
            </Grid>
          )}
        </div>
      </div>
      <ThemeProvider theme={makeTheme}>
        <div className="row no-gutters justify-content-center paginationBg">
          <TablePagination
            rowsPerPageOptions={[4, 8, 12, 24]}
            component="div"
            count={totalNfts}
            rowsPerPage={rowsPerPage}
            labelRowsPerPage={"Items per page"}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            classes={{
              root: useStyles.root,
              label: useStyles.label,
              body2: useStyles.body2,
            }}
          />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default MyNFTs;
