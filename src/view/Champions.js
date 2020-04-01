import React, { Component } from 'react';

const BaseChampionAPI = "http://ddragon.leagueoflegends.com/cdn/10.6.1/data/";

class Champions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      champ: [],
      skin: [],
      isLoading: true,
      error: null
    };
  }

  componentDidMount() {
    const SelectedLanguage = this.props.location.state.SelectedLanguage
    const selectedChampion = this.props.location.state.selectedChampion

    this.setState ({ selectedChampion: this.props.location.state.selectedChampion })

    fetch(BaseChampionAPI + SelectedLanguage + '/champion/' + selectedChampion +'.json')
    .then( res => {
      if(res.ok) {
        return res.json();
      } else {
        throw new Error ('Algo errado');
      }
    })
    .then(result => this.setState({
        champ: Object.keys(result.data).reduce((array, key) => {
          return [...array, {champion: result.data[key]}]
        }, []),
        isLoading: false,
        skin: result.data[selectedChampion].skins})
      )
    .catch(error => this.setState ({ error, isLoading: false }));
  }

  render () {
    const { isLoading, error, skin, selectedChampion } = this.state;
    const items = [];
    
    for (const item of skin) {
      items.push(
      <div> 
        <img key={item.id} alt={item.id} src={"http://ddragon.leagueoflegends.com/cdn/img/champion/loading/"+ selectedChampion + "_" + item.num + ".jpg"} />
        <h2>{item.name}</h2>
      </div>
      )
    }
  
    if (isLoading) { return <p>Loading ...</p>; }
    if (error) { return <p>{error.message}</p>; }

      return (
        <div className="wrapper_cards">
          {this.state.champ.map((champion, key) => (
            <div key={key}
            id={champion.champion.id}
            onClick={this.selectedChampion}
            className="champion">
              <h1 id={champion.champion.id}>{champion.champion.key} - {champion.champion.name}</h1>
              <p>{champion.champion.title}</p>
              <p>{champion.champion.lore} </p>
              <button></button>

              {items}
              
            </div>
          ))}
        </div>
      );
  }
}

export default Champions;