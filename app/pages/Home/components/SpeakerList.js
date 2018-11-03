// NPM
import React, { PropTypes } from 'react';
import Grid from 'material-ui/Grid';
import ReactLoading from 'react-loading';

// APP
import SpeakerCard from './SpeakerCard';
import StyledButton from 'appCommon/StyledButton';
import css from '../styles.css';

const SpeakerList = ({ speakers, endOfResults, loadMoreSpeakers, isLoading }) => {
  const noResults = speakers.length === 0;
  if (isLoading && noResults) {
    console.log('initial load')
    return <ReactLoading type="spinningBubbles" color="#E5E8F4" />;
  }
  if (!isLoading && noResults) {
    return <div className={css.noResults}>No results</div>;
  }

  return (
    <Grid container spacing={0}>
      <Grid container className={css.speakersList} spacing={0}>
        {speakers.map((speaker, index) => (
          <SpeakerCard speaker={speaker} key={speaker.id} />
        ))}
      </Grid>
      {!endOfResults && (
        <Grid container justify={'center'} spacing={0}>
          <Grid item>
            <StyledButton color="secondary" onClick={loadMoreSpeakers} className={css.loadMoreButton}>
              {isLoading ? 'Loading...' : 'Load more speakers'}
            </StyledButton>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default SpeakerList;
