import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { topUpAmount } from "../../../../components/API/AxiosInterceptor";
import TopUpForm from "../../../../components/Forms/TopUpForm";

function TopUp(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [amount, setAmount] = useState(0.1);
  useEffect(() => {
    props.setActiveTab({
      dashboard: "",
      newCollection: "",
      myCollections: "",
      newNFT: "",
      myNFTs: "",
      marketplace: "",
      newDrop: "",
      myDrops: "",
      topUp: "active",
    });
  }, []);
  const handleTopUpAmount = (e) => {
    e.preventDefault();
    let data = {
      amount: amount,
    };
    topUpAmount(data)
      .then((response) => {
        window.location.replace(response.data.sessionUrl);
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
          let variant = "error";
          enqueueSnackbar("Something went wrong", { variant });
        }
      });
  };

  return (
    <div className="backgroundDefault">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Top Up</h3>
            <ul className="breadcrumb">
              <Link to={`/dashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <li className="breadcrumb-item active">Top Up</li>
            </ul>
          </div>
        </div>
      </div>
      <TopUpForm
        amount={amount}
        setAmount={setAmount}
        handleTopUpAmount={handleTopUpAmount}
      />
    </div>
  );
}

export default TopUp;
