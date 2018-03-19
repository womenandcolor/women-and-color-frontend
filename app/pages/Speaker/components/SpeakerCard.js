import React, { PropTypes } from 'react';
import Card, { CardContent } from 'material-ui/Card';
import List, { ListItem, ListItemText } from 'material-ui/List';

// App
import css from '../styles.css';
import { pronounDict } from 'appHelpers/constants';

const SpeakerCard = ({ speaker }) => {
  const hasSocial = speaker.linkedin || speaker.twitter || speaker.website;
  return (
    <Card>
      <CardContent className={css.speakerCard}>
        <div className={css.speakerCardPhoto}>
          <img src={speaker.image} alt={speaker.display_name} />
        </div>
        <div className={css.speakerCardInfo}>
          <h5 className={css.speakerCardName}>{speaker.display_name}</h5>
          <p className={css.speakerCardTitle}>{speaker.position}</p>
          <p className={css.speakerCardOrganization}>{speaker.organization}</p>
          <p className={css.speakerCardTags}>{speaker.topic_list}</p>
        </div>
        <List>
          <ListItem>
            <ListItemText
              primary={pronounDict[speaker.pronouns]}
              className={css.speakerCardListPronouns}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`${speaker.city}`}
              className={css.speakerCardListLocation}
            />
          </ListItem>
          {hasSocial && (
            <ListItem className={css.speakerCardListSocial}>
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
      </CardContent>
    </Card>
  );
};

export default SpeakerCard;
