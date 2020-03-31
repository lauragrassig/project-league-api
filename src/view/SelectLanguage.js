import React, {Component} from 'react';

const LanguageAPI = "http://demo3139755.mockable.io/leagueLanguages";

class SelectLanguage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: [],
      isLoading: true,
      error: null,
      error2: null,
      SelectedLanguage: ''
    };
  }

  onChange = event => {
    this.setState({ SelectedLanguage: event.target.value })
  }

  returnLanguage () {
    this.setState({ error: false })
  }
  
  onSearch = event => {
    event.preventDefault();
    const { SelectedLanguage } = this.state;
    
    if ( SelectedLanguage === '' || SelectedLanguage == null){
      this.setState({ error: true })
    } else {
      this.props.history.push({pathname: '/Cards', state: {SelectedLanguage}});
    }
  }

  componentDidMount() {
    fetch(LanguageAPI)
    .then( res => {
      if(res.ok) {
        return res.json();
      } else {
        throw new Error ('Algo errado');
      }
    })
    .then(result => this.setState ({ languages: result.languages, isLoading: false}))
    .catch(error => this.setState ({ error, isLoading: false }));
  }

  render () {

    const { isLoading, error } = this.state;
    if (isLoading) { return <div className="loader"><div></div><div></div><div></div><div></div></div>; }

    if (error) { return <div>
      <p>{error.message}</p>
      <p>Por favor preencha novamente</p>
      <button onClick={this.returnLanguage}>teste</button>
    </div> } 

    return (
      <div className="wrapper">
        <form onSubmit={this.onSearch}>
          <select onChange={this.onChange}>
            {this.state.languages.map((language, key) => (
            <option key={key} value={language.value}>{language.name}</option>
            ))}
          </select>
          <button className="language--button pulse" type="submit">
            <span>Acessar</span>
          </button>
        </form>
      </div>
    );
  }
}

export default SelectLanguage;