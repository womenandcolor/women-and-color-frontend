import React, { PropTypes } from "react";
import Card, { CardContent } from "material-ui/Card";
import List, { ListItem, ListItemText } from "material-ui/List";

// App
import css from "../styles.css";

const ProfileCard = ({ speaker }) => {
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
          <p className={css.speakerTags}>{speaker.topics || "No Topics"}</p>
        </div>
        <List>
          <ListItem>
            <ListItemText
              primary={speaker.pronouns}
              className={css.speakerInfoListPronouns}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Toronto, Canada"
              className={css.speakerInfoListLocation}
            />
          </ListItem>
          {hasSocial && (
            <ListItem className={css.speakerInfoListSocial}>
              {speaker.twitter && <a href={speaker.twitter}>Twitter</a>}
              {speaker.linkedin && <a href={speaker.linkedin}>LinkedIn</a>}
              {speaker.website && <a href={speaker.website}>Website</a>}
            </ListItem>
          )}
        </List>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
