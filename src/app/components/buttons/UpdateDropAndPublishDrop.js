import React from 'react'
import { Spinner } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";

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
        buttonName
    }) {

    

  return (
    <div>
        <div className="submit-section col-md-12 col-lg-6 col-sm-12">
          <button
            type="button"
            disabled={isDisabled}
            onClick={(e) => {
              handleSubmitEvent(e);
            }}
            style={{ float: "right", marginBottom: "5%" }}
            className={buttonName}
          >
            Update Drop
          </button>
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
                onChange={(e) => {
                  console.log(e);
                  console.log("START", Math.round(e.getTime() / 1000));
                  console.log("NOW", Math.round(Date.now() / 1000));

                  setCurrentTimeStamp(Number(Math.round(Date.now()) / 1000));
                  setStartTimeStamp(Number(Math.round(e.getTime()) / 1000));

                  setStartTime(e);
                }}
                value={startTime}
              />
            </div>
            <label style={{ fontWeight: "bold", fontFamily: "poppins" }}>
              Ends At
            </label>
            <div className="form-group newNftWrapper">
              <DateTimePicker
                className="form-control"
                onChange={(e) => {
                  console.log(e);
                  console.log("e.getTime()", Math.round(e.getTime() / 1000));
                  setEndTimeStamp(Math.round(e.getTime() / 1000));
                  setEndTime(e);
                }}
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
  )
}

export default UpdateDropAndPublishDrop;