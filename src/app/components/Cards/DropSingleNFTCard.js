import { Card, CardContent, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
const DropSingleNFTCard = (props) => {
  return (
    <Card sx={{ backgroundColor: "#000" }}>
      <CardContent>
        <Row>
          <Col>
            <Typography
              variant="body1"
              component="p"
              sx={{ color: "#F64D04", fontFamily: "orbitron" }}
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
              component="p"
              sx={{ color: "#F64D04", fontFamily: "orbitron" }}
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
              sx={{ color: "#F64D04", fontFamily: "orbitron" }}
            >
              <strong>Supply </strong>
            </Typography>
          </Col>
          <Col style={{ color: "white", fontFamily: "inter" }}>
            {props.nftDetail.description}
          </Col>
        </Row>
      </CardContent>
    </Card>
  );
};

export default DropSingleNFTCard;
