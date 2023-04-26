import axios from "axios";
import Cookies from "js-cookie";

const handleClose = (setShow) => setShow(false);
const handleShow = (setShow) => setShow(true);
export const handleModalOpen = (e, data, setShow, setModalData) => {
  e.preventDefault();
  handleShow(setShow);
  setModalData(data);
};
export const handleModalClose = (e, setShow) => {
  e.preventDefault();
  handleClose(setShow);
};
const handleCloseBackdrop = (setOpen) => {
  setOpen(false);
};
const handleShowBackdrop = (setOpen) => {
  setOpen(true);
};

