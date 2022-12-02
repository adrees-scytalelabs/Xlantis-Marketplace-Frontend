
import { Avatar, CardHeader, Grid } from '@material-ui/core/';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Countdown from 'react-countdown';
import { Link } from 'react-router-dom';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink"
import Web3 from 'web3';
import { providers,ethers } from 'ethers'
import Cookies from "js-cookie";

import { useHistory, useRouteMatch } from 'react-router-dom';

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



function MarketPlace(props) {
    const classes = useStyles();
    const [userSaleData, setUserSaledata] = useState([]);
    const [cubeData, setCubeData] = useState([]);
    const [userAuctionData, setUserAuctiondata] = useState([]);
    const [cubeAuctionData, setCubeAuctionData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [network, setNetwork] = useState("");
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let [isLoading, setIsLoading] = useState(false);
    let { path } = useRouteMatch();
    let history = useHistory();
    const handleCloseBackdrop = () => {
        setOpen(false);
    };
    const handleShowBackdrop = () => {
        setOpen(true);
    };
    let getCubes = (start, end) => {
        handleShowBackdrop();
        axios.get(`/drop/saleType/fixed-price/${start}/${end}`).then(
            (response) => {
                console.log("responseeeee", response);
                setCubeData(response.data.data);
                setUserSaledata(response.data.data)
                setCubeAuctionData(response.data.data)
                setUserAuctiondata(response.data.data)
                handleCloseBackdrop();
            },
            (error) => {
                if (process.env.NODE_ENV === "development") {
                    console.log(error);
                    console.log(error.response);
                }
                handleCloseBackdrop();
            })
    }

    useEffect(() => {
        getCubes(0, 4);// eslint-disable-next-line
    }, []);

    const providerOptions = {
        binancechainwallet: {
          package: true
          },
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: "2b677656bad14a3db4592ffdb69e7805"
          }
          },
          walletlink: {
          package: WalletLink, 
          options: {
            appName: "RINKEBY API", 
            infuraId: "2b677656bad14a3db4592ffdb69e7805", 
            rpc: "", 
            chainId: 5, 
            appLogoUrl: null, 
            darkMode: true 
          }
          },
      };
    
      const web3Modal = new Web3Modal({
        network: "private",
        theme: "dark",
        cacheProvider: true,
        providerOptions 
      });
    //   async function handleLogin() { 
    //     var provider = await web3Modal.connect();
    //     var web3 = new Web3(provider); 
    //     const newProvider = new providers.Web3Provider(provider)
    //     await newProvider.send('eth_requestAccounts'); 
    //     var accounts = await web3.eth.getAccounts(); 
    //     let account = accounts[0]; 
    //     console.log("account", account);
    //     const signer = newProvider.getSigner();
    //     const address = await signer.getAddress();
    //     const message = `Welcome to RobotDrop! \n\nClick to sign in and accept the RobotDrop Terms of Service: https://RobotDrop.io/tos \n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nYour authentication status will reset after 24 hours. \n\nWallet address: ${address}`;
    //     console.log("Address: ", await signer.getAddress());
    //     let signatureHash = await web3.eth.personal.sign(message,address)
    //     console.log("Signature hash " ,signatureHash);
    //     let ethBalance = await web3.eth.getBalance(account);
        
    //     let loginData = {
    //       walletAddress: address,
    //       signature: signatureHash,
    //     }
    //     axios.post("/user/login", loginData).then(
    //       (response) => {
    //         console.log("response", response);
    //         Cookies.set("Authorization", response.data.token, {
    //         });
    //         // if (response.data.roles.i("user")) {
    //         //   console.log("we here");
    //         //   localStorage.setItem("Address", accounts[0]);
    //         // }
    //         // setIsLoading(false);
    //         localStorage.setItem("Address", accounts[0]);
    //         history.push("/dashboard/marketplace");
    //         // window.location.reload();
    
    //       },
    //       (error) => {
    //         if (process.env.NODE_ENV === "development") {
    //           console.log(error);
    //           console.log(error.response);
    //         }
    //         if (error.response !== undefined) {
    //           if (error.response.status === 400) {
    //             // setMsg(error.response.data.message);
    //           } else {
    //             // setMsg("Unknown Error Occured, try again.");
    //           }
    //         } else {
    //           // setMsg("Unknown Error Occured, try again.");
    //         }
    //         // setIsLoading(false);
    //       })
    // }    
    async function handleLogin() { 
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts();
        const network = await web3.eth.net.getNetworkType()
        console.log(network);
        console.log("Account test: ", accounts[0], network);
        if (network !== 'private') {
          setNetwork(network);
          setIsLoading(false);
          handleShow();
        }
        else{
        // var provider = await web3Modal.connect();
        // var web3 = new Web3(provider); 
        // const newProvider = new providers.Web3Provider(provider)
        // await newProvider.send('eth_requestAccounts'); 
        // var accounts = await web3.eth.getAccounts(); 
        let account = accounts[0]; 
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    
        console.log("In the starting");
    
            
    
        console.log("Provider: ", provider);
    
        await provider.send("eth_requestAccounts", []);
        let signer = provider.getSigner();
        console.log("account", account);
        const address = await signer.getAddress();
        const message = `Welcome to RobotDrop! \n\nClick to sign in and accept the RobotDrop Terms of Service: https://RobotDrop.io/tos \n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nYour authentication status will reset after 24 hours. \n\nWallet address: ${address}`;
        console.log("Address: ", await signer.getAddress());
        let signatureHash = await web3.eth.personal.sign(message,address)
        console.log("Signature hash " ,signatureHash);
        let ethBalance = await web3.eth.getBalance(account);
        
        let loginData = {
          walletAddress: address,
          signature: signatureHash,
        }
        axios.post("/user/login", loginData).then(
          (response) => {
            console.log("response", response);
            Cookies.set("Authorization", response.data.token, {
            });
            // if (response.data.roles.includes("user")) {
            //   console.log("we here");
            //   localStorage.setItem("Address", accounts[0]);
            // }
            // setIsLoading(false);
            localStorage.setItem("Address", accounts[0]);
            history.push("/");
            // window.location.reload();
    
          },
          (error) => {
            if (process.env.NODE_ENV === "development") {
              console.log(error);
              console.log(error.response);
            }
            if (error.response !== undefined) {
              if (error.response.status === 400) {
                // setMsg(error.response.data.message);
              } else {
                // setMsg("Unknown Error Occured, try again.");
              }
            } else {
              // setMsg("Unknown Error Occured, try again.");
            }
            // setIsLoading(false);
          })
        }
        
    
    
          // contract = new web3.eth.Contract(ABI, ADDRESS); 
      }
    return (
        <div className="container-fluid">
            {/* <!-- Page Header --> */}
            <div className="page-header">
                {/* <Container> */}

                <div className="card-body">
                {localStorage.getItem("Address") ? (
                     <h3><pre>Fixed-Price Drops<Link to="/dashboard/marketPlace" style={{ float: 'right', color: "#ff0000" }}>View All </Link></pre></h3>
                    ): (
                    
                        <h3><pre>Fixed-Price Drops
                            <span style={{ float: 'right', color: "#ff0000" , cursor : "pointer" }} onClick={handleLogin}> View All </span>
                        </pre></h3>
                    )}
                    
                    <hr></hr>
                    <div className="form-group" >
                        {open ? (
                            <div align="center" className="text-center">
                                <Spinner
                                    animation="border"
                                    role="status"
                                    style={{ color: "#ff0000" }}
                                >
                                </Spinner>
                                <span style={{ color: "#ff0000" }} className="sr-only">Loading...</span>
                            </div>
                        ) : cubeData.length === 0 && cubeAuctionData.length === 0 ? (
                            <Card variant="outlined" style={{ padding: "40px", marginTop: '20px', marginBottom: '20px' }}>
                                <Typography variant="body2" className="text-center" color="textSecondary" component="p"  >
                                    <strong>No items to display </strong>
                                </Typography>
                            </Card>
                        ) : (
                            <>
                                {/* {cubeData.length !== 0 ? ( */}
                                    {/* <Typography variant="h6" style={{ marginTop: '20px', marginBottom: '20px' }} >
                                        <strong>On Sale </strong>
                                    </Typography>) : (
                                    null */}
                                {/* )} */}

                                <Grid
                                    container
                                    spacing={2}
                                    direction="row"
                                    justify="flex-start"
                                // alignItems="flex-start"
                                >

                                    {cubeData.map((i, index) => (
                                        <Grid item xs={12} sm={6} md={3} key={index}>
                                            {localStorage.getItem("Address") ? (
                                            <Link to={"/dashboard/marketPlace" }>
                                                <Card style={{ height: "100%" }} variant="outlined" className={classes.root}>
                                                    {/* style={{ height: "100%" }} variant="outlined" */}
                                                    <CardActionArea>
                                                        <CardMedia
                                                            className={classes.media}
                                                            image={i.image}
                                                            title=""
                                                        >
                                                            {/* <div className="mainDiv">

                                                                <div className="square"></div>
                                                                <div className="square2"></div>
                                                                <div className="square3"></div>
                                                            </div> */}

                                                        </CardMedia>
                                                        <CardContent>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                <strong>Title: </strong>{i.title}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                <strong>Description: </strong>{i.description}
                                                            </Typography>

                                                            {/* <Typography variant="body2" color="textSecondary" component="p">
                                                                <strong>Sale Price: </strong>{i.SalePrice / 10 ** 18} ETH
                                                            </Typography> */}
                                                            {/* <Typography variant="h6" gutterBottom color="textSecondary" className="text-center">Music Artist</Typography>
                                                            <Link to={"/User/Profile/Detail/musicArtist/" + i.MusicArtistId + "/null"} style={{ color: '#000' }}>
                                                                <CardHeader
                                                                    avatar={<Avatar src={i.MusicArtistProfile} aria-label="Artist" className={classes.avatar} />}
                                                                    title={i.MusicArtistName}
                                                                    subheader={i.MusicArtistAbout}
                                                                />
                                                            </Link> */}
                                                             <Typography variant="h6" gutterBottom color="textSecondary" className="text-center">
                                                        {new Date() < new Date(i.startTime) ? (
                                                            <div style={{ color: "#00FF00" }} >

                                                                <Typography variant="body2" color="textSecondary" component="p">
                                                                    <strong>Sale Starts At:</strong>
                                                                </Typography>
                                                                {console.log("Date(i.AuctionStartsAt)", Date(i.startTime))}
                                                                <Countdown daysInHours date={new Date(i.startTime)}>
                                                                </Countdown>
                                                            </div>
                                                        ) : new Date() > new Date(i.startTime) && new Date() < new Date(i.endTime) ? (
                                                            <div style={{ color: "#FF0000" }}>
                                                                {/* {console.log("Date(i.AuctionStartsAt)", Date(i.AuctionEndsAt.toLoca))} */}
                                                                <Typography variant="body2" color="textSecondary" component="p">
                                                                    <strong>Sale Ends At:</strong>
                                                                </Typography>
                                                                <Countdown daysInHours date={new Date(i.endTime)}>
                                                                </Countdown>
                                                            </div>) : (
                                                            <Typography variant="body2" style={{ color: "#FF0000" }} component="p">
                                                                <strong>Sale Ended</strong>
                                                            </Typography>
                                                        )}
                                                        </Typography>
                                                        </CardContent>
                                                    </CardActionArea>
                                                    <CardActions>

                                                    </CardActions>
                                                </Card>
                                            </Link>) : ( 
                                                 <span onClick={handleLogin}>
                                                 <Card style={{ height: "100%" }} variant="outlined" className={classes.root}>
                                                     {/* style={{ height: "100%" }} variant="outlined" */}
                                                     <CardActionArea>
                                                         <CardMedia
                                                             className={classes.media}
                                                             image={i.image}
                                                             title=""
                                                         >
                                                             {/* <div className="mainDiv">
 
                                                                 <div className="square"></div>
                                                                 <div className="square2"></div>
                                                                 <div className="square3"></div>
                                                             </div> */}
 
                                                         </CardMedia>
                                                         <CardContent>
                                                             <Typography variant="body2" color="textSecondary" component="p">
                                                                 <strong>Title: </strong>{i.title}
                                                             </Typography>
                                                             <Typography variant="body2" color="textSecondary" component="p">
                                                                 <strong>Description: </strong>{i.description}
                                                             </Typography>
 
                                                             {/* <Typography variant="body2" color="textSecondary" component="p">
                                                                 <strong>Sale Price: </strong>{i.SalePrice / 10 ** 18} ETH
                                                             </Typography> */}
                                                             {/* <Typography variant="h6" gutterBottom color="textSecondary" className="text-center">Music Artist</Typography>
                                                             <Link to={"/User/Profile/Detail/musicArtist/" + i.MusicArtistId + "/null"} style={{ color: '#000' }}>
                                                                 <CardHeader
                                                                     avatar={<Avatar src={i.MusicArtistProfile} aria-label="Artist" className={classes.avatar} />}
                                                                     title={i.MusicArtistName}
                                                                     subheader={i.MusicArtistAbout}
                                                                 />
                                                             </Link> */}
                                                             <Typography variant="h6" gutterBottom color="textSecondary" className="text-center">
                                                            {new Date() < new Date(i.startTime) ? (
                                                            <div style={{ color: "#00FF00" }} >

                                                                <Typography variant="body2" color="textSecondary" component="p">
                                                                    <strong>Sale Starts At:</strong>
                                                                </Typography>
                                                                {console.log("Date(i.AuctionStartsAt)", Date(i.startTime))}
                                                                <Countdown daysInHours date={new Date(i.startTime)}>
                                                                </Countdown>
                                                            </div>
                                                        ) : new Date() > new Date(i.startTime) && new Date() < new Date(i.endTime) ? (
                                                            <div style={{ color: "#FF0000" }}>
                                                                {/* {console.log("Date(i.AuctionStartsAt)", Date(i.AuctionEndsAt.toLoca))} */}
                                                                <Typography variant="body2" color="textSecondary" component="p">
                                                                    <strong>Sale Ends At:</strong>
                                                                </Typography>
                                                                <Countdown daysInHours date={new Date(i.endTime)}>
                                                                </Countdown>
                                                            </div>) : (
                                                            <Typography variant="body2" style={{ color: "#FF0000" }} component="p">
                                                                <strong>Sale Ended</strong>
                                                            </Typography>
                                                        )}
                                                        </Typography>
                                                         </CardContent>
                                                     </CardActionArea>
                                                     <CardActions>
 
                                                     </CardActions>
                                                 </Card>
                                             </span>
                                            )}
                                        </Grid >
                                    ))}
                                </Grid>
                                {/* {cubeAuctionData.length !== 0 ? (
                                    <Typography variant="h6" style={{ marginTop: '20px', marginBottom: '20px' }} >
                                        <strong >On Auction </strong>
                                    </Typography>) : (
                                    null
                                )}

                                <Grid
                                    container
                                    spacing={2}
                                    direction="row"
                                    justify="flex-start"
                                // alignItems="flex-start"
                                >

                                    {cubeAuctionData.map((i, index) => (
                                        <Grid item xs={12} sm={6} md={3} key={index}>
                                            <Link to={"/marketPlace/Cubes/Nfts/userauction/" + i._id + "/" + userAuctionData[index]._id}>
                                                <Card style={{ height: "100%" }} variant="outlined" className={classes.root}>
                                                    <CardActionArea>
                                                        <CardMedia
                                                            className={classes.media}
                                                            // image={img}
                                                            title=""
                                                        >
                                                            <div className="mainDiv">

                                                                <div className="square"></div>
                                                                <div className="square2"></div>
                                                                <div className="square3"></div>
                                                            </div>

                                                        </CardMedia>
                                                        <CardContent>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                <strong>Cube Title: </strong>{i.title}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                <strong>Cube Description: </strong>{i.description}
                                                            </Typography>

                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                <strong>Minimum Bid: </strong>{(userAuctionData[index].minimumBid) / 10 ** 18}  WETH
                                                            </Typography>
                                                            <Typography variant="h6" gutterBottom color="textSecondary" className="text-center">Music Artist</Typography>
                                                            <Link to={"/User/Profile/Detail/musicArtist/" + i.MusicArtistId + "/null"} style={{ color: '#000' }}>
                                                                <CardHeader
                                                                    avatar={<Avatar src={i.MusicArtistProfile} aria-label="Artist" className={classes.avatar} />}
                                                                    title={i.MusicArtistName}
                                                                    subheader={i.MusicArtistAbout}
                                                                />
                                                            </Link>
                                                            <Typography variant="h6" gutterBottom color="textSecondary" className="text-center">
                                                                {new Date() < new Date(userAuctionData[index].auctionStartsAt) ? (
                                                                    <div style={{ color: "#00FF00" }} >

                                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                                            <strong>Auction Starts At:</strong>
                                                                        </Typography>
                                                                        {console.log("Date(i.AuctionStartsAt)", Date(i.AuctionStartsAt))}
                                                                        <Countdown daysInHours date={new Date(userAuctionData[index].auctionStartsAt)}>
                                                                        </Countdown>
                                                                    </div>
                                                                ) : new Date() > new Date(userAuctionData[index].auctionStartsAt) && new Date() < new Date(userAuctionData[index].auctionEndsAt) ? (
                                                                    <div style={{ color: "#FF0000" }}>
                                                                        {console.log("Date(i.AuctionStartsAt)", Date(i.AuctionEndsAt.toLoca))}
                                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                                            <strong>Auction Ends At:</strong>
                                                                        </Typography>
                                                                        <Countdown daysInHours date={new Date(userAuctionData[index].auctionEndsAt)}>
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
                                            </Link>
                                        </Grid >
                                    ))} */}
                                {/* </Grid> */}
                            </>
                        )}
                    </div>
                </div >


            </div >
        </div >
    );
}

export default MarketPlace;
