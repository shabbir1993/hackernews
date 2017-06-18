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
        <form>
            <input type="text"
            value = {searchTerm}
            onChange = {this.onSearchChange}
            />
        </form>

        {
          list.filter(isSearched(searchTerm)).map(item=> {
            return (
              <div key = {item.objectID}>
              <span>
              <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              <span>
                <span>
                  <button type="button" onClick={()=>{this.onDismiss(item.objectID)}}>
                  Dismiss
                  </button>
                </span>
              </span>
            </div>
            );
          })
        }
      </div>
    );
  }
}

export default App;
