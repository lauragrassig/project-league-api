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

  returnLanguage = event => {
    this.setState({ error: false })
  }
  
  onSearch = event => {
    event.preventDefault();
    const { SelectedLanguage } = this.state;
    
    //*~ Salvar no localStorage + Verificar se há valor + Alterar página
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
    if (isLoading) { return <p>Loading ...</p>; }

    if (error) { return <div>
      <p>{error.message}</p>
      <p>Por favor preencha novamente</p>
      <button onClick={this.returnLanguage}>teste</button>
    </div> } 

    return (
      <div className="wrapper--language">
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