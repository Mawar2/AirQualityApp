import React, { Component } from 'react'
import { Message } from 'semantic-ui-react'

class BannerMessage extends Component {
  state = { visible: true }

  handleDismiss = () => {
    this.setState({ visible: false })

    setTimeout(() => {
      this.setState({ visible: true })
    }, 2000)
  }

  render() {
    if (this.state.visible) {
      return (
        <Message
          onDismiss={this.handleDismiss}
          header='Welcome!'
          content='Please enter two cities below and hit the Add City button to use the application and to submit for Air Quality results.'
        />
      )
    }

    return (
      <p>
        <br />
        <i>The message will return in 2s</i>
        <br />
        <br />
      </p>
    )
  }
}

export default BannerMessage