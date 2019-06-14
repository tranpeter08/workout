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
      <form id='nutri-search-form' onSubmit={this.handleSearch}>
        <input
          aria-label='Search For Nutrition Facts'
          name='searchInput'
          type='text'
          onChange={this.handleChange} 
          value={this.state.term}
          placeholder={this.props.placeholder}/>
        <button 
          aria-label='Search'
          disabled={this.props.loading || !this.state.term}
          type='submit'
        >
          <i className="fas fa-search"></i>
        </button>
      </form>
    )
  }
}