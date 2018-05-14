// NPM
import React from 'react';
import Grid from 'material-ui/Grid';

// APP
import css from './styles.css';

const MiniFooter = () => {
  return (
    <footer className={css.footer}>
      <Grid container justify="center" className={`${css.footerRow} ${css.backgroundGrey}`} spacing={0}>
        <Grid item xs={11} md={9}>
          <Grid container justify="space-between" className={css.alignCenterOnMobile}>
            <Grid item xs={12} md={6}>
              <a href="/#/terms">Terms of Service</a>
              <a href="/#/privacy">Privacy Policy</a>
              <a href="/#/code-of-conduct">Code of Conduct</a>
            </Grid>
            <Grid item xs={12} md={6} className={`${css.alignRight} ${css.alignCenterOnMobile}`}>
              &copy; 2016 - 2018 Women and Color
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </footer>
  )
}


export default MiniFooter;
