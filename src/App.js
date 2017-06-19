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

//Styles
const largeColumn = {
  width: '40%',
};
const midColumn = {
  width: '30%',
};
const smallColumn = {
  width: '10%',
};

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
      <div className="page">
        <div className = "interactions">
            
            <Search
              value = {searchTerm}
              onChange= {this.onSearchChange}
            > 
            Search 
            </Search>      
            
            <Table
            list = {list}
            pattern = {searchTerm}
            onDismiss = {this.onDismiss}
            />
         </div>
      </div>
    );
  }
}


const Search = ({value, onChange, children}) =>
    <form>
    {children}
    <input 
      type="text" 
      value = {value} 
      onChange = {onChange}/>
    </form>

  
const Table = ({list, pattern, onDismiss}) => 
  <div className = "table">
    {list.filter(isSearched(pattern)).map( item => 
      <div key = {item.objectID} className = "table-row">

        <span style = {largeColumn}>
          <a href={item.url}>{item.title}</a>
        </span>

        <span style = {midColumn}>{item.author}</span>

        <span style = {smallColumn}>{item.num_comments}</span>

        <span style = {smallColumn}>{item.points}</span>
        
        <span>
          <Button onClick={() => onDismiss(item.objectID)} className = "button-inline">
            Dismiss
          </Button>
        </span>
      </div>
      )}
  </div>

const Button = ({onClick, className = '', children}) =>
  <button
    onClick = {onClick}
    className = {className}
    type = "button"
  >
    {children}
  </button>

export default App;
