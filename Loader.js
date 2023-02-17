import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <Box   >
      <CircularProgress sx={{marginTop:40, marginLeft:70}}/>
    </Box>
  );
}