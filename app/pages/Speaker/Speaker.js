import React, { Component } from "react";
import { connect } from "react-redux";

// App
import ProfileCard from "./components/ProfileCard";
import ProfileInfo from "./components/ProfileInfo";
import FeaturedTalks from "./components/FeaturedTalks";
import SimilarSpeakers from "./components/SimilarSpeakers";

const Speaker = props => {
  console.log("Speaker", props);
  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <ProfileCard speaker={props.speaker} />
        </div>
        <div className="col-md-8">
          <ProfileInfo speaker={props.speaker} />
          <FeaturedTalks talks={props.talks} />
        </div>
      </div>
      <SimilarSpeakers speakers={props.similarSpeakers} />
    </div>
  );
};

class SpeakerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.props.fetchSpeakers()
  }

  render() {
    return (
      <Speaker
        speaker={this.props.speaker}
        talks={this.props.featuredTalks}
        similarSpeakers={this.props.similarSpeakers}
      />
    );
  }
}

const mockSpeaker = {
  id: 1,
  first_name: "Satish",
  last_name: "Kanwar",
  position: "VP of Product",
  organization: "Shopify",
  topics:
    "acquisition, ecommerce, entrepreneurship, founder, product management, user experience",
  description:
    "Satish is a VP of Product at Shopify. He previously co-founded Jet Cooper, a UX design agency that was acquired in 2013. He is an active speaker, mentor and angel investor in the Canadian startup community. He was on Forbes' 30 Under 30 for Retail & Ecommerce in 2016.",
  pronouns: "He, Him, His",
  location: {
    city: "Toronto",
    province: "Ontario",
    country: "Canada"
  },
  email: "Email",
  twitter: "",
  linkedin: "",
  website: "",
  image: "http://via.placeholder.com/150x150" // url
};

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

const mockSimilarSpeakers = [
  {
    id: 1,
    first_name: "Satish",
    last_name: "Kanwar",
    position: "VP of Product",
    organization: "Shopify",
    topics:
      "acquisition, ecommerce, entrepreneurship, founder, product management, user experience",
    description:
      "Satish is a VP of Product at Shopify. He previously co-founded Jet Cooper, a UX design agency that was acquired in 2013. He is an active speaker, mentor and angel investor in the Canadian startup community. He was on Forbes' 30 Under 30 for Retail & Ecommerce in 2016.",
    pronouns: "He, Him, His",
    location: {
      city: "Toronto",
      province: "Ontario",
      country: "Canada"
    },
    email: "Email",
    twitter: "",
    linkedin: "",
    website: "",
    image: "http://via.placeholder.com/150x150" // url
  },
  {
    id: 2,
    first_name: "Satish",
    last_name: "Kanwar",
    position: "VP of Product",
    organization: "Shopify",
    topics:
      "acquisition, ecommerce, entrepreneurship, founder, product management, user experience",
    description:
      "Satish is a VP of Product at Shopify. He previously co-founded Jet Cooper, a UX design agency that was acquired in 2013. He is an active speaker, mentor and angel investor in the Canadian startup community. He was on Forbes' 30 Under 30 for Retail & Ecommerce in 2016.",
    pronouns: "He, Him, His",
    location: {
      city: "Toronto",
      province: "Ontario",
      country: "Canada"
    },
    email: "Email",
    twitter: "",
    linkedin: "",
    website: "",
    image: "http://via.placeholder.com/150x150" // url
  },
  {
    id: 3,
    first_name: "Satish",
    last_name: "Kanwar",
    position: "VP of Product",
    organization: "Shopify",
    topics:
      "acquisition, ecommerce, entrepreneurship, founder, product management, user experience",
    description:
      "Satish is a VP of Product at Shopify. He previously co-founded Jet Cooper, a UX design agency that was acquired in 2013. He is an active speaker, mentor and angel investor in the Canadian startup community. He was on Forbes' 30 Under 30 for Retail & Ecommerce in 2016.",
    pronouns: "He, Him, His",
    location: {
      city: "Toronto",
      province: "Ontario",
      country: "Canada"
    },
    email: "Email",
    twitter: "",
    linkedin: "",
    website: "",
    image: "http://via.placeholder.com/150x150" // url
  }
];

function mapStateToProps(state) {
  return {
    speaker: mockSpeaker, // state.user,
    featuredTalks: mockFeaturedTalks, // state.featuredTalks,
    similarSpeakers: mockSimilarSpeakers, // state.similarSpeakers,
    profile: state.profile,
    notification: state.notification.message
  };
}

function mapDispatchToProps(dispatch, props) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SpeakerContainer);
