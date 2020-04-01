import React, { Component } from 'react';

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
          throw new Error('Algo errado');
        }
      })
      .then(result => this.setState({ languages: result.languages, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const { isLoading, error } = this.state;
    if (isLoading) { return (
      <div className="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      )}

    if (error) {
      return (
      <div className="wrapper">
        <div className="form_language">
          <p>{error.message}</p>
          <p>Por favor preencha novamente</p>
          <button onClick={this.returnLanguage}>teste</button>
        </div>
      </div>
      )}

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
              <span>Acessar</span>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default SelectLanguage;