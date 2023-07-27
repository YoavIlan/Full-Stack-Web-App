import { Container, TextField } from "@mui/material";
import React from 'react'
import { useState } from "react";
import { MUIButton } from './MUIButtons';
import Grid from '@mui/material/Grid';
import { DataGrid, GridColDef, GridValueGetterParams, GridApi, GridCellValue } from '@mui/x-data-grid';
import Button from "@mui/material/Button";




export const MUIProjectSearchBar= ({children, onClick}) => {

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'desc', headerName: 'Description', width: 200 },
    {
      field: 'resources',
      headerName: 'Resources',
      width: 250,
    }, 
    {field: "action",
    headerName: "",
    sortable: false,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation(); // don't select this row after clicking

        const api: GridApi = params.api;
        const thisRow: Record<string, GridCellValue> = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
          );

        return alert(JSON.stringify(thisRow, null, 4));
      };

      return < Button onClick={onClick}>Access</Button>;
    }}
  ];  
    //Set up password variable and setter method for password
    const [projectID, setProjectID] = useState("");
    //Set up data variable and setter method for data
    const [data, setData] = useState([{}])

    const[getProjectId, setGetProjectId] = useState("");
    const[getProjectName, setGetProjectName] = useState("");
    const[getProjectDesc, setGetProjectDesc] = useState("");
    const[getProjectResources, setGetProjectResources] = useState("");
  
    const rows = [
      { id: getProjectId, name: getProjectName, desc: getProjectDesc, resources: getProjectResources } ,
    ];
  
    // Handle submit function when the log in button is clicked
    const handleSubmit = (e) => {
      var address = "/api/getproj/"
      var id = projectID
      fetch(address+"/"+id).then(
        res => res.json()
      ).then(
        data => {
          setData(data)
          console.log(data)
          if(data.success === true){
            alert(data.message)
            setGetProjectId(data.data["_id"])
            setGetProjectName(data.data["name"])
            setGetProjectDesc(data.data["desc"])
            setGetProjectResources("Bikes: " + data.data.resources["bikes"] + "\n Scooters: " + data.data.resources["scooters"])
          }

          if(data.success === false || id.length === 0){
            alert(data.message)
          }
        }
      )
  }
  return (
    <>
      <Container maxWidth="md" sx={{ mt: 20 }}>
        <Grid>
        <TextField  type="search" id="search" label="Search For Projects" sx={{ width: 750 }} 
        onChange={(e) => {setProjectID(e.target.value);console.log(e.target.value)}}
        />
        <MUIButton
              fullWidth
              variant="contained"
              onClick={() => { handleSubmit();}}
              sx={{ mt: 10, mb: 2 }}
              
            >
              Search 
        </MUIButton>
        </Grid>
        <Grid container justifyContent="flex-start">
              <Grid item>
                  (***Please type in a valid project id***)
              </Grid>
        </Grid>
        <DataGrid
            rows={rows}
            columns={columns}
            // getRowId={(row) => row?.projectId}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}

        />  
      </Container>
    </>
  );
}
