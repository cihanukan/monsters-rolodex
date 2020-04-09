import React, { Component } from "react";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ""
    };
    //Unefficient way. We have to bind for every method we declared
    //this.handleChange = this.handleChange.bind(this); //bind the function for using this keyword
  }

  //Fetching monsters name. We are going to fetch the names after react page render
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => {
        users.map(user => console.log(user.name));
        this.setState({ monsters: users });
      });
  }

  //Arrow fuction bizim yerimize bind işlemi yapar. Bu nedenle this keyword u kulanabiliriz.
  handleChange = event => {
    this.setState({ searchField: event.target.value });
  };

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox
          placeholder="search monsters"
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
