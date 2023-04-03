import React from "react";
import Carousel from "../../../../components/carousel/Carousel";

const FixedPriceDrops = (props) => {
  return (
    <div className="w-100">
      <div
        style={{
          maxWidth: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: 12,
        }}
      >
        <Carousel show={1} infiniteLoop={true}>
          <div style={{ padding: 8, borderRadius: 12 }}>
            <img
              src="https://via.placeholder.com/1600x300"
              alt="placeholder"
              style={{ width: "100%", height: 360, borderRadius: 12 }}
            />
          </div>
          <div style={{ padding: 8, borderRadius: 12 }}>
            <img
              src="https://via.placeholder.com/1600x300"
              alt="placeholder"
              style={{ width: "100%", height: 360, borderRadius: 12 }}
            />
          </div>
          <div style={{ padding: 8, borderRadius: 12 }}>
            <img
              src="https://via.placeholder.com/1600x300"
              alt="placeholder"
              style={{ width: "100%", height: 360, borderRadius: 12 }}
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default FixedPriceDrops;
