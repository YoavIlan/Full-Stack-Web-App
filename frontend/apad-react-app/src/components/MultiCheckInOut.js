import React, { useState, useEffect } from "react";
import { MUIBox } from './MUIBox';
import {MUIButton} from './MUIButtons'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import APIService from './APIService'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function MultiCheckInOut() {
    const[id, setId] = useState('')
    const[resource, setResource] = useState('')
    const[check, setCheck] = useState([])
    const [info, setInfo] = useState([{}])
    const[resourcesData, setResourcesData] = useState([]);
    const [tableData, setTableData] = useState([{}])
    const [mergedDictionary, setMergedDictionary] = useState({})

    // UseEffect hook to update the existing resource List.
    useEffect(() => {    
        APIService.GetResources().then(data =>setTableData(data));

        const initialCheckState = mergedDictionary.data
      ? mergedDictionary.data.map((item) => ({ _id: item._id, value: '' }))
      : [];
    setCheck(initialCheckState);

    }, [mergedDictionary]);

    // Access project and resources function
    const accessProject = (e) => {
        APIService.GetResources().then(data =>setTableData(data));

        APIService.AccessProject(id)
          .then((info) => {setInfo(info);
      
            const dataArray = tableData.data && Array.isArray(tableData.data) ? tableData.data : [];
            const dataObject = dataArray.reduce((acc, item) => {
              acc[item._id] = { _id: item._id, availability: item.availability, capacity: item.capacity };
              return acc;
            }, {});
      
            // Create a copy of info.data and update the resources property
            const updatedInfoData = { ...info.data, resources: { ...info.data.resources, ...dataObject } };
      
            // Add the "checkedout" property to each item in the "tableData" array
            const updatedTableData = dataArray.map(item => ({
              ...item,
              checkedout: info.data.resources && info.data.resources[item._id] ? info.data.resources[item._id] : 0,
            }));
      
            // Set mergedDictionary with the updated "tableData" array and the updated info data
            setMergedDictionary({
              ...info,
              ...tableData,
              data: updatedTableData,
              dataObject: updatedInfoData,
            });
          })
          .catch((error) => console.log("Error occurred:", error));

          console.log(mergedDictionary)
      };                    

      const handleChange = (e, resourceId) => {
        const { value } = e.target;
    
        setCheck((prevCheck) =>
          prevCheck.map((item) =>
            item._id === resourceId ? { ...item, value } : item
          )
        );
      };
    
      const checkObject = check.reduce((acc, item) => {
        acc[item._id] = parseInt(item.value, 10); // Parse the value to an integer if needed
        return acc;
      }, {});

    // Check In function using the API Service and a check that adds all existing resources as needed
    const checkIn = (e) => {
        APIService.CheckIn({id, data: checkObject}).then(
            info => {
              setInfo(info)
              console.log(info)
              alert(info.message)
            }
          )
          .catch(error => console.log('error', error))
    }

    // Check Out function using the API Service and a check that adds additional resources as needed
    const checkOut = (e) => {
        APIService.CheckOut({id, data: checkObject}).then(
            info => {
              setInfo(info)
              console.log(info)
              alert(info.message)
            }
          )
          .catch(error => console.log('error', error))
    }

    // UI for check in and check out with auto-updating resource dropdown
    return (
        <div>
        <MUIBox>
        <Grid container spacing={2} style={{padding:"5px", margin:"5px" }}>
          <Grid item xs={8}>
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
          <Grid item xs={4}>
            <MUIButton onClick={() => {accessProject()}}>
              Access
            </MUIButton>
          </Grid>
        </Grid>
        <h2> Resource Management </h2>
            
            {(typeof tableData.data === "undefined") ? (
                <p>Loading...</p>
            ): (
            
            <TableContainer component={Paper} style={{margin:"10px" }}>
                <Table sx={{ minWidth: 10 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                        <TableCell>Resource</TableCell>
                        <TableCell align="center">Capacity</TableCell>
                        <TableCell align="center">Availability</TableCell>
                        <TableCell align="center">Checked Out</TableCell>
                        <TableCell align="center">Request</TableCell>
                    </TableRow>
                </TableHead>
                    <TableBody>
                        {mergedDictionary.data && mergedDictionary.data.map((mapData) => (
                            <TableRow
                            key={mapData._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell align="center" component="th" scope="data">
                                {mapData._id}
                            </TableCell>
                            <TableCell align="center">{mapData.capacity}</TableCell>
                            <TableCell align="center">{mapData.availability}</TableCell>
                            <TableCell align="center">{mapData.checkedout}</TableCell>
                            <TableCell align="center">
                                <TextField
                                    required
                                    fullWidth
                                    value={check.find((item) => item._id === mapData._id)?.value || ''}
                                    onChange={(e) => handleChange(e, mapData._id)}
                                    />
                            </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            )}
            <MUIButton onClick={() => {checkIn()}}>
                Check In
            </MUIButton>
            <MUIButton onClick={() => {checkOut()}}>
                Check Out
            </MUIButton> 
            <MUIButton onClick={() => {accessProject()}}>
                Refresh
            </MUIButton>     
            </MUIBox>
        </div>
    )
}