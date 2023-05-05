import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { Col, Row } from "react-bootstrap";
const FixedDropSingleNFTCard = (props) => {
  return (
    <Card style={{ backgroundColor: "black" }}>
      <CardContent>
        <Row>
          <Col>
            <Typography
              variant="body1"
              component="p"
              style={{ color: "#F64D04", fontFamily: "orbitron" }}
            >
              <strong>NFT Title </strong>
            </Typography>
          </Col>
          <Col>
            <Typography
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
        <Row>
          <Col>
            <Typography
              variant="body1"
              component="p"
              style={{ color: "#F64D04", fontFamily: "orbitron" }}
            >
              <strong>NFT Description </strong>
            </Typography>
          </Col>
          <Col
            style={{
              color: "white",
              fontFamily: "inter",
              fontSize: "1rem",
            }}
          >
            {props.nftData.description}
          </Col>
        </Row>
        <Row>
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
          <Row>
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
        {props.nftData.tokenSupply ? (
          <Row>
            <Col>
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
              style={{
                color: "white",
                fontFamily: "inter",
                fontSize: "1rem",
              }}
            >
              {props.nftData.tokenSupply}
            </Col>
          </Row>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default FixedDropSingleNFTCard;
