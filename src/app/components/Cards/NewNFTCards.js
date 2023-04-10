
import { Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/bootstrap.min.css";
import "../../assets/css/style.css";
import "../../assets/plugins/fontawesome/css/all.min.css";
import "../../assets/plugins/fontawesome/css/fontawesome.min.css";
import CardHeaderWithAvatar from '../CardHeader/CardHeaderWithAvatar';
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

function NewNFTCard(props) {
    const classes = useStyles();
    return (
        <Grid item xs={12} sm={6} md={6} >
            <Card style={{ height: "100%" }} variant="outlined">
                <CardHeader className="text-center"
                    title={props.data.title}
                />
                <CardMedia
                    variant="outlined" style={{ border: props.data.type === "Mastercraft" ? '4px solid #ff0000' : props.data.type === "Legendary" ? '4px solid #FFD700' : props.data.type === "Epic" ? '4px solid #9400D3' : props.data.type === "Rare" ? '4px solid #0000FF' : props.data.type === "Uncommon" ? '4px solid #008000' : props.data.type === "Common" ? '4px solid #FFFFFF' : 'none' }}
                    className={classes.media}
                    image={props.data.artwork}
                    title="NFT Image"
                /> 
                <CardContent>
                    <TypographyText variant = "body2" key = "Artwork Description: " value = {props.data.description} isSpan = {false}></TypographyText>
                    <TypographyText variant = "body2" key = "Token Rarity: " value = {props.data.type}></TypographyText>
                    <TypographyText variant = "body2" key = "Token Supply: " value = {props.data.tokensupplyalternative}></TypographyText>
   
                    <TypographyText variant = "h6" value = "Image Artist"></TypographyText>
                    <Link to={"/User/Profile/Detail/imageArtist/" + props.data.ImageArtistId + "/null"} style={{ color: '#000' }}>
                        <CardHeaderWithAvatar
                            src={props.data.ImageArtistProfile}
                            title={props.data.ImageArtistName}
                            subheader={props.data.ImageArtistAbout}
                        />
                    </Link>
                    <TypographyText variant = "body2" key = "Website URL: " value = {props.data.ImageArtistWebsite}></TypographyText>
                    <TypographyText variant = "h6" value = "Producer"></TypographyText>

                    <Link to={"/User/Profile/Detail/producer/" + props.data.ProducerId + "/null"} style={{ color: '#000' }}>
                        <CardHeaderWithAvatar
                            src={props.data.ProducerProfile} 
                            title={props.data.ProducerName}
                            subheader={props.data.ProducerInspiration}
                        />
                    </Link>
                    <TypographyText variant = "h6" value = "Executive Producer"></TypographyText>
                    <Link to={"/User/Profile/Detail/executiveProducer/" + props.data.ExecutiveProducerId + "/null"} style={{ color: '#000' }}>
                        <CardHeaderWithAvatar
                            src={props.data.ExecutiveProducerProfile} 
                            title={props.data.ExecutiveProducerName}
                            subheader={props.data.ExecutiveProducerInspiration}
                        />
                    </Link>
                    <TypographyText variant = "h6" value = "Fan"></TypographyText>
                    <Link to={"/User/Profile/Detail/fan/" + props.data.FanId + "/null"} style={{ color: '#000' }}>
                        <CardHeaderWithAvatar
                            src={props.data.FanProfile}
                            title={props.data.FanName}
                            subheader={props.data.FanInspiration}
                        />
                    </Link>
                    <TypographyText key = "Other: " value = {props.data.other}></TypographyText>
                    
                </CardContent>
            </Card>
        </Grid>
    );
}

export default NewNFTCard;
//User/Profile/Detail/userId