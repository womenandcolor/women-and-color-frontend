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
    <Grid container spacing={0}>
      <Grid container className={css.speakersList} spacing={8}>
        {speakers.map((speaker, index) => (
          <SpeakerCard speaker={speaker} key={speaker.id} />
        ))}
      </Grid>
      {!endOfResults && (
        <Grid container justify={'center'}>
          <Grid item>
            <StyledButton color="secondary" onClick={loadMoreSpeakers}>
              Load more speakers
            </StyledButton>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default SpeakerList;
