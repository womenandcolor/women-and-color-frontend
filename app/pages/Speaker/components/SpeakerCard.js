import React, { PropTypes } from 'react';
import Card, { CardContent } from 'material-ui/Card';
import List, { ListItem, ListItemText } from 'material-ui/List';

// App
import css from '../styles.css';
import { pronounDict } from 'appHelpers/constants'

const SpeakerCard = ({ speaker }) => {
  const hasSocial = speaker.linkedin || speaker.twitter || speaker.website;
  return (
    <Card>
      <CardContent className={css.speakerCard}>
        <div className={css.speakerPhoto}>
          <img src={speaker.image} alt={speaker.display_name} />
        </div>
        <div className={css.speakerInfo}>
          <h5 className={css.speakerName}>{speaker.display_name}</h5>
          <p className={css.speakerTitle}>{speaker.position}</p>
          <p className={css.speakerOrganization}>{speaker.organization}</p>
          <p className={css.speakerTags}>{speaker.topic_list}</p>
        </div>
        <List>
          <ListItem>
            <ListItemText
              primary={pronounDict[speaker.pronouns]}
              className={css.speakerInfoListPronouns}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`${speaker.city}`}
              className={css.speakerInfoListLocation}
            />
          </ListItem>
          {
            hasSocial &&
            <ListItem className={css.speakerInfoListSocial}>
              {speaker.twitter && <a href={`https://twitter.com/${speaker.twitter.replace(/@/,'')}`} target="_blank">Twitter</a>}
              {speaker.linkedin && <a href={speaker.linkedin} target="_blank">LinkedIn</a>}
              {speaker.website && <a href={speaker.website} target="_blank">Website</a>}
            </ListItem>
          }
        </List>
      </CardContent>
    </Card>
  );
};

export default SpeakerCard;
