import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { AmbientLight, DirectionLight, GLTFModel } from "react-3d-viewer";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import UploadFile from "./UploadFile";

const NFTUpload = (props) => {
  return (
    <>
      {props.isGlbFile ? (
        <div>
          <div className="form-group">
            <div className="row no-gutters align-items-end justify-content-start">
              <div className="co-12 col-md-auto profile-img mr-3">
                <GLTFModel src={props.nftURI} width={250} height={250}>
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
                  accept=".png,.jpg,.jpeg,.gif,.glb.,mp3"
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
            fileURL={props.previewImageURI}
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
            fileURL={props.previewImageURI}
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
            fileURL={props.image}
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
