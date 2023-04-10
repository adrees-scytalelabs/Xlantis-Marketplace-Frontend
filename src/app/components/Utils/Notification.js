import React from "react";
import { useSnackbar } from "notistack";
function Notification(props) {
  const { enqueueSnackbar } = useSnackbar();
  let handleNotification = (variant, note) => {
    let message = note;
    enqueueSnackbar(message, { variant });
    props.setLoad(false);
  };
  return (
    props.load == true && (
      <div>{handleNotification(props.variant, props.notificationData)}</div>
    )
  );
}

export default Notification;
