import React, { Suspense, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import UploadFile from "./UploadFile";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { defaultProfile } from "../ImageURLs/URLs";

function Model(props) {
  const { scene } = useGLTF(props.nftURI);
  return <primitive object={scene} />;
}

const NFTUpload = (props) => {
  return (
    <>
      {props.isGlbFile ? (
        <div>
          <div className="form-group">
            <div className="row no-gutters align-items-end justify-content-start">
              <div
                className="co-12 col-md-auto profile-img mr-3"
                style={{
                  border: "1px solid red",
                  background: "white",
                  height: "250px",
                  width: "250px",
                }}
              >
                {props.isGlbFile && props.nftURI ? (
                  <Canvas
                    // pixelRatio={[1, 2]}
                    camera={{ position: [-10, 15, 15], fov: 60 }}
                  >
                    <ambientLight intensity={3} />
                    <Suspense fallback={null}>
                      <Model nftURI={props.nftURI} />
                    </Suspense>
                    <OrbitControls />
                  </Canvas>
                ) : null}
              </div>
              <div className="co-12 col-md-auto">
                <label htmlFor="uploadGlbFile" className="uploadLabel">
                  {props.isUploadingIPFS ? (
                    <div className="text-center">
                      <Spinner
                        animation="border"
                        role="status"
                        style={{ color: "#fbfeff" }}
                      ></Spinner>
                    </div>
                  ) : (
                    "Choose File"
                  )}
                </label>
                <input
                  name="sampleFile"
                  type="file"
                  id="uploadGlbFile"
                  accept=".png,.jpg,.jpeg,.gif,.glb,.mp3"
                  onChange={props.onChangeFile}
                  hidden
                />
                <small className="form-text text-muted">
                  Allowed JPG, JPEG, PNG, GIF. Max size of 5MB
                </small>
              </div>
            </div>
          </div>
          <label>Select Preview Image</label>
          <UploadFile
            fileURL={props.previewImageURI ? props.previewImageURI : defaultProfile}
            isUploading={props.isUploadingPreview}
            changeFile={props.onChangePreviewImage}
            class="co-12 col-md-auto profile-img mr-3"
            accept=".png,.jpg,.jpeg,.gif"
            inputId="uploadPreviewImg1"
          />
        </div>
      ) : props.isMp3File ? (
        <div>
          <div className="form-group">
            <div className="row no-gutters align-items-end justify-content-start">
              <div className="co-12 col-md-auto profile-img mr-3">
                <AudioPlayer
                  style={{ borderRadius: "1rem" }}
                  autoPlay
                  layout="horizontal"
                  src={props.nftURI}
                  onPlay={(e) => console.log("onPlay")}
                  showSkipControls={false}
                  showJumpControls={false}
                  header={`Now playing: ${props.name}`}
                  showDownloadProgress
                />
              </div>
              <div className="co-12 col-md-auto">
                <label htmlFor="uploadMp3" className="uploadLabel">
                  {props.isUploadingIPFS ? (
                    <div className="text-center">
                      <Spinner
                        animation="border"
                        role="status"
                        style={{ color: "#fbfeff" }}
                      ></Spinner>
                    </div>
                  ) : (
                    "Choose File"
                  )}
                </label>
                <input
                  name="sampleFile"
                  type="file"
                  id="uploadMp3"
                  accept=".png,.jpg,.jpeg,.gif,.glb,.mp3"
                  onChange={props.onChangeFile}
                  hidden
                />
                <small className="form-text text-muted">
                  Allowed JPG, JPEG, PNG, GIF. Max size of 5MB
                </small>
              </div>
            </div>
          </div>
          <label>Select Preview Image</label>
          <UploadFile
            fileURL={props.previewImageURI ? props.previewImageURI : defaultProfile}
            isUploading={props.isUploadingPreview}
            changeFile={props.onChangePreviewImage}
            class="co-12 col-md-auto profile-img mr-3"
            accept=".png,.jpg,.jpeg,.gif"
            inputId="uploadPreviewImg"
          />
        </div>
      ) : (
        <div>
          <UploadFile
            fileURL={props.nftURI ? props.nftURI : defaultProfile}
            isUploading={props.isUploadingIPFS}
            changeFile={props.onChangeFile}
            class="co-12 col-md-auto profile-img mr-3"
            accept=".png,.jpg,.jpeg,.gif,.glb,.mp3"
            inputId="upload"
          />
        </div>
      )}
    </>
  );
};

export default NFTUpload;
