import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {useEffect} from "react";

type props = {
    showSnackBar: boolean
    messageFromServer: string
    setMessageFromServer: (arg0:string)=>void
}

export default function SimpleSnackbar({showSnackBar, messageFromServer,setMessageFromServer}:props) {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    useEffect(()=>{
        if(showSnackBar && messageFromServer.length > 1) {
            setOpen(true)
        }
        if (messageFromServer.length < 1) {
            setOpen(false)
        }
    },[messageFromServer,showSnackBar])

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setMessageFromServer('')
    };

    const action = (
        <React.Fragment>

            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={`Message from server: ${messageFromServer}`}
                action={action}
            />
        </div>
    );
}
