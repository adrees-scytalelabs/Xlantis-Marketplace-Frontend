import React from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import SelectNFTAndSaleType from "../Radio/SelectNFTAndSaleType";
import DateTimePicker from "react-datetime-picker";
import NFTMediaCard from "../Cards/AuctionNFTCards/NFTMediaCard";

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
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header
        closeButton
        style={{
          border: "1px solid white",
          backgroundColor: "black",
        }}
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
                  console.log("721workinf");
                  setWorkProgressModalShow(true);
                }}
                onChange={() => {
                  console.log("1155working");
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
              variant="outline-light"
              style={{
                marginRight: "10px",
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "transparent",
              }}
              onClick={() => {}}
            >
              Floor <br />
              <label style={{ fontSize: "6px" }}>1 USD</label>
            </Button>
            <Form.Control
              type="number"
              placeholder="Enter price"
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
                //   console.log(e);
                //   console.log("START", Math.round(e.getTime() / 1000));
                //   console.log("NOW", Math.round(Date.now() / 1000));

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
                //   console.log(e);
                //   console.log("e.getTime()", Math.round(e.getTime() / 1000));
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
          style={{ backgroundColor: "transparent" }}
          onClick={handleClose}
        >
          Close
        </Button>
        <Button
          style={{ backgroundColor: "transparent" }}
          onClick={handleClose}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NFTSale;
