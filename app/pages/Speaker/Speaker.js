import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSpeaker } from 'appRedux/modules/speaker';
import Grid from 'material-ui/Grid';

// App
import SpeakerCard from './components/SpeakerCard';
import SpeakerInfo from './components/SpeakerInfo';
import FeaturedTalks from './components/FeaturedTalks';
import MessageSpeakerForm from './components/MessageSpeakerForm';
import Banner from 'appCommon/Banner';

const Speaker = props => {
  const { speaker } = props;
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Banner />
      </Grid>
      <Grid item xs={9}>
        <Grid container spacing={24}>
          <Grid item xs={12} md={4}>
            <SpeakerCard speaker={speaker} />
          </Grid>
          <Grid item xs={12} md={8}>
            {speaker.description && <SpeakerInfo speaker={speaker} />}
            {(!!speaker.featured_talks.length) && <FeaturedTalks talks={speaker.featured_talks} />}
            <MessageSpeakerForm speaker={speaker} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

class SpeakerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { match: { params: { id, fullName } } } = this.props;
    this.props.getSpeaker(id, fullName);
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params: { id: currentId } } } = this.props;
    const { match: { params: { id: nextId } } } = nextProps;
    if (!!nextId && nextId !== currentId) {
      this.props.getSpeaker(nextId);
    }
  }

  render() {
    return this.props.speaker ? (
      <Speaker speaker={this.props.speaker} />
    ) : (
      <div>Loading...</div>
    );
  }
}

const mockFeaturedTalks = [
  {
    id: 1,
    name: "Building Products That Don't Suck",
    organization: 'TechToronto',
    url: 'https://google.ca',
    image: 'http://via.placeholder.com/250x250',
  },
  {
    id: 2,
    name: 'Today: Shopify Merchants and Consumers',
    organization: 'Shopify Partners',
    url: 'https://google.ca',
    image: 'http://via.placeholder.com/350x250',
  },
  {
    id: 3,
    name: 'Third One',
    organization: 'Some Company',
    url: 'https://google.ca',
    image: 'http://via.placeholder.com/250x350',
  },
];

function mapStateToProps(state) {
  return {
    speaker: state.speaker.speaker,
    notification: state.notification.message,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    getSpeaker: (id, fullName) => {
      dispatch(getSpeaker(id, fullName));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SpeakerContainer);
