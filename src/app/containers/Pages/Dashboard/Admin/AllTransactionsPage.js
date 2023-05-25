import { TablePagination} from "@mui/material";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import NetworkErrorModal from "../../../../components/Modals/NetworkErrorModal";
import Table from "react-bootstrap/Table";
const styles = {
  root: {
    maxWidth: 345,
  },
  media: {
    height: 300,
  },
  card: {
    minWidth: 250,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  tableHeader: {
    color: "#000",
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  collectionTitle: {
    color: "#fff",
    fontSize: "1rem",
    // textAlign:"center"          
  },
  approveBtn: {
    backgroundColor: "transparent",
    color: "#fff",
    padding: "6px 24px",
    border: "1px solid #F64D04",
    borderRadius: "0px 15px",
    "&:hover": {
      background: "#f00",
    },
  },
};

function AllTransactionsPage(props) {
  const [network, setNetwork] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [page, setPage] = useState(0); // eslint-disable-next-line
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const handleCloseNetworkModal = () => setShowNetworkModal(false);
  const handleShowNetworkModal = () => setShowNetworkModal(true);
  const [show, setShow] = useState(false);
  let [versionB, setVersionB] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [open, setOpen] = useState(false);
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };

  useEffect(() => {
    setVersionB(Cookies.get("Version"));

// eslint-disable-next-line
  }, []);

  const handleChangePage = (event, newPage) => {
    console.log("newPage", newPage);
    setPage(newPage);
    console.log("Start", newPage * rowsPerPage);
    console.log("End", newPage * rowsPerPage + rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  
 
  return (
    <div className="backgroundDefault">
      {/* Page Header */}
      
      {/* Page Content */}
      <div className="card-body">
      <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '20px' }}>
                <select value="Value" className="templatesSelect" >
                <option value="">Type : All</option>
                <option value="filter1">Type : Deposit</option>
                <option value="filter2">Type : Received</option>
                </select>
            </div>
            <div style={{ marginRight: '20px' }}>
            
                    <input
                      style={{"backgroundColor":"#fff"}}
                      type="text"
                      required
                    //   value={}
                      placeholder="Value : All"
                      className="form-control newNftInput"
                    //   onChange={(e) => {
                    //     setName(e.target.value);
                    //   }}
                    />
              
            </div>
            <div style={{ marginRight: '20px' }}>
            
                    <input
                      style={{"backgroundColor":"#fff"}}
                      type="text"
                      required
                    //   value={}
                      placeholder="From"
                      className="form-control newNftInput"
                    //   onChange={(e) => {
                    //     setName(e.target.value);
                    //   }}
                    />
              
            </div>
            <div>
                    <input
                      style={{"backgroundColor":"#fff"}}
                      type="text"
                      required
                    //   value={}
                      placeholder="To"
                      className="form-control newNftInput"
                    //   onChange={(e) => {
                    //     setName(e.target.value);
                    //   }}
                    />
              
            </div>
          </div>
          <br></br>
        <div className="row">
          {/* <div className="col-md-12 col-lg-6"> */}
         
          

          <Table responsive>
            <thead>
              <tr>
                <th className={styles.tableHeader}>
                  <div className="row no-gutters justify-content-start align-items-center">
                    Date
                  </div>
                </th>
                <th className={styles.tableHeader}>
                  <div className="row no-gutters justify-content-start align-items-center">
                    Time
                  </div>
                </th>
                <th className={styles.tableHeader}>
                  <div className="row no-gutters justify-content-center align-items-center">
                    Description
                  </div>
                </th>
                <th className={styles.tableHeader}>
                  <div className="row no-gutters justify-content-center align-items-center">
                    Amount
                  </div>
                </th>
                <th className={styles.tableHeader}>
                  <div className="row no-gutters justify-content-center align-items-center">
                    Type
                  </div>
                </th>
              </tr>
            </thead>
            {/* {collections.map((i, index) => ( */}
              <tbody>
                <tr>
                  <td className={styles.collectionTitle}>2019-11-22</td>
                  <td className={styles.collectionTitle}>6:55</td>
                  <td className={styles.collectionTitle} style={{"textAlign" : "center"}}>Drop Approval</td>
                  <td className={styles.collectionTitle} style={{"textAlign" : "center"}}>12$</td>
                  <td className={styles.collectionTitle} style={{"textAlign" : "center"}}>Deposit</td>


                </tr>
              </tbody>
            {/* ))} */}
          </Table>
        </div>
      </div>
      {/* </div> */}
      <TablePagination
        rowsPerPageOptions={[4, 8, 12, 24]}
        component="div"
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <NetworkErrorModal
        show={showNetworkModal}
        handleClose={handleCloseNetworkModal}
        network={network}
      ></NetworkErrorModal>
      {/* <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop> */}
    </div>
  );
}

export default AllTransactionsPage;
