import { Grid, TablePagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useResolvedPath } from "react-router-dom";
import DropsPageCard from "../../../../components/Cards/DropsPageCard";
import MessageCard from "../../../../components/MessageCards/MessageCard";
import WhiteSpinner from "../../../../components/Spinners/WhiteSpinner";
import { getSaleType } from "../../../../redux/getMarketPlaceSaleTypeSlice";

const cardStyles = {
  cardTheme: {
    boxShadow: "none",
  },
  cardTitle: {
    color: "#fff",
    fontFamily: "orbitron",
    fontWeight: "bold",
    textTransform: "capitalize",
    fontSize: "1rem",
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

const styles = {
  root: {
    borderRadius: 0,
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

function MarketPlacePage(props) {
  const path = useResolvedPath("").pathname;
  const [tokenList, setTokenList] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [totalDrops, setTotalDrops] = useState(0);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const { saleTypeData, loading } = useSelector(
    (store) => store.marketPlaceSaleType
  );
  const dispatch = useDispatch();
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };

  let getMyDrops = (saleType, start, end) => {
    handleShowBackdrop();
    let marketplaceId = props.marketplaceId;
    dispatch(
      getSaleType({ saleType, start, end, setTokenList, setTotalDrops,marketplaceId })
    );
    if (loading === 1) {
      // setTokenList(saleTypeData);
      // setTotalDrops(saleTypeData.length);
      handleCloseBackdrop();
    } else if (loading === 2) {
      handleCloseBackdrop();
    }
  };

  useEffect(() => {
    console.log("Sdad",props.marketplaceId)
    getMyDrops(props.saleType, 0, rowsPerPage);
  }, [loading]);

  const handleChangePage = (event, newPage) => {
    console.log("newPage", newPage);
    setPage(newPage);
    console.log("Start", newPage * rowsPerPage);
    console.log("End", newPage * rowsPerPage + rowsPerPage);
    getMyDrops(
      props.saleType,
      newPage * rowsPerPage,
      newPage * rowsPerPage + rowsPerPage
    );
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    getMyDrops(props.saleType, 0, parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div className="backgroundDefault">
      <div className="card-body" style={{ minHeight: "60vh" }}>
        <div className="form-group">
          {open ? (
            <WhiteSpinner />
          ) : totalDrops === 0 ? (
            <MessageCard msg="No items to display"></MessageCard>
          ) : (
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="flex-start"
            >
              {tokenList.map((i, index) => (
                <>
                  {i.status === "draft" ? null : (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={4}
                      xl={3}
                      direction="row"
                      key={index}
                    >
                      <Link
                        to={`${path}/drops/nfts`}
                        state={{
                          nftId: i.NFTIds,
                          dropId: i._id,
                          startTime: i.startTime,
                          endTime: i.endTime,
                          saleType: i.saleType,
                          bannerURL: i.bannerURL,
                          titleURL: i.image,
                        }}
                      >
                        <DropsPageCard
                          dropDetails={i}
                          classes={styles}
                          cardClasses={cardStyles}
                        />
                      </Link>
                    </Grid>
                  )}
                </>
              ))}
            </Grid>
          )}
        </div>
      </div>
      <div className="row no-gutters justify-content-center paginationBg mt-5">
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
    </div>
  );
}

export default MarketPlacePage;
