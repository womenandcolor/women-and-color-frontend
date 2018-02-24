import React, { Component } from "react";
import { connect } from "react-redux";
import { getSpeaker } from "appRedux/modules/speaker";

// App
import ProfileCard from "./components/ProfileCard";
import ProfileInfo from "./components/ProfileInfo";
import FeaturedTalks from "./components/FeaturedTalks";

const Speaker = props => {
  console.log("Speaker", props);
  return (
    <div>
      <div className="row">
        <div className="col m4">
          <ProfileCard speaker={props.speaker} />
        </div>
        <div className="col m8">
          <ProfileInfo speaker={props.speaker} />
          <FeaturedTalks talks={props.talks} />
        </div>
      </div>
    </div>
  );
};

class SpeakerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    props.getSpeaker(1);
  }

  render() {
    return this.props.speaker ? (
      <Speaker
        speaker={this.props.speaker}
        talks={this.props.featuredTalks}
      />
    ) : (
      <div>Loading...</div>
    );
  }
}

const mockFeaturedTalks = [
  {
    id: 1,
    name: "Building Products That Don't Suck",
    organization: "TechToronto",
    url: "https://google.ca",
    image: "http://via.placeholder.com/250x250"
  },
  {
    id: 2,
    name: "Today: Shopify Merchants and Consumers",
    organization: "Shopify Partners",
    url: "https://google.ca",
    image: "http://via.placeholder.com/350x250"
  },
  {
    id: 3,
    name: "Third One",
    organization: "Some Company",
    url: "https://google.ca",
    image: "http://via.placeholder.com/250x350"
  }
];

function mapStateToProps(state) {
  return {
    speaker: state.speaker.speaker,
    featuredTalks: mockFeaturedTalks, // state.featuredTalks,
    notification: state.notification.message
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    getSpeaker: id => {
      dispatch(getSpeaker(id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SpeakerContainer);
