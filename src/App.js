import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

const DEFAULT_HPP = '25';
const DEFAULT_PAGE = 0;
const DEFAULT_QUERY = 'apple';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

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
      result: null,
      searchTerm: DEFAULT_QUERY
    };
    
    
    this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);

  }

  onDismiss(id){
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      result: {...this.state.result, hits:updatedHits}
    });
  }

  onSearchChange(event){
    this.setState({searchTerm: event.target.value});
  }

  setSearchTopstories(result){
    const { hits, page } = result;
    const oldHits = page !== 0? this.state.result.hits: [];
    const updatedHits = [
      ...oldHits,
      ...hits
    ];
    this.setState({
      result: { hits: updatedHits, page }
    });
  }

  fetchSearchTopstories(searchTerm, page){
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}\${page}&${PARAM_HPP}${DEFAULT_HPP}`)
    .then(response => response.json())
    .then(result => this.setSearchTopstories(result));
  }

  onSearchSubmit(event){
    const {searchTerm} = this.state;
    this.fetchSearchTopstories(searchTerm);
    event.preventDefault();
  }

  componentDidMount(){
    const {searchTerm} = this.state;
    this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
  }
 
  render() {
    const {searchTerm, result} = this.state;
    const page = (result && result.page) || 0;
    
    if(!result) {return null;}

    return (
      <div className="page">
        <div className = "interactions">
            
            <Search
              value = {searchTerm}
              onChange= {this.onSearchChange}
              onSubmit = {this.onSearchSubmit}
            > 
              Search 
            </Search>      
          
          { 
            result ? 
            <Table
              list = {result.hits}
              onDismiss = {this.onDismiss}
            />
            
            :null
          }
         </div>

         <div className = "interactions">
          <Button onClick = {() => 
            this.fetchSearchTopstories(searchTerm, page + 1 )} >
            More
          </Button>
         </div>
      </div>
    );
  }
}

/*****************   Search form Component   ********************/

const Search = ({
  value, 
  onChange, 
  onSubmit, 
  children
}) =>
    <form onSubmit = {onSubmit}>
  
      <input 
        type="text" 
        value = {value} 
        onChange = {onChange}
      />

      <button type= "submit">
        {children}
      </button>
    </form>


/*****************   Table Component   ********************/
 
const Table = ({list, onDismiss}) => 
  <div className = "table">
    {list.map( item => 
      <div key = {item.objectID} className = "table-row">

        <span style = {largeColumn}>
          <a target = 'blank' href={item.url}>{item.title} </a>
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

  Table.PropTypes = {
    list: PropTypes.arrayOf(
      PropTypes.shape({
        objectID: PropTypes.string.isRequired,
        author: PropTypes.string,
        url: PropTypes.string,
        num_comments: PropTypes.number,
        points: PropTypes.number,
      })
    ).isRequired,
    onDismiss: PropTypes.func.isRequired,
  };

/*****************   Button Components   ********************/
const Button = ({onClick, className, children}) =>
  <button
    onClick = {onClick}
    className = {className}
    type = "button"
  >
    {children}
  </button>
  Button.defaultProps = {
    className: '',
  };
  Button.PropTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired
  }

export default App;
