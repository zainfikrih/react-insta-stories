import React, { Component } from 'react'
import Container from './components/Container'
import PropTypes from 'prop-types'
require('babel-polyfill')

export default class ReactInstaStories extends Component {
  render() {
    return (
      <div>
        <Container
          stories={this.props.stories}
          defaultInterval={this.props.defaultInterval}
          width={this.props.width}
          height={this.props.height}
        />
      </div>
    )
  }
}

ReactInstaStories.propTypes = {
  stories: PropTypes.array,
  defaultInterval: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number
}