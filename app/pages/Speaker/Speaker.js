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

  generateTitle = speaker => {
    if (speaker) {
      const firstName = speaker.first_name || "Speaker";
      const lastName = speaker.last_name || "Profile";
      const position = speaker.position || "undisclosed position";
      const organization = speaker.organization || "undisclosed organization";


      return `${firstName} ${lastName}, ${position} at ${organization}`
    }

    return 'Speaker Profile';
  }

  generateDescription = speaker => {
    if (speaker) {
      const threeTopics = speaker.topics.slice(0,2).map(topic => topic.topic).join(', ')
      return `${speaker.first_name} ${speaker.last_name} is available for speaking opportunities at tech-related events on ${threeTopics} and more.`
    }

    return 'Find talented diverse speakers for tech-related events'
  }

  render() {
    const { speaker } = this.props;
    return(
      <div>
        <Helmet>
          <title>{this.generateTitle(speaker)}</title>
          <meta name="description" content={this.generateDescription(speaker)} />
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
