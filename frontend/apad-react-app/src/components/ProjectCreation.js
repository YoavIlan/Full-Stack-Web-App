import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import '../App.css';
import { MUIButton } from './MUIButtons';
import { MUIBox } from './MUIBox';
import APIService from './APIService'
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';

// Export the Project Creation component
export const ProjectCreation = () => {
  const[_id, setId] = useState('')
  const[name, setName] = useState('')
  const[description, setDescription] = useState('')
  const [data, setData] = useState([{}])

  //The add user function to call the create project api service from APIService class to process json data load
  //And send to the mongodb
  const createProject = () =>{
      APIService.CreateProject({_id, name, description}).then(
        data => {
          setData(data)
          console.log(data)
          alert(data.message)
        }
      )
      .catch(error => console.log('error', error))
  }

  //The handleSubmit will be triggered upon clicking the create project button
  const handleSubmit = (event) => {
    console.log(_id)
    console.log(name)
    console.log(description)
    createProject()
    setId('')
    setName('')
    setDescription('')
};

  // Project Creation UI setup
    return (
      <div className="App">
        <CssBaseline />
          <Typography component="h1" variant="h5">
            Create a New Project
          </Typography>
          
          <MUIBox component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="Project Name" 
            label="Project Name"
            name = "Project Name"
            autoComplete="Project Name"
            value={name}
            onChange={(e) => {setName(e.target.value);console.log(e.target.value)}}
            />
            </Grid>
            <Grid item xs={12}>
           <TextField
            required
            fullWidth
            id="Project ID" 
            label="Project ID"
            name = "Project ID"
            autoComplete="Project ID"
            value={_id}
            onChange={(e) => {setId(e.target.value);console.log(e.target.value)}}
            />
            </Grid>
            <Grid item xs={12}>
           <TextField
            required
            fullWidth
            id="Project Description" 
            label="Project Description"
            name = "Project Description"
            autoComplete="Project Description"
            value={description}
            onChange={(e) => {setName(e.target.value);console.log(e.target.value)}}
            />
            </Grid>
          </Grid>
          <MUIButton
          fullWidth
          variant="contained"
          onClick={() => { handleSubmit();}}
          sx={{ mt: 3, mb: 2 }}>
            Create Project
          </MUIButton>
          <MUIButton > 
            {/* Need to add routing functionality here */}
            Cancel      
          </MUIButton>
          </MUIBox>
      </div>
      
    );
  }