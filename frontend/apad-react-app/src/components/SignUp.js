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
import { useNavigate } from "react-router-dom";

// Export Login component
export const SignUp = () => {
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
    console.log(data)
    addUsers()
    setEmail('')
    setPassword('')
  };

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
            Sign up
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
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {setEmail(e.target.value);console.log(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => {setPassword(e.target.value);console.log(e.target.value)}}
                />
              </Grid>
            </Grid>
            <MUIButton
              fullWidth
              variant="contained"
              onClick={() => { handleSubmit();}}
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </MUIButton>
            {/* Currently this part is not working */}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </MUIBox>
        </MUIBox>

    </div>
  );
}