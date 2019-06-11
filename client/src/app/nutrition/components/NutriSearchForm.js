import React from 'react';

export default class NutriSearchForm extends React.Component{ 
  state = {
    term: '',
  }

  handleChange = e => {
    const {value} = e.target;
    this.setState({term: value});
  }

  handleSearch = e => {
    e.preventDefault();
    this.props.handleSearch(this.state.term);
  }

  render() {
    return (
      <form id='search' onSubmit={this.handleSearch}>
        <input
          name='searchInput'
          type='text'
          onChange={this.handleChange} 
          value={this.state.term}
          placeholder={this.props.placeholder}/>
        <button aria-label='Search' disabled={this.state.term ? false : true}>
          <i className="fas fa-search"></i>
        </button>
      </form>
    )
  }
}