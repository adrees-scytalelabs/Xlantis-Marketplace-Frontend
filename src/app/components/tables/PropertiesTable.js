import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";

const styles = {
  root: {
    maxWidth: 345,
  },
  media: {
    height: 300,
  },
  noMaxWidth: {
    maxWidth: "none",
  },
  card: {
    minWidth: 250,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  tableHeader: {
    "& th": {
      fontSize: "1.25rem",
      fontWeight: "bold",
      padding: "14px",
      color: "#000",
      backgroundColor: "white",
    },
  },
  collectionTitle: {
    color: "#fff",
    fontSize: "1rem",
    fontFamily: "inter",
  },
  approveBtn: {
    backgroundColor: "#F64D04",
    color: "#fff",
    padding: "6px 24px",
    border: "1px solid #F64D04",
    borderRadius: "0px 15px",
    "&$hover": {
      boxShadow: "0px 0px 20px 5px rgb(246 77 4 / 35%)",
    },
  },
};
function PropertiesTable(props) {
  return (
    <TableContainer component={Paper} sx={{ backgroundColor: "black" }}>
      <Table>
        <TableHead sx={styles.tableHeader}>
          <TableRow>
            <TableCell>
              <div className="row no-gutters justify-content-start align-items-center">
                Template Name
              </div>
            </TableCell>
            <TableCell>
              <div className="row no-gutters justify-content-start align-items-center">
                No of Properties
              </div>
            </TableCell>
            <TableCell>
              <div className="ml-5">Details</div>
            </TableCell>
            <TableCell>
              <div className="row no-gutters justify-content-start align-items-center">
                Delete/Edit
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        {props.templateData.map((i, index) => (
          <tbody style={{ color: "white" }}>
            <TableRow key={index} style={styles.collectionTitle}>
              <TableCell>{i.name}</TableCell>
              <TableCell>
                <div className="justify-content-center align-items-center ml-5">
                  {" "}
                  {i.properties.length}{" "}
                </div>
              </TableCell>
              <TableCell>
                <button
                  className="btn submit-btn propsActionBtn "
                  onClick={(e) => props.handleOpen(e, i)}
                >
                  View
                </button>
              </TableCell>
              <TableCell>
                <span className="ml-4">
                  <button style={{ background: "transparent", border: "none" }}>
                    <DeleteIcon
                      color="action"
                      style={{ color: "red" }}
                      onClick={(e) => props.handleDeleteModal(e, i)}
                    />
                  </button>
                </span>
                <span className="ml-1">
                  <button style={{ background: "transparent", border: "none" }}>
                    <EditIcon
                      style={{ color: `green` }}
                      onClick={(e) => props.handleUpdatedData(e, i)}
                    />
                  </button>
                </span>
              </TableCell>
            </TableRow>
          </tbody>
        ))}
      </Table>
    </TableContainer>
  );
}

export default PropertiesTable;
