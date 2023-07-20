import { Box, Container, Grid, Modal, Typography } from "@mui/material";
import React from "react";
import MessageCard from "../MessageCards/MessageCard";
import { style } from "../styles/MuiModalStyle";

const BalanceSpentModal = (props) => {
  return (
    <Modal open={props.show} onClose={props.handleClose}>
      <Box sx={style.box}>
        {/* HEADER CONTAINER */}
        <Container sx={style.containerHeader} className="NewTemplateHeader">
          <div>
            <Typography sx={style.text}>Balance Spent Details</Typography>
          </div>
        </Container>

        {/* BODY */}
        <Container sx={style.containerBody} className="NewTemplateBody">
          {props?.balanceHistoryModalData?.txInfo?.length > 0 ? (
            <div style={{ margin: "10px" }}>
              {props?.balanceHistoryModalData?.txInfo?.map((info, index) => {
                return (
                  <Grid container spacing={1} className="p-2">
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      {info?.name}
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      ${info?.amountInUsd?.toFixed(5)}
                    </Grid>
                  </Grid>
                );
              })}
            </div>
          ) : (
            <div style={{ margin: "10px" }}>
              <MessageCard msg="No Details Available" />
            </div>
          )}
        </Container>

        {/* FOOTER CONTAINER */}
        <Container sx={style.containerFooter}>
          <button className="newTemplateBtn mb-3" onClick={props.handleClose}>
            Close
          </button>
        </Container>
      </Box>
    </Modal>
  );
};

export default BalanceSpentModal;
