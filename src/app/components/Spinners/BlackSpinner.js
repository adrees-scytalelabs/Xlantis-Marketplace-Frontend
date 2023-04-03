import React from "react";
import { Spinner } from "react-bootstrap";

const BlackSpinner = () => {
  return (
    <div align="center" className="text-center">
      <Spinner
        animation="border"
        role="status"
        style={{ color: "#000" }}
      ></Spinner>
      <span className="sr-only spinnerWhite">Loading...</span>
    </div>
  );
};

export default BlackSpinner;
