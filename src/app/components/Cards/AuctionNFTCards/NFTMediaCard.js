import { Card, CardMedia } from "@material-ui/core";
import React from "react";
import { AmbientLight, DirectionLight, GLTFModel } from "react-3d-viewer";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const NFTMediaCard = (props) => {
  return (
    <Card className={props.classes.root}>
      <div>
        {props.nftDetail.nftFormat === "glb" ||
        props.nftDetail.nftFormat === "gltf" ? (
          <div>
            <div
              style={{
                display: "flex",
                margin: "10px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
            </div>
            <div style={{ marginTop: "20px" }}>
              <CardMedia
                className={props.classes.media}
                title="NFT Artwork"
                image={props.nftDetail.previewImageURI}
              />
            </div>
          </div>
        ) : props.nftDetail.nftFormat === "mp3" ? (
          <div>
            <CardMedia
              className={props.classes.media}
              title="NFT Artwork"
              image={
                props.nftDetail.previewImageURI
                  ? props.nftDetail.previewImageURI
                  : props.nftDetail.nftURI
              }
            />
            <div>
              <AudioPlayer
                style={{ borderRadius: "1rem" }}
                autoPlay={false}
                layout="horizontal"
                src={props.nftDetail.nftURI}
                onPlay={(e) => console.log("onPlay")}
                showSkipControls={false}
                showJumpControls={false}
                showDownloadProgress
              />
            </div>
          </div>
        ) : (
          <CardMedia
            className={props.classes.media}
            title="NFT Artwork"
            image={props.nftDetail.nftURI}
          />
        )}
      </div>
    </Card>
  );
};

export default NFTMediaCard;
