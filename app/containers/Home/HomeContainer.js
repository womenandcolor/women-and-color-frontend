import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Home } from 'components'
import { fetchSpeakers } from '../../redux/actions'

const mapStateToProps = (state) => {
  return {
    speakers: state.speakers.results
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSpeakers: () => {
      dispatch(fetchSpeakers())
    }
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)