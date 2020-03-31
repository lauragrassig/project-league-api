import React, { Component } from 'react';

const UrlAPI = "https://ddragon.leagueoflegends.com/cdn/9.22.1/data/";
const ChampionAPI = "/champion.json";

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      champions: [],
      isLoading: true,
      error: null,
      SelectedLanguage: ''
    };
  }

  selectedChampion = event => {
    const  selectedChampion = event.target.id;
    const  SelectedLanguage = this.props.location.state.SelectedLanguage
    
    this.props.history.push({pathname: '/Champions', state: {selectedChampion, SelectedLanguage}});
  }

  componentDidMount () {
    const SelectedLanguage = this.props.location.state.SelectedLanguage
    
    fetch(UrlAPI + SelectedLanguage + ChampionAPI)
    .then(res => {
      if(res.ok) {
        return res.json();
      } else {
        throw new Error ('Algo errado');
      }
    })
      .then(result => this.setState({
        champions: Object.keys(result.data).reduce((array, key) => {
          return [...array, {champion: result.data[key]}]
      }, []),
        isLoading: false}))
      .catch(error => this.setState ({ error, isLoading: false }));
  }

  render () {
    const { isLoading, error } = this.state;
    
    if (isLoading) { return <div className="loader"><div></div><div></div><div></div><div></div></div>; }
    if (error) { return <p>{error.message}</p>; }

      return (
        <div className="wrapper_cards">
          {this.state.champions.map((champion, key) => (
            <div key={key}
            id={champion.champion.id}
            onClick={this.selectedChampion}
            
            className="champion">
              <h1 id={champion.champion.id}>{champion.champion.key} - {champion.champion.name}</h1>
              <img id={champion.champion.id} alt={champion.champion.key} src={ "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champion.champion.id + "_0.jpg" }/>
            </div>
          ))}
        </div>
        
      );
  }
}

export default Cards;