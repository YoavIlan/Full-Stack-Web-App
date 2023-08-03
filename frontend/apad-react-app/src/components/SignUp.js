import * as React from 'react';
import { useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import '../App.css';
import APIService from './APIService'
import { useNavigate } from "react-router-dom";
import uttowersignup from '../assets/uttowersignup.jpg';
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";

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
    addUsers()
    setEmail('')
    setPassword('')
  };

  // The UI setup for the sign up front end
  return (
    <div className="App">
      <Container component="main" maxWidth="lg">
            <Box
              sx={{
                marginTop: 8,
              }}
            >
              <Grid container>
                <CssBaseline />
                <Grid
                  item
                  xs={false}
                  sm={4}
                  md={7}
                  sx={{
                    backgroundImage: `url(${uttowersignup})`,
                    backgroundRepeat: "no-repeat",
                    backgroundColor: (t) =>
                      t.palette.mode === "light"
                        ? t.palette.grey[50]
                        : t.palette.grey[900],
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={5}
                  component={Paper}
                  elevation={6}
                  square
                >
                  <Box
                    sx={{
                      my: 8,
                      mx: 4,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography component="h1" variant="h5">
                      Sign Up
                    </Typography>
                    <Box
                      noValidate
                      sx={{ mt: 1 }}
                    >
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}  
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => { handleSubmit();}}
                      >
                        Submit
                      </Button>
                      <Grid container>
                        <Grid item>
                          <Link href="/" variant="body2">
                            {"Already have an account? Sign In"}
                            
                          </Link>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>

    </div>
  );
}