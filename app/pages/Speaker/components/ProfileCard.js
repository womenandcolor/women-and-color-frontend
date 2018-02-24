import React, { PropTypes } from "react";
import StyledButton from "appCommon/StyledButton";
import css from "../styles.css";

const ProfileCard = ({ speaker }) => {
  const hasSocial = speaker.linkedin || speaker.twitter || speaker.website;
  return (
    <div className={`card ${css.speakerCard}`}>
      <div className="card-content">
        <div className={css.speakerPhoto}>
          <img
            className="img-responsive circle"
            src={speaker.image}
            alt={speaker.display_name}
          />
        </div>
        <div className="center-align">
          <h5 className={css.speakerName}>{speaker.display_name}</h5>
          <p className={css.speakerTitle}>{speaker.position}</p>
          <p className={css.speakerOrganization}>{speaker.organization}</p>
          <p className={css.speakerTags}>{speaker.topics || "No Topics"}</p>
        </div>
      </div>
      <ul className="collection center-align">
        <li className="collection-item">{speaker.pronouns}</li>
        <li className="collection-item">Toronto, Canada</li>
        {hasSocial && (
          <li className="collection-item">
            {speaker.twitter && <a href={speaker.twitter}>Twitter</a>}
            {speaker.linkedin && <a href={speaker.linkedin}>LinkedIn</a>}
            {speaker.website && <a href={speaker.website}>Website</a>}
          </li>
        )}
      </ul>
    </div>
  );
};

export default ProfileCard;
