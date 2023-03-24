import React, { useEffect } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
function AdminInformationModal(props) {
  const classes = useStyles();
  useEffect(() => {
    console.log(props.adminData);
    console.log("Reach Template Data", props);
  }, [props]);
  return (
    props.show == true && (
      <Modal
        show={props.show}
        onHide={props.handleClose}
        centered
        backdrop="static"
      >
        <Modal.Header
          className="NewTemplateHeader"
          style={{ background: "black", color: "white" }}
        >
          <Modal.Title style={{ background: "black", color: "white" }}>
            Admin Details
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          className="NewTemplateBody"
          style={{ borderBottom: "none" }}
        >
          <div style={{ margin: "10px" }}>
            <Row className="justify-content-center align-items-center no-gutters">
              <Col>
                Username
                <input
                  name="title"
                  type="text"
                  disabled
                  value={props.adminData.username}
                  className="newNftProps mt-1"
                />
              </Col>
            </Row>
            <Row className="justify-content-center align-items-center no-gutters mt-1">
              <Col>
                Company Name
                <input
                  name="title"
                  type="text"
                  disabled
                  value={props.adminData.companyName}
                  className="newNftProps mt-1"
                />
              </Col>
            </Row>
            <Row className="justify-content-center align-items-center no-gutters mt-1">
              <Col>
                Designation
                <input
                  name="title"
                  type="text"
                  disabled
                  value={props.adminData.designation}
                  className="newNftProps mt-1"
                />
              </Col>
            </Row>
            <Row className="justify-content-center align-items-center no-gutters mt-1">
              <Col>
                Domain
                <input
                  name="title"
                  type="text"
                  disabled
                  value={props.adminData.domain}
                  className="newNftProps mt-1"
                />
              </Col>
            </Row>
            <Row className="justify-content-center align-items-center no-gutters mt-1">
              <Col>
                Industry Type
                <input
                  name="title"
                  type="text"
                  disabled
                  value={props.adminData.industryType}
                  className="newNftProps mt-1"
                />
              </Col>
            </Row>
            <Row className="justify-content-center align-items-center no-gutters mt-1">
              <Col>
                Reason of Interest
                <input
                  name="title"
                  type="text"
                  disabled
                  value={props.adminData.reasonForInterest}
                  className="newNftProps mt-1"
                />
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "black",
            border: "1px solid white",
            borderTop: "none",
          }}
        >
          <button className="newTemplateBtn mb-3" onClick={props.handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    )
  );
}

export default AdminInformationModal;
