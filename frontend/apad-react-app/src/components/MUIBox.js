import * as React from 'react';
import Box from '@mui/material/Box';

//This is the Material UI Box component currently using across the whole web app
export const MUIBox = ({ children, component}) => {
  return (
    <Box
    width= "450px"
    height= "300px"
    backgroundColor= "white"
    hover="{
      backgroundColor: 'primary.main'
      opacity: [0.9, 0.8, 0.7]"
    component={component}
    display={'block'}
    style={{padding:"auto", margin:"auto", alignItems:"left", justifyContent:"center" }}
    >{children}</Box>
  );
}