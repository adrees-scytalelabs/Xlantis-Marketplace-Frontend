import React from 'react'
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Spinner } from "react-bootstrap";

function NewNftForm(props) {
  return (
    <div>
        <form>
              <div className="form-group">
                <label>Select Artwork</label>
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
                          <img src={props.image} alt="Selfie" />
                        </div>
                      </div>
                      <div className="upload-img">
                        <div
                          className="change-photo-btn"
                          style={{ backgroundColor: "rgb(167,0,0)" }}
                        >
                          {props.isUploadingIPFS ? (
                            <div className="text-center">
                              <Spinner
                                animation="border"
                                role="status"
                                style={{ color: "#fff" }}
                              ></Spinner>
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
                            accept=".png,.jpg,.jpeg,.gif"
                            onChange={props.onChangeFile}
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
                  <label>Artwork</label>
                  <div className="form-group">
                    <input
                      type="text"
                      required
                      value={props.name}
                      placeholder="Enter Name of NFT"
                      className="form-control"
                      onChange={(e) => {
                        props.setName(e.target.value);
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <textarea
                      type="text"
                      required
                      rows="4"
                      value={props.description}
                      placeholder="Enter Description of NFT"
                      className="form-control"
                      onChange={(e) => {
                        props.setDescription(e.target.value);
                      }}
                    />
                  </div>
                  <label>Select Rarity</label>
                  <div className="filter-widget">
                    <Autocomplete
                      id="combo-dox-demo"
                      required
                      options={props.rarities}
                      getOptionLabel={(option) => option}
                      onChange={(event, value) => {
                        console.log(value);
                        props.setRarity(value);
                      }}
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
                    <label>Select Supply Type</label>
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
                          props.setSupplyType("Single");
                          props.setTokenSupply(1);
                        }}
                        checked={props.supplyType === "Single"}
                        control={<Radio color="secondary" />}
                        label="Single"
                      />
                      <FormControlLabel
                        style={{ color: "black" }}
                        value="Variable Supply"
                        onChange={() => {
                          props.setSupplyType("Variable");
                          props.setTokenSupply(1);
                        }}
                        checked={props.supplyType === "Variable"}
                        control={<Radio color="secondary" />}
                        label="Variable Supply"
                      />
                    </RadioGroup>
                  </FormControl>
                  {props.supplyType === "Single" ? (
                    <div className="form-group">
                      <label>Token Supply</label>
                      <div className="filter-widget">
                        <input
                          type="number"
                          required
                          value={props.tokenSupply}
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
                          value={props.tokenSupply}
                          className="form-control"
                          onChange={(e) => {
                            if (e.target.value > 0)
                              props.setTokenSupply(e.target.value);
                            else {
                              props.setTokenSupply(1);
                            }
                          }}
                        />
                      </div>
                    </div>
                  )}
                  <div className="form-group">
                    <label>Select Artist</label>
                    <div className="filter-widget">
                      <Autocomplete
                        id="combo-dox-demo"
                        required
                        clearOnBlur
                        options={props.imageArtistTypes}
                        getOptionLabel={(option) => option.Name}
                        onChange={(event, value) => {
                          console.log(value);
                          props.setImageArtistId(value.userId);
                          props.setImageArtist(value.Name);
                          props.setWebsite(value.Website);
                          props.setAboutTheArt(value.About);
                          props.setArtistImage(value.Profile);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Image Artists"
                            variant="outlined"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Select Producer</label>
                    <div className="filter-widget">
                      <Autocomplete
                        id="combo-dox-demo"
                        required
                        clearOnBlur
                        options={props.producerTypes}
                        getOptionLabel={(option) => option.Name}
                        onChange={(event, value) => {
                          console.log(value);
                          props.setProducerId(value.userId);
                          props.setProducer(value.Name);
                          props.setInspirationForThePiece(value.Inspiration);
                          props.setProducerImage(value.Profile);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Producers"
                            variant="outlined"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Select Executive Producer</label>
                    <div className="filter-widget">
                      <Autocomplete
                        id="combo-dox-demo"
                        required
                        clearOnBlur
                        options={props.executiveProducerTypes}
                        getOptionLabel={(option) => option.Name}
                        onChange={(event, value) => {
                          console.log(value);
                          props.setExecutiveProducerId(value.userId);
                          props.setExecutiveProducer(value.Name);
                          props.setExecutiveInspirationForThePiece(value.Inspiration);
                          props.setExecutiveProducerImage(value.Profile);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Executive Producers"
                            variant="outlined"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Select Fan</label>
                    <div className="filter-widget">
                      <Autocomplete
                        id="combo-dox-demo"
                        required
                        options={props.fans}
                        getOptionLabel={(option) => option.Name}
                        onChange={(event, value) => {
                          console.log(value);
                          props.setFanId(value.userId);
                          props.setFan(value.Name);
                          props.setFanImage(value.Profile);
                          props.setFanInspirationForThePiece(value.Inspiration);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Fans"
                            variant="outlined"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Other</label>
                    <input
                      type="text"
                      required
                      value={props.other}
                      placeholder="Enter other"
                      className="form-control"
                      onChange={(e) => {
                        props.setOther(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Select Collection</label>
                    <div className="filter-widget">
                      <Autocomplete
                        id="combo-dox-demo"
                        required
                        options={props.collectionTypes}
                        getOptionLabel={(option) => option.collectiontitle}
                        onChange={(event, value) => {
                          console.log(value);
                          props.setCollection(value.collectiontitle);
                          props.setCollectionId(value._id);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Collections"
                            variant="outlined"
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
                <button
                  className="btn"
                  type="button"
                  onClick={() => props.handleAddClick()}
                >
                  <i className="fa fa-plus"></i> Add NFT to queue
                </button>
              </div>
            </form>
    </div>
  )
}

export default NewNftForm