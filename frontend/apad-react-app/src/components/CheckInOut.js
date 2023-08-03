import React, { useState, useEffect } from "react";
import {MUIButton} from './MUIButtons'
import TextField from '@mui/material/TextField';
import APIService from './APIService'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useLocation} from "react-router-dom";

const CheckInOut = () => {
    const {state} = useLocation();
    const[id, setId] = useState('')
    const[usrRequest, setUsrRequest] = useState([])
    const [projectInfo, setProjectInfo] = useState([{}])
    const [resourceData, setResourceData] = useState([{}])
    const [mergedDictionary, setMergedDictionary] = useState([{}])

    useEffect(() => {
        console.log(state.data.data)
        setId(state.data.data._id)
        setProjectInfo(state.data.data)
        combineResourceProjectData()
    }, [])

    useEffect(() => {
    }, [usrRequest])


    const combineResourceProjectData = () => {
        APIService.GetResources().then((resourceData) => {
            setResourceData(resourceData)
            APIService.AccessProject(state.data.data._id).then((projData) =>
            {
                const combinedData = resourceData.data.map((resource) => ({
                    ...resource, checkedOut: projData.data.resources[resource._id]
                }))
                setMergedDictionary(combinedData)
                console.log(combinedData)
                const emptyRequest = resourceData.data.reduce((acc, item) => {
                    acc[item._id] = 0
                    return acc
                }, {})
                setUsrRequest(emptyRequest)
            })
        }).catch((error) => console.log("Error occurred:", error));
    }

    const handleChange = (e, resourceId) => {
        const { value } = e.target;
        const prev_copy = {...usrRequest}
        prev_copy[resourceId] = parseInt(value) || 0
        setUsrRequest(prev_copy)
      };

    // TODO: checkObject needs to be {resource: numbertorequest, resource2: numbertorequest}
    const checkIn = (e) => {
        APIService.CheckIn({id, data: usrRequest}).then(
            info => {
              combineResourceProjectData()
              if(!info.success)
                alert(info.message)
            }
          )
          .catch(error => console.log(error))
    }

    // // Check Out function using the API Service and a check that adds additional resources as needed
    const checkOut = (e) => {
        APIService.CheckOut({id, data: usrRequest}).then(
            info => {
              combineResourceProjectData()
            }
          )
          .catch(error => console.log('error', error))
    }

  return (
    <div>
        {/* <Box
        width= "550px"
        height= "300px"
        backgroundColor= "white"
        hover="{
        backgroundColor: 'primary.main'
        opacity: [0.9, 0.8, 0.7]"
        display={'block'}
        style={{padding:"auto", margin:"auto", alignItems:"left", justifyContent:"center" }}
        > */}
        {/* <Grid container spacing={2} style={{padding:"5px", margin:"5px" }}>
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
        </Grid> */}
        {/* <h2> Resource Management</h2>
        <h3> Selected Project: {projectName}</h3> */}
                        {/* <MUIButton onClick={() => {accessProject()}}>
              Access
            </MUIButton> */}
            {(typeof resourceData.data === "undefined" || typeof projectInfo === "undefined") ? (
                <p>Loading...</p>
            ): (
            
            <TableContainer component={Paper} style={{margin:"10px" }}>
                <Table sx={{ minWidth: 6 }} aria-label="simple table">
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
                        {mergedDictionary.map((mapData) => (
                            <TableRow
                            key={mapData._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell align="center" component="th" scope="data">
                                {mapData._id}
                            </TableCell>
                            <TableCell align="center">{mapData.capacity}</TableCell>
                            <TableCell align="center">{mapData.availability}</TableCell>
                            <TableCell align="center">{mapData.checkedOut}</TableCell>
                            <TableCell align="center">
                                <TextField
                                    required
                                    fullWidth
                                    value={usrRequest[mapData._id]}
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
        </div>
  )
}

export default CheckInOut