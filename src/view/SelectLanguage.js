import React, { Component } from 'react';

import Loader from '../components/Loader';

const LanguageAPI = "http://demo3139755.mockable.io/leagueLanguages";

class SelectLanguage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: [],
      isLoading: true,
      error: null,
      SelectedLanguage: ''
    };
  }

  onChange = event => {
    this.setState({ SelectedLanguage: event.target.value })
  }

  returnLanguage = event => {
    this.setState({ error: false })
  }

  onSearch = event => {
    event.preventDefault();
    const { SelectedLanguage } = this.state;

    if (SelectedLanguage === '' || SelectedLanguage == null) {
      this.setState({ error: true })
    } else {
      this.props.history.push({ pathname: '/Cards', state: { SelectedLanguage } });
    }
  }

  componentDidMount() {
    fetch(LanguageAPI)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Please try again');
        }
      })
      .then(result => this.setState({ languages: result.languages, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const { isLoading, error } = this.state;

    if (isLoading) { return <Loader /> }

    if (error) {
      return (
        <div className="wrapper">
          <div className="form_language -column">
            <p>Please select the language</p>
            <button className="button_default -w100" onClick={this.returnLanguage}>Ok!</button>
          </div>
        </div>
      )
    }

    return (
      <div className="wrapper">
        <div className="form_language">
          <form onSubmit={this.onSearch}>
            <select onChange={this.onChange} className="select_default">
              {this.state.languages.map((language, key) => (
                <option key={key} value={language.value}>{language.name}</option>
              ))}
            </select>
            <button className="button_default" type="submit">
              <span>Search</span>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default SelectLanguage;