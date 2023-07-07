import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { Modal, Spinner } from "react-bootstrap";

const AddAllNFTsModal = (props) => {
  const changePrice = (e) =>{
    props.setPrice(e.target.value);
    if(e.target.value<0.5){
      props.setIsPriceValid(false)
    }
    else{
      props.setIsPriceValid(true);
    }
  }
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
            <label>Price (USD)</label>
            <input
              disabled={props?.isPriceDisable}
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
                const value = e.target.value;
                const regex = /^\d*\.?\d{0,2}$/;
                if (regex.test(value)) {
                  changePrice(e)
                }
              }}
            />
            <small style={{ fontStyle: "italic" }}>
              *Note: Price will be same for all NFTs in the list below
            </small>
            <br />
            {props.isPriceValid ? null : (
              <span style={{ fontStyle: "bold", color: "red" }}>
                *Note: Price cannot be less than 0.5 or null
              </span>
            )}
          </div>
          <label>NFT in Collection</label>
          {props.nftList?.map((nft, key) => (
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
                    src={
                      nft?.previewImageURI ? nft?.previewImageURI : nft?.nftURI
                    }
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={nft?.title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="white"
                      >
                        {nft?.description?.length > 30 ? (
                          <span>{`${nft?.description?.slice(0, 30)}...`}</span>
                        ) : (
                          <span>{`${nft?.description}`}</span>
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
