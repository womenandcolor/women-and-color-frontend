import React, { PropTypes } from 'react';

// App
import css from '../styles.css';

const ProfileInfo = ({ speaker }) => {
  const title = `About ${speaker.first_name}`;
  return (
    <div>
      <h2 className={css.sectionHeader}>{title}</h2>
      <p className={css.profileInfoDescription}>
        {speaker.description ? speaker.description : 'No description provided'}
      </p>
    </div>
  );
};

export default ProfileInfo;
