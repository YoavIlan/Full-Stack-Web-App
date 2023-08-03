import {MUIButton} from './MUIButtons'
import { useNavigate } from "react-router-dom";
import Table from './Table'
import maindashboard from '../assets/maindashboard.jpg';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function Dashboard() {

    // Navigate method for routing purposes
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate("/");
      };

    // navigate to project creation page  
    const createProject = () => {
      navigate("/project-creation");
    }

    // Render system main dashboard after user sign in
    return (
        <div>
        <Container component="main" maxWidth="lg" align="center">
          <Container component="main" maxWidth="lg">
            <Box
              sx={{
                marginTop: 8,
              }}
            >
              <Grid container xs={18}>
                <CssBaseline />
                <Grid
                  item
                  xs={false}
                  sm={4}
                  md={7}
                  sx={{
                    backgroundImage: `url(${maindashboard})`,
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
                  xs={50}
                  sm={80}
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
                      System Dashboard
                    </Typography>
                    <Box
                      noValidate
                      sx={{ mt: 1 }}
                      align="center"
                    >
                      <Table />
                      
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>

        <MUIButton
        onClick={() => { handleClick()}}>
          Return to Log In
        </MUIButton>            
        <MUIButton
        onClick={() => {createProject()}}>
          Create a New Project
        </MUIButton>
        </Container> 

     
        </div>
    )
}
