import React from "react";
import { Link } from "react-router-dom";
import "../../../../assets/css/mediaQueries.css";
import videoBg from "../../../../assets/img/Seoul - 21116.mp4";

function HomeBanner() {
  return (
    <Link to={"/dashboard"}>
      <section className="section sectionHomeBanner">
        <div className="container-fluid">
          <div className="row no-gutters justify-content-center align-items-center">
            <div className="col-12">
              <div className="featuredContainer">
                <div className="featuredBackdrop"></div>
                <video
                  src={videoBg}
                  autoPlay
                  loop
                  mute
                  type="video/mp4"
                  className="videoContent"
                />
                <div className="videoContentText p-4">
                  <div className="row no-gutters align-items-end justify-content-sm-between justify-content-center">
                    <div className="col-12 col-sm-6">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
}

export default HomeBanner;
