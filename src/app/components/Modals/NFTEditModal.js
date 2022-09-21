import { useSnackbar } from "notistack";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Modal, Spinner } from "react-bootstrap";
import ipfs from '../../components/IPFS/ipfs';
import axios from 'axios';
import r1 from '../../assets/img/patients/patient.jpg';
import { Autocomplete } from "@material-ui/lab";
import { Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from "@material-ui/core";


const NFTEditModal = (props) => {

    const { enqueueSnackbar } = useSnackbar();

    let [nftDetail, setNftDetail] = useState({});
    let [isUploadingIPFS, setIsUploadingIPFS] = useState(false);
    let [imageType, setImageType] = useState("");
    let [ipfsHash, setIpfsHash] = useState("");
    let [ipfsURI, setIpfsURI] = useState('');
    let [image, setImage] = useState(r1);
    let [rarities] = useState(["Mastercraft", "Legendary", "Epic", "Rare", "Uncommon", "Common"]);


    useEffect(() => {
        console.log("nft edit Props: ", props);
        setNftDetail(props.nftDetail);
        setImage(props.nftDetail.nftImage);
    },[props.show]);

    let onChangeFile = (e) => {
        setIsUploadingIPFS(true);
        const reader = new window.FileReader();
        let imageNFT = e.target.files[0];
        setImageType(e.target.files[0].type.split("/")[1]);
        console.log("e.target.files[0]", e.target.files[0]);
        // console.log("Image type: ", imageType);
        reader.readAsArrayBuffer(e.target.files[0]);
        reader.onloadend = () => {
            console.log("reader.result", reader.result);
            // setBuffer(Buffer(reader.result));
            ipfs.add(Buffer(reader.result), async (err, result) => {
                if (err) {
                    console.log("err", err);
                    setIsUploadingIPFS(false);
                    let variant = "error";
                    enqueueSnackbar('Unable to Upload Image to IPFS ', { variant });
                    return
                }
                console.log("HASH", result[0].hash);

                setIpfsHash(result[0].hash);
                setIpfsURI(`https://ipfs.io/ipfs/${result[0].hash}`);
                let variant = "success";
                enqueueSnackbar('Image Uploaded to IPFS Successfully', { variant });
                // 
            })
        }
        // setIsUploadingIPFS(true);
        let fileData = new FormData();
        fileData.append("image", imageNFT);
        axios.post("upload/uploadtos3", fileData).then(
            (response) => {
                console.log("response", response);
                setImage(response.data.url);
                let data = {...nftDetail};
                data.nftImage = response.data.url;
                setNftDetail(data);
                setIsUploadingIPFS(false);
                let variant = "success";
                enqueueSnackbar('Image Uploaded to S3 Successfully', { variant });
            },
            (error) => {
                if (process.env.NODE_ENV === "development") {
                    console.log(error);
                    console.log(error.response);
                }
                setIsUploadingIPFS(false);
                let variant = "error";
                enqueueSnackbar('Unable to Upload Image to S3 .', { variant });

            }
        );

    }

    return (
        <Modal show={props.show} onHide={props.handleClose} >
            <Modal.Header closeButton>
                Edit Detail of NFT {nftDetail.title}
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group" >
                        <label>Select Artwork</label>
                        <div className="filter-widget">
                            <div className="form-froup">
                                <div className="change-avatar">
                                    <div className="profile-img">
                                        <div
                                            style={{
                                                background: "#E9ECEF",
                                                width: "100px",
                                                height: "100px",
                                            }}
                                        >
                                            <img src={nftDetail.nftImage} alt="Selfie" />
                                        </div>
                                    </div>
                                    <div className="upload-img">
                                        <div
                                            className="change-photo-btn"
                                            style={{ backgroundColor: "rgb(167,0,0)" }}
                                        >
                                            {isUploadingIPFS ? (
                                                <div className="text-center">
                                                    <Spinner
                                                        animation="border"
                                                        role="status"
                                                        style={{ color: "#fff" }}
                                                    >
                                                    </Spinner>
                                                </div>
                                            ) : (
                                                <span><i className="fa fa-upload"></i>Upload photo</span>
                                            )}

                                            <input
                                                name="sampleFile"
                                                type="file"
                                                className="upload"
                                                accept=".png,.jpg,.jpeg,.gif"
                                                onChange={onChangeFile}
                                            />
                                        </div>
                                        <small className="form-text text-muted">
                                            Allowed JPG, JPEG, PNG, GIF. Max size of 5MB
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                        let data = {...nftDetail};
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
                                        let data = {...nftDetail};
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
                                    getOptionLabel={(option) =>
                                        option
                                    }
                                    onChange={(event, value) => {
                                        if (value == null) {
                                            let data = {...nftDetail};
                                            data.rarity = "";
                                            setNftDetail(data); 
                                        } 
                                        else {
                                            let data = {...nftDetail}
                                            data.rarity = value;
                                            setNftDetail(data);
                                        }
                                    }}
                                    inputValue = {nftDetail.rarity}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Rarity"
                                            variant="outlined"
                                        />
                                    )}
                                />
                            </div>
                            <FormControl component="fieldset">
                                <lable component="legend">Select Supply Type</lable>
                                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                    <FormControlLabel style={{ color: 'black' }} value="Single" onChange={() => {
                                        // setSupplyType("Single");
                                        // setTokenSupply(1);
                                        let data = {...nftDetail};
                                        data.supplytype = "Single";
                                        data.tokensupply = 1
                                        setNftDetail(data);
                                    }} checked={nftDetail.supplytype === 'Single'} control={<Radio color="secondary" />} label="Single" />
                                    <FormControlLabel style={{ color: 'black' }} value="Variable Supply" onChange={() => {
                                        // setSupplyType("Variable")
                                        let data = {...nftDetail};
                                        data.supplytype = "Variable";
                                        data.tokensupply = 1
                                        setNftDetail(data);
                                        // setTokenSupply(1);
                                    }} checked={nftDetail.supplytype === 'Variable'} control={<Radio color="secondary" />} label="Variable Supply" />

                                </RadioGroup>
                            </FormControl>
                            {nftDetail.supplytype === 'Single' ? (
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
                                                    // setTokenSupply(e.target.value);
                                                    let data = {...nftDetail};
                                                    data.tokensupply = e.target.value;
                                                    setNftDetail(data);
                                                }
                                                else {
                                                    // setTokenSupply(1);
                                                    let data = {...nftDetail};
                                                    data.tokensupply = 1;
                                                    setNftDetail(data);
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                        </div>

                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.handleClose} >
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => props.onUpdate(nftDetail)}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
 
export default NFTEditModal;