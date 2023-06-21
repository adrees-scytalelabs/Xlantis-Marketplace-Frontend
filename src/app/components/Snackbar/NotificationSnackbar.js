


import { Alert, Snackbar } from '@mui/material'
import React from 'react'

function NotificationSnackbar(props) {
    return (
        <Snackbar open={props.open} sx={{ zIndex: 9999 }} autoHideDuration={6000} onClose={props.handleClose}>
            <Alert severity={props.severity} sx={{ width: '100%',zIndex: 9999 }}>
                {props.message}
            </Alert>
        </Snackbar>
    )
}

export default NotificationSnackbar
