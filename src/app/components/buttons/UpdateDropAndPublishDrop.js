import React from "react";
import { Spinner } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

function UpdateDropAndPublishDrop({
  isDisabled,
  versionB,
  handleSubmitEvent,
  enableTime,
  setCurrentTimeStamp,
  setStartTimeStamp,
  setStartTime,
  startTime,
  setEndTimeStamp,
  setEndTime,
  endTime,
  isSaving,
  handleOpenModal,
  handlePublishEvent,
  buttonName,
}) {
  const handleStartTimeChange = (e) => {
    setCurrentTimeStamp(Number(Math.round(Date.now()) / 1000));
    setStartTimeStamp(Number(Math.round(e.getTime()) / 1000));
    setStartTime(e);
  };

  const handleEndTimeChange = (e) => {
    console.log(e);
    console.log("END", Math.round(e.getTime() / 1000));
    setEndTimeStamp(Math.round(e.getTime() / 1000));
    setEndTime(e);
  };

  return (
    <div className="mb-3">
      <div className="submit-section col-md-12 col-lg-6 col-sm-12">
        {!enableTime && (
          <button
            type="button"
            disabled={isDisabled}
            onClick={(e) => {
              handleSubmitEvent(e);
            }}
            style={{ float: "right", marginBottom: "5%" }}
            className="bttn"
          >
            Update Drop
          </button>
        )}
      </div>
      {enableTime && (
        <div
          className="datePicker col-md-12 col-lg-6 col-sm-12"
          style={{ marginTop: "5%" }}
        >
          <label style={{ fontWeight: "bold", fontFamily: "poppins" }}>
            Starts At
          </label>
          <div className="form-group" style={{ borderRadius: "12px" }}>
            <DateTimePicker
              className="form-control"
              onChange={handleStartTimeChange}
              value={startTime}
            />
          </div>
          <label style={{ fontWeight: "bold", fontFamily: "poppins" }}>
            Ends At
          </label>
          <div className="form-group newNftWrapper">
            <DateTimePicker
              className="form-control"
              onChange={handleEndTimeChange}
              value={endTime}
            />
          </div>
          <div className="submit-section" style={{ marginBottom: "3%" }}>
            {isSaving ? (
              <div className="text-center">
                <Spinner
                  animation="border"
                  role="status"
                  style={{ color: "#fff" }}
                >
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <button
                type="button"
                className="bttn"
                style={{ float: "right" }}
                onClick={(e) => {
                  versionB === "v1-sso"
                    ? handleOpenModal(e)
                    : handlePublishEvent(e);
                }}
              >
                Publish Drop
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateDropAndPublishDrop;
