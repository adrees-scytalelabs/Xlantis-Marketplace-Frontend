import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// MATERIAL UI
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
// MUI TABLE
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
// MUI CARD
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

// CUSTOM MATERIAL UI STYLING
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    // backgroundColor: theme.palette.background.paper,
    border: "1px solid #fff",
    borderRadius: 5,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 5),
    backgroundColor: "#000",
    marginTop: "70px",
  },
  root: {
    width: "100%",
  },
  heading: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "orbitron",
  },
  cardTitle: {
    color: "#fff",
    fontFamily: "inter",
    fontWeight: "bold",
    textTransform: "capitalize",
    margin: "0.5rem 0rem 0.125rem 0rem",
    lineHeight: "1.2",
    fontSize: "14px",
  },
  cardHeading: {
    color: "#fff",
    fontFamily: "orbitron",
    fontWeight: "bold",
    textTransform: "capitalize",
    margin: "0.5rem 0rem 0.125rem 0rem",
    textAlign: "center",
  },
  wrapper: {
    // padding: "8px 16px 16px",
    padding: "4px 0px",
  },
  buttons: {
    padding: "6px",
    width: "100%",
    backgroundColor: "#000",
    border: "1px solid #F64D04",
    borderRadius: "0px 15px",
    color: "#fff",
    fontFamily: "orbitron",
    "&:hover": {
      boxShadow: "0px 0px 20px 5px rgb(246 77 4 / 35%)",
    },
  },
  buttonDisabled: {
    padding: "6px",
    width: "100%",
    backgroundColor: "#111",
    border: "1px solid #F64D04",
    borderRadius: "0px 15px",
    color: "#777",
    fontFamily: "orbitron",
    cursor: "default !important",
  },
  table: {
    minWidth: 650,
  },
  CheckoutBtn: {
    padding: "5px 16px",
    backgroundColor: "#000",
    color: "#fff",
    border: "1px solid #f64d04",
    borderRadius: "0px 15px",
    fontFamily: "orbitron",
    "&:hover": {
      boxShadow: "0px 0px 20px 5px rgb(246 77 4 / 35%)",
    },
  },
  cartNftThumb: {
    width: 120,
    height: 120,
    objectFit: "cover",
  },
}));

const makeTheme = createMuiTheme({
  overrides: {
    MuiIconButton: {
      root: {
        color: "#fff",
      },
    },
    MuiTableFooter: {
      root: {
        backgroundColor: "white",
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: "#fff",
      },
    },
    MuiBackdrop: {
      root: {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
      },
    },
    MuiTableHead: {
      root: {
        backgroundColor: "#fff",
      },
    },
    MuiTableRow: {
      root: {
        "&:nth-of-type(even)": {
          backgroundColor: "rgba(38, 38, 38, 0.6)",
        },
      },
    },
    MuiTableCell: {
      root: {
        fontFamily: "orbitron",
      },
      body: {
        padding: "1.5rem",
        color: "white",
        fontFamily: "inter",
      },
    },
  },
});

let tableData = [
  {
    delete: "X",
    NFTurl:
      "https://r4.wallpaperflare.com/wallpaper/685/747/739/iron-man-marvel-comics-cartoon-minimalism-wallpaper-a96028cdb1ea5deba6f7a8bf806116bd.jpg",
    title: "Iron Man Helmet",
    price: 22455,
    quantity: 3,
    total: 67365,
  },
  {
    delete: "X",
    NFTurl:
      "https://r4.wallpaperflare.com/wallpaper/460/384/910/animals-birds-kingfisher-low-poly-wallpaper-790078ad012a3d8b1677f8bfe081d6dd.jpg",
    title: "King Fisher",
    price: 42455,
    quantity: 2,
    total: 84910,
  },
];

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const CartModal = (props) => {
  // States
  const [expanded, setExpanded] = useState("panel1");
  const [disabled, setDisabled] = useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);
  const classes = useStyles();

  // Handlers
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log("changing rows: ", event);
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //   Content
  return (
    <div>
      <ThemeProvider theme={makeTheme}>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={props.open}
          onClose={props.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={props.open}>
            <div className={classes.paper}>
              <div className="row no-gutters mb-3">
                <div className="col-12 align-self-center">
                  <Typography variant="h5" className={classes.cardHeading}>
                    Your Cart
                  </Typography>
                </div>
              </div>
              <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Delete</TableCell>
                      <TableCell align="right">NFT</TableCell>
                      <TableCell align="right">Product Title</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData.map((data) => (
                      <TableRow key={data.title}>
                        <TableCell component="th" scope="row">
                          {data.delete}
                        </TableCell>
                        <TableCell align="right">
                          <img
                            src={data.NFTurl}
                            className={classes.cartNftThumb}
                            alt="NFT cart thumbnail"
                          />
                        </TableCell>
                        <TableCell align="right">{data.title}</TableCell>
                        <TableCell align="right">{data.price}</TableCell>
                        <TableCell align="right">{data.quantity}</TableCell>
                        <TableCell align="right">{data.total}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} align="right">
                        Cart totals
                      </TableCell>
                      <TableCell>
                        Subtotal{" "}
                        <strong
                          style={{ color: "#F64D04", fontFamily: "orbitron" }}
                        >
                          $1224534
                        </strong>
                      </TableCell>
                      <TableCell>
                        Total{" "}
                        <strong
                          style={{ color: "#F64D04", fontFamily: "orbitron" }}
                        >
                          $1224534
                        </strong>
                      </TableCell>
                      <TableCell align="right">
                        <Link to="/dashboard/checkout">
                          <button className={classes.CheckoutBtn}>
                            Proceed To Checkout
                          </button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  {/* <TableFooter>
                    <TableRow>
                      <TablePagination
                        align="center"
                        rowsPerPageOptions={[2, 5]}
                        component="div"
                        rowSpan={1}
                        colSpan={6}
                        count={tableData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </TableRow>
                  </TableFooter> */}
                </Table>
              </TableContainer>
            </div>
          </Fade>
        </Modal>
      </ThemeProvider>
    </div>
  );
};

export default CartModal;
