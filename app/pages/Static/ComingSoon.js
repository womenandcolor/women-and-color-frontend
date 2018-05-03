import React from 'react';
import Grid from 'material-ui/Grid';
import css from './styles.css'

const ComingSoon = () => {
  return(
    <Grid container justify="center">
      <Grid item>
        <header className={css.header}>
          <h1>Coming soon!</h1>
        </header>
      </Grid>
    </Grid>
  )
}

export default ComingSoon;