import React, { useState, useEffect } from "react";
import {MUITextField} from './TextFields';
import { MUIBox } from './MUIBox';
import {MUIButton} from './MUIButtons'
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {Select, MenuItem, FormControl, InputLabel} from "@mui/material";
import APIService from './APIService'

export default function CheckInOut() {
    const[id, setId] = useState('')
    const[resource, setResource] = useState('')
    const[checkin, setCheckIn] = useState('')
    const[checkout, setCheckOut] = useState('')
    const [data, setData] = useState([{}])
    const[resourcesData, setResourcesData] = useState([]);

    // Navigate method for routing purposes
    const navigate = useNavigate();

    // Return to dashboard
    const goToDashboard = () => {
        navigate("/dashboard");
    }

    // UseEffect function to update the existing resource List.
    useEffect(() => {
        APIService.GetResources()
        .then(response => {
        if (response.success) {
          setResourcesData(response.data);
        } else {
          console.log("Request was not successful.");
        }
        })
        .catch(error => {
        console.log("Error occurred:", error);
        });
    }, []);

    // Resource changer function for dropdown
    function handleResourceChange(event) {
        setResource(event.target.value);
        console.log("Selected Resource ID:", event.target.value);
      }

    // Check In function using the API Service and a check that adds all existing resources as needed
    const checkIn = (e) => {
        var tocheckin = {}
        for (let key in resourcesData) {
            if (resourcesData.hasOwnProperty(key)){
                if (resourcesData[key]["_id"] == resource) {
                    tocheckin[resourcesData[key]["_id"]] = checkin
                }
                else {
                    tocheckin[resourcesData[key]["_id"]] = 0
                }
            }
        }
        APIService.CheckIn({id, data:tocheckin}).then(
            data => {
              setData(data)
              console.log(data)
              alert(data.message)
            }
          )
          .catch(error => console.log('error', error))
    }

    // Check Out function using the API Service and a check that adds additional resources as needed
    const checkOut = (e) => {
        var tocheckout = {}
        for (let key in resourcesData) {
            if (resourcesData.hasOwnProperty(key)){
                if (resourcesData[key]["_id"] == resource) {
                    tocheckout[resourcesData[key]["_id"]] = checkout
                }
                else {
                    tocheckout[resourcesData[key]["_id"]] = 0
                }
            }
        }
        APIService.CheckOut({id, data:tocheckout}).then(
            data => {
              setData(data)
              console.log(data)
              alert(data.message)
            }
          )
          .catch(error => console.log('error', error))
    }

    // UI for check in and check out with auto-updating resource dropdown
    return (
        <div>
        <MUIBox>
        <h1> Check In / Check Out Resources </h1>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="id"
                    label="Project ID"
                    name="id"
                    value={id}
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
                            onChange={handleResourceChange}
                        >
                            {resourcesData.map(resource => (
                            <MenuItem key={resource._id} value={resource._id}>
                                {resource._id}
                            </MenuItem>
                            ))}
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
                    <MUIButton fullWidth onClick={() => { checkIn();}}> 
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
                    <MUIButton fullWidth length="2px" onClick={() => { checkOut();}}> 
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