import React, { useEffect } from 'react'
import { Link } from "react-router-dom";

function TemplateProperties(props) {
  useEffect(() => {
    props.setActiveTab({
      dashboard: "",
      manageAccounts: "",
      accountApproval: "",
      accounts: "",
      sso: "",
      wallet: "",
      properties:"active",
      template:"active",
      saved:"active",
    }); // eslint-disable-next-line
  }, []);
  return (
    <div className="backgroundDefault">
      {/* Page Header */}
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Add NFT properties</h3>
            <ul className="breadcrumb">
              <Link to={`/superAdminDashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <li className="breadcrumb-item active">properties</li>
            </ul>
          </div>
        </div>
      </div>
      </div>
  )
}

export default TemplateProperties