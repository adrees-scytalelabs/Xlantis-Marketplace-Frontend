import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import React from 'react';
import CardHeaderWithAvatar from '../CardHeader/CardHeaderWithAvatar';

const styles = {
  media: {
    height: 0,
    paddingTop: "100%",
  },
}

function NewCubeCard({ i, handleRemoveClick, index }) {
  return (
    <div>
      <Card style={{ height: "100%" }} variant="outlined">
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
          sx={styles.media}
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
            {i.tokensupplyalternative}
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
        </CardContent>

        <CardActions>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleRemoveClick(index, i);
            }}
            className="btn btn-sm bg-danger-light btn-block"
          >
            Remove NFT
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default NewCubeCard