import React, { PropTypes } from 'react';
import StyledButton from 'appCommon/StyledButton';
import css from '../styles.css';

const SpeakerCard = ({ speaker }) => {
  const name = !!speaker.display_name ? speaker.display_name : speaker.email;
  const title =
    speaker.position && speaker.organization
      ? `${speaker.position} at ${speaker.organization}`
      : `${speaker.position || 'Independent'}, ${speaker.organization ||
          'No affiliation'}`;

  return (
    <div className={css.contentCard}>
      <div className={css.photo}>
        <a href={`#/speaker/${speaker.id}`}>
          <img src={speaker.image} alt={name} />
        </a>
      </div>
      <div className={css.info}>
        <a href={`#/speaker/${speaker.id}`}>
          <h3 className={css.name}>{name}</h3>
        </a>
        <p className={css.speakerTitle}>{title}</p>
        <p className={css.speakerTags}>{speaker.topic_list}</p>
      </div>
      <div className="actions">
        <StyledButton
          color="primary"
          label="View profile"
          href={`#/speaker/${speaker.id}`}
        >
          View profile
        </StyledButton>
      </div>
    </div>
  );
};

export default SpeakerCard;
