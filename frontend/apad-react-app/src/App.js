import './App.css';
import React, { useState, useEffect } from "react";
//if there is a red line here, dont worry it doesnt prevent you from compiling pls not remove
import { SignUp } from './components/SignUp';
import { LogIn } from './components/LogIn';
import { ProjectCreation } from './components/ProjectCreation';


function App() {

  return (
    // Uncomment sign up or log in to see one page or the other

     //<div><SignUp/></div>
    //<div><LogIn/></div>
    <div><ProjectCreation/></div>
  );
}

export default App;
