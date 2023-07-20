import { TextField } from '@mui/material'
import React from 'react'

export const MUITextField = ({label, type, defaultValue}) => {
    return(
    <TextField
    required
    label = {label}
    type = {type}
    defaultValue={defaultValue}
    style={{ minWidth: "350px", padding:"10px", boarder:"10px", margin:"20px" }}
    />
    );

}