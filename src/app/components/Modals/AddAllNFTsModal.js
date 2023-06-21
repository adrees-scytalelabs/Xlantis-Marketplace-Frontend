import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Modal, Spinner } from "react-bootstrap";
import WhiteSpinner from "../Spinners/WhiteSpinner";

const AddAllNFTsModal = (props) => {
  // useEffect(() => {
  //   console.log("Props are: ", props);
  // }, []);
  return (
    <Modal show={props.show} onHide={props.handleClose} centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Add All NFTs in Drop</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{ background: "black", border: "1px solid white" }}
        className="modal-scrollbar"
      >
        <div className="form-group">
          <div className="filter-widget newNftWrapper">
            <label>Price</label>
            <input
              value={props.price ?? ""}
              style={{
                backgroundColor: "#000",
                color: "#fff",
                border: "1px solid #fff",
                borderRadius: "5px",
              }}
              type="number"
              required
              placeholder={0}
              className="form-control"
              onChange={(e) => {
                if (e.target.value >= 0) {
                  props.setPrice(e.target.value);
                }
              }}
            />
            <small style={{ fontStyle: "italic" }}>
              *Note: Price will be same for all NFTs in the list below
            </small>
          </div>
          <label>NFT in Collection</label>
          {props.nftList.map((nft, key) => (
            <List
              sx={{
                width: "100%",
                bgcolor: "black",
                border: "1px solid white",
              }}
              key={key}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    variant="square"
                    alt="Remy Sharp"
                    src={nft.previewImageURI ? nft.previewImageURI : nft.nftURI}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={nft.title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="white"
                      >
                        {nft.description.length > 30 ? (
                          <span>{`${nft.description.slice(0, 30)}...`}</span>
                        ) : (
                          <span>{`${nft.description}`}</span>
                        )}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" sx={{ color: "white" }} />
            </List>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer
        style={{
          backgroundColor: "#000",
          border: "1px solid white",
          //   borderTop: "none",
        }}
      >
        <button
          className="newTemplateBtn mb-3"
          style={{ minWidth: "120px" }}
          onClick={() => {
            props.setPrice(null);
            props.handleClose();
          }}
        >
          Close
        </button>
        {props.isUploading ? (
          <button
            style={{
              width: "25%",
              backgroundColor: "#000",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="newTemplateBtn mb-3"
          >
            <Spinner
              animation="border"
              role="status"
              style={{ color: "#fbfeff" }}
            />
          </button>
        ) : (
          <button
            style={{ minWidth: "120px", maxHeight: "40px" }}
            className="newTemplateBtn mb-3"
            onClick={(e) => {
              props.handleAddAllNFTs(e, props.price);
            }}
          >
            Confirm
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default AddAllNFTsModal;
