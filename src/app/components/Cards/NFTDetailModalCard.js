import {
  Card,
  CardContent,
  CardMedia,
  Paper,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { AmbientLight, DirectionLight, GLTFModel } from "react-3d-viewer";
import { Col, Row, Table } from "react-bootstrap";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const styles = {
  media: {
    height: 0,
    paddingTop: "60%",
  },
};

const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          // color: "black",
          backgroundColor: "black !important",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "white !important",
        },
      },
    },
  },
});

const NFTDetailModalCard = (props) => {
  // useEffect(() => {
  //   console.log("Props in nft detail modal card are: ", props);
  // }, [props]);
  return (
    <ThemeProvider theme={theme}>
      <Card>
        <Row>
          <Col>
            <Paper elevation={10}>
              <CardMedia
                variant="outlined"
                style={{
                  height: "100%",
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
            <div>
              {props.nftDetail.previewImageURI !== "" ? (
                props.nftDetail.nftFormat === "mp3" ? (
                  <div
                    className="w-100"
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <AudioPlayer
                        style={{ borderRadius: "1rem" }}
                        autoPlay
                        layout="horizontal"
                        src={props.nftDetail.nftURI}
                        onPlay={(e) => console.log("onPlay")}
                        showSkipControls={false}
                        showJumpControls={false}
                        header={`Now playing: ${props.nftDetail.title}`}
                        showDownloadProgress
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className="w-100"
                    style={{
                      display: "flex",
                      margin: "10px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <GLTFModel
                      src={props.nftDetail.nftURI}
                      width={250}
                      height={250}
                    >
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
                  </div>
                )
              ) : null}
            </div>
          </Col>
          <Col>
            <CardContent>
              <Row style={{ marginBottom: "5px" }}>
                <Col>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <strong>Title: </strong>
                  </Typography>
                </Col>
                <Col style={{ justifyContent: "right" }}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {props?.nftDetail?.title}
                  </Typography>
                </Col>
              </Row>
              <Row style={{ marginBottom: "5px" }}>
                <Col>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <strong>Description: </strong>
                  </Typography>
                </Col>
                <Col style={{ justifyContent: "right" }}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {props.nftDetail.description}
                  </Typography>
                </Col>
              </Row>
              <Row style={{ marginBottom: "5px" }}>
                <Col>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <strong>Total Supply: </strong>
                  </Typography>
                </Col>
                <Col className="align-self-end">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {props.nftDetail.totalSupply}
                  </Typography>
                </Col>
              </Row>
              {/* <Row style={{ marginBottom: "5px" }}>
                <Col>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <strong>Collection: </strong>
                  </Typography>
                </Col>
                <Col>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {props.nftDetail.collectiontitle}
                  </Typography>
                </Col>
              </Row> */}
              <Row>
                <Col>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
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
                      {props?.nftDetail?.properties &&
                        Object.keys(props?.nftDetail?.properties)?.map(
                          (i, index) => (
                            <tr key={index}>
                              <td>{i}</td>
                              <td>{props.nftDetail.properties[i]}</td>
                            </tr>
                          )
                        )}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </CardContent>
          </Col>
        </Row>
      </Card>
    </ThemeProvider>
  );
};

export default NFTDetailModalCard;
