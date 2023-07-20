import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

const WhiteSpinner = () => {
  return (
    <div align="center" className="text-center">
      <CircularProgress sx={{ color: "#FFFFFF" }} size={30} />
      <span className="sr-only spinnerWhite">Loading...</span>
    </div>
  );
};

export default WhiteSpinner;
