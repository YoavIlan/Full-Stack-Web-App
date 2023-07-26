import './App.css';
import React, { useState, useEffect } from "react";
//if there is a red line here, just uncomment either log in or sign up to resolve
import { SignUp } from './components/SignUp';
import { LogIn } from './components/LogIn';


function App() {

  return (
    // Uncomment sign up or log in to see one page or the other

    // <div><SignUp/></div>
    <div><LogIn/></div>
    
  );
}

export default App;
