import React, { PropTypes } from 'react';
import Card, { CardContent } from 'material-ui/Card';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Grid from 'material-ui/Grid';

import { withStyles } from 'material-ui/styles';

// App
import css from '../styles.css';
import { profilePhoto } from 'appSharedStyles/styles.css';
import { pronounDict } from 'appHelpers/constants';
import Topics from './Topics';

const styles = {
  city: {
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
    borderTop: '1px solid var(--color-grey-light)',
  },
  pronouns: {
    backgroundColor: 'var(--color-secondary)',
    textAlign: 'center',
    borderTop: '1px solid var(--color-grey-light)',
  },
  socials: {
    backgroundColor: 'var(--color-inverted-light)',
    textAlign: 'center',
    justifyContent: 'space-around',
    borderTop: '1px solid var(--color-grey-light)',
  },
  card: {
    borderRadius: '8px',
    border: '1px solid var(--color-grey-light)',
  },
  photo: {
    marginBottom: '1rem',
    marginTop: '1rem',
  },
  listItemText: {
    padding: '0',
  },
};

const SpeakerCard = ({ speaker, classes }) => {
  const hasSocial = speaker.linkedin || speaker.twitter || speaker.website;

  return (
    <Card elevation={0} square={false} className={classes.card}>
      <Grid container>
        <Grid item xs={12}>
          <CardContent className={css.speakerCard}>
            <Grid container justify="center">
              <Grid item xs={8}>
                <div className={`${profilePhoto} ${classes.photo}`}>
                  <img src={speaker.image} alt={speaker.display_name} />
                </div>
              </Grid>
            </Grid>
            <div className={css.speakerCardInfo}>
              <h5 className={css.speakerCardName}>{speaker.display_name}</h5>
              <p className={css.speakerCardTitle}>{speaker.position}</p>
              <p className={css.speakerCardOrganization}>
                {speaker.organization}
              </p>
              {speaker.topics.length > 0 &&
                <Topics topics={speaker.topics} />
              }
            </div>
          </CardContent>
          <List>
            {speaker.pronouns && (
              <ListItem className={classes.pronouns}>
                <ListItemText
                  className={classes.listItemText}
                  primary={pronounDict[speaker.pronouns]}
                />
              </ListItem>
            )}

            {speaker.city && (
              <ListItem className={classes.city}>
                <ListItemText
                  className={classes.listItemText}
                  primary={`${speaker.city}`}
                />
              </ListItem>
            )}
            {hasSocial && (
              <ListItem className={`${classes.socials} ${css.socialLinks}`}>
                {speaker.twitter && (
                  <a
                    href={`https://twitter.com/${speaker.twitter.replace(
                      /@/,
                      ''
                    )}`}
                    target="_blank"
                  >
                    Twitter
                  </a>
                )}
                {speaker.linkedin && (
                  <a href={speaker.linkedin} target="_blank">
                    LinkedIn
                  </a>
                )}
                {speaker.website && (
                  <a href={speaker.website} target="_blank">
                    Website
                  </a>
                )}
              </ListItem>
            )}
          </List>
        </Grid>
      </Grid>
    </Card>
  );
};

export default withStyles(styles)(SpeakerCard)
