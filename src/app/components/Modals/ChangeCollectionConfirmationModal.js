import {
  Autocomplete,
  Box,
  Button,
  Container,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { style } from "../styles/MuiModalStyle";

const ChangeCollectionConfirmationModal = (props) => {
  const [collection, setCollection] = useState({});
  const [collections, setCollections] = useState([]);
  const [collectionName, setCollectionName] = useState("");

  useEffect(() => {
    setCollections(props.collectionDetails);
  });

  return (
    <Modal open={props.show} onClose={props.handleClose}>
      <Box sx={style.box}>
        {/* HEADER CONTAINER */}
        <Container sx={style.containerHeader}>
          <div>
            <Typography sx={style.text}>Change Collection?</Typography>
          </div>
          <div>
            <IconButton sx={{ color: "white" }}>
              <CloseIcon onClick={props.handleClose} />
            </IconButton>
          </div>
        </Container>

        {/* BODY */}
        <Container sx={style.containerBody}>
          <div>
            It will change collection for all <strong>NFTs.</strong> Are you
            sure you want to change <strong>Collection?</strong>
          </div>
          <div className="form-group">
            <label>Select Collection</label>
            <div className="filter-widget">
              <Autocomplete
                id="combo-dox-demo"
                options={collections}
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => {
                  if (value == null) setCollectionName("");
                  else {
                    console.log(value);
                    setCollectionName(value.name);
                    setCollection(value);
                    console.log("Value: ", value);
                  }
                }}
                inputValue={collectionName}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Collections"
                    variant="outlined"
                  />
                )}
              />
            </div>
          </div>
        </Container>

        {/* FOOTER CONTAINER */}
        <Container sx={style.containerFooter}>
          <Button
            variant="primary"
            onClick={() => {
              setCollection({});
              setCollectionName("");
              props.handleClose();
            }}
          >
            Cancel
          </Button>
          <button
            type="button"
            className="btn btn-submit"
            onClick={() => {
              setCollection({});
              setCollectionName("");
              props.updateChangeCollection(collection);
            }}
          >
            Change
          </button>
        </Container>
      </Box>
    </Modal>
  );
};

export default ChangeCollectionConfirmationModal;
