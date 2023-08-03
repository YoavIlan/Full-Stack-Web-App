import { Container, TextField } from "@mui/material";
import React from 'react'
import { useState } from "react";
import { MUIButton } from './MUIButtons';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';


export const MUIProjectSearchBar= ({}) => {

    // Navigate method for routing purposes
    const navigate = useNavigate();


    //Set up password variable and setter method for password
    const [projectID, setProjectID] = useState("");
    //Set up data variable and setter method for data
    const [data, setData] = useState([{}])
  
  
    // Handle submit function when the log in button is clicked
    const handleSearch = (e) => {
      var address = "/api/getproj"
      var id = projectID
      fetch(address+"/"+id).then(
        res => res.json()
      ).then(
        data => {
          setData(data)
          if(data.success){
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
      <Container maxWidth="md" sx={{ mt: 2, width: "100%" }} >
        <Grid>
        <TextField  type="search" id="search" label="Search For Projects"  sx={{width: "100%" }}
        onChange={(e) => {setProjectID(e.target.value)}}
        />
        </Grid>
        <MUIButton
              fullWidth
              variant="contained"
              onClick={() => { handleSearch();}}
              sx={{ mt: 10, mb: 12 }}
              
            >
              Search 
        </MUIButton>
        <Grid container justifyContent="flex-start" >
              <Grid item>
              <Typography component="h6" variant="h6">
              (***Please type in a valid project id***)
                    </Typography>
                  
              </Grid>
        </Grid>
      </Container>
    </>
  );
}
