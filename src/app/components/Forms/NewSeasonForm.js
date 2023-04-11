import React from 'react'
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { Spinner } from "react-bootstrap";

function NewSeasonForm(props) {
  return (
    <div>
        <form onSubmit={props.handleSubmitEvent}>
              <div className="form-group">
                <label>Select Drops</label>
                <div className="filter-widget">
                  <Autocomplete
                    id="combo-dox-demo"
                    required
                    options={props.inputList}
                    value={props.type}
                    getOptionLabel={(option) => option.title}
                    onChange={(event, value) => {
                      if (value == null) props.setType("");
                      else {
                        console.log(value);
                        props.setType(value.title);
                        props.handleAddClick(value);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Drops" variant="outlined" />
                    )}
                  />
                </div>
                <div className="form-group">
                  <label>Season Name</label>
                  <div className="form-group">
                    <input
                      type="text"
                      required
                      value={props.name}
                      placeholder="Enter Name of Season"
                      className="form-control"
                      onChange={(e) => {
                        props.setName(e.target.value);
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label>Season Description</label>
                    <textarea
                      type="text"
                      required
                      rows="4"
                      value={props.description}
                      placeholder="Enter Description of Season"
                      className="form-control"
                      onChange={(e) => {
                        props.setDescription(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Select Title Image</label>
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
                              {props.isUploading ? (
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
                  </div>
                </div>
              </div>
            </form>
    </div>
  )
}

export default NewSeasonForm