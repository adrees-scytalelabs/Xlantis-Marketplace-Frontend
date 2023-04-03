
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState } from "react";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "../../assets/plugins/fontawesome/css/all.min.css";
import "../../assets/plugins/fontawesome/css/fontawesome.min.css";


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 300,
    },
});

function NFTCube(props) {
    const classes = useStyles();
    const [hide, setHide] = useState(false);

    return (
        <Grid item xs={12} sm={6} md={3}>
            <Card className={classes.root}>

                <CardActionArea>

                    <CardMedia
                        className={classes.media}
                        title=""
                    >
                        {hide ? (
                            <div className="App">
                                <div
                                    style={{
                                        width: 230,
                                        height: 230,
                                        marginTop: '150px',

                                    }}
                                >

                                </div>
                            </div>

                        ) : (
                            <div className="mainDiv">
                                <div className="square" onClick={() => {
                                    setHide(true);
                                    setTimeout(() => setHide(false), 10000);
                                }}></div>
                                <div className="square2" onClick={() => {
                                    setHide(true);
                                    setTimeout(() => setHide(false), 10000);
                                }}></div>
                                <div className="square3" onClick={() => {
                                    setHide(true);
                                    setTimeout(() => setHide(false), 10000);
                                }}></div>
                            </div>
                        )}

                    </CardMedia>
                    <CardContent>
                        <Typography gutterBottom variant="h6" style={{ fontSize: '13px' }} >
                            Name : Robot
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            price:0.0 ETH
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                </CardActions>
            </Card>
        </Grid >
    );
}

export default NFTCube;
