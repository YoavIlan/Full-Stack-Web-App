import '../App.css';
import { MUIButton } from './MUIButtons';
import {MUITextField} from './TextFields';
import { MUIBox } from './MUIBox';
import React, { useState } from "react";
import user from '../user.png';

// Export Login component
export const LogIn = () => {

  //Set up email variable and setter method for email
  const [email, setEmail] = useState("");
  //Set up password variable and setter method for password
  const [password, setPassword] = useState("");
  //Set up data variable and setter method for data
  const [data, setData] = useState([{}])


  // Handle submit function when the log in button is clicked
  const handleSubmit = (e) => {
    var address = "/api/getuser/"
    var userEmail = email
    var userPassword = password
    fetch(address+"/"+userEmail+"/"+userPassword).then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
        alert(data.message)
      }
    )

}
// The login page ui setup
  return (
    <div className="App">
      <header className="App-header">
        <img src={user} className="login-pic" alt="logo" />
        <p>
          <code>Sign In</code>
        </p>
        <MUIBox>
        <MUITextField label="Email" value={email} onChange={(e) => {setEmail(e.target.value);console.log(e.target.value)}}/>
        <MUITextField label="Passwords" type="password" value={password}  onChange={(e) => {setPassword(e.target.value);console.log(e.target.value)}}/>
        <MUIButton 
        onClick={() => { handleSubmit(); }}>
          Log  In
        </MUIButton>
        <MUIButton >
          Sign Up       
        </MUIButton>
        </MUIBox>
      </header>
    </div>
    
  );
}
