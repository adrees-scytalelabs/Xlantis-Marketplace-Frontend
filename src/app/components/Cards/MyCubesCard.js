import React from 'react'
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardHeaderWithAvatar from '../CardHeader/CardHeaderWithAvatar';
import { Link } from "react-router-dom";
import CubeComponent1 from '../Cube/CubeComponent1';


function MyCubesCard({classes,imageData,i,index}) {
  return (
    <div>
        <Card
                        style={{ height: "100%" }}
                        variant="outlined"
                        className={classes.root}
                      >
                        <CardActionArea>
                          <CardMedia
                            className={classes.media}
                            
                            title=""
                          >
                            <CubeComponent1 data={imageData} index={index} />
                          </CardMedia>
                          <CardContent>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              <strong>Cube Title: </strong>
                              {i.title}
                            </Typography>

                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              <strong>Cube Description: </strong>
                              {i.description}
                            </Typography>

                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              <strong>Sale Price: </strong>
                              {i.SalePrice / 10 ** 18} ETH
                            </Typography>
                            <Typography
                              variant="h6"
                              gutterBottom
                              color="textSecondary"
                              className="text-center"
                            >
                              Music Artist
                            </Typography>
                            <Link
                              to={
                                "/User/Profile/Detail/musicArtist/" +
                                i.MusicArtistId +
                                "/null"
                              }
                              style={{ color: "#000" }}
                            >
                              <CardHeaderWithAvatar
                                src={i.MusicArtistProfile}
                                title={i.MusicArtistName}
                                subheader={i.MusicArtistAbout}
                              />
                            </Link>
                          </CardContent>
                        </CardActionArea>
                        <CardActions></CardActions>
                      </Card>
    </div>
  )
}

export default MyCubesCard