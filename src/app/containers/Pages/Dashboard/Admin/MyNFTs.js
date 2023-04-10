import { ThemeProvider, createTheme } from "@material-ui/core";
import { Grid } from "@material-ui/core/";
import Card from "@material-ui/core/Card";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { nftImage } from "../../../../assets/js/images";
import NFTCard from "../../../../components/Cards/NFTCard";
import WhiteSpinner from "../../../../components/Spinners/WhiteSpinner";
import MessageCard from "../../../../components/MessageCards/MessageCard";

const useStyles = makeStyles({
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
});

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
  const [versionB, setVersionB] = useState("");
  const classes = useStyles();
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };
  let getMyNFTs = (start, end) => {
    handleShowBackdrop();
    const version = Cookies.get("Version");
    axios.get(`/nft/myNFTs/${start}/${end}`).then(
      (response) => {
        let nfts = response.data.NFTdata;
        let newState = nfts.map((obj) => {
          return { ...obj, isPlaying: false };
        });
        setTokenList(newState);
        setTotalNfts(response.data.Nftcount);

        handleCloseBackdrop();
      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
        if (error.response.data !== undefined) {
          if (
            error.response.data === "Unauthorized access (invalid token) !!"
          ) {
            sessionStorage.removeItem("Authorization");
            sessionStorage.removeItem("Address");
            Cookies.remove("Version");

            window.location.reload(false);
          }
        }
        handleCloseBackdrop();
      }
    );
  };

  useEffect(() => {
    setVersionB(Cookies.get("Version"));

    getMyNFTs(0, rowsPerPage);

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
              root: classes.root,
              label: classes.label,
              body2: classes.body2,
            }}
          />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default MyNFTs;
