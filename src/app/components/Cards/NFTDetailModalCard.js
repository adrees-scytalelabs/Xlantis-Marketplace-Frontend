import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  ThemeProvider,
  Typography,
  createTheme,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";
import React from "react";
import { AmbientLight, DirectionLight, GLTFModel } from "react-3d-viewer";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const styles = {
  media: {
    height: 0,
    paddingTop: "60%",
  },
  tableHeader: {
    "& th": {
      fontSize: "1rem",
      fontWeight: "bold",
      padding: "14px",
      color: "#000",
      backgroundColor: "white",
    },
  },
  text: {
    color: "#fff",
    fontSize: "1rem",
    fontFamily: "inter",
    paddingTop: "10px",
  }
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
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
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
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CardContent>
              <Grid container spacing={1} style={{ marginBottom: "5px" }}>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <strong>Title: </strong>
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                  style={{ justifyContent: "right" }}
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {props?.nftDetail?.title}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1} style={{ marginBottom: "5px" }}>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <strong>Description: </strong>
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                  style={{ justifyContent: "right" }}
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {props.nftDetail.description}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1} style={{ marginBottom: "5px" }}>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <strong>Total Supply: </strong>
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  xl={6}
                  className="align-self-end"
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {props.nftDetail.totalSupply}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <strong>Properties: </strong>
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <TableContainer
                    component={Paper}
                    sx={{ backgroundColor: "black" }}
                  >
                    <Table striped bordered hover>
                      <TableHead sx={styles.tableHeader}>
                        <TableRow>
                          <TableCell>Key</TableCell>
                          <TableCell>Value</TableCell>
                        </TableRow>
                      </TableHead>
                      {props?.nftDetail?.properties &&
                        Object.keys(props?.nftDetail?.properties)?.map(
                          (i, index) => (
                            <TableRow key={index}>
                              <TableCell style={styles.text}>{i}</TableCell>
                              <TableCell style={styles.text}>
                                {props.nftDetail.properties[i]}
                              </TableCell>
                            </TableRow>
                          )
                        )}
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </ThemeProvider>
  );
};

export default NFTDetailModalCard;
