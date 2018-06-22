import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSpeaker } from 'appRedux/modules/speaker';
import Grid from 'material-ui/Grid';
import ReactLoading from 'react-loading';
import { Helmet } from "react-helmet";

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
    const { speaker } = this.props;
    const title = speaker ? `${speaker.first_name} ${speaker.last_name} - Speaker Profile` : 'Speaker Profile';
    const description = speaker ? (speaker.bio ? speaker.bio : `${speaker.first_name} ${speaker.last_name} | ${speaker.position} at ${speaker.organization} | based in ${speaker.city}`) : 'Find talented diverse speakers for tech-related events';
    return(
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
        </Helmet>
        {
          this.props.speaker ? (
            <Speaker speaker={this.props.speaker} />
          ) : (
            <ReactLoading type="spinningBubbles" color="#E5E8F4" />
          )
        }
      </div>
    )
  }
}

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
