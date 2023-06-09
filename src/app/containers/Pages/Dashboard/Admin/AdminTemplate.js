import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MessageCard from "../../../../components/MessageCards/MessageCard";
import PropertiesTable from "../../../../components/tables/PropertiesTable";

function AdminTemplate(props) {
  const [templateData, setTemplateData] = useState([]);
  const [deleteData, setDeleteData] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [deleteState, setDeleteState] = useState(false);
  const [modalData, setModalData] = useState();
  const [updateModal, setUpdateModal] = useState(true);
  const handleCloseBackdrop = () => {
    setOpen(false);
  };
  const handleShowBackdrop = () => {
    setOpen(true);
  };
  const handleOpen = (e, data) => {
    e.preventDefault();
    setModalData(data);
    setUpdateModal(true);
    setModalState(true);
  };
  useEffect(() => {
    props.setActiveTab({
      dashboard: "",
      newCollection: "",
      myCollection: "",
      newNFT: "",
      myNFTs: "",
      marketplace: "",
      newDrop: "",
      myDrops: "",
      topUp: "",
      templates: "active",
    });
  }, []);
  return (
    <div className="backgroundDefault">
      <div className="page-header mt-4 mt-lg-2 pt-lg-2 mt-4 mt-lg-2 pt-lg-2">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="page-title">Templates</h3>
            <ul className="breadcrumb">
              <Link to={`/dashboard`}>
                <li className="breadcrumb-item slash" style={{ color: "#777" }}>
                  Dashboard
                </li>
              </Link>
              <li className="breadcrumb-item active">Template</li>
            </ul>
          </div>
        </div>
      </div>
      {templateData.length ? (
        <div className="row no-gutters">
          <PropertiesTable
            templateData={templateData}
            handleOpen={handleOpen}
            handleDeleteModal={handleOpen}
            handleUpdatedData={handleOpen}
          />
        </div>
      ) : (
        <MessageCard msg="No templates created" />
      )}
    </div>
  );
}

export default AdminTemplate;
