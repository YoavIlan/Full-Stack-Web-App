import '../App.css';
import { MUIButton } from './MUIButtons';
import {MUITextField} from './TextFields';
import { MUIBox } from './MUIBox';
import React, { useState } from "react";

// Export the Project Creation component
export const ProjectCreation = () => {

  // Project Creation UI setup
    return (
      <div className="App">
        <header className="App-header">
          <p>
            <code>Create a new Project</code>
          </p>
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
        </header>
      </div>
      
    );
  }