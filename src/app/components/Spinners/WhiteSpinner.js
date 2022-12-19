import React from "react";
// BOOTSTRAP COMPONENTS
import { Spinner } from "react-bootstrap";

const WhiteSpinner = () => {
  return (
    <div align="center" className="text-center">
      <Spinner
        animation="border"
        role="status"
        style={{ color: "#fff" }}
      ></Spinner>
      <span className="sr-only spinnerWhite">Loading...</span>
    </div>
  );
};

export default WhiteSpinner;
