import React, { Component } from 'react';

class Loader extends Component {
  render() {
    return (
      <div className="wrapper">
        <div className="form_language">
          <div className="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Loader;