import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'http://facebook.github.io/react',
    author: 'Jordan Walke',
    num_comment: 3,
    points: 4,
    objectID: 0
  },

  {
    title: 'Redux',
    url: 'http://facebook.github.io/redux',
    author: 'Dan Abramov',
    num_comment: 5,
    points: 5,
    objectID: 1
  },

  {
    title: 'Flux',
    url: 'http://facebook.github.io/react',
    author: 'Jordan Walke',
    num_comment: 5,
    points: 3,
    objectID: 2
  }
];

const isSearched = 
(searchTerm) => (item) => !searchTerm || item.title.toLowerCase()
.includes(searchTerm.toLowerCase());

class App extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      list,
      searchTerm: ''
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss(id){
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({ list: updatedList });
  }

  onSearchChange(event){
    this.setState({searchTerm: event.target.value});
  }

  render() {
    const {searchTerm, list} = this.state;
    return (
      <div className="App">
        {/*Form*/}
        <Search
          value = {searchTerm}
          onChange= {this.onSearchChange}
         />       
        
      {/* Data Displayed */}
        <Table
        list = {list}
        pattern = {searchTerm}
        onDismiss = {this.onDismiss}
         />

      </div>
    );
  }
}

class Search extends Component {
  render(){
    const {value, onChange} = this.props;
    return (
      <form>
        <input 
        type="text"
        value = {value}
        onChange = {onChange}
        />
      </form>
    );
  }
}

class Table extends Component {
  render(){
    const {list, pattern, onDismiss} =this.props;
    return (
      <div>
        {list.filter(isSearched(pattern)).map( item => 
          <div key = {item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button
                onClick={() => onDismiss(item.objectID)}
                type="button"
                >
                Dismiss
              </button>
            </span>
          </div>
          )}
      </div>
    );
  }
}

export default App;
