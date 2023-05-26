import { CardMedia } from "@mui/material";
import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";

const styles = {
  media: {
    marginTop: "15px",
    paddingTop: "100%",
    // width: "50%",
    // height: "50%",
  },
};

const CollectionSaleModal = ({
  show,
  handleClose,
  collectionDetail,
  startTime,
  endTime,
  setCurrentTimeStamp,
  setStartTimeStamp,
  setStartTime,
  setEndTime,
  setEndTimeStamp,
  handleOpenWorkProgressModal,
}) => {
  useEffect(() => {
    console.log("Props in collection sale modal", {
      show,
      handleClose,
      collectionDetail,
    });
  }, [collectionDetail]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>Sale Collection</Modal.Header>
      <Modal.Body
        style={{
          backgroundColor: "black",
          color: "white",
          border: "1px solid white",
        }}
      >
        <div className="row">
          <div className="col-6">
            <h3>Set Price</h3>
            <div className="input-group form-group newNftWrapper bg-transparent">
              <input
                type="number"
                required
                // value={values ?? ""}
                placeholder="0"
                className="form-control newNftInput bg-transparent"
                // onChange={(e) => {
                //   if (e.target.value >= 0) {
                //     setRoyaltyFee(e.target.value);
                //   }
                // }}
              />
            </div>
          </div>
          <div className="col-6">
            <CardMedia
              sx={styles.media}
              title="Collection thumbnail"
              image={collectionDetail.thumbnail}
            />
          </div>
        </div>
        <h3>Duration</h3>
        <div className="datePicker col-12">
          <label style={{ fontWeight: "bold", fontFamily: "poppins" }}>
            Starts At
          </label>
          <div className="form-group" style={{ borderRadius: "12px" }}>
            <DateTimePicker
              className="form-control"
              onChange={(e) => {
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
                setEndTimeStamp(Math.round(e.getTime() / 1000));
                setEndTime(e);
              }}
              value={endTime}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer
        style={{
          border: "1px solid white",
          backgroundColor: "black",
        }}
      >
        <Button
          style={{ backgroundColor: "transparent" }}
          onClick={handleClose}
        >
          Close
        </Button>
        <Button
          style={{ backgroundColor: "transparent" }}
          onClick={handleOpenWorkProgressModal}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CollectionSaleModal;
