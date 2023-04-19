import { Grid } from "@material-ui/core/";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import {
  getDropsInAuctionPaginated,
  getDropsInFixedPriceSalePaginated,
} from "../../../components/API/AxiosInterceptor";
import Footer from "../../../components/Footers/Footer";
import HeaderHome from "../../../components/Headers/Header";
import MarketPlaceTabs from "../../../components/Tabs/MarketPlaceTabs";

function MarketPlace(props) {
  const [fixedPriceDrop, setFixedPriceDrop] = useState([]);
  const [bidableDrop, setBidableDrop] = useState([]);
  const [open, setOpen] = useState(false);

  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };

  let getCubes = (start, end) => {
    handleShowBackdrop();
    let version = Cookies.get("Version");
    let endpoint;
    if (version === undefined) {
      endpoint = `/drop/saleType/fixed-price/${start}/${end}`;
    } else {
      endpoint = `/drop/saleType/fixed-price/${start}/${end}`;
    }
    getDropsInFixedPriceSalePaginated(start, end)
      .then((response) => {
        console.log("responseeeee", response);
        setFixedPriceDrop(response.data.data);
        handleCloseBackdrop();
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
        handleCloseBackdrop();
      });
  };

  let getBidableDrops = (start, end) => {
    handleShowBackdrop();
    let version = Cookies.get("Version");
    getDropsInAuctionPaginated(start, end)
      .then((response) => {
        console.log("Bidable drops response: ", response);
        setBidableDrop(response.data.data);
        handleCloseBackdrop();
      })
      .catch((error) => {
        console.log("could not get bidable drops ", error.response);
        handleCloseBackdrop();
      });
  };

  useEffect(() => {
    getCubes(0, 12);
    getBidableDrops(0, 12);
  }, []);
  return (
    <div className="main-wrapper">
      <div className="home-section home-full-height">
        <div style={{ minHeight: "95px" }}>
          <HeaderHome selectedNav={"Market"} role={null} />
        </div>
        <div className="row no-gutters mt-5">
          <div className="container-fluid">
            <div className="row no-gutters w-100">
              <div className="w-100">
                <div
                  className="row no-gutters justify-content-center w-100"
                  style={{ minHeight: "75vh" }}
                >
                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="flex-start"
                    item
                  >
                    <MarketPlaceTabs
                      fixedPriceDrop={fixedPriceDrop}
                      fixedPriceDropLength={fixedPriceDrop.length}
                      bidableDrop={bidableDrop}
                      bidableDropLength={bidableDrop.length}
                      open={open}
                    />
                  </Grid>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer position={"relative"} />
    </div>
  );
}

export default MarketPlace;
