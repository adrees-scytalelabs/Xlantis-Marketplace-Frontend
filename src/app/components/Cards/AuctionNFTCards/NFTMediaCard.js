import { Card, CardMedia } from "@mui/material";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { AmbientLight, DirectionLight, GLTFModel } from "react-3d-viewer";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

function Model(props) {
  const { scene } = useGLTF(props.nftURI);
  return <primitive object={scene} />;
}

const NFTMediaCard = (props) => {
  return (
    <div style={props.classes.root}>
      <div>
        {props.nftDetail.nftFormat === "glb" ||
        props.nftDetail.nftFormat === "gltf" ? (
          <div>
            <div
              style={{
                border: "1px solid red",
                background: "white",
                // height: "250px",
                // width: "250px",
              }}

              // style={{
              //   display: "flex",
              //   margin: "10px",
              //   justifyContent: "center",
              //   alignItems: "center",
              // }}
            >
              <Canvas
                // pixelRatio={[1, 2]}
                camera={{ position: [-10, 15, 15], fov: 60 }}
              >
                <ambientLight intensity={3} />
                <Suspense fallback={null}>
                  <Model nftURI={props.nftDetail.nftURI} />
                </Suspense>
                <OrbitControls />
              </Canvas>
              {/* <GLTFModel src={props.nftDetail.nftURI} width={250} height={250}>
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
              </GLTFModel> */}
            </div>
            <div></div>
            <div className="mt-100">
              <CardMedia
                sx={props.classes.media}
                title="NFT Artwork"
                image={props.nftDetail.previewImageURI}
              />
            </div>
          </div>
        ) : props.nftDetail.nftFormat === "mp3" ? (
          <div>
            <CardMedia
              sx={props.classes.media}
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
            sx={props.classes.media}
            title="NFT Artwork"
            image={props.nftDetail.nftURI}
          />
        )}
      </div>
    </div>
  );
};

export default NFTMediaCard;
