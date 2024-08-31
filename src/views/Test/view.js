import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Card, Grid, CircularProgress } from '@mui/material';
import { findTestById } from 'views/api/apiClient';

const ViewTest = () => {
  const { id } = useParams(); 
  const [testDetails, setTestDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const response = await findTestById(id); 
      } catch (error) {
        console.error('Failed to fetch test details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestDetails();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!testDetails) {
    return <Typography variant="h6">Test not found</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        View Test Details
      </Typography>
      <Card>
        <Box p={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Title:</Typography>
              <Typography variant="body1">{testDetails.title}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Status:</Typography>
              <Typography variant="body1">{testDetails.status}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Max Marks:</Typography>
              <Typography variant="body1">{testDetails.max_marks}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Max Time:</Typography>
              <Typography variant="body1">{testDetails.max_time}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Scheduled:</Typography>
              <Typography variant="body1">{testDetails.is_scheduled ? 'Yes' : 'No'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Negative Marking:</Typography>
              <Typography variant="body1">{testDetails.is_nagative_marking ? 'Yes' : 'No'}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Container>
  );
};

export default ViewTest;
