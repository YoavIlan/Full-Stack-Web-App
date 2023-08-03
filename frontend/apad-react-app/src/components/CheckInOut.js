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
    // project ID
    const[id, setId] = useState('')
    // user's request to send to backend
    const[usrRequest, setUsrRequest] = useState([])
    // project info
    const [projectInfo, setProjectInfo] = useState([{}])
    // resources info
    const [resourceData, setResourceData] = useState([{}])
    // merged object of resources and project to display
    const [mergedDictionary, setMergedDictionary] = useState([{}])

    useEffect(() => {
        setId(state.data.data._id)
        setProjectInfo(state.data.data)
        combineResourceProjectData()
    }, [])

    // force update state whenever usrRequest is updated
    useEffect(() => {
    }, [usrRequest])


    const combineResourceProjectData = () => {
        APIService.GetResources().then((resourceData) => {
            setResourceData(resourceData)
            APIService.AccessProject(state.data.data._id).then((projData) =>
            {
                // data to display on table. capacity, availability, checked out
                const combinedData = resourceData.data.map((resource) => ({
                    ...resource, checkedOut: projData.data.resources[resource._id]
                }))
                setMergedDictionary(combinedData)
                const emptyRequest = resourceData.data.reduce((acc, item) => {
                    acc[item._id] = 0
                    return acc
                }, {})
                setUsrRequest(emptyRequest)
            })
        }).catch((error) => console.log("Error occurred:", error));
    }

    const handleChange = (e, resourceId) => {
        const value = e.target.value;
        // make copy to update
        const prev_copy = {...usrRequest}
        // string to int, 0 if empty
        prev_copy[resourceId] = parseInt(value) || 0
        setUsrRequest(prev_copy)
      };

    const checkIn = (e) => {
        APIService.CheckIn({id, data: usrRequest}).then(
            info => {
              combineResourceProjectData()
              // can only check in what you have
              if(!info.success)
                alert(info.message)
            }
          )
          .catch(error => console.log(error))
    }

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