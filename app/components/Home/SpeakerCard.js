import React, { PropTypes } from 'react';
import StyledButton from '../Common/StyledButton';
import css from './styles.css';

const SpeakerCard = (props) => {
  const name = `${props.speaker.firstName} ${props.speaker.lastName}`

  return (
    <div className={css.contentCard}>
      <div className={css.photo}>
        <img style={{height: '100%', width: '100%'}} src={props.speaker.image} alt={name} />
      </div>
      <div className={css.info}>
        <h3 className={css.name}>{name}</h3>
        <p className={css.speakerTitle}>{`${props.speaker.position}`}</p>
        <p className={css.speakerTags}>{`${props.speaker.topics}`}</p>
      </div>
      <div className="actions">
        <StyledButton label='View profile' href={'/'}>View profile</StyledButton>
      </div>
    </div>
  )
}

export default SpeakerCard
