
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "../../assets/plugins/fontawesome/css/all.min.css";
import "../../assets/plugins/fontawesome/css/fontawesome.min.css";
import TypographyText from '../Typography/TypographyText';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    badge: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },

    card: {
        minWidth: 250,
    },
    media: {
        height: 0,
        paddingTop: '100%',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

function TxHistory(props) {
    const classes = useStyles();
    return (
        <Grid item xs={12} sm={12} md={12}>
            <Card className={classes.root}>
                <CardActionArea style={{ margin: '5px' }}>

                    <TypographyText key = "From : " component="p" variant="body2" isSpan = {false} value = {props.data.from}></TypographyText>
                    <TypographyText key = "To : " component="p" variant="body2" isSpan = {false} value = {props.data.to}></TypographyText>
                    <TypographyText key = "Hash : " component="p" variant="body2" isSpan = {false} value = {<div><a href={"https://ropsten.etherscan.io/tx/" + props.data.transaction} target="_blank" rel="noopener noreferrer" style={{ color: 'rgb(167,0,0)' }}>
                            <span style={{ cursor: 'pointer' }}>{props.data.transaction.substr(0, 20)}. . .</span>
                        </a></div>}></TypographyText>
                </CardActionArea>
            </Card>
        </Grid>
    );
}

export default TxHistory;
