import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { MUIProjectSearchBar } from './MUIProjectSearchBar';

const TableMain = () => {
    const [ data, setTableData] = useState([{}]);
    useEffect(() => {
        var address = "/api/getresources"
        fetch(address)
          .then(response => response.json())
          .then(data =>setTableData(data))
      }, []);
    
    return(
        <>
        <div>
            {(typeof data.data === "undefined") ? (
                <p>Loading...</p>
            ): (
            <TableContainer component="paper" >
                <Table sx={{ minWidth: 300, width: "100%" }} aria-label="simple table" border= "2.5" >
                  <TableHead  >
                    <TableRow >
                        <TableCell align="center">Resource</TableCell>
                        <TableCell align="center">Capacity</TableCell>
                        <TableCell align="center">Availability</TableCell>
                    </TableRow>
                </TableHead>
                    <TableBody >
                        {data.data.map((resource) => (
                            <TableRow
                                key={data._id}
                            
                            >
                                <TableCell component="th" scope="data" align="center">
                                    {resource._id}
                                </TableCell>
                                <TableCell align="center">{resource.capacity}</TableCell>
                                <TableCell align="center">{resource.availability}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <MUIProjectSearchBar/>
            </TableContainer>
            )}
        </div>
        </>
    )
}


export default TableMain;
