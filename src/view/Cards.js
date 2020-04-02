import React, { Component } from 'react';
import Loader from '../components/Loader';


const UrlAPI = "https://ddragon.leagueoflegends.com/cdn/9.22.1/data/";
const ChampionAPI = "/champion.json";

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      champions: [],
      defaultChampions: [],
      isLoading: true,
      error: null,
      SelectedLanguage: ''
    };
  }

  selectedChampion = event => {
    const selectedChampion = event.target.id;
    const SelectedLanguage = this.props.location.state.SelectedLanguage

    this.props.history.push({ pathname: '/Champions', state: { selectedChampion, SelectedLanguage } });
  }

  componentDidMount() {
    const SelectedLanguage = this.props.location.state.SelectedLanguage

    fetch(UrlAPI + SelectedLanguage + ChampionAPI)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Algo errado');
        }
      })
      .then(result => this.setState({
        champions: Object.keys(result.data).reduce((array, key) => {
          return [...array, { champion: result.data[key], tag: result.data[key].tags }]
        }, []),
        defaultChampions: Object.keys(result.data).reduce((array, key) => {
          return [...array, { champion: result.data[key], tag: result.data[key].tags }]
        }, []),
        isLoading: false,
      }))
      .catch(error => this.setState({ error, isLoading: false }));
  }
  
  buttonBack = event => {
    this.props.history.goBack()
  }

  FilterSearch = event => {
    const filterType = [];
    const filterDefault = this.state.defaultChampions;
    const selectedOption = event.target.value;

    this.setState({champions: filterDefault}, () => {       
      for (const x of this.state.champions) {
        if (x.tag[0] === selectedOption) {
          filterType.push(x);
        } else if (selectedOption === 'all') {
          filterType.push(x);
        }
      }
      this.setState({ champions: filterType});
    });
  }

  render() {
    const { isLoading, error } = this.state;
    
    if (isLoading) { return <Loader /> }
    if (error) { return <p>{error.message}</p>; }

    return (
      <div className="wrapper">
        <div className="wrapper_cards">

          <div className="wrapper_select_back">
            <div className="select">
              <select name="" id="" onChange={this.FilterSearch}>
                <option value="all">All</option>
                <option value="Tank">Tank</option>
                <option value="Mage">Mage</option>
                <option value="Fighter">Fighter</option>
                <option value="Assassin">Assassin</option>
                <option value="Support">Support</option>
                <option value="Marksman">Marksman</option>
              </select>
            </div>
            <div className="back">
              <button className="button_default -sm" onClick={this.buttonBack}><i class="fas fa-chevron-left"></i> </button>
            </div>
          </div>
          
          <div className="wrapper_cards_list">
            {this.state.champions.map((champion, key) => (
              <div key={key}
                id={champion.champion.id}
                onClick={this.selectedChampion}

                className="cards" tag={champion.tag[0]}>
                <h1 id={champion.champion.id}>{champion.champion.name}</h1>
                <img id={champion.champion.id} alt={champion.champion.key} src={"http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champion.champion.id + "_0.jpg"} />
              </div>
            ))}
          </div>

        </div>
      </div>
    );
  }
}

export default Cards;