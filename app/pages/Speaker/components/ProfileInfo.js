import React, { PropTypes } from "react";
import StyledButton from "appCommon/StyledButton";
import css from "../styles.css";

const ProfileInfo = props => {
  const title = `About ${props.speaker.first_name}`;
  return (
    <div>
      <h2 className={css.profileInfoHeader}>{title}</h2>
      <p className={css.profileInfoDescription}>{props.speaker.description}</p>
    </div>
  );
};

export default ProfileInfo;
