import { Grid, TablePagination } from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useResolvedPath } from "react-router-dom";
import { getNFTsFromDropPaginated } from "../../../../components/API/AxiosInterceptor";
import MyDropNFTsCard from "../../../../components/Cards/MyDropNFTsCard";
import MessageCard from "../../../../components/MessageCards/MessageCard";
import StripeAccountMessageCard from "../../../../components/MessageCards/StripeAccountMessageCard";
import WhiteSpinner from "../../../../components/Spinners/WhiteSpinner";

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    // backgroundColor: theme.palette.background.paper,
  },
  cardTitle: {
    color: "#fff",
    fontFamily: "orbitron",
    fontWeight: "bold",
    textTransform: "capitalize",
    marginTop: "0rem",
  },
  price: {
    color: "hsla(350, 93%, 61%, 1)",
    fontSize: "1.25rem",
    fontWeight: "bold",
  },

  card: {
    minWidth: 250,
  },
  media: {
    height: 0,
    paddingTop: "100%",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function MyDropNFTs(props) {
  let location = useLocation();

  const path = useResolvedPath("").pathname;
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [totalNfts, setTotalNfts] = useState(0);
  const [page, setPage] = useState(0);
  const [tokenList, setTokenList] = useState([]);
  const [open, setOpen] = useState(false);
  const [audio, setAudio] = useState();

  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };
  let getNFTs = (start, end) => {
    handleShowBackdrop();

    let data = {
      nftIds: location.state.nftId,
    };
    getNFTsFromDropPaginated(location.state.dropId, start, end, data)
      .then((response) => {
        let nfts = response.data.data;
        let newState = nfts.map((obj) => {
          return { ...obj, isPlaying: false };
        });
        setTokenList(newState);
        setTotalNfts(response.data.data.length);

        handleCloseBackdrop();
      })
      .catch((error) => {
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
      });
  };

  useEffect(() => {
    getNFTs(0, rowsPerPage);

    props.setActiveTab({
      dashboard: "",
      newCollection: "",
      myCollections: "",
      newNFT: "",
      myNFTs: "",
      marketplace: "",
      newDrop: "",
      myDrops: "active",
      topUp: "",
    });
  }, []);
  const handleChangePage = (event, newPage) => {
    console.log("newPage", newPage);
    setPage(newPage);
    console.log("Start", newPage * rowsPerPage);
    console.log("End", newPage * rowsPerPage + rowsPerPage);
    getNFTs(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    getNFTs(0, parseInt(event.target.value, 10));
    setPage(0);
  };

  let handlePlay = async (e, token) => {
    e.preventDefault();
    let audioPlay = new Audio(token.nftURI);

    console.log("playing?", token.isPlaying);
    console.log("audio", audio);
    let updateState = tokenList.map((obj) => {
      if (obj._id !== token._id) {
        return { ...obj, isPlaying: false };
      } else if (obj._id === token._id) {
        return { ...obj, isPlaying: true };
      }

      return obj;
    });
    setTokenList(updateState);
    if (audio !== undefined) {
      audio.pause();
    }
    audioPlay.play();
    setAudio(audioPlay);
    console.log("Audio", audio);
  };

  let handlePause = async (e, token) => {
    e.preventDefault();
    let updateState = tokenList.map((obj) => {
      if (obj._id === token._id) {
        return { ...obj, isPlaying: false };
      }

      return obj;
    });
    setTokenList(updateState);

    console.log("Audio", audio);
    audio.pause();
  };

  let handleStop = async (e) => {
    if (audio !== undefined) {
      audio.pause();
    }
  };
  return (
    <div className="backgroundDefault">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Drop Nfts</h3>
            <ul className="breadcrumb">
              <Link to={`/dashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <Link to={`/dashboard/myDrops`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  My Drops
                </li>
              </Link>
              <li className="breadcrumb-item active">Drop Nfts</li>
            </ul>
          </div>
        </div>
      </div>
      {props.isStripeLogin ? null : (
        <StripeAccountMessageCard
          getOnboardingLink={props.getOnboardingLink}
          setIsStripeLogin={props.setIsStripeLogin}
        />
      )}
      <div className="card-body px-0">
        <form>
          <div className="form-group">
            {open ? (
              <div align="center" className="text-center">
                <WhiteSpinner />
                <span style={{ color: "#fbfeff" }} className="sr-only">
                  Loading...
                </span>
              </div>
            ) : tokenList.length === 0 ? (
              <MessageCard msg="No items to display"></MessageCard>
            ) : (
              <Grid container spacing={2} direction="row" justify="flex-start">
                {tokenList.map((i, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Link
                      onClick={(e) => handleStop(e)}
                      to={`${path}/singleNft`}
                      state={{
                        nftDetail: i,
                        saleType: location.state?.saleType,
                        status: location.state?.status,
                        nftId: location.state?.nftId,
                        dropId: location.state?.dropId,
                      }}
                    >
                      <MyDropNFTsCard
                        nftDetails={i}
                        handlePlay={handlePlay}
                        handlePause={handlePause}
                        classes={styles}
                      />
                    </Link>
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
        </form>
      </div>
    </div>
  );
}

export default MyDropNFTs;
