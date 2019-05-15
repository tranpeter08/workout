import React from 'react';
import Search from '../components/Search';
import {fetchOptions} from '../utils';
import {normalizeRes, queryStr} from '../utils'

export default class Recipes extends React.Component{
  state = {
    term: '',
    results: '',
    more: false,
    from: 0,
    to: 10,
    loading: false,
    error: ''
  }

  handleSearch = q => {
    const {from, to} = this.state;
    const params = {q, from, to};

    this.setState({
        loading: true, 
        term: q
      }, 
      () => this.searchRecipes(queryStr(params))
    );
  }

  searchRecipes = queryStr => {
    fetch(
      'http://localhost:8080/recipes?' + queryStr,
      fetchOptions('GET')
    )
    .then(normalizeRes)
    .then(this.onSuccess)
    .catch(this.onError);
  }

  onSuccess = ({hits, more}) => {
    this.setState({
      loading: false,
      results: hits, 
      more
    });
  }

  onError = err => {
    this.setState({loading: false, error: err});
  }

  render() {
    return(
      <div>
        <Search 
          handleSearch={this.handleSearch}
          placeholder={'Search for a recipe'} />
      </div>
    )
  }
}