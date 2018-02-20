import React, { PropTypes } from "react";
import StyledButton from "appCommon/StyledButton";
import css from "../styles.css";

const ProfileCard = props => {
  const name = `${props.speaker.first_name} ${props.speaker.last_name}`;

  return (
    <div className={`card ${css.speakerCard}`}>
      <div className="card-body">
        <div className={css.speakerPhoto}>
          <img
            className="img-fluid rounded-circle"
            src={props.speaker.image}
            alt={name}
          />
        </div>
        <div className="text-center">
          <h5 className={css.speakerName}>{name}</h5>
          <p className={css.speakerTitle}>{props.speaker.position}</p>
          <p className={css.speakerOrganization}>
            {props.speaker.organization}
          </p>
          <p className={css.speakerTags}>
            {props.speaker.topics || "No Topics"}
          </p>
        </div>
      </div>
      <ul className="list-group list-group-flush text-center">
        <li className="list-group-item">{props.speaker.pronouns}</li>
        <li className="list-group-item">
          {props.speaker.location.city}, {props.speaker.location.country}
        </li>
        <li className="list-group-item">Twitter - LinkedIn - Website</li>
      </ul>
    </div>
  );
};

export default ProfileCard;
