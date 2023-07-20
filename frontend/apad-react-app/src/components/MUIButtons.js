import { Button } from '@mui/material';
import React from 'react'


//This is the Material UI Button component currently using across the whole web app
export const MUIButton = ({children, onClick, disabled, type}) => {
    return (
        <Button
        style={{padding:"5px", margin:"5px" }}
        size="large" variant="contained" length="fixed"
            // disabled={disabled}
            onclick={onClick}
            >{children} </Button>
    );
}