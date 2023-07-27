import '../App.css';
import { MUIButton } from './MUIButtons';
import {MUITextField} from './TextFields';
import { MUIBox } from './MUIBox';
import React, { useState } from "react";

// Export the Project Creation component
export const LogIn = () => {

  // Project Creation UI setup
    return (
      <div className="App">
        <header className="App-header">
          <p>
            <code>Create a new Project</code>
          </p>
          <MUIBox>
          <MUITextField label="Email" value={email}/>
          <MUITextField label="Passwords" type="password" value={password}/>
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