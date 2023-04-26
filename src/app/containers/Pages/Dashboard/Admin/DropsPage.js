import { Grid } from "@material-ui/core/";
import TablePagination from "@material-ui/core/TablePagination";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import DropsPageCard from "../../../../components/Cards/DropsPageCard";
import MessageCard from "../../../../components/MessageCards/MessageCard";
import WhiteSpinner from "../../../../components/Spinners/WhiteSpinner";
import { getMyDrop } from "../../../../redux/getMyDropsSlice";

const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    height: 0,
    paddingTop: "100%",
  },
  badge: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const cardStyles = makeStyles((theme) => ({
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
  cardDescriptions: {
    color: "#999",
    fontFamily: "inter",
    fontSize: "1rem",
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
}));

function DropsPage(props) {
  const classes = useStyles();
  const cardClasses = cardStyles();
  const [tokenList, setTokenList] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [totalDrops, setTotalDrops] = useState(0);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const { myDropsData, loading } = useSelector((store) => store.getMyDrops);
  const dispatch = useDispatch();

  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };
  let getMyDrops = (status, start, end) => {
    handleShowBackdrop();
    dispatch(getMyDrop({ status, start, end }));
    if (loading === 1) {
      setTokenList(myDropsData);
      setTotalDrops(myDropsData.length);
      handleCloseBackdrop();
    }
    if (loading === 2) {
      handleCloseBackdrop();
    }
  };

  useEffect(() => {
    getMyDrops(props.status, 0, rowsPerPage);
  }, [loading]);
  const handleChangePage = (event, newPage) => {
    console.log("newPage", newPage);
    setPage(newPage);
    console.log("Start", newPage * rowsPerPage);
    console.log("End", newPage * rowsPerPage + rowsPerPage);
    getMyDrops(
      props.status,
      newPage * rowsPerPage,
      newPage * rowsPerPage + rowsPerPage
    );
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    getMyDrops(props.status, 0, parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div className="backgroundDefault">
      <div className="card-body" style={{}}>
        <div className="form-group">
          {open ? (
            <WhiteSpinner />
          ) : totalDrops === 0 ? (
            <MessageCard msg="No items to display" />
          ) : (
            <Grid
              container
              spacing={3}
              direction="row"
              justifyContent="flex-start"
            >
              {tokenList.map((i, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  spacing={1}
                  direction="row"
                  key={index}
                >
                  {props.status === "draft" ? (
                    <Link
                      to={{
                        pathname: `/dashboard/newDrop/addNft`,
                        state: {
                          dropId: i._id,
                          saleType: i.saleType,
                          startTime: i.startTime,
                          endTime: i.endTime,
                          nftType: i.dropType,
                        },
                      }}
                    >
                      <DropsPageCard
                        dropDetails={i}
                        classes={classes}
                        cardClasses={cardClasses}
                      />
                    </Link>
                  ) : (
                    <Link
                      to={{
                        pathname: `/dashboard/myDrops/nfts`,
                        state: {
                          nftId: i.NFTIds,
                          dropId: i._id,
                          saleType: i.saleType,
                          status: i.status,
                        },
                      }}
                    >
                      <DropsPageCard
                        dropDetails={i}
                        classes={classes}
                        cardClasses={cardClasses}
                      />
                    </Link>
                  )}
                </Grid>
              ))}
            </Grid>
          )}
        </div>
      </div>
      <TablePagination
        rowsPerPageOptions={[4, 8, 12, 24]}
        component="div"
        count={totalDrops}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default DropsPage;
