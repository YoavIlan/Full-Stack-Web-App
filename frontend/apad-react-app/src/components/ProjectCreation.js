import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import '../App.css';
import APIService from './APIService'
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import projectCreation from '../assets/projectCreation.jpg';

// Export the Project Creation component
export const ProjectCreation = () => {
  const[_id, setId] = useState('')
  const[name, setName] = useState('')
  const[description, setDescription] = useState('')
  const [data, setData] = useState([{}])

  // Navigate method for routing purposes
  const navigate = useNavigate();

  //The createProject function calls the create project api service from APIService class to process
  //json data load and send to mongodb
  const createProject = () =>{
      APIService.CreateProject({_id, name, description}).then(
        data => {
          setData(data)
          if (data.success) {
            // alert(data.message)
            // navigate("/dashboard")
            navigate("/project-detail", { state:{data} })
          }
          else {
            alert(data.message)
          }          
        }
      )
      .catch(error => console.log('error', error))
  }

  //The handleSubmit will be triggered upon clicking the create project button
  const handleSubmit = (event) => {
    createProject()
    setId('')
    setName('')
    setDescription('')
};

// navigate back to the dashboard when the user cancels project creation
const goToDashboard = (event) => {
  navigate("/dashboard");
}

  // Project Creation UI setup
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
                    backgroundImage: `url(${projectCreation})`,
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
                    Create a New Project
                    </Typography>
                    <Box
                      noValidate
                      sx={{ mt: 1 }}
                    >
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="Project ID" 
                        label="Project ID"
                        name = "Project ID"
                        autoComplete="Project ID"
                        value={_id}
                        onChange={(e) => setId(e.target.value)}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="Project Name" 
                        label="Project Name"
                        name = "Project Name"
                        autoComplete="Project Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}                        
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="Project Description" 
                        label="Project Description"
                        name = "Project Description"
                        autoComplete="Project Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}/>        
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => { handleSubmit();}}
                      >
                        Create Project
                      </Button>
                      <Button 
                      onClick={() => { goToDashboard();}}
                      > 
                        Cancel      
                      </Button>
                      {/* <Grid container>
                        <Grid item>
                          <Link href="#" variant="body2" onClick={() => { handleClick(); }}>
                            {"Don't have an account? Sign Up"}
                            
                          </Link>
                        </Grid>
                      </Grid> */}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
      </div>
      
    );
  }