// NPM
import React, { PropTypes } from 'react';
import Hidden from 'material-ui/Hidden';
import Grid from 'material-ui/Grid';

// App
import { speakerToProfilePath } from 'appHelpers/url';
import StyledButton from 'appCommon/StyledButton';
import css from '../styles.css';

const SpeakerCard = ({ speaker }) => {
  const name = !!speaker.display_name ? speaker.display_name : speaker.email;
  const title =
    speaker.position && speaker.organization
      ? `${speaker.position} at ${speaker.organization}`
      : `${speaker.position || 'Independent'}, ${speaker.organization ||
          'No affiliation'}`;
  const speakerProfilePath = speakerToProfilePath({
    basePath: '#',
    ...speaker,
  });
  return (
    <Grid item xs={12} className={css.contentCard}>
      <Grid container>
        <Grid item xs={3} md={3}>
          <a href={speakerProfilePath} className={css.photo}>
            <img src={speaker.image} alt={name} />
          </a>
        </Grid>
        <Grid item xs={9} md={6} className={css.info}>
          <a href={speakerProfilePath}>
            <h3 className={css.name}>{name}</h3>
          </a>
          <p className={css.speakerTitle}>{title}</p>
          <p className={css.speakerTags}>{speaker.topic_list}</p>
        </Grid>
        <Hidden smDown>
          <Grid item md={3} className={`${css.info} actions`}>
            <StyledButton
              color="primary"
              label="View profile"
              href={speakerProfilePath}
            >
              View profile
            </StyledButton>
          </Grid>
        </Hidden>
      </Grid>
    </Grid>
  );
};

export default SpeakerCard;
