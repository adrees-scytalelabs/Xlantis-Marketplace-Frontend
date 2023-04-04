import { CircularProgress, makeStyles } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import React from "react";


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },

}));
function CircularBackdrop(props) {
    const classes = useStyles();
    return (
        <Backdrop className={classes.backdrop} open={props.open}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );



}

export default CircularBackdrop;
