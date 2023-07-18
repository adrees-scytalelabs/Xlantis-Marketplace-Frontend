import React, { useState } from "react";
import { Modal, Form, Row, Col } from "react-bootstrap";
import SelectNFTAndSaleType from "../Radio/SelectNFTAndSaleType";
import DateTimePicker from "react-datetime-picker";
import NFTMediaCard from "../Cards/AuctionNFTCards/NFTMediaCard";
import Button from "@mui/material/Button";

const stylesMUI = {
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

const NFTSale = ({
  show,
  handleClose,
  setWorkProgressModalShow,
  setNftType,
  nftType,
  nftDetail,
  styles,
  setCurrentTimeStamp,
  setStartTime,
  startTime,
  setStartTimeStamp,
  setEndTimeStamp,
  setEndTime,
  endTime,
  openSummaryModal,
}) => {
  const [num, setNum] = useState(0);
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header
        closeButton
        style={{
          border: "1px solid white",
          backgroundColor: "black",
        }}
        className="custom-header"
      >
        <Modal.Title style={{ color: "white" }}>List for Sale</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundColor: "black",
          color: "white",
          border: "1px solid white",
        }}
      >
        <Form>
          <Row>
            <Col xs={6}>
              <SelectNFTAndSaleType
                label="Select NFT Type"
                onChangeWorkInProgress={() => {
                  setWorkProgressModalShow(true);
                }}
                onChange={() => {
                  setNftType("1155");
                }}
                type={nftType}
                radioType="nft"
              ></SelectNFTAndSaleType>
            </Col>
            <Col xs={6}>
              <div className="col-12">
                <NFTMediaCard nftDetail={nftDetail} classes={styles} />
              </div>
            </Col>
          </Row>
          <h3 className="mt-3 mb-3">Set Price</h3>
          <div className="mb-3">
            <Button
              className="mb-4"
              style={{
                marginRight: "10px",
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "transparent",
              }}
              sx={stylesMUI.buttons}
              onClick={(e) => {
                setNum(1);
              }}
            >
              Floor <br />
              <label style={{ fontSize: "6px" }}>1 USD</label>
            </Button>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={num}
              style={{
                borderColor: "white",
                color: "white",
                backgroundColor: "black",
              }}
            />
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
        </Form>
      </Modal.Body>
      <Modal.Footer
        style={{
          border: "1px solid white",
          justifyContent: "space-between",
          backgroundColor: "black",
        }}
      >
        <Button
          sx={stylesMUI.buttons}
          style={{ backgroundColor: "transparent" }}
          onClick={handleClose}
        >
          Close
        </Button>
        <Button
          sx={stylesMUI.buttons}
          style={{ backgroundColor: "transparent" }}
          onClick={openSummaryModal}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NFTSale;
