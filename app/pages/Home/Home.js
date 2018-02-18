// NPM
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// APP
import SpeakerCard from './components/SpeakerCard';
import Sidebar from './components/Sidebar';
import css from './styles.css';
import { fetchSpeakers } from 'appRedux/modules/speaker';
import {
  get as getUser
} from 'appRedux/modules/user';

const Home = (props) => {
  return (
    <div className="container">

      <div className="row">
          <Sidebar />

          <div className="col-lg-9">
            <div className={css.contentTitles}>{'Speakers in Toronto for all topics'}</div>
            <div className="speakers-list">
              {
                props.speakers.map((speaker, index) => (
                  <SpeakerCard speaker={speaker} key={index} />
                ))
              }
            </div>
          </div>
      </div>
    </div>
  )
}

class HomeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.props.getUser();
    this.props.fetchSpeakers();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.searchParams != nextProps.searchParams) {
      this.props.fetchSpeakers(nextProps.searchParams)
    }
  }

  render() {
    return (
      <Home speakers={this.props.speakers} />
    )
  }
}


const mapStateToProps = (state) => {
  return {
    speakers: state.speaker.results,
    searchParams: state.speaker.searchParams
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSpeakers: (params) => {
      dispatch(fetchSpeakers(params))
    },
    getUser: () => {
      dispatch(getUser());
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)
