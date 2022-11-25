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
// Images
import { nftImage } from "../../../../assets/js/images";

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

console.log("nft images: ", nftImage);

function MyNFTs(props) {
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [totalNfts, setTotalNfts] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [tokenList, setTokenList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };
  let getMyNFTs = (start, end) => {
    handleShowBackdrop();
    axios.get(`/nft/createnft/${start}/${end}`).then(
      (response) => {
        console.log("response", response);
        setTokenList(response.data.NFTdata);
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
            Cookies.remove("Authorization");
            localStorage.removeItem("Address");
            window.location.reload();
          }
        }
        handleCloseBackdrop();
      }
    );
  };

  useEffect(() => {
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

  return (
    <div
      className="backgroundDefault position-relative"
      style={{ minHeight: "100vh" }}
    >
      {/* Page Header */}
      <div className="page-header">
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
      <div className="card-body px-0">
        {/* <form> */}
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
              }}
            >
              <Typography
                variant="body2"
                className="text-center"
                color="textSecondary"
                component="p"
              >
                <strong>No items to display </strong>
              </Typography>
            </Card>
          ) : (
            <Grid
              container
              spacing={2}
              direction="row"
              justify="flex-start"
              item
            >
              {tokenList.map((i, index) => {
                return <NFTCard data={i} key={index} image={nftImage[index]} />;
              })}
            </Grid>
          )}
        </div>

        {/* </form> */}
      </div>
      <div className="border row no-gutters justify-content-center paginationBg">
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
      {/* <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop> */}
    </div>
  );
}

export default MyNFTs;
