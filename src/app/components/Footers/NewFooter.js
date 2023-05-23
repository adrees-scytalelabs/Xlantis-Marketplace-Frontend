import React from "react";
import "../../assets/css/bootstrap.min.css";
import "../../assets/plugins/fontawesome/css/fontawesome.min.css";
import "../../assets/plugins/fontawesome/css/all.min.css";
import "../../assets/css/style.css";
import { Link } from "react-router-dom";
import { Divider, Grid, IconButton, InputBase, Typography } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Logo from "../../assets/img/WhiteLogo.png";
import { Center } from "@react-three/drei";
import { alpha, styled } from '@mui/material/styles';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import CopyRightFooter from "./CopyrightFooter";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(2, 2, 2, 2),
    transition: theme.transitions.create('width'),
    borderRadius: "5px",
    height: '18px',
    background: '#313131',
    color: '#fff',
    '&::placeholder': {
      color: 'rgba(125,141,150,255)',

    },

    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
}));

function Footer(props) {
  return (
    <footer className="footer foot" style={{ position: props.position, paddingTop: '60px', fontFamily: "Arial, Helvetica, sans-serif" }}>
      <div className="footer-bottom">
        <div className="container-fluid">
          <Grid container spacing={1}>
            <Grid item lg={1} md={0} xs={0}></Grid>
            <Grid item lg={3} md={4} xs={12}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ fontWeight: 1000 }}
              >
                Useful Links

              </Typography>
              <Grid container spacing={2} sx={{ paddingTop: '20px' }}>
                <Grid item xs={12} md={4} lg={2}>
                  <Divider sx={{ height: '2px', bgcolor: "rgba(0,141,213,255)" }} />
                </Grid>
                <Grid item xs={12} md={8} lg={10}>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ paddingTop: '20px' }}>
                <Grid item lg={4} md={6} xs={12}>
                  <Typography
                    sx={{ fontWeight: 700, color: 'rgba(204,204,204,255)' }}
                  >
                    <Link to="/" >

                      <ChevronRightIcon sx={{ color: "rgba(0,141,213,255)" }} />
                      Home
                    </Link>
                  </Typography>

                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <Typography
                    sx={{ fontWeight: 700, color: 'rgba(204,204,204,255)' }}
                  >
                    <Link to="/marketPlace" >
                      <ChevronRightIcon sx={{ color: "rgba(0,141,213,255)" }} />
                      Marketplace
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ paddingTop: '20px' }}>
                <Grid item lg={4} md={6} xs={12}>
                  <Typography
                    sx={{ fontWeight: 700, color: 'rgba(204,204,204,255)' }}
                  >
                    <Link to="/">
                      <ChevronRightIcon sx={{ color: "rgba(0,141,213,255)" }} />
                      About
                    </Link>

                  </Typography>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                  <Typography
                    sx={{ fontWeight: 700, color: 'rgba(204,204,204,255)' }}
                  >
                    <Link to="/" >

                      <ChevronRightIcon sx={{ color: "rgba(0,141,213,255)" }} />
                      Discord
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={4} md={4} xs={12} className={"text-center"}>
              <Link
                style={{ color: "#fff", width: "auto" }}
                to="/"
                className="logo"
              >
                <img
                  src={Logo}
                  alt="Logo"
                  style={{
                    width: "300px",
                    height: "41px",
                  }}
                />
              </Link>
              <Typography
                // className={"text-center"}
                sx={{ marginTop: '50px', fontWeight: 200 }}
              >
                THE HUNT BEGINS!
              </Typography>
              <Grid container spacing={6} sx={{ marginTop: '5px', marginBottom: '50px' }}>
                <Grid item xs={9}>
                  <StyledInputBase
                    sx={{ ml: 1, flex: 1, width: "200px" }}
                    placeholder="Enter Your Mail"
                    inputProps={{ 'aria-label': 'Enter Your Mail' }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <ChevronRightIcon sx={{ height: '50px', width: '50px', bgcolor: "rgba(0,141,213,255)" }} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={2} md={4} xs={12}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ fontWeight: 1000 }}
              >
                Follow Us On

              </Typography>
              <Grid container spacing={2} sx={{ paddingTop: '20px' }}>
                <Grid item xs={12} md={4} lg={2}>
                  <Divider sx={{ height: '2px', bgcolor: "rgba(0,141,213,255)" }} />
                </Grid>
                <Grid item xs={12} md={8} lg={10}>
                </Grid>
              </Grid>
              <Grid container sx={{ marginTop: '20px' }}>
                <Grid item xs={2} lg={2}>
                  <TwitterIcon sx={{ height: '40px', width: '40px', padding: '10px', color: '#cbcbcb', bgcolor: "#313131" }} />
                </Grid>
                <Grid item xs={2} lg={2}>
                  <LinkedInIcon sx={{ height: '40px', width: '40px', padding: '10px', color: '#cbcbcb', bgcolor: "#313131" }} />
                </Grid>
                <Grid item xs={2} lg={2}>
                  <InstagramIcon sx={{ height: '40px', width: '40px', padding: '10px', color: '#cbcbcb', bgcolor: "#313131" }} />
                </Grid>
                <Grid item xs={6} lg={6}>
                </Grid>
              </Grid>

            </Grid>
            <Grid item lg={2} md={0} xs={0}></Grid>
          </Grid>
        </div>
      </div>
      <CopyRightFooter position={"relative"} />
    </footer >
  );
}

export default Footer;