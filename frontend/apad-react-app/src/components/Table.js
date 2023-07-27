import React, { useState } from 'react';

const Row = (props) => {
    const {hwSet, capacity, availability} = props;
    return(
        <tr>
            <td>{hwSet}</td>
            <td>{capacity}</td>
            <td>{availability}</td>
        </tr>
    ) 
}

const Table = (props) => {
    const rows = props.data;
    return(
        <table>
            <thead>
                <tr>
                    <th className="table-header">HW Set</th>
                    <th className="table-header">Capacity</th>
                    <th className="table-header">Availability</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                <Row key={index} hwSet={row.hwSet} capacity={row.capacity} availability={row.availability} />
                ))}
            </tbody>
        </table>
    )
}

const tableList = [
    { hwSet: 'bikes', capacity: '10', availability: '1'},
    { hwSet: 'scooters',capacity: '10', availability: '8'},
    { hwSet: 'drones',capacity: '10', availability: '5'}
]
const TableMain = () => {
    const [ tableData, setTableData] = useState(tableList);
    return(
        <>
        <Table data={tableData} />
        </>
    )
}

export default TableMain;
