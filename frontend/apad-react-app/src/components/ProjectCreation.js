import '../App.css';
import { MUIButton } from './MUIButtons';
import {MUITextField} from './TextFields';
import { MUIBox } from './MUIBox';
import React, { useState } from "react";
import Typography from '@mui/material/Typography';

// Export the Project Creation component
export const ProjectCreation = () => {

  // Project Creation UI setup
    return (
      <div className="App">
          <Typography component="h1" variant="h5">
            Create a New Project
          </Typography>
          <MUIBox>
          <MUITextField label="Project Name"/>
          <MUITextField label="Project ID"/>
          <MUITextField label="Project Description"/>
          <MUIButton>
            Create Project
          </MUIButton>
          <MUIButton >
            Cancel      
          </MUIButton>
          </MUIBox>
      </div>
      
    );
  }