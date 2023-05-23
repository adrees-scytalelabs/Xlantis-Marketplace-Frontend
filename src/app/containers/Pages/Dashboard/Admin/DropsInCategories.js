import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDropsByCategories } from "../../../../components/API/AxiosInterceptor";
import CategoryDropsCards from "../../../../components/Cards/CategoryDropsCards";
import { Spinner } from "react-bootstrap";
import MessageCard from "../../../../components/MessageCards/MessageCard";
import { Grid } from "@mui/material";

const styles = {
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "100%",
  },
};

const DropsInCategories = (props) => {
  const [drops, setDrops] = useState([]);
  const [open, setOpen] = useState(false);
  const { category } = useParams();

  const getDrops = () => {
    setOpen(true);
    getDropsByCategories(category, 0, 1000)
      .then((response) => {
        console.log("Response from getting drops by categories: ", response);
        let filtered = response.data?.data?.filter(
          (drop) => drop.status !== "draft"
        );
        setDrops(filtered);
        setOpen(false);
      })
      .catch((error) => {
        console.log("Error from getting drops by categories: ", error);
        setOpen(false);
      });
  };

  useEffect(() => {
    props.setActiveTab({
      dashboard: "",
      newCollection: "",
      myCollections: "",
      newNFT: "",
      myNFTs: "",
      marketplace: "",
      newDrop: "",
      myDrops: "",
      topUp: "",
      categories: "active",
    });
    getDrops();
  }, []);

  return (
    <div
      className="card"
      style={{ backgroundColor: "rgba(32,32,32,255)", border: "None" }}
    >
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Drops</h3>
            <ul className="breadcrumb">
              <Link to={`/dashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <Link to={`/dashboard/dropsCategories`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Categories
                </li>
              </Link>
              <li className="breadcrumb-item active">Drops</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="form-group">
          {open ? (
            <div align="center" className="text-center">
              <Spinner
                animation="border"
                role="status"
                style={{ color: "#ff0000" }}
              />
              <span style={{ color: "#ff0000" }} className="sr-only">
                Loading...
              </span>
            </div>
          ) : drops.length === 0 ? (
            <MessageCard msg="No items to display" />
          ) : (
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="flex-start"
            >
              {drops.map((i, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Link
                    to={`/dashboard/myDrops/nfts`}
                    state={{
                      nftId: i.NFTIds,
                      dropId: i._id,
                      saleType: i.saleType,
                      status: i.status,
                    }}
                  >
                    <CategoryDropsCards i={i} />
                  </Link>
                </Grid>
              ))}
            </Grid>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropsInCategories;
