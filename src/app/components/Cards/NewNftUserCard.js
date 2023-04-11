import React from 'react'
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CardHeaderWithAvatar from '../CardHeader/CardHeaderWithAvatar';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    badge: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  
    card: {
      minWidth: 250,
    },
    media: {
      height: 0,
      paddingTop: "100%",
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  }));

function NewNftUserCard({i,handleRemoveClick,index}) {
    const classes = useStyles();
  return (
    <div>
          <Card>
                            <CardHeader
                              className="text-center"
                              title={i.title}
                            />
                            <CardMedia
                              variant="outlined"
                              style={{
                                border:
                                  i.type === "Mastercraft"
                                    ? "4px solid #ff0000"
                                    : i.type === "Legendary"
                                      ? "4px solid #FFD700"
                                      : i.type === "Epic"
                                        ? "4px solid #9400D3"
                                        : i.type === "Rare"
                                          ? "4px solid #0000FF"
                                          : i.type === "Uncommon"
                                            ? "4px solid #008000"
                                            : i.type === "Common"
                                              ? "4px solid #FFFFFF"
                                              : "none",
                              }}
                              className={classes.media}
                              image={i.artwork}
                              title="NFT Image"
                            />
                            <CardContent>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                              >
                                <strong>Artwork Description: </strong>
                                {i.description}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                              >
                                <strong>Token Rarity: </strong>
                                {i.type}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                              >
                                <strong>Token Supply: </strong>
                                {i.tokensupply}
                              </Typography>
                              <Typography
                                variant="h6"
                                gutterBottom
                                color="textSecondary"
                                className="text-center"
                              >
                                Image Artist
                              </Typography>
                              <CardHeaderWithAvatar
                                src={i.ImageArtistProfile}
                                title={i.ImageArtistName}
                                subheader={i.ImageArtistAbout}
                              />
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                              >
                                <strong>Website URL: </strong>
                                {i.ImageArtistWebsite}
                              </Typography>
                              <Typography
                                variant="h6"
                                gutterBottom
                                color="textSecondary"
                                className="text-center"
                              >
                                Producer
                              </Typography>
                              <CardHeaderWithAvatar
                                src={i.ProducerProfile}
                                title={i.ProducerName}
                                subheader={i.ProducerInspiration}
                              />
                              <Typography
                                variant="h6"
                                gutterBottom
                                color="textSecondary"
                                className="text-center"
                              >
                                Executive Producer
                              </Typography>
                              <CardHeaderWithAvatar
                                src={i.ExecutiveProducerProfile}
                                title={i.ExecutiveProducerName}
                                subheader={i.ExecutiveProducerInspiration}
                              />
                              <Typography
                                variant="h6"
                                gutterBottom
                                color="textSecondary"
                                className="text-center"
                              >
                                Fan
                              </Typography>
                              <CardHeaderWithAvatar
                                src={i.FanProfile}
                                  
                                title={i.FanName}
                                subheader={i.FanInspiration}
                              />
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                              >
                                <strong>Other: </strong>
                                {i.other}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                              >
                                <strong>Collection: </strong>
                                {i.collectiontitle}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleRemoveClick(index);
                                }}
                                className="btn btn-sm bg-danger-light btn-block"
                              >
                                {" "}
                                Remove NFT{" "}
                              </Button>
                            </CardActions>
                          </Card>
    </div>
  )
}

export default NewNftUserCard