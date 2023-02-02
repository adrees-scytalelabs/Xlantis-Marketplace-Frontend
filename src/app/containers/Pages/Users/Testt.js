// REACT
import { Card, Typography } from "@material-ui/core";
import React, { useState } from "react";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const Testt = () => {
  const [isActive, setIsActive] = useState(false);
  let newArOb = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }];

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      <div
        className="row no-gutters align-items-center position-relative px-4"
        style={{ minHeight: "90vh", overflowX: "hidden", overflowY: "hidden" }}
      >
        <div className={isActive ? "saleCardSlider slide" : "saleCardSlider"}>
          {newArOb.map((item, index) => (
            <div className="col-3 p-3 d-inline-block" key={index}>
              <Card
                style={{
                  height: 400,
                  width: "100%",
                  textAlign: "center",
                  display: "flex",
                  backgroundColor: "#F64D04",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h1"
                  component="h1"
                  style={{ color: "white" }}
                >
                  {item.a}
                </Typography>
              </Card>
            </div>
          ))}
        </div>
        <div className="paddles">
          {isActive ? (
            <button className="left-paddle paddle" onClick={handleClick}>
              <ArrowLeftIcon style={{ color: "white" }} />
            </button>
          ) : (
            <button className="left-paddle paddle paddle-disabled">
              <ArrowLeftIcon style={{ color: "#9797977d" }} />
            </button>
          )}
          {isActive ? (
            <button
              className="right-paddle paddle paddle-disabled"
              disabled
              style={{ cursor: "pointer" }}
            >
              <ArrowRightIcon style={{ color: "#9797977d" }} />
            </button>
          ) : (
            <button className="right-paddle paddle" onClick={handleClick}>
              <ArrowRightIcon style={{ color: "white" }} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Testt;
