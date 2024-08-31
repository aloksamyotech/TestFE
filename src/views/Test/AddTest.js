/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Rating,
  Select,
  TextField
} from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
// import { useState,useEffect } from 'react';
// import { apiget, apipost } from '../../service/api';
import Palette from '../../ui-component/ThemePalette';
import { addTest, findTest } from 'views/api/apiClient';
import { useEffect } from 'react';
import { useState } from 'react';
import { responsivePropType } from '@mui/system';

const AddTest = (props) => {
  const { open, handleClose, findTest } = props;
  const [testData, setTestData] = useState([]);
  // const [user, setUser] = useState([]);

  // const userid = localStorage.getItem('user_id');
  // const userdata = JSON.parse(localStorage.getItem('user'));

  // -----------  validationSchema
  const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    status: yup.string().required('First Name is required'),
    max_marks: yup.number().required('Maximum marks is required'),
    max_time: yup.number().required('Maximum time is required'),
    date_time: yup.date().required('Test Date'),
    is_scheduled: yup.boolean().required('is_scheduled is required'),
    is_nagative_marking: yup.boolean().required('is_scheduled is required')

    // assigned_agent: yup.string().required('Assigned Agent is required')
  });

  // -----------   initialValues
  const initialValues = {
    status: '',
    title: '',
    max_marks: 100,
    max_time: 60,
    is_nagative_marking: false,
    is_scheduled: false,
    date_time: '',
    buffer_time: 0
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const response = await addTest(values);
      console.log("response",response?.status)
      if (response?.status == 201) {
        findTest();
        resetForm(); 
        handleClose();
        toast.success('Test Added Successfully ');
      }else{
        toast.error('Something Went Wrong');

      }
    }
  });

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h6">Add New</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Typography style={{ marginBottom: '15px' }} variant="h6">
                Basic Information
              </Typography>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={4} md={4}>
                  <FormControl fullWidth>
                    <FormLabel>Status</FormLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="status"
                      name="status"
                      label=""
                      size="small"
                      fullWidth
                      value={formik.values.status || null}
                      onChange={formik.handleChange}
                      error={formik.touched.status && Boolean(formik.errors.status)}
                      helperText={formik.touched.status && formik.errors.status}
                    >
                      <MenuItem value="scheduled">Scheduled</MenuItem>
                      <MenuItem value="active">Active </MenuItem>
                      <MenuItem value="inactive">InActive </MenuItem>
                    </Select>
                    <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.title && formik.errors.title}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={8} md={8}>
                  <FormLabel>Title</FormLabel>
                  <TextField
                    id="title"
                    name="title"
                    label=""
                    size="small"
                    maxRows={10}
                    fullWidth
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <FormLabel>Maximum Marks</FormLabel>
                  <TextField
                    id="max_marks"
                    name="max_marks"
                    type="number"
                    label=""
                    size="small"
                    fullWidth
                    value={formik.values.max_marks}
                    onChange={formik.handleChange}
                    error={formik.touched.max_marks && Boolean(formik.errors.max_marks)}
                    helperText={formik.touched.max_marks && formik.errors.max_marks}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <FormLabel>Maximum Time (m) </FormLabel>
                  <TextField
                    id="max_time"
                    name="max_time"
                    type="number"
                    label=""
                    size="small"
                    placeholder="60"
                    fullWidth
                    value={formik.values.max_time}
                    onChange={formik.handleChange}
                    error={formik.touched.max_time && Boolean(formik.errors.max_time)}
                    helperText={formik.touched.max_time && formik.errors.max_time}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <FormLabel>Test Date</FormLabel>
                  <TextField
                    name="date_time"
                    type="date"
                    size="small"
                    fullWidth
                    value={formik.values.date_time}
                    onChange={formik.handleChange}
                    error={formik.touched.date_time && Boolean(formik.errors.date_time)}
                    helperText={formik.touched.date_time && formik.errors.date_time}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <RadioGroup row name="is_scheduled" onChange={formik.handleChange} value={formik.values.is_scheduled}>
                      <FormControlLabel value={true} label="scheduled" control={<Radio />} />
                    </RadioGroup>
                    <FormHelperText style={{ color: Palette.error.main }}>
                      {formik.touched.is_scheduled && formik.errors.is_scheduled}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <RadioGroup row name="is_nagative_marking" onChange={formik.handleChange} value={formik.values.is_nagative_marking}>
                      <FormControlLabel value={true} control={<Radio />} label="nagative marking" />
                    </RadioGroup>
                    <FormHelperText style={{ color: Palette.error.main }}>
                      {formik.touched.is_nagative_marking && formik.errors.is_nagative_marking}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={formik.handleSubmit} variant="contained" color="primary" type="submit">
            Save
          </Button>
          <Button
            onClick={() => {
              formik.resetForm();
              handleClose();
            }}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddTest;
