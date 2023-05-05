import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { Col, Row } from "react-bootstrap";
const AuctionNFTDetailCard = (props) => {
  return (
    <Card style={{ backgroundColor: "black" }}>
      <CardContent>
        <Row>
          <Col>
            <Typography
              variant="body1"
              color="textSecondary"
              component="p"
              style={{ color: "#F64D04", fontFamily: "orbitron" }}
            >
              <strong>NFT Title </strong>
            </Typography>
          </Col>
          <Col style={{ color: "white", fontFamily: "inter" }}>
            {props.nftDetail.title}
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography
              variant="body1"
              color="textSecondary"
              component="p"
              style={{ color: "#F64D04", fontFamily: "orbitron" }}
            >
              <strong>NFT Description </strong>
            </Typography>
          </Col>
          <Col style={{ color: "white", fontFamily: "inter" }}>
            {props.nftDetail.description}
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography
              variant="body1"
              component="p"
              style={{ color: "#F64D04", fontFamily: "orbitron" }}
            >
              <strong>Floor Price </strong>
            </Typography>
          </Col>
          <Col style={{ color: "white", fontFamily: "inter" }}>{props.price} USD</Col>
        </Row>
        {props.nftDetail.nftType === "1155" ? (
          <span>
            <Row>
              <Col>
                <Typography
                  variant="body1"
                  component="p"
                  style={{ color: "#F64D04", fontFamily: "orbitron" }}
                >
                  <strong>Supply Type </strong>
                </Typography>
              </Col>
              <Col style={{ color: "white", fontFamily: "inter" }}>
                {props.nftDetail.supplyType}
              </Col>
            </Row>
            <Row>
              <Col>
                <Typography
                  variant="body1"
                  component="p"
                  style={{ color: "#F64D04", fontFamily: "orbitron" }}
                >
                  <strong>Token Supply </strong>
                </Typography>
              </Col>
              <Col style={{ color: "white", fontFamily: "inter" }}>
                {props.nftDetail.tokenSupply}
              </Col>
            </Row>
          </span>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default AuctionNFTDetailCard;
