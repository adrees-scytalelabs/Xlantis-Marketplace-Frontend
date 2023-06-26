import React from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import WhiteSpinner from "../Spinners/WhiteSpinner";

const StripeAccountCreationModal = (props) => {
  const navigate = useNavigate();
  return (
    <Modal show={props.show} onHide={props.handleClose} centered>
      <Modal.Header>
        <Modal.Title>Create your Account!</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          border: "1px solid white",
          borderTop: "none",
          borderBottom: "none",
          backgroundColor: "#000",
          justifyContent: "center",
        }}
      >
        <div>
          <p>You don't have a stripe account yet.</p>
          <p>Create your account to access additional features.</p>
          {/* Provide options for the user to sign up or take any other desired action */}
        </div>
      </Modal.Body>
      <Modal.Footer
        style={{
          backgroundColor: "#000",
          border: "1px solid white",
        }}
      >
        <button
          className="newTemplateBtn mb-3"
          onClick={() => {
            navigate("/");
            props.handleClose();
          }}
          style={{ backgroundColor: "#000" }}
        >
          Cancel
        </button>
        {props.isLoading ? (
          <button
            style={{
              width: "25%",
              backgroundColor: "#000",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="newTemplateBtn mb-3"
          >
            <Spinner
              animation="border"
              role="status"
              style={{ color: "#fbfeff" }}
            />
          </button>
        ) : (
          <button
            className="newTemplateBtn mb-3"
            onClick={props.getOnboardingLink}
            style={{ backgroundColor: "#000" }}
          >
            Create Account
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default StripeAccountCreationModal;
