// NPM
import React, { PropTypes } from 'react';
import Grid from 'material-ui/Grid';

// APP
import SpeakerCard from './SpeakerCard';
import StyledButton from 'appCommon/StyledButton';
import css from '../styles.css';

const SpeakerList = ({ speakers, endOfResults, loadMoreSpeakers }) => {
  const noResults = speakers.length === 0;

  if (noResults) {
    return <div className={css.noResults}>No results</div>;
  }

  return (
    <div>
      <div className={css.speakersList}>
        {speakers.map((speaker, index) => (
          <SpeakerCard speaker={speaker} key={speaker.id} />
        ))}
      </div>
      {!endOfResults && (
        <Grid container justify={'center'}>
          <Grid item>
            <StyledButton color="secondary" onClick={loadMoreSpeakers}>
              Load more speakers
            </StyledButton>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default SpeakerList;
