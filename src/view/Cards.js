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
      filter: "",
      data: [
        {
          fname: "Jayne",
          lname: "Washington",
          email: "jaynewashington@exposa.com",
          gender: "female"
        },
        {
          fname: "Peterson",
          lname: "Dalton",
          email: "petersondalton@exposa.com",
          gender: "male"
        },
        {
          fname: "Velazquez",
          lname: "Calderon",
          email: "velazquezcalderon@exposa.com",
          gender: "male"
        },
        {
          fname: "Norman",
          lname: "Reed",
          email: "normanreed@exposa.com",
          gender: "male"
        }
      ]
    };
  }

  Teste = event => {
    this.setState({ filterChampion: event.target.value })
    console.log(event.target.value);

    let items = this.state.champions;
    items = items.filter((item) => {
      return item.search(event.target.value);
      // return item.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: items});
    
  }

  // componentWillMount = () => {
  //   this.setState({
  //       initialItems: this.props.content,
  //       champions: this.props.content
  //   })
  // }

  componentDidMount () {
    var SelectedLanguage = this.props.location.state.SelectedLanguage
    
    fetch(UrlAPI + SelectedLanguage + ChampionAPI)
    .then(res => {
      if(res.ok) {
        return res.json();
      } else {
        throw new Error ('Algo errado');
      }
    })
      .then(result => this.setState({
        // champions: result.data,
        champions: Object.keys(result.data).reduce((array, key) => {
          return [...array, {champion: result.data[key]}]
      }, []),
        isLoading: false}))
      .catch(error => this.setState ({ error, isLoading: false }));
    
  }

  handleChange = event => {
    this.setState({ filter: event.target.value });
    console.log(this.state.filter);
  };

  render () {
    const { isLoading, error } = this.state;
    
    if (isLoading) { return <p>Loading ...</p>; }
    if (error) { return <p>{error.message}</p>; }
  
    const { filter, champions } = this.state;
    const lowercasedFilter = filter.toLowerCase();
    const filteredData = champions.filter(champion => {
      // console.log(champion.champion.name);
      
      return Object.keys(champion).some(name =>
        champion[name].toString().toLowerCase().includes(lowercasedFilter)
      );
    });
      return (
        <div className="wrapper_cards">

      <div>
        {/* <input value={filter} onChange={this.handleChange} /> */}
        <select name="" id="" onChange={this.handleChange}>
          <option value="Aatrox">Aatrox</option>
          <option value="Ahri">Ahri</option>
        </select>
        {filteredData.map(champion => (
          <div key={champion.champion.name}>
            <div>
              {champion.champion.name}
            </div>
          </div>
        ))}
      </div>

          {/* <form action="">
            <select name="" id="" onChange={this.Teste}>
              <option value="All">Todos</option>
              <option value="Ahri">Ahri</option>
            </select>
          </form>

          {this.state.champions.map((champion, key) => (
            <div key={key} className="champion">
              <h1>{champion.champion.key} - {champion.champion.name}</h1>
              <p>{champion.champion.blurb} </p>
              <img alt={champion.champion.key} src={ "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champion.champion.id + "_0.jpg" }/>
            </div>
          ))} */}
        </div>
      );
  }
}

export default Cards;