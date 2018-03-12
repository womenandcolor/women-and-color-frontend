// NPM
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

// APP
import SpeakerCard from './components/SpeakerCard';
import Sidebar from './components/Sidebar';
import StyledButton from 'appCommon/StyledButton';
import css from './styles.css';
import { fetchSpeakers, updateSearchParams } from 'appRedux/modules/speaker';
import { get as getLocations } from 'appRedux/modules/location';
import {
  get as getUser
} from 'appRedux/modules/user';
import { DEFAULT_SPEAKER_LIMIT } from 'appHelpers/constants'

const Home = (props) => {
  return (
    <Grid container>
      <Grid item xs={12} md={3}>
          <Sidebar locations={props.locations} />
      </Grid>
      <Grid item xs={12} md={9}>
        <div className={css.contentTitles}>{'Speakers in Toronto for all topics'}</div>
        <div className={css.speakersList}>
          {
            props.speakers.map((speaker, index) => (
              <SpeakerCard speaker={speaker} key={index} />
            ))
          }
        </div>
        <Grid container justify={'center'}>
          <Grid item>
            <StyledButton color="secondary" onClick={props.loadMoreSpeakers}>Load more speakers</StyledButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

class HomeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.props.getUser();
    this.props.getLocations();
    this.props.fetchSpeakers(this.props.searchParams);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.searchParams != nextProps.searchParams) {
      this.props.fetchSpeakers(nextProps.searchParams)
    }
  }

  loadMoreSpeakers = () => {
    this.props.updateSearchParams({
      limit: DEFAULT_SPEAKER_LIMIT,
      offset: this.props.searchParams.offset + DEFAULT_SPEAKER_LIMIT,
      append: true
    })
  }

  render() {
    return (
      <Home
        speakers={this.props.speakers}
        locations={this.props.locations}
        loadMoreSpeakers={this.loadMoreSpeakers}
      />
    )
  }
}


const mapStateToProps = (state) => {
  return {
    speakers: state.speaker.results,
    locations: state.location.locations,
    searchParams: state.speaker.searchParams
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSpeakers: (params) => {
      dispatch(fetchSpeakers(params))
    },
    updateSearchParams: (params) => {
      dispatch(updateSearchParams(params))
    },
    getUser: () => {
      dispatch(getUser());
    },
    getLocations: () => {
      dispatch(getLocations());
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)
