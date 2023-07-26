import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import React from 'react'

//This is the Material UI Text Field component currently using across the whole web app
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
    );

}