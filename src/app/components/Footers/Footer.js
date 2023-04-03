import React from "react";
import "../../assets/css/bootstrap.min.css";
import "../../assets/plugins/fontawesome/css/fontawesome.min.css";
import "../../assets/plugins/fontawesome/css/all.min.css";
import "../../assets/css/style.css";
import { Link } from "react-router-dom";

function Footer(props) {
  return (
    <footer className="footer foot" style={{ position: props.position }}>
      <div className="footer-bottom">
        <div className="container-fluid">
          <div className="copyright">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-6">
                <div className="copyright-text">
                  <p className="mb-0 text-center text-md-left">
                    &copy; 2023 XLANTIS. All rights reserved.
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <div className="copyright-menu">
                  <ul className="policy-menu text-center text-md-right">
                    <li>
                      <Link to="/termsandconditions">Terms and Conditions</Link>
                    </li>
                    <li>
                      <Link to="/privacy-policy">
                        Policy
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
