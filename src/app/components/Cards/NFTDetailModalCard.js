import {
  CardContent,
  CardMedia,
  Paper,
  Typography
} from "@mui/material";
import React, { useEffect } from "react";
import { AmbientLight, DirectionLight, GLTFModel } from "react-3d-viewer";
import ReactAudioPlayer from "react-audio-player";
import { Card, Col, Row, Table } from "react-bootstrap";
import "react-h5-audio-player/lib/styles.css";
const styles = {
  media: {
    height: 0,
    paddingTop: "60%",
  },
}

const NFTDetailModalCard = (props) => {

  useEffect(() => {
    console.log("Props are: ", props);
  }, []);

  return (
    <Card>
      <div
        style={{
          display: "flex",
          margin: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {props.nftDetail.previewImageURI !== "" ? (
          props.nftDetail.nftFormat === "mp3" ? (
            <div>
              <ReactAudioPlayer
                style={{ width: "420px", borderRadius: "1rem" }}
                autoPlay={false}
                layout="horizontal"
                src={props.nftDetail.nftURI}
                onPlay={(e) => console.log("nft uri ", props.nftDetail.nftURI)}
                showSkipControls={false}
                showJumpControls={false}
                header={`Now playing: ${props.nftDetail.title}`}
                showDownloadProgress
              />
            </div>
          ) : (
            <GLTFModel src={props.nftDetail.nftURI} width={250} height={250}>
              <AmbientLight color={0xffffff} />
              <AmbientLight color={0xffffff} />
              <AmbientLight color={0xffffff} />
              <AmbientLight color={0xffffff} />
              <DirectionLight
                color={0xffffff}
                position={{ x: 100, y: 200, z: 100 }}
              />
              <DirectionLight
                color={0xffffff}
                position={{ x: 50, y: 200, z: 100 }}
              />
              <DirectionLight
                color={0xffffff}
                position={{ x: 0, y: 0, z: 0 }}
              />
              <DirectionLight
                color={0xffffff}
                position={{ x: 0, y: 100, z: 200 }}
              />
              <DirectionLight
                color={0xffffff}
                position={{ x: -100, y: 200, z: -100 }}
              />
            </GLTFModel>
          )
        ) : null}
      </div>
      <Row>
        <Col>
          <Paper elevation={10}>
            <CardMedia
              variant="outlined"
              style={{
                height: "100%",
                border:
                  props.nftDetail.rarity === "Mastercraft"
                    ? "4px solid #ff0000"
                    : props.nftDetail.rarity === "Legendary"
                      ? "4px solid #FFD700"
                      : props.nftDetail.rarity === "Epic"
                        ? "4px solid #9400D3"
                        : props.nftDetail.rarity === "Rare"
                          ? "4px solid #0000FF"
                          : props.nftDetail.rarity === "Uncommon"
                            ? "4px solid #008000"
                            : props.nftDetail.rarity === "Common"
                              ? "4px solid #FFFFFF"
                              : "none",
              }}
              sx={styles.media}
              image={
                props.nftDetail.previewImageURI === ""
                  ? props.nftDetail.nftURI
                  : props.nftDetail.previewImageURI
              }
              title="NFT Image"
            />
          </Paper>
        </Col>
        <Col>
          <CardContent>
            <Row style={{ marginBottom: "5px" }}>
              <Col>
                <Typography variant="body2" color="textSecondary" component="p">
                  <strong>Description: </strong>
                </Typography>
              </Col>
              <Col style={{ justifyContent: "right" }}>
                <Typography variant="body2" color="textSecondary" component="p">
                  {props.nftDetail.description}
                </Typography>
              </Col>
            </Row>
            <Row style={{ marginBottom: "5px" }}>
              <Col>
                <Typography variant="body2" color="textSecondary" component="p">
                  <strong>Rarity: </strong>
                </Typography>
              </Col>
              <Col>
                <Typography variant="body2" color="textSecondary" component="p">
                  {props.nftDetail.rarity}
                </Typography>
              </Col>
            </Row>
            <Row style={{ marginBottom: "5px" }}>
              <Col>
                <Typography variant="body2" color="textSecondary" component="p">
                  <strong>Token Supply: </strong>
                </Typography>
              </Col>
              <Col className="align-self-end">
                <Typography variant="body2" color="textSecondary" component="p">
                  {props.nftDetail.tokensupply}
                </Typography>
              </Col>
            </Row>
            <Row style={{ marginBottom: "5px" }}>
              <Col>
                <Typography variant="body2" color="textSecondary" component="p">
                  <strong>Collection: </strong>
                </Typography>
              </Col>
              <Col>
                <Typography variant="body2" color="textSecondary" component="p">
                  {props.nftDetail.collectiontitle}
                </Typography>
              </Col>
            </Row>
            <Row>
              <Col>
                <Typography variant="body2" color="textSecondary" component="p">
                  <strong>Properties: </strong>
                </Typography>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Key</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.nftDetail.properties?.map((i, index) => (
                      <tr key={index}>
                        <td>{i.key}</td>
                        <td>{i.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </CardContent>
        </Col>
      </Row>
    </Card>
  );
};

export default NFTDetailModalCard;
