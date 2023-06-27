import { Button } from "@mui/material";
import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";

const StripeAccountMessageCard = (props) => {
  useEffect(() => {
    console.log("PRops in stripe card: ", props);
  }, []);
  return (
    <div
      className="d-flex mb-3"
      style={{ width: "100%", background: "RGB(0, 152, 210)", padding: "20px" }}
    >
      <div className="w-100">
        You haven't created a Stripe account yet. Without creating one, you
        cannot sell any NFT. Please create a Stripe account first in order to
        put NFT(s) on sale.
      </div>
      <div className="flex-shrink-1">
        <Button
          onClick={props.getOnboardingLink}
          style={{ whiteSpace: "nowrap" }}
          variant="contained"
          sx={{ backgroundColor: "#0096FF" }}
        >
          Create Account
        </Button>
      </div>
      <div className="flex-shrink-1">
        <CloseIcon />
      </div>
    </div>
  );
};

export default StripeAccountMessageCard;
