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
          <MUITextField label="Project Name" value={proj_name}/>
          <MUITextField label="Project ID" type="proj_id" value={proj_id}/>
          <MUITextField label="Project Description" type ="proj_desc" value ={proj_desc}/>
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