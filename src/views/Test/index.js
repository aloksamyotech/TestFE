/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
// @mui
import { Stack, Button, Container, Typography, Box, Card, IconButton } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import Iconify from '../../ui-component/iconify';
import TableStyle from '../../ui-component/TableStyle';
import AddLead from './AddTest.js';
import { findTest } from 'views/api/apiClient';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Lead = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [leadData, setLeadData] = useState([]);
  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'max_marks',
      headerName: 'Max Marks',
      flex: 1
    },
    {
      field: 'max_time',
      headerName: 'Max Time',
      flex: 1
    },
    {
      field: 'scheduled',
      headerName: 'Scheduled',
      flex: 1
    },
    {
      field: 'negative',
      headerName: 'Negative',
      flex: 1
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => (
        <IconButton component={Link} to={`/dashboard/view/test/${params.row.id}`} color="primary">
          <Iconify icon="eva:eye-outline" />
        </IconButton>
      )
    }
  ];

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  async function findTestData() {
    const response = await findTest();
    const dataGrid =
      response &&
      response?.map((item, index) => {
        return {
          id: item?._id,
          title: item?.title,
          status: item?.status,
          max_marks: item?.max_marks,
          max_time: item?.max_time,
          scheduled: item?.is_scheduled,
          negative: item?.is_nagative_marking,
          action: ``
        };
      });

    setLeadData(dataGrid);
  }

  useEffect(() => {
    findTestData();
  }, []);
  return (
    <>
      <AddLead open={openAdd} handleClose={handleCloseAdd} findTest={findTestData} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Lead-Management</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              Create Test
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={leadData}
                columns={columns}
                checkboxSelection
                getRowId={(row) => row.id}
                slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true } }}
              />
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </>
  );
};

export default Lead;
