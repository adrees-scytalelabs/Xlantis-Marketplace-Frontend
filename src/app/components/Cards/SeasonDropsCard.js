import { Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import React from 'react';
import Countdown from 'react-countdown';
const styles = {
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '100%',
    },
}

function SeasonDropsCard({ i }) {
    return (
        <div>
            <Card style={{ height: "100%" }} variant="outlined" sx={styles.root}>
                <CardActionArea>
                    <CardHeader className="text-center"
                        title={i[0].title}
                    />
                    <CardMedia
                        sx={styles.media}
                        image={i[0].image}
                        title=""
                    >
                    </CardMedia>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <strong>Drop Description: </strong>{i[0].description}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <strong>Minimum Bid: </strong>{i[0].MinimumBid / 10 ** 18} WETH
                        </Typography>
                        <Typography variant="h6" gutterBottom color="textSecondary" className="text-center">
                            {new Date() < new Date(i[0].AuctionStartsAt) ? (
                                <div style={{ color: "#00FF00" }} >

                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <strong>Auction Starts At:</strong>
                                    </Typography>
                                    {console.log("Date(i[0].AuctionStartsAt)", Date(i[0].AuctionStartsAt))}
                                    <Countdown daysInHours date={new Date(i[0].AuctionStartsAt)}>
                                    </Countdown>
                                </div>
                            ) : new Date() > new Date(i[0].AuctionStartsAt) && new Date() < new Date(i[0].AuctionEndsAt) ? (
                                <div style={{ color: "#FF0000" }}>
                                    {console.log("Date(i[0].AuctionStartsAt)", Date(i[0].AuctionEndsAt.toLoca))}
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <strong>Auction Ends At:</strong>
                                    </Typography>
                                    <Countdown daysInHours date={new Date(i[0].AuctionEndsAt)}>
                                    </Countdown>
                                </div>) : (
                                <Typography variant="body2" style={{ color: "#FF0000" }} component="p">
                                    <strong>Auction Ended</strong>
                                </Typography>
                            )}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>

                </CardActions>
            </Card>
        </div>
    )
}

export default SeasonDropsCard