import { Divider } from '@mui/material';
import clsx from "clsx";
import React from "react";
import { NavLink, useNavigate, useResolvedPath } from "react-router-dom";
import logo from "../../assets/img/logo3.png";
const drawerWidth = 280;
const styles = {
  appBar: {
    backgroundColor: "#ffffff",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    zIndex: theme.zIndex.drawer + 1,
  },

  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "rgb(167, 0, 0)",
  },
  title: {
    flexGrow: 1,
  },
  avatarRoot: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}

export default function HeaderMenuAppBar(props) {
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const path = useResolvedPath("").pathname;
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDashboard = () => {
    navigate("/dashboard");
    handleClose();
  };

  const handleProfileSetting = () => {
    navigate(`${path}/profilesettings`);
    handleClose();
  };

  let handleLogout = (e) => {
    sessionStorage.clear();
    sessionStorage.removeItem("Authorization");
    web3Modal.clearCachedProvider();

    navigate("/");
    window.location.reload(false);
  };





  return (
    <div sx={styles.root}>
      <CssBaseline />
      <AppBar position="fixed" className={clsx(styles.appBar)}>
        <Toolbar>
          <IconButton
            edge="start"
            sx={styles.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={props.handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          <div sx={styles.title}>
            <NavLink to={"/"}>
              <img src={logo} alt={"Robot Drop"} width="80" height="70" />
              Robot Drop
            </NavLink>
          </div>
          <div>
            <div sx={styles.avatarRoot}>
              {props.userData !== undefined ? (
                <>
                  <Avatar
                    src={props.userData.pictureURL}
                    onClick={handleMenu}
                  ></Avatar>
                </>
              ) : null}
            </div>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfileSetting}>
                <div className="row">
                  <Avatar
                    src={props.userData.pictureURL}
                    onClick={handleMenu}
                  ></Avatar>
                  <p style={{ marginTop: "5%", paddingLeft: "5%" }}>
                    {props.userData.name}
                  </p>
                </div>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
