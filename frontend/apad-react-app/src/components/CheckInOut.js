import React, { useState } from "react";
import {MUITextField} from './TextFields';
import { MUIBox } from './MUIBox';
import {MUIButton} from './MUIButtons'
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {Select, MenuItem, FormControl, InputLabel} from "@mui/material";


export default function CheckInOut() {
    const[_id, setId] = useState('')
    const[resource, setResource] = useState('')
    const[checkin, setCheckIn] = useState('')
    const[checkout, setCheckOut] = useState('')
    const [data, setData] = useState([{}])

    // Navigate method for routing purposes
    const navigate = useNavigate();

    // Return to dashboard
    const goToDashboard = (event) => {
        navigate("/dashboard");
    }

    // Placeholder title and button for testing purposes
    return (
        <div>
        <MUIBox>
        <h1> Check In / Check Out Resources </h1>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="_id"
                    label="Project ID"
                    name="_id"
                    value={_id}
                    onChange={(e) => {setId(e.target.value);console.log(e.target.value)}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="resource-dropdown">Resource</InputLabel>
                        <Select
                            labelId="resource-dropdown"
                            id="resource-dropdown"
                            value={resource}
                            label="Resource"
                            onChange={(e) => {setResource(e.target.value);console.log(e.target.value)}}
                        >
                            <MenuItem value={"bikes"}>Bikes</MenuItem>
                            <MenuItem value={"scooters"}>Scooters</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={8.5}>
                    <TextField
                    required
                    fullWidth
                    id="checkIn"
                    label="Resources to Check In"
                    name="checkin"
                    value={checkin}
                    onChange={(e) => {setCheckIn(parseInt(e.target.value));console.log(e.target.value)}}
                    />                
                </Grid>
                <Grid item xs={3.5}>
                    <MUIButton fullWidth onClick={() => { goToDashboard();}}> 
                        Check In      
                    </MUIButton>
                </Grid>
                <Grid item xs={8.5}>
                <TextField
                    required
                    fullWidth
                    id="checkOut"
                    label="Resources to Check Out"
                    name="checkout"
                    value={checkout}
                    onChange={(e) => {setCheckOut(parseInt(e.target.value));console.log(e.target.value)}}
                    />
                </Grid>
                <Grid item xs={3.5}>
                    <MUIButton fullWidth onClick={() => { goToDashboard();}}> 
                        Check Out      
                    </MUIButton>
                </Grid>
                <Grid item xs={12}>
                    <MUIButton fullWidth onClick={() => { goToDashboard();}}> 
                        Return      
                    </MUIButton>
                </Grid>
            </Grid>
            
        </MUIBox>
        </div>
    )
}