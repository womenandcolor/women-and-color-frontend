import React, { PropTypes } from 'react';

// App
import css from '../styles.css';

const SpeakerInfo = ({ speaker }) => {
  const title = `About ${speaker.first_name}`;
  return (
    <div>
      <h2 className={css.sectionHeader}>{title}</h2>
      <p className={css.speakerInfoDescription}>
        {speaker.description ? speaker.description : 'No description provided'}
      </p>
    </div>
  );
};

export default SpeakerInfo;
