import React, {useEffect} from "react";
import { Col, Modal, Row } from "react-bootstrap";

function AdminInformationModal(props) {
  useEffect(() => {
    console.log(props.adminData);
    console.log("Reach Template Data", props);
  },[props]);
  return (
    props.show == true && (
        <Modal
          show={props.show}
          onHide={props.handleClose}
          centered
          backdrop="static"
        >
          <Modal.Header>Admin Details</Modal.Header>
  
          <Modal.Body>
            <div style={{ margin: "10px" }}>
              <Row className="justify-content-center align-items-center no-gutters">
                <Col style={{ color: "#000" }}>
                  Username
                  <input
                    name="title"
                    type="text"
                    disabled
                    value={props.adminData.username}
                    className="newNftProps"
                  />
                </Col>
              </Row>
              <Row className="justify-content-center align-items-center no-gutters">
                <Col style={{ color: "#000" }}>
                  Company Name
                  <input
                    name="title"
                    type="text"
                    disabled
                    value={props.adminData.companyName}
                    className="newNftProps"
                  />
                </Col>
              </Row>
              <Row className="justify-content-center align-items-center no-gutters">
                <Col style={{ color: "#000" }}>
                  Designation
                  <input
                    name="title"
                    type="text"
                    disabled
                    value={props.adminData.designation}
                    className="newNftProps"
                  />
                </Col>
              </Row>
              <Row className="justify-content-center align-items-center no-gutters">
                <Col style={{ color: "#000" }}>
                  Domain
                  <input
                    name="title"
                    type="text"
                    disabled
                    value={props.adminData.domain}
                    className="newNftProps"
                  />
                </Col>
              </Row>
              <Row className="justify-content-center align-items-center no-gutters">
                <Col style={{ color: "#000" }}>
                  Industry Type
                  <input
                    name="title"
                    type="text"
                    disabled
                    value={props.adminData.industryType}
                    className="newNftProps"
                  />
                </Col>
              </Row>
              <Row className="justify-content-center align-items-center no-gutters">
                <Col style={{ color: "#000" }}>
                  Reason of Interest
                  <input
                    name="title"
                    type="text"
                    disabled
                    value={props.adminData.reasonForInterest}
                    className="newNftProps"
                  />
                </Col>
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn"
              type="button"
              style={{
                margin: "10px",
                marginRight: 0,
                backgroundColor: "black",
                border: "1px solid #fff",
                borderRadius: 0,
                padding: 10,
              }}
              onClick={props.handleClose}
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>
      )
  );
}

export default AdminInformationModal;
