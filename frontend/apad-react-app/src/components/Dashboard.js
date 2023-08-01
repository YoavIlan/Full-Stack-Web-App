import {MUIButton} from './MUIButtons'
import { useNavigate } from "react-router-dom";
import {MUIProjectSearchBar} from './MUIProjectSearchBar'
import { MUIBox } from './MUIBox';
import MultiCheckInOut from "./MultiCheckInOut";
import Table from './Table'

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

    // Placeholder title and button for testing purposes
    return (
        <div>
        <h1> Dashboard </h1>
        <Table />
        <MUIButton
        onClick={() => { handleClick()}}>
          Return to Log In
        </MUIButton>            
        {/* </header> */}
        {/* </div>        
        </MUIButton> */}
        <MUIButton
        onClick={() => {createProject()}}>
          Create a New Project
        </MUIButton>
        <MUIBox>
        <MultiCheckInOut/>
        </MUIBox>
        </div>
    )
}
