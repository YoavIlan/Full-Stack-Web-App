import React from "react";
import {MUIButton} from './MUIButtons'
import { useNavigate } from "react-router-dom";
import {MUIProjectSearchBar} from './MUIProjectSearchBar'
import { MUIBox } from './MUIBox';

export default function Dashboard() {
    
    // Navigate method for routing purposes
    const navigate = useNavigate();
    
    const handleClick = (event) => {
        navigate("/");
      };

    // Placeholder title and button for testing purposes
    return (
        <div className="App">
        {/* <header className="App-header"> */}
          <h1><code>The Main Dashboard</code></h1>

          <MUIProjectSearchBar/>
        <MUIButton
        onClick={() => { handleClick(); }}>
          Return to Log In
        </MUIButton>            
        {/* </header> */}
        </div>        
    )
}
