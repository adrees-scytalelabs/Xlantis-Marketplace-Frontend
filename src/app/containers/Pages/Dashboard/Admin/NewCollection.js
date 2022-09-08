// import { Grid } from '@material-ui/core/';
// import Avatar from '@material-ui/core/Avatar';
// import Backdrop from '@material-ui/core/Backdrop';
// import Button from '@material-ui/core/Button';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import { makeStyles } from '@material-ui/core/styles';
// import TextField from "@material-ui/core/TextField";
// import Typography from '@material-ui/core/Typography';
// import Autocomplete from "@material-ui/lab/Autocomplete";
// import axios from 'axios';
// import Cookies from "js-cookie";
// import { useSnackbar } from 'notistack';
import React, { useEffect } from "react";
// import { Spinner } from "react-bootstrap";
// import { Scrollbars } from 'react-custom-scrollbars';
// import Web3 from 'web3';
// import r1 from '../../../../assets/img/patients/patient.jpg';
// import CreateNFTContract from '../../../../components/blockchain/Abis/CreateNFTContract.json';
// import * as Addresses from '../../../../components/blockchain/Addresses/Addresses';
// import ipfs from '../../../../components/IPFS/ipfs';
// import NetworkErrorModal from '../../../../components/Modals/NetworkErrorModal';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//         width: '100%',
//         backgroundColor: theme.palette.background.paper,
//     },
//     badge: {
//         '& > *': {
//             margin: theme.spacing(1),
//         },
//     },
//     backdrop: {
//         zIndex: theme.zIndex.drawer + 1,
//         color: '#fff',
//     },

//     card: {
//         minWidth: 250,
//     },
//     media: {
//         height: 0,
//         paddingTop: '100%', // 16:9
//     },
//     bullet: {
//         display: 'inline-block',
//         margin: '0 2px',
//         transform: 'scale(0.8)',
//     },
//     title: {
//         fontSize: 14,
//     },
//     pos: {
//         marginBottom: 12,
//     },
// }));



function NewCollection(props) {
    // const { enqueueSnackbar } = useSnackbar();
    // const classes = useStyles();
    // let [network, setNetwork] = useState(false);
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    // const [open, setOpen] = React.useState(false);
    // const handleCloseBackdrop = () => {
    //     setOpen(false);
    // };
    // const handleShowBackdrop = () => {
    //     setOpen(true);
    // };

    // const [tokenList, setTokenList] = useState([]);
    // let [isSaving, setIsSaving] = useState(false);
    // let [name, setName] = useState("");
    // let [website, setWebsite] = useState("");
    // let [aboutTheArt, setAboutTheArt] = useState("");
    // let [ipfsHash, setIpfsHash] = useState(null);
    // let [description, setDescription] = useState("");
    // let [inspirationForThePiece, setInspirationForThePiece] = useState("");
    // let [executiveInspirationForThePiece, setExecutiveInspirationForThePiece] = useState("");
    // let [fanInspirationForThePiece, setFanInspirationForThePiece] = useState("");

    // let [rarities] = useState(["Mastercraft", "Legendary", "Epic", "Rare", "Uncommon", "Common"]);
    // let [supplyType, setSupplyType] = useState("Single");
    // let [imageArtistTypes, setImageArtistTypes] = useState([]);
    // let [executiveProducerTypes, setExecutiveProducerTypes] = useState([]);
    // let [fans, setFanTypes] = useState([]);
    // let [producerTypes, setProducerTypes] = useState([]);

    // let [imageArtist, setImageArtist] = useState('');
    // let [imageArtistId, setImageArtistId] = useState('');
    // let [collectionTypes, setCollectionTypes] = useState([]);
    // let [collectionType, setCollectionType] = useState("New");
    // let [collection, setCollection] = useState('');

    // let [producerId, setProducerId] = useState('');
    // let [producer, setProducer] = useState('');
    // let [tokenSupply, setTokenSupply] = useState("1");
    // let [isUploadingIPFS, setIsUploadingIPFS] = useState(false);
    // // let [isUploadingExecutiveProducer, setIsUploadingExecutiveProducer] = useState(false);
    // // let [isUploadingProducer, setIsUploadingProducer] = useState(false);
    // // let [isUploadingFan, setIsUploadingFan] = useState(false);
    // // let [isUploadingImageArtist, setIsUploadingImageArtist] = useState(false);
    // let [rarity, setRarity] = useState('');
    // let [fan, setFan] = useState('');
    // let [fanId, setFanId] = useState('');
    // let [other, setOther] = useState('');
    // let [image, setImage] = useState(r1);
    // let [artistImage, setArtistImage] = useState(r1);
    // let [producerImage, setProducerImage] = useState(r1);
    // let [executiveProducerImage, setExecutiveProducerImage] = useState(r1);
    // let [fanImage, setFanImage] = useState(r1);
    // let [imageArtistType, setImageArtistType] = useState("New");
    // let [producerType, setProducerType] = useState("New");
    // let [executiveProducerType, setExecutiveProducerType] = useState("New");
    // let [fanType, setFanType] = useState("New");
    // let [collectionId, setCollectionId] = useState('');

    // let [executiveProducerId, setExecutiveProducerId] = useState('');
    // let [executiveProducer, setExecutiveProducer] = useState('');



    // let getProfileData = () => {
    //     axios.get("/profile/createprofile").then(
    //         (response) => {
    //             console.log("response", response);
    //             setImageArtistTypes(response.data.Imageartist);
    //             setProducerTypes(response.data.Producer);
    //             setFanTypes(response.data.Fan);
    //             setExecutiveProducerTypes(response.data.ExecutiveProducer);
    //         },
    //         (error) => {
    //             if (process.env.NODE_ENV === "development") {
    //                 console.log(error);
    //                 console.log(error.response);
    //             }
    //             if (error.response.data !== undefined) {
    //                 if (error.response.data === "Unauthorized access (invalid token) !!") {
    //                     Cookies.remove("Authorization");
    //                     localStorage.removeItem("Address")
    //                     window.location.reload();
    //                 }
    //             }
    //         })
    // }
    // let getCollections = () => {
    //     axios.get("/collection/collections").then(
    //         (response) => {
    //             console.log("response", response);
    //             setCollectionTypes(response.data.Collectiondata)
    //         },
    //         (error) => {
    //             if (process.env.NODE_ENV === "development") {
    //                 console.log(error);
    //                 console.log(error.response);
    //             }
    //             if (error.response.data !== undefined) {
    //                 if (error.response.data === "Unauthorized access (invalid token) !!") {
    //                     Cookies.remove("Authorization");
    //                     localStorage.removeItem("Address")
    //                     window.location.reload();
    //                 }
    //             }
    //         })
    // }

    useEffect(() => {
        // getProfileData();
        // getCollections();

        props.setActiveTab({
            dashboard: "",
            newNFT: "",
            orders: "",
            settings: "",
            myNFTs: "",
            mySeason: "",
            myDrops: "",
            myCubes: "",
            privacyPolicy: "",
            termsandconditions: "",
            changePassword: "",
            newDrop: "",
            newCube: "",
            createNewCollection: "active",
            newCollection: "",
            newRandomDrop: "",
        });// eslint-disable-next-line
    }, []);

    return (
        <div className="card">
            <ul className="breadcrumb" style={{ backgroundColor: "rgb(167,0,0)" }}>
                <li className="breadcrumb-item">
                    <a href="/">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">New Collection</li>
            </ul>
        </div >

    );
}

export default NewCollection;
