


import { Alert, Snackbar } from '@mui/material'
import React from 'react'

function NotificationSnackbar(props) {
    return (
        <Snackbar open={props.open} autoHideDuration={6000} onClose={props.handleClose}>
            <Alert severity={props.severity} sx={{ width: '100%' }}>
                {props.message}
            </Alert>
        </Snackbar>
    )
}

export default NotificationSnackbar
