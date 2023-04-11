import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CubeComponent1 from '../Cube/CubeComponent1';
import CardHeaderWithAvatar from '../CardHeader/CardHeaderWithAvatar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 300,
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

function DropsCubeCard({imageData,i,index}) {
    const classes = useStyles();
  return (
    <div>
        <Card style={{ height: "100%" }} variant="outlined" className={classes.root}>
                                            
                                            <CardActionArea>
                                                <CardMedia
                                                    className={classes.media}
                                                    
                                                    title=""
                                                >
                                                    <CubeComponent1 data={imageData} index={index} />
                                                </CardMedia>
                                                <CardContent>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        <strong>Cube Title: </strong>{i.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        <strong>Cube Description: </strong>{i.description}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        <strong>Sale Price: </strong>{i.SalePrice / 10 ** 18} ETH
                                                    </Typography>
                                                    <Typography variant="h6" gutterBottom color="textSecondary" className="text-center">Music Artist</Typography>
                                                    <Link to={"/User/Profile/Detail/musicArtist/" + i.MusicArtistId + "/null"} style={{ color: '#000' }}>
                                                        <CardHeaderWithAvatar
                                                            src={i.MusicArtistProfile} 
                                                            title={i.MusicArtistName}
                                                            subheader={i.MusicArtistAbout}
                                                        />
                                                    </Link>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions>

                                            </CardActions>
                                        </Card>
    </div>
  )
}

export default DropsCubeCard