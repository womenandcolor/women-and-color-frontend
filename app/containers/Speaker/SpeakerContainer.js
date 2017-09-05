import React from 'react'
import createReactClass from 'create-react-class'
import { Speaker } from 'components'

const SpeakerContainer = createReactClass({
  constructor() {
    super();
    this.state = {
      name: null,
      photo: null,
      title: null,
      tags: [],
    }
  }

  viewProfile() {
  }

  render () {
    return (
      <Speaker
        name={this.state.name}
        photo={this.state.photo}
        title={this.state.title}
        tags={this.state.tags}
        viewProfile={() => this.viewProfile()}
      />
    )
  }
})

export default SpeakerContainer
