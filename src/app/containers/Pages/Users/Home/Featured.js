import { Card, CardActionArea, CardMedia, Grid } from "@mui/material";
import React from "react";
import "../../../../assets/css/mediaQueries.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Paper, Typography } from "@mui/material";
import Slider from "react-slick";
import { useMedia } from 'react-use';
import { AppDownloads, DigitalMemberShip, LandPlots, MetaRacers, XmannaMysteryBox } from "../../../../components/ImageURLs/URLs";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  console.log("props", props);
  return (
    <div className={className} style={{ background: "transparent", color: 'white' }} onClick={onClick}>
      <ArrowForwardIosIcon fontSize="large" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ background: "transparent", color: 'white' }} onClick={onClick}>
      <ArrowBackIosIcon fontSize="large" />
    </div>
  );
}

var settings = {
  className: "center",
  centerMode: true,
  centerPadding: "50px",
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  //slidesToScroll: 5,
  initialSlide: 0,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1524,
      settings: {
        slidesToShow: 4,
        dots: true
      }
    },
    {
      breakpoint: 1424,
      settings: {
        slidesToShow: 4,
        dots: true
      }
    },
    {
      breakpoint: 1324,
      settings: {
        slidesToShow: 4,
        dots: true
      }
    },
    {
      breakpoint: 1224,
      settings: {
        slidesToShow: 4,
        dots: true
      }
    },
    {
      breakpoint: 1124,
      settings: {
        slidesToShow: 3,
        dots: true
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        dots: true
      }
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        dots: true
      }
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        dots: true
      }
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 2,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        dots: true
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        dots: true
      }
    }
    ,
    {
      breakpoint: 380,
      settings: {
        slidesToShow: 1,
        dots: true
      }
    }
    ,
    {
      breakpoint: 280,
      settings: {
        slidesToShow: 1,
        dots: true
      }
    }
  ]
};

export default function XmannaDetails() {

  const min600 = useMedia('(min-width: 600px)');
  const min700 = useMedia('(min-width: 700px)');
  const min800 = useMedia('(min-width: 800px)');
  const min900 = useMedia('(min-width: 900px)');

  return (
    <div id="hBanner" >
      <div className="row">
        <div className="col-12 col-md-12 text-md-center text-center">

          <div style={{ marginTop: '30px' }}>
            <Paper sx={{ margin: '10px', paddingTop: '20px', paddingBottom: '20px', borderRadius: '25px', border: "2px solid black", bgcolor: "rgba(54,54,54,255)", }}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                  <Typography
                    variant={"h3"}
                    component="div"
                    sx={{ paddingLeft: '50px', fontStyle: 'italic', fontFamily: "Jost", float: 'left', color: '#fff', fontWeight: 1000, }}
                  >
                    FEATURED
                  </Typography>
                </Grid>
                <Grid item xs={12} md={12} >
                  <Slider {...settings}>
                    <div >
                      <Card style={{ border: '4px solid black', borderRadius: '10px' }} sx={{ width: "280px", height: "350px", objectFit: 'fill' }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            sx={{ width: "280px", height: "350px", objectFit: 'fill' }}
                            image={MetaRacers}
                            alt="Meta Racers"
                          />
                        </CardActionArea>
                      </Card>
                      <Typography
                        variant={min900 ? "h5" : min800 ? "h6" : min700 ? "h6" : "body"}
                        component="div"
                        className="text-center feature-card"
                        sx={{ fontWeight: 1000, }}
                      >
                        META RACERS

                      </Typography>
                    </div>
                    <div >
                      <Card style={{ border: '4px solid black', borderRadius: '10px' }} sx={{ width: "280px", height: "350px", objectFit: 'fill' }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            sx={{ width: "280px", height: "350px", objectFit: 'fill' }}
                            image={DigitalMemberShip}
                            alt="Digital MemberShip"
                          />

                        </CardActionArea>
                      </Card>

                      <Typography
                        variant={min900 ? "h5" : min800 ? "h6" : min700 ? "h6" : "body"}
                        component="div"
                        className="text-center feature-card"
                        sx={{ fontWeight: 1000, }}
                      >
                        DIGITAL MEMEBERSHIPS
                      </Typography>
                    </div>
                    <div>
                      <Card style={{ border: '4px solid black', borderRadius: '10px' }} sx={{ width: "280px", height: "350px", objectFit: 'fill' }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            sx={{ width: "280px", height: "350px", objectFit: 'fill' }}
                            image={AppDownloads}
                            alt="App Downloads"
                          />

                        </CardActionArea>
                      </Card>

                      <Typography
                        variant={min900 ? "h5" : min800 ? "h6" : min700 ? "h6" : "body"}
                        component="div"
                        className="text-center feature-card"
                        sx={{ fontWeight: 1000, }}
                      >
                        APP DOWNLOADS
                      </Typography>
                    </div>
                    <div>
                      <Card style={{ border: '4px solid black', borderRadius: '10px' }} sx={{ width: "280px", height: "350px", objectFit: 'fill' }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            sx={{ width: "280px", height: "350px", objectFit: 'fill' }}
                            image={XmannaMysteryBox}
                            alt="Mystery Box"
                          />

                        </CardActionArea>
                      </Card>

                      <Typography
                        variant={min900 ? "h5" : min800 ? "h6" : min700 ? "h6" : "body"}
                        component="div"
                        className="text-center feature-card"
                        sx={{ fontWeight: 1000, }}
                      >
                        MYSTERY BOXES
                      </Typography>
                    </div>

                    <div>
                      <Card style={{ border: '4px solid black', borderRadius: '10px' }} sx={{ width: "280px", height: "350px", objectFit: 'fill' }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            sx={{ width: "280px", height: "350px", objectFit: 'fill' }}
                            image={LandPlots}
                            alt="Land Plots"
                          />

                        </CardActionArea>
                      </Card>

                      <Typography
                        variant={min900 ? "h5" : min800 ? "h6" : min700 ? "h6" : "body"}
                        component="div"
                        className="text-center feature-card"
                        sx={{ fontWeight: 1000, }}
                      >
                        LAND PLOTS
                      </Typography>
                    </div>
                  </Slider>
                </Grid>
              </Grid>

            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
}
