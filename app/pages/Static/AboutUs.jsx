import React from 'react';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import { Helmet } from 'react-helmet';

import css from './styles.css'

const styles = theme => ({
  header: {
    backgroundColor: theme.palette.secondary.light,
    paddingTop: '4rem',
    paddingBottom: '4rem',
    textAlign: 'center',
  },
  title: {
    color: theme.palette.secondary.contrastText,
    fontSize: '1.8rem',
    lineHeight: '2.4rem',
    fontWeight: '300'
  },
  strong: {
    fontWeight: '600'
  },
  body: {
    paddingTop: '2rem',
    paddingBottom: '2rem',
    textAlign: 'center',
    fontSize: '1.2rem',
    lineHeight: '1.8rem',
    fontWeight: '300',
    color: theme.palette.secondary.contrastText,
  }
})

const AboutUs = (props) => {
  return(
    <div>
      <Helmet>
        <title>About Us</title>
        <meta name="description" content="Women and Color is an online community of subject matter experts who identify as women and/or people of color." />
      </Helmet>
      <Grid container justify="center">
        <Grid item xs={12}>
          <Grid container justify="center" className={props.classes.header}>
            <Grid item xs={12} sm={10} md={6}>
              <h1 className={props.classes.title}>We are frustrated with the lack of <span className={props.classes.strong}>gender</span> and <span className={props.classes.strong}>racial</span> representation at tech-related events.</h1>
            </Grid>
          </Grid>

          <Grid container justify="center" className={props.classes.body}>
            <Grid item xs={12} sm={10} md={6}>
              <p>Women and Color is an online community of subject matter experts who identify as women and/or people of color.</p>
              <p>Located in cities across Canada and the United States, each of our subject matter experts is available for speaking opportunities at tech-related events.</p>
              <p>Interested in helping us build a more inclusive tech ecosystem? Send us an email to get involved: <span className={props.classes.strong}>hello@womenandcolor.com</span></p>
              <p>Women and Color is built with passion in Toronto, ON, and is a federally incorporated not-for-profit in Canada.</p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(AboutUs);