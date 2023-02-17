
import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import SearchTable from './SearchTable';
import Style from './SearchTable.module.css'
import { useDispatch, useSelector } from "react-redux";
import { assignAPI } from "../../redux/actions/searchAISActions";
import NoDataFound from '../../components/NoDataFound/NoDataFound';
import Table from 'react-bootstrap/Table';
import TableHead from '@mui/material/TableHead';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import InitiateAISOfficer from '../InitiateAISOfficer/InitiateAISOfficer';
import { Link } from 'react-router-dom';

export default function DataGrid2({data , medco}) {
    const columns = [        
        { field: 'id', headerClassName: 'super-app-theme--header', headerAlign: 'center', headerName: 'Trust Unique ID', width: 120, headerClassName: 'super-app-theme--header',
        headerAlign: 'center', renderCell: (params) => (
            <Link >{params.value}</Link>
          )},
        { field: 'empId', headerName: 'Employee ID', width: 100 ,headerClassName: 'super-app-theme--header',
        headerAlign: 'center',},
        { field: 'locNumber', headerName: 'LOC Number',headerClassName: 'super-app-theme--header',
        headerAlign: 'center', },
        { field: 'patientName', headerName: 'Patient Name', width: 150 ,headerClassName: 'super-app-theme--header',
        headerAlign: 'center',},
        { field: 'relation', headerName: 'Relation with AIS Officer', width: 180 ,headerClassName: 'super-app-theme--header',
        headerAlign: 'center',},
        { field: 'contactNo', headerName: 'Patient Number', width: 130,headerClassName: 'super-app-theme--header',
        headerAlign: 'center', },
        { field: 'hospContactNo', headerName: 'Hospital Contact', width: 140 ,headerClassName: 'super-app-theme--header',
        headerAlign: 'center',},
        { field: 'treatmentDescription', headerName: 'Treatment', width: 180 ,headerClassName: 'super-app-theme--header',
        headerAlign: 'center',},
        { field: 'locAmount', headerName: 'LOC Amount', headerClassName: 'super-app-theme--header',
        headerAlign: 'center',}

    ]
    const searchData = data;

    

    const dispatch = useDispatch();
    const loginData = useSelector((state) => (state.loginReducer));

    const [finalClickInfo, setfinalClickInfo] = useState(null);
    //console.log(searchData.data.tableData);
  
    const assign = (searchId) => {
        let payload = { id: searchId.id, hospRegId: loginData.data.hospRegId }
        dispatch(assignAPI(payload));
    }
    const navigate = useNavigate();

    const handleOnCellClick = (params) => {
        setfinalClickInfo(params);
       // console.log(params.id);
        medco&& medco(params.id);
       
    }

    return (
        <div>
            <div style={{ height: 370, width: '100%' }}>
            {data.tableData !== undefined ? 
                <DataGrid
                
                    rows={data.tableData}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    
                    onCellClick={handleOnCellClick}
                    sx={{ 
                        width: '100%',
                        '& .super-app-theme--header': {fontWeight: 'bold',
                          backgroundColor: 'rgba(34, 167, 240)',
                        },
                      }}
                /> : ""}

                {finalClickInfo &&
                    `Final clicked id = ${finalClickInfo.id}, 
                     `
                }
            </div>
        </div>
    )
}
