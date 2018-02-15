// NPM
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';;

// APP
import SpeakerCard from './components/SpeakerCard'
import css from './styles.css'
import { fetchSpeakers } from 'appRedux/modules/speaker';
import {
  get as getUser
} from 'appRedux/modules/user';

const Home = (props) => {
  return (
    <div className="container">

      <div className="row">
          <div className="col-lg-3">

            <h2 className={css.sidebarTitles}>CITY</h2>
              <ul className="list-unstyled">
                <li className={css.sidebarObject}>all cities</li>
                <li className={css.sidebarObject}>montreal</li>
                <li className={css.sidebarObject}>ottawa</li>
                <li className={css.sidebarObjectSelected}>toronto</li>
                <li className={css.sidebarObject}>vancouver</li>
              </ul>

            <div className={css.sidebarTitles}>SELF-IDENTITY</div>
              <ul className="list-unstyled">
                <li className={css.sidebarObjectSelected}>all speakers</li>
                <li className={css.sidebarObject}>woman</li>
                <li className={css.sidebarObject}>woman of color</li>
                <li className={css.sidebarObject}>person of color</li>
              </ul>
          </div>

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

  render() {
    return (
      <Home speakers={this.props.speakers} />
    )
  }
}


const mapStateToProps = (state) => {
  return {
    speakers: state.speaker.results
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSpeakers: () => {
      dispatch(fetchSpeakers())
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
