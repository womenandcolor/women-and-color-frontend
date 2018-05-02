// NPM
import React from 'react';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';

// APP

const FullFooter = () => {
  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={12} md={9}>
          <Grid container justify="space-between">
            <Grid item>
              <a href="#">Terms of Service</a>
              <a href="#">Privacy Policy</a>
            </Grid>
            <Grid item>
              &copy; 2016 - 2018 Women and Color
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item xs={12} md={9}>
          <Grid container justify="space-between">
            <Grid item>
              <a href="#">About us</a>
              <a href="#">Special Thanks</a>
              <a href="#">Our Partners</a>
              <a href="#">Contact Us</a>
            </Grid>
            <Grid item>
              <a href="#">

              </a>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}


export default FullFooter;
