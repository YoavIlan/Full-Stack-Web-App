import React, { useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
        {/* <Table data={tableData} /> */}
        <div>
            {(typeof data.data === "undefined") ? (
                <p>Loading...</p>
            ): (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                        <TableCell>Resource</TableCell>
                        <TableCell align="right">Capacity</TableCell>
                        <TableCell align="right">Availability</TableCell>
                    </TableRow>
                </TableHead>
                    <TableBody>
                        {data.data.map((resource) => (
                            <TableRow
                                key={data._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="data">
                                    {resource._id}
                                </TableCell>
                                <TableCell align="right">{resource.capacity}</TableCell>
                                <TableCell align="right">{resource.availability}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            )}
        </div>
        </>
    )
}


export default TableMain;
