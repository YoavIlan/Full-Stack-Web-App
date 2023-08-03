import '../App.css';
import React, { useState } from "react";
import uttower from '../assets/uttower.jpg';
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
// Export Login component
export const LogIn = () => {

  //Set up email variable and setter method for email
  const [email, setEmail] = useState("");
  //Set up password variable and setter method for password
  const [password, setPassword] = useState("");
  //Set up data variable and setter method for data
  const [data, setData] = useState([{}])

  // Navigate method for routing purposes
  const navigate = useNavigate();

  // Handle click for routing to Sign Up Page
  const handleClick = (e) => {
    navigate("/sign-up");
  }

  // Handle submit function when the log in button is clicked
  const handleSubmit = (e) => {
    var address = "/api/getuser"
    var userEmail = email
    var userPassword = password
    fetch(address+"/"+userEmail+"/"+userPassword).then(
      res => res.json()
    ).then(
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
}
// The login page ui setup
  return (
    <div className="App" >
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
                    backgroundImage: `url(${uttower})`,
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
                      Sign in
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
                        onClick={() => { handleSubmit(); }}
                      >
                        Sign In
                      </Button>
                      <Grid container>
                        <Grid item>
                          <Link href="#" variant="body2" onClick={() => { handleClick(); }}>
                            {"Don't have an account? Sign Up"}
                            
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
