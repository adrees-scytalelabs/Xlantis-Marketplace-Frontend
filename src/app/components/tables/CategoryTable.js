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

function CategoryTable({categoryData,handleEditModalOpen,handleViewDetail}) {
  return (
    <Table responsive>
      <thead style={{ color: "black" }}>
        <tr>
          <th style={styles.tableHeader}>
            <div className="row no-gutters justify-content-start align-items-center">
              #
            </div>
            </th>
            <th style={styles.tableHeader}>
            <div className="row no-gutters justify-content-start align-items-center">
              Category Name
            </div>
          </th>
          <th style={styles.tableHeader}>
            <div className="ml-5">Details</div>
          </th>
          <th style={styles.tableHeader}>
            <div className="row no-gutters justify-content-start align-items-center">
              Edit
            </div>
          </th>
        </tr>
      </thead>
      <tbody style={{ color: "white" }}>
        {categoryData?.map((i, index) => (
          <tr key={index}>
            <td style={styles.collectionTitle}>{index}</td>
            <td style={styles.collectionTitle}>{i.name}</td>
            <td style={styles.collectionTitle}>
              <button
                className="btn submit-btn propsActionBtn "
                onClick={(e) => handleViewDetail(e, i)}
              >
                View
              </button>
            </td>
            <td style={styles.collectionTitle}>
              <span className="ml-1">
                <button style={{ background: "transparent", border: "none" }}>
                  <EditIcon
                    style={{ color: `green` }}
                    onClick={(e) => handleEditModalOpen(e, i)}
                  />
                </button>
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default CategoryTable;
