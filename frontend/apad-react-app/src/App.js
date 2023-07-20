import logo from './logo.svg';
import user from './user.png';
import './App.css';
import { MUIButton } from '../src/components/MUIButtons';
import {MUITextField} from '../src/components/TextFields';
import { MUIBox } from './components/MUIBox';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <img src={user} className="login-pic" alt="logo" />
        <p>
          <code>Sign In</code>
        </p>
        <MUIBox>
        <MUITextField label="Email" />
        <MUITextField label="Passwords" type="password" />
        
        <MUIButton >
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Log  In
        </a>
        
        </MUIButton>
        <MUIButton >
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sign Up
        </a>        
        </MUIButton>
        </MUIBox>
      </header>
    </div>
    
  );
}

export default App;
