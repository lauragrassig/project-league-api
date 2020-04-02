import React, { Component } from 'react';

class BackButton extends Component {
  buttonBack = event => {
    this.props.history.goBack()
  }

  render() {
    return (
      <button className="button_default -sm" onClick={this.buttonBack}><i className="fas fa-chevron-left"></i> </button>
    );
  }
}

export default BackButton;