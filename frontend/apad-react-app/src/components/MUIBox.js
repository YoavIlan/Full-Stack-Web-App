import * as React from 'react';
import Box from '@mui/material/Box';

export const MUIBox = ({width, height, backgroundColor, hover, component, children, display}) => {
  return (
    <Box
    width= "450px"
    height= "300px"
    backgroundColor= "white"
    hover="{
      backgroundColor: 'primary.main'
      opacity: [0.9, 0.8, 0.7]"
    component="form"
    display={'block'}
    style={{padding:"auto", margin:"auto", alignItems:"left", justifyContent:"center" }}
    >{children}</Box>
  );
}