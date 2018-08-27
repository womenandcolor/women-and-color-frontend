// NPM
import React from 'react';
import Grid from 'material-ui/Grid';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faGithub from '@fortawesome/fontawesome-free-brands/faGithub';
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter';
import faInstagram from '@fortawesome/fontawesome-free-brands/faInstagram';
import faSlack from '@fortawesome/fontawesome-free-brands/faSlack';
import { Link } from 'react-router-dom';

// APP
import css from './styles.css';
import Tribalscale from 'svg-react-loader?name=Tribalscale!../../assets/Tribalscale.svg';
import Wealthsimple from 'svg-react-loader?name=Wealthsimple!../../assets/Wealthsimple.svg';

const FullFooter = () => {
  return (
    <footer className={css.footer}>
      <Grid
        container
        justify="center"
        className={`${css.backgroundSecondary}`}
        spacing={0}
      >
        <Grid item xs={12} md={9}>
          <Grid
            container
            spacing={0}
            justify="center"
            alignItems="center"
            className={css.partnerLogos}
          >
            <a href="https://www.wealthsimple.com" target="_blank">
              <Wealthsimple />
            </a>
            <a href="http://www.tribalscale.com" target="_blank">
              <Tribalscale />
            </a>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        justify="center"
        className={`${css.footerRow} ${css.backgroundPrimary}`}
        spacing={0}
      >
        <Grid item xs={11} md={9}>
          <Grid container justify="space-between" spacing={0}>
            <Grid item xs={12} sm={8} className={css.verticalOnMobile}>
              <Link to="/about">About us</Link>
              <a href="http://eepurl.com/dFaJHb">Stay in touch</a>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              className={`${css.alignRight} ${css.alignCenterOnMobile}`}
            >
              <a
                href="https://join.slack.com/t/womenandcolor/shared_invite/enQtNDE5MDA4MjU4MTQ5LTY4NGYxMjAyODJiODhkMDU3NjEwZmQyYWMzMWQ1ZjAwNjYzYmY5ZmIxNzRkMDM1ZjUwOTc5MjQ0NmFkMzNjMTY"
                target="_blank"
              >
                <FontAwesomeIcon icon={faSlack} size="lg" />
              </a>
              <a
                href="https://github.com/CivicTechTO/women-and-color-frontend"
                target="_blank"
              >
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </a>
              <a href="https://twitter.com/womenandcolor" target="_blank">
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a
                href="https://www.instagram.com/womenandcolor/"
                target="_blank"
              >
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        justify="center"
        className={`${css.footerRow} ${css.backgroundPrimaryDark}`}
        spacing={0}
      >
        <Grid item xs={11} md={9}>
          <Grid container justify="space-between" spacing={0}>
            <Grid item xs={12} sm={6} className={css.verticalOnMobile}>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/code-of-conduct">Code of Conduct</Link>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              className={`${css.alignRight} ${css.alignCenterOnMobile}`}
            >
              &copy; 2016 - 2018 Women and Color
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </footer>
  );
};

export default FullFooter;
