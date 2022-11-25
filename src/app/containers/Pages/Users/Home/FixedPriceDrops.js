// REACT
import { Card, Typography } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import Carousel from "../../../../components/carousel/Carousel";

const FixedPriceDrops = (props) => {
  return (
    <div className="w-100">
      <div
        style={{
          maxWidth: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: 12,
        }}
      >
        {/* On Sale */}
        <Carousel show={1} infiniteLoop={true}>
          {/* <div style={{ padding: 8, borderRadius: 12 }}>
            {props.type === "fixedPriceDrops" ? (
              props.open ? (
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
              ) : props.cubeDataLength === 0 &&
                props.cubeAuctionDataLength === 0 ? (
                <Card
                  variant="outlined"
                  style={{
                    padding: "40px",
                    marginTop: "20px",
                    marginBottom: "20px",
                    borderRadius: "12px",
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
                <div
                  className="row no-gutters w-100"
                  style={{ borderRadius: "12px" }}
                >
                  {props.cubeData.map((i, index) => (
                    <div className="col-sm-6 col-lg-4 col-xl-3" key={index}>
                      
                      "this is text"
                    </div>
                  ))}
                </div>
              )
            ) : (
              <Card
                variant="outlined"
                style={{
                  padding: "40px",
                  marginTop: "20px",
                  marginBottom: "20px",
                  borderRadius: "12px",
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
            )}
          </div> */}

          {/* ----------------- */}
          <div style={{ padding: 8, borderRadius: 12 }}>
            <img
              src="https://via.placeholder.com/1600x300"
              alt="placeholder"
              style={{ width: "100%", height: 360, borderRadius: 12 }}
            />
          </div>
          <div style={{ padding: 8, borderRadius: 12 }}>
            <img
              src="https://via.placeholder.com/1600x300"
              alt="placeholder"
              style={{ width: "100%", height: 360, borderRadius: 12 }}
            />
          </div>
          <div style={{ padding: 8, borderRadius: 12 }}>
            <img
              src="https://via.placeholder.com/1600x300"
              alt="placeholder"
              style={{ width: "100%", height: 360, borderRadius: 12 }}
            />
          </div>
          {/*<div style={{ padding: 8, borderRadius: 12 }}>
            <img
              src="https://via.placeholder.com/1600x300"
              alt="placeholder"
              style={{ width: "100%", height: 360, borderRadius: 12 }}
            />
          </div>
          <div style={{ padding: 8, borderRadius: 12 }}>
            <img
              src="https://via.placeholder.com/1600x300"
              alt="placeholder"
              style={{ width: "100%", height: 360, borderRadius: 12 }}
            />
          </div>
          <div style={{ padding: 8, borderRadius: 12 }}>
            <img
              src="https://via.placeholder.com/1600x300"
              alt="placeholder"
              style={{ width: "100%", height: 360, borderRadius: 12 }}
            />
          </div> */}
        </Carousel>
      </div>
    </div>
  );
};

export default FixedPriceDrops;
