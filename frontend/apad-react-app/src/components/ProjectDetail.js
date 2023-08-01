import * as React from 'react';
import { useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import user from '../user.png';
import '../App.css';
import { MUIButton } from './MUIButtons';
import { MUIBox } from './MUIBox';
import APIService from './APIService'
import { useNavigate, useLocation} from "react-router-dom";

// Export Login component
export const ProjectDetail = (params) => {
    const {state} = useLocation();
    // const { id, color } = state; // Read values passed on state
    console.log(state)
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    // First name and Last name could be used for post MVP
    // const[firstName, setFirstName] = useState('')
    // const[lastName, setLastName] = useState('')
    const [data, setData] = useState([{}])


    // Navigate method for routing purposes
    const navigate = useNavigate();

    //The add user function to call the add user api service from APIService class to process json data load
    //And send to the mongodb
    const addUsers = () =>{
        APIService.AddUsers({email, password}).then(
          data => {
            setData(data)
            console.log(data)
            if (data.success) {
              navigate("/dashboard")
            }
            else {
              alert(data.message)
            }
          }
        )
        .catch(error => console.log('error', error))
    }

    //The handleSubmit will be triggered upon clicking the submit button
    const handleSubmit = (event) => {
    console.log(email)
    console.log(password)
    addUsers()
    setEmail('')
    setPassword('')
  };
    const handleCancel = (event) => {
        navigate("/dashboard")
    }

    const handleClick = (event) => {
    navigate("/");
  };

  // The UI setup for the sign up front end
  return (
    <div className="App">
        <CssBaseline />
        <MUIBox
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <img src={user} className="login-pic" alt="logo" />
          <Typography component="h1" variant="h5">
            Project Details
          </Typography>
          <MUIBox component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>

            {/* Below is the text field for first name and last name, could use it for post MVP but commented out for now */}
              {/* <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="projectID"
                  label="Project ID"
                  name="projectID"
                  value={state.data.data["_id"]}
                  onChange={(e) => {setEmail(e.target.value);console.log(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="projectName"
                  label="Project Name"
                  id="projectName"
                  value={state.data.data["name"]}
                  onChange={(e) => {setPassword(e.target.value);console.log(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="projectDesc"
                  label="Project Description"
                  id="projectDesc"
                  value={state.data.data["desc"]}
                  onChange={(e) => {setPassword(e.target.value);console.log(e.target.value)}}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="projectDesc"
                  label="Bike Capacity"
                  id="projectDesc"
                  value={state.bikeCapa}
                  disabled
                />
                {/* <TextField
                  fullWidth
                  name="projectDesc"
                  label="Project Description"
                  id="projectDesc"
                  value={state.data.data["desc"]}
                  onChange={(e) => {setPassword(e.target.value);console.log(e.target.value)}}
                />
                <TextField
                  fullWidth
                  name="projectDesc"
                  label="Project Description"
                  id="projectDesc"
                  value={state.data.data["desc"]}
                  onChange={(e) => {setPassword(e.target.value);console.log(e.target.value)}}
                /> */}
              </Grid>  
              <Grid item xs={6}>
              <TextField
                  fullWidth
                  name="projectDesc"
                  label="Bikes Availability"
                  id="projectDesc"
                //   value={avaBikes}
                  value={state.bikeAva}
                  disabled
                />
                </Grid>                         
            </Grid>
            <MUIButton
              fullWidth
              variant="contained"
              onClick={() => { handleSubmit();}}
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </MUIButton>
            <MUIButton
              
              variant="contained"
              onClick={() => { handleCancel();}}
              sx={{ mt: 3, mb: 2 }}
            >
              Cancel
            </MUIButton>
          </MUIBox>
        </MUIBox>

    </div>
  );
}