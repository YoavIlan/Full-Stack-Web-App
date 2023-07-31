import React, { useState , useEffect} from "react";
import {Select, MenuItem, FormControl, InputLabel} from "@mui/material";
import APIService from './APIService'

export default function ResourceList() {
    const[resourcesData, setResourcesData] = useState([]);

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

    return (
        <div>
            {resourcesData.map((resource) => (
                <MenuItem key={resource._id} value={resource._id}>{resource._id}</MenuItem>
            ))}
        </div>
    )
}