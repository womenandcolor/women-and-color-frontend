// NPM
import React, { PropTypes } from 'react';

// App
import { speakerToProfilePath } from 'appHelpers/url';
import StyledButton from 'appCommon/StyledButton';
import css from '../styles.css';

const SpeakerCard = ({ speaker }) => {
  const name = !!speaker.display_name ? speaker.display_name : speaker.email;
  const title =
    speaker.position && speaker.organization
      ? `${speaker.position} at ${speaker.organization}`
      : `${speaker.position || 'Independent'}, ${speaker.organization ||
          'No affiliation'}`;
  const speakerProfilePath = speakerToProfilePath({
    basePath: '#',
    ...speaker,
  });
  return (
    <div className={css.contentCard}>
      <div className={css.photo}>
        <img src={speaker.image} alt={name} />
      </div>
      <div className={css.info}>
        <h3 className={css.name}>{name}</h3>
        <p className={css.speakerTitle}>{title}</p>
        <p className={css.speakerTags}>{speaker.topic_list}</p>
      </div>
      <div className="actions">
        <StyledButton
          color="primary"
          label="View profile"
          href={speakerProfilePath}
        >
          View profile
        </StyledButton>
      </div>
    </div>
  );
};

export default SpeakerCard;
