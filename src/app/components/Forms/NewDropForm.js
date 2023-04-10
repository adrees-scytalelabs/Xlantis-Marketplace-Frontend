import React from 'react'
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import DateTimePicker from "react-datetime-picker";
import { Spinner } from "react-bootstrap";

function NewDropForm({
    handleSubmitEvent,
    inputList,
    handleAddClick,
    setName,
    name,
    setDescription,
    description,
    image,
    isUploading,
    onChangeFile,
    setStartTimeStamp,
    setStartTime,
    startTime,
    setEndTimeStamp,
    setEndTime,
    endTime,
    setMinimumBid,
    minimumBid,
    setBidDelta,
    bidDelta
}) {
  return (
    <div>
        <form onSubmit={handleSubmitEvent}>
              <div className="form-group">
                <label>Select Cubes</label>
                <div className="filter-widget">
                  <Autocomplete
                    id="combo-dox-demo"
                    required
                    options={inputList}
                    getOptionLabel={(option) =>
                      option.title + "," + option.SalePrice / 10 ** 18
                    }
                    onChange={(event, value) => {
                      if (value !== null) {
                        console.log(value, event);
                        handleAddClick(value);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Cubes" variant="outlined" />
                    )}
                  />
                </div>
                <div className="form-group">
                  <label>Drop Name</label>
                  <div className="form-group">
                    <input
                      type="text"
                      required
                      value={name}
                      placeholder="Enter Name of Drop"
                      className="form-control"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Drop Description</label>
                    <textarea
                      type="text"
                      required
                      rows="4"
                      value={description}
                      placeholder="Enter Description of Drop"
                      className="form-control"
                      onChange={(e) => {
                        setDescription(e.target.value);
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
                              <img src={image} alt="Selfie" />
                            </div>
                          </div>
                          <div className="upload-img">
                            <div
                              className="change-photo-btn"
                              style={{ backgroundColor: "rgb(167,0,0)" }}
                            >
                              {isUploading ? (
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
                  </div>
                </div>
                <div className="form-group">
                  <label>Auction Starts At</label>
                  <div className="form-group">
                    <DateTimePicker
                      className="form-control"
                      onChange={(e) => {
                        console.log(e);
                        console.log(
                          "e.getTime()",
                          Math.round(e.getTime() / 1000)
                        );
                        setStartTimeStamp(Math.round(e.getTime() / 1000));
                        setStartTime(e);
                      }}
                      value={startTime}
                    />
                  </div>
                  <label>Auction Ends At</label>
                  <div className="form-group">
                    <DateTimePicker
                      className="form-control"
                      onChange={(e) => {
                        console.log(e);
                        console.log(
                          "e.getTime()",
                          Math.round(e.getTime() / 1000)
                        );
                        setEndTimeStamp(Math.round(e.getTime() / 1000));
                        setEndTime(e);
                      }}
                      value={endTime}
                    />
                  </div>
                  <label>Minimum Bid (WETH)</label>
                  <div className="form-group">
                    <div className="filter-widget">
                      <input
                        type="number"
                        required
                        value={minimumBid}
                        className="form-control"
                        onChange={(e) => {
                          if (e.target.value > 0) {
                            setMinimumBid(e.target.value);
                          } else {
                            setMinimumBid(0);
                          }
                        }}
                      />
                    </div>
                  </div>
                  <label>Bid Delta (WETH)</label>
                  <div className="form-group">
                    <div className="filter-widget">
                      <input
                        type="number"
                        required
                        min="0"
                        value={bidDelta}
                        className="form-control"
                        onChange={(e) => {
                          if (e.target.value > 0) {
                            setBidDelta(e.target.value);
                          } else {
                            setBidDelta(0);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
    </div>
  )
}

export default NewDropForm