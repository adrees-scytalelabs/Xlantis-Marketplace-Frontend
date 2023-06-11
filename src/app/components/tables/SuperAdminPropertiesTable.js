import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import Table from "react-bootstrap/Table";

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
    color: "#000",
    fontSize: "1.25rem",
    fontWeight: "bold",
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
function SuperAdminPropertiesTable(props) {
  return (
    <Table responsive>
      <thead style={{ color: "black" }}>
        <tr>
          <th style={styles.tableHeader}>
            <div className="row no-gutters justify-content-start align-items-center">
              Template Name
            </div>
          </th>
          <th style={styles.tableHeader}>
            <div className="row no-gutters justify-content-start align-items-center">
              No of Properties
            </div>
          </th>
          <th style={styles.tableHeader}>
            <div className="ml-5">Details</div>
          </th>
          <th style={styles.tableHeader}>
            <div className="row no-gutters justify-content-start align-items-center">
              Delete/Edit
            </div>
          </th>
        </tr>
      </thead>
      {props.templateData.map((i, index) => (
        <tbody style={{ color: "white" }}>
          <tr>
            <td style={styles.collectionTitle}>{i.name}</td>
            <td style={styles.collectionTitle}>
              <div className="justify-content-center align-items-center ml-5">
                {" "}
                {i.properties.length}{" "}
              </div>
            </td>
            <td style={styles.collectionTitle}>
              <button
                className="btn submit-btn propsActionBtn "
                onClick={(e) => props.handleOpen(e, i)}
              >
                View
              </button>
            </td>
            <td style={styles.collectionTitle}>
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
            </td>
          </tr>
        </tbody>
      ))}
    </Table>
  );
}

export default SuperAdminPropertiesTable;
