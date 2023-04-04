import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Table from "react-bootstrap/Table";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 300,
  },
  noMaxWidth: {
    maxWidth: "none",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  badge: {
    "& > *": {
      margin: theme.spacing(1),
    },
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
}));
function SuperAdminPropertiesTable(props) {
  const classes = useStyles();
  return (
    <Table responsive>
      <thead>
        <tr>
          <th className={classes.tableHeader}>
            <div className="row no-gutters justify-content-start align-items-center">
              Template Name
            </div>
          </th>
          <th className={classes.tableHeader}>
            <div className="row no-gutters justify-content-start align-items-center">
              No of Properties
            </div>
          </th>
          <th className={`${classes.tableHeader}`}>
            <div className="ml-5">Details</div>
          </th>
          <th className={classes.tableHeader}>
            <div className="row no-gutters justify-content-start align-items-center">
              Delete/Edit
            </div>
          </th>
        </tr>
      </thead>
      {props.templateData.map((i, index) => (
        <tbody>
          <tr>
            <td className={classes.collectionTitle}>{i.name}</td>
            <td className={`${classes.collectionTitle}`}>
              <div className="justify-content-center align-items-center ml-5">
                {" "}
                {i.properties.length}{" "}
              </div>
            </td>
            <td className={classes.collectionTitle}>
              <button
                className="btn submit-btn propsActionBtn "
                onClick={(e) => props.handleOpen(e, i)}
              >
                View
              </button>
            </td>
            <td className={classes.collectionTitle}>
              <span className="ml-4">
                <button style={{ background: "transparent", border: "none" }}>
                  <DeleteIcon
                    color="action"
                    style={{ color: "red" }}
                    onClick={(e) => props.handleDeleteModal(e, i)}
                  ></DeleteIcon>
                </button>
              </span>
              <span className="ml-1">
                <button style={{ background: "transparent", border: "none" }}>
                  <EditIcon
                    style={{ color: `green` }}
                    onClick={(e) => props.handleUpdatedData(e, i)}
                  ></EditIcon>
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
