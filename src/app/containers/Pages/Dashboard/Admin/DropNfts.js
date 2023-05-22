import {
  Grid,
  TablePagination,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useResolvedPath } from "react-router-dom";
import { getNFTsFromDropPaginated } from "../../../../components/API/AxiosInterceptor";
import DropNFTCard from "../../../../components/Cards/DropNFTCard";
import MessageCardDropNfts from "../../../../components/MessageCards/MessageCardDropNfts";
import WhiteSpinner from "../../../../components/Spinners/WhiteSpinner";
import DropBanner from "../../../../components/banners/DropBanner";
const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#000 !important",
    border: "1px solid #fff",
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

const cardStyles = {
  cardTheme: {
    boxShadow: "none",
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
  textAlert: {
    justifyContent: "center",
    fontSize: "1rem",
  },
  exploreBtn: {
    padding: "0.75rem 2rem",
    border: "none",
    fontWeight: "bold",
  },
};

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
  },
  typography: {
    fontFamily: "orbitron",
    color: "#fff",
  },
  components: {
    MuiTablePagination: {
      styleOverrides: {
        caption: {
          fontWeight: "bold",
          color: "#fff",
        },
        input: {
          fontWeight: "bold",
          color: "#fff",
        },
        selectIcon: {
          color: "#fff",
        },
        actions: {
          color: "#fff",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
        "&$disabled": {
          color: "#fff",
        },
      },
    },
    Mui: {
      styleOverrides: {
        "&$disabled": {
          color: "#fff",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(32,32,32,255)",
          color: "#fff",
          border: "1px solid #fff",
        },
      },
    },
  },
});

function MyNFTs(props) {
  let location = useLocation();

  const path = useResolvedPath("").pathname;
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [totalNfts, setTotalNfts] = useState(0);
  const [page, setPage] = useState(0);
  const [tokenList, setTokenList] = useState([]);
  const [open, setOpen] = useState(false);
  const [nftIds, setNftIds] = useState([]);
  const [audio, setAudio] = useState();
  const [versionB, setVersionB] = useState("");
  const [dropTitleImage, setDropTitleImage] = useState(
    "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149612179.jpg?w=740&t=st=1670524324~exp=1670524924~hmac=868b189caf4ef548da17b5063405f5159f880265c7d6b7cc4abf919861ae391a"
  );
  const [dropBannerImage, setDropBannerImage] = useState(
    "https://images.unsplash.com/photo-1590845947670-c009801ffa74?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1459&q=80"
  );

  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };
  let handlePlay = async (e, token) => {
    e.preventDefault();
    let audioPlay = new Audio(token.nftURI);
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
  let nftIdLen = location.state.nftId.length;

  let getNFTs = (start, end) => {
    handleShowBackdrop();

    let data = {
      nftIds: location.state.nftId,
    };
    const version = Cookies.get("Version");

    if (nftIdLen != 0) {
      getNFTsFromDropPaginated(location.state.dropId, start, end, data).then(
        (response) => {
          console.log("Response from getting NFTs: ", response);
          let nfts = response.data.data;
          let newState = nfts.map((obj) => {
            return { ...obj, isPlaying: false };
          });
          setTokenList(newState);
          setTotalNfts(response.data.data.length);

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
    } else {
      handleCloseBackdrop();
    }
  };

  useEffect(() => {
    setVersionB(Cookies.get("Version"));
    setNftIds(location.state.nftId);
    setDropBannerImage(location.state.bannerURL);
    setDropTitleImage(location.state.titleURL);
    getNFTs(0, rowsPerPage);
    setWindowSize(window.innerWidth);

    props.setActiveTab({
      dashboard: "",
      newCollection: "",
      myCollections: "",
      newNFT: "",
      myNFTs: "",
      marketplace: "active",
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
    getNFTs(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    getNFTs(0, parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="backgroundDefault">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Market Place Drops</h3>
            <ul className="breadcrumb">
              <Link to={`/dashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <Link to={`/dashboard/marketPlace`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Market Place
                </li>
              </Link>
              <li className="breadcrumb-item active">Market Place Drops</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card-body page-height px-0">
        <DropBanner bannerURL={dropBannerImage} titleURL={dropTitleImage} />

        <div className="container-fluid mt-5">
          <div className="row no-gutters justify-content-start align-items-end my-4 pt-5">
            <div className="col-12">
              <h1 className="marketCatHeadings">NFTs inside Sample Drop </h1>
            </div>
            <div className="col-12">
              <h3 style={{ fontFamily: "inter" }}>Fixed Price Drop</h3>
            </div>
          </div>
          <ThemeProvider theme={customTheme}>
            <div className="row no-gutters justify-content-center">
              {open ? (
                <WhiteSpinner />
              ) : tokenList.length === 0 ? (
                <MessageCardDropNfts msg="No items to display" />
              ) : (
                <Grid
                  container
                  spacing={3}
                  direction="row"
                  justifyContent="flex-start"
                  style={{ marginBottom: "24px" }}
                >
                  {tokenList.map((i, index) => (
                    <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                      {location.state?.saleType === "fixed-price" ? (
                        <Link
                          onClick={(e) => handleStop(e)}
                          to={`${path}/buy`}
                          state={{
                            nftDetail: i,
                            startTime: location.state?.startTime,
                            endTime: location.state?.endTime,
                            nftId: location.state?.nftId,
                            dropId: location.state?.dropId,
                          }}
                        >
                          <DropNFTCard
                            details={i}
                            classes={styles}
                            handlePlay={handlePlay}
                            handlePause={handlePause}
                            cardClasses={cardStyles}
                          />
                        </Link>
                      ) : (
                        <Link
                          onClick={(e) => handleStop(e)}
                          to={`/dashboard/marketPlace/${i.dropId}/${i._id}`}
                          state={{
                            nftContractAddress:
                              i.collectionId.nftContractAddress,
                            endTime: location.state.endTime,
                            contractType: i.collectionId.contractType,
                            price: i.currentOrderListingId.price,
                          }}
                        >
                          <DropNFTCard
                            deetails={i}
                            classes={styles}
                            handlePlay={handlePlay}
                            handlePause={handlePause}
                            cardClasses={cardStyles}
                          />
                        </Link>
                      )}
                    </Grid>
                  ))}
                </Grid>
              )}
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
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}

export default MyNFTs;
