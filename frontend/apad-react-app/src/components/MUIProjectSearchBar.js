import { Container, TextField } from "@mui/material";
import React from 'react'
import { useState } from "react";
import { MUIButton } from './MUIButtons';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";


export const MUIProjectSearchBar= ({children, onClick}) => {

    // Navigate method for routing purposes
    const navigate = useNavigate();


    //Set up password variable and setter method for password
    const [projectID, setProjectID] = useState("");
    //Set up data variable and setter method for data
    const [data, setData] = useState([{}])
  
  
    // Handle submit function when the log in button is clicked
    const handleSearch = (e) => {
      var address = "/api/getproj/"
      var id = projectID
      fetch(address+"/"+id).then(
        res => res.json()
      ).then(
        data => {
          setData(data)
          console.log(data)
          if(data.success){
            alert(data.message)
            navigate("/project-detail", { state:{data} })
          }

          if(data.success === false || id.length === 0){
            alert(data.message)
          }
        }
      )
  }
  return (
    <>
      <Container maxWidth="md" sx={{ mt: 20 }}>
        <Grid>
        <TextField  type="search" id="search" label="Search For Projects" sx={{ width: 750 }} 
        onChange={(e) => {setProjectID(e.target.value);console.log(e.target.value)}}
        />
        <MUIButton
              fullWidth
              variant="contained"
              onClick={() => { handleSearch();}}
              sx={{ mt: 10, mb: 2 }}
              
            >
              Search 
        </MUIButton>
        </Grid>
        <Grid container justifyContent="flex-start" style={{paddingBottom:"40px"}}>
              <Grid item>
                  (***Please type in a valid project id***)
              </Grid>
        </Grid>
      </Container>
    </>
  );
}
