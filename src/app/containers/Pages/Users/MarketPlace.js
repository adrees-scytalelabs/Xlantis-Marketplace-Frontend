import { Grid } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Footer from "../../../components/Footers/Footer";
import HeaderHome from "../../../components/Headers/Header";
import MarketPlaceTabs from "../../../components/Tabs/MarketPlaceTabs";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 300,
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

function MarketPlace(props) {
  const classes = useStyles();
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
      endpoint = `/drop/saleType/fixed-price/${start}/${end}`
    }
    else
    {
      endpoint = `/drop/saleType/fixed-price/${start}/${end}`
    }
    axios
      .get(endpoint)
      .then(
        (response) => {
          console.log("responseeeee", response);
          setFixedPriceDrop(response.data.data);
          handleCloseBackdrop();
        },
        (error) => {
          if (process.env.NODE_ENV === "development") {
            console.log(error);
            console.log(error.response);
          }
          handleCloseBackdrop();
        }
      );
  };

  let getBidableDrops = (start, end) => {
    handleShowBackdrop();
    let version = Cookies.get("Version");
    let endpoint;
    if (version === undefined) {
      endpoint = `/drop/saleType/auction/${start}/${end}`
    }
    else
    {
      endpoint = `/drop/saleType/auction/${start}/${end}`
    }
    axios.get(endpoint).then(
      (res) => {
        console.log("Bidable drops response: ", res);
        setBidableDrop(res.data.data);
        handleCloseBackdrop();
      },
      (err) => {
        console.log("could not get bidable drops ", err.response);
        handleCloseBackdrop();
      }
    );
  };

  useEffect(() => {
    getCubes(0, 12); 
    getBidableDrops(0, 12);
  }, []);
  return (
    <div className="main-wrapper">
      <div className="home-section home-full-height">
        <div style={{ minHeight: "95px" }}>
          <HeaderHome selectedNav={"Market"} role={null}/>
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
