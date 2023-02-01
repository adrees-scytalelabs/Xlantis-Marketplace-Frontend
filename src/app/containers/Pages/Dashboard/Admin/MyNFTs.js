import { Grid } from "@material-ui/core/";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import NFTCard from "../../../../components/Cards/NFTCard";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
// Images
import { nftImage } from "../../../../assets/js/images";
// COMPONENTS
import WhiteSpinner from "../../../../components/Spinners/WhiteSpinner";

// CUSTOM STYLES
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

const makeTheme = createMuiTheme({
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

console.log("nft images: ", nftImage);

function MyNFTs(props) {
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [totalNfts, setTotalNfts] = useState(0);
  const [page, setPage] = useState(0);
  const [tokenList, setTokenList] = useState([]);
  const [open, setOpen] = useState(false);
  let [versionB, setVersionB] = useState("");
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
    console.log("version", version);
    axios.get(`/${version}/nft/myNFTs/${start}/${end}`).then(
      (response) => {
        console.log("response", response);
        let nfts = response.data.NFTdata;
        let newState = nfts.map((obj) => {
          return { ...obj, isPlaying: false };
        });
        console.log("NFTS", nfts);
        console.log("Updated", newState);
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
    // getCollections();?

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
    }); // eslint-disable-next-line
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

  console.log("the tokenList length: ", tokenList.length);
  console.log(tokenList.length !== 0 && "page-height");

  return (
    <div className="backgroundDefault position-relative">
      {/* Page Header */}
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">My NFTs</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                Dashboard
              </li>
              <li className="breadcrumb-item active">My NFTs</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Page Content */}
      <div className={`card-body px-0 ${!tokenList.length && "page-height"}`}>
        {/* <form> */}
        <div className="form-group">
          {open ? (
            <div className="row no-gutters justify-content-center align-items-center">
              <div className="col-12">
                <WhiteSpinner />
              </div>
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
                // color="textSecondary"
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
                  <NFTCard data={i} image={nftImage[index]} />
                </Grid>
              ))}
            </Grid>
          )}
        </div>

        {/* </form> */}
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
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            classes={{
              root: classes.root,
              label: classes.label,
              body2: classes.body2,
            }}
          />
        </div>
      </ThemeProvider>
      {/* <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop> */}
    </div>
  );
}

export default MyNFTs;
