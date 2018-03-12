import React, { PropTypes } from 'react';
import StyledButton from 'appCommon/StyledButton';
import css from '../styles.css';


const SpeakerCard = ({speaker}) => {
  const name = !!speaker.display_name ? speaker.display_name : speaker.email

  return (
    <div className={css.contentCard}>
      <div className={css.photo}>
        <img src={speaker.image} alt={name} />
      </div>
      <div className={css.info}>
        <h3 className={css.name}>{name}</h3>
        <p className={css.speakerTitle}>{`${speaker.position || 'Independent'}, ${speaker.organization || 'No affiliation'}`}</p>
        <p className={css.speakerTags}>{speaker.topic_list}</p>
      </div>
      <div className="actions">
        <StyledButton color="primary" label='View profile' href={`#/speaker/${speaker.id}`}>View profile</StyledButton>
      </div>
    </div>
  )
}

export default SpeakerCard
