import React from 'react';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';

import css from './styles.css'

const PageNotFound = () => {
  return(
    <Grid container justify="center">
      <Grid item xs={11} md={9}>
        <header className={css.header}>
          <h1>There's nothing here :(</h1>
          <p>The URL was not found. Let's go back to the <Link to='/'>home page.</Link></p>
        </header>
      </Grid>
    </Grid>
  )
}

export default PageNotFound;