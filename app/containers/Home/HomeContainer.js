import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Home } from 'components'
import { fetchSpeakers } from '../../redux/modules/speaker'


class HomeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.props.fetchSpeakers()
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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)
