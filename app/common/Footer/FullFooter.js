// NPM
import React from 'react';
import Grid from 'material-ui/Grid';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faGithub from '@fortawesome/fontawesome-free-brands/faGithub'
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter'
import faInstagram from '@fortawesome/fontawesome-free-brands/faInstagram'
import { Link } from 'react-router-dom';

// APP
import css from './styles.css';
import Tribalscale from 'svg-react-loader?name=Tribalscale!../../assets/Tribalscale.svg';
import Wealthsimple from 'svg-react-loader?name=Wealthsimple!../../assets/Wealthsimple.svg';

const FullFooter = () => {
  return (
    <footer className={css.footer}>
      <Grid container justify="center" className={`${css.backgroundSecondary}`} spacing={0}>
        <Grid item xs={12} md={9}>
          <Grid container justify="center" alignItems="center" className={css.partnerLogos}>
            <a href="https://www.wealthsimple.com">
              <Wealthsimple />
            </a>
            <a href="http://www.tribalscale.com">
              <Tribalscale />
            </a>
          </Grid>
        </Grid>
      </Grid>

      <Grid container justify="center" className={`${css.footerRow} ${css.backgroundPrimary}`} spacing={0}>
        <Grid item xs={11} md={9}>
          <Grid container justify="space-between">
            <Grid item xs={12} sm={8} className={css.verticalOnMobile}>
              <Link to='/about'>About Us</Link>
              <Link to='/thanks'>Special Thanks</Link>
              <Link to='/partners'>Our Partners</Link>
              <Link to='/contact'>Contact Us</Link>
            </Grid>
            <Grid item xs={12} sm={4} className={`${css.alignRight} ${css.alignCenterOnMobile}`}>
              <a href="https://twitter.com/womenandcolor" target='_blank'>
                <FontAwesomeIcon icon={faTwitter} size='lg' />
              </a>
              <a href="https://github.com/CivicTechTO/women-and-color-frontend" target='_blank'>
                <FontAwesomeIcon icon={faGithub} size='lg' />
              </a>
              <a href="https://www.instagram.com/womenandcolor/" target='_blank'>
                <FontAwesomeIcon icon={faInstagram} size='lg' />
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container justify="center" className={`${css.footerRow} ${css.backgroundPrimaryDark}`} spacing={0}>
        <Grid item xs={11} md={9}>
          <Grid container justify="space-between">
            <Grid item xs={12} sm={6} className={css.verticalOnMobile}>
              <Link to='/terms'>Terms of Service</Link>
              <Link to='/privacy'>Privacy Policy</Link>
            </Grid>
            <Grid item xs={12} sm={6} className={`${css.alignRight} ${css.alignCenterOnMobile}`}>
              &copy; 2016 - 2018 Women and Color
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </footer>
  )
}

export default FullFooter;
