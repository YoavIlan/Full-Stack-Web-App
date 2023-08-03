import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import '../App.css';
import { useNavigate, useLocation} from "react-router-dom";
import projectDetail from '../assets/projectDetail.jpg';
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import CheckInOut from './CheckInOut';

// Export Login component
export const ProjectDetail = (_params) => {
    const {state} = useLocation();


    // Navigate method for routing purposes
    const navigate = useNavigate();

    //The handleSubmit will be triggered upon clicking the submit button
    const handleCancel = () => {
        navigate("/dashboard")
    }

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
                  alignt="center"
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
                        <h2>{state.data.data["name"]}</h2>
                        <h4>{state.data.data["desc"]}</h4>
                      <Grid item xs={11.5} alignt="center">

                      <CheckInOut/>    
                  </Grid>   
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

    </div>
  );
}