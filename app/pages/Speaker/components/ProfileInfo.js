import React, { PropTypes } from "react";
import StyledButton from "appCommon/StyledButton";
import css from "../styles.css";

const ProfileInfo = ({ speaker }) => {
  const title = `About ${speaker.first_name}`;
  return (
    <div>
      <h4 className={css.profileInfoHeader}>{title}</h4>
      <p className={css.profileInfoDescription}>
        {speaker.description ? speaker.description : "No description provided"}
      </p>
    </div>
  );
};

export default ProfileInfo;
