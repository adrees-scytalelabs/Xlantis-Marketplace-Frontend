import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

const BlackSpinner = () => {
  return (
    <div align="center" className="text-center">
      <CircularProgress sx={{ color: "#000000" }} />
      <span className="sr-only spinnerWhite">Loading...</span>
    </div>
  );
};

export default BlackSpinner;
