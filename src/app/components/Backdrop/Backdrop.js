
import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const styles = {
    backdrop: {
        zIndex: 2500,
        color: "#fff",
    },

}
function CircularBackdrop(props) {
    return (
        <Backdrop sx={styles.backdrop} open={props.open}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );



}

export default CircularBackdrop;
