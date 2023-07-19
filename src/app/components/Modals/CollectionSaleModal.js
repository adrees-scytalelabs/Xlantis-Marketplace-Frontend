import { Box, CardMedia, Container, Modal, Typography } from "@mui/material";
import React, { useEffect } from "react";
import DateTimePicker from "react-datetime-picker";
import Button from "@mui/material/Button";
import { style } from "../styles/MuiModalStyle";

const styles = {
  media: {
    marginTop: "15px",
    paddingTop: "100%",
    // width: "50%",
    // height: "50%",
  },
  buttons: {
    margin: "5px 0px 5px 7px",
    backgroundColor: "#000",
    border: "1px solid #F64D04",
    color: "#fff",
    padding: "10px",
    fontFamily: "orbitron",
    "&:hover": {
      boxShadow: "0px 0px 20px 5px rgb(246 77 4 / 35%)",
    },
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
    <Modal open={show} onClose={handleClose}>
      <Box sx={style.box}>
        {/* HEADER CONTAINER */}
        <Container sx={style.containerHeader}>
          <div>
            <Typography sx={style.text}>Sale Collection</Typography>
          </div>
        </Container>

        {/* BODY */}
        <Container sx={style.containerBody}>
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
        </Container>

        {/* FOOTER CONTAINER */}
        <Container sx={style.containerFooter}>
          <Button
            style={{ backgroundColor: "transparent" }}
            sx={styles.buttons}
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            style={{ backgroundColor: "transparent" }}
            sx={styles.buttons}
            onClick={handleOpenWorkProgressModal}
          >
            Confirm
          </Button>
        </Container>
      </Box>
    </Modal>
  );
};

export default CollectionSaleModal;
