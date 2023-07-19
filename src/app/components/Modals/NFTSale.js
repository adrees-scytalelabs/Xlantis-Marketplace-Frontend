import {
  Grid,
  TextField,
  ThemeProvider,
  createTheme,
  Modal,
  Container,
  Box,
  Typography,
  IconButton
} from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import NFTMediaCard from "../Cards/AuctionNFTCards/NFTMediaCard";
import SelectNFTAndSaleType from "../Radio/SelectNFTAndSaleType";
import { style } from "../styles/MuiModalStyle";
import CloseIcon from "@mui/icons-material/Close";

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
const theme = createTheme({
  components: {
    MuiModal: {
      styleOverrides: {
        backdrop: {
          pointerEvents: "none",
        },
      },
    },
  },
});
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
    <ThemeProvider theme={theme}>
      <Modal show={show} onClose={handleClose}>
        <Box sx={style.box}>
          <Container sx={style.containerHeader}>
            <div>
              <Typography sx={style.text}>List for Sale</Typography>
            </div>
            <div>
              <IconButton sx={{ color: "white" }}>
                <CloseIcon onClick={handleClose} />
              </IconButton>
            </div>
          </Container>
          <Container sx={style.containerBody}>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
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
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <div className="col-12">
                  <NFTMediaCard nftDetail={nftDetail} classes={styles} />
                </div>
              </Grid>
            </Grid>
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
              <TextField
                type="number"
                placeholder="Enter price"
                value={num}
                fullWidth
                InputProps={{
                  style: {
                    borderColor: "white",
                    color: "white",
                    backgroundColor: "black",
                  },
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
          </Container>
          <Container sx={style.containerFooter}>
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
          </Container>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default NFTSale;
