import {MUIButton} from './MUIButtons'
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    
    // Navigate method for routing purposes
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate("/");
      };

    // navigate to project creation page  
    const createProject = () => {
      navigate("/project-creation");
    }

    // navigate to project creation page  
    const checkInOut = () => {
      navigate("/check-in-out");
    }

    // Placeholder title and button for testing purposes
    return (
        <div>
        <h1> This is the dashboard </h1>
        <MUIButton
        onClick={() => { handleClick()}}>
          Return to Log In
        </MUIButton>
        <MUIButton
        onClick={() => {createProject()}}>
          Create a New Project
        </MUIButton>
        <MUIButton
        onClick={() => {checkInOut()}}>
          Check In/Out Resources
        </MUIButton>
        </div>
    )
}
