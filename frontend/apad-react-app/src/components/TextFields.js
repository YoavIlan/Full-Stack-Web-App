import { TextField } from '@mui/material'
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import React from 'react'

export const MUITextField = ({id,label, type, defaultValue, value, onChange}) => {
    return(
    <FormControl>
        <InputLabel htmlFor="component-outlined" style={{fontSize:15, paddingLeft:"10px", paddingTop:"50px"}}>{label}</InputLabel>
        <OutlinedInput
          id={id}
          defaultValue={defaultValue}
          type={type}
          label={label}
          style={{ minWidth: "350px", height:"auto", marginRight:"15px", marginLeft:"15px", marginBottom:"20px", marginTop:"50px" }}
          value={value}
          onChange={onChange}
        
        />
      </FormControl>        
    // <TextField
    // required
    // label = {label}
    // type = {type}
    // defaultValue={defaultValue}
    // style={{ minWidth: "350px", padding:"10px", boarder:"10px", margin:"20px" }}
    // />
    );

}