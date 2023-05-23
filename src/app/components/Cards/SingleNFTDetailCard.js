import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { Col, Row } from "react-bootstrap";
const SingleNFTDetailCard = (props) => {
  return (
    <Card sx={{
      backgroundColor: "rgba(32,32,32,255)",
      border: "1px solid #fff",
    }}>
      <CardContent sx={{ color: "#fff", }}>
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
          <Col>{props.nftDetail.title}</Col>
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
          <Col>{props.nftDetail.description}</Col>
        </Row>
        <Row>
          <Col>
            <Typography
              variant="body1"
              component="p"
              sx={{ color: "#F64D04", fontFamily: "orbitron" }}
            >
              <strong>Token Supply </strong>
            </Typography>
          </Col>
          <Col>{props.nftDetail.totalSupply}</Col>
        </Row>
      </CardContent>
    </Card>
  );
};

export default SingleNFTDetailCard;
