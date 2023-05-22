import { Card, CardContent, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
const FixedDropSingleNFTCard = (props) => {
  let incNum = (max) => {
    if (props.num < max) {
      props.setNum(Number(props.num) + 1);
    } else {
      props.setSnackbarSeverity("error");
      props.setSnackbarMessage("Value can't be greater than token supply");
      props.setSnackbarOpen(true);
    }
  };
  let decNum = () => {
    if (props.num > 1) {
      props.setNum(props.num - 1);
    } else {
      props.setSnackbarSeverity("error");
      props.setSnackbarMessage("Value can't be negative");
      props.setSnackbarOpen(true);
    }
  };
  let handleChange = (e) => {
    if (e.target.value <= props.orderListing?.supply) {
      props.setNum(e.target.value);
    } 
    else {
      props.setSnackbarSeverity("error");
      props.setSnackbarMessage("Value can't be greater than token supply");
      props.setSnackbarOpen(true);
    }
  };
  return (
    <Card style={{ backgroundColor: "black" }}>
      <CardContent>
        <Row style={{paddingBottom:'5px'}}>
          <Col>
            <Typography
              variant="body1"
              component="p"
              style={{ color: "#F64D04", fontFamily: "orbitron" }}
            >
              <strong>NFT Title </strong>
            </Typography>
          </Col>
          <Col xs={10}>
            <Typography
              className="text-center"
              variant="body1"
              style={{
                color: "white",
                fontFamily: "inter",
                fontSize: "1rem",
              }}
            >
              {props.nftData.title}
            </Typography>
          </Col>
        </Row>
        <Row style={{paddingBottom:'5px'}}>
          <Col xs={6}>
            <Typography
              variant="body1"
              component="p"
              style={{ color: "#F64D04", fontFamily: "orbitron" }}
            >
              <strong>NFT Description </strong>
            </Typography>
          </Col>
          <Col
            xs={2}
            className="text-center"
            style={{
              color: "white",
              fontFamily: "inter",
              fontSize: "1rem",
            }}
          >
            {props.nftData.description}
          </Col>
        </Row>
        <Row style={{paddingBottom:'5px'}}>
          <Col>
            <Typography
              variant="body1"
              component="p"
              style={{ color: "#F64D04", fontFamily: "orbitron" }}
            >
              <strong>Price </strong>
            </Typography>
          </Col>
          <Col
            xs={10}
            className="text-center"
            style={{
              color: "white",
              fontFamily: "inter",
              fontSize: "1rem",
            }}
          >
            {props.price} USD
          </Col>
        </Row>
        {props.nftData.supplyType ? (
          <Row style={{paddingBottom:'5px'}}>
            <Col>
              <Typography
                variant="body1"
                component="p"
                style={{
                  color: "#F64D04",
                  fontFamily: "orbitron",
                }}
              >
                <strong>Supply Type </strong>
              </Typography>
            </Col>
            <Col
              xs={10}
              className="text-center"
              style={{
                color: "white",
                fontFamily: "inter",
                fontSize: "1rem",
              }}
            >
              {props.nftData.supplyType ? props.nftData.supplyType : null}
            </Col>
          </Row>
        ) : null}
        {props.orderListing.supply ? (
          <Row style={{paddingBottom:'5px'}}>
            <Col xs={6}>
              <Typography
                variant="body1"
                component="p"
                style={{
                  color: "#F64D04",
                  fontFamily: "orbitron",
                }}
              >
                <strong>Token Supply </strong>
              </Typography>
            </Col>
            <Col
              xs={2}
              className="text-center"
              style={{
                color: "white",
                fontFamily: "inter",
                fontSize: "1rem",
              }}
            >
              {props.orderListing.supply}
            </Col>
          </Row>
        ) : null}
        {props.nftData.supplyType === "Variable" ? (
          <Row>
            <Col xs={6}>
              <Typography
                variant="body1"
                component="p"
                style={{
                  color: "#F64D04",
                  fontFamily: "orbitron",
                }}
              >
                <strong>Select Supply </strong>
              </Typography>
            </Col>
            <Col xs={6} md={1} lg={2}>
              <div
                className="responsive-field"
                style={{ border: "1px solid red", width: "100%" }}
              >
                <button className="responsive-field-button" onClick={decNum}>
                  -
                </button>
                <input
                  className="responsive-field-input"
                  type="number"
                  value={props.num}
                  placeholder="1"
                  onChange={handleChange}
                />
                <button
                  className="responsive-field-button"
                  onClick={() => incNum(props.orderListing?.supply)}
                >
                  +
                </button>
              </div>
            </Col>
          </Row>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default FixedDropSingleNFTCard;
