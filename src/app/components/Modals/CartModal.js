import { Backdrop, Fade, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, Typography, createTheme } from '@mui/material';
import React from "react";
import { Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";

const styles = {
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {

    border: "1px solid #fff",
    borderRadius: 5,
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 5),
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
}

const makeTheme = createTheme({
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

const CartModal = (props) => {

  return (
    <div>
      <ThemeProvider theme={makeTheme}>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          sx={styles.modal}
          open={props.open}
          onClose={props.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={props.open}>
            <div sx={styles.paper}>
              <div className="row no-gutters mb-3">
                <div className="col-12 align-self-center">
                  <Typography variant="h5" sx={styles.cardHeading}>
                    Your Cart
                  </Typography>
                </div>
              </div>
              <TableContainer>
                <Table sx={styles.table} aria-label="simple table">
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
                            sx={styles.cartNftThumb}
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
                          <button sx={styles.CheckoutBtn}>
                            Proceed To Checkout
                          </button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  </TableBody>
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
