import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AmbientLight, DirectionLight, GLTFModel } from "react-3d-viewer";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import ipfs from "../../components/IPFS/ipfs";
import { uploadToS3 } from "../API/AxiosInterceptor";
import { defaultProfile } from "../ImageURLs/URLs";
import NotificationSnackbar from "../Snackbar/NotificationSnackbar";

const NFTEditModal = (props) => {
  const [nftDetail, setNftDetail] = useState({});
  const [isUploadingIPFS, setIsUploadingIPFS] = useState(false);
  const [imageType, setImageType] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [nftURI, setNftURI] = useState("");
  const [image, setImage] = useState(defaultProfile);
  const [rarities] = useState([
    "Mastercraft",
    "Legendary",
    "Epic",
    "Rare",
    "Uncommon",
    "Common",
  ]);
  const [isGlbFile, setIsGlbFile] = useState(false);
  const [isMp3File, setIsMp3File] = useState(false);

  const [previewImageURI, setPreviewImageURI] = useState("");
  const [isUploadingPreview, setIsUploadingPreview] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  useEffect(() => {
    setIsGlbFile(false);
    if (props.show === true) {
      setNftDetail(props.nftDetail);
      if (props.nftDetail.nftFormat === "glb") {
        setIsGlbFile(true);
        console.log("In the condition ");
      } else if (props.nftDetail.nftFormat === "mp3") {
        setIsMp3File(true);
      }
    }

    setImage(props.nftDetail.nftImage);
  }, [props.show]);

  let onChangeFile = (e) => {
    let data = { ...nftDetail };
    setIsUploadingIPFS(true);
    setIsGlbFile(false);
    setIsMp3File(false);

    const reader = new window.FileReader();
    let imageNFT = e.target.files[0];
    let typeImage;

    if (e.target.files[0].name.includes(".glb")) {
      typeImage = "glb";
      setImageType("glb");
    } else if (
      e.target.files[0].type.split("/")[1] === "mp3" ||
      e.target.files[0].name.includes(".mp3")
    ) {
      typeImage = "mp3";
      setIsMp3File(true);
      setImageType("mp3");
    } else {
      setImageType(e.target.files[0].type.split("/")[1]);
      typeImage = e.target.files[0].type.split("/")[1];

      if (nftDetail.previewImageURI !== "") {
        setPreviewImageURI("");
        data.previewImageURI = "";
      }
    }
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onloadend = () => {
      console.log("reader.result", reader.result);

      ipfs.add(Buffer(reader.result), async (err, result) => {
        if (err) {
          console.log("err", err);
          setIsUploadingIPFS(false);
          let variant = "error";
          setSnackbarMessage("Unable to Upload Image to IPFS.");
          setSnackbarSeverity(variant);
          handleSnackbarOpen();
          return;
        }
        console.log("HASH", result[0].hash);

        setIpfsHash(result[0].hash);
        setNftURI(`https://ipfs.io/ipfs/${result[0].hash}`);
        data.nftURI = `https://ipfs.io/ipfs/${result[0].hash}`;
        let variant = "success";
        setSnackbarMessage("Image Uploaded to IPFS.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
        if (typeImage === "glb") {
          setIsGlbFile(true);
        }
      });
    };
    let fileData = new FormData();
    fileData.append("image", imageNFT);

    uploadToS3(fileData)
      .then((response) => {
        console.log("response", response);
        setImage(response.data.url);
        data.nftImage = response.data.url;
        setNftDetail(data);
        setIsUploadingIPFS(false);
        let variant = "success";
        setSnackbarMessage("Image Uploaded Successfully.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
        setIsUploadingIPFS(false);
        let variant = "error";
        setSnackbarMessage("Unable to Upload Image.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
      });
  };

  let handleRemoveProperty = (e, index) => {
    e.preventDefault();
    let data = { ...nftDetail };
    let newData = [...data.properties];
    newData.splice(index, 1);
    data.properties = newData;
    setNftDetail(data);
  };

  let handleAddProperty = (e) => {
    e.preventDefault();
    let newData = { key: "", value: "" };
    let data = { ...nftDetail };
    data.properties = [...data.properties, newData];
    setNftDetail(data);
  };

  let handlePropertyChange = (index, event) => {
    let data = { ...nftDetail };
    let newData = [...data.properties];
    console.log("New Data: ", newData);
    newData[index][event.target.name] = event.target.value;
    data.properties = newData;
    setNftDetail(data);
  };

  let onChangePreviewImage = (e) => {
    setIsUploadingPreview(true);
    const reader = new window.FileReader();
    let imageNFT = e.target.files[0];
    let typeImage;

    console.log("Image Type: ", typeImage);
    console.log("e.target.files[0]", e.target.files[0]);
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onloadend = () => {
      console.log("reader.result", reader.result);

      ipfs.add(Buffer(reader.result), async (err, result) => {
        if (err) {
          console.log("err", err);
          setIsUploadingPreview(false);
          let variant = "error";
          setSnackbarMessage("Unable to Upload Preview Image to IPFS.");
          setSnackbarSeverity(variant);
          handleSnackbarOpen();
          return;
        }
        console.log("HASH", result[0].hash);
        setPreviewImageURI(`https://ipfs.io/ipfs/${result[0].hash}`);
        let data = { ...nftDetail };
        data.previewImageURI = `https://ipfs.io/ipfs/${result[0].hash}`;
        setNftDetail(data);

        let variant = "success";
        setSnackbarMessage("Preview Image Uploaded to IPFS.");
        setSnackbarSeverity(variant);
        handleSnackbarOpen();
        setIsUploadingPreview(false);
      });
    };
  };

  let updateModal = (nftDetailObj) => {
    console.log("NFT Detail object before updating: ", nftDetailObj);
    props.onUpdate(nftDetailObj);
  };

  return (
    <Dialog open={props.show} onClose={props.handleClose}>
      <DialogTitle>Edit Detail of NFT {nftDetail.title}</DialogTitle>
      <DialogContent>
        <form>
          <div className="form-group">
            <label>Select Artwork</label>
            {isGlbFile ? (
              <div>
                <div>
                  <GLTFModel src={nftDetail.nftURI} width={250} height={250}>
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
                <div className="upload-img">
                  <div
                    className="change-photo-btn"
                    style={{ backgroundColor: "rgb(167,0,0)" }}
                  >
                    {isUploadingIPFS ? (
                      <div className="text-center">
                        <CircularProgress sx={{ color: "#FFFFFF" }} />
                      </div>
                    ) : (
                      <span>
                        <i className="fa fa-upload"></i>Upload photo
                      </span>
                    )}

                    <input
                      name="sampleFile"
                      type="file"
                      className="upload"
                      accept=".png,.jpg,.jpeg,.gif,.glb.,mp3"
                      onChange={onChangeFile}
                    />
                  </div>
                  <small className="form-text text-muted">
                    Allowed JPG, JPEG, PNG, GIF. GLB. MP3 Max size of 5MB
                  </small>
                </div>
                <label>Select Preview Image</label>
                <div className="filter-widget">
                  <div className="form-group">
                    <div className="change-avatar">
                      <div className="profile-img">
                        <div
                          style={{
                            background: "#E9ECEF",
                            width: "100px",
                            height: "100px",
                          }}
                        >
                          <img src={nftDetail.previewImageURI} alt="Selfie" />
                        </div>
                      </div>
                      <div className="upload-img">
                        <div
                          className="change-photo-btn"
                          style={{ backgroundColor: "rgb(167,0,0)" }}
                        >
                          {isUploadingPreview ? (
                            <div className="text-center">
                              <CircularProgress sx={{ color: "#FFFFFF" }} />
                            </div>
                          ) : (
                            <span>
                              <i className="fa fa-upload"></i>Upload photo
                            </span>
                          )}

                          <input
                            name="sampleFile"
                            type="file"
                            className="upload"
                            accept=".png,.jpg,.jpeg"
                            onChange={onChangePreviewImage}
                          />
                        </div>
                        <small className="form-text text-muted">
                          Allowed JPG, JPEG. Max size of 5MB
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : isMp3File ? (
              <div>
                <div>
                  <AudioPlayer
                    style={{ borderRadius: "1rem" }}
                    autoPlay={false}
                    layout="horizontal"
                    src={nftDetail.nftURI}
                    onPlay={(e) => console.log("nft uri ", nftDetail.nftURI)}
                    showSkipControls={false}
                    showJumpControls={false}
                    header={`Now playing: ${nftDetail.title}`}
                    showDownloadProgress
                  />
                </div>
                <div className="upload-img">
                  <div
                    className="change-photo-btn"
                    style={{ backgroundColor: "rgb(167,0,0)" }}
                  >
                    {isUploadingIPFS ? (
                      <div className="text-center">
                        <CircularProgress sx={{ color: "#FFFFFF" }} />
                      </div>
                    ) : (
                      <span>
                        <i className="fa fa-upload"></i>Upload MP3
                      </span>
                    )}

                    <input
                      name="sampleFile"
                      type="file"
                      className="upload"
                      accept=".png,.jpg,.jpeg,.gif,.glb,.mp3"
                      onChange={onChangeFile}
                    />
                  </div>
                  <small className="form-text text-muted">
                    Allowed JPG, JPEG, PNG, GIF. Max size of 5MB
                  </small>
                </div>
                <label>Select Preview Image</label>
                <div className="filter-widget">
                  <div className="form-group">
                    <div className="change-avatar">
                      <div className="profile-img">
                        <div
                          style={{
                            background: "#E9ECEF",
                            width: "100px",
                            height: "100px",
                          }}
                        >
                          <img src={nftDetail.previewImageURI} alt="Selfie" />
                        </div>
                      </div>
                      <div className="upload-img">
                        <div
                          className="change-photo-btn"
                          style={{ backgroundColor: "rgb(167,0,0)" }}
                        >
                          {isUploadingPreview ? (
                            <div className="text-center">
                              <CircularProgress sx={{ color: "#FFFFFF" }} />
                            </div>
                          ) : (
                            <span>
                              <i className="fa fa-upload"></i>Upload photo
                            </span>
                          )}

                          <input
                            name="sampleFile"
                            type="file"
                            className="upload"
                            accept=".png,.jpg,.jpeg"
                            onChange={onChangePreviewImage}
                          />
                        </div>
                        <small className="form-text text-muted">
                          Allowed JPG, JPEG. Max size of 5MB
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="filter-widget row">
                <div className="profile-img col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <img
                    className="img-fluid"
                    src={nftDetail.nftURI}
                    alt="Selfie"
                    style={{ background: "#E9ECEF" }}
                  />
                </div>
                <div
                  className="col-sm-12 col-md-6 col-lg-6 col-xl-6 mt-2"
                  style={{ wordWrap: "break-word" }}
                >
                  {isUploadingIPFS ? (
                    <div className="text-center text-wrap">
                      <CircularProgress sx={{ color: "#FFFFFF" }} />
                    </div>
                  ) : (
                    <div className="mt-4">
                      <span className="mt-2">
                        <i className="fa fa-upload text-wrap"></i>
                        <label style={{ marginLeft: "5px" }}>
                          Upload photo
                        </label>
                      </span>
                      <div className="row">
                        <input
                          name="sampleFile"
                          type="file"
                          size={10}
                          className="mt-2"
                          accept=".png,.jpg,.jpeg,.gif,.glb,.mp3"
                          onChange={onChangeFile}
                        />
                      </div>
                      <small className="form-text text-muted mt-2">
                        Allowed JPG, JPEG, PNG, GIF. Max size of 5MB
                      </small>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="form-group">
              <label>NFT Title</label>
              <div className="form-group">
                <input
                  type="text"
                  required
                  value={nftDetail.title}
                  placeholder="Enter Nft Title"
                  className="form-control"
                  onChange={(e) => {
                    let data = { ...nftDetail };
                    data.title = e.target.value;
                    setNftDetail(data);
                  }}
                />
              </div>
              <label>NFT Description</label>
              <div className="form-group">
                <textarea
                  type="text"
                  required
                  rows="4"
                  value={nftDetail.description}
                  placeholder="Enter Description of NFT"
                  className="form-control"
                  onChange={(e) => {
                    let data = { ...nftDetail };
                    data.description = e.target.value;
                    setNftDetail(data);
                  }}
                />
              </div>
              <label>Select Rarity</label>
              <div className="filter-widget">
                <Autocomplete
                  id="combo-dox-demo"
                  required
                  options={rarities}
                  getOptionLabel={(option) => option}
                  onChange={(event, value) => {
                    if (value == null) {
                      let data = { ...nftDetail };
                      data.rarity = "";
                      setNftDetail(data);
                    } else {
                      let data = { ...nftDetail };
                      data.rarity = value;
                      setNftDetail(data);
                    }
                  }}
                  inputValue={nftDetail.rarity}
                  renderInput={(params) => (
                    <TextField {...params} label="Rarity" variant="outlined" />
                  )}
                />
              </div>
              <FormControl component="fieldset">
                <lable component="legend">Select Supply Type</lable>
                <RadioGroup
                  row
                  aria-label="position"
                  name="position"
                  defaultValue="top"
                >
                  <FormControlLabel
                    style={{ color: "black" }}
                    value="Single"
                    onChange={() => {
                      let data = { ...nftDetail };
                      data.supplytype = "Single";
                      data.tokensupply = 1;
                      setNftDetail(data);
                    }}
                    checked={nftDetail.supplytype === "Single"}
                    control={<Radio color="secondary" />}
                    label="Single"
                  />
                  <FormControlLabel
                    style={{ color: "black" }}
                    value="Variable Supply"
                    onChange={() => {
                      let data = { ...nftDetail };
                      data.supplytype = "Variable";
                      data.tokensupply = 1;
                      setNftDetail(data);
                    }}
                    checked={nftDetail.supplytype === "Variable"}
                    control={<Radio color="secondary" />}
                    label="Variable Supply"
                  />
                </RadioGroup>
              </FormControl>
              {nftDetail.supplytype === "Single" ? (
                <div className="form-group">
                  <label>Token Supply</label>
                  <div className="filter-widget">
                    <input
                      type="number"
                      required
                      value={nftDetail.tokensupply}
                      className="form-control"
                      disabled
                    />
                  </div>
                </div>
              ) : (
                <div className="form-group">
                  <label>Token Supply</label>
                  <div className="filter-widget">
                    <input
                      type="number"
                      placeholder="Enter Token price(USD)"
                      required
                      value={nftDetail.tokensupply}
                      className="form-control"
                      onChange={(e) => {
                        if (e.target.value > 0) {
                          let data = { ...nftDetail };
                          data.tokensupply = e.target.value;
                          setNftDetail(data);
                        } else {
                          let data = { ...nftDetail };
                          data.tokensupply = 1;
                          setNftDetail(data);
                        }
                      }}
                    />
                  </div>
                </div>
              )}

              <div>
                <label>Add Properties</label>
                <small style={{ marginLeft: "5px" }}>(optional)</small>
              </div>
              <div>
                {nftDetail.properties?.map((property, index) => {
                  return (
                    <div key={index}>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                          <div className="form-group">
                            <label>Key</label>
                            <div className="filter-widget">
                              <input
                                name="key"
                                type="text"
                                placeholder="Enter key of the property"
                                required
                                value={property.key}
                                className="form-control"
                                onChange={(e) => handlePropertyChange(index, e)}
                              />
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                          <div className="form-group">
                            <label>Value</label>
                            <div className="filter-widget">
                              <input
                                name="value"
                                type="text"
                                placeholder="Enter Value of the property"
                                required
                                value={property.value}
                                className="form-control"
                                onChange={(e) => handlePropertyChange(index, e)}
                              />
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                          <div className="form-group">
                            <label>Action</label>
                            <div className="filter-widget">
                              <button
                                className="btn btn-submit btn-lg"
                                color="primary"
                                onClick={(e) => handleRemoveProperty(e, index)}
                              >
                                -
                              </button>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
                <button
                  className="btn btn-submit"
                  color="primary"
                  onClick={(e) => handleAddProperty(e)}
                >
                  +
                </button>
              </div>

              <button
                style={{ marginTop: "10px" }}
                type="button"
                className="btn submit-btn"
                onClick={props.handleChangeCollection}
              >
                Change Collection
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="sceondary" onClick={props.handleClose}>
          Cancel
        </Button>
        {props.isUploadingData ? (
          <div className="text-center">
            <CircularProgress sx={{ color: "#FFFFFF" }} />
          </div>
        ) : (
          <button
            type="button"
            className="btn"
            onClick={() => updateModal(nftDetail)}
          >
            Update
          </button>
        )}
      </DialogActions>
      <NotificationSnackbar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </Dialog>
  );
};

export default NFTEditModal;
