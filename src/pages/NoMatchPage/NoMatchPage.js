import React, { useEffect } from 'react';
import { Grid, Container, Typography, Box } from '@material-ui/core'

export default function NoMatchPage() {
  useEffect(() => {
    document.title = `The page you were looking for doesn't exist (404)`;
  }, []);
  return (
    <div style={{
      background: '#26292E',
      height: '103vh',
      color: 'white',
      paddingLeft: '24px',
      paddingRight: '24px',
    }}>
      <Grid container justify="center" spacing={3}>
        <Grid item xs={3}>
          <img src="light-bulb.png" style={{
            width: '100%'
          }} className="image" />
        </Grid>

        <Grid item>
          <div style={{
            marginTop: '3rem'
          }}>
            <Typography variant="h2">Hey, who turned off the lights?</Typography>
            <Box mb={3}></Box>
            <Typography variant="h5">We were unable to find the page you were looking for.</Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}