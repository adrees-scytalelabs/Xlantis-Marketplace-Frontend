import { Grid } from "@material-ui/core/";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import NFTCard from "../../../../components/Cards/NFTCard";
import Card from "@material-ui/core/Card";
import WhiteSpinner from "../../../../components/Spinners/WhiteSpinner";
import { Link } from "react-router-dom";

function MyNFTs(props) {
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [totalNfts, setTotalNfts] = useState(0);
  const [page, setPage] = useState(0);
  const [tokenList, setTokenList] = useState([]);
  const [open, setOpen] = useState(false);
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };
  let getMyNFTs = (start, end) => {
    handleShowBackdrop();
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem(
      "Authorization"
    )}`;
    axios.get(`/nft/myNFTs/${start}/${end}`).then(
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
    getMyNFTs(0, rowsPerPage);
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

  console.log("token list: ", tokenList);

  return (
    <div className="backgroundDefault">
      
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">My NFTs</h3>
            <ul className="breadcrumb">
            <li className="breadcrumb-item slash" >
                <Link style={{ color: "#777" }} to="/dashboard">Dashboard</Link>
              </li>
              <li className="breadcrumb-item active">My NFTs</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className={`card-body px-0 ${!tokenList.length && "page-height"}`}>
        {/* <form> */}
        <div className="form-group">
          {open ? (
            <WhiteSpinner />
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
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        {/* </form> */}
      </div>
    </div>
  );
}

export default MyNFTs;
