import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import { Col, Row } from "react-bootstrap";

const SingleNFTDetailCard = (props) => {
  return (
    <Card>
      <CardContent>
        <Row>
          <Col>
            <Typography
              variant="body1"
              component="p"
              style={{ color: "#fff", fontFamily: "orbitron" }}
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
              style={{ color: "#fff", fontFamily: "orbitron" }}
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
              style={{ color: "#fff", fontFamily: "orbitron" }}
            >
              <strong>Token Supply </strong>
            </Typography>
          </Col>
          <Col>{props.nftDetail.tokenSupply}</Col>
        </Row>
      </CardContent>
    </Card>
  );
};

export default SingleNFTDetailCard;
