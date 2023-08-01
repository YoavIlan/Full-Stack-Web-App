import * as React from 'react';
import { useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import user from '../user.png';
import '../App.css';
import { MUIButton } from './MUIButtons';
import { MUIBox } from './MUIBox';
import APIService from './APIService'
import { useNavigate, useLocation} from "react-router-dom";
import projectDetail from '../projectDetail.jpg';
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";

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
                    backgroundImage: `url(${projectDetail})`,
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
                    Project Details
                    </Typography>
                    <Box
                      noValidate
                      sx={{ mt: 1 }}
                    >
                      <TextField
                        margin="normal"
                        variant="standard"
                        fullWidth
                        id="Project ID" 
                        label="Project ID"
                        name = "Project ID"
                        value={state.data.data["_id"]}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <TextField
                        margin="normal"
                        variant="standard"
                        fullWidth
                        id="Project Name" 
                        label="Project Name"
                        name = "Project Name"
                        value={state.data.data["name"]}
                        InputProps={{
                          readOnly: true,
                        }}                       
                      />
                      <TextField
                        margin="normal"
                        variant="standard"
                        fullWidth
                        id="Project Description" 
                        label="Project Description"
                        name = "Project Description"
                        value={state.data.data["desc"]}
                        InputProps={{
                          readOnly: true,
                        }}/> 
                    {/* <Grid> */}
                      <Grid item xs={6}>
                        <TextField
                          variant="standard"
                          fullWidth
                          name="projectDesc"
                          label="Bike Current Usage"
                          id="projectDesc"
                          InputProps={{
                            readOnly: true,
                          }}
                          value={state.data.data.resources["bikes"]}
                        /> 
                      {/* <Grid item xs={6}> */}
                        <TextField
                          variant="standard"
                          fullWidth
                          name="projectDesc"
                          label="Scooters Current Usage"
                          id="projectDesc"
                          InputProps={{
                            readOnly: true,
                          }}
                          value={state.data.data.resources["scooters"]}
                        />
                      {/* </Grid>
                      </Grid>                          */}
                  </Grid>       
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => { handleSubmit();}}
                      >
                        Update
                      </Button>
                      <Button 
                      onClick={() => { handleCancel();}}
                      > 
                        Cancel      
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>

        {/* <CssBaseline />
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
          <MUIBox component="span" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  fullWidth
                  id="projectID"
                  label="Project ID"
                  name="projectID"
                  value={state.data.data["_id"]}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  fullWidth
                  name="projectName"
                  label="Project Name"
                  id="projectName"
                  value={state.data.data["name"]}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  fullWidth
                  name="projectDesc"
                  label="Project Description"
                  id="projectDesc"
                  value={state.data.data["desc"]}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  name="projectDesc"
                  label="Bike Current Usage"
                  id="projectDesc"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={state.data.data.resources["bikes"]}
                />
              </Grid>  
              <Grid item xs={6}>
              <TextField
                  variant="standard"
                  fullWidth
                  name="projectDesc"
                  label="Scooters Current Usage"
                  id="projectDesc"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={state.data.data.resources["scooters"]}
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
        </MUIBox> */}

    </div>
  );
}