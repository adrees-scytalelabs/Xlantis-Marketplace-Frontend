import { useSnackbar } from "notistack";
import { default as React, default as React, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { topUpAmount } from "../../../../components/API/AxiosInterceptor";
import CircularBackdrop from "../../../../components/Backdrop/Backdrop";
import TopUpForm from "../../../../components/Forms/TopUpForm";

function TopUp(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };
  let location = useLocation();
  const [amount, setAmount] = useState(0.1);
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("session_id");
    const sessionId = localStorage.getItem('sessionId')
    if (id != null) {
      if (sessionId == id) {
        const active = searchParams.get("active");
        if (active == "true") {
          let variant = "success";
          enqueueSnackbar("Top Up Successfully", { variant });
          localStorage.removeItem('sessionId');
          const searchParams = new URLSearchParams(window.location.search);
          searchParams.delete('session_id');
          searchParams.delete('active');
          const newUrl = `${window.location.pathname}`;
          window.history.replaceState(null, '', newUrl);
        } else {
          let variant = "error";
          enqueueSnackbar("Top Up Unsccessfully", { variant });
          localStorage.removeItem('sessionId');
          const searchParams = new URLSearchParams(window.location.search);
          searchParams.delete('session_id');
          searchParams.delete('active');
          const newUrl = `${window.location.pathname}`;
          window.history.replaceState(null, '', newUrl);
        }
      }
    }
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
    handleShowBackdrop();
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
          handleCloseBackdrop();
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
      <CircularBackdrop open={open} />
    </div>
  );
}

export default TopUp;
